# 📋 Informed Consent Feature - Documentation

**Date:** November 1, 2025  
**Feature Type:** Legal & Compliance  
**Priority:** High (Legal Protection)  
**Status:** 🟢 Active Development

---

## 🎯 OVERVIEW

### Purpose
Implement **Informed Consent** system to protect physiotherapists from legal liability by ensuring patients explicitly agree to treatment terms, risks, and procedures before each therapy session.

### Key Benefits
- ✅ Legal protection for therapists
- ✅ Clear patient understanding of procedures
- ✅ Audit trail for disputes
- ✅ Professional compliance with healthcare standards
- ✅ Version control for consent text updates

---

## 📊 BUSINESS REQUIREMENTS

### Consent Frequency
**Per Booking** - Consent required for every new booking

**Rationale:**
- Each therapy session may have different procedures
- Risk profile may change over time
- Maximum legal protection
- Best practice in healthcare

### Consent Content (Indonesian)
The consent covers:
1. ✅ Agreement for physical examination
2. ✅ Understanding of therapy procedures
3. ✅ Acknowledgment of potential risks
4. ✅ Medical data usage consent
5. ✅ Right to refuse/cancel treatment
6. ✅ Emergency contact authorization

### Legal Requirements
- **Timestamp:** When consent was agreed
- **IP Address:** For audit trail
- **Device Info:** Additional verification
- **Version Control:** Track consent text changes
- **Immutable Record:** Cannot be modified after agreement

---

## 🗄️ DATABASE SCHEMA

### New Model: Consent

```prisma
model Consent {
  id                String    @id @default(uuid())
  bookingId         String    @unique
  patientId         String
  consentVersion    String    // e.g., "1.0", "1.1" 
  consentText       String    @db.Text
  isAgreed          Boolean   @default(false)
  agreedAt          DateTime?
  ipAddress         String?
  deviceInfo        String?
  
  // Key consent points (individual checkboxes)
  agreeExamination  Boolean   @default(false)
  agreeProcedure    Boolean   @default(false)
  agreeRisks        Boolean   @default(false)
  agreeDataUsage    Boolean   @default(false)
  agreeEmergency    Boolean   @default(false)
  
  // Relations
  booking           Booking   @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  patient           Patient   @relation(fields: [patientId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("consents")
  @@index([patientId])
  @@index([bookingId])
}
```

### Updated Model: Booking

```prisma
model Booking {
  // ... existing fields ...
  
  // New field
  consent           Consent?
  hasConsent        Boolean   @default(false)
  
  // ... rest of fields ...
}
```

---

## 📱 USER FLOW

### Booking Flow with Consent

```
1. Dashboard
   ↓
2. Select Therapist
   ↓
3. Therapist Detail
   ↓
4. Booking Form (complaint, medical history)
   ↓
5. Schedule Selection (date, time)
   ↓
6. 📋 INFORMED CONSENT (NEW) ←
   ↓
7. Booking Confirmation (review all details)
   ↓
8. Submit Booking
   ↓
9. Success → My Bookings
```

### Consent Screen Flow

```
┌─────────────────────────────────────────┐
│     INFORMED CONSENT SCREEN             │
├─────────────────────────────────────────┤
│                                         │
│  [Header] Persetujuan Tindakan Terapi  │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ [SCROLLABLE FULL TEXT]            │ │
│  │                                   │ │
│  │ Saya yang bertanda tangan...      │ │
│  │ dengan ini menyatakan...          │ │
│  │ ... (full consent text) ...       │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ☑️ KEY CONSENT POINTS (5 checkboxes)  │
│                                         │
│  [ ] Saya setuju untuk pemeriksaan    │
│      fisik oleh terapis               │
│                                         │
│  [ ] Saya memahami prosedur terapi    │
│      yang akan dilakukan              │
│                                         │
│  [ ] Saya memahami risiko yang        │
│      mungkin terjadi                  │
│                                         │
│  [ ] Saya setuju data medis saya      │
│      digunakan untuk terapi           │
│                                         │
│  [ ] Saya memberikan izin kontak      │
│      darurat jika diperlukan          │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ PATIENT INFO (Read-only)          │ │
│  │ Nama: Budi Santoso                │ │
│  │ Tanggal: 1 Nov 2025, 14:30       │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [AGREE & CONTINUE] (disabled until   │
│   all checked + scrolled to bottom)   │
│                                         │
│  [CANCEL]                              │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### Backend Components

#### 1. Database Migration
```bash
# File: prisma/migrations/xxx_add_consent_model/migration.sql
# Creates consent table and updates booking table
```

#### 2. Prisma Schema Update
```typescript
// File: backend/prisma/schema.prisma
// Add Consent model and update Booking model
```

#### 3. Consent Service
```typescript
// File: backend/src/services/consent.service.ts

class ConsentService {
  // Create consent record
  createConsent(data: CreateConsentData): Promise<Consent>
  
  // Get consent by booking ID
  getConsentByBookingId(bookingId: string): Promise<Consent | null>
  
  // Get consent text (current version)
  getCurrentConsentText(): Promise<string>
  
