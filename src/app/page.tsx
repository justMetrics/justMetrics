import Link from 'next/link';

import LandingClientWapper from '../../components/landing/LandingClientWapper';
import Hero from '../../components/landing/Hero';
export default function Home() {
  return (
    <section>
      <LandingClientWapper />
      <Hero />
    </section>
  );
}
