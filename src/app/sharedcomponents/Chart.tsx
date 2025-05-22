'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

//right now im assuming that the instance isnt needed

ChartJS.register(
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Chart({
  timestamps,
  values,
  label,
}: {
  timestamps: string[];
  values: number[];
  label: string;
}) {
  const data = {
    labels: timestamps
      .slice()
      .reverse()
      .map((time) => new Date(time)),
    datasets: [
      {
        label: label,
        data: values.reverse(),
        borderColor: 'rgb(0, 0, 0)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'minute' as const,
        },
      },
      y: {

      },
    },
  };

  return <Line data={data} options={options} />;
}
