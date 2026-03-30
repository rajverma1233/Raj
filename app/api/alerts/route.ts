import { NextResponse } from 'next/server';
import { getEvHistory } from '@/lib/store';

export async function GET() {
  const alerts = getEvHistory()
    .filter(e => e.ev > 0.05)
    .slice(-20);

  return NextResponse.json(alerts);
}
