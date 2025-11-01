# 📚 FisiOku - Dokumentasi Lengkap (Berdasarkan Implementasi Aktual)

> **Last Updated**: November 1, 2025  
> **Version**: 1.0  
> **Status**: Production Ready

---

## 📋 Daftar Isi

1. [Ringkasan Proyek](#ringkasan-proyek)
2. [Teknologi Stack](#teknologi-stack)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Mobile App Features](#mobile-app-features)
6. [User Flows](#user-flows)
7. [Testing Guide](#testing-guide)

---

## 🎯 Ringkasan Proyek

**FisiOku** adalah platform mobile-first untuk menghubungkan pasien dengan terapis fisioterapi di Indonesia. Sistem ini memfasilitasi booking appointment, pembayaran online, dan informed consent digital.

### Target Users
- **Pasien**: Mencari terapis, booking appointment, upload bukti pembayaran
- **Terapis**: Menerima booking, mengatur jadwal availability, memberikan layanan
- **Admin**: Verifikasi pembayaran, monitoring sistem

### Fitur Utama yang Sudah Diimplementasi
✅ Autentikasi & Registrasi (Patient only)  
✅ Dashboard Terapis dengan filter  
✅ Booking Appointment  
✅ Informed Consent Digital  
✅ Payment Upload & Verification  
✅ Booking Management  
✅ Profile Management  

---

## 💻 Teknologi Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (Access Token + Refresh Token)
- **Validation**: express-validator
- **Password**: bcryptjs

### Frontend (Mobile)
- **Framework**: React Native (CLI)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **UI Components**: React Native Vector Icons
- **API Client**: Axios
- **Storage**: AsyncStorage

### DevOps
- **Database**: Docker PostgreSQL
- **Development**: Nodemon, ts-node
- **Build**: TypeScript Compiler

---

## 🗄️ Database Schema

### 11 Models (Prisma Schema)

#### 1. **User** - Akun pengguna
```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  role          UserRole  @default(PATIENT) // PATIENT | THERAPIST | ADMIN
  isActive      Boolean   @default(true)
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  patient       Patient?
  therapist     Therapist?
  notifications Notification[]
  sentMessages  Message[]
}
```

#### 2. **Patient** - Profil pasien
```prisma
model Patient {
  id               String    @id @default(uuid())
  userId           String    @unique
  name             String
  phone            String
  dateOfBirth      DateTime?
  gender           String?   // "male" | "female" | "other"
  address          String?
  medicalHistory   String?
  emergencyContact Json?     // {name, phone, relationship}
  profileImage     String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  
  user             User      @relation(...)
  bookings         Booking[]
  reviews          Review[]
  consents         Consent[]
}
```

#### 3. **Therapist** - Profil terapis
```prisma
model Therapist {
  id              String    @id @default(uuid())
  userId          String    @unique
  name            String
  phone           String
  bidang          String[]  // Array bidang terapi (e.g., ["Fisioterapi Muskuloskeletal", "Fisioterapi Olahraga"])
  experience      Int       @default(0)
  rating          Float     @default(0)
  reviewCount     Int       @default(0)
  location        String?
  pricePerSession Int       @default(0)
  bio             String?
  qualifications  String[]  // Array pendidikan & sertifikasi
  profileImage    String?
  isAvailable     Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  user            User      @relation(...)
  availability    Availability[]
  bookings        Booking[]
  reviews         Review[]
}
```

#### 4. **Availability** - Jadwal terapis
```prisma
model Availability {
  id          String    @id @default(uuid())
  therapistId String
  dayOfWeek   Int       // 0=Sunday, 1=Monday, ..., 6=Saturday
  startTime   String    // Format: "09:00"
  endTime     String    // Format: "17:00"
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  therapist   Therapist @relation(...)
}
```

#### 5. **Booking** - Appointment booking
```prisma
model Booking {
  id              String        @id @default(uuid())
  patientId       String
  therapistId     String
  appointmentDate DateTime
  appointmentTime String        // Format: "10:00"
  location        String        // Alamat terapi
  complaint       String        // Keluhan pasien
  medicalHistory  String?
  status          BookingStatus @default(PENDING)
  notes           String?
  hasConsent      Boolean       @default(false)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  patient         Patient       @relation(...)
  therapist       Therapist     @relation(...)
  payment         Payment?
  session         Session?
  messages        Message[]
  consent         Consent?
}

// BookingStatus enum
enum BookingStatus {
  PENDING          // Menunggu konfirmasi terapis
  CONFIRMED        // Dikonfirmasi terapis
  PAYMENT_PENDING  // Menunggu upload bukti bayar
  PAID             // Sudah bayar (menunggu verifikasi)
  IN_PROGRESS      // Sedang berlangsung
  COMPLETED        // Selesai
  CANCELLED        // Dibatalkan
}
```

#### 6. **Payment** - Pembayaran
```prisma
model Payment {
  id           String        @id @default(uuid())
  bookingId    String        @unique
  amount       Int           // Dalam Rupiah
  method       PaymentMethod // BANK_TRANSFER | QRIS
  status       PaymentStatus @default(PENDING)
  paymentProof String?       // URL/path bukti transfer
  verifiedAt   DateTime?
  verifiedBy   String?       // Admin user ID
  notes        String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  
  booking      Booking       @relation(...)
}

// PaymentStatus enum
enum PaymentStatus {
  PENDING   // Belum upload bukti
  PAID      // Sudah upload bukti (menunggu verifikasi)
  VERIFIED  // Terverifikasi oleh admin
  FAILED    // Ditolak/gagal
}

// PaymentMethod enum
enum PaymentMethod {
  BANK_TRANSFER
  QRIS
}
```

#### 7. **Consent** - Informed consent
```prisma
model Consent {
  id                String    @id @default(uuid())
  bookingId         String    @unique
  patientId         String
  consentVersion    String    @default("1.0")
  consentText       String    @db.Text
  isAgreed          Boolean   @default(false)
  agreedAt          DateTime?
  ipAddress         String?
  deviceInfo        String?
  
  // 5 Checkbox persetujuan
  agreeExamination  Boolean   @default(false)
  agreeProcedure    Boolean   @default(false)
  agreeRisks        Boolean   @default(false)
  agreeDataUsage    Boolean   @default(false)
  agreeEmergency    Boolean   @default(false)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  booking           Booking   @relation(...)
  patient           Patient   @relation(...)
}
```

#### 8. **Session** - Dokumentasi terapi
```prisma
model Session {
  id             String    @id @default(uuid())
  bookingId      String    @unique
  startTime      DateTime?
  endTime        DateTime?
  duration       Int?      // Dalam menit
  therapistNotes String?   // Catatan terapis
  progressReport String?
  exercisePlan   String?
  documents      String[]  // Array URL dokumen
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  
  booking        Booking   @relation(...)
}
```

#### 9. **Review** - Rating & review
```prisma
model Review {
  id          String    @id @default(uuid())
  patientId   String
  therapistId String
  rating      Int       // 1-5
  comment     String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  patient     Patient   @relation(...)
  therapist   Therapist @relation(...)
}
```

#### 10. **Message** - Chat messages
```prisma
model Message {
  id          String    @id @default(uuid())
  bookingId   String
  senderId    String    // User ID (Patient atau Therapist)
  content     String
  attachments String[]  // Array URL file
  isRead      Boolean   @default(false)
  createdAt   DateTime  @default(now())
  
  booking     Booking   @relation(...)
  sender      User      @relation(...)
}
```

#### 11. **Notification** - Push notifications
```prisma
model Notification {
  id        String    @id @default(uuid())
  userId    String
  title     String
  message   String
  type      String    // "BOOKING" | "PAYMENT" | "SYSTEM"
  isRead    Boolean   @default(false)
  data      Json?     // Metadata tambahan
  createdAt DateTime  @default(now())
  
  user      User      @relation(...)
}
```

### Relationship Diagram
```
User (1) ←→ (1) Patient
User (1) ←→ (1) Therapist
User (1) → (N) Notification
User (1) → (N) Message

Patient (1) → (N) Booking
Patient (1) → (N) Review
Patient (1) → (N) Consent

Therapist (1) → (N) Availability
Therapist (1) → (N) Booking
Therapist (1) → (N) Review

Booking (1) ←→ (1) Payment
Booking (1) ←→ (1) Session
Booking (1) ←→ (1) Consent
Booking (1) → (N) Message
```

---

## 🔌 API Endpoints

### Base URL
```
Development: http://localhost:5000/api
```

### Authentication Endpoints

#### POST `/auth/register`
Register patient baru
```json
// Request Body
{
  "email": "patient@example.com",
  "password": "password123",
  "role": "PATIENT",
  "name": "John Doe",
  "phone": "081234567890"
}

// Response
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "patient@example.com",
      "role": "PATIENT",
      "profile": {
        "id": "uuid",
        "name": "John Doe",
        "phone": "081234567890"
      }
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### POST `/auth/login`
Login user
```json
// Request Body
{
  "email": "patient@example.com",
  "password": "password123"
}

// Response - sama dengan register
```

#### POST `/auth/refresh`
Refresh access token
```json
// Request Body
{
  "refreshToken": "jwt_refresh_token"
}

// Response
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

#### GET `/auth/profile`
Get profile user yang login  
🔒 **Requires**: Authentication

```json
// Response
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "patient@example.com",
    "role": "PATIENT",
    "profile": {
      "id": "uuid",
      "name": "John Doe",
      "phone": "081234567890",
      "address": "...",
      "dateOfBirth": "1990-01-01T00:00:00.000Z",
      "gender": "male"
    }
  }
}
```

---

### Therapist Endpoints

#### GET `/therapists`
Get list semua terapis (dengan filter & pagination)

**Query Parameters**:
- `specialization` (optional): Filter by bidang terapi
- `location` (optional): Filter by lokasi
- `minRating` (optional): Filter rating minimum
- `isAvailable` (optional): "true" | "false"
- `page` (default: 1)
- `limit` (default: 10)

```json
// Response
{
  "success": true,
  "message": "Therapists retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Dr. Sarah Johnson, S.Ft, Physio",
      "phone": "081234560001",
      "bidang": [
        "Fisioterapi Muskuloskeletal",
        "Fisioterapi Olahraga"
      ],
      "experience": 8,
      "rating": 4.8,
      "reviewCount": 127,
      "location": "Jakarta Selatan",
      "pricePerSession": 250000,
      "bio": "...",
      "qualifications": [
        "S1 Fisioterapi - Universitas Indonesia",
        "Pelatihan Fisioterapi Olahraga"
      ],
      "profileImage": null,
      "isAvailable": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 6,
    "totalPages": 1
  }
}
```

#### GET `/therapists/:id`
Get detail terapis by ID

```json
// Response - sama seperti list, tapi single object + availability
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Dr. Sarah Johnson",
    "bidang": [...],
    "availability": [
      {
        "id": "uuid",
        "dayOfWeek": 1, // Monday
        "startTime": "09:00",
        "endTime": "17:00",
        "isActive": true
      }
    ],
    "reviews": [...]
  }
}
```

#### GET `/therapists/:id/availability`
Get jadwal availability terapis

#### PUT `/therapists/:id`
Update profil terapis  
🔒 **Requires**: Authentication + Role THERAPIST/ADMIN

#### POST `/therapists/:id/availability`
Set availability terapis  
🔒 **Requires**: Authentication + Role THERAPIST/ADMIN

---

### Patient Endpoints

#### GET `/patients/profile`
Get profil patient yang login  
🔒 **Requires**: Authentication + Role PATIENT

#### PUT `/patients/profile`
Update profil patient  
🔒 **Requires**: Authentication + Role PATIENT

```json
// Request Body
{
  "name": "John Doe",
  "phone": "081234567890",
  "address": "Jl. Sudirman No. 123",
  "dateOfBirth": "1990-01-01",
  "gender": "male"
}
```

#### GET `/patients/bookings`
Get list bookings milik patient  
🔒 **Requires**: Authentication + Role PATIENT

#### GET `/patients/bookings/:id`
Get detail booking by ID  
🔒 **Requires**: Authentication + Role PATIENT

---

### Booking Endpoints

#### POST `/bookings`
Create booking baru  
🔒 **Requires**: Authentication + Role PATIENT

```json
// Request Body
{
  "patientId": "patient_uuid",
  "therapistId": "therapist_uuid",
  "appointmentDate": "2025-11-05",
  "appointmentTime": "10:00",
  "location": "Jl. Sudirman No. 123, Jakarta",
  "complaint": "Nyeri punggung bawah setelah olahraga",
  "medicalHistory": "Pernah cedera punggung 2 tahun lalu"
}

// Response
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "booking_uuid",
    "status": "PENDING",
    ...
  }
}
```

#### GET `/bookings/my-bookings`
Get list bookings user yang login  
🔒 **Requires**: Authentication

```json
// Response
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "appointmentDate": "2025-11-05T00:00:00.000Z",
      "appointmentTime": "10:00",
      "location": "...",
      "complaint": "...",
      "status": "CONFIRMED",
      "therapist": {
        "id": "uuid",
        "name": "Dr. Sarah Johnson",
        "bidang": [...],
        "pricePerSession": 250000
      },
      "payment": {
        "id": "uuid",
        "amount": 250000,
        "method": "BANK_TRANSFER",
        "status": "PENDING"
      }
    }
  ]
}
```

#### GET `/bookings/:id`
Get detail booking by ID  
🔒 **Requires**: Authentication

#### PUT `/bookings/:id/status`
Update status booking  
🔒 **Requires**: Authentication + Role THERAPIST/ADMIN

```json
// Request Body
{
  "status": "CONFIRMED" // atau status lain dari enum
}
```

#### PUT `/bookings/:id/cancel`
Cancel booking  
🔒 **Requires**: Authentication

---

### Payment Endpoints

#### POST `/payments/upload-proof`
Upload bukti pembayaran  
🔒 **Requires**: Authentication + Role PATIENT

```json
// Request Body
{
  "bookingId": "booking_uuid",
  "paymentProof": "base64_image_or_url",
  "method": "BANK_TRANSFER" // atau "QRIS"
}

// Response
{
  "success": true,
  "message": "Payment proof uploaded successfully",
  "data": {
    "id": "payment_uuid",
    "bookingId": "booking_uuid",
    "amount": 250000,
    "method": "BANK_TRANSFER",
    "status": "PAID",
    "paymentProof": "url_to_image"
  }
}
```

#### POST `/payments/:id/verify`
Verifikasi pembayaran  
🔒 **Requires**: Authentication + Role ADMIN

#### POST `/payments/:id/reject`
Reject pembayaran  
🔒 **Requires**: Authentication + Role ADMIN

```json
// Request Body
{
  "notes": "Bukti transfer tidak valid"
}
```

#### GET `/payments/booking/:bookingId`
Get payment by booking ID  
🔒 **Requires**: Authentication

#### GET `/payments/pending`
Get list pending payments  
🔒 **Requires**: Authentication + Role ADMIN

---

### Consent Endpoints

#### POST `/consents`
Create consent untuk booking  
🔒 **Requires**: Authentication + Role PATIENT

```json
// Request Body
{
  "bookingId": "booking_uuid"
}

// Response
{
  "success": true,
  "data": {
    "id": "consent_uuid",
    "bookingId": "booking_uuid",
    "consentVersion": "1.0",
    "consentText": "Long consent text...",
    "isAgreed": false,
    "agreeExamination": false,
    "agreeProcedure": false,
    "agreeRisks": false,
    "agreeDataUsage": false,
    "agreeEmergency": false
  }
}
```

#### GET `/consents/text`
Get consent text (public)

```json
// Response
{
  "success": true,
  "data": {
    "version": "1.0",
    "text": "INFORMED CONSENT..."
  }
}
```

#### GET `/consents/booking/:bookingId`
Get consent by booking ID  
🔒 **Requires**: Authentication

#### POST `/consents/:id/agree`
Setuju dengan consent  
🔒 **Requires**: Authentication + Role PATIENT

```json
// Request Body
{
  "agreeExamination": true,
  "agreeProcedure": true,
  "agreeRisks": true,
  "agreeDataUsage": true,
  "agreeEmergency": true
}

// Response
{
  "success": true,
  "message": "Consent agreed successfully",
  "data": {
    "id": "consent_uuid",
    "isAgreed": true,
    "agreedAt": "2025-11-01T10:00:00.000Z"
  }
}
```

#### GET `/consents/validate/:bookingId`
Validasi apakah booking sudah punya consent yang di-agree  
🔒 **Requires**: Authentication

```json
// Response
{
  "success": true,
  "data": {
    "isValid": true,
    "hasConsent": true,
    "isAgreed": true
  }
}
```

#### GET `/consents/patient/:patientId`
Get consent history patient  
🔒 **Requires**: Authentication

---

## 📱 Mobile App Features

### Struktur Navigasi

```
App Navigator (Stack)
├── Splash Screen
├── Onboarding Screen
├── Login Screen
├── Register Screen
├── Main Tabs (Bottom Tab Navigator)
│   ├── Dashboard (Home)
│   ├── Bookings (My Bookings)
│   └── Profile
├── Therapist Detail Screen
├── Booking Form Screen
├── Schedule Selection Screen
├── Consent Screen
├── Booking Confirmation Screen
├── Booking Detail Screen
├── Payment Upload Screen
├── Edit Profile Screen
└── Change Password Screen
```

### Screens Detail

#### 1. **Splash Screen**
- Loading animation
- Auto-navigate ke Onboarding atau Main Tabs (jika sudah login)

#### 2. **Onboarding Screen**
- 3 slides penjelasan aplikasi
- "Get Started" button → Navigate to Login

#### 3. **Login Screen**
- Email & Password input
- Login button → Call `/auth/login`
- "Don't have account? Register" link
- Form validation

#### 4. **Register Screen**
- Email, Password, Name, Phone input
- Register button → Call `/auth/register`
- Role default: PATIENT
- Auto login after register

#### 5. **Dashboard Screen** (Home Tab)
**Features**:
- Welcome message dengan nama patient
- List therapist cards (pull-to-refresh)
- Each card shows:
  - Profile image/placeholder
  - Name
  - Bidang terapi (joined dengan ", ")
  - Rating & review count
  - Location
  - Price per session
  - Availability badge (Available/Busy)
- Tap card → Navigate to Therapist Detail

**Data Source**: `GET /therapists`

#### 6. **Therapist Detail Screen**
**Features**:
- Header:
  - Large profile image
  - Name
  - Rating & review count
  - Experience (years)
  - Location
  - Price per session
  - Availability badge
- Sections:
  - **Bidang Terapi**: Tags/chips
  - **About**: Bio text
  - **Qualifications**: List with checkmarks
  - **Reviews**: Placeholder (belum implemented)
- Footer:
  - "Book Appointment" button (jika available)
  - Button disabled jika not available

**Navigation**: Tap "Book Appointment" → Booking Form Screen

#### 7. **Booking Form Screen**
**Features**:
- Therapist info card (read-only)
- Form inputs:
  - Location (text input) - alamat terapi
  - Complaint (multiline text) - keluhan
  - Medical History (multiline text, optional)
- "Next" button → Schedule Selection Screen

**State**: Store form data di Redux/local state

#### 8. **Schedule Selection Screen**
**Features**:
- Calendar picker (appointmentDate)
- Time slots selection (appointmentTime)
- Selected data preview
- "Next" button → Consent Screen

**Data Source**: `GET /therapists/:id/availability`

#### 9. **Consent Screen**
**Features**:
- Scrollable consent text
- 5 Checkboxes:
  - ☑️ Pemeriksaan Fisioterapi
  - ☑️ Prosedur Terapi
  - ☑️ Risiko & Komplikasi
  - ☑️ Penggunaan Data
  - ☑️ Penanganan Darurat
- All checkboxes must be checked
- "Agree & Continue" button → Booking Confirmation Screen

**Data Source**: `GET /consents/text`

#### 10. **Booking Confirmation Screen**
**Features**:
- Summary semua data booking:
  - Therapist info
  - Date & time
  - Location
  - Complaint
  - Medical history
  - Total amount
- "Confirm Booking" button → Create booking

**Actions**:
1. Call `POST /bookings` → Create booking
2. Call `POST /consents` → Create consent
3. Call `POST /consents/:id/agree` → Agree consent
4. Navigate to Booking Detail Screen
5. Show success message

#### 11. **My Bookings Screen** (Bookings Tab)
**Features**:
- List booking cards (pull-to-refresh)
- Each card shows:
  - Therapist name & bidang terapi pertama
  - Status badge (color-coded)
  - Date & time
  - Location
  - Payment status (jika ada)
- Empty state: "No Bookings Yet"
- Tap card → Booking Detail Screen

**Data Source**: `GET /bookings/my-bookings`

**Status Colors**:
- PENDING: Orange
- CONFIRMED: Green
- PAYMENT_PENDING: Blue
- PAID: Green
- IN_PROGRESS: Primary color
- COMPLETED: Gray
- CANCELLED: Red

#### 12. **Booking Detail Screen**
**Features**:
- Header:
  - Status badge (large)
  - Booking ID (short)
- Sections:
  - **Therapist Info**:
    - Avatar
    - Name
    - Bidang terapi
    - Rating
  - **Appointment Details**:
    - Date (formatted)
    - Time
    - Location
    - Complaint
    - Medical history
  - **Payment Info** (jika ada):
    - Amount
    - Method
    - Status
    - Payment proof image (jika sudah upload)
- Action Buttons:
  - "Upload Payment Proof" (jika status CONFIRMED atau PAYMENT_PENDING & belum ada payment)
  - "Cancel Booking" (jika status PENDING, CONFIRMED, atau PAYMENT_PENDING)

**Data Source**: `GET /bookings/:id`

#### 13. **Payment Upload Screen**
**Features**:
- Booking summary (read-only)
- Payment method selection (BANK_TRANSFER atau QRIS)
- Image picker untuk bukti transfer
- Upload button

**Actions**:
- Call `POST /payments/upload-proof`
- Show success message
- Navigate back to Booking Detail

#### 14. **Profile Screen** (Profile Tab)
**Features**:
- Profile header:
  - Avatar (or initial placeholder)
  - Name
  - Email
- Menu items:
  - Edit Profile → Edit Profile Screen
  - Change Password → Change Password Screen
  - Logout (with confirmation)
- App version info

**Data Source**: `GET /auth/profile`

#### 15. **Edit Profile Screen**
**Features**:
- Form inputs:
  - Name
  - Phone
  - Date of Birth (date picker)
  - Gender (picker: Male/Female/Other)
  - Address (multiline)
- "Save Changes" button

**Actions**:
- Call `PUT /patients/profile`
- Show success message
- Navigate back

#### 16. **Change Password Screen**
**Features**:
- Current password input
- New password input
- Confirm new password input
- "Change Password" button
- Password strength indicator

**Note**: Endpoint belum implemented di backend

---

## 🔄 User Flows

### Flow 1: Register & Login Patient

```
1. Launch App
2. Splash Screen (2 detik)
3. Onboarding Screen (first time only)
4. Tap "Get Started"
5. Login Screen
6. Tap "Register"
7. Register Screen
   - Input: email, password, name, phone
   - Tap "Register"
   - API: POST /auth/register
8. Auto Login → Navigate to Main Tabs (Dashboard)
```

### Flow 2: Browse & Book Therapist

```
1. Dashboard Screen
2. Browse therapist cards
3. Tap therapist card
4. Therapist Detail Screen
   - View bidang terapi, bio, qualifications
   - Tap "Book Appointment"
5. Booking Form Screen
   - Input: location, complaint, medical history
   - Tap "Next"
6. Schedule Selection Screen
   - Pick date dari calendar
   - Pick time dari available slots
   - Tap "Next"
7. Consent Screen
   - Read consent text
   - Check all 5 checkboxes
   - Tap "Agree & Continue"
8. Booking Confirmation Screen
   - Review all data
   - Tap "Confirm Booking"
   - API Calls:
     a. POST /bookings
     b. POST /consents
     c. POST /consents/:id/agree
9. Navigate to Booking Detail Screen
10. See booking dengan status "PENDING"
```

### Flow 3: Upload Payment Proof

```
1. My Bookings Screen
2. Tap booking card dengan status "PAYMENT_PENDING"
3. Booking Detail Screen
4. Tap "Upload Payment Proof"
5. Payment Upload Screen
   - Select payment method
   - Pick image dari gallery/camera
   - Tap "Upload"
   - API: POST /payments/upload-proof
6. Success message
7. Back to Booking Detail
8. See payment info dengan status "PAID"
```

### Flow 4: View Booking History

```
1. Tap "Bookings" tab (bottom navigation)
2. My Bookings Screen
   - View all bookings (sorted by date descending)
   - See status badges
3. Tap booking card
4. Booking Detail Screen
   - View complete booking info
   - View payment info (jika ada)
```

### Flow 5: Update Profile

```
1. Tap "Profile" tab (bottom navigation)
2. Profile Screen
3. Tap "Edit Profile"
4. Edit Profile Screen
   - Update: name, phone, address, DOB, gender
   - Tap "Save Changes"
   - API: PUT /patients/profile
5. Success message
6. Back to Profile Screen
```

### Flow 6: Cancel Booking

```
1. My Bookings Screen atau Booking Detail Screen
2. Tap "Cancel Booking"
3. Confirmation dialog
4. Tap "Yes, Cancel"
   - API: PUT /bookings/:id/cancel
5. Success message
6. Booking status berubah menjadi "CANCELLED"
```

---

## 🧪 Testing Guide

### Prerequisites
1. ✅ Backend running di `http://localhost:5000`
2. ✅ PostgreSQL database running (via Docker)
3. ✅ Database sudah di-seed dengan data dummy
4. ✅ Mobile app installed di emulator/device

### Test Accounts (dari Seed)

#### Patient Accounts (3)
```
1. Email: patient1@example.com
   Password: password123
   Name: Budi Santoso

2. Email: patient2@example.com
   Password: password123
   Name: Siti Nurhaliza

3. Email: patient3@example.com
   Password: password123
   Name: Ahmad Wijaya
```

#### Therapist Accounts (6)
```
1. Email: therapist1@fisioku.com
   Password: password123
   Name: Dr. Sarah Johnson, S.Ft, Physio
   Bidang: Fisioterapi Muskuloskeletal, Fisioterapi Olahraga

2. Email: therapist2@fisioku.com
   Password: password123
   Name: Dr. Michael Chen, S.Ft
   Bidang: Fisioterapi Neuromuskular, Fisioterapi Geriatrik

3. Email: therapist3@fisioku.com
   Password: password123
   Name: Dr. Linda Wijaya, S.Ft, Physio
   Bidang: Fisioterapi Pediatrik

4. Email: therapist4@fisioku.com
   Password: password123
   Name: Dr. David Tan, S.Ft
   Bidang: Fisioterapi Muskuloskeletal

5. Email: therapist5@fisioku.com
   Password: password123
   Name: Dr. Maya Putri, S.Ft, Physio
   Bidang: Fisioterapi Obstetri dan Ginekologi

6. Email: therapist6@fisioku.com
   Password: password123
   Name: Dr. Ryan Pratama, S.Ft
   Bidang: Fisioterapi Kardiopulmoner
   Status: NOT AVAILABLE
```

#### Admin Account
```
Email: admin@fisioku.com
Password: password123
```

### Test Cases

#### TC-001: Register Patient Baru
1. Launch app → Onboarding → Login → Register
2. Input data:
   - Email: `newpatient@test.com`
   - Password: `test123456`
   - Name: `Test Patient`
   - Phone: `081234567899`
3. Tap Register
4. ✅ Verify: Auto login → Navigate ke Dashboard
5. ✅ Verify: Welcome message "Hello, Test Patient!"

#### TC-002: Login Patient Existing
1. Login screen
2. Input: `patient1@example.com` / `password123`
3. Tap Login
4. ✅ Verify: Navigate ke Dashboard
5. ✅ Verify: Welcome message "Hello, Budi Santoso!"

#### TC-003: Browse Therapist List
1. Dashboard screen
2. ✅ Verify: Menampilkan 6 therapist cards
3. ✅ Verify: Each card shows:
   - Name
   - Bidang terapi (e.g., "Fisioterapi Muskuloskeletal, Fisioterapi Olahraga")
   - Rating (e.g., "4.8 (127)")
   - Location
   - Price (e.g., "Rp 250.000/session")
   - Availability badge
4. ✅ Verify: Dr. Ryan Pratama shows "Busy" badge

#### TC-004: View Therapist Detail
1. Tap "Dr. Sarah Johnson" card
2. Therapist Detail screen
3. ✅ Verify: Menampilkan:
   - Profile image/placeholder
   - Name: "Dr. Sarah Johnson, S.Ft, Physio"
   - Rating: 4.8 (127 reviews)
   - Experience: 8 years
   - Location: Jakarta Selatan
   - Price: Rp 250.000
   - Bidang Terapi tags: "Fisioterapi Muskuloskeletal", "Fisioterapi Olahraga"
   - Bio text
   - Qualifications list
   - "Book Appointment" button (enabled)

#### TC-005: Create Booking (Complete Flow)
1. Dashboard → Tap therapist → Therapist Detail
2. Tap "Book Appointment"
3. **Booking Form**:
   - Location: "Jl. Sudirman No. 123, Jakarta Selatan"
   - Complaint: "Nyeri punggung bawah setelah olahraga"
   - Medical History: "Pernah cedera punggung 2 tahun lalu"
   - Tap "Next"
4. **Schedule Selection**:
   - Pick date: Tomorrow
   - Pick time: "10:00"
   - Tap "Next"
5. **Consent Screen**:
   - Scroll consent text
   - Check all 5 checkboxes
   - Tap "Agree & Continue"
6. **Booking Confirmation**:
   - Review data
   - Tap "Confirm Booking"
7. ✅ Verify: Success message muncul
8. ✅ Verify: Navigate ke Booking Detail
9. ✅ Verify: Status = "PENDING"

#### TC-006: View My Bookings
1. Tap "Bookings" tab
2. My Bookings screen
3. ✅ Verify: Menampilkan list bookings
4. ✅ Verify: Booking dari TC-005 muncul
5. ✅ Verify: Status badge = "PENDING" (orange)

#### TC-007: Upload Payment Proof
**Setup**: Terapis harus confirm booking dulu (manual via database/admin panel)

1. Update booking status ke "PAYMENT_PENDING" (via database)
2. My Bookings → Tap booking
3. Booking Detail → Tap "Upload Payment Proof"
4. Payment Upload screen:
   - Select method: "Bank Transfer"
   - Pick image dari gallery
   - Tap "Upload"
5. ✅ Verify: Success message
6. ✅ Verify: Back to Booking Detail
7. ✅ Verify: Payment info muncul dengan status "PAID"

#### TC-008: Edit Profile
1. Tap "Profile" tab
2. Tap "Edit Profile"
3. Update data:
   - Address: "Jl. Thamrin No. 456, Jakarta Pusat"
   - Date of Birth: Pick date
   - Gender: "Male"
4. Tap "Save Changes"
5. ✅ Verify: Success message
6. ✅ Verify: Profile data terupdate

#### TC-009: Cancel Booking
1. My Bookings → Tap booking dengan status "PENDING" atau "CONFIRMED"
2. Tap "Cancel Booking"
3. Confirmation dialog → Tap "Yes, Cancel"
4. ✅ Verify: Success message
5. ✅ Verify: Status berubah ke "CANCELLED"
6. ✅ Verify: Status badge = "CANCELLED" (red)

#### TC-010: Logout
1. Profile tab → Tap "Logout"
2. Confirmation dialog → Tap "Yes, Logout"
3. ✅ Verify: Navigate ke Login screen
4. ✅ Verify: Token cleared dari storage

---

## 🎨 UI/UX Notes

### Theme Colors (Actual Implementation)
```typescript
COLORS = {
  primary: '#2E86AB',        // Blue
  primaryLight: '#A8DADC',   // Light blue
  secondary: '#F4A261',      // Orange
  success: '#06D6A0',        // Green
  warning: '#F4A261',        // Orange
  error: '#E63946',          // Red
  info: '#457B9D',           // Blue gray
  
  white: '#FFFFFF',
  black: '#000000',
  text: '#1D3557',           // Dark blue
  textSecondary: '#457B9D',  // Blue gray
  textLight: '#A8DADC',      // Light blue
  
  background: '#F1FAEE',     // Off white
  backgroundSecondary: '#FFFFFF',
  borderLight: '#E8F1F2',
}
```

### Font Sizes
```typescript
SIZES = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 16,
  small: 14,
  tiny: 12,
  radius: 12,
}
```

### Component Patterns
- **Cards**: White background, border radius, shadow
- **Buttons**: Primary color, rounded, shadow
- **Input Fields**: Border, padding, clear validation
- **Status Badges**: Color-coded, rounded, with icon

---

## 🚀 Known Limitations & Future Enhancements

### Current Limitations
1. ❌ **No Search/Filter** di Dashboard (API sudah support, UI belum)
2. ❌ **No Reviews** display (schema ada, UI placeholder)
3. ❌ **No Chat/Messaging** (schema ada, belum implemented)
4. ❌ **No Push Notifications** (schema ada, belum implemented)
5. ❌ **No Session Documentation** (schema ada, belum implemented)
6. ❌ **No Admin Panel** (endpoints ada, no UI)
7. ❌ **No Image Upload** untuk profile picture (schema support, no implementation)
8. ❌ **No Change Password** functionality (UI ada, endpoint belum)
9. ❌ **Registration hanya untuk PATIENT** (THERAPIST harus manual)

### Recommended Enhancements
1. ✨ Add search & filter UI di Dashboard
2. ✨ Implement review system (submit & display)
3. ✨ Add real-time chat per booking
4. ✨ Implement push notifications (FCM)
5. ✨ Build admin panel (web-based)
6. ✨ Add image upload with storage (Cloudinary/S3)
7. ✨ Add forgot password flow
8. ✨ Add email verification
9. ✨ Add multi-language support (ID/EN)

---

## 📞 Support & Contact

Untuk pertanyaan atau issue terkait dokumentasi ini, silakan hubungi tim development.

---

**© 2025 FisiOku - Platform Fisioterapi Indonesia**
