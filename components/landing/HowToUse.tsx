'use client';
import React from 'react';

const steps = [
  {
    title: 'Step 1: Connect AWS',
    description:
      'Paste your access key and secret to securely connect to your AWS account and fetch metrics.',
    image: './how_to_use_1.png',
  },
  {
    title: 'Step 2: Select Instance',
    description:
      'Choose the EC2 instance you want to monitor from the dropdown menu.',
    image: './how_to_use_1.png',
  },
  {
    title: 'Step 3: View Metrics',
    description:
      'Check CPU usage, network traffic, and memory data in beautiful charts.',
    image: './how_to_use_1.png',
  },
  {
    title: 'Step 4: Get Insights',
    description:
      'See performance trends and optimize your infrastructure with real-time insights.',
    image: './how_to_use_1.png',
  },
];

const HowToUse = () => {
  return (
    <section
      id='how-to-use'
      className='w-full px-6 md:px-16 py-16 space-y-24 bg-gray-50'
    >
      {steps.map((step, index) => {
        const isReversed = index % 2 !== 0;
        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              isReversed ? 'md:flex-row-reverse' : ''
            } items-center h-[400px]`}
          >
            {/* Text */}
            <div className='md:w-1/2 p-6'>
              <h3 className='text-2xl font-bold mb-4'>{step.title}</h3>
              <p className='text-gray-700 text-lg'>{step.description}</p>
            </div>

            {/* Image */}
            <div className='md:w-1/2 p-6'>
              <img
                src={step.image}
                alt={step.title}
                className='w-full h-auto rounded-xl shadow-md'
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HowToUse;
