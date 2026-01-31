import { NextResponse } from 'next/server';
import days from '../../../data/days';

export async function GET() {
  return NextResponse.json(days, { status: 200 });
}
