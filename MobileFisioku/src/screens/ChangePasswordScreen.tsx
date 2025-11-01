import React, { useState } from 'react';
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
import { COLORS, SIZES, SPACING } from '../constants/theme';
import { patientService } from '../services/patientService';
import Input from '../components/Input';
import Button from '../components/Button';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
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
      const response = await patientService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        Alert.alert(
          'Success',
          'Password changed successfully. Please login again.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to change password');
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
          <View style={styles.infoBox}>
            <Icon name="information" size={24} color={COLORS.info} />
            <Text style={styles.infoText}>
              Make sure your new password is strong and unique. You'll need to login again after
              changing your password.
            </Text>
          </View>

          <Input
            label="Current Password"
            placeholder="Enter current password"
            value={formData.currentPassword}
            onChangeText={value => handleChange('currentPassword', value)}
            error={errors.currentPassword}
            secureTextEntry={!showPasswords.current}
            leftIcon={<Icon name="lock" size={20} color={COLORS.textSecondary} />}
            rightIcon={
              <TouchableOpacity onPress={() => togglePasswordVisibility('current')}>
                <Icon
                  name={showPasswords.current ? 'eye-off' : 'eye'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            }
          />

          <Input
            label="New Password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChangeText={value => handleChange('newPassword', value)}
            error={errors.newPassword}
            secureTextEntry={!showPasswords.new}
            leftIcon={<Icon name="lock-outline" size={20} color={COLORS.textSecondary} />}
            rightIcon={
              <TouchableOpacity onPress={() => togglePasswordVisibility('new')}>
                <Icon
                  name={showPasswords.new ? 'eye-off' : 'eye'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            }
          />

          <Input
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChangeText={value => handleChange('confirmPassword', value)}
            error={errors.confirmPassword}
            secureTextEntry={!showPasswords.confirm}
            leftIcon={<Icon name="lock-check" size={20} color={COLORS.textSecondary} />}
            rightIcon={
              <TouchableOpacity onPress={() => togglePasswordVisibility('confirm')}>
                <Icon
                  name={showPasswords.confirm ? 'eye-off' : 'eye'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            }
          />

          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <View style={styles.requirementRow}>
              <Icon
                name={formData.newPassword.length >= 6 ? 'check-circle' : 'circle-outline'}
                size={16}
                color={formData.newPassword.length >= 6 ? COLORS.success : COLORS.textLight}
              />
              <Text style={styles.requirementText}>At least 6 characters</Text>
            </View>
            <View style={styles.requirementRow}>
              <Icon
                name={
                  formData.newPassword && formData.newPassword === formData.confirmPassword
                    ? 'check-circle'
                    : 'circle-outline'
                }
                size={16}
                color={
                  formData.newPassword && formData.newPassword === formData.confirmPassword
                    ? COLORS.success
                    : COLORS.textLight
                }
              />
              <Text style={styles.requirementText}>Passwords match</Text>
            </View>
          </View>

          <Button
            title="Change Password"
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
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.lg,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.info,
    marginLeft: SPACING.sm,
    lineHeight: 20,
  },
  passwordRequirements: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
  },
  requirementsTitle: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  requirementText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
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

export default ChangePasswordScreen;
