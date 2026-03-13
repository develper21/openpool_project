import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import { AppError } from '../../middleware/error';
import { generateApiKey } from '../../utils/apiKey';
import { RegisterInput, LoginInput } from './auth.schema';
import { Role } from '../../types';

export class AuthService {
  static async generateTokenPair(userId: string, email: string, role: string) {
    const accessToken = jwt.sign(
      { userId, email, role },
      env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId },
      env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  static async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const apiKey = generateApiKey();

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
        apiKey,
      },
    });

    const tokens = await this.generateTokenPair(user.id, user.email, user.role);

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);

    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    const tokens = await this.generateTokenPair(user.id, user.email, user.role);
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  static async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || !user.isActive) {
        throw new AppError('Invalid or expired refresh token', 401);
      }

      const tokens = await this.generateTokenPair(user.id, user.email, user.role);
      
      return tokens;
    } catch (error) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }

  static async regenerateApiKey(userId: string) {
    const newApiKey = generateApiKey();
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { apiKey: newApiKey },
    });

    return { apiKey: user.apiKey };
  }
}
