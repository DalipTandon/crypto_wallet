import React from "react";
import Navbar from "./Navbar";

const WalletGenerator = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
        <h2 className="text-4xl font-semibold mb-2 text-black">
          HD Wallet Generator
        </h2>
        <h4 className="text-lg text-gray-700 mb-6">
          Generate or import your wallet
        </h4>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition-colors"
          >
            🔑 Generate New HD Wallet
          </button>

          <div className="flex items-center justify-center my-4">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          <textarea
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="Enter your 12 or 24 word seed phrase..."
          ></textarea>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full transition-colors"
          >
            📥 Import Wallet
          </button>

          <div className="mt-4 bg-gray-100 p-3 rounded text-sm break-all">
            <p className="font-semibold text-gray-800 mb-1">🪪 Address:</p>
            <p className="text-gray-600">—</p>

            <p className="font-semibold text-gray-800 mt-3 mb-1">🌱 Seed Phrase:</p>
            <p className="text-gray-600">—</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletGenerator;
