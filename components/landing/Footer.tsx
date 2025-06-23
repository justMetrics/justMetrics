import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white h-[200px] flex items-center justify-center'>
      <p className='text-center text-sm'>
        © {new Date().getFullYear()} JustMetrics. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
