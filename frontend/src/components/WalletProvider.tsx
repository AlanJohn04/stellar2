"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { Networks } from "@creit.tech/stellar-wallets-kit/types";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  error: null,
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    StellarWalletsKit.init({
      modules: defaultModules(),
    });
    StellarWalletsKit.setNetwork(Networks.TESTNET);
  }, []);

  const connect = async () => {
    try {
      setError(null);
      const { address } = await StellarWalletsKit.authModal();
      setAddress(address);
    } catch (e: any) {
      console.error(e);
      setError("Failed to connect wallet or user rejected.");
    }
  };

  const disconnect = () => {
    setAddress(null);
    StellarWalletsKit.disconnect().catch(console.error);
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, error }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
