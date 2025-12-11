import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Club = {
  id: string;
  type: 'driver' | 'wood' | 'hybrid' | 'iron' | 'wedge' | 'putter';
  label: string; // e.g. "7i", "PW", "Driver"
  brand: string;
  model: string;
};

type BagStackParamList = {
  BagOverview: undefined;
  AddClubWizard: undefined;
};

type Props = NativeStackScreenProps<BagStackParamList, 'BagOverview'>;

const mockClubs: Club[] = [
  { id: '1', type: 'driver', label: 'Driver', brand: 'Titleist', model: 'TSR3' },
  { id: '2', type: 'iron', label: '7i', brand: 'Mizuno', model: 'Pro 243' },
  { id: '3', type: 'wedge', label: '52°', brand: 'Vokey', model: 'SM9' },
  { id: '4', type: 'putter', label: 'Putter', brand: 'Scotty', model: 'Newport 2' },
];

export const BagOverviewScreen: React.FC<Props> = ({ navigation }) => {
  const sections: { title: string; type: Club['type'] }[] = [
    { title: 'Driver', type: 'driver' },
    { title: 'Fairway & Hybrids', type: 'wood' },
    { title: 'Irons', type: 'iron' },
    { title: 'Wedges', type: 'wedge' },
    { title: 'Putter', type: 'putter' },
  ];

  const clubsByType = (type: Club['type']) =>
    mockClubs.filter((c) => c.type === type);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bag</Text>
        <Text style={styles.subtitle}>
          Build your digital bag so every swing is tagged with the right club.
        </Text>
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('AddClubWizard')}
      >
        <Text style={styles.addButtonText}>＋ Add a Club</Text>
      </Pressable>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 }}>
        {sections.map((section) => {
          const clubs = clubsByType(section.type);
          if (!clubs.length) return null;
          return (
            <View key={section.type} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {clubs.map((club) => (
                <View key={club.id} style={styles.clubRow}>
                  <Text style={styles.clubLabel}>{club.label}</Text>
                  <Text style={styles.clubDetail}>{club.brand} • {club.model}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050509', paddingHorizontal: 20, paddingTop: 16 },
  header: { marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#aaa' },
  addButton: {
    marginTop: 12,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#0af',
    alignItems: 'center',
  },
  addButtonText: { color: '#000', fontSize: 16, fontWeight: '600' },
  scroll: { flex: 1 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 8 },
  clubRow: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#222',
  },
  clubLabel: { fontSize: 16, color: '#fff' },
  clubDetail: { fontSize: 12, color: '#888', marginTop: 2 },
});
