import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import { Booking, BookingStatus } from '../types';
import { bookingService } from '../services/bookingService';

type RouteParams = {
  BookingDetail: {
    bookingId: string;
  };
};

const BookingDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'BookingDetail'>>();
  const { bookingId } = route.params;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookingDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  const loadBookingDetail = async () => {
    setIsLoading(true);
    try {
      const response = await bookingService.getBookingById(bookingId);
      if (response.success && response.data) {
        setBooking(response.data);
      } else {
        Alert.alert('Error', response.message || 'Failed to load booking details');
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const canUploadPayment = () => {
    return booking?.status === 'CONFIRMED' || booking?.status === 'PAYMENT_PENDING';
  };

  const canCancelBooking = () => {
    return (
      booking?.status === 'PENDING' ||
      booking?.status === 'CONFIRMED' ||
      booking?.status === 'PAYMENT_PENDING'
    );
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await bookingService.cancelBooking(bookingId);
              if (response.success) {
                Alert.alert('Success', 'Booking cancelled successfully');
                navigation.goBack();
              } else {
                Alert.alert('Error', response.message || 'Failed to cancel booking');
              }
            } catch {
              Alert.alert('Error', 'An unexpected error occurred');
            }
          },
        },
      ]
    );
  };

  const handleUploadPayment = () => {
    navigation.navigate('PaymentUpload', { bookingId });
  };

  const getStatusColor = (status: BookingStatus): string => {
    const colors: Record<BookingStatus, string> = {
      PENDING: COLORS.warning,
      CONFIRMED: COLORS.success,
      PAYMENT_PENDING: COLORS.info,
      PAID: COLORS.success,
      IN_PROGRESS: COLORS.primary,
      COMPLETED: COLORS.textLight,
      CANCELLED: COLORS.error,
    };
    return colors[status] || COLORS.textLight;
  };

  const getStatusIcon = (status: BookingStatus): string => {
    const icons: Record<BookingStatus, string> = {
      PENDING: 'clock-outline',
      CONFIRMED: 'check-circle',
      PAYMENT_PENDING: 'credit-card-clock',
      PAID: 'check-decagram',
      IN_PROGRESS: 'progress-check',
      COMPLETED: 'checkbox-marked-circle',
      CANCELLED: 'close-circle',
    };
    return icons[status] || 'information';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number): string => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={64} color={COLORS.error} />
        <Text style={styles.errorText}>Booking not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={[styles.statusCard, { backgroundColor: getStatusColor(booking.status) }]}>
          <Icon name={getStatusIcon(booking.status)} size={40} color={COLORS.white} />
          <Text style={styles.statusText}>{booking.status.replace('_', ' ')}</Text>
          <Text style={styles.bookingId}>Booking ID: {booking.id.slice(0, 8)}</Text>
        </View>

        {/* Therapist Info */}
        {booking.therapist && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Therapist</Text>
            <View style={styles.therapistContainer}>
              {booking.therapist.profileImage ? (
                <Image
                  source={{ uri: booking.therapist.profileImage }}
                  style={styles.therapistImage}
                />
              ) : (
                <View style={[styles.therapistImage, styles.therapistPlaceholder]}>
                  <Icon name="account" size={40} color={COLORS.white} />
                </View>
              )}
              <View style={styles.therapistInfo}>
                <Text style={styles.therapistName}>{booking.therapist.name}</Text>
                <Text style={styles.therapistBidang}>
                  {booking.therapist.bidang && Array.isArray(booking.therapist.bidang)
                    ? booking.therapist.bidang.join(', ')
                    : 'Terapi Umum'}
                </Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color={COLORS.warning} />
                  <Text style={styles.ratingText}>
                    {booking.therapist.rating.toFixed(1)} ({booking.therapist.reviewCount})
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Appointment Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          
          <View style={styles.detailRow}>
            <Icon name="calendar" size={20} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDate(booking.appointmentDate)}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="clock-outline" size={20} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{booking.appointmentTime}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="map-marker" size={20} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{booking.location}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="text" size={20} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Complaint</Text>
              <Text style={styles.detailValue}>{booking.complaint}</Text>
            </View>
          </View>

          {booking.medicalHistory && (
            <View style={styles.detailRow}>
              <Icon name="file-document" size={20} color={COLORS.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Medical History</Text>
                <Text style={styles.detailValue}>{booking.medicalHistory}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Payment Info */}
        {booking.payment && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            
            <View style={styles.detailRow}>
              <Icon name="cash" size={20} color={COLORS.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>{formatCurrency(booking.payment.amount)}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="credit-card" size={20} color={COLORS.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Method</Text>
                <Text style={styles.detailValue}>
                  {booking.payment.method.replace('_', ' ')}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="information" size={20} color={COLORS.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{booking.payment.status}</Text>
              </View>
            </View>

            {booking.payment.paymentProof && (
              <View style={styles.proofContainer}>
                <Text style={styles.detailLabel}>Payment Proof</Text>
                <Image
                  source={{ uri: booking.payment.paymentProof }}
                  style={styles.paymentProof}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {canUploadPayment() && !booking.payment && (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleUploadPayment}>
              <Icon name="upload" size={20} color={COLORS.white} />
              <Text style={styles.primaryButtonText}>Upload Payment Proof</Text>
            </TouchableOpacity>
          )}

          {canCancelBooking() && (
            <TouchableOpacity
              style={[styles.button, styles.dangerButton]}
              onPress={handleCancelBooking}>
              <Icon name="close" size={20} color={COLORS.white} />
              <Text style={styles.dangerButtonText}>Cancel Booking</Text>
            </TouchableOpacity>
          )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    padding: SPACING.xl,
  },
  errorText: {
    ...FONTS.h4,
    color: COLORS.error,
    marginTop: SPACING.md,
  },
  statusCard: {
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statusText: {
    ...FONTS.h3,
    color: COLORS.white,
    marginTop: SPACING.sm,
    textTransform: 'uppercase',
  },
  bookingId: {
    fontSize: SIZES.small,
    color: COLORS.white,
    marginTop: SPACING.xs,
    opacity: 0.9,
  },
  card: {
    backgroundColor: COLORS.white,
    margin: SPACING.md,
    marginTop: 0,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  therapistContainer: {
    flexDirection: 'row',
  },
  therapistImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SPACING.md,
  },
  therapistPlaceholder: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  therapistInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  therapistName: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  therapistBidang: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  detailContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  detailLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  proofContainer: {
    marginTop: SPACING.md,
  },
  paymentProof: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    marginTop: SPACING.sm,
  },
  buttonContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryButtonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  dangerButton: {
    backgroundColor: COLORS.error,
  },
  dangerButtonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
});

export default BookingDetailScreen;
