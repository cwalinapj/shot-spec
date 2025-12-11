import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home/HomeScreen";
import { BagOverviewScreen } from "../screens/bag/BagOverviewScreen";
import { SelectModeScreen } from "../screens/session/SelectModeScreen";
import { SettingsScreen } from "../screens/settings/SettingsScreen";

const Tab = createBottomTabNavigator();

export const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Play" component={SelectModeScreen} />
      <Tab.Screen name="Bag" component={BagOverviewScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
