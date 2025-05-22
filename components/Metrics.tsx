'use client';

import React, { useEffect } from 'react';
import useMetricsFetch from '../fetch/metricsFetch';

type insdataProps = {
  insData: any[];
  credentials: string[];
};
//credentials 0 access key 1 secret accesskey
//!connect metricsFetch to here
const Metrics = ({ insData, credentials }: insdataProps) => {
  console.log('instance list from Metrics.tsx', insData);
  const instance_1 = insData[0];
  const { name, type, instanceId, state, launchTime, PublicIpAddress } =
    instance_1;
  // const metrics = ['CPUUtilization'];
  // const instances = insData;
  const instanceMetricbody = {
    metrics: ['CPUUtilization', 'NetworkIn', 'DiskWriteOps'],
    instances: insData,
    credentials: credentials,
  };
  // deconstruct custom hook
  const { response, error, sendMetricsRequest } = useMetricsFetch();

  // handle fetch function
  const handleFetch = () => {
    // inititate fetch
    sendMetricsRequest('/api/awsmetrics', instanceMetricbody);
    // only log if the data is not null
    if (response) console.log('metricResponse', response);
    if (error) console.log('metricError', error);
  };

  return (
    <div>
      <div>name: {name}</div>
      <div>instanceId: {instanceId}</div>
      <div>type: {type}</div>
      <div>state: {state}</div>
      <div>launchTime: {launchTime}</div>
      <div>PublicIpAddress: {PublicIpAddress}</div>
      <button
        className='border-3 rounded-xl hover:bg-blue-300 bg-blue-200 m-4 p-4'
        onClick={handleFetch}
      >
        Fetch Here
      </button>
      <h2>Cloud Watch Metrics</h2>
    
    </div>
  );
};

export default Metrics;
