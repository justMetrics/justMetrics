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
    <nav className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-white/30 backdrop-blur-md shadow-md border-b border-white/20'>
      <div className='flex items-center space-x-2'>
        <div className='text-xl font-bold'>🔍</div>
        <div className='text-xl font-semibold'>Just Metrics</div>
      </div>

      <div className='space-x-6 text-gray-700 font-medium'>
        <button
          onClick={() => scrollToSection('home')}
          className='hover:text-blue-600'
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('product')}
          className='hover:text-blue-600'
        >
          Product
        </button>
        <button
          onClick={() => scrollToSection('team')}
          className='hover:text-blue-600'
        >
          Team
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
