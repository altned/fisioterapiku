# Fisioku - Project Context & Architecture

## Project Overview
Fisioku adalah aplikasi fisioterapi yang terdiri dari 3 komponen utama untuk memberikan solusi lengkap dalam manajemen fisioterapi.

## Architecture Overview

```
fisioterapiku/
├── mobile-fisioku/          # Mobile app untuk pasien
├── web-admin/              # Web dashboard untuk admin
├── backend/                # API server
├── README.md               # Dokumentasi utama
└── PROJECT_CONTEXT.md      # File ini - konteks proyek
```

## Component Details

### 1. Mobile Fisioku Apps (`mobile-fisioku/`)
**Target Users:** Pasien fisioterapi
**Platform:** React Native
**Key Features:**
- User registration & authentication
- Appointment booking
- Therapy session tracking
- Progress monitoring
- Payment integration
- Push notifications
- Chat with therapist

**Tech Stack:**
- React Native 0.72+
- TypeScript
- React Navigation 6
- Redux Toolkit
- React Query
- NativeBase UI
- React Native Paper

### 2. Web Fisioku Admin (`web-admin/`)
**Target Users:** Admin, Terapis, Manajer
**Platform:** Next.js
**Key Features:**
- Dashboard analytics
- Patient management
- Therapist management
- Appointment scheduling
- Session tracking
- Financial reports
- User management

**Tech Stack:**
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Zustand state management
- React Query
- Recharts for analytics

### 3. Backend (`backend/`)
**Purpose:** API server untuk semua aplikasi
**Platform:** Node.js
**Key Features:**
- RESTful API
- Authentication & Authorization
- Database management
- File upload handling
- Payment processing
- Real-time notifications
- Email services

**Tech Stack:**
- Node.js 18+
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT authentication
- Multer for file uploads
- Socket.io for real-time
- Nodemailer

## Database Schema

### Core Tables
1. **users** - Semua user (patients, therapists, admins)
2. **appointments** - Jadwal konsultasi/terapi
3. **therapy_sessions** - Sesi terapi yang dilakukan
4. **progress_tracking** - Tracking progress pasien
5. **payments** - Data pembayaran
6. **notifications** - Notifikasi sistem
7. **files** - File upload (dokumen, foto)

## API Architecture

### Authentication Flow
1. User login → JWT token
2. Token validation pada setiap request
3. Role-based access control
4. Refresh token mechanism

### Data Flow
1. Mobile app → Backend API
2. Web admin → Backend API  
3. Backend → Database
4. Real-time updates via WebSocket

## Development Guidelines

### Code Standards
- TypeScript untuk semua komponen
- ESLint + Prettier untuk formatting
- Conventional commits
- Unit testing dengan Jest
- E2E testing dengan Cypress

### Git Workflow
- Main branch untuk production
- Develop branch untuk development
- Feature branches untuk fitur baru
- Pull request reviews wajib

### Environment Setup
- Development: Local development
- Staging: Testing environment
- Production: Live environment

## Security Considerations
- HTTPS untuk semua komunikasi
- JWT token expiration
- Input validation & sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

## Performance Optimization
- Database indexing
- API response caching
- Image optimization
- Code splitting
- Lazy loading
- CDN untuk static assets

## Monitoring & Analytics
- Error tracking (Sentry)
- User analytics
- Performance monitoring
- Database monitoring
- API response times

## Patient Flow Overview

### Mobile App User Journey
1. **App Launch** → Splash Screen
2. **Onboarding** → 3 screens explaining app benefits
3. **Authentication** → Login/Register
4. **Dashboard** → List of therapists (card view)
5. **Therapist Profile** → Detailed info + booking button
6. **Booking Form** → Patient details + complaint info
7. **Schedule Selection** → Date/time based on availability
8. **Booking Submission** → Wait for therapist confirmation
9. **Payment Process** → Bank transfer or QRIS
10. **Therapy Session** → Real-time chat + progress tracking
11. **Post-Therapy** → Review + feedback exchange

### Key Features by Component

#### Mobile App Features
- **Onboarding**: 3-screen introduction
- **Therapist Discovery**: Card-based listing with filters
- **Booking System**: Multi-step form with availability check
- **Payment Integration**: Bank transfer + QRIS support
- **Real-time Communication**: Chat with therapist
- **Progress Tracking**: Session documentation
- **Review System**: Post-therapy feedback

#### Web Admin Features
- **Payment Verification**: Manual proof verification
- **Booking Management**: Approve/reject bookings
- **User Management**: Patient and therapist accounts
- **Analytics Dashboard**: Usage and revenue metrics
- **Content Management**: App content and settings

#### Backend Features
- **Availability Management**: Therapist schedule system
- **Payment Processing**: Integration with payment gateways
- **Real-time Notifications**: Push notifications
- **File Management**: Secure document storage
- **Chat System**: Real-time messaging

## Future Enhancements
- AI-powered therapy recommendations
- Video call integration
- Wearable device integration
- Multi-language support
- Offline mode untuk mobile app

## Team Communication
- Daily standups
- Weekly sprint planning
- Code review sessions
- Architecture discussions
- Documentation updates
