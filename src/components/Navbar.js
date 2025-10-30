import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md h-[15vh] w-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/assets/logo.png" alt="Crypto Wallet Logo" />
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">Features</a>     
            <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">Pricing</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;