import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { HDNodeWallet } from "ethers"; // Add this import at the top
import { Wallet } from "ethers"; // Also from ethers
import { ethers } from "ethers";

const WalletGenerator = () => {
  const { chain } = useParams();
  const location = useLocation();
  const { state } = location || {};

  const [mnemonic, setMnemonic] = useState(state?.seed || "");
  const [wallets, setWallets] = useState([]);
  const [error, setError] = useState("");
  const [visibleKeys, setVisibleKeys] = useState({}); // private key visibility

  useEffect(() => {
  const init = async () => {
    try {
      if (state?.seed) {
        await createWalletFromMnemonic(state.seed, 0, true);
      } else if (state?.autoGenerate) {
        const mn = generateMnemonic();
        setMnemonic(mn);
        await createWalletFromMnemonic(mn, 0, true);
      }
    } catch (err) {
      setError("Error initializing wallet: " + err.message);
    }
  };
  init();
}, [state]);

const createWalletFromMnemonic = async (mn, walletIndex, reset = false) => {
  const seed = await mnemonicToSeed(mn);

  if (chain === "solana") {
    // ✅ Solana derivation path
    const path = `m/44'/501'/${walletIndex}'/0'`;
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
  }

  else if (chain === "ethereum") {
    const derivationPath = `m/44'/60'/${walletIndex}'/0/0`;

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    const newWallet = {
      index: walletIndex,
      publicKey: wallet.address,
      privateKey: wallet.privateKey,
      derivationPath,
    };

    setWallets((prev) => (reset ? [newWallet] : [...prev, newWallet]));
  }
};

  const addWallet = async () => {
    try {
      if (!mnemonic) return setError("Please generate or import a wallet first.");
      const newIndex = wallets.length;
      await createWalletFromMnemonic(mnemonic, newIndex);
    } catch (err) {
      setError("Error adding wallet: " + err.message);
    }
  };

  const togglePrivateKey = (index) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const deleteWallet = (index) => {
    setWallets((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-screen ">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[75vh] w-full px-4">
        <h2 className="text-4xl font-semibold mb-2 text-black">
          {chain?.toUpperCase()} HD Wallet
        </h2>
        <h4 className="text-lg text-gray-700 mb-6">
          Your {chain} wallet details
        </h4>

        {/* Mnemonic Display */}
        {mnemonic && (
          <div className="p-6 rounded-lg border border-gray-300 w-full max-w-4xl space-y-4 bg-white">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Secret Recovery Phrase
            </h1>
            <div className="border-gray-300 rounded-md p-3">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {mnemonic.split(" ").map((word, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md px-2 py-1 text-sm font-semibold text-black-700 bg-gray-200 text-center shadow-sm"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Wallet Header */}
        {mnemonic && (
          <div className="p-6 rounded-lg max-w-4xl space-y-4 mt-4 w-full flex justify-between items-center">
            <h3 className="font-semibold text-3xl">Your Wallets</h3>
            <button
              onClick={addWallet}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              ➕ Add Wallet
            </button>
            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
          </div>
        )}

        {/* Wallet List */}
        {wallets.length > 0 && (
          <div className="mt-6 w-full max-w-3xl space-y-6">
            {wallets.map((w, i) => (
              <div
                key={w.index}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-md"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-gray-800 text-lg">
                    Wallet #{w.index + 1}
                  </p>
                  <button
                    onClick={() => deleteWallet(i)}
                    className="text-red-600 text-sm hover:text-red-800"
                  >
                    🗑 Delete
                  </button>
                </div>

                {/* Public Key */}
                <div className="mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    🪪 Public Key
                  </label>
                  <textarea
                    readOnly
                    value={w.publicKey}
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-50"
                    rows={2}
                  ></textarea>
                </div>

                {/* Private Key */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    🔐 Private Key
                  </label>
                  <div className="relative mt-1">
                    <textarea
                      readOnly
                      value={
                        visibleKeys[i] ? w.privateKey : "************************"
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50"
                      rows={2}
                    ></textarea>
                    <button
                      onClick={() => togglePrivateKey(i)}
                      className="absolute top-2 right-3 text-sm text-blue-600 hover:text-blue-800"
                    >
                      {visibleKeys[i] ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletGenerator;
