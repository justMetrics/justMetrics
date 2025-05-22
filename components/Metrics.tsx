import React from 'react';
type insdataProps = {
  insData: any[];
};
const Metrics = ({ insData }: insdataProps) => {
  console.log('instance list', insData);
  const instance_1 = insData[0];
  const { name, type, instanceId, state, launchTime, PublicIpAddress } =
    instance_1;
  return (
    <div>
      <div>name: {name}</div>
      <div>instanceId: {instanceId}</div>
      <div>type: {type}</div>
      <div>state: {state}</div>
      <div>launchTime: {launchTime}</div>
      <div>PublicIpAddress: {PublicIpAddress}</div>
    </div>
  );
};

export default Metrics;
