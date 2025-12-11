import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
};

export const TileButton: React.FC<Props> = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
