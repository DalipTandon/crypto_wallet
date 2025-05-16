import { Link } from "react-router-dom"; // not "react-router"
import Nav from "./Nav";

const SeedPhrase = () => {
  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <Nav />
      <div className="h-[65vh] flex justify-center items-center px-4 relative">
        
        {/* Back Arrow */}
        <Link
          to="/"
          className="absolute top-2 left-140 text-blue-600 hover:text-blue-800 transition-all duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="bg-white h-full w-full max-w-md rounded-3xl shadow-xl p-6 flex flex-col justify-between gap-6">
          
          <div>
            <h2 className="text-2xl font-semibold text-center mb-8">Create a Wallet</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">🚀 Seamless Setup</h3>
                <p className="text-sm text-gray-600">
                  Create a wallet using your Google or Apple account and start exploring the Web3 world.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">🔐 Enhanced Security</h3>
                <p className="text-sm text-gray-600">
                  Your wallet is stored securely and decentralized across multiple factors.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">🛠 Easy Recovery</h3>
                <p className="text-sm text-gray-600">
                  Recover your account using your Google/Apple ID or a 4-digit PIN.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
             <Link to={"/generateseed"}>Generate a Seed Phrase</Link> 
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SeedPhrase;
