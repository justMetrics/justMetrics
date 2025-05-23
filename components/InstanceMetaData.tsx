import React from 'react';

type SecurityGroup = {
  groupId: string;
  groupName: string;
};

type InstanceMetadataType = {
  name: string;
  type: string;
  state: string;
  launchTime: string;
  instanceId: string;
  SecurityGroups: SecurityGroup[];
  PublicIpAddress: string;
  PrivateIpAddress: string;
};

type Props = {
  instanceMetaData: InstanceMetadataType;
};

const InstanceMetaData: React.FC<Props> = ({ instanceMetaData }) => {
  const {
    name,
    type,
    state,
    launchTime,
    instanceId,
    SecurityGroups,
    PublicIpAddress,
    PrivateIpAddress,
  } = instanceMetaData;

  return (
    <div className=''>
      <h2 className='font-bold text-lg mb-2 text-center'>
        Instance Name: {name}
      </h2>
      <ul className='text-sm space-y-1 flex justify-center items-center'>
        <div>
          <li>
            <strong>Instance ID:</strong> {instanceId}
          </li>
          <li>
            <strong>Type:</strong> {type}
          </li>
          <li>
            <strong>State:</strong> {state}
          </li>
          <li>
            <strong>Launch Time:</strong>{' '}
            {new Date(launchTime).toLocaleString()}
          </li>
        </div>
        <div className='ml-10'>
          <li>
            <strong>Public IP:</strong> {PublicIpAddress}
          </li>
          <li>
            <strong>Private IP:</strong> {PrivateIpAddress}
          </li>
          <li>
            <strong>Security Groups:</strong>
            <ul className='ml-4 list-disc'>
              {SecurityGroups.map((group) => (
                <li key={group.groupId}>
                  {group.groupName} ({group.groupId})
                </li>
              ))}
            </ul>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default InstanceMetaData;
