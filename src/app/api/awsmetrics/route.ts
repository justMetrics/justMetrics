import { NextResponse } from 'next/server';
import { GetMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import loggedInClient from '../awsmodelcreation/route';
//assume body is from post request and has an object with instanceIds and requestedMetrics:
//{
//! instanceIds: [instance1, instance2],
//! requestedMetrics: [cpuUsage,networkin]
// }

export async function POST(request: Request) {
    
  try {
    console.log('awsmetrics POST running')
    const body = await request.json(); //get json object for use
    const { instanceIds, requestedMetrics } = body;
    let metricQueries = [];
    for (let i = 0; i < instanceIds.length; i++) {
      //requested instances is i
      for (let j = 0; j < requestedMetrics.length; j++) {
        //requested metrics is j

        const queryId = String(i) + String(j);
        const metricName = requestedMetrics[j] as string;
        const dimensions = [{ Name: 'InstanceId', Value: instanceIds[i] }];
        const metricQuery = { queryId, metricName, dimensions };
        metricQueries.push(metricQuery);
      }
    }

    console.log(metricQueries);

    const finalMetricQuery = metricQueries.map((elem) => {
      //his is the actual object we will be sending in metric query
      return {
        Id: elem.queryId,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/EC2',
            MetricName: elem.metricName,
            Dimensions: elem.dimensions,
          },
          Period: 300,
          Stat: 'Average',
        },
        ReturnData: true,
      };
    });

    const awsQuery = new GetMetricDataCommand({
      StartTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      EndTime: new Date(),
      MetricDataQueries: finalMetricQuery,
    });
    const response = await loggedInClient.send(awsQuery);

    return NextResponse.json(response);

  } catch (err) {
    console.log('error: cannot get aws metrics');
    return NextResponse.json(
      { error: 'error in obtaining metrics from query' },
      { status: 500 }
    );
  }
}
