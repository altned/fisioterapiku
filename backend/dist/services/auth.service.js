"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = __importDefault(require("../config/database"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const client_1 = require("@prisma/client");
class AuthService {
    static async register(data) {
        const existingUser = await database_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('Email already registered');
        }
        const hashedPassword = await password_1.PasswordUtil.hash(data.password);
        const user = await database_1.default.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role,
            },
        });
        if (data.role === client_1.UserRole.PATIENT) {
            await database_1.default.patient.create({
                data: {
                    userId: user.id,
                    name: data.name,
                    phone: data.phone,
                },
            });
        }
        else if (data.role === client_1.UserRole.THERAPIST) {
            await database_1.default.therapist.create({
                data: {
                    userId: user.id,
                    name: data.name,
                    phone: data.phone,
                    bidang: [],
                    qualifications: [],
                },
            });
        }
        const accessToken = jwt_1.JwtUtil.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshToken = jwt_1.JwtUtil.generateRefreshToken({
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
    static async login(data) {
        const user = await database_1.default.user.findUnique({
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
        const isPasswordValid = await password_1.PasswordUtil.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const accessToken = jwt_1.JwtUtil.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshToken = jwt_1.JwtUtil.generateRefreshToken({
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
    static async refreshToken(token) {
        try {
            const decoded = jwt_1.JwtUtil.verifyRefreshToken(token);
            const user = await database_1.default.user.findUnique({
                where: { id: decoded.id },
            });
            if (!user || !user.isActive) {
                throw new Error('Invalid refresh token');
            }
            const accessToken = jwt_1.JwtUtil.generateAccessToken({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            return { accessToken };
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    static async getProfile(userId) {
        const user = await database_1.default.user.findUnique({
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
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map