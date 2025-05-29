import React from 'react';

const Sidebar = () => {
  return (
    <div
      className='
        fixed top-0 left-0 h-full
        w-48
        -translate-x-[90%] hover:translate-x-0
        bg-white/30 backdrop-blur-md shadow-lg
        border-r border-white/20
        transition-transform duration-300
        z-50
      '
    >
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4 text-black'>Sidebar</h2>
        <ul className='text-black'>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white hover:rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer '>
            <span className='material-symbols-outlined'>dashboard</span>
            <span>Dashboard</span>
          </li>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white hover:rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer '>
            <span className='material-symbols-outlined'>settings</span>
            <span>Settings</span>
          </li>
          <li className='flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-500 hover:text-white hover:rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer '>
            <span className='material-symbols-outlined'>person</span>
            <span>Profile</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
