import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register } from '../store/slices/authSlice';
import { COLORS, SIZES, SPACING, FONTS } from '../constants/theme';
import Button from '../components/Button';
import Input from '../components/Input';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else if (!/^[0-9]{10,13}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    try {
      const result = await dispatch(
        register({
          email: formData.email,
          password: formData.password,
          role: 'PATIENT',
          name: formData.name,
          phone: formData.phone,
        })
      ).unwrap();

      if (result) {
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.replace('MainTabs'),
          },
        ]);
      }
    } catch (err: any) {
      Alert.alert('Registration Failed', err || 'Failed to create account');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={value => handleChange('name', value)}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={value => handleChange('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChangeText={value => handleChange('phone', value)}
            placeholder="08xxxxxxxxxx"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={value => handleChange('password', value)}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={value => handleChange('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title="Register"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Button
              title="Login"
              onPress={() => navigation.goBack()}
              variant="outline"
              size="small"
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  header: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  form: {
    flex: 1,
  },
  registerButton: {
    marginTop: SPACING.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  loginText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  loginButton: {
    paddingHorizontal: 0,
    minWidth: 80,
  },
});

export default RegisterScreen;
