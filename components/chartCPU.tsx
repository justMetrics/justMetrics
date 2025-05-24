'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
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
  const metricKey=metricKeyArr[0]
  console.log(metricKey);
console.log (metricData[metricKey].Timestamps.reverse())
    const x = metricData[metricKey].Timestamps.reverse()
  //   //   .filter((el) => el.CPUUtilization)[0]
  //   //   .CPUUtilization.Timestamps.reverse();
  //   // const y = metricData
  //   //   .filter((el) => el.CPUUtilization)[0]
  //   //   .CPUUtilization.Values.reverse();
  const y = metricData[metricKey].Values.reverse()
    const chart = {
      labels: x,
      datasets: [
        {
          label: 'CPU Utilization(%)',
          data: y,
        },
      ],
    };

  return <Line data={chart} />;
  
}
