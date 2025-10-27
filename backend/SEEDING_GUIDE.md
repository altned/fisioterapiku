# 🌱 Database Seeding Guide

## Overview

Script seeding ini akan mengisi database dengan data dummy untuk testing dan development.

## Data yang Akan Dibuat

### 👤 Admin User (1)
- **Email**: admin@fisioku.com
- **Password**: password123
- **Role**: ADMIN

### 👥 Patient Users (3)
- **patient1@example.com** - Budi Santoso
- **patient2@example.com** - Siti Nurhaliza
- **patient3@example.com** - Ahmad Wijaya
- **Password**: password123 (untuk semua)

### 👨‍⚕️ Therapist Users (6)
1. **Dr. Sarah Johnson** - Sports Injury & Orthopedic
   - Email: therapist1@fisioku.com
   - Location: Jakarta Selatan
   - Price: Rp 250,000/session
   - Rating: 4.8 ⭐ (127 reviews)
   - Status: Available ✅

2. **Dr. Michael Chen** - Neurological & Stroke
   - Email: therapist2@fisioku.com
   - Location: Jakarta Pusat
   - Price: Rp 300,000/session
   - Rating: 4.9 ⭐ (203 reviews)
   - Status: Available ✅

3. **Dr. Linda Wijaya** - Pediatric & Child Development
   - Email: therapist3@fisioku.com
   - Location: Jakarta Barat
   - Price: Rp 200,000/session
   - Rating: 4.7 ⭐ (89 reviews)
   - Status: Available ✅

4. **Dr. David Tan** - Back & Neck Pain
   - Email: therapist4@fisioku.com
   - Location: Jakarta Timur
   - Price: Rp 225,000/session
   - Rating: 4.6 ⭐ (156 reviews)
   - Status: Available ✅

5. **Dr. Maya Putri** - Women Health & Pre/Post Natal
   - Email: therapist5@fisioku.com
   - Location: Jakarta Selatan
   - Price: Rp 275,000/session
   - Rating: 4.9 ⭐ (78 reviews)
   - Status: Available ✅

6. **Dr. Ryan Pratama** - Cardiopulmonary & Respiratory
   - Email: therapist6@fisioku.com
   - Location: Jakarta Pusat
   - Price: Rp 280,000/session
   - Rating: 4.8 ⭐ (134 reviews)
   - Status: **Not Available** ❌

### 📅 Availability
Semua therapist memiliki jadwal:
- **Monday - Friday**: 09:00 - 17:00
- **Saturday**: 09:00 - 13:00
- **Sunday**: Off

### 📝 Sample Booking (1)
- Patient: Budi Santoso
- Therapist: Dr. Sarah Johnson
- Date: 2025-10-28
- Time: 10:00
- Status: CONFIRMED
- Payment: PENDING

## How to Run

### 1. Pastikan Database Ready
```bash
# Pastikan PostgreSQL running
# Pastikan DATABASE_URL sudah dikonfigurasi di .env
```

### 2. Push Database Schema
```bash
npm run prisma:push
```

### 3. Run Seed Script
```bash
npm run prisma:seed
```

### Expected Output:
```
🌱 Starting database seeding...
🗑️  Cleaning existing data...
✅ Cleaned existing data
👤 Creating admin user...
✅ Admin user created: admin@fisioku.com
👥 Creating patient users...
✅ Patient created: Budi Santoso
✅ Patient created: Siti Nurhaliza
✅ Patient created: Ahmad Wijaya
👨‍⚕️ Creating therapist users...
✅ Therapist created: Dr. Sarah Johnson, S.Ft, Physio
✅ Therapist created: Dr. Michael Chen, S.Ft
✅ Therapist created: Dr. Linda Wijaya, S.Ft, Physio
✅ Therapist created: Dr. David Tan, S.Ft
✅ Therapist created: Dr. Maya Putri, S.Ft, Physio
✅ Therapist created: Dr. Ryan Pratama, S.Ft
📅 Creating therapist availability...
✅ Availability created for all therapists
📝 Creating sample bookings...
✅ Sample booking created

🎉 Seeding completed successfully!

📊 Summary:
   - Admin users: 1
   - Patients: 3
   - Therapists: 6
   - Bookings: 1

🔑 Login Credentials:
   Admin: admin@fisioku.com / password123
   Patient: patient1@example.com / password123
   Therapist: therapist1@fisioku.com / password123
   (All users have password: password123)
```

## Testing with Mobile App

### 1. Register New User (via Mobile App)
```
- Buka mobile app
- Klik "Register"
- Isi data baru
```

### 2. Login with Existing Patient
```
Email: patient1@example.com
Password: password123
```

### 3. View Therapist List
```
- Login sukses → Dashboard
- Akan muncul 6 therapist cards
- 5 available, 1 busy
```

### 4. Login as Therapist (via API/Postman)
```json
POST http://localhost:5000/api/auth/login
{
  "email": "therapist1@fisioku.com",
  "password": "password123"
}
```

## Verify Data

### Via Prisma Studio
```bash
npm run prisma:studio
```
Open: http://localhost:5555

### Via API
```bash
# Get all therapists
curl http://localhost:5000/api/therapists

# Login as patient
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient1@example.com","password":"password123"}'
```

## Clean & Re-seed

Jika ingin reset data:

```bash
# Hapus semua data dan seed ulang
npm run prisma:seed
```

Script akan otomatis membersihkan data lama sebelum insert data baru.

## Notes

⚠️ **IMPORTANT:**
- Semua user menggunakan password: `password123`
- Data ini hanya untuk **development/testing**
- **JANGAN** gunakan di production
- Ganti password di production dengan password yang strong

## Troubleshooting

### Error: P2002 (Unique constraint failed)
```
Cause: Data sudah ada
Solution: Script akan auto-clean, jalankan ulang
```

### Error: P1001 (Can't reach database server)
```
Cause: PostgreSQL tidak running
Solution: Start PostgreSQL service
```

### Error: ECONNREFUSED
```
Cause: DATABASE_URL salah
Solution: Cek .env file
```

## Next Steps

Setelah seeding sukses:
1. ✅ Start backend: `npm run dev`
2. ✅ Configure mobile app API_URL
3. ✅ Run mobile app: `npm run android`
4. ✅ Login dengan patient1@example.com
5. ✅ Dashboard akan menampilkan 6 therapist! 🎉

---

**Happy Testing!** 🚀
