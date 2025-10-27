# 🐘 PostgreSQL Setup Guide

## Masalah yang Terjadi

Error saat menjalankan `npm run prisma:seed`:
```
Can't reach database server at `localhost:5432`
```

**Penyebab:** PostgreSQL belum terinstall atau tidak running.

---

## ✅ Solusi 1: Install PostgreSQL (RECOMMENDED)

### Step 1: Download PostgreSQL

**Windows:**
1. Kunjungi: https://www.postgresql.org/download/windows/
2. Atau langsung: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
3. Download versi terbaru (PostgreSQL 16.x)
4. File size: ~400MB

### Step 2: Install PostgreSQL

1. **Run installer** (double-click .exe)
2. **Installation Directory**: Default (C:\Program Files\PostgreSQL\16)
3. **Select Components**:
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4
   - ✅ Stack Builder (optional)
   - ✅ Command Line Tools
4. **Data Directory**: Default
5. **Password**: 
   - Masukkan password untuk user `postgres`
   - **PENTING: Ingat password ini!**
   - Contoh: `postgres123`
6. **Port**: 5432 (default)
7. **Locale**: Default locale
8. **Install** → Wait ~5 minutes

### Step 3: Verify Installation

**Option A: Via pgAdmin**
1. Buka **pgAdmin 4** (dari Start Menu)
2. Set Master Password (untuk pgAdmin)
3. Expand "Servers" → "PostgreSQL 16"
4. Masukkan password postgres
5. Jika berhasil login → ✅ PostgreSQL running!

**Option B: Via Command Line**
```bash
# Cek PostgreSQL service
Get-Service -Name "*postgres*"

# Should show:
# Status: Running
```

### Step 4: Create Database

**Via pgAdmin:**
1. Buka pgAdmin 4
2. Login ke PostgreSQL
3. Right-click **"Databases"**
4. **Create** → **Database**
5. Database name: `fisioku_db`
6. Owner: postgres
7. **Save**

**Via Command Line (if psql available):**
```bash
psql -U postgres
CREATE DATABASE fisioku_db;
\q
```

### Step 5: Update Backend .env

Edit `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fisioku_db?schema=public"
```

Replace `YOUR_PASSWORD` dengan password yang Anda buat saat install.

**Contoh:**
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/fisioku_db?schema=public"
```

### Step 6: Test Connection

```bash
cd backend
npm run prisma:push
```

Expected output:
```
✔ Generated Prisma Client
🚀 Database synchronized
```

### Step 7: Seed Database

```bash
npm run prisma:seed
```

Expected output:
```
🌱 Starting database seeding...
✅ Admin user created
✅ 3 Patients created
✅ 6 Therapists created
🎉 Seeding completed successfully!
```

✅ **Done! PostgreSQL is ready!**

---

## ✅ Solusi 2: Gunakan Docker (Alternative)

Jika Anda punya Docker installed:

### Step 1: Install Docker Desktop

Download dari: https://www.docker.com/products/docker-desktop/

### Step 2: Start PostgreSQL Container

```bash
cd backend
docker-compose up -d
```

File `docker-compose.yml` sudah dibuat dengan config:
- User: postgres
- Password: postgres123
- Database: fisioku_db
- Port: 5432

### Step 3: Update .env

Copy file `.env.docker`:
```bash
cp .env.docker .env
```

Atau edit `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/fisioku_db?schema=public"
```

### Step 4: Wait for PostgreSQL Ready

```bash
docker-compose ps
# Wait until Status shows "healthy"
```

### Step 5: Run Migrations & Seed

```bash
npm run prisma:push
npm run prisma:seed
```

### Stop PostgreSQL (when done):
```bash
docker-compose down
```

### Start PostgreSQL again:
```bash
docker-compose up -d
```

✅ **Done! Docker PostgreSQL is ready!**

---

## 🔍 Troubleshooting

### Issue 1: Port 5432 Already in Use

**Solution:**
```bash
# Check what's using port 5432
netstat -ano | findstr :5432

# Stop the process or change port in docker-compose.yml
# Change to 5433:
ports:
  - "5433:5432"

# Then update DATABASE_URL:
DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/fisioku_db?schema=public"
```

### Issue 2: PostgreSQL Service Not Starting

**Solution:**
```bash
# Windows Services
services.msc
# Find "postgresql-x64-16"
# Right-click → Start

# Or via PowerShell (as Admin):
Start-Service postgresql-x64-16
```

### Issue 3: Can't Connect to Database

**Check:**
1. ✅ PostgreSQL service running?
2. ✅ Database `fisioku_db` created?
3. ✅ Password correct in .env?
4. ✅ Port 5432 not blocked by firewall?

**Test connection:**
```bash
# Via pgAdmin: Should be able to connect
# Via code:
npm run prisma:studio
# Opens: http://localhost:5555
```

### Issue 4: Permission Denied

**Solution:**
```bash
# Run PowerShell as Administrator
# Or check user has permissions in PostgreSQL
```

---

## 📊 Which Solution to Choose?

### Use **Native PostgreSQL** if:
- ✅ You want permanent installation
- ✅ You'll use PostgreSQL for other projects
- ✅ You prefer GUI tools (pgAdmin)
- ✅ You don't have Docker

### Use **Docker PostgreSQL** if:
- ✅ You already have Docker
- ✅ You want clean/isolated installation
- ✅ You want easy start/stop
- ✅ You want quick setup without installer

---

## 🎯 Quick Reference

### Native PostgreSQL

**Start Service:**
```bash
Start-Service postgresql-x64-16
```

**Stop Service:**
```bash
Stop-Service postgresql-x64-16
```

**pgAdmin:**
- URL: http://localhost:80/pgadmin4
- Or: Start Menu → pgAdmin 4

### Docker PostgreSQL

**Start:**
```bash
docker-compose up -d
```

**Stop:**
```bash
docker-compose down
```

**Logs:**
```bash
docker-compose logs -f postgres
```

**Enter container:**
```bash
docker exec -it fisioku-postgres psql -U postgres -d fisioku_db
```

---

## ✅ After Setup Checklist

After PostgreSQL is installed and running:

```bash
# 1. Update .env with correct password
# 2. Push schema
cd backend
npm run prisma:push

# 3. Seed database
npm run prisma:seed

# 4. Start backend
npm run dev

# 5. Test
curl http://localhost:5000/health
```

---

## 🎉 Next Steps

Once PostgreSQL is ready:
1. ✅ Run `npm run prisma:seed` to populate data
2. ✅ Start backend with `npm run dev`
3. ✅ Configure mobile app API_URL
4. ✅ Run mobile app with `npm run android`
5. ✅ Test login with patient1@example.com

---

**Choose your preferred solution and follow the steps!** 🚀

Need help? Check the error message and refer to Troubleshooting section.
