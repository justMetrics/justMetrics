


// metrics.tsx types
type SecurityGroups = {
    groupId: string;
    groupName: string;
}

export type insData = {
    instanceId: string;
    state: string;
    name: string;
    type: string;
    launchTime: string;
    SecurityGroups: SecurityGroups[];
    PrivateIpAddress: string;
    PublicIpAddress: string;
};
