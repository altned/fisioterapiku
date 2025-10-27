import prisma from '../config/database';
import { PasswordUtil } from '../utils/password';
import { JwtUtil } from '../utils/jwt';
import { UserRole } from '@prisma/client';

interface RegisterData {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  static async register(data: RegisterData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await PasswordUtil.hash(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    if (data.role === UserRole.PATIENT) {
      await prisma.patient.create({
        data: {
          userId: user.id,
          name: data.name,
          phone: data.phone,
        },
      });
    } else if (data.role === UserRole.THERAPIST) {
      await prisma.therapist.create({
        data: {
          userId: user.id,
          name: data.name,
          phone: data.phone,
          specialization: [],
          qualifications: [],
        },
      });
    }

    const accessToken = JwtUtil.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = JwtUtil.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  static async login(data: LoginData) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        patient: true,
        therapist: true,
      },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    const isPasswordValid = await PasswordUtil.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const accessToken = JwtUtil.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = JwtUtil.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.patient || user.therapist,
      },
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(token: string) {
    try {
      const decoded = JwtUtil.verifyRefreshToken(token);

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
      }

      const accessToken = JwtUtil.generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true,
        therapist: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      patient: user.patient,
      therapist: user.therapist,
    };
  }
}
