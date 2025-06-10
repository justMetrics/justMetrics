'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

// import custom types
import { ChartCPUProps } from '../../types/componentsTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  LineElement,
  TimeScale,
  Tooltip
);

export function ChartCPU({ metricData }: ChartCPUProps) {
  
  if (!metricData) {
    return <p>Loading...</p>;
  }

  const metricKeyArr = Object.keys(metricData);
  const metricKey = metricKeyArr[0];
  const metrics: Record<string, string> = {
    CPUUtilization: '%',
    NetworkIn: 'Bytes',
    NetworkOut: 'Bytes',
    DiskWriteOps: 'Operations',
    CPUCreditBalance: 'Credits Balance',
    CPUCreditUsage: 'Credits Used',
    StatusCheckFailed: 'Failed Checks',
  };

  const chartTitles: Record<string, string> = {
    CPUUtilization: 'CPU Utilization',
    NetworkIn: 'Network In',
    NetworkOut: 'Network Out',
    DiskWriteOps: 'Disk Writing Operations',
    CPUCreditBalance: 'EC2 CPU Credit Balance',
    CPUCreditUsage: 'EC2 CPU Credits Used',
    StatusCheckFailed: 'Failed Status Checks',
  };

  const roundY: Record<string, number> = {
    CPUUtilization: 2,
    NetworkIn: 0,
    NetworkOut: 0,
    CPUCreditBalance: 1,
    CPUCreditUsage: 3,
    StatusCheckFailed: 0,
  };

  const yAxisTitle: string = metrics[metricKey];
  const chartTitle = chartTitles[metricKey];
  const yAxisRounding = roundY[metricKey];
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
        label: chartTitle,

        data: y, //if numers in y are greater than 100,000 change axis to 100k
        borderColor: 'rgb(76, 139, 255)',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const precisionValue = chartTitle === 'Failed Status Checks' ? 0 : undefined;

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    // hover: {
    //   mode: 'ne',
    //   intersect: false,
    // },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
        bodyColor: 'rgb(76, 204, 255)',
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `Y: ${context.parsed.y.toFixed(
              yAxisRounding
            )} ${yAxisTitle}`;
          },
        },
      },

      title: {
        display: true,
        text: chartTitle,
        color: 'rgb(46, 50, 56)',
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
          displayFormats: { hour: 'HH:mm' },
          unit: 'hour' as const,
        },
      },
      y: {
        //   ticks: {
        // callback: function(value) {

        //   return String(value%1000) +'K';}},
        ticks: {
          precision: precisionValue,
        },

        title: {
          display: true,
          text: yAxisTitle,
          align: 'center',
          color: 'rgb(47, 50, 55)',
          font: {
            size: 13,
          },
        },
      },
    },
  };

  return <Line data={chart} options={options} />;
}
