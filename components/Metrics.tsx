'use client'

import React from 'react';
import useMetricsFetch from '../fetch/metricsFetch';

type insdataProps = {
  insData: any[];
};


//!connect metricsFetch to here
const Metrics = ({ insData }: insdataProps) => {
  // console.log('instance list', insData);
  const instance_1 = insData[0];
  // const metrics = ['CPUUtilization'];
  // const instances = insData;
  const instanceMetricbody ={
    metrics:['CPUUtilization'],
    instances:insData
  }
  // deconstruct custom hook
   const {response, error, sendMetricsRequest} = useMetricsFetch();
   sendMetricsRequest('/api/awsmetrics', instanceMetricbody )
   console.log("metricResponse", response)
   console.log("metricError", error)
  const { name, type, instanceId, state, launchTime, PublicIpAddress } = instance_1;

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
