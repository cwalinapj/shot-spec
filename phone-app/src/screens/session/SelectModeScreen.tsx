import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { SessionMode } from '../../types/session';

type Props = {
  onSelectMode: (mode: SessionMode) => void;
};

export const SelectModeScreen: React.FC<Props> = ({ onSelectMode }) => {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 24 }}>
        Where are you playing today?
      </Text>

      <TouchableOpacity onPress={() => onSelectMode('on_course')}>
        <Text style={{ fontSize: 18 }}>🏌️ On a golf course</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectMode('driving_range')}>
        <Text style={{ fontSize: 18 }}>🎯 At a driving range</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectMode('backyard_sim')}>
        <Text style={{ fontSize: 18 }}>🏠 Backyard / simulator</Text>
      </TouchableOpacity>
    </View>
  );
};
