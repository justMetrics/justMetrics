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

const ChartCPU = ({ metricData }) => {
  if (!metricData) {
    return <p>Loading...</p>;
  }

  const instanceID = 'i-02a29f2e459e18bf0'; //! Hard Code now!
  console.log('metricData', metricData);
  const x = metricData
    .filter((el) => el.CPUUtilization)[0]
    .CPUUtilization.Timestamps.reverse();
  const y = metricData
    .filter((el) => el.CPUUtilization)[0]
    .CPUUtilization.Values.reverse();

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
};

export default ChartCPU;
