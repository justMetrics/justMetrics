import {
  EC2Client,
  DescribeInstancesCommand,
  DescribeInstancesCommandOutput,
} from '@aws-sdk/client-ec2';
import { NextRequest, NextResponse } from 'next/server';

// import types
import { awsModelCreationReq } from '../../../../types/apiTypes';

export async function POST(req: NextRequest) {
  // Extract credentials and region from the request body
  
  const { accessKey, secretKey, region }: awsModelCreationReq =
    await req.json();

  // Validate required parameters
  if (!accessKey || !secretKey || !region) {
    return NextResponse.json(
      { error: 'Missing AWS AccessKey or SecretKey or Region' },
      { status: 400 }
    );
  }

  // * For debugging: Uncomment to verify received credentials and region
  // console.log('👀 👀 👀 👀 Received AWS credentials:', { accessKey, secretKey, region })

  try {
    // Initialize EC2 client with recieved credentials and region
    const ec2: EC2Client = new EC2Client({
      region: region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    // Fetch all EC2 instances
    const command: DescribeInstancesCommand = new DescribeInstancesCommand({});
    const result: DescribeInstancesCommandOutput = await ec2.send(command);
    // Extract instance data from reservations
    const instances = result.Reservations?.flatMap((el) => el.Instances);

    //* For debugging: Uncomment to inspect instances data
    // console.log('👀 👀 👀 👀 instances data:', instances);

    // Transform instances data for client-side consumption
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

    //* For debugging: Uncomment to check formatted/final instanece data
    // console.log('👀 👀 👀 👀 formatted/final instance data:', res);

    // Return formatted instance data
          const sizesenttoFront = Buffer.byteLength(JSON.stringify(res), 'utf8');
      console.log('responsetoFrontend', sizesenttoFront)


      const sizeFromAWS = Buffer.byteLength(JSON.stringify(result), 'utf8');

      console.log('size of Raw AWS object', sizeFromAWS)

      const reduction = (sizeFromAWS-sizesenttoFront)/sizeFromAWS
      console.log('% reduction in size bc of our formatting', reduction)
    return NextResponse.json({ res }, { status: 200 });
  } catch (err) {

    console.error('❌ AWS Error:', err);

    return NextResponse.json(
      { statusText:'invalid credentials'},
      { status: 500 }
    );
  }
}
