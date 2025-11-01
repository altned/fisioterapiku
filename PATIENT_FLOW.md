# Fisioku - Patient Flow Documentation

## Overview
Dokumentasi lengkap flow aplikasi Fisioku dari perspektif pasien, mulai dari onboarding hingga completion therapy.

## Mobile App Flow - Patient Journey

### 1. App Launch & Onboarding
```
Splash Screen → Onboarding (3 screens) → Login/Register
```

**Screens:**
- **Splash Screen**: Logo Fisioku dengan loading
- **Onboarding Screen 1**: Keunggulan aplikasi - "Terapi di rumah"
- **Onboarding Screen 2**: Keunggulan aplikasi - "Fisioterapis berpengalaman" 
- **Onboarding Screen 3**: Keunggulan aplikasi - "Booking mudah & aman"
- **Login/Register Screen**: Form login atau registrasi pasien

### 2. Dashboard & Therapist Discovery
```
Login Success → Dashboard → Therapist List → Therapist Profile
```

**Dashboard Features:**
- List fisioterapis dalam bentuk card
- Setiap card berisi:
  - Foto fisioterapis
  - Nama & spesialisasi
  - Rating & review
  - Lokasi kerja
  - Harga per sesi

**Therapist Profile Screen:**
- Detail lengkap fisioterapis
- Spesialisasi & pengalaman
- Review & rating dari pasien lain
- Jadwal availability
- Button "Book Appointment"

### 3. Booking Process
```
Book Appointment → Booking Form → Schedule Selection → Submit Booking
```

**Booking Form Fields:**
- Keluhan/gejala pasien
- Riwayat medis (opsional)
- Alamat rumah pasien
- Kontak darurat
- Catatan khusus untuk fisioterapis

**Schedule Selection:**
- Pilih tanggal (calendar view)
- Pilih jam (berdasarkan availability fisioterapis)
- Konfirmasi lokasi terapi (rumah pasien)

**Booking Status:**
- "Menunggu Konfirmasi" - setelah submit booking
- "Dikonfirmasi" - setelah fisioterapis approve
- "Menunggu Pembayaran" - setelah konfirmasi
- "Sudah Dibayar" - setelah pembayaran verified
- "Sedang Berlangsung" - saat terapi
- "Selesai" - setelah terapi selesai

### 4. Payment Process
```
Booking Approved → Payment Screen → Payment Method → Upload Proof
```

**Payment Methods:**
- Transfer Bank (BCA, Mandiri, BNI, BRI)
- QRIS (QR Code)

**Payment Flow:**
1. Pilih metode pembayaran
2. Dapatkan instruksi pembayaran
3. Lakukan pembayaran
4. Upload bukti transfer
5. Tunggu verifikasi admin
6. Status berubah menjadi "Sudah Dibayar"

### 5. Therapy Session
```
Payment Verified → Therapy Session → Session Completion
```

**During Therapy:**
- Real-time chat dengan fisioterapis
- Photo documentation (jika diperlukan)
- Progress tracking
- Session notes

### 6. Post-Therapy
```
Session Complete → Review Form → Feedback Exchange
```

**Patient Actions:**
- Isi review & rating untuk fisioterapis
- Feedback tentang sesi terapi
- Rekomendasi untuk sesi berikutnya

**Therapist Actions:**
- Catatan terapi untuk pasien
- Rangkuman hasil terapi
- Rekomendasi follow-up
- Exercise plan (jika diperlukan)

## Screen Definitions

### Core Screens
1. **SplashScreen** - App launch screen
2. **OnboardingScreen** - 3 screens onboarding
3. **LoginScreen** - User authentication
4. **RegisterScreen** - New user registration
5. **DashboardScreen** - Main dashboard with therapist list
6. **TherapistProfileScreen** - Individual therapist details
7. **BookingFormScreen** - Appointment booking form
8. **ScheduleSelectionScreen** - Date & time selection
9. **PaymentScreen** - Payment method selection
10. **PaymentProofScreen** - Upload payment proof
11. **BookingStatusScreen** - Track booking status
12. **ChatScreen** - Real-time chat with therapist
13. **ReviewScreen** - Post-therapy review form
14. **ProfileScreen** - Patient profile management

### Supporting Screens
- **NotificationScreen** - Push notifications
- **HistoryScreen** - Past appointments
- **SettingsScreen** - App settings
- **HelpScreen** - Customer support
- **AboutScreen** - App information

## Data Models

### Patient
```typescript
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  medicalHistory?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking
```typescript
interface Booking {
  id: string;
  patientId: string;
  therapistId: string;
  appointmentDate: Date;
  appointmentTime: string;
  location: string;
  complaint: string;
  medicalHistory?: string;
  status: 'pending' | 'confirmed' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'verified';
  paymentProof?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Therapist
```typescript
interface Therapist {
  id: string;
  name: string;
  bidang: string[]; // Bidang terapi fisioterapi
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  pricePerSession: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  bio: string;
  qualifications: string[];
  profileImage: string;
}
```

## API Endpoints Required

### Authentication
- POST /api/auth/patient/login
- POST /api/auth/patient/register
- POST /api/auth/patient/refresh

### Patient Management
- GET /api/patients/profile
- PUT /api/patients/profile
- GET /api/patients/bookings
- GET /api/patients/bookings/:id

### Therapist Discovery
- GET /api/therapists
- GET /api/therapists/:id
- GET /api/therapists/search

### Booking Management
- POST /api/bookings
- GET /api/bookings/:id
- PUT /api/bookings/:id
- DELETE /api/bookings/:id

### Payment
- POST /api/payments/initiate
- POST /api/payments/verify
- POST /api/payments/proof

### Communication
- GET /api/chat/:bookingId
- POST /api/chat/:bookingId/message
- GET /api/notifications

## User Experience Considerations

### Performance
- Lazy loading untuk therapist list
- Image optimization untuk profile photos
- Offline support untuk basic features
- Push notifications untuk status updates

### Security
- JWT token authentication
- Secure payment processing
- Data encryption
- Privacy protection

### Accessibility
- Voice-over support
- High contrast mode
- Large text options
- Easy navigation

## Future Enhancements
- Video call integration
- Wearable device sync
- AI-powered recommendations
- Multi-language support
- Offline mode
- Family member access

