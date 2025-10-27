# ✅ PostgreSQL Docker Setup - SUCCESS!

## 🎉 Setup Completed Successfully!

PostgreSQL sudah running di Docker dan database sudah di-seed dengan data dummy!

---

## 📊 Current Status

### ✅ Docker Container
- **Container Name**: `fisioku-postgres`
- **Image**: `postgres:16-alpine`
- **Status**: Running ✅
- **Port**: 5432
- **Health**: Accepting connections ✅

### ✅ Database
- **Database Name**: `fisioku_db`
- **User**: `postgres`
- **Password**: `postgres123`
- **Connection**: Success ✅

### ✅ Data Seeded
- **Admin Users**: 1
- **Patient Users**: 3
- **Therapist Users**: 6
- **Bookings**: 1
- **Availability**: All therapists have schedules

---

## 🔑 Login Credentials

### Patients (Mobile App)
```
Email: patient1@example.com
Password: password123

Email: patient2@example.com
Password: password123

Email: patient3@example.com
Password: password123
```

### Therapists
```
Email: therapist1@fisioku.com
Password: password123

Email: therapist2@fisioku.com
Password: password123

... (therapist1-6 available)
```

### Admin
```
Email: admin@fisioku.com
Password: password123
```

---

## 👨‍⚕️ Therapist Data (6 Total)

1. **Dr. Sarah Johnson** - Sports Injury & Orthopedic
   - Location: Jakarta Selatan
   - Price: Rp 250,000/session
   - Rating: ⭐ 4.8 (127 reviews)
   - Status: Available ✅

2. **Dr. Michael Chen** - Neurological & Stroke
   - Location: Jakarta Pusat
   - Price: Rp 300,000/session
   - Rating: ⭐ 4.9 (203 reviews)
   - Status: Available ✅

3. **Dr. Linda Wijaya** - Pediatric & Child Development
   - Location: Jakarta Barat
   - Price: Rp 200,000/session
   - Rating: ⭐ 4.7 (89 reviews)
   - Status: Available ✅

4. **Dr. David Tan** - Back & Neck Pain
   - Location: Jakarta Timur
   - Price: Rp 225,000/session
   - Rating: ⭐ 4.6 (156 reviews)
   - Status: Available ✅

5. **Dr. Maya Putri** - Women Health & Pre/Post Natal
   - Location: Jakarta Selatan
   - Price: Rp 275,000/session
   - Rating: ⭐ 4.9 (78 reviews)
   - Status: Available ✅

6. **Dr. Ryan Pratama** - Cardiopulmonary & Respiratory
   - Location: Jakarta Pusat
   - Price: Rp 280,000/session
   - Rating: ⭐ 4.8 (134 reviews)
   - Status: Not Available ❌

---

## 🚀 Next Steps - START TESTING!

### 1. Start Backend Server

**Open Terminal 1:**
```bash
cd backend
npm run dev
```

Wait for:
```
🚀 Server is running on port 5000
📡 Environment: development
🔗 Health check: http://localhost:5000/health
```

### 2. Test Backend (Optional)

**Open Terminal 2:**
```bash
# Test health
curl http://localhost:5000/health

# Test therapist list
curl http://localhost:5000/api/therapists

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"patient1@example.com\",\"password\":\"password123\"}"
```

### 3. Configure Mobile App

**Edit:** `MobileFisioku/src/constants/config.ts`

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
// Get your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
export const API_URL = 'http://192.168.1.XXX:5000/api';
```

### 4. Start Mobile App

**Open Terminal 3:**
```bash
cd MobileFisioku
npm start
```

**Open Terminal 4:**
```bash
cd MobileFisioku
npm run android   # or: npm run ios
```

### 5. Test Mobile App! 🎉

**Testing Flow:**
1. App opens → Splash screen (2s)
2. Onboarding → Skip or swipe through
3. Login screen → Click "Register" or use existing patient
4. **Register new account** OR **Login with:**
   ```
   Email: patient1@example.com
   Password: password123
   ```
5. **Dashboard akan muncul dengan 6 therapist cards!** ✅

---

## 🎯 Expected Mobile App Dashboard

After login, you should see:

```
Hello, Budi Santoso!  (or your name)
Find your therapist and book an appointment

