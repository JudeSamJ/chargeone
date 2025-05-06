import { useEffect } from 'react'; // ✅ Import useEffect
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSignIn } from '@clerk/clerk-expo';

export default function LoginScreen() {
  const { signIn } = useSignIn();

  // ✅ Only call once in useEffect
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = Linking.createURL('exp://192.168.167.217:8081'); // must be registered in Clerk
      const { externalVerificationRedirectURL } = await signIn.create({
        strategy: 'oauth_google',
        redirectUrl,
      });

      const result = await WebBrowser.openAuthSessionAsync(
        externalVerificationRedirectURL,
        redirectUrl
      );

      if (result.type === 'success') {
        console.log('OAuth login success');
      }
    } catch (err) {
      console.error('OAuth login error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/ev_main_logo.jpg')}
        style={styles.logoImage}
      />
      <Text style={styles.mainSubtitle}>Your Ultimate EV Charging App</Text>
      <Text style={styles.secondarySubtitle}>
        Find EV Station near you, plan trip and so much more in just one click
      </Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleGoogleLogin}>
        <Text style={styles.loginText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  mainSubtitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
    marginTop: 10,
  },
  secondarySubtitle: {
    marginTop: 30,
    fontFamily: 'Outfit-Regular',
    fontSize: 17,
    width: 350,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: 'green',
    padding: 17,
    marginTop: 40,
    borderRadius: 99,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Outfit-Medium',
    fontSize: 17,
  },
});
