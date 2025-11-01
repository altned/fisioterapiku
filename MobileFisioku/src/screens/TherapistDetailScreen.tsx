import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTherapistById } from '../store/slices/therapistSlice';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';

const TherapistDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { selectedTherapist, isLoading } = useAppSelector(state => state.therapist);

  const therapistId = route.params?.therapistId;

  useEffect(() => {
    if (therapistId) {
      dispatch(fetchTherapistById(therapistId));
    }
  }, [therapistId, dispatch]);

  const handleBookAppointment = () => {
    if (selectedTherapist) {
      navigation.navigate('BookingForm', { therapist: selectedTherapist });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!selectedTherapist) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Therapist not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          {selectedTherapist.profileImage ? (
            <Image
              source={{ uri: selectedTherapist.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
              <Text style={styles.profileImageText}>
                {selectedTherapist.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <Text style={styles.name}>{selectedTherapist.name}</Text>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color={COLORS.warning} />
            <Text style={styles.ratingText}>
              {selectedTherapist.rating.toFixed(1)} ({selectedTherapist.reviewCount} reviews)
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon name="briefcase" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>{selectedTherapist.experience} years</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="map-marker" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>{selectedTherapist.location || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price per Session</Text>
            <Text style={styles.price}>
              Rp {selectedTherapist.pricePerSession.toLocaleString('id-ID')}
            </Text>
          </View>

          {selectedTherapist.isAvailable ? (
            <View style={styles.availableBadge}>
              <Icon name="check-circle" size={16} color={COLORS.white} />
              <Text style={styles.availableText}>Available</Text>
            </View>
          ) : (
            <View style={styles.unavailableBadge}>
              <Icon name="close-circle" size={16} color={COLORS.white} />
              <Text style={styles.unavailableText}>Currently Busy</Text>
            </View>
          )}
        </View>

        {/* Specialization Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialization</Text>
          <View style={styles.tagsContainer}>
            {selectedTherapist.specialization.map((spec, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{spec}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bio Section */}
        {selectedTherapist.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{selectedTherapist.bio}</Text>
          </View>
        )}

        {/* Qualifications Section */}
        {selectedTherapist.qualifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Qualifications</Text>
            {selectedTherapist.qualifications.map((qual, index) => (
              <View key={index} style={styles.qualificationItem}>
                <Icon name="check-circle" size={20} color={COLORS.success} />
                <Text style={styles.qualificationText}>{qual}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Reviews Section Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewsPlaceholder}>
            <Icon name="comment-text-outline" size={40} color={COLORS.textLight} />
            <Text style={styles.placeholderText}>
              Reviews will be displayed here
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Book Button */}
      <View style={styles.footer}>
        <Button
          title={selectedTherapist.isAvailable ? 'Book Appointment' : 'Not Available'}
          onPress={handleBookAppointment}
          disabled={!selectedTherapist.isAvailable}
          style={styles.bookButton}
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
  },
  errorText: {
    fontSize: SIZES.body,
    color: COLORS.error,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  headerCard: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.md,
  },
  profileImagePlaceholder: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 48,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  name: {
    ...FONTS.h2,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  ratingText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  priceLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  price: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
  },
  availableText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  unavailableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
  },
  unavailableText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: SPACING.xs,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
  },
  tagText: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  bioText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  qualificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  qualificationText: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    lineHeight: 22,
  },
  reviewsPlaceholder: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  placeholderText: {
    fontSize: SIZES.body,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
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
  bookButton: {
    width: '100%',
  },
});

export default TherapistDetailScreen;
