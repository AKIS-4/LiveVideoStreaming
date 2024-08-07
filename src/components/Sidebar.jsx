import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-full bg-teal-700 border-r border-gray-800 shadow-lg">
      <div className="flex items-center justify-center p-4 bg-gray-900 text-white">
        <img src="/../../public/logo.png" alt="Logo" className="w-9 h-9 mr-3" />
        <h1 className="text-xl px-1 font-semibold">DeltaDonkey</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto text-center">
        <a href="#" className="block px-4 py-3 text-md font-semibold text-white  rounded-2xl hover:bg-lime-800">
          Live Videos
        </a>
        <a href="#" className="block px-4 py-3 text-md font-semibold text-white  rounded-2xl hover:bg-lime-800">
          Search
        </a>
        <a href="#" className="block px-4 py-3 text-md font-semibold text-white  rounded-2xl hover:bg-lime-800">
          Subscribers
        </a>
        <a href="#" className="block px-4 py-3 text-md font-semibold text-white  rounded-2xl hover:bg-lime-800">
          Profile
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
