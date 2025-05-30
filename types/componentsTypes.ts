


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

export type instanceMetricbody = {
    metrics: Array<string>;
    instances: insData[];
    credentials: Array<string>;
    region: string;
}


// keysInPut.tsx
export type regions = Record<string, string>[];

export type OptionType = {
    label: string;
    value: string;
}


// create props types
// Metrics.tsx 
export type metricsProps = {
  insData: insData[];
  credentials: string[];
  selectedRegion: string;
  setCredentials: React.Dispatch<React.SetStateAction<string[]>>;
};
// KeyInPut.tsx
export type KeyInPutProps = {
  setInsData: React.Dispatch<React.SetStateAction<insData[]>>;
  setCredentials: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
};
