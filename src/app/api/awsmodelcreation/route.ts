import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { accessKey, secretKey, region } = await req.json();

  if (!accessKey || !secretKey || !region) {
    //! need to sync up with frontend for namings

    return NextResponse.json(
      { error: 'Missing AWS credentials or region' },
      { status: 400 }
    );
  }

  try {
    const ec2 = new EC2Client({
      region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const command = new DescribeInstancesCommand({});
    const result = await ec2.send(command);

    const ins = result.Reservations?.flatMap((el) => el.Instances) || [];
    console.log('TEST!!!!!!!', ins);
    return NextResponse.json({ ins });
  } catch (err) {
    console.error('❌ AWS Error:', err);
    return NextResponse.json(
      { error: '❌ Failed to fetch EC2 instances' },
      { status: 500 }
    );
  }
}
