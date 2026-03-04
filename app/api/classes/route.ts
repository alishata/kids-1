import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const classes = db.getClasses();
    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const classes = db.getClasses();
    const newClass = {
      id: Date.now().toString(),
      ...body
    };
    classes.push(newClass);
    db.saveClasses(classes);
    return NextResponse.json(newClass);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}
