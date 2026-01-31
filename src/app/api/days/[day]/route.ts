import { NextResponse } from 'next/server';
import { getDayContent } from '../../../../data/days';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ day: string }> }
) {
  const { day } = await params;
  const dayNum = Math.min(Math.max(1, Number(day || 1)), 365);
  const content = getDayContent(dayNum);
  return NextResponse.json(content, { status: 200 });
}
