import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store/hooks';
import { COLORS, SIZES, SPACING, FONTS } from '../constants/theme';
import Button from '../components/Button';
import Input from '../components/Input';

const BookingFormScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { profile } = useAppSelector(state => state.auth);

  const therapist = route.params?.therapist;

  const [formData, setFormData] = useState({
    complaint: '',
    medicalHistory: '',
    address: profile?.address || '',
    notes: '',
  });

  const [errors, setErrors] = useState({
    complaint: '',
    address: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { complaint: '', address: '' };

    if (!formData.complaint.trim()) {
      newErrors.complaint = 'Complaint is required';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validate()) {
      return;
    }

    // Navigate to schedule selection with booking data
    navigation.navigate('ScheduleSelection', {
      therapist,
      bookingData: formData,
    });
  };

  if (!therapist) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Therapist data not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Therapist Info Card */}
        <View style={styles.therapistCard}>
          <Text style={styles.therapistName}>{therapist.name}</Text>
          <Text style={styles.therapistInfo}>
            {therapist.location} • Rp {therapist.pricePerSession.toLocaleString('id-ID')}
          </Text>
        </View>

        {/* Patient Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{profile?.name || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{profile?.phone || 'N/A'}</Text>
          </View>
        </View>

        {/* Booking Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>

          <Input
            label="Chief Complaint *"
            value={formData.complaint}
            onChangeText={value => handleChange('complaint', value)}
            placeholder="Describe your main complaint (e.g., back pain, neck stiffness)"
            multiline
            numberOfLines={3}
            error={errors.complaint}
            containerStyle={styles.textArea}
          />

          <Input
            label="Medical History (Optional)"
            value={formData.medicalHistory}
            onChangeText={value => handleChange('medicalHistory', value)}
            placeholder="Any relevant medical history or previous conditions"
            multiline
            numberOfLines={3}
            containerStyle={styles.textArea}
          />

          <Input
            label="Home Address *"
            value={formData.address}
            onChangeText={value => handleChange('address', value)}
            placeholder="Enter your full home address"
            multiline
            numberOfLines={2}
            error={errors.address}
            containerStyle={styles.textArea}
          />

          <Input
            label="Additional Notes (Optional)"
            value={formData.notes}
            onChangeText={value => handleChange('notes', value)}
            placeholder="Any special requests or information for the therapist"
            multiline
            numberOfLines={2}
            containerStyle={styles.textArea}
          />
        </View>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>

      {/* Footer with Next Button */}
      <View style={styles.footer}>
        <Button
          title="Next: Select Schedule"
          onPress={handleNext}
          size="large"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
  },
  errorText: {
    fontSize: SIZES.body,
    color: COLORS.error,
  },
  therapistCard: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  therapistName: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  therapistInfo: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.9,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  infoLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    width: 80,
  },
  infoValue: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  textArea: {
    marginBottom: SPACING.md,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default BookingFormScreen;
