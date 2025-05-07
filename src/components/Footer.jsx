import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-sky-900 text-white py-2">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <p>
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-1">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-1">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-1">Contact Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
