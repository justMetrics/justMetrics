import fetchEC2Instances from '../middleware/getInstanceList'
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  const { accessKey, secretKey,region } = await req.json();

  // const { accessKey, secretKey, region } = await req.json();
  //! region harded; need to be convered later

  if (!accessKey || !secretKey) {
    //if (!accessKey || !secretKey || !region) {
    //! need to sync up with frontend for namings
    //! need to add !region back , curretnly hard-coded

    return NextResponse.json(
      { error: 'Missing AWS AccessKey or SecretKey' },
      { status: 400 }
    );
  }
  //console.log(accessKey, secretKey);

  try {


    const res = await fetchEC2Instances({ accessKey, secretKey, region });
   

    return NextResponse.json({ res }, { status: 200 });
  } catch (err) {
    console.error('❌ AWS Error:', err);
    return NextResponse.json(
      { error: '❌ Failed to fetch EC2 instances' },
      { status: 500 }
    );
  }
}

