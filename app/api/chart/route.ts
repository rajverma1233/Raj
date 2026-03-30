import { NextResponse } from 'next/server';
import { getEvHistory } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hours = parseInt(searchParams.get('hours') || '1');
  const now = Date.now();
  const range = hours * 60 * 60 * 1000;

  const data = getEvHistory().filter(e => now - e.time <= range);

  return NextResponse.json(data);
}
