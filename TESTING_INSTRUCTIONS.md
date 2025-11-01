# 🧪 Testing Instructions - Fisioku Mobile App

## Prerequisites Checklist

Before testing, make sure you have:
- ✅ PostgreSQL installed and running
- ✅ Node.js installed
- ✅ Android Studio / Xcode installed
- ✅ Android Emulator / iOS Simulator ready

---

## 📝 Step-by-Step Testing Guide

### **STEP 1: Setup Database** 

#### 1.1 Start PostgreSQL

**Windows:**
```bash
# Buka Services → PostgreSQL → Start
# Atau via pgAdmin
```

**Mac:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo systemctl start postgresql
```

#### 1.2 Create Database

```bash
# Login ke PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE fisioku_db;

# Exit
\q
```

#### 1.3 Verify Database

```bash
psql -U postgres -d fisioku_db -c "SELECT version();"
```

---

### **STEP 2: Setup Backend**

#### 2.1 Configure Environment

```bash
cd backend
```

Check `.env` file (should already exist):
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fisioku_db?schema=public"
```

⚠️ **IMPORTANT**: Ganti `YOUR_PASSWORD` dengan password PostgreSQL Anda!

#### 2.2 Push Database Schema

```bash
npm run prisma:push
```

Expected output:
```
✔ Generated Prisma Client
🚀 Database synchronized
```

#### 2.3 Seed Database with Dummy Data

```bash
npm run prisma:seed
```

Expected output:
```
🌱 Starting database seeding...
✅ Admin user created: admin@fisioku.com
✅ Patient created: Budi Santoso
✅ Patient created: Siti Nurhaliza
✅ Patient created: Ahmad Wijaya
✅ Therapist created: Dr. Sarah Johnson
✅ Therapist created: Dr. Michael Chen
... (6 therapists total)

🎉 Seeding completed successfully!

📊 Summary:
   - Admin users: 1
   - Patients: 3
   - Therapists: 6
   - Bookings: 1

🔑 Login Credentials:
   Patient: patient1@example.com / password123
   Therapist: therapist1@fisioku.com / password123
```

#### 2.4 Start Backend Server

```bash
npm run dev
```

Expected output:
```
🚀 Server is running on port 5000
📡 Environment: development
🔗 Health check: http://localhost:5000/health
```

#### 2.5 Test Backend

Open new terminal:
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

### **STEP 3: Setup Mobile App**

#### 3.1 Get Your Computer's IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```
Look for your local IP (e.g., 192.168.1.100)

#### 3.2 Configure Backend URL

```bash
cd MobileFisioku
```

Edit `src/constants/config.ts`:

**For Android Emulator (RECOMMENDED):**
```typescript
export const API_URL = 'http://10.0.2.2:5000/api';
```

**For iOS Simulator:**
```typescript
export const API_URL = 'http://localhost:5000/api';
```

**For Physical Device:**
```typescript
export const API_URL = 'http://192.168.1.100:5000/api';
// Replace with your actual IP address
```

#### 3.3 Install Dependencies (if needed)

```bash
npm install

# For iOS only (Mac)
cd ios
pod install
cd ..
```

#### 3.4 Start Metro Bundler

```bash
npm start
```

Expected output:
```
                 ######                ######               
               ###     ####        ####     ###             
            
Welcome to React Native!
```

#### 3.5 Run the App

**Open NEW terminal:**

**For Android:**
```bash
cd MobileFisioku
npm run android
```

**For iOS (Mac only):**
```bash
cd MobileFisioku
npm run ios
```

Wait for app to build and launch...

✅ **Mobile App is running!**

---

## 🎯 Testing Scenarios

### **Scenario 1: New User Registration**

1. **App opens** → Splash Screen (2 seconds)
2. **Onboarding** → 3 screens (swipe or skip)
3. **Click "Get Started"** or **"Skip"**
4. **On Login Screen** → Click **"Register"**
5. **Fill registration form:**
   ```
   Name: Your Name
   Email: yourname@example.com
   Phone: 081234567890
   Password: password123
   Confirm Password: password123
   ```
6. **Click "Register"**
7. **Should show alert:** "Account created successfully!"
8. **Click OK**
9. **Should navigate to Dashboard**
10. **Should see 6 therapist cards!** 🎉

### **Scenario 2: Login with Existing Patient**

1. **App opens** → Splash Screen
2. **Onboarding** (if first time)
3. **On Login Screen:**
   ```
   Email: patient1@example.com
   Password: password123
   ```
4. **Click "Login"**
5. **Should navigate to Dashboard**
6. **Should see:**
   - Welcome message: "Hello, Budi Santoso!"
   - 6 therapist cards with details

### **Scenario 3: Dashboard Features**

**Test Pull-to-Refresh:**
1. On Dashboard
2. Pull down to refresh
3. Should show loading indicator
4. Therapist list should reload

**Test Therapist Cards:**
Each card should show:
- ✅ Therapist name
- ✅ Bidang Terapi
- ✅ Rating & review count
- ✅ Location
- ✅ Price per session
- ✅ Availability badge (Available/Busy)

