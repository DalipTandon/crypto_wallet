import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ImportOrAdd = () => {
  const { chain } = useParams();
  const navigate = useNavigate();
  const [seed, setSeed] = useState("");

  const handleImport = () => {
    navigate(`/${chain}/wallet`, { state: { seed, autoGenerate: true } });
  };

  const handleAddNew = () => {
    navigate(`/${chain}/wallet`, { state: { autoGenerate: true } });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
        <h2 className="text-4xl font-semibold mb-4 text-black">
          {chain?.toUpperCase()} Wallet
        </h2>
        <h4 className="text-lg text-gray-700 mb-6">
          Generate or import your {chain} wallet
        </h4>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <textarea
            className="border border-gray-300 rounded-md w-full p-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows={3}
            placeholder={`Enter your ${chain} seed phrase...`}
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleImport}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
            >
              📥 Import Wallet
            </button>

            <button
              onClick={handleAddNew}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
            >
              🔑 Generate Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportOrAdd;
