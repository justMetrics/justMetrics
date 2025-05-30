'use client';

import React, { useState, useEffect } from 'react';
import useMetricsFetch from '../fetch/metricsFetch';
import { ChartCPU } from './chartCPU';
import InstanceMetaData from './InstanceMetaData';
import Select from 'react-select';
import Sidebar from './Sidebar';

// import custom types
import{ insData, metricsProps, instanceMetricbody } from '../types/componentsTypes'

// create Metrics component
const Metrics = ({
  insData,
  credentials,
  selectedRegion,
  setCredentials,
}: metricsProps) => {
  // create use states
  const [instanceMetaData, setInstanceMetaData] =  useState<insData | null>(null);
  const [instanceMetrics, setInstanceMetrics] = useState<insData[] | null>(null);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const handleSelectInstance = (instanceId: string) => {
    const selectedInstanceMetaData = insData.filter(
      (el: insData) => instanceId === el.instanceId
    );
    
    setInstanceMetaData(selectedInstanceMetaData[0]);
    const selectedInstanceMetrics = response![instanceId];
    setInstanceMetrics(selectedInstanceMetrics);
  };

  const instanceIdList = insData.map((elem) => elem.instanceId);
  // console.log(instanceIdList);
  const instanceMetricbody: instanceMetricbody = {
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

  // deconstruct custom hook
  const { response, error, sendMetricsRequest } = useMetricsFetch();
 
  // handle fetch function
  useEffect(() => {
    // inititate fetch
    sendMetricsRequest('/api/awsmetrics', instanceMetricbody);
    // only log if the data is not null
    if (response) console.log('metricResponse', response);
    if (error) console.log('metricError', error);
  }, []);

  // create drop down list for react option
  const instancesList = instanceIdList.map((id) => ({
    value: id,
    label: id,
  }));

  return (
    <div className=' min-h-screen max-w-screen p-10 box-border flex flex-col'>
      <div className='flex-1 min-w-full flex flex-col items-center rounded-3xl  bg-gradient-to-br from-gray-200 to-blue-200  shadow-2xl relative overflow-hidden p-5'>
        <Sidebar
          isSidebarActive={isSidebarActive}
          handleToggleSidebar={handleToggleSidebar}
          setCredentials={setCredentials}
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
              <InstanceMetaData
                instanceMetaData={instanceMetaData}
                selectedRegion={selectedRegion}
              />
            ) : (
              <div>
                <h2>
                  <strong>Region:</strong> {selectedRegion}
                </h2>
                <h2>Please select an instance.</h2>
              </div>
            )}
          </section>

          <section className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-10'>
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
