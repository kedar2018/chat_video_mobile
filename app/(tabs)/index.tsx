import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Fonts } from '@/constants/theme';
import {
  roomUrl,
  ROOMS_BASE_URL,
  ROOMS_LIST_PATH,
  ROOMS_NEW_PATH,
} from '@/constants/links';

type RoomSummary = {
  id: string;
  title: string;
  description: string;
  tone: string;
};

const FEATURED_ROOMS: RoomSummary[] = [
  {
    id: '1',
    title: 'Main Stage',
    description: 'Pinned for demos, announcements, and open co-working.',
    tone: 'Live now',
  },
];

export default function RoomsScreen() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const heroAnim = useRef(new Animated.Value(0)).current;

  const cardsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(heroAnim, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true,
      }),
      Animated.timing(cardsAnim, {
        toValue: 1,
        duration: 620,
        useNativeDriver: true,
      }),
    ]).start();
  }, [cardsAnim, heroAnim]);

  const rooms = useMemo(() => FEATURED_ROOMS, []);

  const joinRoom = (roomId: string) => {
    router.push({ pathname: '/live', params: { room: roomId } });
  };

  const openRoomsPath = (path: string) => {
    router.push({ pathname: '/rooms-browser', params: { path } });
  };

  const joinFromInput = () => {
    const trimmed = roomCode.trim();
    joinRoom(trimmed.length > 0 ? trimmed : '1');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.heroCard,
            {
              opacity: heroAnim,
              transform: [
                {
                  translateY: heroAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.heroOrbOne} />
          <View style={styles.heroOrbTwo} />
          <Text style={styles.eyebrow}>Roomwave</Text>
          <Text style={styles.heroTitle}>Chat and video rooms, in your pocket.</Text>
          <Text style={styles.heroSubtitle}>
            Built on your Rails + WebRTC stack for seamless live sessions.
          </Text>
          <View style={styles.heroActions}>
            <Pressable style={[styles.actionButton, styles.primaryButton]} onPress={() => joinRoom('1')}>
              <Text style={styles.primaryButtonText}>Join Room 1</Text>
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => Linking.openURL(ROOMS_BASE_URL)}>
              <Text style={styles.secondaryButtonText}>Browse Rooms</Text>
            </Pressable>
          </View>
          <View style={styles.heroFooter}>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>WebRTC</Text>
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>Live chat</Text>
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>Mobile first</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.sectionCard,
            {
              opacity: cardsAnim,
              transform: [
                {
                  translateY: cardsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.sectionTitle}>Join by room code</Text>
          <Text style={styles.sectionDescription}>
            Drop in with a link or share a numeric code to connect instantly.
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              value={roomCode}
              onChangeText={setRoomCode}
              placeholder="Room number"
              placeholderTextColor="#8E867E"
              keyboardType="number-pad"
              style={styles.textInput}
            />
            <Pressable style={styles.joinButton} onPress={joinFromInput}>
              <Text style={styles.joinButtonText}>Join</Text>
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.sectionCard,
            {
              opacity: cardsAnim,
              transform: [
                {
                  translateY: cardsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.sectionTitle}>Manage rooms</Text>
          <Text style={styles.sectionDescription}>
            Jump into the Rails interface to create a room or browse recent ones.
          </Text>
          <View style={styles.manageRow}>
            <Pressable
              style={[styles.manageCard, styles.manageCardPrimary]}
              onPress={() => openRoomsPath(ROOMS_NEW_PATH)}>
              <Text style={styles.manageLabel}>Create room</Text>
              <Text style={styles.manageHint}>/rooms/new</Text>
            </Pressable>
            <Pressable
              style={[styles.manageCard, styles.manageCardSecondary]}
              onPress={() => openRoomsPath(ROOMS_LIST_PATH)}>
              <Text style={styles.manageLabel}>Recent rooms</Text>
              <Text style={styles.manageHint}>/rooms</Text>
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: cardsAnim,
              transform: [
                {
                  translateY: cardsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.sectionTitle}>Featured rooms</Text>
          {rooms.map((room) => (
            <Pressable
              key={room.id}
              style={styles.roomCard}
              onPress={() => joinRoom(room.id)}>
              <View style={styles.roomCardHeader}>
                <Text style={styles.roomTitle}>{room.title}</Text>
                <Text style={styles.roomTone}>{room.tone}</Text>
              </View>
              <Text style={styles.roomDescription}>{room.description}</Text>
              <View style={styles.roomFooter}>
                <Text style={styles.roomLink}>Open {roomUrl(room.id)}</Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1EA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#FFF6EE',
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3DDCB',
    marginBottom: 20,
  },
  heroOrbOne: {
    position: 'absolute',
    height: 180,
    width: 180,
    borderRadius: 90,
    backgroundColor: '#FFD6C8',
    top: -60,
    right: -30,
    opacity: 0.9,
  },
  heroOrbTwo: {
    position: 'absolute',
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: '#CFE8E0',
    bottom: -50,
    left: -20,
    opacity: 0.85,
  },
  eyebrow: {
    fontFamily: Fonts.rounded,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    color: '#8C6D61',
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    color: '#2C2622',
    lineHeight: 34,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 22,
    color: '#4B413A',
    marginBottom: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  primaryButton: {
    backgroundColor: '#F05A3B',
  },
  primaryButtonText: {
    fontFamily: Fonts.rounded,
    color: '#FFF5EF',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#F05A3B',
    backgroundColor: '#FFF1E8',
  },
  secondaryButtonText: {
    fontFamily: Fonts.rounded,
    color: '#B8432C',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  heroFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  heroTag: {
    backgroundColor: '#FDE6D7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  heroTagText: {
    fontFamily: Fonts.rounded,
    color: '#7A4E3C',
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: '#FFFDFB',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0E2D6',
    marginBottom: 18,
  },
  sectionTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    color: '#2C2622',
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: Fonts.sans,
    color: '#4B413A',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E6D6C8',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontFamily: Fonts.sans,
    fontSize: 15,
    color: '#2C2622',
    backgroundColor: '#FFF7F1',
  },
  joinButton: {
    backgroundColor: '#1E6F5C',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  joinButtonText: {
    fontFamily: Fonts.rounded,
    color: '#F5FAF8',
    fontSize: 14,
  },
  manageRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  manageCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
  },
  manageCardPrimary: {
    backgroundColor: '#FDE6D7',
    borderColor: '#F3C7B0',
  },
  manageCardSecondary: {
    backgroundColor: '#E4F2EC',
    borderColor: '#BBDDD2',
  },
  manageLabel: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    color: '#2C2622',
  },
  manageHint: {
    fontFamily: Fonts.rounded,
    fontSize: 12,
    color: '#6C5E55',
    marginTop: 6,
  },
  section: {
    gap: 12,
  },
  roomCard: {
    backgroundColor: '#FFF8F2',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F1D8C8',
  },
  roomCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roomTitle: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    color: '#2C2622',
  },
  roomTone: {
    fontFamily: Fonts.rounded,
    fontSize: 12,
    color: '#E3583F',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  roomDescription: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    color: '#4B413A',
    marginTop: 8,
  },
  roomFooter: {
    marginTop: 12,
  },
  roomLink: {
    fontFamily: Fonts.rounded,
    fontSize: 12,
    color: '#1E6F5C',
  },
});
