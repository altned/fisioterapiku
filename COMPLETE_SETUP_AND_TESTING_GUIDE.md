# 🚀 Complete Setup and Testing Guide

**Project:** Fisioku - Fisioterapi Platform  
**Date:** November 1, 2025  
**Version:** 2.0 (with Informed Consent)  
**Status:** Production Ready

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites](#prerequisites)
2. [PostgreSQL Docker Setup](#postgresql-docker-setup)
3. [Backend Setup](#backend-setup)
4. [Database Migration](#database-migration)
5. [Running Backend Server](#running-backend-server)
6. [Mobile App Setup](#mobile-app-setup)
7. [Testing Guide](#testing-guide)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 PREREQUISITES

### Required Software

1. **Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop
   - Version: Latest stable
   - Status: Must be running before setup

2. **Node.js**
   - Version: 18.x or higher
   - Download: https://nodejs.org/
   - Check: `node --version`

3. **npm**
   - Version: 9.x or higher
   - Comes with Node.js
   - Check: `npm --version`

4. **Git**
   - Version: Latest
   - Check: `git --version`

5. **Android Studio** (for mobile testing)
   - Download: https://developer.android.com/studio
   - Android SDK installed
   - Android Emulator or physical device

### Verify Prerequisites

```powershell
# Check Node.js
node --version
# Expected: v18.x.x or higher

# Check npm
npm --version
# Expected: 9.x.x or higher

# Check Docker
docker --version
# Expected: Docker version 20.x.x or higher

# Check Docker is running
docker ps
# Expected: List of containers (can be empty)

# Check Git
git --version
# Expected: git version 2.x.x
```

---

## 🐘 POSTGRESQL DOCKER SETUP

### Step 1: Start Docker Desktop

1. Open Docker Desktop application
2. Wait until Docker is running (whale icon in system tray)
3. Verify: `docker ps` should work without errors

### Step 2: Navigate to Backend Directory

```powershell
cd C:\Users\rifal\Documents\github\fisioterapiku\backend
```

### Step 3: Start PostgreSQL Container

```powershell
# Start PostgreSQL using docker-compose
docker-compose up -d

# Expected output:
# Creating network "backend_default" with the default driver
# Creating fisioku-postgres ... done
```

### Step 4: Verify PostgreSQL is Running

```powershell
# Check container status
docker ps

# Expected output should include:
# CONTAINER ID   IMAGE                PORTS                    NAMES
# xxxxxxxxx      postgres:16-alpine   0.0.0.0:5432->5432/tcp   fisioku-postgres
```

```powershell
# Check container logs
docker logs fisioku-postgres

# Expected output should include:
# database system is ready to accept connections
```

### Step 5: Test Database Connection

```powershell
# Option 1: Using docker exec
docker exec -it fisioku-postgres psql -U postgres -d fisioku_db -c "SELECT version();"

# Option 2: Check environment variables
docker exec fisioku-postgres env | findstr POSTGRES
```

### Docker Commands Reference

```powershell
# Start PostgreSQL
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# Stop and remove data (CAUTION!)
docker-compose down -v

# View logs
docker logs fisioku-postgres

# View live logs
docker logs -f fisioku-postgres

# Restart PostgreSQL
docker restart fisioku-postgres

# Access PostgreSQL CLI
docker exec -it fisioku-postgres psql -U postgres -d fisioku_db
```

---

## 🔨 BACKEND SETUP

### Step 1: Install Dependencies

```powershell
# Navigate to backend directory
cd C:\Users\rifal\Documents\github\fisioterapiku\backend

# Install npm packages
npm install

# Expected: All packages installed without errors
# Time: ~2-3 minutes
```

### Step 2: Configure Environment

```powershell
# Check .env file exists
ls .env

# If not exists, copy from example
cp .env.example .env

# Verify .env contents
cat .env
```

**Required .env variables:**

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fisioku_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000,http://10.0.2.2:5000"
```

### Step 3: Generate Prisma Client

```powershell
# Generate Prisma Client from schema
npx prisma generate

# Expected output:
# ✔ Generated Prisma Client to ./node_modules/@prisma/client
```

---

## 🗄️ DATABASE MIGRATION

### Step 1: Push Schema to Database

**Option A: Development (Recommended for first time)**

```powershell
# Push schema without creating migration files
npx prisma db push

# Expected output:
# Your database is now in sync with your Prisma schema. Done in XXms
```

**Option B: Production (Create migration files)**

```powershell
# Create migration files
npx prisma migrate dev --name initial_schema

# Expected output:
# Migration `XXX_initial_schema` created successfully
# Your database is now in sync with your Prisma schema
```

**NEW: With Consent Model (After implementing consent feature)**

```powershell
# Create migration for consent model
npx prisma migrate dev --name add_consent_model

# Expected output:
# Migration `XXX_add_consent_model` created successfully
```

### Step 2: Verify Migration

```powershell
# Check migration status
npx prisma migrate status

# Expected output:
# Database schema is up to date!
```

### Step 3: Seed Database

```powershell
# Run seed script
npm run prisma:seed

# Expected output:
# 🌱 Starting database seeding...
# 🗑️  Cleaning existing data...
# ✅ Cleaned existing data
# 👤 Creating admin user...
# ✅ Admin user created: admin@fisioku.com
# 👥 Creating patient users...
# ✅ Patient created: Budi Santoso
# ✅ Patient created: Siti Nurhaliza
# ✅ Patient created: Ahmad Wijaya
# 🏥 Creating therapist users...
# ✅ Therapist created: Dr. Sarah Johnson
# ✅ Therapist created: Dr. Michael Chen
# ✅ Therapist created: Dr. Linda Wijaya
# ✅ Therapist created: Dr. David Tan
# ✅ Therapist created: Dr. Maya Putri
# ✅ Therapist created: Dr. Ryan Pratama
# 📅 Creating availability schedules...
# ✅ Availability created for therapists
# 📝 Creating sample booking...
# ✅ Sample booking created
# 🌱 Seeding completed successfully!
```

### Step 4: Verify Seeded Data

```powershell
# Open Prisma Studio (Database GUI)
npx prisma studio

# This opens http://localhost:5555
# Browse tables: User, Patient, Therapist, Booking, etc.
```

### Migration Commands Reference

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema (dev)
npx prisma db push

# Create migration
npx prisma migrate dev --name <migration_name>

# Run migrations
npx prisma migrate deploy

# Reset database (CAUTION!)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Seed database
npm run prisma:seed

# Open Prisma Studio
npx prisma studio
```

---

## 🚀 RUNNING BACKEND SERVER

### Step 1: Build TypeScript

```powershell
# Compile TypeScript to JavaScript
npm run build

# Expected output:
# No errors
# Files compiled to ./dist directory
```

### Step 2: Start Development Server

```powershell
# Start server with auto-reload
npm run dev

# Expected output:
# [nodemon] starting `ts-node src/index.ts`
# 🚀 Server is running on port 5000
# 📡 Environment: development
# 🔗 Health check: http://localhost:5000/health
```

### Step 3: Verify Server is Running

**Open new PowerShell window:**

```powershell
# Test health endpoint
curl http://localhost:5000/health

# Expected response:
# {"status":"ok","message":"Fisioku Backend API is running","timestamp":"2025-11-01T..."}
```

```powershell
# Test therapists endpoint
curl http://localhost:5000/api/therapists

# Expected response:
# {"success":true,"message":"...","data":[...6 therapists...]}
```

### Step 4: Test Authentication

```powershell
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"patient1@example.com\",\"password\":\"password123\"}'

# Expected response:
# {"success":true,"data":{"user":{...},"accessToken":"...","refreshToken":"..."}}
```

### Backend Commands Reference

```powershell
# Development mode (with auto-reload)
npm run dev

# Production build
npm run build

# Production start
npm start

# Type checking
npx tsc --noEmit

# Prisma commands
npm run prisma:generate  # Generate client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open GUI
npm run prisma:push      # Push schema
npm run prisma:seed      # Seed data
```

### Backend Endpoints

#### Public Endpoints
- `GET /health` - Health check
- `GET /api/therapists` - List therapists
- `GET /api/consents/text` - Get consent text
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Protected Endpoints (Require Authentication)
- `GET /api/auth/profile` - Get user profile
- `GET /api/patients/profile` - Get patient profile
- `PUT /api/patients/profile` - Update patient profile
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `POST /api/consents` - Create consent
- `POST /api/consents/:id/agree` - Agree to consent
- `POST /api/payments/upload-proof` - Upload payment

---

## 📱 MOBILE APP SETUP

### Step 1: Install Dependencies

```powershell
# Navigate to mobile directory
cd C:\Users\rifal\Documents\github\fisioterapiku\MobileFisioku

# Install npm packages
npm install

# Expected: All packages installed without errors
# Time: ~3-5 minutes
```

### Step 2: Configure API URL

**File:** `MobileFisioku/src/constants/config.ts`

```typescript
// For Android Emulator
export const API_URL = 'http://10.0.2.2:5000/api';

// For Physical Device (use your computer's IP)
// export const API_URL = 'http://192.168.x.x:5000/api';
```

**How to find your IP:**

```powershell
# Windows
ipconfig | findstr IPv4

# Look for "IPv4 Address" (usually 192.168.x.x)
```

### Step 3: Start Metro Bundler

```powershell
# Start Metro (React Native bundler)
npm start

# Expected output:
# Welcome to Metro!
# Fast - Scalable - Integrated
# 
# › Metro waiting on http://localhost:8081

# Keep this terminal open!
```

### Step 4: Run on Android

**Open NEW PowerShell window:**

```powershell
cd C:\Users\rifal\Documents\github\fisioterapiku\MobileFisioku

# Run on Android
npm run android

# First build takes 3-5 minutes
# Subsequent builds: 30-60 seconds

# Expected:
# BUILD SUCCESSFUL
# Installing APK...
# Starting app...
```

### Step 5: Verify App is Running

**On Android Device/Emulator:**

1. App should open automatically
2. You should see Splash Screen
3. Then Onboarding or Login Screen

**Test Login:**
- Email: `patient1@example.com`
- Password: `password123`

### Mobile Commands Reference

```powershell
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Lint code
npm run lint

# Type checking
npx tsc --noEmit

# Clear cache and restart
npm start -- --reset-cache

# Rebuild
cd android
./gradlew clean
cd ..
npm run android
```

### Development Tips

```powershell
# Hot reload
# Press 'R' in Metro terminal or shake device

# Open dev menu on emulator
# Press Ctrl + M (Windows)
# Press Cmd + M (Mac)

# View logs
npx react-native log-android

# Clear Metro cache
npm start -- --reset-cache
```

---

## 🧪 TESTING GUIDE

### Backend Testing

#### 1. Health Check Test

```powershell
# Test health endpoint
curl http://localhost:5000/health

# Expected: {"status":"ok",...}
# Status Code: 200
```

#### 2. Database Connection Test

```powershell
# Test therapist list (requires DB)
curl http://localhost:5000/api/therapists

# Expected: Array of 6 therapists
# Status Code: 200
```

#### 3. Authentication Test

```powershell
# Test login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"patient1@example.com\",\"password\":\"password123\"}'

# Expected: {success:true, data:{user, accessToken, refreshToken}}
# Status Code: 200
```

#### 4. Protected Endpoint Test

```powershell
# First, login to get token
$response = curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"patient1@example.com\",\"password\":\"password123\"}' | ConvertFrom-Json

$token = $response.data.accessToken

# Then test protected endpoint
curl http://localhost:5000/api/patients/profile `
  -H "Authorization: Bearer $token"

# Expected: Patient profile data
# Status Code: 200
```

#### 5. Consent Text Test

```powershell
# Test consent text endpoint (public)
curl http://localhost:5000/api/consents/text

# Expected: {success:true, data:{version:"1.0", text:"..."}}
# Status Code: 200
```

#### 6. Booking Creation Test

```powershell
# Login first
$response = curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"patient1@example.com\",\"password\":\"password123\"}' | ConvertFrom-Json

$token = $response.data.accessToken

# Create booking
curl -X POST http://localhost:5000/api/bookings `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d '{
    \"therapistId\":\"<therapist-id>\",
    \"appointmentDate\":\"2025-11-15\",
    \"appointmentTime\":\"10:00\",
    \"location\":\"Home\",
    \"complaint\":\"Back pain\"
  }'

# Expected: Booking created
# Status Code: 201
```

---

### Mobile App Testing

#### Complete Booking Flow Test

**Step 1: Launch App**
- App opens without crash ✅
- Splash screen appears ✅
- Navigate to Login ✅

**Step 2: Login**
```
Email: patient1@example.com
Password: password123
```
- Login successful ✅
- Dashboard loads ✅
- 6 therapists displayed ✅

**Step 3: Browse Therapists**
- Scroll through therapist list ✅
- Tap on a therapist ✅
- Therapist detail screen opens ✅
- All info displayed correctly ✅

**Step 4: Start Booking**
- Tap "Book Appointment" ✅
- Booking form opens ✅
- Fill complaint field ✅
- Fill medical history (optional) ✅
- Tap "Continue" ✅

**Step 5: Select Schedule**
- Date selector appears ✅
- Select a date ✅
- Time slots appear ✅
- Select a time ✅
- Tap "Continue" ✅

**Step 6: Informed Consent (NEW!)**
- Consent screen opens ✅
- Full consent text displayed ✅
- Scroll indicator appears ✅
- Scroll to bottom ✅
- Scroll indicator disappears ✅
- 5 checkboxes appear ✅
- Check all 5 boxes:
  - ✅ Physical examination
  - ✅ Therapy procedure
  - ✅ Risks understanding
  - ✅ Data usage
  - ✅ Emergency contact
- Patient name displayed correctly ✅
- Current date/time displayed ✅
- "Agree & Continue" button enabled ✅
- Tap "Agree & Continue" ✅

**Step 7: Confirmation**
- Confirmation screen opens ✅
- All details correct ✅
- Tap "Confirm Booking" ✅
- Loading indicator appears ✅
- Success message appears ✅
- "Booking submitted with informed consent" ✅

**Step 8: Verify Booking**
- Navigate to "My Bookings" ✅
- New booking appears ✅
- Status: PENDING ✅
- All details correct ✅
- Tap on booking ✅
- Booking detail opens ✅
- Can see consent was agreed ✅

**Step 9: Cancel Booking (Optional)**
- Tap "Cancel Booking" ✅
- Confirmation dialog appears ✅
- Confirm cancellation ✅
- Booking status: CANCELLED ✅

---

### Test Accounts

#### Patient Accounts
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

#### Therapist Accounts
```
1. Email: therapist1@fisioku.com
   Password: password123
   Name: Dr. Sarah Johnson
   Bidang Terapi: Fisioterapi Muskuloskeletal, Fisioterapi Olahraga

2. Email: therapist2@fisioku.com
   Password: password123
   Name: Dr. Michael Chen
   Bidang Terapi: Fisioterapi Neuromuskular, Fisioterapi Geriatrik
   
... (6 total therapists)
```

#### Admin Account
```
Email: admin@fisioku.com
Password: password123
```

---

### Testing Checklist

#### Backend Tests
- [ ] Docker PostgreSQL running
- [ ] Database migration successful
- [ ] Seed data loaded
- [ ] Health endpoint working
- [ ] Therapist list endpoint working
- [ ] Login endpoint working
- [ ] Protected endpoints require auth
- [ ] Consent text endpoint working
- [ ] Booking creation working
- [ ] Consent creation working
- [ ] Consent agreement working

#### Mobile Tests
- [ ] App launches without crash
- [ ] Login works
- [ ] Dashboard displays therapists
- [ ] Therapist detail opens
- [ ] Booking form works
- [ ] Schedule selection works
- [ ] **Consent screen displays**
- [ ] **Scroll detection works**
- [ ] **All 5 checkboxes work**
- [ ] **Cannot proceed without all checks**
- [ ] **Consent agreement successful**
- [ ] Booking confirmation works
- [ ] Booking submission successful
- [ ] Booking appears in "My Bookings"
- [ ] Booking detail displays consent info
- [ ] Logout works

#### Integration Tests
- [ ] End-to-end booking with consent
- [ ] Consent data saved correctly
- [ ] IP address captured
- [ ] Timestamp recorded
- [ ] Cannot book without consent
- [ ] Consent immutable after agreement

---

## 🔧 TROUBLESHOOTING

### Docker Issues

#### Issue: "Docker is not running"
```powershell
# Solution: Start Docker Desktop
# Wait for Docker to fully start (green icon)
# Verify: docker ps
```

#### Issue: "Port 5432 already in use"
```powershell
# Find process using port 5432
netstat -ano | findstr :5432

# Kill the process
taskkill /PID <process-id> /F

# Or use different port in docker-compose.yml
```

#### Issue: "Container fails to start"
```powershell
# Check logs
docker logs fisioku-postgres

# Remove and recreate
docker-compose down -v
docker-compose up -d
```

---

### Backend Issues

#### Issue: "Cannot connect to database"
```powershell
# 1. Verify PostgreSQL is running
docker ps

# 2. Check DATABASE_URL in .env
cat .env | findstr DATABASE_URL

# 3. Test connection
docker exec -it fisioku-postgres psql -U postgres -d fisioku_db -c "SELECT 1;"

# 4. Regenerate Prisma Client
npx prisma generate
```

#### Issue: "Module not found"
```powershell
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Issue: "Migration failed"
```powershell
# Reset database (CAUTION: deletes all data)
npx prisma migrate reset

# Push schema
npx prisma db push

# Seed again
npm run prisma:seed
```

#### Issue: "Port 5000 already in use"
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <process-id> /F
```

---

### Mobile App Issues

#### Issue: "Metro bundler not starting"
```powershell
# Clear cache and restart
npm start -- --reset-cache
```

#### Issue: "Build failed"
```powershell
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

#### Issue: "Network request failed"
```powershell
# 1. Verify backend is running
curl http://localhost:5000/health

# 2. Check API_URL in config.ts
# For Android Emulator: http://10.0.2.2:5000/api
# For Physical Device: http://<YOUR-IP>:5000/api

# 3. For physical device, find your IP:
ipconfig | findstr IPv4

# 4. Update config.ts with your IP
```

#### Issue: "App crashes on consent screen"
```powershell
# Check Metro logs for errors
# Check device logs:
npx react-native log-android

# Common causes:
# - Backend not running
# - Consent text endpoint failing
# - Network connectivity
```

#### Issue: "Cannot scroll consent text"
```powershell
# This is usually a UI issue
# Try:
# 1. Restart app
# 2. Clear Metro cache
# 3. Check ScrollView component
```

---

### Database Issues

#### Issue: "No data in database"
```powershell
# Seed database
npm run prisma:seed

# Verify in Prisma Studio
npx prisma studio
```

#### Issue: "Consent table missing"
```powershell
# Run migration
npx prisma migrate dev --name add_consent_model

# Or push schema
npx prisma db push

# Verify
npx prisma studio
```

---

## 📚 REFERENCE

### Default Credentials

**All test accounts use:**
- Password: `password123`

**Test Emails:**
- Patient: `patient1@example.com`
- Therapist: `therapist1@fisioku.com`
- Admin: `admin@fisioku.com`

### Important URLs

- Backend Health: http://localhost:5000/health
- Backend API: http://localhost:5000/api
- Prisma Studio: http://localhost:5555
- Metro Bundler: http://localhost:8081

### Important Ports

- PostgreSQL: 5432
- Backend: 5000
- Prisma Studio: 5555
- Metro Bundler: 8081

### Directory Structure

```
fisioterapiku/
├── backend/                 # Backend API
│   ├── prisma/             # Database schema & migrations
│   ├── src/                # Source code
│   │   ├── controllers/    # API controllers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Middleware functions
│   │   └── constants/      # Constants (consent text)
│   └── docker-compose.yml  # Docker configuration
│
├── MobileFisioku/          # Mobile app
│   ├── src/
│   │   ├── screens/        # App screens (including ConsentScreen)
│   │   ├── services/       # API services
│   │   ├── navigation/     # Navigation setup
│   │   ├── store/          # Redux store
│   │   └── constants/      # Constants & theme
│   └── android/            # Android project
│
└── Documentation files
```

---

## ✅ QUICK START COMMANDS

### Full Setup from Scratch

```powershell
# 1. Start PostgreSQL
cd backend
docker-compose up -d

# 2. Setup Backend
npm install
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run build
npm run dev

# 3. Setup Mobile (in new terminal)
cd ../MobileFisioku
npm install
npm start

# 4. Run Android (in new terminal)
cd MobileFisioku
npm run android
```

### Daily Development

```powershell
# Terminal 1: Backend
cd backend
docker-compose up -d  # If not running
npm run dev

# Terminal 2: Mobile
cd MobileFisioku
npm start

# Terminal 3: Android
cd MobileFisioku
npm run android
```

---

## 🎯 SUCCESS INDICATORS

### Backend is Working When:
- ✅ `curl http://localhost:5000/health` returns 200
- ✅ `curl http://localhost:5000/api/therapists` returns 6 therapists
- ✅ Login endpoint returns token
- ✅ No errors in console

### Mobile App is Working When:
- ✅ App opens without crash
- ✅ Login works
- ✅ Dashboard shows 6 therapists
- ✅ Complete booking flow works
- ✅ Consent screen displays correctly
- ✅ Booking submission successful

### Database is Working When:
- ✅ `docker ps` shows fisioku-postgres running
- ✅ Prisma Studio opens and shows tables
- ✅ Seed data visible in tables
- ✅ New bookings appear after creation

---

## 📞 SUPPORT

### Common Questions

**Q: Do I need to run migrations every time?**
A: No, only when database schema changes.

**Q: Do I need to seed every time?**
A: No, only when you want fresh test data.

**Q: Can I use a different port for backend?**
A: Yes, change PORT in .env and update mobile config.ts

**Q: How do I reset everything?**
A: 
```powershell
docker-compose down -v
npx prisma migrate reset
npm run prisma:seed
```

**Q: Where is consent data stored?**
A: In PostgreSQL, table: `consents`

**Q: How do I view consent records?**
A: Use Prisma Studio: `npx prisma studio`

---

## 🎉 READY TO TEST!

Follow this guide step by step, and you'll have:
- ✅ PostgreSQL running in Docker
- ✅ Backend API with all endpoints
- ✅ Database with test data
- ✅ Mobile app with consent feature
- ✅ Complete booking flow working

**Happy Testing!** 🚀

---

*Document Version: 2.0*  
*Last Updated: November 1, 2025*  
*Includes: Informed Consent Feature*
