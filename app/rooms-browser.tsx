import { useMemo } from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

import { Fonts } from '@/constants/theme';
import { roomsPathUrl, ROOMS_LIST_PATH } from '@/constants/links';

export default function RoomsBrowserScreen() {
  const { path } = useLocalSearchParams<{ path?: string }>();

  const resolvedPath = useMemo(() => {
    if (typeof path === 'string' && path.trim().length > 0) {
      return path.trim();
    }
    return ROOMS_LIST_PATH;
  }, [path]);

  const url = roomsPathUrl(resolvedPath);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Rooms</Text>
            <Text style={styles.title}>{resolvedPath}</Text>
          </View>
          <Pressable style={styles.headerButton} onPress={() => Linking.openURL(url)}>
            <Text style={styles.headerButtonText}>Open in browser</Text>
          </Pressable>
        </View>
        <View style={styles.webFallback}>
          <Text style={styles.webFallbackTitle}>Open in a new tab</Text>
          <Text style={styles.webFallbackText}>This page is optimized for in-app viewing.</Text>
          <Pressable style={styles.primaryAction} onPress={() => Linking.openURL(url)}>
            <Text style={styles.primaryActionText}>Launch</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Rooms</Text>
          <Text style={styles.title}>{resolvedPath}</Text>
        </View>
        <Pressable style={styles.headerButton} onPress={() => Linking.openURL(url)}>
          <Text style={styles.headerButtonText}>Open in browser</Text>
        </Pressable>
      </View>
      <View style={styles.webviewWrap}>
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1EA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DACC',
    backgroundColor: '#FFF4EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  eyebrow: {
    fontFamily: Fonts.rounded,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 11,
    color: '#8C6D61',
    marginBottom: 4,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    color: '#2C2622',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#1E6F5C',
    borderRadius: 999,
  },
  headerButtonText: {
    fontFamily: Fonts.rounded,
    fontSize: 12,
    color: '#F5FAF8',
  },
  webviewWrap: {
    flex: 1,
    backgroundColor: '#F7F1EA',
  },
  webview: {
    flex: 1,
    backgroundColor: '#F7F1EA',
  },
  webFallback: {
    flex: 1,
    margin: 20,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#FFF7F1',
    borderWidth: 1,
    borderColor: '#F0E2D6',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  webFallbackTitle: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    color: '#2C2622',
  },
  webFallbackText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    color: '#4B413A',
    textAlign: 'center',
  },
  primaryAction: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: '#F05A3B',
  },
  primaryActionText: {
    fontFamily: Fonts.rounded,
    fontSize: 14,
    color: '#FFF5EF',
  },
});
