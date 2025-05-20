import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessKey, secretKey, region } = req.body;

  if (!accessKey || !secretKey || !region) {
    //! need to sync up with frontend for namings

    return res.status(400).json({ error: 'Missing AWS credentials or region' });
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
    res.status(200).json({ ins });
  } catch (err) {
    console.error('❌ AWS Error:', err);
    res.status(500).json({ error: 'Failed to fetch EC2 instances' });
  }
}
