# Fisioku Backend API

Backend API server untuk aplikasi Fisioku - Platform Fisioterapi.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Real-time**: Socket.IO

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   ├── database.ts        # Prisma client config
│   │   └── env.ts             # Environment variables
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── booking.controller.ts
│   │   ├── patient.controller.ts
│   │   ├── payment.controller.ts
│   │   └── therapist.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── booking.routes.ts
│   │   ├── patient.routes.ts
│   │   ├── payment.routes.ts
│   │   └── therapist.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── booking.service.ts
│   │   ├── patient.service.ts
│   │   ├── payment.service.ts
│   │   └── therapist.service.ts
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── utils/
│   │   ├── jwt.ts             # JWT utilities
│   │   ├── password.ts        # Password hashing
│   │   └── response.ts        # API response helpers
│   └── index.ts               # Main server file
├── .env                        # Environment variables (create from .env.example)
├── .env.example               # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

### 1. Prerequisites

Pastikan sudah terinstall:
- Node.js 18 atau lebih baru
- PostgreSQL 14 atau lebih baru
- npm atau yarn

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

**a. Create PostgreSQL Database:**

```bash
# Login ke PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE fisioku_db;

# Exit psql
\q
```

**b. Configure Environment Variables:**

Copy `.env.example` ke `.env` dan sesuaikan:

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development

# Sesuaikan dengan kredensial PostgreSQL Anda
DATABASE_URL="postgresql://postgres:password@localhost:5432/fisioku_db?schema=public"

JWT_SECRET=fisioku-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=fisioku-super-secret-refresh-key-2024
JWT_REFRESH_EXPIRES_IN=30d

CORS_ORIGIN=http://localhost:3000

MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**c. Generate Prisma Client:**

```bash
npm run prisma:generate
```

**d. Run Database Migration:**

```bash
npm run prisma:push
```

Atau untuk production:
```bash
npm run prisma:migrate
```

**e. (Optional) Open Prisma Studio:**

```bash
npm run prisma:studio
```

### 4. Development

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Authentication (`/api/auth`)
```
POST /api/auth/register       # Register new user
POST /api/auth/login          # Login
POST /api/auth/refresh        # Refresh access token
GET  /api/auth/profile        # Get user profile
```

### Patients (`/api/patients`)
```
GET    /api/patients/profile         # Get current patient profile
PUT    /api/patients/profile         # Update patient profile
GET    /api/patients/bookings        # Get patient bookings
GET    /api/patients/bookings/:id    # Get booking by ID
GET    /api/patients/:id             # Get patient by ID (Admin/Therapist)
GET    /api/patients                 # Get all patients (Admin)
```

### Therapists (`/api/therapists`)
```
GET    /api/therapists               # Get all therapists
GET    /api/therapists/:id           # Get therapist by ID
POST   /api/therapists               # Create therapist (Admin)
PUT    /api/therapists/:id           # Update therapist (Admin/Therapist)
DELETE /api/therapists/:id           # Delete therapist (Admin)
```

### Bookings (`/api/bookings`)
```
POST   /api/bookings                 # Create new booking
GET    /api/bookings                 # Get all bookings
GET    /api/bookings/:id             # Get booking by ID
PUT    /api/bookings/:id/status      # Update booking status
DELETE /api/bookings/:id             # Cancel booking
```

### Payments (`/api/payments`)
```
POST   /api/payments/upload-proof   # Upload payment proof
POST   /api/payments/:id/verify     # Verify payment (Admin)
POST   /api/payments/:id/reject     # Reject payment (Admin)
GET    /api/payments/booking/:bookingId  # Get payment by booking ID
GET    /api/payments/pending        # Get pending payments (Admin)
```

## Authentication

API menggunakan JWT Bearer token authentication.

**Header Format:**
```
Authorization: Bearer <access_token>
```

**User Roles:**
- `PATIENT` - Pasien
- `THERAPIST` - Terapis
- `ADMIN` - Administrator

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

## Database Models

### Core Models:
- **User** - User authentication
- **Patient** - Patient profile
- **Therapist** - Therapist profile
- **Booking** - Appointment bookings
- **Payment** - Payment records
- **Session** - Therapy sessions
- **Review** - Reviews and ratings
- **Message** - Chat messages
- **Notification** - User notifications
- **Availability** - Therapist availability schedule

## Scripts

```bash
# Development
npm run dev          # Start development server with nodemon

# Build
npm run build        # Compile TypeScript to JavaScript

# Production
npm start            # Start production server

# Prisma
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:push        # Push schema to database (dev)
npm run prisma:studio      # Open Prisma Studio GUI
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `JWT_REFRESH_SECRET` | Refresh token secret | - |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | 30d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |
| `MAX_FILE_SIZE` | Max upload file size (bytes) | 5242880 |
| `UPLOAD_PATH` | Upload directory path | ./uploads |

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control (RBAC)
- Request validation with express-validator
- CORS configuration
- Error handling middleware

## Real-time Features

Socket.IO untuk:
- Real-time chat antara patient dan therapist
- Live notifications
- Booking status updates

## Notes

- Pastikan PostgreSQL service running sebelum start server
- Untuk development, gunakan `npm run dev` untuk auto-reload
- Jangan commit file `.env` ke repository
- Untuk production, gunakan environment variables yang lebih secure
- Database migration sebaiknya dilakukan di staging sebelum production

## Troubleshooting

### Database Connection Error
```
Error: P1001: Can't reach database server
```
**Solution:** Pastikan PostgreSQL service running dan credential di `.env` benar.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT di `.env` atau kill process yang menggunakan port tersebut.

### Prisma Client Not Generated
```
Error: @prisma/client did not initialize yet
```
**Solution:** Run `npm run prisma:generate`

## License

ISC

## Contact

For issues and questions, please contact the development team.
