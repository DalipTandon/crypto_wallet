import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-white h-[15vh] w-full flex justify-center ">
      <div className=" px-4 w-full py-4 lg:px-8 md:w-[80vw] md:m-5 ">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
           <Link to={"/"}> <h3 className="text-4xl font-bold text-blue-600">DLock</h3></Link>
          </div>
          <div className="py-4 md:ml-6 md:flex md:space-x-8">
            <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;