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
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

// import custom types
import { } from '../types/componentsTypes';

ChartJS.register( //ChartJs register of imported modules for use below.
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  LineElement,
  TimeScale,
  Tooltip
);

export function ChartCPU({ metricData }) {
  if (!metricData) {
    return <p>Loading...</p>;
  }

  const metricKeyArr = Object.keys(metricData); 
  const metricKey = metricKeyArr[0];
  //the following three objects contain necessary chart configuration details that are selected based on the metricKey (ie metric name).
  //In practice we would want to have unique configuraitons for each metric instead of hardcoding them like this but this was judged to be the 
  //best compromise of reusability and modularity given available resources
  const metrics = {  //this maps axis titles to the relevant metric
    CPUUtilization: '%',
    NetworkIn: 'Bytes',
    NetworkOut: 'Bytes',
    DiskWriteOps: 'Operations',
    CPUCreditBalance: 'Credits Balance',
    CPUCreditUsage: 'Credits Used',
    StatusCheckFailed: 'Failed Checks',
  };

  const chartTitles = { //maps chart titles to relevant metric
    CPUUtilization: 'CPU Utilization',
    NetworkIn: 'Network In',
    NetworkOut: 'Network Out',
    DiskWriteOps: 'Disk Writing Operations',
    CPUCreditBalance: 'EC2 CPU Credit Balance',
    CPUCreditUsage: 'EC2 CPU Credits Used',
    StatusCheckFailed: 'Failed Status Checks',
  };

  const roundY = { //rounding of decimals for the chart tooltips
    CPUUtilization: 2,
    NetworkIn: 0,
    NetworkOut: 0,
    CPUCreditBalance: 1,
    CPUCreditUsage: 3,
    StatusCheckFailed: 0,
  };

  const yAxisTitle = metrics[metricKey] as string;
  const chartTitle = chartTitles[metricKey] as string;
  const yAxisRounding = roundY[metricKey];

  const x = metricData[metricKey].Timestamps.reverse(); //the incoming metricData object 
  // has timestamps and values reversed because AWS provides the data most recent first which is the opposite of what we want

  const y = metricData[metricKey].Values.reverse();

  const chart = { //chart configuration details
    labels: x,
    datasets: [ 
      {
        label: chartTitle,

        data: y, 
        borderColor: 'rgb(76, 139, 255)',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const precisionValue = chartTitle === 'Failed Status Checks' ? 0 : undefined; //this is a manual fix for changing the 
  //chart ticks for the StatusCheckFailed chart only. all other charts use default ticks and hence dont need manual override.

  const options = { // chart configuration options
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: { //config for the datapoints shown on hover
        mode: 'nearest',
        intersect: false,
        bodyColor: 'rgb(76, 204, 255)',
        callbacks: {
          label: (context) => { //this is using the previously established rounding points to round the data for the display tooltips shown on chart hover
            return `Y: ${context.parsed.y.toFixed(
              yAxisRounding
            )} ${yAxisTitle}`;
          },
        },
      },

      title: { //title config
        display: true,
        text: chartTitle,
        color: 'rgb(46, 50, 56)',
        font: {
          size: 17,
        },
      },
    },
    scales: { //this transforms the AWS timestamps into a better date visualisation format
      x: {
        type: 'time' as const,

        time: {
          displayFormats: { hour: 'HH:mm' },
          unit: 'hour' as const,
        },
      },
      y: {

        ticks: { //y axis rounding based on the previously established precision value
          precision: precisionValue, 
        },

        title: { //title configuration options
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
