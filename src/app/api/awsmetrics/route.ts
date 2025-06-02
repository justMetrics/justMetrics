import { NextRequest, NextResponse } from 'next/server';
import {
  CloudWatchClient,
  GetMetricDataCommand,
  GetMetricDataCommandOutput,
  MetricDataQuery,
} from '@aws-sdk/client-cloudwatch';

export async function POST(request: NextRequest) {
  //function is triggered on POST request to /awsmetrics route
  try {
    const { requestedMetrics, instanceIds, awsAccessKey, secretKey, region } =
      await request.json(); //deconstructs request Object to get relevant variables for Cloduwatch Request

    const cloudwatchClient: CloudWatchClient = new CloudWatchClient({
      //opens Cloudwatch client with details from request object.
      // Note: Cloudwatch credentials are the same as EC2 credentials, but with different AWS endpoint.
      region: region,
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: secretKey,
      },
    });

    const metricQueries = []; //Request object will provide list of requested instanceIds and requestedMetrics.
    // To prepare Cloudwatch query request, we must iterate through both arrays and create unique request objects combining each unique
    // instance/metric and package them into a specific metric request (which goes into our metricQueries variablecale).

    for (let i = 0; i < instanceIds.length; i++) {
      //Iterate through instanceIds array

      for (let j = 0; j < requestedMetrics.length; j++) {
        //Iterating through RequestedMetrics Array (which we must do for each instance)

        const queryId = String(i) + String(j); //all metricQueries must have a unique custom queryId

        const metricName = requestedMetrics[j] as string; //specific metricName e.g. CPUUtilization for the specific metricQuery being created
        const dimensions = [
          //the specific instance to be set for the specific metricQuery being created
          { Name: 'InstanceId', Value: instanceIds[i].instanceId },
        ];
        const metricQuery = { queryId, metricName, dimensions }; //construct metricQuery Object based on queryId, metricName and dimensions variables
        metricQueries.push(metricQuery); //push to the ultimate metricQueries array which contains all unique metricQueries. We can use this
        //to prepare our final command object to be sent to the Cloudwatch Client
      }
    }

    function bestStatType(metricName: string): string {
      //each metricQuery in the metricQueries array will require a specific metric type to be requested for it, which we are selecting based on this table.
      //we use this function below.
      const bestMetric: Record<string, string> = {
        CPUUtilization: 'Average',
        NetworkIn: 'Average',
        NetworkOut: 'Average',
        DiskWriteOps: 'Sum',
        CPUCreditBalance: 'Minimum',
        CPUCreditUsage: 'Average',
        StatusCheckFailed: 'Average',
      };

      return bestMetric[metricName];
    }
    //to prepare the finalMetricquery object that is ultimately sent to Cloudwatch,
    // we must further transform the metricQueries array made above.
    const finalMetricQuery: MetricDataQuery[] = metricQueries.map(
      (elem, index) => {
        //the final transformation of the metricQueries object to finalMetricQuery.
        //note that this is inefficient-we could merge the below query object into the work above to not have two separate functions required to
        // make the finalMetricQuery.
        //this was done primarily so we could test the two functions separately and confirm they were working as intended. A potential refactoring option.

        return {
          Id: 'test' + index,
          Label: `${elem.dimensions[0].Value} ${elem.metricName}`,
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: elem.metricName,
              Dimensions: elem.dimensions,
            },
            Period: 300 * 2, //this is the time period for which a metric is provided (without paying, the shortest frequency possible is 300 or 5 minutes)
            Stat: bestStatType(elem.metricName), //this is the statistic we have selected as most appropriate for that metric in the table above.
          },
          ReturnData: true, // this option indicates whether to return the timestamps and raw data values of this metric.
        };
      }
    );

    const awsQuery: GetMetricDataCommand = new GetMetricDataCommand({
      //the type of command we are using to get metricData.
      // For more details see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cloudwatch/command/GetMetricDataCommand/

      StartTime: new Date(Date.now() - 24 * 60 * 60 * 1000), //set timeframe for the metricsdata Command. right now we are setting EndTime to now and StartTime to a day before that.
      EndTime: new Date(),
      MetricDataQueries: finalMetricQuery, //finalMetricquery from the transformation above
    });

    const response: GetMetricDataCommandOutput = await cloudwatchClient.send(
      awsQuery
    ); //send the prepared awsQuery to Cloudwatch and save the response in the response variable

    //once we have the response object (refer to https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cloudwatch/Interface/GetMetricDataCommandOutput/
    //to see what it looks like
    //we want to transform the data so our frontend to have a nice, clean array of data, broken up by each instance.
    //This makes it easy to work with for the frontend page (and related engineer). This will be our finalResponse object.
    const finalResponse: frontendMetricsObject = {}; //we will talk about the type below.

    //  the structure of finalResponse:
    // {
    // 'i-0496221beb4f27fe4': [
    //     { CPUUtilization: [Object] },
    //     { NetworkIn: [Object] },
    //     { NetworkOut: [Object] },
    //     { CPUCreditBalance: [Object] },
    //     { CPUCreditUsage: [Object] },
    //     { StatusCheckFailed: [Object] }
    //   ],
    //   'i-025ef9fc42f692bc4': [
    //     { CPUUtilization: [Object] },
    //     { NetworkIn: [Object] },
    //     { NetworkOut: [Object] },
    //     { CPUCreditBalance: [Object] },
    //     { CPUCreditUsage: [Object] },
    //     { StatusCheckFailed: [Object] }
    //   ]
    // }
    // Each instance should be an object, with a single property of an array, and in that array, there are objects each of which correspond to a single metric.
    //each of these objects have key of the metric name and the value is another object, comprised of two properties:
    // Values, with the values from AWS, and Timestamps, from AWS.
    //Note that the [Object] in the above nested objects will be an object with two properties: Value and Timestamps
    //The length of Timestamps and Values will always be the same if this is working properly.

    //The pieces below are the types for the different objects in the finalResponse object.

    type FrontendMetricsByInstance = {
      //Each Instance will have a FrontendMetricsObjectInstance for EACH METRIC REQUESTED.
      // For example, 3 metrics requested, 3 FrontendMetricsByInstance objects
      // Note: each of these objects WILL NOT HAVE THE INSTANCE ID ATTACHED, YOU MUST READ THAT FROM THE FRONTENDMETRICSOBJECT BELOW
      [metricName: string]: {
        Values: number[];
        Timestamps: Date[];
      };
    };

    type frontendMetricsObject = {
      //ultimate type of finalResponse object sent to frontend. you should have 1 for each instance.
      //These objects are what are ultimately leveraged to create the charts seen on the frontend.
      [instanceId: string]: FrontendMetricsByInstance[]; //you will have an array of FrontendMetricsByInstance
    };

    for (let i = 0; i < response!.MetricDataResults!.length; i++) {
      //Creation of finalResponse object
      const labelArray = response!.MetricDataResults![i].Label!.split(' '); //Labels from AWS will be instance and metricsname, separated by a space.

      const metricsObject: FrontendMetricsByInstance = {}; //the specific metric object we are creating
      metricsObject[labelArray[1]] = {
        Timestamps: response.MetricDataResults![i].Timestamps as Date[],
        Values: response.MetricDataResults![i].Values as number[],
      };

      if (finalResponse[instanceId]) {
        //if instance is already in our finalResponse object, just push there. if not, create it.
        finalResponse[instanceId].push(metricsObject);
      } else {
        const instance = [];
        instance.push(metricsObject);
        finalResponse[instanceId] = instance;
      }
    }

    return NextResponse.json({ res: finalResponse }, { status: 200 }); //send created finalResponse object to frontEnd
  } catch (err) {
    console.log('err', err);
    return NextResponse.json(
      //error on if the try above fails.
      // Note that right now, really this is a very vague error message as it encompasses ALL the above steps. Might need to break up errors in the future.
      { error: `${err} error in obtaining metrics from query` },
      { status: 500 }
    );
  }
}
