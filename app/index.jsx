import LoginScreen from './components/Screen/LoginScreen/LoginScreen';
import HomeScreen from './components/Screen/HomeScreen/HomeScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  getToken: async (key) => {
    try {
      return SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  saveToken: async (key, value) => {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
  deleteToken: async (key) => {
    try {
      return SecureStore.deleteItemAsync(key);
    } catch {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Light': require('../assets/fonts/Outfit-Light.ttf'),
    'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Wait until fonts load
  }

  return (
    <ClerkProvider
      publishableKey='pk_test_cmVuZXdpbmctcGlnbGV0LTIwLmNsZXJrLmFjY291bnRzLmRldiQ'
      tokenCache={tokenCache}
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <HomeScreen />
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
