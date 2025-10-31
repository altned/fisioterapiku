import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTherapists } from '../store/slices/therapistSlice';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import { Therapist } from '../types';

const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { therapists, isLoading } = useAppSelector(state => state.therapist);
  const { profile } = useAppSelector(state => state.auth);

  useEffect(() => {
    loadTherapists();
  }, []);

  const loadTherapists = () => {
    dispatch(fetchTherapists());
  };

  const handleTherapistPress = (therapist: Therapist) => {
    navigation.navigate('TherapistDetail', { therapistId: therapist.id });
  };

  const renderTherapistCard = ({ item }: { item: Therapist }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => handleTherapistPress(item)}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              style={styles.image}
            />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]}>
              <Text style={styles.imagePlaceholderText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialization} numberOfLines={1}>
            {item.specialization.join(', ')}
          </Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>⭐</Text>
              <Text style={styles.detailText}>
                {item.rating.toFixed(1)} ({item.reviewCount})
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>📍</Text>
              <Text style={styles.detailText} numberOfLines={1}>
                {item.location || 'N/A'}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.price}>
              Rp {item.pricePerSession.toLocaleString('id-ID')}/session
            </Text>
            {item.isAvailable ? (
              <View style={styles.availableBadge}>
                <Text style={styles.availableText}>Available</Text>
              </View>
            ) : (
              <View style={styles.unavailableBadge}>
                <Text style={styles.unavailableText}>Busy</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.userName}>{profile?.name || 'Patient'}!</Text>
      </View>
      <Text style={styles.subtitle}>
        Find your therapist and book an appointment
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No therapists available</Text>
    </View>
  );

  if (isLoading && therapists.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={therapists}
        renderItem={renderTherapistCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadTherapists}
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
  header: {
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  userName: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  cardContent: {
    flexDirection: 'row',
    padding: SPACING.md,
  },
  imageContainer: {
    marginRight: SPACING.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius,
  },
  imagePlaceholder: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  info: {
    flex: 1,
  },
  name: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  details: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  detailText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  price: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  availableBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availableText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
  },
  unavailableBadge: {
    backgroundColor: COLORS.textLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unavailableText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
});

export default DashboardScreen;
