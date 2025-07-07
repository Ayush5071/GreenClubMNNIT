import { NextRequest, NextResponse } from 'next/server';
import { Auth } from '@/lib/auth';
import { Database } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await Auth.getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const updates = await request.json();

    // Get the existing problem to check ownership
    const existingProblem = await Database.getProblemById(id);
    
    if (!existingProblem) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      );
    }

    // Check authorization for different types of updates
    const isAdmin = user.role === 'admin';
    const isOwner = existingProblem.reportedBy === user.email;

    // Only admin can change status
    if (updates.status && !isAdmin) {
      return NextResponse.json(
        { error: 'Only administrators can change problem status' },
        { status: 403 }
      );
    }

    // Only admin or owner can update other fields
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: 'You can only edit problems you created' },
        { status: 403 }
      );
    }

    const problem = await Database.updateProblem(id, updates);

    if (!problem) {
      return NextResponse.json(
        { error: 'Failed to update problem' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      problem,
    });

  } catch (error) {
    console.error('Update problem error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await Auth.getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    // Get the existing problem to check ownership
    const existingProblem = await Database.getProblemById(id);
    
    if (!existingProblem) {
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      );
    }

    // Check authorization: admin can delete any problem, users can only delete their own
    const isAdmin = user.role === 'admin';
    const isOwner = existingProblem.reportedBy === user.email;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: 'You can only delete problems you created, or be an admin' },
        { status: 403 }
      );
    }

    const deleted = await Database.deleteProblem(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete problem' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Problem deleted successfully',
    });

  } catch (error) {
    console.error('Delete problem error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
