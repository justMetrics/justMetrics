import { NextRequest } from 'next/server';
import { POST } from '../src/app/api/awsmodelcreation/route';
import {
  EC2Client,
} from '@aws-sdk/client-ec2';

describe('EC2 Client connection tests', () => {
     const createMockRequest = (body: any) => {
    return {
      json:  async () => {
        return body
      } 
    } as NextRequest;
  } 

  it('EC2 Client receives access key credentials but no region', async () => {

  const mockReq = createMockRequest({
        accessKey: 'AKIA',
        secretKey: '123',
        region: '',
      })

    // const mockReq: Partial<NextRequest> = {
    //   json: async () => ({
    //     accessKey: 'AKIA',
    //     secretKey: '123',
    //     region: '',
    //   }),
    // };

    const testInvoke = await POST(mockReq);
    const body = await testInvoke.json();

    expect(body).toEqual({
      error: 'Missing AWS AccessKey or SecretKey or Region',
    });
  });

  it('EC2 Client receives access key and region but no secret key', async () => {

  const mockReq = createMockRequest({
        accessKey: 'AKIA',
        secretKey: '',
        region: 'us-east-1',
      })
  
    const testInvoke = await POST(mockReq);
    const body = await testInvoke.json();

    expect(body).toEqual({
      error: 'Missing AWS AccessKey or SecretKey or Region',
    });
  });

  it('EC2 Client receives secret key and region but no access key', async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        accessKey: '',
        secretKey: '1234',
        region: 'us-east-1',
      }),
    };

    const testInvoke = await POST(mockReq);
    const body = await testInvoke.json();
    expect(body).toEqual({
      error: 'Missing AWS AccessKey or SecretKey or Region',
    });
  });

  it('Returned response is transformed into correct format', async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        accessKey: 'AKIA',
        secretKey: '1234',
        region: 'us-west-2',
      }),
    };
    const fakeResponse = {
      Reservations: [
        {
          ReservationId: 'r-09aac1d744df206ea',
          OwnerId: '1234567890',
          Groups: [],
          Instances: [
            {
              Architecture: 'x86_64',
              BlockDeviceMappings: [
                {
                  DeviceName: '/dev/xvda',
                  Ebs: {
                    AttachTime: '2025-05-26T15:18:08.000Z',
                    DeleteOnTermination: true,
                    Status: 'attached',
                    VolumeId: 'vol-example',
                  },
                },
              ],
              ClientToken: 'ClientTokenHere',
              EbsOptimized: false,
              EnaSupport: true,
              Hypervisor: 'xen',
              NetworkInterfaces: [
                {
                  Association: {
                    IpOwnerId: 'amazon',
                    PublicDnsName:
                      'ec2-dns-here.us-west-2.compute.amazonaws.com',
                    PublicIp: '00.000.00.000',
                  },
                  Attachment: {
                    AttachTime: '2025-05-26T15:18:07.000Z',
                    AttachmentId: 'eni-attach-idHere',
                    DeleteOnTermination: true,
                    DeviceIndex: 0,
                    Status: 'attached',
                    NetworkCardIndex: 0,
                  },
                  Description: '',
                  Groups: [
                    {
                      GroupId: 'sg-0b8b21b3e5c44424c',
                      GroupName: 'launch-wizard-1',
                    },
                  ],
                  Ipv6Addresses: [],
                  MacAddress: '12.34.56.78.90',
                  NetworkInterfaceId: 'eni-1234567890',
                  OwnerId: '1234567890',
                  PrivateDnsName: 'ip-123-45-67-890.us-west-2.compute.internal',
                  PrivateIpAddress: '123.45.67.890',
                  PrivateIpAddresses: [
                    {
                      Association: {
                        IpOwnerId: 'amazon',
                        PublicDnsName:
                          'ec2-dns-here.us-west-2.compute.amazonaws.com',
                        PublicIp: '00.000.00.000',
                      },
                      Primary: true,
                      PrivateDnsName:
                        'ip-123-45-67-890.us-west-2.compute.internal',
                      PrivateIpAddress: '123.45.67.890',
                    },
                  ],
                  SourceDestCheck: true,
                  Status: 'in-use',
                  SubnetId: 'subnet-here',
                  VpcId: 'vpc-others',
                  InterfaceType: 'interface',
                  Operator: { Managed: false },
                },
              ],
              RootDeviceName: '/dev/xvda',
              RootDeviceType: 'ebs',
              SecurityGroups: [
                {
                  GroupId: 'fakeGroupId',
                  GroupName: 'fakeGroupName',
                },
              ],
              SourceDestCheck: true,
              Tags: [ { Key: 'Name', Value: 'namegoeshere' } ],
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
              UsageOperationUpdateTime: '2025-05-26T15:18:07.000Z',
              PrivateDnsNameOptions: {
                HostnameType: 'ip-name',
                EnableResourceNameDnsARecord: true,
                EnableResourceNameDnsAAAARecord: false,
              },
              MaintenanceOptions: { AutoRecovery: 'default' },
              CurrentInstanceBootMode: 'legacy-bios',
              NetworkPerformanceOptions: { BandwidthWeighting: 'default' },
              Operator: { Managed: false },
              InstanceId: 'i-1234566789',
              ImageId: 'ami-1234567890abc',
              State: { Code: 16, Name: 'running' },
              PrivateDnsName: 'ip-123-45-67-890.us-west-2.compute.internal',
              PublicDnsName: 'ec2-dns-here.us-west-2.compute.amazonaws.com',
              StateTransitionReason: '',
              AmiLaunchIndex: 0,
              ProductCodes: [],
              InstanceType: 't2.micro',
              LaunchTime: '2025-05-26T15:18:07.000Z',
              Placement: {
                GroupName: '',
                Tenancy: 'default',
                AvailabilityZone: 'us-west-2b',
              },
              Monitoring: { State: 'disabled' },
              SubnetId: 'subnet-here',
              VpcId: 'vpc-others',
              PrivateIpAddress: '123.45.67.890',
              PublicIpAddress: '00.000.00.000',
            },
            {
              Architecture: 'x86_64',
              BlockDeviceMappings: [
                {
                  DeviceName: '/dev/xvda',
                  Ebs: {
                    AttachTime: '2025-05-26T15:18:08.000Z',
                    DeleteOnTermination: true,
                    Status: 'attached',
                    VolumeId: 'vol-0198503972e0bc31b',
                  },
                },
              ],
              ClientToken: 'ClientTokenHere',
              EbsOptimized: false,
              EnaSupport: true,
              Hypervisor: 'xen',
              NetworkInterfaces: [
                {
                  Association: {
                    IpOwnerId: 'amazon',
                    PublicDnsName:
                      'ec2-34-216-251-6.us-west-2.compute.amazonaws.com',
                    PublicIp: '12.345.678.90',
                  },
                  Attachment: {
                    AttachTime: '2025-05-26T15:18:07.000Z',
                    AttachmentId: 'eni-attach-078348d69e1d298de',
                    DeleteOnTermination: true,
                    DeviceIndex: 0,
                    Status: 'attached',
                    NetworkCardIndex: 0,
                  },
                  Description: '',
                  Groups: [
                    {
                      GroupId: 'sg-0b8b21b3e5c44424c',
                      GroupName: 'launch-wizard-1',
                    },
                  ],
                  Ipv6Addresses: [],
                  MacAddress: '12.34.56.78.90',
                  NetworkInterfaceId: 'eni-1234567890',
                  OwnerId: '1234567890',
                  PrivateDnsName: 'ip-123.45.67.890.us-west-2.compute.internal',
                  PrivateIpAddress: '123.45.67.890',
                  PrivateIpAddresses: [
                    {
                      Association: {
                        IpOwnerId: 'amazon',
                        PublicDnsName:
                          'ec2-34-216-251-6.us-west-2.compute.amazonaws.com',
                        PublicIp: '12.345.678.90',
                      },
                      Primary: true,
                      PrivateDnsName:
                        'ip-123.45.67.890.us-west-2.compute.internal',
                      PrivateIpAddress: '123.45.67.890',
                    },
                  ],
                  SourceDestCheck: true,
                  Status: 'in-use',
                  SubnetId: 'subnet-here',
                  VpcId: 'vpc-others',
                  InterfaceType: 'interface',
                  Operator: { Managed: false },
                },
              ],
              RootDeviceName: '/dev/xvda',
              RootDeviceType: 'ebs',
              SecurityGroups: [
                {
                  GroupId: 'fakeGroupId',
                  GroupName: 'fakeGroupName',
                },
              ],
              SourceDestCheck: true,
              Tags: [ { Key: 'Name', Value: 'namegoeshere2' } ],
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
              UsageOperationUpdateTime: '2025-05-26T15:18:07.000Z',
              PrivateDnsNameOptions: {
                HostnameType: 'ip-name',
                EnableResourceNameDnsARecord: true,
                EnableResourceNameDnsAAAARecord: false,
              },
              MaintenanceOptions: { AutoRecovery: 'default' },
              CurrentInstanceBootMode: 'legacy-bios',
              NetworkPerformanceOptions: { BandwidthWeighting: 'default' },
              Operator: { Managed: false },
              InstanceId: 'i-12340975980',
              ImageId: 'ami-1234567890abc',
              State: { Code: 16, Name: 'running' },
              PrivateDnsName: 'ip-123.45.67.890.us-west-2.compute.internal',
              PublicDnsName: 'ec2-dns-here.us-west-2.compute.amazonaws.com',
              StateTransitionReason: '',
              AmiLaunchIndex: 1,
              ProductCodes: [],
              InstanceType: 't2.micro',
              LaunchTime: '2025-05-26T15:18:07.000Z',
              Placement: {
                GroupName: '',
                Tenancy: 'default',
                AvailabilityZone: 'us-west-2b',
              },
              Monitoring: { State: 'disabled' },
              SubnetId: 'subnet-here',
              VpcId: 'vpc-others',
              PrivateIpAddress: '123.45.67.890',
              PublicIpAddress: '12.345.678.90',
            },
          ],
        },
      ],
    };

    const res = [
      {
        instanceId: 'i-1234566789',
        state: 'running',
        name: 'namegoeshere',
        type: 't2.micro',
        launchTime: '2025-05-26T15:18:07.000Z',
        SecurityGroups: [
          {
            groupId: 'fakeGroupId',
            groupName: 'fakeGroupName',
          },
        ],
        PrivateIpAddress: '123.45.67.890',
        PublicIpAddress: '00.000.00.000',
      },
      {
        instanceId: 'i-12340975980',
        state: 'running',
        name: 'namegoeshere2',
        type: 't2.micro',
        launchTime: '2025-05-26T15:18:07.000Z',
        SecurityGroups: [
          {
            groupId: 'fakeGroupId',
            groupName: 'fakeGroupName',
          },
        ],
        PrivateIpAddress: '123.45.67.890',
        PublicIpAddress: '12.345.678.90',
      },
    ];

    const spy1 = jest
      .spyOn(EC2Client.prototype, 'send')
      .mockResolvedValue(fakeResponse);
    // jest.spyOn()

    const testInvoke = await POST(mockReq);
    const body = await testInvoke.json();

    expect(body).toEqual({ res });
    spy1.mockRestore();
  });

  it('EC2 Client receives invalid access credentials', async () => {
    const mockReq = createMockRequest({
        accessKey: 'AKIA',
        secretKey: '123',
        region: 'blarg',
      })
    

    const mockResponse = await POST(mockReq);
    const body = await mockResponse.json();

    expect(body).toEqual({ statusText: 'error: invalid credentials' });
  });
});
