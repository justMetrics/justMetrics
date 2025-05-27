import { NextRequest, NextResponse } from 'next/server';
import { getRegionMetadata } from '../middleware/getRegionMetadata';
import { getRegionInstanceMetricData } from '../middleware/getRegionInstanceMetricData';

export async function POST(request: NextRequest) {
  try {
//requestedMetrics, instanceIds, awsAccessKey, secretKey, region
    const frontEndSelectedRegion = getRegionMetadata(request);
    console.log(frontEndSelectedRegion)
    const regionInstanceMetricData = getRegionInstanceMetricData(frontEndSelectedRegion)

   console.log(regionInstanceMetricData)




    return NextResponse.json({ res: regionInstanceMetricData }, { status: 200 });
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      { error: `${err} error in obtaining metrics from query` },
      { status: 500 }
    );
  }
}









//call awsmodel creation middleware
//then call awsmetrics middleware and then send response to client
