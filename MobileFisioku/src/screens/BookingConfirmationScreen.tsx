import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '../store/hooks';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';

const BookingConfirmationScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { profile } = useAppSelector(state => state.auth);

  const therapist = route.params?.therapist;
  const bookingData = route.params?.bookingData;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        therapistId: therapist.id,
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        location: bookingData.address,
        complaint: bookingData.complaint,
        medicalHistory: bookingData.medicalHistory || undefined,
      };

      const response = await api.post(ENDPOINTS.BOOKING.CREATE, payload);

      if (response.success) {
        Alert.alert(
          'Booking Successful!',
          'Your booking has been submitted. Please wait for therapist confirmation.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Bookings'),
            },
          ]
        );
      } else {
        Alert.alert('Booking Failed', response.message || 'Failed to create booking');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Icon name="check-circle" size={80} color={COLORS.success} />
          <Text style={styles.title}>Confirm Your Booking</Text>
          <Text style={styles.subtitle}>
            Please review your booking details before confirming
          </Text>
        </View>

        {/* Therapist Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Therapist</Text>
          <Text style={styles.therapistName}>{therapist?.name}</Text>
          <Text style={styles.therapistInfo}>
            {therapist?.location} • Rp {therapist?.pricePerSession.toLocaleString('id-ID')}
          </Text>
        </View>

        {/* Schedule Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule</Text>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              {new Date(bookingData.appointmentDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="clock-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{bookingData.appointmentTime}</Text>
          </View>
        </View>

        {/* Patient Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Patient Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{profile?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{profile?.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{bookingData.address}</Text>
          </View>
        </View>

        {/* Complaint & History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medical Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Complaint:</Text>
            <Text style={styles.detailValue}>{bookingData.complaint}</Text>
          </View>
          {bookingData.medicalHistory && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Medical History:</Text>
              <Text style={styles.detailValue}>{bookingData.medicalHistory}</Text>
            </View>
          )}
          {bookingData.notes && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Notes:</Text>
              <Text style={styles.detailValue}>{bookingData.notes}</Text>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Confirm Booking"
          onPress={handleConfirmBooking}
          loading={isSubmitting}
          size="large"
        />
      </View>
    </View>
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
  iconContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  cardTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  therapistName: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  therapistInfo: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SPACING.md,
    flex: 1,
  },
  detailRow: {
    marginBottom: SPACING.md,
  },
  detailLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: SIZES.body,
    color: COLORS.text,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    ...SHADOWS.large,
  },
});

export default BookingConfirmationScreen;
