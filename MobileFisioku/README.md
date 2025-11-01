# Fisioku Mobile App

Mobile application untuk pasien Fisioku - Platform Fisioterapi di Rumah.

## Tech Stack

- **Framework**: React Native 0.82
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit
- **API Client**: Axios
- **UI Components**: React Native Paper
- **Icons**: React Native Vector Icons
- **Storage**: AsyncStorage

## Project Structure

```
MobileFisioku/
├── android/                    # Android native code
├── ios/                        # iOS native code
├── src/
│   ├── assets/                 # Images, fonts, etc
│   ├── components/             # Reusable components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── constants/              # App constants
│   │   ├── config.ts           # API & app config
│   │   └── theme.ts            # Colors, fonts, sizes
│   ├── navigation/             # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/                # App screens
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── DashboardScreen.tsx
│   ├── services/               # API services
│   │   ├── api.ts              # Axios instance
│   │   ├── authService.ts
│   │   └── therapistService.ts
│   ├── store/                  # Redux store
│   │   ├── index.ts            # Store config
│   │   ├── hooks.ts            # Typed hooks
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       └── therapistSlice.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   └── utils/                  # Utility functions
├── App.tsx                     # Root component
├── package.json
└── tsconfig.json
```

## Features Implemented

### ✅ Authentication
- Login screen
- Register screen
- JWT token management
- Auto-login with saved tokens

### ✅ Onboarding
- 3-screen onboarding flow
- Skip functionality
- One-time display

### ✅ Dashboard
- Therapist list with cards
- Rating & availability display
- Pull-to-refresh
- Empty state handling

### ✅ Navigation
- Stack navigator for auth flow
- Bottom tabs for main app
- Navigation guards

### ✅ State Management
- Redux Toolkit setup
- Auth slice
- Therapist slice
- Typed hooks

### ✅ API Integration
- Axios HTTP client
- Request/response interceptors
- Automatic token injection
- Error handling

## Setup Instructions

### Prerequisites

- Node.js 18 atau lebih baru
- React Native development environment
- Android Studio (untuk Android)
- Xcode (untuk iOS - Mac only)

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Backend URL**

Edit `src/constants/config.ts`:
```typescript
export const API_URL = 'http://YOUR_BACKEND_IP:5000/api';
```

**Catatan:**
- Untuk Android Emulator: gunakan `http://10.0.2.2:5000/api`
- Untuk iOS Simulator: gunakan `http://localhost:5000/api`
- Untuk Physical Device: gunakan IP lokal computer (e.g., `http://192.168.1.100:5000/api`)

3. **iOS Setup (Mac only)**
```bash
cd ios
pod install
cd ..
```

### Running the App

**Start Metro Bundler:**
```bash
npm start
```

**Run on Android:**
```bash
npm run android
```

**Run on iOS (Mac only):**
```bash
npm run ios
```

