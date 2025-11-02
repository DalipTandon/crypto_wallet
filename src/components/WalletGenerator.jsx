import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const WalletGenerator = () => {
  const { chain } = useParams(); // e.g. 'solana'
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);
  const [error, setError] = useState("");

  // generate first wallet (new mnemonic)
  const generateWallet = async () => {
    try {
      const mn = generateMnemonic();
      setMnemonic(mn);
      await createWalletFromMnemonic(mn, 0, true);
    } catch (err) {
      setError("Error generating wallet: " + err.message);
    }
  };

  // helper function to derive wallet at given index
  const createWalletFromMnemonic = async (mn, walletIndex, reset = false) => {
    const seed = await mnemonicToSeed(mn);
    const path = `m/44'/501'/${walletIndex}'/0'`; // ✅ Correct path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
    const solanaKeypair = Keypair.fromSecretKey(keyPair.secretKey);

    const pubKeyBase58 = solanaKeypair.publicKey.toBase58();
    const privKeyBase58 = bs58.encode(solanaKeypair.secretKey);

    const newWallet = {
      index: walletIndex,
      publicKey: pubKeyBase58,
      privateKey: privKeyBase58,
      path,
    };

    setWallets((prev) => (reset ? [newWallet] : [...prev, newWallet]));
  };

  // add another wallet from same seed phrase
  const addWallet = async () => {
    try {
      if (!mnemonic) return setError("Please generate a wallet first.");
      const newIndex = wallets.length; // next wallet index
      await createWalletFromMnemonic(mnemonic, newIndex);
    } catch (err) {
      setError("Error adding wallet: " + err.message);
    }
  };

  // for later (optional) import function
  const importWallet = async () => {
    try {
      if (!mnemonic.trim()) return setError("Enter a valid seed phrase.");
      setError("");
      await createWalletFromMnemonic(mnemonic, 0, true);
    } catch (err) {
      setError("Error importing wallet: " + err.message);
    }
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

          {mnemonic && (
            <button
              onClick={addWallet}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
            >
              ➕ Add Wallet
            </button>
          )}

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        {/* Wallet list */}
        {wallets.length > 0 && (
          <div className="mt-6 w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Generated Wallets
            </h3>
            <div className="space-y-4">
              {wallets.map((w) => (
                <div
                  key={w.index}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm break-all shadow-sm"
                >
                  <p className="font-semibold text-gray-800">
                    Wallet #{w.index + 1}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-700">Path:</span>{" "}
                    {w.path}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-gray-700">
                      🪪 Public Key:
                    </span>{" "}
                    {w.publicKey}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-gray-700">
                      🔐 Private Key:
                    </span>{" "}
                    {w.privateKey}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletGenerator;
