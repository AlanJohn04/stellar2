"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "./WalletProvider";
import * as StellarSdk from "@stellar/stellar-sdk";
import { Coins, Loader2, AlertCircle } from "lucide-react";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";

// For a real project, this would be the address of your deployed contract
const CONTRACT_ID = "CBCNH4V3YBJCA6GIMZ7X24NE3536MW2DF74Y5DNUUXLZQEKDPUTH2IV6"; 
const NETWORK_URL = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

export const Crowdfund = () => {
  const [mounted, setMounted] = useState(false);
  const { address, connect, error: walletError } = useWallet();
  const [targetAmount, setTargetAmount] = useState<number>(1000);
  const [pledgedAmount, setPledgedAmount] = useState<number>(0);
  const [amount, setAmount] = useState<string>("10");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [txError, setTxError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    // In a real scenario, you'd fetch the contract state here using StellarSdk.rpc.Server
    // For now, we mock the real-time progress update
    const interval = setInterval(() => {
      // Mock progress
      if (pledgedAmount < targetAmount && status !== "pending") {
         // setPledgedAmount(p => Math.min(p + 10, targetAmount));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [pledgedAmount, targetAmount, status]);

  const handlePledge = async () => {
    if (!address) {
      connect();
      return;
    }

    try {
      setStatus("pending");
      setTxError(null);

      // Validate amount
      const pledgeVal = Number(amount);
      if (isNaN(pledgeVal) || pledgeVal <= 0) {
        throw new Error("Invalid amount");
      }

      // Real implementation below for when a real CONTRACT_ID is provided
      const server = new StellarSdk.rpc.Server(NETWORK_URL);
      const account = await server.getAccount(address).catch(() => null);
      
      if (!account) {
        throw new Error("Account not found or insufficient balance to pay fees.");
      }

      let tx = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(StellarSdk.Operation.invokeHostFunction({
          func: StellarSdk.xdr.HostFunction.hostFunctionTypeInvokeContract(
            new StellarSdk.xdr.InvokeContractArgs({
              contractAddress: StellarSdk.Address.fromString(CONTRACT_ID).toScAddress(),
              functionName: "pledge",
              args: [
                new StellarSdk.Address(address).toScVal(),
                StellarSdk.nativeToScVal(pledgeVal, { type: "i128" })
              ]
            })
          ),
          auth: [],
        }))
        .setTimeout(30)
        .build();

      // Simulate the transaction to calculate footprint and fees
      const simulation = await server.simulateTransaction(tx);
      if (StellarSdk.rpc.Api.isSimulationError(simulation)) {
        throw new Error("Transaction simulation failed. Check contract state and inputs.");
      }
      
      // Assemble the final transaction with the simulated data
      tx = StellarSdk.rpc.assembleTransaction(tx, NETWORK_PASSPHRASE, simulation).build();

      const { signedTxXdr } = await StellarWalletsKit.signTransaction(tx.toXDR(), {
        networkPassphrase: NETWORK_PASSPHRASE,
        address,
      });
      
      const txToSubmit = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
      
      const response = await server.sendTransaction(txToSubmit);

      if (response.status === "PENDING") {
        let txStatus;
        // Poll for success
        for (let i = 0; i < 15; i++) {
          await new Promise(r => setTimeout(r, 2000));
          txStatus = await server.getTransaction(response.hash);
          if (txStatus.status !== "NOT_FOUND") break;
        }

        if (txStatus && txStatus.status === "SUCCESS") {
          setStatus("success");
          setPledgedAmount(p => p + pledgeVal);
        } else {
          throw new Error("Transaction failed or timed out on network.");
        }
      } else {
        throw new Error("Transaction rejected by network.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      if (err.message.includes("User declined")) {
        setTxError("Transaction was rejected in the wallet.");
      } else if (err.message.includes("insufficient balance")) {
        setTxError("Insufficient XLM balance.");
      } else {
        setTxError(err.message || "Failed to submit transaction.");
      }
    }
  };

  const progress = Math.min((pledgedAmount / targetAmount) * 100, 100);

  if (!mounted) {
    return null; // Avoid hydration mismatch by waiting for client mount
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Coins className="text-blue-400" />
          Web3 Funding
        </h2>
        {mounted && address ? (
          <div className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
            {address.slice(0, 4)}...{address.slice(-4)}
          </div>
        ) : (
          <button 
            onClick={connect}
            disabled={!mounted}
            className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {(walletError || txError) && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3">
          <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
          <p className="text-red-400 text-sm">{walletError || txError}</p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-medium">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-gray-300 font-semibold">{pledgedAmount} XLM pledged</span>
          <span className="text-gray-500">Goal: {targetAmount} XLM</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-colors pl-12"
            placeholder="Amount"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            XLM
          </span>
        </div>
        <button
          onClick={handlePledge}
          disabled={!mounted || status === "pending" || !address}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "pending" ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Pledging...
            </>
          ) : (
            "Pledge Now"
          )}
        </button>
      </div>

      {status === "success" && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-center">
          <p className="text-green-400 font-medium">🎉 Successfully pledged {amount} XLM!</p>
        </div>
      )}
    </div>
  );
};
