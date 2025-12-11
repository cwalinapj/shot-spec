import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

type TileButtonProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  subtitle?: string;
};

export const TileButton: React.FC<TileButtonProps> = ({
  label,
  subtitle,
  selected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tile, selected && styles.tileSelected]}
    >
      <View>
        <Text style={styles.label}>{label}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tile: {
    minWidth: 140,
    marginRight: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#111',
    justifyContent: 'center',
  },
  tileSelected: {
    borderColor: '#0af',
    backgroundColor: '#021019',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#aaa',
  },
});
