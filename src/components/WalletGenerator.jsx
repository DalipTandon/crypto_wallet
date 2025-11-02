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
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");
  // const [publicKeys, setPublicKeys] = useState([]);

  const generateWallet = async () => {
    try {
      const mn = generateMnemonic();
      setMnemonic(mn);

      const seed = await mnemonicToSeed(mn);

      const path = `m/44'/501'/0'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

      const solanaKeypair = Keypair.fromSecretKey(keyPair.secretKey);
      const pubKeyBase58 = solanaKeypair.publicKey.toBase58();

      // const privKeyHex = Buffer.from(solanaKeypair.secretKey).toString("hex");
      const privKeyBase58 = bs58.encode(solanaKeypair.secretKey);
      setPrivateKey(privKeyBase58);

      setWalletAddress(pubKeyBase58);
      // setPublicKeys((prev) => [...prev, pubKeyBase58]);

      // console.log("✅ Generated Solana Wallet:", {
      //   mnemonic: mn,
      //   publicKey: pubKeyBase58,
      //   privateKey: privKeyHex,
      // });
    } catch (err) {
      setError("Error generating wallet: " + err.message);
    }
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
              <p className="font-semibold text-gray-800 mb-1">🪪 Public Address:</p>
              <p className="text-gray-600">{walletAddress}</p>

              <p className="font-semibold text-gray-800 mt-3 mb-1">
                🌱 Seed Phrase:
              </p>
              <p className="text-gray-600">{mnemonic}</p>

              <p className="font-semibold text-gray-800 mt-3 mb-1">
                🔐 Private Key (Hex):
              </p>
              <p className="text-gray-600">{privateKey}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletGenerator;
