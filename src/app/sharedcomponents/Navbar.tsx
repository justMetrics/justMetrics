'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname()

    function linkClasses (currPath:string){

    const isActive:boolean = pathname === currPath;
    return isActive
      ? 'font-semibold text-black'
      : `text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out 
      focus:text-black/80 motion-reduce:transition-none`//if false, hover
    }

  return (
    <nav  className='relative flex w-full flex-wrap items-center bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4'>
      <Link href="/apikeys" className={linkClasses('/apikeys')}>API Keys</Link> 
      <span className='mx-2 text-black/60 dark:text-white/60'>|</span>
      <Link href="/metricsdashboard" className={linkClasses('/metricsdashboard')}>Metrics Dashboard</Link>
    </nav>
  );
}