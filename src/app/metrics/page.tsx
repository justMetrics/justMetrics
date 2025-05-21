import CloudwatchDashboard from './components/CloudwatchDashboard';
import MetaDataDashboard from './components/MetaDataDashboard';

const mockInstanceList = [
  {
    Architecture: 'x86_64',
    BlockDeviceMappings: [[Object]],
    ClientToken: '98a2fc8b-18dc-4a6b-b4e9-86b911e24f77',
    EbsOptimized: false,
    EnaSupport: true,
    Hypervisor: 'xen',
    NetworkInterfaces: [[Object]],
    RootDeviceName: '/dev/xvda',
    RootDeviceType: 'ebs',
    SecurityGroups: [[Object]],
    SourceDestCheck: true,
    Tags: [[Object]],
    VirtualizationType: 'hvm',
    CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
    CapacityReservationSpecification: {
      CapacityReservationPreference: 'open',
    },
    HibernationOptions: { Configured: false },
    MetadataOptions: {
      State: 'applied',
      HttpTokens: 'required',
      HttpPutResponseHopLimit: 2,
      HttpEndpoint: 'enabled',
      HttpProtocolIpv6: 'disabled',
      InstanceMetadataTags: 'disabled',
    },
    EnclaveOptions: { Enabled: false },
    BootMode: 'uefi-preferred',
    PlatformDetails: 'Linux/UNIX',
    UsageOperation: 'RunInstances',
    UsageOperationUpdateTime: '2025-05-19T16:27:24.000Z',
    PrivateDnsNameOptions: {
      HostnameType: 'ip-name',
      EnableResourceNameDnsARecord: true,
      EnableResourceNameDnsAAAARecord: false,
    },
    MaintenanceOptions: { AutoRecovery: 'default' },
    CurrentInstanceBootMode: 'legacy-bios',
    NetworkPerformanceOptions: { BandwidthWeighting: 'default' },
    Operator: { Managed: false },
    InstanceId: 'i-09073f677b6717a0e',
    ImageId: 'ami-06c8f2ec674c67112',
    State: { Code: 16, Name: 'running' },
    PrivateDnsName: 'ip-172-31-3-150.us-east-2.compute.internal',
    PublicDnsName: 'ec2-3-133-160-26.us-east-2.compute.amazonaws.com',
    StateTransitionReason: '',
    KeyName: 'test',
    AmiLaunchIndex: 0,
    ProductCodes: [],
    InstanceType: 't2.micro',
    LaunchTime: '2025-05-19T16:27:24.000Z',
    Placement: {
      GroupName: '',
      Tenancy: 'default',
      AvailabilityZone: 'us-east-2a',
    },
    Monitoring: { State: 'disabled' },
    SubnetId: 'subnet-0082886a0d33a5553',
    VpcId: 'vpc-0e941ec1f52e2e87e',
    PrivateIpAddress: '172.31.3.150',
    PublicIpAddress: '3.133.160.26',
  },
];
export default async function Metrics() {
  const res = await fetch('http://localhost:3000/api/awsmetrics');
  const metaData = await res.json();
  // start with one instance
  const instanceId = metaData[0];
  console.log(instanceId);
  const dataToCloudWatch = {
    instanceId,
    metrics: 'cpu',
  };

  // const metricsRes = await fetch('http://localhost:3000/api/awsmodelcreation', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(dataToCloudWatch),
  // });
  // const metricsData = await metricsRes.json();
  // console.log(metricsData);

  return (
    <section className='w-screen h-screen bg-blue-50 flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold'>Just Metrics</h1>
      <h2>subtitle {instanceId}</h2>
      <MetaDataDashboard metaData={instanceId} />
      <CloudwatchDashboard />
    </section>
  );
}
