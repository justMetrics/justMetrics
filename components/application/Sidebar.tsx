import React from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
config.autoAddCss = false;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faCog,
  faUser,
  faArrowLeft,
  faBell,
  faFileAlt,
  faCreditCard,
  faLifeRing,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

type isSidebarActiveProps = {
  isSidebarActive: boolean;
  handleToggleSidebar: () => void;
  setCredentials: React.Dispatch<React.SetStateAction<string[]>>;
};

const Sidebar = ({
  isSidebarActive,
  handleToggleSidebar,
  setCredentials,
}: isSidebarActiveProps) => {
  return (
    <div
      className={`
         absolute top-0  h-full
        w-48
        ${isSidebarActive ? 'left-0' : 'left-[-191]'}
        bg-white/30 backdrop-blur-md shadow-lg
        border-r border-white/20
        transition-all duration-300
        z-50
      `}
    >
      <div className='p-4'>
        <h2
          className='text-xl font-bold mb-4 rounded-xl text-black p-2 hover:bg-blue-500 hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer flex items-center space-x-2'
          onClick={() => handleToggleSidebar()}
        >
          <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4' />
          <span>JustMetrics</span>
        </h2>

        <ul className='text-black space-y-1'>
          <Link href='/'>
            <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
              <FontAwesomeIcon icon={faHouse} className='w-4 h-4' />
              <span>Home page</span>
            </li>
          </Link>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faCog} className='w-4 h-4' />
            <span>Settings</span>
          </li>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faUser} className='w-4 h-4' />
            <span>Profile</span>
          </li>

          <hr className='my-3 border-gray-300' />

          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faBell} className='w-4 h-4' />
            <span>Notifications</span>
          </li>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faFileAlt} className='w-4 h-4' />
            <span>Logs</span>
          </li>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faCreditCard} className='w-4 h-4' />
            <span>Billing</span>
          </li>

          <hr className='my-3 border-gray-300' />

          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faLifeRing} className='w-4 h-4' />
            <span>Help Center</span>
          </li>
          <li
            className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'
            onClick={() => setCredentials([])}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className='w-4 h-4' />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
