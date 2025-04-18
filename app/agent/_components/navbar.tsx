"use client"; // Required for interactivity

import { useState } from 'react';

export default function AgentNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <div className="text-xl font-bold">
          Shri Gomeh Agencies
        </div>

        {/* Hamburger Menu Button (visible on mobile) */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg 
            className="w-6 h-6" 
            fill="black" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Desktop Navigation (hidden on mobile) */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Services</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </nav>

      {/* Sidebar (mobile only) */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        {/* Sidebar Header with Close Button */}
        <div className="p-4 flex justify-between items-center border-b">
          <div className="text-xl font-bold">Menu</div>
          <button 
            className="focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="p-4 flex flex-col space-y-4">
          <a href="#" className="hover:text-blue-600" onClick={toggleSidebar}>Home</a>
          <a href="#" className="hover:text-blue-600" onClick={toggleSidebar}>About</a>
          <a href="#" className="hover:text-blue-600" onClick={toggleSidebar}>Services</a>
          <a href="#" className="hover:text-blue-600" onClick={toggleSidebar}>Contact</a>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}