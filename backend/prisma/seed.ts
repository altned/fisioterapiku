import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Cleaning existing data...');
  await prisma.review.deleteMany();
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.session.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.therapist.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  console.log('👤 Creating admin user...');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@fisioku.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  // Create Patient Users
  console.log('👥 Creating patient users...');
  const patients = [];
  
  const patientData = [
    {
      email: 'patient1@example.com',
      name: 'Budi Santoso',
      phone: '081234567890',
      dateOfBirth: new Date('1990-05-15'),
      gender: 'male',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    },
    {
      email: 'patient2@example.com',
      name: 'Siti Nurhaliza',
      phone: '081234567891',
      dateOfBirth: new Date('1985-08-20'),
      gender: 'female',
      address: 'Jl. Gatot Subroto No. 456, Jakarta Pusat',
    },
    {
      email: 'patient3@example.com',
      name: 'Ahmad Wijaya',
      phone: '081234567892',
      dateOfBirth: new Date('1992-03-10'),
      gender: 'male',
      address: 'Jl. Thamrin No. 789, Jakarta Pusat',
    },
  ];

  for (const data of patientData) {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: UserRole.PATIENT,
        isActive: true,
        emailVerified: true,
        patient: {
          create: {
            name: data.name,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            address: data.address,
            emergencyContact: {
              name: 'Emergency Contact',
              phone: '081999999999',
              relationship: 'Family',
            },
          },
        },
      },
      include: {
        patient: true,
      },
    });
    patients.push(user.patient);
    console.log('✅ Patient created:', data.name);
  }

  // Create Therapist Users
  console.log('👨‍⚕️ Creating therapist users...');
  const therapists = [];

  const therapistData = [
    {
      email: 'therapist1@fisioku.com',
      name: 'Dr. Sarah Johnson, S.Ft, Physio',
      phone: '081234560001',
      bidang: ['Fisioterapi Muskuloskeletal', 'Fisioterapi Olahraga'],
      experience: 8,
      rating: 4.8,
      reviewCount: 127,
      location: 'Jakarta Selatan',
      pricePerSession: 250000,
      bio: 'Ahli di bidang fisioterapi muskuloskeletal dan olahraga dengan pengalaman 8 tahun. Menangani atlet profesional dan masyarakat umum.',
      qualifications: [
        'S1 Fisioterapi - Universitas Indonesia',
        'Pelatihan Fisioterapi Olahraga',
        'Sertifikasi Manual Terapi',
      ],
      isAvailable: true,
    },
    {
      email: 'therapist2@fisioku.com',
      name: 'Dr. Michael Chen, S.Ft',
      phone: '081234560002',
      bidang: ['Fisioterapi Neuromuskular', 'Fisioterapi Geriatrik'],
      experience: 10,
      rating: 4.9,
      reviewCount: 203,
      location: 'Jakarta Pusat',
      pricePerSession: 300000,
      bio: 'Ahli di bidang fisioterapi neuromuskular dengan fokus pada pemulihan pasca stroke dan penanganan lansia.',
      qualifications: [
        'S1 Fisioterapi - Universitas Airlangga',
        'S2 Rehabilitasi Neuro',
        'Pelatihan Fisioterapi Geriatrik',
      ],
      isAvailable: true,
    },
    {
      email: 'therapist3@fisioku.com',
      name: 'Dr. Linda Wijaya, S.Ft, Physio',
      phone: '081234560003',
      bidang: ['Fisioterapi Pediatrik'],
      experience: 6,
      rating: 4.7,
      reviewCount: 89,
      location: 'Jakarta Barat',
      pricePerSession: 200000,
      bio: 'Ahli di bidang fisioterapi pediatrik dengan pendekatan yang ramah dan menyenangkan untuk anak-anak.',
      qualifications: [
        'S1 Fisioterapi - Universitas Padjadjaran',
        'Pelatihan Fisioterapi Pediatrik',
        'Sertifikasi Tumbuh Kembang Anak',
      ],
      isAvailable: true,
    },
    {
      email: 'therapist4@fisioku.com',
      name: 'Dr. David Tan, S.Ft',
      phone: '081234560004',
      bidang: ['Fisioterapi Muskuloskeletal'],
      experience: 7,
      rating: 4.6,
      reviewCount: 156,
      location: 'Jakarta Timur',
      pricePerSession: 225000,
      bio: 'Ahli di bidang fisioterapi muskuloskeletal, fokus pada penanganan nyeri punggung, leher, dan koreksi postur tubuh.',
      qualifications: [
        'S1 Fisioterapi - Universitas Hasanuddin',
        'Sertifikasi Manual Terapi',
        'Pelatihan Postural Assessment',
      ],
      isAvailable: true,
    },
    {
      email: 'therapist5@fisioku.com',
      name: 'Dr. Maya Putri, S.Ft, Physio',
      phone: '081234560005',
      bidang: ['Fisioterapi Obstetri dan Ginekologi'],
      experience: 5,
      rating: 4.9,
      reviewCount: 78,
      location: 'Jakarta Selatan',
      pricePerSession: 275000,
      bio: 'Ahli di bidang fisioterapi obstetri dan ginekologi, menangani ibu hamil, pasca melahirkan, dan kesehatan wanita.',
      qualifications: [
        'S1 Fisioterapi - Universitas Indonesia',
        'Pelatihan Fisioterapi Obstetri & Ginekologi',
        'Sertifikasi Perawatan Pre/Post Natal',
      ],
      isAvailable: true,
    },
    {
      email: 'therapist6@fisioku.com',
      name: 'Dr. Ryan Pratama, S.Ft',
      phone: '081234560006',
      bidang: ['Fisioterapi Kardiopulmoner'],
      experience: 9,
      rating: 4.8,
      reviewCount: 134,
      location: 'Jakarta Pusat',
      pricePerSession: 280000,
      bio: 'Ahli di bidang fisioterapi kardiopulmoner, menangani rehabilitasi jantung, paru-paru, dan pemulihan pasca operasi.',
      qualifications: [
        'S1 Fisioterapi - Universitas Gadjah Mada',
        'S2 Rehabilitasi Kardiopulmoner',
        'Pelatihan Rehabilitasi Pasca Operasi',
      ],
      isAvailable: false, // Not available
    },
  ];

  for (const data of therapistData) {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: UserRole.THERAPIST,
        isActive: true,
        emailVerified: true,
        therapist: {
          create: {
            name: data.name,
            phone: data.phone,
            bidang: data.bidang,
            experience: data.experience,
            rating: data.rating,
            reviewCount: data.reviewCount,
            location: data.location,
            pricePerSession: data.pricePerSession,
            bio: data.bio,
            qualifications: data.qualifications,
            isAvailable: data.isAvailable,
          },
        },
      },
      include: {
        therapist: true,
      },
    });
    therapists.push(user.therapist);
    console.log('✅ Therapist created:', data.name);
  }

  // Create Availability for Therapists
  console.log('📅 Creating therapist availability...');
  for (const therapist of therapists) {
    // Monday to Friday, 9 AM - 5 PM
    for (let day = 1; day <= 5; day++) {
      await prisma.availability.create({
        data: {
          therapistId: therapist!.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '17:00',
          isActive: true,
        },
      });
    }
    // Saturday, 9 AM - 1 PM
    await prisma.availability.create({
      data: {
        therapistId: therapist!.id,
        dayOfWeek: 6,
        startTime: '09:00',
        endTime: '13:00',
        isActive: true,
      },
    });
  }
  console.log('✅ Availability created for all therapists');

  // Create some sample bookings
  console.log('📝 Creating sample bookings...');
  if (patients.length > 0 && therapists.length > 0) {
    const booking1 = await prisma.booking.create({
      data: {
        patientId: patients[0]!.id,
        therapistId: therapists[0]!.id,
        appointmentDate: new Date('2025-10-28'),
        appointmentTime: '10:00',
        location: patients[0]!.address!,
        complaint: 'Nyeri punggung bawah setelah olahraga',
        medicalHistory: 'Pernah cedera punggung 2 tahun lalu',
        status: 'CONFIRMED',
      },
    });

    // Create payment for booking
    await prisma.payment.create({
      data: {
        bookingId: booking1.id,
        amount: therapists[0]!.pricePerSession,
        method: 'BANK_TRANSFER',
        status: 'PENDING',
      },
    });

    console.log('✅ Sample booking created');
  }

  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Admin users: 1`);
  console.log(`   - Patients: ${patients.length}`);
  console.log(`   - Therapists: ${therapists.length}`);
  console.log(`   - Bookings: 1`);
  console.log('\n🔑 Login Credentials:');
  console.log('   Admin: admin@fisioku.com / password123');
  console.log('   Patient: patient1@example.com / password123');
  console.log('   Therapist: therapist1@fisioku.com / password123');
  console.log('   (All users have password: password123)\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
