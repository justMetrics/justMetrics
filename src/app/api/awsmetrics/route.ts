import { NextRequest, NextResponse } from 'next/server';
import {
  CloudWatchClient,
  GetMetricDataCommand,
  GetMetricDataCommandOutput,
  MetricDataQuery,
} from '@aws-sdk/client-cloudwatch';

export async function POST(request: NextRequest) { //function is triggered on POST request to /awsmetrics route
  try {
    const { requestedMetrics, instanceIds, awsAccessKey, secretKey, region } =
      await request.json(); //deconstructs request Object to get relevant variables for Cloduwatch Request


    const cloudwatchClient:CloudWatchClient = new CloudWatchClient({ //opens Cloudwatch client with details from request object. 
    // Note: Cloudwatch credentials are the same as EC2 credentials, but with different AWS endpoint.
      region: region,
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: secretKey,
      },
    });

    const metricQueries = []; //Request object will provide list of requested instanceIds and requestedMetrics. 
    // To prepare Cloudwatch query request, we must iterate through both arrays and create unique request objects combining each unique instance/metric and 
    // package them into a specific metric request.

    for (let i = 0; i < instanceIds.length; i++) { //Iterate through instanceIds array


      for (let j = 0; j < requestedMetrics.length; j++) {  //Iterating through RequestedMetrics Array (which we must do for each instance)

        const queryId = String(i) + String(j); //all metricQueries must have a unique custom queryId

        const metricName = requestedMetrics[j] as string; //specific metricName e.g. CPUUtilization for the specific metricQuery being created
        const dimensions = [//the specific instance to be set for the specific metricQuery being created
          { Name: 'InstanceId', Value: instanceIds[i].instanceId },
        ];
        const metricQuery = { queryId, metricName, dimensions }; //construct metricQuery Object based on queryId, metricName and dimensions variables
        metricQueries.push(metricQuery); //push to the ultimate metricQueries array which contains all unique metricQueries. We can use this
        //to prepare our final command object to be sent to the Cloudwatch Client

      }
    }

    function bestStatType(metricName:string):string { //to prepare the finalMetricquery object that is ultimately sent to Cloudwatch, 
    // we must further transform the metricQueries array made above.
      const bestMetric: Record<string, string> = {//each metricQuery in the metricQueries array will require a specific metric type to be requested for it, which we are selecting based on this table.
        CPUUtilization: 'Average',
        NetworkIn: 'Average',
        NetworkOut: 'Average',
        DiskWriteOps: 'Sum',
        CPUCreditBalance: 'Minimum', 
        CPUCreditUsage: 'Average',
        StatusCheckFailed: 'Average'
      };

      return bestMetric[metricName];
    }

    const finalMetricQuery:MetricDataQuery[] = metricQueries.map((elem, index) => { //the final transformation of the metricQueries object to finalMetricQuery.
      //note that this is inefficient-we could merge the below query object into the work above to not have two separate functions required to make the finalMetricQuery.
      //this was done primarily so we could test the two functions separately and confirm they were working as intended. A potential refactoring option
   
      return {
        Id: 'test' + index,
        Label: `${elem.dimensions[0].Value} ${elem.metricName}`,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/EC2', //The name of the metric
            MetricName: elem.metricName,
            Dimensions: elem.dimensions,
          },
          Period: 300*2, //this is the time period for which a metric is provided (without paying, the shortest frequency possible is 300 or 5 minutes)
          Stat: bestStatType(elem.metricName), //this is the statistic we have selected as most appropriate for that metric in the table above. 
        },
        ReturnData: true, // this option indicates whether to return the timestamps and raw data values of this metric.
      };
    });

    const awsQuery:GetMetricDataCommand = new GetMetricDataCommand({ //the type of command we are using to get metricData. 
    // For more details see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cloudwatch/command/GetMetricDataCommand/

      StartTime: new Date(Date.now() - 24 * 60 * 60 * 1000), //set timeframe for the metricsdata Command. right now we are setting EndTime to now and StartTime to a day before that.
      EndTime: new Date(),
      MetricDataQueries: finalMetricQuery, //finalMetricquery from the transformation above
    });

    const response: GetMetricDataCommandOutput = await cloudwatchClient.send(awsQuery); //send the prepared awsQuery to Cloudwatch and save the response in the response variable
console.log('response', response)
    const finalResponse: any = {}; //we want our frontend to have a nice, clean array of data, broken up by each instance.

    //but this is the AWS response we could get:
  
//      {
//   '$metadata': {
//     httpStatusCode: 200,
//     requestId: 'bb4413b6-a5c5-471c-aab9-e616d5a0b726',
//     extendedRequestId: undefined,
//     cfId: undefined,
//     attempts: 1,
//     totalRetryDelay: 0
//   },
//   MetricDataResults: [
//     {
//       Id: 'test0',
//       Label: 'i-0496221bea4f57fe4 CPUUtilization',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test1',
//       Label: 'i-0496221bea4f57fe4 NetworkIn',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test2',
//       Label: 'i-0496221bea4f57fe4 NetworkOut',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test3',
//       Label: 'i-0496221bea4f57fe4 CPUCreditBalance',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test4',
//       Label: 'i-0496221bea4f57fe4 CPUCreditUsage',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test5',
//       Label: 'i-0496221bea4f57fe4 StatusCheckFailed',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test6',
//       Label: 'i-025ef7fc42f691bc4 CPUUtilization',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test7',
//       Label: 'i-025ef7fc42f691bc4 NetworkIn',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test8',
//       Label: 'i-025ef7fc42f691bc4 NetworkOut',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test9',
//       Label: 'i-025ef7fc42f691bc4 CPUCreditBalance',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test10',
//       Label: 'i-025ef7fc42f691bc4 CPUCreditUsage',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     },
//     {
//       Id: 'test11',
//       Label: 'i-025ef7fc42f691bc4 StatusCheckFailed',
//       Timestamps: [Array],
//       Values: [Array],
//       StatusCode: 'Complete'
//     }
//   ],
//   Messages: []
// }
//note how MetricDataQuery is structured: it is an array of objects with the information we need

    //therefore, the loop below transforms the data from Cloudwatch's response into a way that is easy 
    // for the frontend page (and related engineer) to work with. 

    //  this is what finalResponse should look like after transforming the initial response object we receive from Cloudwatch.
    {
//   'i-0496221beb4f27fe4': [
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

//note that the [Object] in the above nested objects will be an object with two properties: Value and Timestamps, e.g.:


    for (let i = 0; i < response!.MetricDataResults!.length; i++) {
      const labelArray = response!.MetricDataResults![i].Label!.split(' ');

      const instanceId = labelArray[0];

      const metricsObject: any = {};
      metricsObject[labelArray[1]] = {
        Timestamps: response.MetricDataResults[i].Timestamps,
        Values: response.MetricDataResults[i].Values,
      };

      if (finalResponse[instanceId]) {

        finalResponse[instanceId].push(metricsObject);
      } else {
        const instance = [];
        instance.push(metricsObject);
        finalResponse[instanceId] = instance;
      }
    }    // console.log('finalresponse', finalResponse['i-0496221bea4f57fe4'][0].CPUUtilization);


    return NextResponse.json({ res: finalResponse }, { status: 200 }); //send created finalResponse object to frontEnd
  } }
  catch (err) {
    // console.log(err);
    return NextResponse.json( //error on if the try above fails. 
    // Note that right now, really this is a very vague error message as it encompasses ALL the above steps. Might need to break up error sin the future.
      { error: `${err} error in obtaining metrics from query` },
      { status: 500 }
    );
  }
}
