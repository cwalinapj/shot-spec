import React from "react";
import { View } from "react-native";
import { TileButton } from "../../components/common/TileButton";

export const SelectModeScreen: React.FC = () => {
  return (
    <View>
      <TileButton label="Course Play" />
      <TileButton label="Driving Range" />
      <TileButton label="Backyard / Indoor" />
    </View>
  );
};
