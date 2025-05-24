'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  LineElement,
  TimeScale
);

export function ChartCPU({ metricData }) {
  console.log('metricDataProp', metricData);
  if (!metricData) {
    return <p>Loading...</p>;
  }

  // const instanceID = 'i-06099a5a414309d0e'; //! Hard Code now!
  const metricKeyArr = Object.keys(metricData);
  const metricKey = metricKeyArr[0];
  const metrics={
    CPUUtilization: '%',
  NetworkIn: 'Bytes',
  NetworkOut:'Bytes',
  DiskWriteOps: 'Operations',
  }
  const yAxisTitle = metrics[metricKey] as string
  // console.log(metricKey);
  // console.log (metricData[metricKey].Timestamps.reverse())
  const x = metricData[metricKey].Timestamps.reverse();
  //   //   .filter((el) => el.CPUUtilization)[0]
  //   //   .CPUUtilization.Timestamps.reverse();
  //   // const y = metricData
  //   //   .filter((el) => el.CPUUtilization)[0]
  //   //   .CPUUtilization.Values.reverse();
  const y = metricData[metricKey].Values.reverse();
  // if yAxisTitle ===bytes
  //transform axis for y
  const chart = {
    labels: x,
    datasets: [
      {
        data: y,//if numers in y are greater than 100,000 change axis to 100k
        borderColor: 'rgb(76, 139, 255)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: metricKey,
        color:'rgb(46, 50, 56)',
        font: {
          size: 17,
  
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        // title:{
        // text: 'Time',
        // display: 'true',
        // align: 'center',
        // },
        time: {
        displayFormats: {hour: 'HH:mm'},
          unit: 'hour' as const,
        },
      },
      y: {
        //   ticks: {
        // callback: function(value) {
          
          
        //   return String(value%1000) +'K';}},
        title:{
          display: true,
        text: yAxisTitle,
        align: 'center',
        color: 'rgb(47, 50, 55)',
        font: {
          size: 13,
        },
        }
      },
    },
  };

  return <Line data={chart} options={options} />;
}
