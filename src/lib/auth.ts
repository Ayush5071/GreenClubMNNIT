import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface AuthUser {
  email: string;
  name: string;
  role: 'admin' | 'member';
}

export class Auth {
  private static JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
  private static AUTHORIZED_EMAILS = process.env.AUTHORIZED_EMAILS?.split(',') || [];
  private static ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
  private static LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '123456';

  static isAuthorizedEmail(email: string): boolean {
    return this.AUTHORIZED_EMAILS.includes(email);
  }

  static isAdmin(email: string): boolean {
    return email === this.ADMIN_EMAIL;
  }

  static verifyPassword(password: string): boolean {
    return password === this.LOGIN_PASSWORD;
  }

  static generateToken(user: AuthUser): string {
    return jwt.sign(user, this.JWT_SECRET, { expiresIn: '7d' });
  }

  static verifyToken(token: string): AuthUser | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as AuthUser;
    } catch (error) {
      return null;
    }
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('auth-token')?.value;
      if (!token) return null;
      
      return this.verifyToken(token);
    } catch (error) {
      return null;
    }
  }

  static getRole(email: string): 'admin' | 'member' {
    return this.isAdmin(email) ? 'admin' : 'member';
  }
}
