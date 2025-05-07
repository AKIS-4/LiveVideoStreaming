import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/');
  }
  return (
    <div className="flex flex-col w-68 h-full bg-red-600 border-r border-gray-800 shadow-lg">
      <Link to="/" className="flex items-center justify-center p-4 bg-sky-900 text-black">
        <img src="/logo.png" alt="Logo" className="w-9 h-9 mr-3" />
        <h1 className="text-xl px-1 font-semibold">Streaming Service</h1>
      </Link>
      <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto text-center">
        <Link to="/live-stream" className="block px-4 py-3 text-md font-semibold text-white rounded-2xl hover:bg-lime-800">
          Live Stream
        </Link>
        {!localStorage.getItem('token') ? <><Link to="/sign-in" className="block px-4 py-3 text-md font-semibold text-white rounded-2xl hover:bg-lime-800">
          Sign In
        </Link>
          <Link to="/sign-up" className="block px-4 py-3 text-md font-semibold text-white rounded-2xl hover:bg-lime-800">
            Sign Up
          </Link></> :
          <><Link to="/profile" className="block px-4 py-3 text-md font-semibold text-white rounded-2xl hover:bg-lime-800">
            Profile
          </Link><div onClick={handleLogout} className="block px-4 py-3 text-md font-semibold text-white rounded-2xl hover:bg-lime-800">Logout</div></>}
      </nav>
    </div>
  );
};

export default Sidebar;
