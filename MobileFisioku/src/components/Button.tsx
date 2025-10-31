import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SIZES, SPACING, SHADOWS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...SHADOWS.small,
    };

    if (variant === 'primary') {
      baseStyle.backgroundColor = COLORS.primary;
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = COLORS.secondary;
    } else if (variant === 'outline') {
      baseStyle.backgroundColor = 'transparent';
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = COLORS.primary;
    }

    if (size === 'small') {
      baseStyle.height = 36;
      baseStyle.paddingHorizontal = SPACING.md;
    } else if (size === 'large') {
      baseStyle.height = 56;
      baseStyle.paddingHorizontal = SPACING.xl;
    }

    if (disabled) {
      baseStyle.backgroundColor = COLORS.backgroundTertiary;
      baseStyle.borderColor = COLORS.border;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...styles.buttonText,
    };

    if (variant === 'outline') {
      baseTextStyle.color = COLORS.primary;
    }

    if (size === 'small') {
      baseTextStyle.fontSize = SIZES.small;
    } else if (size === 'large') {
      baseTextStyle.fontSize = SIZES.h4;
    }

    if (disabled) {
      baseTextStyle.color = COLORS.textLight;
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  buttonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default Button;
