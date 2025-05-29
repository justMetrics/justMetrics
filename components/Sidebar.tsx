import React from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faCog,
  faUser,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

type isSidebarActiveProps = {
  isSidebarActive: boolean;
  handleToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({
  isSidebarActive,
  handleToggleSidebar,
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
          className='text-xl font-bold mb-4 rounded-xl  text-black p-2 hover:bg-blue-500 hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer'
          onClick={() => handleToggleSidebar()}
        >
          <FontAwesomeIcon icon={faArrowLeft} className=' w-4 h-4' />
          <span> Just Metrics</span>
        </h2>
        <ul className='text-black'>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faTachometerAlt} className='w-4 h-4' />
            <span>Dashboard</span>
          </li>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faCog} className='w-4 h-4' />
            <span>Settings</span>
          </li>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer'>
            <FontAwesomeIcon icon={faUser} className='w-4 h-4' />
            <span>Profile</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
