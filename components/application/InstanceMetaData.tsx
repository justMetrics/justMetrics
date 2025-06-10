import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHashtag,
  faMicrochip,
  faCircle,
  faClock,
  faGlobe,
  faLock,
  faShieldAlt,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

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
  selectedRegion: string;
};

const InstanceMetaData: React.FC<Props> = ({
  instanceMetaData,
  selectedRegion,
}) => {
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
    <div>
      <h2 className='text-2xl font-bold  mb-6 text-gray-800'>
        <FontAwesomeIcon icon={faMicrochip} className='mr-2 text-blue-400' />
        Instance: <span className='text-black font-medium'>{name}</span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700'>
        {/* Left column */}
        <ul className='space-y-3'>
          <li>
            <FontAwesomeIcon
              icon={faLocationDot}
              className='mr-2 text-blue-400'
            />
            <strong>Region:</strong> {selectedRegion}
          </li>
          <li>
            <FontAwesomeIcon icon={faHashtag} className='mr-2 text-blue-400' />
            <strong>Instance ID:</strong> {instanceId}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faMicrochip}
              className='mr-2 text-blue-400'
            />
            <strong>Type:</strong> {type}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCircle}
              className={
                state === 'running'
                  ? 'mr-2 text-green-500'
                  : state === 'stopped'
                  ? 'mr-2 text-red-500'
                  : state === 'pending' ||
                    state === 'stopping' ||
                    state === 'shutting-down'
                  ? 'mr-2 text-yellow-500'
                  : 'mr-2 text-gray-500'
              }
            />
            <strong>State:</strong> {state}
          </li>
        </ul>

        {/* Right column */}
        <ul className='space-y-3'>
          <li>
            <FontAwesomeIcon icon={faClock} className='mr-2 text-blue-400' />
            <strong>Launch Time:</strong>{' '}
            {new Date(launchTime).toLocaleString()}
          </li>
          <li>
            <FontAwesomeIcon icon={faGlobe} className='mr-2 text-blue-400' />
            <strong>Public IP:</strong> {PublicIpAddress}
          </li>
          <li>
            <FontAwesomeIcon icon={faLock} className='mr-2 text-blue-400' />
            <strong>Private IP:</strong> {PrivateIpAddress}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faShieldAlt}
              className='mr-2 text-blue-400'
            />
            <strong>Security Groups:</strong>
            <ul className='ml-6 list-disc'>
              {SecurityGroups.map((group) => (
                <li key={group.groupId}>
                  {group.groupName} ({group.groupId})
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InstanceMetaData;
