'use client';

import React, { useState, useEffect } from 'react';
import useMetricsFetch from '../fetch/metricsFetch';
import { ChartCPU } from './chartCPU';
import InstanceMetaData from './InstanceMetaData';
import Test from './Test';
import Select from 'react-select';
import Sidebar from './Sidebar';

type insdataProps = {
  insData: any[];
  credentials: string[];
  selectedRegion: string;
};
//credentials 0 access key 1 secret accesskey
//!connect metricsFetch to here

const Metrics = ({ insData, credentials, selectedRegion }: insdataProps) => {
  // console.log('instance list from Metrics.tsx', insData);
  const [instanceMetaData, setInstanceMetaData] = useState();
  const [instanceMetrics, setInstanceMetrics] = useState();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  // console.log("MetricsStuff", insData, region)
  const handleToggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const handleSelectInstance = (instanceId: string) => {
    const selectedInstanceMetaData = insData.filter(
      (el) => instanceId === el.instanceId
    );
    // console.log('handleSelectMetadata',selectedInstanceMetaData)
    setInstanceMetaData(selectedInstanceMetaData[0]);
    const selectedInstanceMetrics = response![instanceId];
    setInstanceMetrics(selectedInstanceMetrics);
  };

  const instanceIdList = insData.map((elem) => elem.instanceId);
  // console.log(instanceIdList);
  const instanceMetricbody = {
    metrics: [
      'CPUUtilization',
      'NetworkIn',
      'NetworkOut',
      'CPUCreditBalance',
      'CPUCreditUsage',
      'StatusCheckFailed',
    ],
    instances: insData,
    credentials: credentials,
    region: selectedRegion,
  };
  console.log(instanceMetricbody, 'instancemetricbody');
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
    <div className=' min-h-screen max-w-screen p-10 box-border flex flex-col'>
      <div className='flex-1 min-w-full flex flex-col items-center rounded-3xl  bg-gradient-to-br from-gray-200 to-blue-200  shadow-2xl relative overflow-hidden p-5'>
        <Sidebar
          isSidebarActive={isSidebarActive}
          handleToggleSidebar={handleToggleSidebar}
        />
        <nav className='w-full h-20 flex items-center justify-between mb-10'>
          <div className='flex items-center'>
            <div
              className='logo w-14 h-20 flex items-center ml-6 cursor-pointer hover:scale-110 transition-all'
              onClick={() => handleToggleSidebar()}
            >
              <img className='w-full' src='./logo.png' alt='' />
            </div>
            <div className='name h-20 flex items-center ml-4'>
              <h1 className='text-2xl font-bold leading-tight'>
                Just <br /> Metrics
              </h1>
            </div>
          </div>

          <div className='flex items-center mr-7'>
            <Select
              classNamePrefix='instancesList'
              options={instancesList}
              onChange={(selected) => handleSelectInstance(selected!.value)}
              placeholder='Select an instance...'
              isSearchable={false}
            />
          </div>
        </nav>

        <main className=' w-full flex flex-col items-center'>
          <section className='h-[260px] w-[800px] rounded-3xl bg-white/70 flex flex-col shadow-lg mb-10 p-10'>
            {instanceMetaData ? (
              <InstanceMetaData instanceMetaData={instanceMetaData} />
            ) : (
              <div>Select a instance</div>
            )}
          </section>

          <section className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10'>
            {instanceMetrics ? (
              instanceMetrics?.map((metricData, index: number) => {
                return (
                  <div
                    key={index}
                    className=' w-full p-3 h-[400px] rounded-3xl bg-white/70 flex-wrap shadow-lg items-center justify-end'
                  >
                    <ChartCPU key={index} metricData={metricData} />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Metrics;

// overflow-hidden overflow-y-scroll hide-scrollbar
