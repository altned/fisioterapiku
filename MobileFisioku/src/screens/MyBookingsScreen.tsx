import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bookingService } from '../services/bookingService';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import { Booking } from '../types';

const MyBookingsScreen = () => {
  const navigation = useNavigation<any>();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingService.getMyBookings();
      if (response.success && response.data) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Load bookings error:', error);
      setBookings([]);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return COLORS.success;
      case 'PENDING':
        return COLORS.warning;
      case 'PAYMENT_PENDING':
        return COLORS.info;
      case 'PAID':
        return COLORS.success;
      case 'COMPLETED':
        return COLORS.textSecondary;
      case 'CANCELLED':
        return COLORS.error;
      default:
        return COLORS.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'check-circle';
      case 'PENDING':
        return 'clock-outline';
      case 'PAYMENT_PENDING':
        return 'cash-clock';
      case 'PAID':
        return 'cash-check';
      case 'COMPLETED':
        return 'check-all';
      case 'CANCELLED':
        return 'close-circle';
      default:
        return 'information';
    }
  };

  const handleBookingPress = (booking: Booking) => {
    navigation.navigate('BookingDetail', { bookingId: booking.id });
  };

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => handleBookingPress(item)}>
      <View style={styles.cardHeader}>
        <View style={styles.therapistInfo}>
          <Text style={styles.therapistName}>{item.therapist?.name || 'Therapist'}</Text>
          <Text style={styles.specialization}>
            {item.therapist?.specialization[0] || 'Physiotherapy'}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}>
          <Icon
            name={getStatusIcon(item.status)}
            size={14}
            color={COLORS.white}
          />
          <Text style={styles.statusText}>{item.status.replace('_', ' ')}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={18} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>
            {new Date(item.appointmentDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clock-outline" size={18} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{item.appointmentTime}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="map-marker" size={18} color={COLORS.textSecondary} />
          <Text style={styles.detailText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      </View>

      {item.payment && (
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentLabel}>Payment:</Text>
          <Text style={styles.paymentStatus}>
            {item.payment.status}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="calendar-blank" size={80} color={COLORS.textLight} />
      <Text style={styles.emptyTitle}>No Bookings Yet</Text>
      <Text style={styles.emptyText}>
        Your booking history will appear here
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBookingCard}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      />
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
  listContent: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  therapistInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  therapistName: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginBottom: SPACING.md,
  },
  detailsContainer: {
    gap: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  paymentLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  paymentStatus: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default MyBookingsScreen;
