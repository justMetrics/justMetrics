import { NextRequest, NextResponse } from 'next/server';
import { GetMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { loggedInClient } from '../awsmodelcreation/route';
//assume body is from post request and has an object with instanceIds and requestedMetrics:
//{
//! instanceIds: [instance1, instance2],
//! requestedMetrics: [cpuUsage,networkin]
// }

export async function POST(request: NextRequest) {
  try {
    console.log('awsmetrics POST running');
    const { requestedMetrics, instanceIds } = await request.json();
    
    // console.log('BODY RECEIVED FROM FRONTEND', requestedMetrics, instanceIds)
      //console.log(instanceIds.length);
    const metricQueries = [];
    for (let i = 0; i < instanceIds.length; i++) {

      //requested instances is i
      for (let j = 0; j < requestedMetrics.length; j++) {
        //requested metrics is j

        const queryId = String(i) + String(j);
        const metricName = requestedMetrics[j] as string;
        const dimensions = [{ Name: 'InstanceId', Value: instanceIds[i].instanceId }];
        const metricQuery = { queryId, metricName, dimensions };
        metricQueries.push(metricQuery);
      }
    }

   

    const finalMetricQuery = metricQueries.map((elem, index) => {
      //his is the actual object we will be sending in metric query
      return {
        // Id: elem.queryId as string,
        Id: "test"+index,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/EC2',
            // MetricName: elem.metricName,
            // Dimensions: elem.dimensions,
            MetricName: 'CPUUtilization',
            Dimensions: [{ Name: 'InstanceId', Value: 'i-09073f677b6717a0e' }],
          },
          Period: 300,
          Stat: 'Average',
        },
        ReturnData: true,
      };
    });
    console.log('awsmetricQuery', finalMetricQuery[0].MetricStat.Metric.MetricName,finalMetricQuery[0].MetricStat.Metric.Dimensions)
console.log("we got this far")
    const awsQuery = new GetMetricDataCommand({
      StartTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      EndTime: new Date(),
      MetricDataQueries: finalMetricQuery,
    });
    console.log('awsQuery',awsQuery)
    const response = await loggedInClient.send(awsQuery);
    console.log(response)
    return NextResponse.json(response);
    // return NextResponse.json({ res:'hello good citizen' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: `${err} error in obtaining metrics from query` },
      { status: 500 }
    );
  }
}
