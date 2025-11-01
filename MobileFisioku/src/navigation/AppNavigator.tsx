import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TherapistDetailScreen from '../screens/TherapistDetailScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import ScheduleSelectionScreen from '../screens/ScheduleSelectionScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';
import PaymentUploadScreen from '../screens/PaymentUploadScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ConsentScreen from '../screens/ConsentScreen';

import { COLORS, SIZES } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: SIZES.small,
          fontWeight: '600',
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: SIZES.h3,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={MyBookingsScreen}
        options={{
          title: 'My Bookings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-check" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="TherapistDetail"
          component={TherapistDetailScreen}
          options={{
            headerShown: true,
            title: 'Therapist Details',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="BookingForm"
          component={BookingFormScreen}
          options={{
            headerShown: true,
            title: 'Book Appointment',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="ScheduleSelection"
          component={ScheduleSelectionScreen}
          options={{
            headerShown: true,
            title: 'Select Schedule',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="Consent"
          component={ConsentScreen}
          options={{
            headerShown: true,
            title: 'Informed Consent',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
          options={{
            headerShown: true,
            title: 'Confirm Booking',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="BookingDetail"
          component={BookingDetailScreen}
          options={{
            headerShown: true,
            title: 'Booking Details',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="PaymentUpload"
          component={PaymentUploadScreen}
          options={{
            headerShown: true,
            title: 'Upload Payment',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: true,
            title: 'Edit Profile',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerShown: true,
            title: 'Change Password',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
