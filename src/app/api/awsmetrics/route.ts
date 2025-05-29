import { NextRequest, NextResponse } from 'next/server';
import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
// import { loggedInClient } from '../awsmodelcreation/route';
//assume body is from post request and has an object with instanceIds and requestedMetrics:
//{
//! instanceIds: [instance1, instance2],
//! requestedMetrics: [cpuUsage,networkin]
//!
// }

export async function POST(request: NextRequest) {
  try {
    const { requestedMetrics, instanceIds, awsAccessKey, secretKey, region } =
      await request.json();
    // console.log(
    //   '    👀 👀 👀 👀 all here??',
    //   requestedMetrics,
    //   instanceIds,
    //   awsAccessKey,
    //   secretKey,
    //   region
    // );
    //console.log('awsmetrics KEYS', awsAccessKey, secretKey, region);

    // console.log('modelCreationtestRegion', region);

    const cloudwatchClient = new CloudWatchClient({
      region: region, //make util function and call inside
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: secretKey,
      },
    });

    const metricQueries = [];
    // console.log(instanceIds.length)
    for (let i = 0; i < instanceIds.length; i++) {
      //requested instances is i

      for (let j = 0; j < requestedMetrics.length; j++) {
        //requested metrics is j

        const queryId = String(i) + String(j);

        const metricName = requestedMetrics[j] as string;
        const dimensions = [
          { Name: 'InstanceId', Value: instanceIds[i].instanceId },
        ];
        const metricQuery = { queryId, metricName, dimensions };
        metricQueries.push(metricQuery);
      }
    }
    function bestStatType(metricName: string) {
      const bestMetric = {
        CPUUtilization: 'Average',
        NetworkIn: 'Average',
        NetworkOut: 'Average',
        DiskWriteOps: 'Sum',
      };

      return bestMetric[metricName];
    }

    const finalMetricQuery = metricQueries.map((elem, index) => {
      //his is the actual object we will be sending in metric query
      return {
        // Id: elem.queryId as string,
        Id: 'test' + index,
        Label: `${elem.dimensions[0].Value} ${elem.metricName}`,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/EC2',
            MetricName: elem.metricName,
            Dimensions: elem.dimensions,
          },
          Period: 300 * 12,
          Stat: bestStatType(elem.metricName), //!needs to be changed based on what is most appropriate for each metric
        },
        ReturnData: true,
      };
    });

    const awsQuery = new GetMetricDataCommand({
      StartTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      EndTime: new Date(),
      MetricDataQueries: finalMetricQuery,
    });

    //console.log('    👀 👀 👀 👀 all here??', awsQuery);

    const response: any = await cloudwatchClient.send(awsQuery);
    //loop through MetricDataResults
    //and we have to look at each Label (MetricDataResults.Label)
    //and we have to split that and save them in two other arrays (instances, metrics)
    //console.log('👀 👀 👀 👀 TEST!!!!!!!', response);
    const finalResponse: any = {};
    for (let i = 0; i < response.MetricDataResults?.length; i++) {
      const labelArray = response.MetricDataResults[i]?.Label.split(' ');
      //result in instanceid, metric
      // console.log(labelArray);
      const instanceId = labelArray[0];
      const metric = labelArray[1];
      const instance = {};

      const metricsObject: any = {};
      metricsObject[labelArray[1]] = {
        Timestamps: response.MetricDataResults[i].Timestamps,
        Values: response.MetricDataResults[i].Values,
      };

      if (finalResponse[instanceId]) {
        //problem is here
        finalResponse[instanceId].push(metricsObject);
      } else {
        const instance = [];
        instance.push(metricsObject);
        finalResponse[instanceId] = instance;
      }
    }
    console.log(finalResponse);
    return NextResponse.json({ res: finalResponse }, { status: 200 });
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      { error: `${err} error in obtaining metrics from query` },
      { status: 500 }
    );
  }
}
