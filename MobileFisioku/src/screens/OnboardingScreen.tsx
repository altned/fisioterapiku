import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import { COLORS, SIZES, SPACING, FONTS } from '../constants/theme';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Terapi di Rumah',
    description:
      'Dapatkan layanan fisioterapi profesional langsung di kenyamanan rumah Anda',
    emoji: '🏠',
  },
  {
    id: '2',
    title: 'Fisioterapis Berpengalaman',
    description:
      'Terhubung dengan fisioterapis bersertifikat dan berpengalaman di bidangnya',
    emoji: '👨‍⚕️',
  },
  {
    id: '3',
    title: 'Booking Mudah & Aman',
    description:
      'Booking appointment dengan mudah dan lakukan pembayaran dengan aman',
    emoji: '📱',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'true');
    navigation.replace('Login');
  };

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => (
    <View style={styles.slide}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentIndex === index && styles.dotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        keyExtractor={item => item.id}
      />

      {renderDots()}

      <View style={styles.buttonContainer}>
        <Button
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: SPACING.lg,
    zIndex: 10,
    padding: SPACING.sm,
  },
  skipText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.xl,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
});

export default OnboardingScreen;
