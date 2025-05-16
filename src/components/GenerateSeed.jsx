import React, { useState } from 'react';
import * as bip39 from 'bip39';
import { Buffer } from 'buffer';
import Nav from './Nav';
import { Link } from 'react-router-dom'; // Make sure this is correct

window.Buffer = Buffer;

export default function GenerateSeed() {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const mnemonic = bip39.generateMnemonic();
    setSeedPhrase(mnemonic);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(seedPhrase)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy seed phrase"));
  };

  return (
    <div className='bg-blue-50 min-h-screen'>
      <Nav />

      <div className="h-[65vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-4">

          {/* Back Arrow - now part of layout */}
          <Link
            to="/seedPhrase"
            className="text-blue-600 hover:text-blue-800 transition-all duration-200 flex items-center w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </Link>

          {/* Generate Box */}
          <div className="w-full bg-white rounded-xl shadow-md p-6 space-y-4">
            <h1 className="text-2xl font-bold text-center text-purple-700">
              Generate Your Wallet Seed Phrase
            </h1>

            <button
              onClick={generate}
              className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition duration-200"
            >
              Generate Seed Phrase
            </button>

            {seedPhrase && (
              <div className="bg-gray-50 border border-purple-300 rounded p-4 space-y-3">
                <p className="text-gray-700 font-medium">Your 12-word phrase:</p>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-800 font-mono">
                  {seedPhrase.split(" ").map((word, idx) => (
                    <span
                      key={idx}
                      className="bg-white border rounded px-2 py-1 shadow-sm text-center"
                    >
                      {idx + 1}. {word}
                    </span>
                  ))}
                </div>

                <button
                  onClick={copyToClipboard}
                  className="w-full mt-2 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>

                <button className="w-full mt-2 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition">Continue</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
