import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const payments = db.getPayments();
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payments = db.getPayments();
    const newPayment = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...body
    };
    payments.push(newPayment);
    db.savePayments(payments);
    return NextResponse.json(newPayment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
