import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const kids = db.getKids();
    return NextResponse.json(kids);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch kids' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const kids = db.getKids();
    const newKid = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...body
    };
    kids.push(newKid);
    db.saveKids(kids);
    return NextResponse.json(newKid);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create kid' }, { status: 500 });
  }
}
