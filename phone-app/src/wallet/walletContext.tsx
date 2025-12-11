import React, { createContext, useContext, useState } from "react";

type WalletContextType = {
  connected: boolean;
  address: string | null;
};

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: null,
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state] = useState<WalletContextType>({
    connected: false,
    address: null,
  });

  return (
    <WalletContext.Provider value={state}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
