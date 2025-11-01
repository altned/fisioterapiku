# FisiOku - Platform Fisioterapi Indonesia

> **📚 DOKUMENTASI LENGKAP**: Lihat [ACCURATE_DOCUMENTATION.md](./ACCURATE_DOCUMENTATION.md) untuk dokumentasi komprehensif berdasarkan implementasi aktual code.

---

# Fisioku - Aplikasi Fisioterapi

## Struktur Proyek

Proyek Fisioku terdiri dari 3 komponen utama:

### 1. Mobile App (`mobile-fisioku/`)
- Aplikasi mobile untuk pasien fisioterapi
- Platform: React Native / Flutter
- Fitur: Konsultasi, jadwal terapi, tracking progress

### 2. Web Admin (`web-admin/`)
- Dashboard admin untuk mengelola aplikasi
- Platform: React.js / Next.js
- Fitur: Manajemen pasien, terapis, jadwal, laporan

### 3. Backend (`backend/`)
- API server untuk semua aplikasi
- Platform: Node.js / Python / Java
- Fitur: Authentication, database, business logic

## Teknologi Stack

### Mobile App
- React Native dengan TypeScript
- Navigation: React Navigation
- State Management: Redux Toolkit
- UI Library: NativeBase / React Native Elements

### Web Admin
- Next.js dengan TypeScript
- UI Framework: Tailwind CSS + Shadcn/ui
- State Management: Zustand
- Charts: Recharts / Chart.js

### Backend
- Node.js dengan Express.js
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT
- File Upload: Multer + AWS S3

## Database Schema

### Core Entities
- Users (Patients, Therapists, Admins)
- Appointments
- Therapy Sessions
- Progress Tracking
- Payments

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/refresh
- POST /api/auth/logout

### Patients
- GET /api/patients
- GET /api/patients/:id
- PUT /api/patients/:id
- DELETE /api/patients/:id

### Appointments
- GET /api/appointments
- POST /api/appointments
- PUT /api/appointments/:id
- DELETE /api/appointments/:id

### Therapy Sessions
- GET /api/sessions
- POST /api/sessions
- PUT /api/sessions/:id

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- React Native CLI
- Android Studio / Xcode

### Installation
1. Clone repository
2. Install dependencies di setiap folder
3. Setup database
4. Configure environment variables
5. Run development servers

## Deployment

### Mobile App
- Android: Google Play Store
- iOS: Apple App Store

### Web Admin
- Vercel / Netlify

### Backend
- Railway / Heroku / AWS

## Team Structure

- Frontend Mobile Developer
- Frontend Web Developer  
- Backend Developer
- UI/UX Designer
- DevOps Engineer

## Project Timeline

- Phase 1: Backend API Development
- Phase 2: Mobile App Development
- Phase 3: Web Admin Development
- Phase 4: Integration & Testing
- Phase 5: Deployment & Launch

