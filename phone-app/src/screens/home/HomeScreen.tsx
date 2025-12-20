import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../auth/AuthContext';

// Adjust this to match your root stack names
type RootStackParamList = {
  Home: undefined;
  SelectMode: undefined;
  BagOverview: undefined;
  Wallet: undefined;
  Opportunities: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// TODO: replace with real bag + wallet data from your store / API
const useMockAppState = () => {
  const bagFull = false; // change to true to hide the bag tile
  const tokenBalance = 1240; // SGP or whatever your token is
  const todayBoostExample = {
    label: 'Today’s best earning slot',
    course: 'Las Vegas National',
    time: '2:10 PM',
    estMultiplier: '3.2× after greens fee',
  };

  return { bagFull, tokenBalance, todayBoostExample };
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { bagFull, tokenBalance, todayBoostExample } = useMockAppState();

  const displayName = useMemo(
    () => user?.email?.split('@')[0] ?? 'Golfer',
    [user],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>ShotSpec</Text>
          <Text style={styles.tagline}>
            The neural network launch monitor – get paid every stroke.
          </Text>
          <Text style={styles.hello}>Hi, {displayName}</Text>
        </View>

        {/* Wallet Tile */}
        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate('Wallet')}
        >
          <Text style={styles.tileTitle}>Wallet</Text>
          <Text style={styles.tileSubtitle}>You currently have</Text>
          <Text style={styles.walletAmount}>
            {tokenBalance.toLocaleString()} tokens
          </Text>
          <Text style={styles.tileHint}>
            View earnings history, staking, and perks.
          </Text>
        </Pressable>

        {/* Today’s Opportunities Tile */}
        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate('Opportunities')}
        >
          <Text style={styles.tileTitle}>Today’s opportunities</Text>
          <Text style={styles.tileSubtitle}>
            Make the most money for your next round.
          </Text>
          <View style={styles.opportunityCard}>
            <Text style={styles.opLabel}>{todayBoostExample.label}</Text>
            <Text style={styles.opLine}>
              {todayBoostExample.course} • {todayBoostExample.time}
            </Text>
            <Text style={styles.opBoost}>
              {todayBoostExample.estMultiplier}
            </Text>
          </View>
          <Text style={styles.tileHint}>
            We’ll soon connect to tee time APIs and factor in green fees vs
            rewards.
          </Text>
        </Pressable>

        {/* Fill Your Bag Tile (only if bag not full) */}
        {!bagFull && (
          <Pressable
            style={[styles.tile, styles.highlightTile]}
            onPress={() => navigation.navigate('BagOverview')}
          >
            <Text style={styles.tileTitle}>Fill your bag</Text>
            <Text style={styles.tileSubtitle}>
              Add your clubs to unlock full rewards per stroke.
            </Text>
            <Text style={styles.tileHint}>
              We’ll mint a club NFT for each one so every shot is tagged
              correctly.
            </Text>
          </Pressable>
        )}

        {/* Play Golf Tile → Where are you playing today? */}
        <Pressable
          style={[styles.tile, styles.playTile]}
          onPress={() => navigation.navigate('SelectMode')}
        >
          <Text style={styles.tileTitle}>Play golf</Text>
          <Text style={styles.tileSubtitle}>
            Start a new session on course, at a range, or in your backyard.
          </Text>
          <Text style={styles.playCTA}>Start a round →</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050509' },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    marginBottom: 8,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  tagline: {
    marginTop: 4,
    fontSize: 12,
    color: '#aaa',
    maxWidth: 260,
  },
  hello: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  tile: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#0b0b11',
    borderWidth: 1,
    borderColor: '#222',
  },
  highlightTile: {
    borderColor: '#0af',
    backgroundColor: '#021019',
  },
  playTile: {
    backgroundColor: '#0af',
    borderColor: '#0af',
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  tileSubtitle: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 8,
  },
  tileHint: {
    fontSize: 11,
    color: '#888',
    marginTop: 8,
  },
  walletAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0af',
  },
  opportunityCard: {
    marginTop: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#11161f',
  },
  opLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  opLine: {
    marginTop: 4,
    fontSize: 14,
    color: '#fff',
  },
  opBoost: {
    marginTop: 4,
    fontSize: 13,
    color: '#0af',
    fontWeight: '600',
  },
  playCTA: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});