## Available Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run lint       # Run ESLint
npm test           # Run tests
```

## App Flow

### First Time User Journey
1. **Splash Screen** (2 seconds)
2. **Onboarding** (3 screens with skip option)
3. **Login/Register**
4. **Dashboard** (Main app)

### Returning User Journey
1. **Splash Screen**
2. **Dashboard** (Auto-login if token exists)

## Screens Overview

### 1. Splash Screen
- App logo
- Loading indicator
- Auto-navigation based on state

### 2. Onboarding (3 Screens)
- **Screen 1**: Terapi di Rumah 🏠
- **Screen 2**: Fisioterapis Berpengalaman 👨‍⚕️
- **Screen 3**: Booking Mudah & Aman 📱

Features:
- Horizontal swipe
- Dot indicators
- Skip button
- Get Started button

### 3. Login Screen
- Email input
- Password input
- Validation
- Error handling
- Link to Register

### 4. Register Screen
- Full Name
- Email
- Phone Number
- Password
- Confirm Password
- Validation
- Link to Login

### 5. Dashboard Screen
- Welcome message with user name
- Therapist cards with:
  - Profile image/placeholder
  - Name & bidang terapi
  - Rating & review count
  - Location
  - Price per session
  - Availability status
- Pull-to-refresh
- Loading states

### 6. Bottom Tabs
- **Home**: Dashboard with therapist list
- **My Bookings**: Booking history (placeholder)
- **Profile**: User profile (placeholder)

## API Integration

### Endpoints Used

**Authentication:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

**Therapists:**
- `GET /therapists` - Get all therapists

### Request/Response Format

**Login Request:**
```json
{
  "email": "patient@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "email": "patient@example.com",
      "role": "PATIENT",
      "profile": {
        "name": "John Doe",
        "phone": "081234567890"
      }
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token"
  }
}
```

## State Management

### Redux Slices

**Auth Slice:**
- `user`: User data
- `profile`: Patient profile
- `isAuthenticated`: Auth status
- `isLoading`: Loading state
- `error`: Error message

**Actions:**
- `login(credentials)` - Login user
- `register(data)` - Register user
- `logout()` - Logout user
- `checkAuth()` - Check auth status

**Therapist Slice:**
- `therapists`: Array of therapists
- `selectedTherapist`: Selected therapist detail
- `isLoading`: Loading state
- `error`: Error message

**Actions:**
- `fetchTherapists()` - Get all therapists
- `fetchTherapistById(id)` - Get therapist detail

## Styling & Theme

### Colors
- **Primary**: #4A90E2 (Blue)
- **Secondary**: #50C878 (Green)
- **Accent**: #FF6B6B (Red)
- **Success**: #28A745
- **Error**: #DC3545

### Fonts
- **H1**: 32px, Bold
- **H2**: 24px, Bold
- **H3**: 20px, SemiBold
- **Body**: 14px, Regular
- **Small**: 12px, Regular

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

## Components

### Button
```tsx
<Button
  title="Login"
  onPress={handleLogin}
  variant="primary" // primary | secondary | outline
  size="medium" // small | medium | large
  loading={isLoading}
  disabled={false}
/>
```

### Input
```tsx
<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  error={errors.email}
  keyboardType="email-address"
/>
```

## Storage Keys

- `@fisioku:accessToken` - JWT access token
- `@fisioku:refreshToken` - JWT refresh token
- `@fisioku:user` - User data
- `@fisioku:onboardingDone` - Onboarding completed flag

## Error Handling

### API Errors
- Network errors
- 401 Unauthorized (auto-logout)
- Validation errors
- Server errors

### User Feedback
- Alert dialogs for critical errors
- Inline validation errors
- Loading states
- Empty states

## Development Tips

### Hot Reload
- Shake device/emulator for developer menu
- Press `R` to reload
- Enable Fast Refresh

### Debugging
```bash
# Open React Native Debugger
# In app: Shake device -> Debug

# View logs
npx react-native log-android
npx react-native log-ios
```

### Common Issues

**Metro Bundler Issues:**
```bash
npm start -- --reset-cache
```

**Android Build Issues:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**iOS Build Issues:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

**Network Request Failed:**
- Check backend URL in `config.ts`
- Ensure backend server is running
- Check network permissions in Android/iOS

## Next Steps / Future Features

### Booking Flow
- [ ] Therapist detail screen
- [ ] Booking form
- [ ] Schedule selection
- [ ] Booking confirmation

### Payment
- [ ] Payment method selection
- [ ] Upload payment proof
- [ ] Payment status tracking

### Profile
- [ ] View/edit profile
- [ ] Change password
- [ ] Logout

### Bookings
- [ ] Booking list
- [ ] Booking detail
- [ ] Cancel booking
- [ ] Booking status updates

### Real-time
- [ ] Socket.IO integration
- [ ] Real-time chat
- [ ] Push notifications

### Additional Features
- [ ] Search therapists
- [ ] Filter therapists
- [ ] Reviews & ratings
- [ ] Medical history management
- [ ] Emergency contact

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# Setup Detox first
npm run e2e:build
npm run e2e:test
```

## Build for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### iOS
```bash
# Open Xcode
open ios/MobileFisioku.xcworkspace

# Select "Generic iOS Device"
# Product -> Archive
```

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

ISC

## Contact

For issues and questions, contact the development team.
