import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import getAllRegions from '../awsmodelcreation/getAllRegions';

export default async function fetchEC2Instances({ accessKey, secretKey, region }){


    const res: Record<string, any> = {};

  // Get all active regions
  res.regions = await getAllRegions(accessKey, secretKey);

  const regionAWS = !region ? res.regions[0] : region;

  const ec2 = new EC2Client({
    region: regionAWS,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const command = new DescribeInstancesCommand({});
  const result = await ec2.send(command);

  const instances = result.Reservations?.flatMap((el) => el.Instances);

  res.allInstances = instances?.map((el) => {
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
}