  // Agree to consent
  agreeConsent(consentId: string, ipAddress: string, deviceInfo: string): Promise<Consent>
  
  // Validate all checkboxes agreed
  validateConsent(consent: Consent): boolean
}
```

#### 4. Consent Controller
```typescript
// File: backend/src/controllers/consent.controller.ts

class ConsentController {
  // POST /api/consents - Create consent
  // GET /api/consents/booking/:bookingId - Get consent
  // GET /api/consents/text - Get current consent text
  // POST /api/consents/:id/agree - Agree to consent
}
```

#### 5. Consent Routes
```typescript
// File: backend/src/routes/consent.routes.ts
router.post('/', authenticate, authorize('PATIENT'), ConsentController.create);
router.get('/booking/:bookingId', authenticate, ConsentController.getByBookingId);
router.get('/text', ConsentController.getText);
router.post('/:id/agree', authenticate, authorize('PATIENT'), ConsentController.agree);
```

#### 6. Updated Booking Validation
```typescript
// File: backend/src/services/booking.service.ts
// Validate consent exists and is agreed before confirming booking
```

---

### Mobile Components

#### 1. Consent Screen
```typescript
// File: MobileFisioku/src/screens/ConsentScreen.tsx

interface ConsentScreenProps {
  navigation: NavigationProp;
  route: {
    params: {
      bookingData: BookingData;
    };
  };
}

// Features:
// - Display full consent text (scrollable)
// - 5 checkboxes for key points
// - Track scroll position (must reach bottom)
// - Auto-fill patient name & date
// - Disabled button until all agreed
// - Submit consent to backend
// - Navigate to confirmation
```

#### 2. Updated Navigation
```typescript
// File: MobileFisioku/src/navigation/AppNavigator.tsx
// Add ConsentScreen between ScheduleSelection and BookingConfirmation
<Stack.Screen name="Consent" component={ConsentScreen} />
```

#### 3. Consent Service
```typescript
// File: MobileFisioku/src/services/consentService.ts

export const consentService = {
  getConsentText(): Promise<ApiResponse<string>>
  createConsent(bookingData): Promise<ApiResponse<Consent>>
  agreeConsent(consentId, checkboxes): Promise<ApiResponse<Consent>>
}
```

#### 4. Consent Types
```typescript
// File: MobileFisioku/src/types/index.ts

export interface Consent {
  id: string;
  bookingId: string;
  patientId: string;
  consentVersion: string;
  consentText: string;
  isAgreed: boolean;
  agreedAt?: string;
  agreeExamination: boolean;
  agreeProcedure: boolean;
  agreeRisks: boolean;
  agreeDataUsage: boolean;
  agreeEmergency: boolean;
}

export interface ConsentCheckboxes {
  examination: boolean;
  procedure: boolean;
  risks: boolean;
  dataUsage: boolean;
  emergency: boolean;
}
```

---

## 📝 CONSENT TEXT

### Version 1.0 (Indonesian)

```
PERSETUJUAN TINDAKAN FISIOTERAPI
(Informed Consent for Physiotherapy)

Saya yang bertanda tangan di bawah ini:

Nama: [Auto-filled from profile]
Tanggal: [Current date & time]

Dengan ini menyatakan bahwa:

1. PEMERIKSAAN FISIK
   Saya memberikan persetujuan kepada terapis untuk melakukan pemeriksaan fisik yang diperlukan untuk menentukan kondisi kesehatan saya dan merencanakan program terapi yang sesuai.

2. PROSEDUR TERAPI
   Saya telah mendapatkan penjelasan yang cukup mengenai:
   - Tujuan dari tindakan fisioterapi yang akan dilakukan
   - Prosedur dan metode terapi yang akan digunakan
   - Manfaat yang diharapkan dari terapi
   - Durasi dan frekuensi terapi yang direkomendasikan

3. RISIKO DAN KOMPLIKASI
   Saya memahami bahwa setiap tindakan medis memiliki risiko, termasuk namun tidak terbatas pada:
   - Rasa tidak nyaman atau nyeri sementara
   - Kelelahan setelah sesi terapi
   - Kemungkinan reaksi alergi terhadap alat atau bahan yang digunakan
   - Dalam kasus yang jarang terjadi, peningkatan gejala sementara
   
   Saya memahami bahwa terapis akan melakukan yang terbaik untuk meminimalkan risiko tersebut.

4. PENGGUNAAN DATA MEDIS
   Saya memberikan izin kepada terapis untuk:
   - Mengumpulkan dan menyimpan data riwayat kesehatan saya
   - Menggunakan informasi medis saya untuk keperluan terapi
   - Mendokumentasikan kemajuan terapi saya
   - Menjaga kerahasiaan data medis saya sesuai dengan peraturan yang berlaku

5. HAK PASIEN
   Saya memahami bahwa saya memiliki hak untuk:
   - Mendapatkan informasi lengkap tentang kondisi dan terapi saya
   - Menolak atau menghentikan terapi kapan saja
   - Mendapatkan second opinion dari profesional kesehatan lain
   - Mengajukan pertanyaan tentang terapi yang diberikan

