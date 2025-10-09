import { NextRequest, NextResponse } from 'next/server';
import { Auth } from '@/lib/auth';
import { Database } from '@/lib/database';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if email is authorized
    if (!Auth.isAuthorizedEmail(email)) {
      return NextResponse.json(
        { error: 'You are not authorized to access this system' },
        { status: 403 }
      );
    }

    // Verify password
    if (!Auth.verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Get or create user in database
    let user = await Database.getUserByEmail(email);
    const role = Auth.getRole(email);
    
    if (!user) {
      // Create new user
      user = await Database.createUser({
        email,
        name: email.split('@')[0], // Use email prefix as default name
        role,
        loginCount: 1,
        lastLogin: new Date(),
        isActive: true,
      });
    } else {
      // Update existing user
      user = await Database.updateUser(email, {
        loginCount: user.loginCount + 1,
        lastLogin: new Date(),
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create or update user' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const authUser = {
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = Auth.generateToken(authUser);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 20 * 60, // 20 minutes
  path: '/',
    });

    return NextResponse.json({
      success: true,
      user: authUser,
      message: 'Login successful',
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
