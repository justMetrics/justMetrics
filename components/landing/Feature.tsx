'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faMicrochip,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: faLock,
    title: 'Connect to AWS Instantly',
    description:
      'Seamlessly authenticate and connect to your AWS infrastructure in seconds.',
  },
  {
    icon: faMicrochip,
    title: 'Real-time EC2 Metrics Dashboard',
    description:
      'Monitor key instance metrics like CPU, memory, and network usage—all in one visual dashboard.',
  },
  {
    icon: faChartLine,
    title: 'Actionable Insights Made Simple',
    description:
      'Understand trends over time and make smarter infrastructure decisions with built-in insights.',
  },
];

const Features = () => {
  return (
    <section
      id='features'
      className='bg-white px-6 my-20 md:px-16 flex flex-col justify-center'
    >
      <h2 className='text-3xl font-bold text-center mb-12'>Key Features</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-gray-100 p-10 rounded-xl shadow-md hover:shadow-lg transition text-center h-80 flex flex-col justify-center'
          >
            <FontAwesomeIcon
              icon={feature.icon}
              className='text-blue-600 text-4xl mb-4'
            />
            <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
            <p className='text-gray-700'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
