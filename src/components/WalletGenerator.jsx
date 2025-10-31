// src/components/WalletGenerator.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const WalletGenerator = () => {
  const { chain } = useParams(); // ✅ Get 'solana', 'ethereum', etc.

  const [mnemonic, setMnemonic] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  // Just for now, no logic — placeholder text
  const generateWallet = () => {
    console.log(`Generate ${chain} wallet`);
  };

  const importWallet = () => {
    console.log(`Import ${chain} wallet`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
        <h2 className="text-4xl font-semibold mb-2 text-black">
          {chain?.toUpperCase()} HD Wallet Generator
        </h2>
        <h4 className="text-lg text-gray-700 mb-6">
          Generate or import your {chain} wallet
        </h4>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <button
            onClick={generateWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            🔑 Generate New {chain} Wallet
          </button>

          <div className="flex items-center justify-center my-4">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          <textarea
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder={`Enter your ${chain} seed phrase...`}
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
          />

          <button
            onClick={importWallet}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            📥 Import {chain} Wallet
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}

          {walletAddress && (
            <div className="mt-4 bg-gray-100 p-3 rounded text-sm break-all">
              <p className="font-semibold text-gray-800 mb-1">🪪 Address:</p>
              <p className="text-gray-600">{walletAddress}</p>

              <p className="font-semibold text-gray-800 mt-3 mb-1">
                🌱 Seed Phrase:
              </p>
              <p className="text-gray-600">{mnemonic}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletGenerator;