**Expected Data:**
```
1. Dr. Sarah Johnson - Sports Injury
   ⭐ 4.8 (127 reviews)
   📍 Jakarta Selatan
   Rp 250,000/session
   [Available]

2. Dr. Michael Chen - Neurological
   ⭐ 4.9 (203 reviews)
   📍 Jakarta Pusat
   Rp 300,000/session
   [Available]

... (4 more therapists)

6. Dr. Ryan Pratama - Cardiopulmonary
   ⭐ 4.8 (134 reviews)
   📍 Jakarta Pusat
   Rp 280,000/session
   [Busy]
```

### **Scenario 4: Logout & Auto-Login**

1. Close the app completely
2. Reopen the app
3. Should show Splash Screen
4. **Should auto-login** and go directly to Dashboard
5. No need to login again! ✅

### **Scenario 5: Form Validation**

**Test Login Validation:**
1. Leave email empty → Should show "Email is required"
2. Enter invalid email → Should show "Email is invalid"
3. Leave password empty → Should show "Password is required"
4. Enter short password → Should show "Password must be at least 6 characters"

**Test Register Validation:**
1. All fields are validated
2. Password mismatch → Should show "Passwords do not match"
3. Invalid phone → Should show "Phone number is invalid"

---

## 🔍 Debugging

### Check Backend Logs

In backend terminal, you should see:
```
GET /api/therapists 200 - 45ms
POST /api/auth/login 200 - 120ms
```

### Check Metro Bundler Logs

Look for errors in Metro terminal

### Use React Native Debugger

1. Shake device/emulator
2. Select "Debug"
3. Open Chrome DevTools

### Check Network Requests

In code, add console logs:
```typescript
// In services/api.ts
console.log('API Request:', url, data);
console.log('API Response:', response);
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Network Request Failed"

**Symptoms:**
- Login/Register fails
- Dashboard empty
- Error: Network Error

**Solutions:**

1. **Check Backend is Running**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Check API_URL Configuration**
   - For Android Emulator: `http://10.0.2.2:5000/api`
   - For iOS Simulator: `http://localhost:5000/api`
   - For Physical Device: `http://YOUR_LOCAL_IP:5000/api`

3. **Check Firewall**
   - Temporarily disable firewall
   - Or allow port 5000

4. **For Physical Device:**
   - Make sure phone and computer on same WiFi
   - Use computer's local IP address

### Issue 2: Database Connection Error

**Symptoms:**
- Backend fails to start
- Error: Can't reach database server

**Solutions:**

1. **Check PostgreSQL is Running**
   ```bash
   # Windows
   services.msc → PostgreSQL

   # Mac
   brew services list

   # Linux
   sudo systemctl status postgresql
   ```

2. **Check DATABASE_URL in .env**
   ```env
   DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/fisioku_db"
   ```

3. **Test Database Connection**
   ```bash
   psql -U postgres -d fisioku_db
   ```

### Issue 3: Build Failed

**For Android:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**For iOS:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Issue 4: Metro Bundler Issues

```bash
npm start -- --reset-cache
```

### Issue 5: Dashboard Empty (No Therapists)

**Solutions:**

1. **Check Seeding**
   ```bash
   cd backend
   npm run prisma:seed
   ```

2. **Verify Data in Database**
   ```bash
   npm run prisma:studio
   # Open http://localhost:5555
   # Check 'therapist' table
   ```

3. **Test API Directly**
   ```bash
   curl http://localhost:5000/api/therapists
   ```

---

## ✅ Success Checklist

Before reporting issues, verify:

- [ ] PostgreSQL is running
- [ ] Database `fisioku_db` exists
- [ ] Database seeded successfully (6 therapists)
- [ ] Backend running on port 5000
- [ ] Health check returns OK
- [ ] API_URL configured correctly in mobile app
- [ ] Metro bundler running
- [ ] App builds successfully
- [ ] App launches without crash

---

## 📊 Expected Results

After following all steps, you should have:

✅ **Backend:**
- Running on http://localhost:5000
- Database with 6 therapists
- Health check working

✅ **Mobile App:**
- Opens with splash screen
- Shows onboarding (first time)
- Login/Register working
- Dashboard shows 6 therapist cards
- Pull-to-refresh working
- Form validation working
- Auto-login working

✅ **Data:**
- 1 Admin user
- 3 Patient users
- 6 Therapist users (5 available, 1 busy)
- All with password: password123

---

## 🎉 You're Ready to Test!

If everything works:
1. ✅ Backend running with data
2. ✅ Mobile app connected to backend
3. ✅ Dashboard showing therapists
4. ✅ Login/Register working

**Congratulations! Your Fisioku app is working!** 🚀

---

## 📞 Quick Reference

**Backend:**
- URL: http://localhost:5000
- Health: http://localhost:5000/health
- Logs: Terminal running `npm run dev`

**Mobile:**
- Android: `npm run android`
- iOS: `npm run ios`
- Logs: Metro bundler terminal

**Database:**
- Studio: `npm run prisma:studio`
- Seed: `npm run prisma:seed`

**Test Accounts:**
```
patient1@example.com / password123
therapist1@fisioku.com / password123
admin@fisioku.com / password123
```

---

**Happy Testing!** 🎯