┌─────────────────────────────────────┐
│ [Image] Dr. Sarah Johnson          │
│ Sports Injury, Orthopedic...       │
│ ⭐ 4.8 (127) 📍 Jakarta Selatan    │
│ Rp 250,000/session    [Available]  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ [Image] Dr. Michael Chen           │
│ Neurological, Stroke...            │
│ ⭐ 4.9 (203) 📍 Jakarta Pusat      │
│ Rp 300,000/session    [Available]  │
└─────────────────────────────────────┘

... (4 more therapist cards)
```

---

## 🐳 Docker Commands Reference

### View Logs
```bash
docker logs fisioku-postgres
docker logs -f fisioku-postgres  # Follow logs
```

### Check Container Status
```bash
docker ps
docker ps -a  # All containers
```

### Stop PostgreSQL
```bash
cd backend
docker-compose down
```

### Start PostgreSQL Again
```bash
cd backend
docker-compose up -d
```

### Remove Container & Data (Clean Reset)
```bash
cd backend
docker-compose down -v  # -v removes volumes (deletes data!)
```

### Access PostgreSQL Shell
```bash
docker exec -it fisioku-postgres psql -U postgres -d fisioku_db
```

PostgreSQL commands:
```sql
-- List tables
\dt

-- Count therapists
SELECT COUNT(*) FROM therapists;

-- View therapists
SELECT name, location FROM therapists;

-- Exit
\q
```

---

## 🔍 Verify Everything is Working

### Backend Check ✅
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok",...}

curl http://localhost:5000/api/therapists
# Should return: Array of 6 therapists
```

### Database Check ✅
```bash
docker exec fisioku-postgres psql -U postgres -d fisioku_db -c "SELECT COUNT(*) FROM therapists;"
# Should return: 6
```

### Mobile App Check ✅
- App launches without crash ✅
- Can register new user ✅
- Can login with patient1@example.com ✅
- Dashboard shows 6 therapist cards ✅
- Pull-to-refresh works ✅

---

## 🎉 SUCCESS INDICATORS

You know everything is working when:

1. ✅ Docker container `fisioku-postgres` is running
2. ✅ Backend starts without errors (port 5000)
3. ✅ Health check returns OK
4. ✅ Mobile app connects to backend
5. ✅ Login works
6. ✅ Dashboard shows 6 therapists with details
7. ✅ No "Network Error" or "Connection Failed"

---

## 📱 Mobile App Screenshots You Should See

### Splash Screen
```
     Fisioku
Layanan Fisioterapi di Rumah
     [loading...]
```

### Onboarding
```
Screen 1: 🏠 Terapi di Rumah
Screen 2: 👨‍⚕️ Fisioterapis Berpengalaman
Screen 3: 📱 Booking Mudah & Aman
```

### Login
```
Welcome Back!
[Email input]
[Password input]
[Login button]
Don't have an account? [Register]
```

### Dashboard (Success!)
```
Hello, Budi Santoso!
Find your therapist and book an appointment

[6 Therapist Cards with:
 - Profile image/initial
 - Name & specialization
 - Rating & reviews
 - Location
 - Price
 - Availability badge]
```

---

## ⚠️ If Something Goes Wrong

### Backend won't start
```bash
# Check if port 5432 is available
netstat -ano | findstr :5432

# Restart Docker container
docker restart fisioku-postgres

# Check backend logs
cd backend
npm run dev  # Look for error messages
```

### Mobile app can't connect
```bash
# 1. Verify backend is running
curl http://localhost:5000/health

# 2. Check API_URL in mobile app
# MobileFisioku/src/constants/config.ts

# 3. For Android Emulator, MUST use:
export const API_URL = 'http://10.0.2.2:5000/api';
```

### Dashboard is empty
```bash
# Re-seed database
cd backend
npm run prisma:seed

# Verify data
docker exec fisioku-postgres psql -U postgres -d fisioku_db -c "SELECT COUNT(*) FROM therapists;"
```

---

## 🎯 Summary

✅ PostgreSQL Docker: **RUNNING**
✅ Database: **CREATED & SEEDED**
✅ Backend .env: **CONFIGURED**
✅ Data: **6 therapists ready**
✅ Credentials: **All users use password123**

**You are now ready to test the mobile app!** 🚀

---

## 📞 Quick Commands

```bash
# Start everything
cd backend
docker-compose up -d
npm run dev

# In another terminal
cd MobileFisioku
npm start
npm run android

# Stop PostgreSQL when done
cd backend
docker-compose down
```

---

**Happy Testing!** 🎉🚀

Login with `patient1@example.com / password123` and enjoy seeing 6 therapist cards on your dashboard!
