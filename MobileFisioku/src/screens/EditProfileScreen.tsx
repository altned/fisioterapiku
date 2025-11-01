import React, { useState, useEffect } from 'react';
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
import { COLORS, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setProfile } from '../store/slices/authSlice';
import { patientService } from '../services/patientService';
import Input from '../components/Input';
import Button from '../components/Button';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    medicalHistory: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        address: profile.address || '',
        medicalHistory: profile.medicalHistory || '',
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await patientService.updateProfile(formData);
      
      if (response.success && response.data) {
        dispatch(setProfile(response.data));
        Alert.alert('Success', 'Profile updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', response.message || 'Failed to update profile');
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={value => handleChange('name', value)}
            error={errors.name}
            leftIcon={<Icon name="account" size={20} color={COLORS.textSecondary} />}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={value => handleChange('phone', value)}
            error={errors.phone}
            keyboardType="phone-pad"
            leftIcon={<Icon name="phone" size={20} color={COLORS.textSecondary} />}
          />

          <Input
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChangeText={value => handleChange('dateOfBirth', value)}
            leftIcon={<Icon name="calendar" size={20} color={COLORS.textSecondary} />}
          />

          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>Gender</Text>
            <View style={styles.genderButtons}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'male' && styles.genderButtonActive,
                ]}
                onPress={() => handleChange('gender', 'male')}>
                <Icon
                  name="human-male"
                  size={24}
                  color={formData.gender === 'male' ? COLORS.white : COLORS.textSecondary}
                />
                <Text
                  style={[
                    styles.genderButtonText,
                    formData.gender === 'male' && styles.genderButtonTextActive,
                  ]}>
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'female' && styles.genderButtonActive,
                ]}
                onPress={() => handleChange('gender', 'female')}>
                <Icon
                  name="human-female"
                  size={24}
                  color={formData.gender === 'female' ? COLORS.white : COLORS.textSecondary}
                />
                <Text
                  style={[
                    styles.genderButtonText,
                    formData.gender === 'female' && styles.genderButtonTextActive,
                  ]}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Input
            label="Address"
            placeholder="Enter your address"
            value={formData.address}
            onChangeText={value => handleChange('address', value)}
            multiline
            numberOfLines={3}
            leftIcon={<Icon name="map-marker" size={20} color={COLORS.textSecondary} />}
          />

          <Input
            label="Medical History (Optional)"
            placeholder="Any medical conditions or allergies"
            value={formData.medicalHistory}
            onChangeText={value => handleChange('medicalHistory', value)}
            multiline
            numberOfLines={4}
            leftIcon={<Icon name="file-document" size={20} color={COLORS.textSecondary} />}
          />

          <Button
            title="Save Changes"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          />

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={isLoading}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
  form: {
    padding: SPACING.md,
  },
  genderContainer: {
    marginBottom: SPACING.md,
  },
  genderLabel: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
    ...SHADOWS.small,
  },
  genderButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderButtonText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
    fontWeight: '600',
  },
  genderButtonTextActive: {
    color: COLORS.white,
  },
  cancelButton: {
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  cancelButtonText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
