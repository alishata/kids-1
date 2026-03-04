import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const classes = db.getClasses();
    const index = classes.findIndex((c: any) => c.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    classes[index] = { ...classes[index], ...body };
    db.saveClasses(classes);
    return NextResponse.json(classes[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update class' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const classes = db.getClasses();
    const filtered = classes.filter((c: any) => c.id !== id);
    db.saveClasses(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete class' }, { status: 500 });
  }
}
