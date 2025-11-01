import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    checkOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkOnboarding = async () => {
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000));

      const onboardingDone = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_DONE
      );
      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      if (accessToken) {
        navigation.replace('MainTabs');
      } else if (onboardingDone) {
        navigation.replace('Login');
      } else {
        navigation.replace('Onboarding');
      }
    } catch (error) {
      console.error('Splash error:', error);
      navigation.replace('Onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fisioku</Text>
      <Text style={styles.subtitle}>Layanan Fisioterapi di Rumah</Text>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.9,
  },
  loader: {
    marginTop: 40,
  },
});

export default SplashScreen;
