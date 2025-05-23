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
  console.log(instanceIdList)
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

  console.log('final res', response);
  return (
    <div className='h-screen flex flex-col items-center rounded-3xl border-2 m-4 bg-gray-200 '>

      <header className='h-[15%] flex flex-row items-center text-5xl font-serif'>
          <h1>Just Metrics</h1>
      </header>

      <nav className='self-end flex flex-col items-end' >
        <div>
          <label htmlFor='instanceSelect' className='font-bold p-2 text-xl'>
            Select Region:
          </label>
          <select
              id='regionSelect'
              className='border rounded-3xl p-2 m-2 mr-7 bg-gray-100'>
                <option>US West 1</option>
                <option>US West 2</option>
                <option>US West 3</option>
                <option>US East 1</option>
                <option>US East 2</option>
                <option>US East 3</option>
          </select>
        </div>
        <div>
          <label htmlFor='instanceSelect' className='font-bold p-2 text-xl'>
            Select EC2 Instance:
          </label>
          <select
              id='instanceSelect'
              className='border rounded-3xl p-2 m-2 mr-7 bg-gray-100'
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
          </div>
      </nav>
      
        <h2 className='font-bold text-xl p-2 rounded-3xl border-2 bg-gray-100' >Cloud Watch Metrics</h2>
  
      <main className='h-[70%] w-[97%] flex flex-col items-center rounded-3xl border-4 m-4'>
        <section className='h-[32%] w-[98%] p-3 m-4 mb-2 border-2 rounded-3xl bg-gray-50 flex flex-col flex-wrap overflow-hidden'>
          <p>Instance Name: Us-East-2</p>
          <p>Instance Id: 02a29f2e459e18bf0</p>
          <p>Metric: CPU</p>
          <p>Ipv4: 123.456.789</p>
          <p>Instance Name: Us-East-2</p>
          <p>Instance Id: 02a29f2e459e18bf0</p>
          <p>Metric: CPU</p>
          <p>Ipv4: 123.456.789</p>
        </section>     
        <section className='h-[58%] w-[98%] flex flex-row text-2xl font-serif' >
          <div className='h-[100%] w-[32.6%] p-3 m-2 mt-2 border-2 rounded-3xl bg-gray-50 flex flex-col items-center'>
          <h1>CPU Utilization</h1>
          </div>
          <div className='h-[100%] w-[32%] p-3 m-2 mt-2 border-2 rounded-3xl bg-gray-50 flex flex-col items-center '>
          <h1>CPU Utilization</h1>
          </div>
          <div className='h-[100%] w-[32%] p-3 m-2 mt-2 border-2 rounded-3xl bg-gray-50 flex flex-col items-center '>
          <h1>CPU Utilization</h1>
          </div>
        </section>   
        
      </main>
    </div>
  );
};

export default Metrics;

// overflow-hidden overflow-y-scroll hide-scrollbar