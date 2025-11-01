import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { user, profile } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await dispatch(logout());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'account-edit',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      icon: 'lock-reset',
      title: 'Change Password',
      subtitle: 'Update your password',
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      icon: 'card-account-details',
      title: 'Medical History',
      subtitle: 'Manage your medical records',
      onPress: () => Alert.alert('Coming Soon', 'Medical history feature will be available soon'),
    },
    {
      icon: 'account-group',
      title: 'Emergency Contact',
      subtitle: 'Update emergency contact details',
      onPress: () => Alert.alert('Coming Soon', 'Emergency contact feature will be available soon'),
    },
    {
      icon: 'bell-outline',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      onPress: () => Alert.alert('Coming Soon', 'Help & support will be available soon'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {profile?.profileImage ? (
            <View style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {profile?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.name}>{profile?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>

        {profile?.phone && (
          <View style={styles.phoneContainer}>
            <Icon name="phone" size={16} color={COLORS.textSecondary} />
            <Text style={styles.phone}>{profile.phone}</Text>
          </View>
        )}
      </View>

      {/* Profile Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Account Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since:</Text>
          <Text style={styles.infoValue}>
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>

        {profile?.address && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{profile.address}</Text>
          </View>
        )}

        {profile?.gender && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoValue}>
              {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
            </Text>
          </View>
        )}

        {profile?.dateOfBirth && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of Birth:</Text>
            <Text style={styles.infoValue}>
              {new Date(profile.dateOfBirth).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}>
            <View style={styles.menuIconContainer}>
              <Icon name={item.icon} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}>
        <Icon name="logout" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>Version 1.0.0</Text>

      <View style={{ height: SPACING.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  header: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.borderLight,
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  name: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  phone: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  infoCardTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  infoRow: {
    marginBottom: SPACING.md,
  },
  infoLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: SIZES.body,
    color: COLORS.text,
    lineHeight: 22,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    borderRadius: SIZES.radius,
    gap: SPACING.sm,
    ...SHADOWS.small,
  },
  logoutText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.error,
  },
  versionText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});

export default ProfileScreen;
