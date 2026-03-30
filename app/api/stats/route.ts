import { NextResponse } from 'next/server';
import { getEvHistory } from '@/lib/store';

export async function GET() {
  const history = getEvHistory();
  const total = history.length;
  const positive = history.filter(e => e.ev > 0).length;
  const negative = total - positive;

  return NextResponse.json({
    totalBets: total,
    positiveEV: positive,
    negativeEV: negative,
    winRate: total ? ((positive / total) * 100).toFixed(2) : 0
  });
}
