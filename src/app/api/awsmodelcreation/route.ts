import { EC2Client, DescribeInstancesCommand, DescribeInstancesCommandOutput } from '@aws-sdk/client-ec2';
import { NextRequest, NextResponse } from 'next/server';

// import types
import { awsModelCreationReq } from '../../../../types/apiTypes'


export async function POST(req: NextRequest) {
  const { accessKey, secretKey, region }: awsModelCreationReq = await req.json();

  if (!accessKey || !secretKey) {
    //! need to sync up with frontend for namings
    //! need to add !region back , curretnly hard-coded

    return NextResponse.json(
      { error: 'Missing AWS AccessKey or SecretKey' },
      { status: 400 }
    );
  }

  try {
    const ec2: EC2Client = new EC2Client({
      region: region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const command: DescribeInstancesCommand = new DescribeInstancesCommand({});
    const result: DescribeInstancesCommandOutput = await ec2.send(command);

    const instances = result.Reservations?.flatMap((el) => el.Instances);

    
    const res = instances?.map((el) => {
      return {
        instanceId: el?.InstanceId,
        state: el?.State?.Name,
        name: el?.Tags?.find((tag) => tag.Key === 'Name')?.Value,
        type: el?.InstanceType,
        launchTime: el?.LaunchTime,
        SecurityGroups: el?.SecurityGroups?.map((el) => ({
          groupId: el.GroupId,
          groupName: el.GroupName,
        })),
        PrivateIpAddress: el?.PrivateIpAddress,
        PublicIpAddress: el?.PublicIpAddress,
      };
    });

    return NextResponse.json({ res }, { status: 200 });
  } catch (err) {
    console.error('❌ AWS Error:', err);
    return NextResponse.json(
      { error: '❌ Failed to fetch EC2 instances' },
      { status: 500 }
    );
  }
}

