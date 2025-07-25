'use client';

import React, { useState, useEffect } from 'react';
import useMetricsFetch from '../../fetch/metricsFetch';
import { ChartCPU } from './chartCPU';
import InstanceMetaData from './InstanceMetaData';
import Select from 'react-select';
import Sidebar from './Sidebar';
import { LoadingListIcon } from './LoadingListIcon';

// import custom types
import {
  insData,
  metricsProps,
  instanceMetricbody,
  instanceMetrics,
} from '../../types/componentsTypes';

/**
 * Metrics Component: Displays AWS EC2 instance meta data and their metrics with charts
 *
 * Props:
 *  insData - Array of instance metadata
 * credentials - AWS access credentials [accessKey, secretKey]
 * selectedRegion - Currently selected region
 * setCredentials - Callback to update credentials
 */

// create Metrics component
const Metrics = ({
  insData,
  credentials,
  selectedRegion,
  setCredentials,
}: metricsProps) => {
  // create use states
  const [instanceMetaData, setInstanceMetaData] = useState<insData | null>(
    null
  );
  const [instanceMetrics, setInstanceMetrics] = useState<
    instanceMetrics[] | null
  >(null);
  const [instanceMetricsLoading, setInstanceMetricsLoading] =
    useState<boolean>(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // Toggle sidebar visibility
  const handleToggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  /**
   * Handles instance selection from dropdown
   * @param instanceId - selected instance ID
   */

  const handleSelectInstance = (instanceId: string) => {
    //match selected instanceID with one of the element in recieved insData
    const selectedInstanceMetaData = insData.filter(
      (el: insData) => instanceId === el.instanceId
    );

    setInstanceMetaData(selectedInstanceMetaData[0]);
    const selectedInstanceMetrics = response![instanceId];
    setInstanceMetrics(selectedInstanceMetrics);
  };

  // Prepare instance IDs for dropdown
  const instanceIdList = insData.map((elem) => elem.instanceId);

  // Metrics request payload configuration
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

  // Custom hook for metrics fetching
  const { response, error, sendMetricsRequest } = useMetricsFetch();

  // useEffect will fetch metrics data when the page loaded and set the icon for loading
  useEffect(() => {
    const fetchMetrics = () => {
      sendMetricsRequest('/api/awsmetrics', instanceMetricbody);
      setInstanceMetricsLoading(true);
    };

    fetchMetrics(); // Initial fetch

    const interval = setInterval(fetchMetrics, 60000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // stop loading once the response or error is in
  useEffect(() => {
    if (response || error) setInstanceMetricsLoading(false);
  }, [response, error]);

  // Format instance IDs for react-select dropdown
  const instancesList = instanceIdList.map((id) => ({
    value: id,
    label: id,
  }));
  return (
    <div className=' min-h-screen max-w-screen p-10 box-border flex flex-col'>
      {/* Main dashboard container */}

      <div className='flex-1 min-w-full flex flex-col items-center rounded-3xl  bg-gradient-to-br from-gray-200 to-blue-200  shadow-2xl relative overflow-hidden p-5'>
        {/* Sidebar component */}
        <Sidebar
          isSidebarActive={isSidebarActive}
          handleToggleSidebar={handleToggleSidebar}
          setCredentials={setCredentials}
        />

        {/* Navigation bar */}
        <nav className='w-full h-auto flex flex-col lg:flex-row items-center justify-between mb-10 gap-4 px-4'>
          {/* left logo and name */}
          <div className='flex items-center'>
            <div
              className='logo w-14 h-20 flex items-center cursor-pointer hover:scale-110 transition-all'
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

          {/* right instances dropdown list */}
          <div className='flex items-center lg:mr-7 w-full lg:w-auto justify-center'>
            {instanceMetricsLoading ? (
              <LoadingListIcon />
            ) : (
              <Select
                classNamePrefix='instancesList'
                options={instancesList}
                onChange={(selected) => handleSelectInstance(selected!.value)}
                placeholder='Select an instance...'
                isSearchable={false}
                className='w-full max-w-[240px]'
              />
            )}
          </div>
        </nav>

        {/* Main content area */}
        <main className=' w-full flex flex-col items-center'>
          {/* Instance metadata section */}
          {/* if instanceMetaData exists, display InstanceMetaData component, otherwise display default "Please select an instance" */}
          <section className='h-auto w-full max-w-[800px] rounded-3xl bg-white/70 flex flex-col shadow-lg mb-10 p-10'>
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

          {/* Metrics charts grid */}
          <section className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 py-10 lg:p-10 lg:pt-10 lg:pb-10 '>
            {instanceMetrics ? (
              instanceMetrics?.map((metricData, index: number) => {
                return (
                  <div
                    key={index}
                    className='w-full p-3 aspect-[4/3] rounded-3xl bg-white/70 shadow-lg'
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
      <button
        type='button'
        onClick={async () => {
          try {
            const res = await fetch('/api/metriccompute', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({instanceMetrics})
            });
            const data = await res.json();
            console.log('data', data)
          } catch (error) {
            console.error('Error fetching metrics:', error);
          }
        }}
      >
        Compute Metrics
      </button>
    </div>
  );
};

export default Metrics;
