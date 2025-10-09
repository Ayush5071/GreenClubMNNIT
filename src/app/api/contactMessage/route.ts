import { NextRequest, NextResponse } from 'next/server';
import { ContactMessage } from '@/lib/contactMessage';
import dbConnect from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { name, contact, message } = await request.json();
    if (!name || !contact || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    await dbConnect();
    const newMessage = await ContactMessage.create({ name, contact, message });
    return NextResponse.json({ message: 'Message saved', data: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
