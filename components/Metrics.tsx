'use client';

import React, { useState, useEffect } from 'react';
import useMetricsFetch from '../fetch/metricsFetch';

type insdataProps = {
  insData: any[];
  credentials: string[];
};
//credentials 0 access key 1 secret accesskey
//!connect metricsFetch to here
const Metrics = ({ insData, credentials }: insdataProps) => {
  console.log('instance list from Metrics.tsx', insData);

  const instanceIdList = insData.map((elem) => elem.instanceId);
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

  const test = response?.MetricDataResults.map((elem: any, index: number) => (
    <li key={index} className='text-gray-800'>
      {elem.Id} {elem.Label}
    </li>
  ));
  console.log('test', test);
  //! useEffect will show the Metrics Data when the page loaded
  useEffect(() => {
    // inititate fetch
    sendMetricsRequest('/api/awsmetrics', instanceMetricbody);
    // only log if the data is not null
    if (response) console.log('metricResponse', response);
    if (error) console.log('metricError', error);
  }, []);
  //! handler function will show the Metrics Data after click the button
  // const handleFetch = () => {
  //   // inititate fetch
  //   sendMetricsRequest('/api/awsmetrics', instanceMetricbody);
  //   // only log if the data is not null
  //   if (response) console.log('metricResponse', response);
  //   if (error) console.log('metricError', error);
  // };

  return (
    <div>
      <label htmlFor='instanceSelect' className='font-bold'>
        Select EC2 Instance:
      </label>
      <select
        id='instanceSelect'
        className='border rounded p-2'
        onChange={(e) => {
          console.log('Selected instance:', e.target.value);
        }}
      >
        {instanceIdList.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <button
        className='border-3 rounded-xl hover:bg-blue-300 bg-blue-200 m-4 p-4'
        // onClick={handleFetch}
      >
        Fetch Here
      </button>
      <h2>Cloud Watch Metrics</h2>
      <div>
        {test}
        {/* Cloud Watch Metrics: {response.MetricDataResults.map( (elem)=> {
     return  elem.Label})} */}
        {/* response!.MetricDataResults[0].Timestamps} */}
      </div>
      {
        // response. MetricDataResults.forEach((el)=>{
        //  <div>{el}</div>
        // })
      }
    </div>
  );
};

export default Metrics;
