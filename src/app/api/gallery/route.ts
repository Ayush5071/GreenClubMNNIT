import { NextRequest, NextResponse } from 'next/server';
import { Auth } from '@/lib/auth';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = Auth.verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }, { status: 400 });
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = `img${timestamp}${extension}`;
    const filepath = path.join(process.cwd(), 'public', 'gallery', filename);

    // Save file
    await writeFile(filepath, new Uint8Array(buffer));

    return NextResponse.json({ 
      success: true, 
      filename: filename,
      path: `/gallery/${filename}`,
      message: 'Image uploaded successfully' 
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get list of all gallery images
    const fs = require('fs');
    const path = require('path');
    
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    const files = fs.readdirSync(galleryDir);
    
    const images = files
      .filter((file: string) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file: string) => `/gallery/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error getting gallery images:', error);
    return NextResponse.json({ error: 'Failed to get images' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = Auth.verifyToken(token);
    if (!decoded || !Auth.isAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { filename } = await request.json();
    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    // Delete file from filesystem
    const fs = require('fs').promises;
    const filepath = path.join(process.cwd(), 'public', 'gallery', filename);
    
    try {
      await fs.unlink(filepath);
      return NextResponse.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
