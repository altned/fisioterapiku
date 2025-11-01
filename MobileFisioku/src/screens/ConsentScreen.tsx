import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import { useAppSelector } from '../store/hooks';
import { consentService } from '../services/consentService';
import { ConsentCheckboxes } from '../types';
import Button from '../components/Button';

type RouteParams = {
  Consent: {
    bookingData: {
      therapistId: string;
      appointmentDate: string;
      appointmentTime: string;
      location: string;
      complaint: string;
      medicalHistory?: string;
    };
  };
};

const ConsentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'Consent'>>();
  const { bookingData } = route.params;
  const { profile } = useAppSelector(state => state.auth);

  const [consentText, setConsentText] = useState('');
  const [consentVersion, setConsentVersion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  
  const [checkboxes, setCheckboxes] = useState<ConsentCheckboxes>({
    agreeExamination: false,
    agreeProcedure: false,
    agreeRisks: false,
    agreeDataUsage: false,
    agreeEmergency: false,
  });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadConsentText();
  }, []);

  const loadConsentText = async () => {
    setIsLoading(true);
    try {
      const response = await consentService.getConsentText();
      if (response.success && response.data) {
        setConsentText(response.data.text);
        setConsentVersion(response.data.version);
      } else {
        Alert.alert('Error', 'Failed to load consent text');
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    if (isCloseToBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const toggleCheckbox = (key: keyof ConsentCheckboxes) => {
    setCheckboxes(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allCheckboxesAgreed = (): boolean => {
    return Object.values(checkboxes).every(value => value === true);
  };

  const canSubmit = (): boolean => {
    return hasScrolledToBottom && allCheckboxesAgreed();
  };

  const handleAgree = async () => {
    if (!canSubmit()) {
      Alert.alert(
        'Incomplete',
        'Please scroll to the bottom and agree to all consent points to continue.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Navigate to confirmation with consent agreed flag
      navigation.navigate('BookingConfirmation', {
        bookingData: {
          ...bookingData,
          consentAgreed: true,
          consentCheckboxes: checkboxes,
        },
      });
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel? You will need to start the booking process again.',
      [
        { text: 'No, Continue', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => navigation.navigate('MainTabs'),
        },
      ]
    );
  };

  const checkboxItems = [
    {
      key: 'agreeExamination' as keyof ConsentCheckboxes,
      label: 'Saya setuju untuk pemeriksaan fisik oleh terapis',
      icon: 'stethoscope',
    },
    {
      key: 'agreeProcedure' as keyof ConsentCheckboxes,
      label: 'Saya memahami prosedur terapi yang akan dilakukan',
      icon: 'clipboard-text',
    },
    {
      key: 'agreeRisks' as keyof ConsentCheckboxes,
      label: 'Saya memahami risiko yang mungkin terjadi',
      icon: 'alert-circle',
    },
    {
      key: 'agreeDataUsage' as keyof ConsentCheckboxes,
      label: 'Saya setuju data medis saya digunakan untuk terapi',
      icon: 'database',
    },
    {
      key: 'agreeEmergency' as keyof ConsentCheckboxes,
      label: 'Saya memberikan izin kontak darurat jika diperlukan',
      icon: 'phone-alert',
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading consent form...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="file-document" size={48} color={COLORS.primary} />
          <Text style={styles.title}>Persetujuan Tindakan Terapi</Text>
          <Text style={styles.subtitle}>Informed Consent for Physiotherapy</Text>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Icon name="information" size={24} color={COLORS.info} />
          <Text style={styles.infoText}>
            Mohon baca dengan seksama dan scroll sampai bawah sebelum menyetujui.
          </Text>
        </View>

        {/* Consent Text */}
        <View style={styles.consentTextContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.consentScrollView}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            nestedScrollEnabled>
            <Text style={styles.consentText}>{consentText}</Text>
          </ScrollView>
          
          {!hasScrolledToBottom && (
            <View style={styles.scrollIndicator}>
              <Icon name="arrow-down" size={24} color={COLORS.warning} />
              <Text style={styles.scrollText}>Scroll untuk melanjutkan</Text>
            </View>
          )}
        </View>

        {/* Checkboxes */}
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxTitle}>Pernyataan Persetujuan:</Text>
          <Text style={styles.checkboxSubtitle}>
            Centang semua poin di bawah ini untuk melanjutkan
          </Text>

          {checkboxItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.checkboxItem,
                checkboxes[item.key] && styles.checkboxItemChecked,
              ]}
              onPress={() => toggleCheckbox(item.key)}
              activeOpacity={0.7}>
              <View style={styles.checkboxIconContainer}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={checkboxes[item.key] ? COLORS.primary : COLORS.textLight}
                />
              </View>
              <Text style={[
                styles.checkboxLabel,
                checkboxes[item.key] && styles.checkboxLabelChecked,
              ]}>
                {item.label}
              </Text>
              <View style={[
                styles.checkbox,
                checkboxes[item.key] && styles.checkboxChecked,
              ]}>
                {checkboxes[item.key] && (
                  <Icon name="check" size={18} color={COLORS.white} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Patient Info */}
        <View style={styles.patientInfoContainer}>
          <Text style={styles.patientInfoTitle}>Informasi Pasien:</Text>
          <View style={styles.patientInfoRow}>
            <Text style={styles.patientInfoLabel}>Nama:</Text>
            <Text style={styles.patientInfoValue}>{profile?.name || 'N/A'}</Text>
          </View>
          <View style={styles.patientInfoRow}>
            <Text style={styles.patientInfoLabel}>Tanggal:</Text>
            <Text style={styles.patientInfoValue}>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={styles.patientInfoRow}>
            <Text style={styles.patientInfoLabel}>Versi:</Text>
            <Text style={styles.patientInfoValue}>{consentVersion}</Text>
          </View>
        </View>

        {/* Warning Message */}
        {!canSubmit() && (
          <View style={styles.warningBanner}>
            <Icon name="alert" size={20} color={COLORS.warning} />
            <Text style={styles.warningText}>
              {!hasScrolledToBottom
                ? 'Anda harus membaca seluruh dokumen'
                : 'Anda harus menyetujui semua poin'}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Saya Setuju & Lanjutkan"
            onPress={handleAgree}
            disabled={!canSubmit() || isSubmitting}
            loading={isSubmitting}
          />

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={isSubmitting}>
            <Text style={styles.cancelButtonText}>Batalkan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: SIZES.radius,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.info,
    marginLeft: SPACING.sm,
    lineHeight: 20,
  },
  consentTextContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
    position: 'relative',
  },
  consentScrollView: {
    maxHeight: 300,
    padding: SPACING.md,
  },
  consentText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    lineHeight: 22,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    padding: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  checkboxContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  checkboxTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  checkboxSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  checkboxItemChecked: {
    backgroundColor: '#E8F5E9',
    borderColor: COLORS.success,
  },
  checkboxIconContainer: {
    marginRight: SPACING.sm,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.text,
    lineHeight: 20,
  },
  checkboxLabelChecked: {
    fontWeight: '600',
    color: COLORS.success,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  patientInfoContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  patientInfoTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  patientInfoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  patientInfoLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    width: 80,
  },
  patientInfoValue: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  warningBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  warningText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.warning,
    marginLeft: SPACING.sm,
    fontWeight: '600',
  },
  buttonContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  cancelButton: {
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  cancelButtonText: {
    fontSize: SIZES.body,
    color: COLORS.error,
    fontWeight: '600',
  },
});

export default ConsentScreen;
