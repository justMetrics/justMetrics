'use client';

import React, { useState, useEffect } from 'react';
import useMetricsFetch from '../fetch/metricsFetch';
import { ChartCPU } from './chartCPU';
import InstanceMetaData from './InstanceMetaData';
import Test from './Test';
import Select from 'react-select';

type insdataProps = {
  insData: any[];
  credentials: string[];
  selectedRegion:string;
};
//credentials 0 access key 1 secret accesskey
//!connect metricsFetch to here

const Metrics = ({ insData, credentials, selectedRegion }: insdataProps) => {
  // console.log('instance list from Metrics.tsx', insData);
  const [instanceMetaData, setInstanceMetaData] = useState();
  const [instanceMetrics, setInstanceMetrics] = useState();
  // console.log("MetricsStuff", insData, region)
  const handleSelectInstance = (instanceId: string) => {
    const selectedInstanceMetaData = insData.filter(
      (el) => instanceId === el.instanceId
    );
    console.log('handleSelectMetadata',selectedInstanceMetaData)
    setInstanceMetaData(selectedInstanceMetaData[0]);
    const selectedInstanceMetrics = response![instanceId];
    setInstanceMetrics(selectedInstanceMetrics);
  };

  const instanceIdList = insData.map((elem) => elem.instanceId);
  // console.log(instanceIdList);
  const instanceMetricbody = {
    metrics: ['CPUUtilization', 'NetworkIn', 'NetworkOut'],
    instances: insData,
    credentials: credentials,
    region:selectedRegion
  };
  console.log(instanceMetricbody,'instancemetricbody')
  // deconstruct custom hook
  const { response, error, sendMetricsRequest } = useMetricsFetch();
  console.log('instanceMetaData', response);
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

  const charts = instanceMetrics?.map((metricData, index: number) => {
    console.log('congratulations, this is rendering', instanceMetrics);

    <ChartCPU key={index} metricData={metricData}></ChartCPU>;
  });

  // create drop down list for react option
   const instancesList = instanceIdList.map((id) => ({
    value: id,
    label: id,
  }));

  // console.log('instanceMetrics', instanceMetrics);
  return (
    <div className='h-screen max-w-screen p-4 box-border'>
    <div className='min-h-full min-w-full flex flex-col items-center rounded-3xl border-2 bg-gray-200 '>
      <header className='h-[15vh] flex flex-row items-center text-5xl font-serif p-7'>
        <h1>Just Metrics</h1>
      </header>

      <nav className='h-[10vh] self-end flex flex-col items-end'>
        {/* <div>
          <label htmlFor='instanceSelect' className='font-bold p-2 text-xl'>
            Select Region:
          </label>
          <select
            id='regionSelect'
            className='border rounded-3xl p-2 m-2 mr-7 bg-gray-100'
          >
            <option>US West 1</option>
            <option>US West 2</option>
            <option>US West 3</option>
            <option>US East 1</option>
            <option>US East 2</option>
            <option>US East 3</option>
          </select>
        </div> */}
        <div className='flex mr-7 items-center' >
          <label htmlFor='instanceSelect' className='font-bold p-2 text-xl'>
            Select EC2 Instance:
          </label>
          <Select
          classNamePrefix="instancesList"
          options={instancesList}
          onChange={(selected) => handleSelectInstance(selected!.value)}
          placeholder="Select an instance..."
          isSearchable={false}
          />
        </div>
      </nav>

      <h2 className=' h-[5vh] flex items-center font-bold text-xl m-2 p-2 rounded-3xl border-2 bg-gray-100'>
        Cloud Watch Metrics
      </h2>

      <main className='h-[60vh] w-[95vw] flex flex-col items-center rounded-3xl border-4 m-4'>
        <section className='h-[32%] w-[98%] p-3 m-4 mb-2 border-2 rounded-3xl bg-gray-50 flex flex-col flex-wrap overflow-hidden'>
          {instanceMetaData ? (
            <InstanceMetaData instanceMetaData={instanceMetaData} />
          ) : (
            <div>Select a instance</div>
          )}
        </section>

        {/* 
              instanceMetrics
              [{cpu},{network},{disk}]
            
            */}

        <section className='h-[58%] w-[98%] flex flex-row text-2xl font-serif'>
          {instanceMetrics ? (
            // <ChartCPU metricData={instanceMetrics[0]} />
            // charts
            instanceMetrics?.map((metricData, index: number) => {
              // console.log('metricData', metricData);
              // console.log(
              //   'congratulations, this is rendering',
              //   metricData
              // );
              // <div>{metricData}</div>
              // <ChartCPU key={index} metricData={metricData}/>
              return (
                <div
                  key={index}
                  className='h-[36vh] w-[32.6%] p-3 m-2 mt-2 border-2 rounded-3xl bg-gray-50 flex flex-col items-center justify-end'
                >
                  <ChartCPU key={index} metricData={metricData} />
                </div>
              );
              //   // console.log(123);
            })
          ) : (
            <div>Select a instance</div>
          )}
        </section>
      </main>
    </div>
    </div>
  );
};

export default Metrics;

// overflow-hidden overflow-y-scroll hide-scrollbar
