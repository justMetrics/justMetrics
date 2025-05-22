import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { NextRequest, NextResponse } from 'next/server';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
export let loggedInClient;

export async function POST(req: NextRequest) {
  const { accessKey, secretKey } = await req.json();

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
    const ec2 = new EC2Client({
      //region:'us-west-1',
      region: 'us-east-2',
      //! region harded; need to be convered later
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const cloudwatch = new CloudWatchClient({region: 'us-east-2',
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },})
      loggedInClient = cloudwatch;

    const command = new DescribeInstancesCommand({});
    const result = await ec2.send(command);

    const instances = result.Reservations?.flatMap((el) => el.Instances);
     //console.log('👀 👀 👀 👀 TEST!!!!!!!', instances);
    //console.log(JSON.stringify(instances, null, 2));

    const res = instances?.map((el) => {
      return {
        instanceId: el?.InstanceId,
        state: el?.State?.Name,
        name: el?.Tags?.find((tag) => tag.Key === 'Name')?.Value ,
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
    //console.log('👀 👀 👀 👀 TEST!!!!!!!', res);

    return NextResponse.json({ res }, { status: 200 });
  } catch (err) {
    console.error('❌ AWS Error:', err);
    return NextResponse.json(
      { error: '❌ Failed to fetch EC2 instances' },
      { status: 500 }
    );
  }
}
