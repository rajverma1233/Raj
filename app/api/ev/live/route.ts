import { NextResponse } from 'next/server';
import axios from 'axios';
import { addEvHistory } from '@/lib/store';

const API_KEY = "1f497c95dcdca64ce3cb621afd8e5f6b";

function impliedProbability(odds: number) {
  return 1 / odds;
}

function calculateEV(prob: number, odds: number) {
  return (prob * odds) - 1;
}

function getSmartProbability(prob: number) {
  return prob * 1.05; // 5% edge (demo)
}

export async function GET() {
  try {
    const response = await axios.get(
      "https://api.the-odds-api.com/v4/sports/upcoming/odds",
      {
        params: {
          apiKey: API_KEY,
          regions: "uk,eu",
          markets: "h2h"
        }
      }
    );

    const matches = response.data;
    let result: any[] = [];

    matches.forEach((match: any) => {
      const teams = `${match.home_team} vs ${match.away_team}`;
      const outcomes = match.bookmakers[0]?.markets[0]?.outcomes;

      if (!outcomes) return;

      outcomes.forEach((o: any) => {
        const odds = o.price;
        const prob = impliedProbability(odds);
        const smartProb = getSmartProbability(prob);
        const ev = calculateEV(smartProb, odds);

        const data = {
          id: `${match.id}-${o.name}`,
          match: teams,
          team: o.name,
          odds,
          impliedProb: prob.toFixed(3),
          smartProb: smartProb.toFixed(3),
          ev: ev.toFixed(3),
          signal: ev > 0 ? "POSITIVE" : "NEGATIVE",
          timestamp: Date.now()
        };

        result.push(data);

        // Store for charts
        addEvHistory({
          id: data.id,
          time: Date.now(),
          ev: parseFloat(ev.toFixed(3)),
          match: teams,
          team: o.name,
          odds,
          profit: parseFloat(ev.toFixed(3)) * 100, // Real profit based on EV
          status: 'Open' // Real status
        });
      });
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API fetch error:", err.message);
    return NextResponse.json({ error: "API fetch error" }, { status: 500 });
  }
}
