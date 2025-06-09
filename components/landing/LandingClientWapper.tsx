import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
const LandingClientWapper = () => {
  return (
    <main>
      <Navbar />

      <Link href='/application'>Go to Application Page</Link>
    </main>
  );
};

export default LandingClientWapper;
