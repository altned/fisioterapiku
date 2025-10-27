# ✅ Ready to Run Mobile App!

## 🎉 Backend & Configuration Complete!

### ✅ Step 1: Backend Running ✓

Backend sudah **RUNNING** di port 5000!

**Proof:**
```
✅ Health Check: OK
✅ API Endpoint: http://localhost:5000
✅ Database: Connected (PostgreSQL Docker)
✅ Therapist Data: 6 therapists available
```

**Backend Terminal:**
You should see a PowerShell window with:
```
🚀 Server is running on port 5000
📡 Environment: development
🔗 Health check: http://localhost:5000/health
```

### ✅ Step 2: Mobile API_URL Configured ✓

File `MobileFisioku/src/constants/config.ts` sudah dikonfigurasi:

```typescript
// For Android Emulator
export const API_URL = 'http://10.0.2.2:5000/api';
```

**Why `10.0.2.2`?**
- Android Emulator menggunakan `10.0.2.2` untuk mengakses host machine (localhost)
- `localhost` di emulator akan mengakses emulator itu sendiri, bukan host machine

---

## 🚀 Next: Run Mobile App!

### Step 3: Start Metro Bundler

**Open NEW Terminal:**
```bash
cd MobileFisioku
npm start
```

Expected output:
```
                 ######                ######               
               ###     ####        ####     ###             
            
Welcome to React Native!
Learn once, write anywhere
```

**Keep this terminal running!**

### Step 4: Run on Android Emulator

**Open ANOTHER NEW Terminal:**
```bash
cd MobileFisioku
npm run android
```

This will:
1. Build the Android app
2. Install APK to emulator
3. Launch the app

**First build takes 2-5 minutes. Be patient!**

---

## 📱 Testing Flow

### When App Launches:

**1. Splash Screen (2 seconds)**
```
     Fisioku
Layanan Fisioterapi di Rumah
     [Loading...]
```

**2. Onboarding (3 screens)**
- Screen 1: 🏠 Terapi di Rumah
- Screen 2: 👨‍⚕️ Fisioterapis Berpengalaman  
- Screen 3: 📱 Booking Mudah & Aman

**You can Skip or swipe through**

**3. Login Screen**

Click "Register" to create new account, OR use existing:

**Existing Patient Login:**
```
Email: patient1@example.com
Password: password123
```

**4. Dashboard - SUCCESS! 🎉**

You should see:
```
Hello, Budi Santoso!
Find your therapist and book an appointment

[6 Therapist Cards showing:]
┌────────────────────────────────┐
│ Dr. Sarah Johnson              │
│ Sports Injury, Orthopedic...   │
│ ⭐ 4.8 (127) 📍 Jakarta Selatan│
│ Rp 250,000    [Available]      │
└────────────────────────────────┘

... (5 more cards)
```

---

## 🎯 What to Test

### ✅ Basic Features

1. **Splash & Onboarding**
   - Splash shows for 2 seconds
   - Onboarding can be skipped
   - Dots indicator works

2. **Registration**
   - All form validations work
   - Can create new account
   - Auto-redirects to Dashboard

3. **Login**
   - Email & password validation
   - Error messages show
   - Success → Dashboard

4. **Dashboard**
   - Shows welcome message with name
   - Displays 6 therapist cards
   - Each card shows:
     * Name & specialization
     * Rating & review count
     * Location
     * Price per session
     * Availability badge

5. **Pull-to-Refresh**
   - Pull down on dashboard
   - Loading indicator appears
   - List refreshes

6. **Auto-Login**
   - Close app completely
   - Reopen app
   - Should skip login and go to Dashboard

---

## 🐛 Troubleshooting

### Issue: "Network Request Failed"

**Symptoms:**
- Can't login
- Dashboard empty
- Error alerts

**Solutions:**

1. **Verify backend is running**
   ```bash
   curl http://localhost:5000/health
   # Should return OK
   ```

2. **Check API_URL in config.ts**
   - MUST be `http://10.0.2.2:5000/api` for Android Emulator
   - NOT `http://localhost:5000/api`

3. **Restart Metro Bundler**
   ```bash
   # In Metro terminal: Press Ctrl+C
   npm start -- --reset-cache
   ```

4. **Rebuild app**
   ```bash
   # In Android terminal
   npm run android
   ```

### Issue: Build Failed

**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Issue: Metro Bundler Issues

**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Dashboard Empty (No Therapists)

**Verify data in backend:**
```bash
curl http://localhost:5000/api/therapists
# Should return array of 6 therapists
```

If empty, re-seed:
```bash
cd backend
npm run prisma:seed
```

---

## 📊 Backend Verification

### Quick API Tests

```bash
# Health check
curl http://localhost:5000/health

# Get all therapists
curl http://localhost:5000/api/therapists

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"patient1@example.com\",\"password\":\"password123\"}"
```

All should return success responses.

---

## 💡 Tips

### For Faster Testing:
- Keep backend terminal open
- Keep Metro bundler running
- Don't close emulator between tests
- Use existing patient account for quick login

### For Clean Testing:
- Clear app data from emulator settings
- Uninstall and reinstall app
- Test registration flow from scratch

### For Debugging:
```bash
# View Metro logs
# Check the Metro terminal

# View Android logs
npx react-native log-android

# View app in Chrome DevTools
# Shake device/emulator → "Debug"
```

---

## ✅ Success Checklist

Before testing, verify:

- [x] PostgreSQL Docker running
- [x] Backend running on port 5000
- [x] Health check returns OK
- [x] Therapists API returns 6 items
- [x] Mobile API_URL = `http://10.0.2.2:5000/api`
- [ ] Metro bundler running ← **DO THIS NOW**
- [ ] Android emulator open ← **DO THIS NOW**
- [ ] App installed and running ← **DO THIS NOW**

---

## 🎉 Expected Result

After all steps:

1. ✅ App launches smoothly
2. ✅ Onboarding works
3. ✅ Can login with patient1@example.com
4. ✅ Dashboard shows:
   - Welcome message with patient name
   - 6 therapist cards with complete info
   - Pull-to-refresh works
   - No errors

**THIS MEANS YOUR FULL STACK IS WORKING!** 🚀

Backend (Node.js + PostgreSQL) ↔️ Mobile (React Native)

---

## 🔄 Current Setup Summary

```
PostgreSQL (Docker) ✅
      ↓
Backend API (port 5000) ✅
      ↓
Mobile App Config ✅
      ↓
[NEXT] Start Metro & Run App
      ↓
[RESULT] Working Dashboard!
```

---

## 📞 Quick Commands Reference

```bash
# Terminal 1: Backend (already running ✅)
cd backend
npm run dev

# Terminal 2: Metro Bundler (do this now!)
cd MobileFisioku
npm start

# Terminal 3: Run App (do this now!)
cd MobileFisioku
npm run android

# If need to restart backend:
# Close PowerShell window, then:
cd backend
npm run dev
```

---

## 🎯 You're Almost There!

Just 2 more commands and you'll see the app running:

```bash
# Command 1:
cd MobileFisioku
npm start

# Command 2 (in new terminal):
cd MobileFisioku
npm run android
```

Then login and enjoy your working app! 🎉

---

**Ready? Let's GO!** 🚀
