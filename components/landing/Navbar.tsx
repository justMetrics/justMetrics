'use client';
import React from 'react';

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='fixed h-[60px] top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-white/50 backdrop-blur-md shadow-md border-b border-white/20'>
      <div className='flex items-center space-x-2'>
        <div className='text-xl font-bold'>
          <img className='w-8' src='./logo.png' alt='' />
        </div>
        <div className='text-xl font-semibold'>Just Metrics</div>
      </div>

      <div className='space-x-6 text-gray-700 font-medium flex'>
        <button
          onClick={() => scrollToSection('home')}
          className=' hover:border-b-2 border-gray-700 cursor-pointer transition-all pb-1'
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('features')}
          className='hover:border-b-2 border-gray-700 cursor-pointer transition-all pb-1'
        >
          Features
        </button>
        <button
          onClick={() => scrollToSection('how-to-use')}
          className='hover:border-b-2 border-gray-700 cursor-pointer transition-all pb-1'
        >
          How to Use
        </button>
        <button
          onClick={() => scrollToSection('team')}
          className='hover:border-b-2 border-gray-700 cursor-pointer transition-all pb-1'
        >
          Team
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
