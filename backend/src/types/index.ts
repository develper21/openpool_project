import { Request } from 'express';

// Prisma's Role Enum representation or simple string type to match DB
export enum Role {
  ADMIN = 'ADMIN',
  RESEARCHER = 'RESEARCHER',
  VIEWER = 'VIEWER',
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role | string;
    apiKey: string;
  };
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | Array<{ field: string; message: string }>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
