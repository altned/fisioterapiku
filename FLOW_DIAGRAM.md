# Fisioku - Patient Flow Diagram

## Mobile App User Journey

```
┌─────────────────┐
│   App Launch    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Splash Screen  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Onboarding    │
│   (3 Screens)   │
│ 1. Terapi di    │
│    rumah        │
│ 2. Fisioterapis │
│    berpengalaman│
│ 3. Booking      │
│    mudah & aman │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Login/Register  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Dashboard     │
│ - List Fisioter │
│   (Card View)   │
│ - Spesialisasi  │
│ - Review        │
│ - Lokasi        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Therapist Profile│
│ - Detail Info   │
│ - Availability  │
│ - Reviews       │
│ - Book Button   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Booking Form    │
│ - Keluhan       │
│ - Riwayat Medis │
│ - Alamat Rumah  │
│ - Kontak Darurat│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Schedule Select │
│ - Pilih Tanggal │
│ - Pilih Jam     │
│ - Available/    │
│   Not Available │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Submit Booking  │
│ Status: Waiting │
│ Confirmation    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Therapist       │
│ Confirmation    │
│ (Accept/Reject) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Notification    │
│ "Booking        │
│ Approved"       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Payment Screen  │
│ - Transfer Bank │
│ - QRIS          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Upload Proof    │
│ - Bukti Transfer│
│ - Send to Admin │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Admin Verify    │
│ Payment         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Status Update   │
│ "Payment        │
│ Verified"       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Therapy Session │
│ - Real-time Chat│
│ - Progress Track│
│ - Documentation │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Session Complete│
│ - Patient Review │
│ - Therapist Notes│
│ - Summary        │
└─────────────────┘
```

## Booking Status Flow

```
┌─────────────────┐
│   Pending       │
│ (Menunggu       │
│  Konfirmasi)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Confirmed     │
│ (Dikonfirmasi)  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Payment Pending │
│ (Menunggu       │
│  Pembayaran)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Paid          │
│ (Sudah Dibayar) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  In Progress    │
│ (Sedang         │
│  Berlangsung)   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Completed     │
│ (Selesai)       │
└─────────────────┘
```

## Payment Methods Flow

```
┌─────────────────┐
│ Payment Screen  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Choose Method   │
│ ┌─────────────┐ │
│ │ Bank Transfer│ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │    QRIS     │ │
│ └─────────────┘ │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Payment         │
│ Instructions    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Make Payment   │
│ (External)     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Upload Proof    │
│ - Screenshot    │
│ - Receipt       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Admin Verify    │
│ (Manual)        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Status Update   │
│ "Payment        │
│ Verified"       │
└─────────────────┘
```

## Key Features by Screen

### Dashboard Screen
- **Therapist Cards**: Grid/list view
- **Search & Filter**: By specialization, location, rating
- **Quick Actions**: Book appointment, view history
- **Notifications**: Booking updates, reminders

### Booking Form Screen
- **Patient Info**: Pre-filled from profile
- **Complaint Details**: Free text + structured options
- **Medical History**: Optional, secure storage
- **Location**: Home address with map integration
- **Emergency Contact**: Required for safety

### Schedule Selection Screen
- **Calendar View**: Available dates highlighted
- **Time Slots**: Based on therapist availability
- **Duration**: Standard session length
- **Location Confirmation**: Home address verification

### Payment Screen
- **Method Selection**: Bank transfer vs QRIS
- **Amount Display**: Clear pricing breakdown
- **Instructions**: Step-by-step payment guide
- **Security**: Secure payment processing

### Therapy Session Screen
- **Real-time Chat**: With therapist
- **Progress Tracking**: Session milestones
- **Documentation**: Photo/video uploads
- **Timer**: Session duration tracking

### Review Screen
- **Rating System**: 1-5 stars
- **Review Text**: Detailed feedback
- **Recommendation**: For future sessions
- **Therapist Notes**: View therapist's summary



