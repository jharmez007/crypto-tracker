import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">CryptoTracker</h1>
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5h14M3 10h14M3 15h14"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ul className={`sm:flex space-x-6 ${isOpen ? 'block' : 'hidden'} sm:block`}>
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="#prices" className="hover:text-gray-200">Prices</a></li>
          <li><a href="#about" className="hover:text-gray-200">About</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
