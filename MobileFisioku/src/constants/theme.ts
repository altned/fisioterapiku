export const COLORS = {
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  primaryLight: '#7AB3E8',
  
  secondary: '#50C878',
  secondaryDark: '#3EA05E',
  secondaryLight: '#7DD99A',
  
  accent: '#FF6B6B',
  
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundTertiary: '#E9ECEF',
  
  text: '#212529',
  textSecondary: '#6C757D',
  textLight: '#ADB5BD',
  
  border: '#DEE2E6',
  borderLight: '#F1F3F5',
  
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  white: '#FFFFFF',
  black: '#000000',
  
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 16,
  margin: 16,
  
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 14,
  small: 12,
  
  icon: 24,
  iconSmall: 16,
  iconLarge: 32,
  
  buttonHeight: 48,
  inputHeight: 48,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  
  h1: {
    fontSize: SIZES.h1,
    fontWeight: 'bold' as const,
  },
  h2: {
    fontSize: SIZES.h2,
    fontWeight: 'bold' as const,
  },
  h3: {
    fontSize: SIZES.h3,
    fontWeight: '600' as const,
  },
  h4: {
    fontSize: SIZES.h4,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: SIZES.body,
    fontWeight: 'normal' as const,
  },
  small: {
    fontSize: SIZES.small,
    fontWeight: 'normal' as const,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
};

const theme = {
  COLORS,
  SIZES,
  FONTS,
  SPACING,
  SHADOWS,
};

export default theme;
