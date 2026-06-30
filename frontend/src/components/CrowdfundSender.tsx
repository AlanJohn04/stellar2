"use client";

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Crowdfund } from "./Crowdfund";
import { QrCode, ArrowLeft } from "lucide-react";

export const CrowdfundSender = ({ onBack }: { onBack: () => void }) => {
  const [scannedContractId, setScannedContractId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: string) => {
    // Basic validation to see if it looks like a Stellar Contract ID (Starts with C and is 56 chars)
    if (result && result.startsWith("C") && result.length === 56) {
      setScannedContractId(result);
    } else {
      setError("Invalid QR Code. Please scan a valid Campaign QR Code.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <QrCode className="text-purple-400" />
          Pledge to Campaign
        </h2>
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {!scannedContractId ? (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
          <p className="text-gray-300 text-center mb-6">
            Scan the campaign's QR code to fund their project.
          </p>

          <div className="rounded-2xl overflow-hidden border-4 border-gray-800 relative bg-black aspect-square max-w-sm mx-auto">
            <Scanner
              onScan={(result) => handleScan(result[0]?.rawValue)}
              formats={["qr_code"]}
              styles={{ container: { width: "100%" } }}
            />
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4 text-center">
            <p className="text-green-400 font-medium mb-1">✓ Campaign found!</p>
            <p className="text-gray-500 text-xs font-mono break-all">{scannedContractId}</p>
          </div>
          
          <Crowdfund contractId={scannedContractId} />
        </div>
      )}
    </div>
  );
};
