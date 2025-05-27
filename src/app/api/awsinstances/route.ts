import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  const { accessKey, secretKey,region } = await req.json();



  if (!accessKey || !secretKey || region) {


    return NextResponse.json(
      { error: 'Missing AWS AccessKey or SecretKey or region' },
      { status: 400 }
    );
  }
  //console.log(accessKey, secretKey);

  try {
  

    const ec2 = new EC2Client({
      region: region,
    
      credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      },
    });

    const command = new DescribeInstancesCommand({});
    const result = await ec2.send(command);

    const instances = result.Reservations?.flatMap((el) => el.Instances);
    // console.log('👀 👀 👀 👀 TEST!!!!!!!', instances);
    // console.log(JSON.stringify(instances, null, 2));

     res = instances?.map((el) => {
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
    // console.log('👀 👀 👀 👀 TEST!!!!!!!', res);

    return NextResponse.json({ res }, { status: 200 });
  } catch (err) {
    console.error('❌ AWS Error:', err);
    return NextResponse.json(
      { error: '❌ Failed to fetch EC2 instances' },
      { status: 500 }
    );
  }
}

