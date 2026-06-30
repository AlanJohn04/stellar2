"use client";

import React, { useState } from "react";
import { CrowdfundSender } from "./CrowdfundSender";
import { CrowdfundReceiver } from "./CrowdfundReceiver";
import { QrCode, ScanLine } from "lucide-react";

export const CrowdfundRoleManager = () => {
  const [role, setRole] = useState<"none" | "sender" | "receiver">("none");

  if (role === "receiver") {
    return <CrowdfundReceiver onBack={() => setRole("none")} />;
  }

  if (role === "sender") {
    return <CrowdfundSender onBack={() => setRole("none")} />;
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 shadow-2xl text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Choose Your Role</h2>
      <p className="text-gray-400 mb-10 text-lg">
        Are you starting a campaign to receive funds, or are you pledging to a campaign?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setRole("receiver")}
          className="flex flex-col items-center justify-center gap-4 bg-gray-800/50 hover:bg-gray-800 border-2 border-transparent hover:border-blue-500 rounded-2xl p-8 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <QrCode className="text-blue-400" size={32} />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Campaign Creator</h3>
            <p className="text-sm text-gray-500">Generate QR code to receive funds</p>
          </div>
        </button>

        <button
          onClick={() => setRole("sender")}
          className="flex flex-col items-center justify-center gap-4 bg-gray-800/50 hover:bg-gray-800 border-2 border-transparent hover:border-purple-500 rounded-2xl p-8 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ScanLine className="text-purple-400" size={32} />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Pledger</h3>
            <p className="text-sm text-gray-500">Scan QR code to send funds</p>
          </div>
        </button>
      </div>
    </div>
  );
};
