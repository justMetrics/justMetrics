import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';

 const getAllRegions = async (accessKeyId: string, secretAccessKey: string) => {
  // create object to save credentioals
  const credentials = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    };
    //  all avaible regions for usa
    const Regions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2'];
    // get all regions but wait for all promises to be completed
    const results = await Promise.allSettled(
    // map through each region
    Regions.map(async (region) => {
      // query for instance in each region
      const client = new EC2Client({ region, credentials });
      // await data that is returned
      const data = await client.send(new DescribeInstancesCommand({}));
      // check if the region has an existing instance
      const hasInstances = data.Reservations?.some(
        res => res.Instances!.length > 0
      );
      // only return refion that has an instance
      return hasInstances ? region : null;
    })
  );
  // make sure to only return active regions
  const activeRegions = results
    .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled' && r.value !== null)
    .map(r => r.value as string);

  // console.log("\n✅ Active EC2 regions:", activeRegions);
  // return all active regions
  return activeRegions;
};

export default getAllRegions