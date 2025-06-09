'use client';
import React from 'react';

const features = [
  {
    icon: '⚡️',
    title: 'Feature 1',
    description:
      'This is a placeholder description for the first feature. Fast and reliable.',
  },
  {
    icon: '🔒',
    title: 'Feature 2',
    description:
      'This is a placeholder description for the second feature. Secure and scalable.',
  },
  {
    icon: '📊',
    title: 'Feature 3',
    description:
      'This is a placeholder description for the third feature. Insightful and detailed.',
  },
];

const Features = () => {
  return (
    <section
      id='features'
      className='h-[600px] bg-white px-6 md:px-16 flex flex-col justify-center'
    >
      <h2 className='text-3xl font-bold text-center mb-12'>Key Features</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition'
          >
            <div className='text-4xl mb-4'>{feature.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
            <p className='text-gray-700'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
