import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const kids = db.getKids();
    const kid = kids.find((k: any) => k.id === params.id);
    if (!kid) return NextResponse.json({ error: 'Kid not found' }, { status: 404 });
    return NextResponse.json(kid);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch kid' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const kids = db.getKids();
    const index = kids.findIndex((k: any) => k.id === params.id);
    
    if (index === -1) return NextResponse.json({ error: 'Kid not found' }, { status: 404 });
    
    kids[index] = { ...kids[index], ...body, updatedAt: new Date().toISOString() };
    db.saveKids(kids);
    
    return NextResponse.json(kids[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update kid' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const kids = db.getKids();
    const filteredKids = kids.filter((k: any) => k.id !== params.id);
    db.saveKids(filteredKids);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete kid' }, { status: 500 });
  }
}
