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

const ChartCPU = ({ response }) => {
  if (!response) {
    return <p>Loading...</p>;
  }

  const instanceID = 'i-0d0415734a474f0c0'; //! Hard Code now!
  console.log(response);
  const x = response[instanceID].filter((el) => el.CPUUtilization)[0]
    .CPUUtilization.Timestamps;
  const y = response[instanceID].filter((el) => el.CPUUtilization)[0]
    .CPUUtilization.Values;

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
