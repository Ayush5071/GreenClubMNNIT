import { NextRequest, NextResponse } from 'next/server';
import { Auth } from '@/lib/auth';
import { Database } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const user = await Auth.getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const problems = await Database.getProblems();
    
    return NextResponse.json({
      success: true,
      problems,
    });

  } catch (error) {
    console.error('Get problems error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await Auth.getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { title, description, category, priority, tags } = await request.json();

    if (!title || !description || !category || !priority) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const problem = await Database.createProblem({
      title,
      description,
      category,
      status: 'open',
      priority,
      reportedBy: user.email,
      tags: tags || [],
      comments: [],
      attachments: [],
    });

    return NextResponse.json({
      success: true,
      problem,
    });

  } catch (error) {
    console.error('Create problem error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
