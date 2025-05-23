'use client';

import React, { useState, useEffect } from 'react';
import useMetricsFetch from '../fetch/metricsFetch';
import InstanceMetaData from './InstanceMetaData';

type insdataProps = {
  insData: any[];
  credentials: string[];
};
//credentials 0 access key 1 secret accesskey
//!connect metricsFetch to here
const Metrics = ({ insData, credentials }: insdataProps) => {
  // console.log('instance list from Metrics.tsx', insData);
  const [instanceMetaData, setInstanceMetaData] = useState();
  const [instanceMetrics, setInstanceMetrics] = useState();

  const handleSelectInstance = (instanceId: string) => {
    const instanceMetaData = insData.filter(
      (el) => instanceId === el.instanceId
    );

    setInstanceMetaData(instanceMetaData[0]);
    const selectedInstanceMetrics = response![instanceId];
    setInstanceMetrics(selectedInstanceMetrics);
  };
  // console.log(instanceMetaData);
  const instanceIdList = insData.map((elem) => elem.instanceId);

  const instanceMetricbody = {
    metrics: ['CPUUtilization', 'NetworkIn', 'DiskWriteOps'],
    instances: insData,
    credentials: credentials,
  };
  // deconstruct custom hook
  const { response, error, sendMetricsRequest } = useMetricsFetch();

  // handle fetch function

  //! useEffect will show the Metrics Data when the page loaded
  useEffect(() => {
    // inititate fetch
    sendMetricsRequest('/api/awsmetrics', instanceMetricbody);
    // only log if the data is not null
    if (response) console.log('metricResponse', response);
    if (error) console.log('metricError', error);
  }, []);
  //! handler function will show the Metrics Data after click the button

  console.log('instanceMetrics', instanceMetrics);
  return (
    <div>
      <label htmlFor='instanceSelect' className='font-bold'>
        Select EC2 Instance:
      </label>
      <select
        id='instanceSelect'
        className='border rounded p-2'
        onChange={(e) => handleSelectInstance(e.target.value)}
      >
        {instanceIdList.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      {instanceMetaData ? (
        <InstanceMetaData instanceMetaData={instanceMetaData} />
      ) : (
        <div>Select a instance</div>
      )}

      <h2>Cloud Watch Metrics</h2>
    </div>
  );
};

export default Metrics;
