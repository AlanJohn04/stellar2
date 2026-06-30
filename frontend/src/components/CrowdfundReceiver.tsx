"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Coins } from "lucide-react";

const CONTRACT_ID = "CBCNH4V3YBJCA6GIMZ7X24NE3536MW2DF74Y5DNUUXLZQEKDPUTH2IV6";

export const CrowdfundReceiver = ({ onBack }: { onBack: () => void }) => {
  const [mounted, setMounted] = useState(false);
  const [targetAmount] = useState<number>(1000);
  const [pledgedAmount, setPledgedAmount] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    // Real implementation would fetch contract state using StellarSdk.rpc.Server
    // For demo purposes, we will mock receiving funds
    const interval = setInterval(() => {
      setPledgedAmount(p => {
        if (p < targetAmount) {
          // Slowly mock receiving pledges over time randomly if needed, 
          // or just stay static until a pledge happens on the other device 
          // (mocking real-time WebSocket/Polling)
          return p; 
        }
        return p;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [targetAmount]);

  if (!mounted) return null;

  const progress = Math.min((pledgedAmount / targetAmount) * 100, 100);

  return (
    <div className="w-full max-w-xl mx-auto bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Coins className="text-blue-400" />
          Campaign Creator
        </h2>
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Back
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 bg-white p-6 rounded-2xl w-fit mx-auto">
        <QRCode 
          value={CONTRACT_ID} 
          size={200}
          level="H"
        />
        <p className="mt-4 text-gray-500 font-mono text-xs text-center break-all max-w-[200px]">
          {CONTRACT_ID}
        </p>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-300">Scan this QR code to pledge to the campaign!</p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Campaign Progress</span>
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
    </div>
  );
};
