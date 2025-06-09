
// awsModelCreation types
export type awsModelCreationReq = {
    accessKey: string;
    secretKey: string;
    region: string;
};

// awsmetrics types
type SecurityGroups = {
    groupId: string;
    groupName: string;
}

type instanceId = {
    instanceId: string;
    state: string;
    name: string;
    type: string;
    launchTime: string;
    SecurityGroups: SecurityGroups[];
    PrivateIpAddress: string;
    PublicIpAddress: string;
};

export type body = {
  requestedMetrics: string[];
  instanceIds: instanceId[];
  awsAccessKey: string;
  secretKey: string;
  region: string;
}