6. KONTAK DARURAT
   Saya memberikan izin kepada terapis untuk menghubungi kontak darurat saya jika terjadi situasi yang memerlukan perhatian medis mendesak selama atau setelah sesi terapi.

7. PERNYATAAN KESEHATAN
   Saya menyatakan telah memberikan informasi yang lengkap dan benar mengenai:
   - Riwayat kesehatan saya
   - Alergi yang saya miliki (jika ada)
   - Obat-obatan yang sedang saya konsumsi
   - Kondisi medis lain yang relevan

Saya telah membaca, memahami, dan menyetujui seluruh isi persetujuan ini. Saya memberikan persetujuan ini dengan penuh kesadaran dan tanpa paksaan dari pihak manapun.

---

Version: 1.0
Effective Date: November 1, 2025
Last Updated: November 1, 2025
```

---

## 🔐 SECURITY & COMPLIANCE

### Data Protection
- **Encryption:** All consent data encrypted at rest
- **Access Control:** Only patient and assigned therapist can view
- **Immutability:** Once agreed, cannot be modified
- **Audit Trail:** All access logged

### Legal Compliance
- **Timestamp:** ISO 8601 format with timezone
- **IP Address:** IPv4/IPv6 captured
- **Device Info:** User-agent string
- **Version Control:** Semantic versioning for consent text
- **Retention:** Stored permanently for legal protection

### Privacy
- **Consent required** before any data usage
- **Right to access** consent history
- **Clear language** in patient's native language
- **No hidden clauses** - all terms explicit

---

## 🧪 TESTING REQUIREMENTS

### Unit Tests
- ✅ Consent creation
- ✅ Validation logic (all checkboxes)
- ✅ Version comparison
- ✅ Agreement timestamp
- ✅ IP address capture

### Integration Tests
- ✅ Booking flow with consent
- ✅ Consent retrieval
- ✅ Consent agreement API
- ✅ Backend validation

### Manual Testing
- ✅ Complete booking flow
- ✅ Scroll to bottom detection
- ✅ Checkbox validation
- ✅ Cancel at consent screen
- ✅ Back button handling
- ✅ Network error scenarios

---

## 📊 SUCCESS METRICS

### Functional
- ✅ 100% bookings have valid consent
- ✅ Zero bookings without consent
- ✅ Consent data integrity maintained

### Legal
- ✅ Complete audit trail
- ✅ Version tracking operational
- ✅ Timestamp accuracy

### User Experience
- ✅ Clear, understandable language
- ✅ Smooth flow integration
- ✅ No confusion from users

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Deployment
- [ ] Database migration tested
- [ ] Consent text reviewed by legal (if available)
- [ ] All tests passing
- [ ] Backend API deployed
- [ ] Mobile app updated

### After Deployment
- [ ] Monitor consent agreement rate
- [ ] Check for errors in logs
- [ ] Verify audit trail working
- [ ] User feedback collection

---

## 📅 IMPLEMENTATION TIMELINE

### Phase 1: Backend (3-4 hours)
- ✅ Database schema update
- ✅ Migration creation
- ✅ Service layer
- ✅ Controller & routes
- ✅ Validation logic

### Phase 2: Mobile (4-5 hours)
- ✅ ConsentScreen component
- ✅ Navigation update
- ✅ Service integration
- ✅ UI/UX polish

### Phase 3: Testing (2 hours)
- ✅ Backend tests
- ✅ Mobile flow tests
- ✅ Manual QA

**Total Estimated Time:** 9-11 hours

---

## 🔄 FUTURE ENHANCEMENTS

### Phase 2 (Optional)
- [ ] Digital signature canvas
- [ ] PDF export of consent
- [ ] Email consent copy to patient
- [ ] Multi-language support (English)
- [ ] Consent template customization per therapist

### Phase 3 (Advanced)
- [ ] OCR for handwritten consent (if needed)
- [ ] Biometric authentication
- [ ] Blockchain-based consent tracking
- [ ] AI-powered risk assessment

---

## 📖 RELATED DOCUMENTATION

- `PROJECT_CONTEXT.md` - Overall project architecture
- `PRIORITY_1_COMPLETE.md` - Mobile MVP completion
- `PATIENT_FLOW.md` - User journey (to be updated)
- `backend/prisma/schema.prisma` - Database schema
- `MobileFisioku/src/screens/ConsentScreen.tsx` - Implementation

---

## 🤝 STAKEHOLDER SIGN-OFF

### Requirements Confirmed By:
- [ ] Product Owner
- [ ] Legal Team (if applicable)
- [ ] Development Team Lead
- [ ] QA Team

### Approved For Development:
- Date: November 1, 2025
- Version: 1.0
- Status: ✅ APPROVED

---

**Document Version:** 1.0  
**Last Updated:** November 1, 2025  
**Next Review:** After implementation completion

---

## 📞 QUESTIONS OR CONCERNS?

For any questions regarding this feature:
- Technical: Development Team
- Legal: Legal Advisor
- Content: Medical Professional
- UX: Design Team
