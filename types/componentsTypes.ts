import { SingleValue } from 'react-select';


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

export type instanceMetrics = Record<string, {
  Timestamps: string[];
  Values: number[];
}>


// keysInPut.tsx
export type regions = Record<string, string>[];

export type OptionType = {
  value: string;
  label: string; 
}

export type select = React.ComponentType<{
  options: OptionType[];
  onChange: (selected: SingleValue<OptionType>) => void;
  classNamePrefix?: string;
  placeholder?: string;
  isSearchable?: boolean;
  value?: OptionType | null;
}>;

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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};
// chartCPU.tsx
export type ChartCPUProps = {
  metricData: instanceMetrics;
}




//  {cpu: {
//     "Timestamps": [
//         "2025-06-05T18:32:00.000Z",
//         "2025-06-05T18:42:00.000Z",
//         "2025-06-05T18:52:00.000Z",
//         "2025-06-05T19:02:00.000Z"
//     ],
//     "Values": [
//         3.6516708264913214,
//         3.5868362826972,
//         3.6531629661203824
//     ]
// }}

