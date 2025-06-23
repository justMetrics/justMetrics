import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id='home'
      className='h-[800px] w-full bg-cover bg-center flex items-center justify-center text-white relative'
      style={{
        backgroundImage: `url('./hero-bg-img.png')`,
      }}
    >
      <div className='absolute inset-0 bg-black/50' />

      <div className='relative z-10 text-center px-4'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Welcome to JustMetrics
        </h1>
        <p className='text-lg md:text-xl mb-6'>
          Track. Analyze. Optimize your cloud metrics effortlessly.
        </p>

        <div className='flex flex-col md:flex-row gap-4 justify-center'>
          <a
            href='https://github.com/justMetrics/justMetrics'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition'
          >
            View on GitHub
          </a>

          <Link
            href='/application'
            className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition'
          >
            Go to App
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
