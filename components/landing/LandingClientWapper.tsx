import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import HowToUse from './HowToUse';
import Features from './Feature';
import Team from './Team';
const LandingClientWapper = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowToUse />
      <Team />
    </main>
  );
};

export default LandingClientWapper;
