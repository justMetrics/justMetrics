'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to section and close mobile menu
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // close mobile menu on click
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-white/50 backdrop-blur-md shadow-md border-b border-white/20 flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 min-h-[60px]'>
      {/* Header Row */}
      <div className='flex items-center justify-between w-full md:w-auto'>
        {/* Logo + Title */}
        <div className='flex items-center space-x-2'>
          <img className='w-8' src='./logo.png' alt='Logo' />
          <div className='text-xl font-semibold'>JustMetrics</div>
        </div>

        {/* Hamburger Button (mobile only) */}
        <div className='md:hidden'>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faXmark : faBars}
              className='text-2xl text-gray-700 cursor-pointer'
            />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className={`
      flex flex-col md:flex md:flex-row md:space-x-6 
      text-gray-700 font-medium 
      ${isMobileMenuOpen ? ' space-y-4 mt-4' : 'hidden'} 
      md:mt-0 md:space-y-0
    `}
      >
        {['home', 'features', 'how-to-use', 'team'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className=' hover:text-blue-500 border-gray-700 cursor-pointer transition-all duration-300 pb-1'
          >
            {section
              .split('-')
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(' ')}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
