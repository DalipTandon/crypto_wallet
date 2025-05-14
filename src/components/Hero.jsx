import Nav from "./Nav";

const Hero = () => {
  return (
    <div className="bg-blue-50 min-h-screen font-bold">
      <Nav />
      <div className="flex justify-center items-center h-[65vh] ">
        <div className="bg-gray-900 text-white w-full max-w-md rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
          
          <div className="text-4xl text-center font-semibold tracking-wide">
            D-WALLET
          </div>
          
          <p className="text-center text-gray-300">
            To get started, create a new wallet or import an existing one.
          </p>
          
          <div className="flex flex-col gap-4">
            <button className="bg-white text-black py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300">
              Create a New Wallet
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300">
              I Already Have a Wallet
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
