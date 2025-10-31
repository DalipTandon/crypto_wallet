import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

const Hero=() => {

    return (
        <div>
            <Navbar/>
            <div className=" flex flex-col md:flex-row items-center justify-center md:justify-between  w-full text-white md:h-[85vh] h-[65vh] text-center " >
            <div className="w-full text-black flex flex-col  h-1/2 items-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 ">Create <span className='font-extrabold text-blue-700'>Hierarchical Deterministic (HD)</span>  <span className='block text-center'>Wallets</span> </h1>
                <p className="text-lg mb-6">Experience the best in class security and user-friendly interface for managing your cryptocurrency assets.</p>
                <div className='md:space-x-14 '>
               <Link to={"/wallet/solana"}> <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">Solana</button> </Link>
               <Link to={"/wallet/ethereum"}> <button  className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">Ethereum</button></Link>
                <Link to={"/wallet/bitcoin"}><button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">Bitcoin</button></Link> 

                </div>
            </div>

        </div>
        </div>
        
    );
}

export default Hero;