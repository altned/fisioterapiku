# 🚀 Fisioku - Quick Start Guide

Panduan cepat untuk menjalankan project Fisioku (Backend + Mobile App).

## 📋 Prerequisites

- ✅ Node.js 18+
- ✅ PostgreSQL 14+
- ✅ Android Studio (untuk Android development)
- ✅ Xcode (untuk iOS development - Mac only)
- ✅ React Native development environment

## 🗂️ Project Structure

```
fisioterapiku/
├── backend/                 # Backend API (Node.js + Express + Prisma)
├── MobileFisioku/          # Mobile App (React Native + TypeScript)
├── BACKEND_SETUP_COMPLETE.md
├── MOBILE_APP_SETUP_COMPLETE.md
├── PROJECT_CONTEXT.md
└── QUICK_START_GUIDE.md    # This file
```

---

## 🔧 Backend Setup

### 1. Setup PostgreSQL Database

```bash
# Login ke PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE fisioku_db;

# Exit
\q
```

### 2. Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fisioku_db?schema=public"

JWT_SECRET=fisioku-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=fisioku-super-secret-refresh-key-2024
JWT_REFRESH_EXPIRES_IN=30d

CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 3. Install Dependencies & Setup Database

```bash
# Install dependencies (already done)
npm install

# Generate Prisma Client (already done)
npm run prisma:generate

# Push database schema
npm run prisma:push
```

### 4. Start Backend Server

```bash
npm run dev
```

**Expected Output:**
```
🚀 Server is running on port 5000
📡 Environment: development
🔗 Health check: http://localhost:5000/health
```

### 5. Test Backend

Open browser or use curl:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Fisioku Backend API is running",
  "timestamp": "2025-10-25T..."
}
```

✅ **Backend is ready!**

---

## 📱 Mobile App Setup

### 1. Get Your Computer's Local IP

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" under your active network adapter
# Example: 192.168.1.100
```

**Mac/Linux:**
```bash
ifconfig
# Look for "inet" under your active network adapter
# Example: 192.168.1.100
```

### 2. Configure Backend URL

```bash
cd MobileFisioku
```

Edit `src/constants/config.ts`:

**For Android Emulator:**
```typescript
export const API_URL = 'http://10.0.2.2:5000/api';
```

**For iOS Simulator:**
```typescript
export const API_URL = 'http://localhost:5000/api';
```

**For Physical Device:**
```typescript
export const API_URL = 'http://YOUR_LOCAL_IP:5000/api';
// Example: 'http://192.168.1.100:5000/api'
```

### 3. Install Dependencies (if not done)

```bash
npm install
```

**For iOS (Mac only):**
```bash
cd ios
pod install
cd ..
```

### 4. Start Metro Bundler

```bash
npm start
```

### 5. Run the App

**On Android:**

Open a new terminal:
```bash
npm run android
```

**On iOS (Mac only):**

Open a new terminal:
```bash
npm run ios
```

✅ **Mobile App is running!**

---

## 🧪 Testing the App

### 1. First Launch
- You'll see **Splash Screen** (2 seconds)
- Then **Onboarding** (3 screens)
- Click "Get Started" or "Skip"

### 2. Create Account
- Click "Register"
- Fill in the form:
  - Name: John Doe
  - Email: john@example.com
  - Phone: 081234567890
  - Password: password123
  - Confirm Password: password123
- Click "Register"

### 3. Login (if you skipped registration)
- Email: (your email)
- Password: (your password)
- Click "Login"

### 4. Dashboard
- You'll see the Dashboard with therapist list
- Pull down to refresh

---

## 🎯 Common Issues & Solutions

### Backend Issues

**Issue: Can't reach database server**
```
Error: P1001: Can't reach database server at `localhost:5432`
```
**Solution:** 
- Pastikan PostgreSQL service running
- Cek DATABASE_URL di `.env`

**Issue: Port already in use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT di `.env`
- Atau kill process: `taskkill /F /IM node.exe` (Windows)

---

### Mobile App Issues

**Issue: Network Request Failed**
```
[Error: Network Error]
```
**Solutions:**
1. Pastikan backend running (`http://localhost:5000/health`)
2. Cek `API_URL` di `config.ts` sesuai environment
3. Untuk physical device, gunakan local IP bukan localhost
4. Disable firewall sementara untuk testing

**Issue: Unable to resolve module**
```
error: Error: Unable to resolve module ...
```
**Solution:**
```bash
npm start -- --reset-cache
```

**Issue: Android build failed**
```
FAILURE: Build failed with an exception.
```
**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**Issue: Metro bundler issues**
```
Error: ENOSPC: System limit for number of file watchers reached
```
**Solution (Linux):**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 📊 Project Status

### Backend ✅
- [x] Express server with TypeScript
- [x] Prisma ORM + PostgreSQL
- [x] JWT authentication
- [x] User management
- [x] Patient management
- [x] Therapist management
- [x] Booking system
- [x] Payment system
- [x] Real-time chat (Socket.IO)
- [x] API documentation

### Mobile App ✅
- [x] React Native + TypeScript
- [x] React Navigation
- [x] Redux Toolkit
- [x] Splash screen
- [x] Onboarding (3 screens)
- [x] Login/Register
- [x] Dashboard with therapist list
- [x] API integration
- [x] Error handling
- [x] Loading states

### TODO (Optional) 📝
- [ ] Therapist detail screen
- [ ] Booking flow
- [ ] Payment upload
- [ ] Profile management
- [ ] Booking history
- [ ] Real-time chat UI
- [ ] Push notifications

---

## 📚 Documentation

- **Backend**: `backend/README.md`
- **Mobile App**: `MobileFisioku/README.md`
- **Backend Setup**: `BACKEND_SETUP_COMPLETE.md`
- **Mobile Setup**: `MOBILE_APP_SETUP_COMPLETE.md`
- **Project Context**: `PROJECT_CONTEXT.md`

---

## 🎉 You're All Set!

Backend dan Mobile App sudah siap digunakan untuk development!

**Happy Coding!** 🚀

---

## 📞 Need Help?

Jika ada issues:
1. Check documentation files
2. Check backend logs
3. Check Metro bundler logs
4. Check React Native debugger

**Development Flow:**
```
1. Start PostgreSQL
2. Start Backend (npm run dev)
3. Start Mobile App (npm start)
4. Run on device (npm run android/ios)
5. Start coding! 💻
```
