import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TileButton } from '../../components/TileButton';

type BagStackParamList = {
  BagOverview: undefined;
  AddClubWizard: undefined;
};

type Props = NativeStackScreenProps<BagStackParamList, 'AddClubWizard'>;

type ClubType = 'driver' | 'wood' | 'hybrid' | 'iron' | 'wedge' | 'putter';

const CLUB_TYPES: { id: ClubType; label: string; subtitle: string }[] = [
  { id: 'driver', label: 'Driver', subtitle: 'Big dog, max distance' },
  { id: 'wood', label: 'Fairway Wood', subtitle: '3w, 5w, 7w…' },
  { id: 'hybrid', label: 'Hybrid', subtitle: 'Rescue clubs' },
  { id: 'iron', label: 'Iron', subtitle: '4i–9i' },
  { id: 'wedge', label: 'Wedge', subtitle: 'PW, GW, SW, LW' },
  { id: 'putter', label: 'Putter', subtitle: 'Flatstick' },
];

const BRANDS = [
  'Titleist',
  'Callaway',
  'TaylorMade',
  'Ping',
  'Mizuno',
  'Cobra',
  'Srixon',
  'PXG',
  'Other',
];

const MODELS_BY_BRAND: Record<string, string[]> = {
  Titleist: ['TSR2', 'TSR3', 'T100', 'T150', 'T200'],
  Callaway: ['Paradym', 'Paradym Ai Smoke', 'Apex Pro'],
  TaylorMade: ['Qi10', 'P790', 'Stealth 2'],
  Ping: ['G430', 'i230', 'Blueprint'],
  Mizuno: ['Pro 243', 'Pro 241', 'JPX 923'],
  Cobra: ['Darkspeed', 'King CB/MB'],
  Srixon: ['ZX7 Mk II', 'ZX5 Mk II'],
  PXG: ['0311 GEN6', '0317'],
  Other: ['Custom', 'Unknown'],
};

const SHAFT_OPTIONS = [
  'Steel - Regular',
  'Steel - Stiff',
  'Steel - X-Stiff',
  'Graphite - Regular',
  'Graphite - Stiff',
  'Graphite - Senior',
];

const GRIP_OPTIONS = [
  'Standard',
  'Midsize',
  'Oversize',
  'Jumbo',
  'Custom',
];

const TOTAL_STEPS = 6;

export const AddClubWizardScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [clubType, setClubType] = useState<ClubType | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [shaft, setShaft] = useState<string | null>(null);
  const [grip, setGrip] = useState<string | null>(null);

  const modelsForBrand = useMemo(
    () => (brand ? MODELS_BY_BRAND[brand] ?? ['Custom'] : []),
    [brand]
  );

  const canGoNext = useMemo(() => {
    switch (step) {
      case 1: return !!clubType;
      case 2: return !!brand;
      case 3: return !!model;
      case 4: return !!shaft;
      case 5: return !!grip;
      default: return true;
    }
  }, [step, clubType, brand, model, shaft, grip]);

  const handleNext = () => {
    if (!canGoNext) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // Finalize
      const summary = `Type: ${clubType}\nBrand: ${brand}\nModel: ${model}\nShaft: ${shaft}\nGrip: ${grip}`;
      // Later: send to backend, mint NFT, etc.
      Alert.alert('Club saved (stub)', summary, [
        {
          text: 'Done',
          onPress: () => navigation.replace('BagOverview'),
        },
      ]);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={styles.backText}>◀ Back</Text>
        </Pressable>
        <Text style={styles.title}>Add a Club</Text>
        <Text style={styles.subtitle}>Step {step} of {TOTAL_STEPS}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / TOTAL_STEPS) * 100}%` }]} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>What type of club is this?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {CLUB_TYPES.map((ct) => (
                <TileButton
                  key={ct.id}
                  label={ct.label}
                  subtitle={ct.subtitle}
                  selected={clubType === ct.id}
                  onPress={() => setClubType(ct.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Which brand?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {BRANDS.map((b) => (
                <TileButton
                  key={b}
                  label={b}
                  selected={brand === b}
                  onPress={() => {
                    setBrand(b);
                    setModel(null);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Which model?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {modelsForBrand.map((m) => (
                <TileButton
                  key={m}
                  label={m}
                  selected={model === m}
                  onPress={() => setModel(m)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {step === 4 && (
          <View>
            <Text style={styles.stepTitle}>What shaft?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {SHAFT_OPTIONS.map((s) => (
                <TileButton
                  key={s}
                  label={s}
                  selected={shaft === s}
                  onPress={() => setShaft(s)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {step === 5 && (
          <View>
            <Text style={styles.stepTitle}>What grip?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {GRIP_OPTIONS.map((g) => (
                <TileButton
                  key={g}
                  label={g}
                  selected={grip === g}
                  onPress={() => setGrip(g)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {step === 6 && (
          <View>
            <Text style={styles.stepTitle}>Review this club</Text>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewLine}>Type: <Text style={styles.reviewValue}>{clubType ?? '-'}</Text></Text>
              <Text style={styles.reviewLine}>Brand: <Text style={styles.reviewValue}>{brand ?? '-'}</Text></Text>
              <Text style={styles.reviewLine}>Model: <Text style={styles.reviewValue}>{model ?? '-'}</Text></Text>
              <Text style={styles.reviewLine}>Shaft: <Text style={styles.reviewValue}>{shaft ?? '-'}</Text></Text>
              <Text style={styles.reviewLine}>Grip: <Text style={styles.reviewValue}>{grip ?? '-'}</Text></Text>
              <Text style={styles.reviewHint}>
                Later: this step will also show the NFT preview and “Mint” action.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer buttons */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.nextButton, !canGoNext && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <Text style={styles.nextButtonText}>
            {step === TOTAL_STEPS ? 'Save Club' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050509', paddingHorizontal: 20, paddingTop: 16 },
  header: { marginBottom: 12 },
  backText: { color: '#0af', fontSize: 14, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 13, color: '#aaa', marginTop: 4 },
  progressBar: {
    marginTop: 10,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#222',
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 999,
    backgroundColor: '#0af',
  },
  scroll: { flex: 1, marginTop: 16 },
  stepTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 },
  reviewCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: '#0b0b11',
  },
  reviewLine: { color: '#ccc', fontSize: 14, marginBottom: 6 },
  reviewValue: { color: '#fff', fontWeight: '600' },
  reviewHint: { marginTop: 10, fontSize: 12, color: '#777' },
  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
  },
  nextButton: {
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#0af',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#555',
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
