import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainTabs } from "./navigation/MainTabs";
import { WalletProvider } from "./wallet/walletContext";

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </WalletProvider>
  );
}
