import { useState, useEffect, useCallback, useRef } from 'react';

export type Sport = 'Football' | 'Cricket' | 'Tennis' | 'Basketball';

export interface Bet {
  id: string;
  matchName: string;
  sport: Sport;
  selection: string;
  odds: number;
  trueProbability: number;
  ev: number;
  stake: number;
  status: 'Open' | 'Won' | 'Lost';
  placedAt: number; // timestamp
  resolvedAt?: number;
  profit?: number;
  evHistory: { time: number; ev: number }[];
  placementEv: number;
}

export interface Alert {
  id: string;
  message: string;
  ev: number;
  time: number;
  read: boolean;
}

const MATCHES = [
  { name: 'India vs Australia', sport: 'Cricket' },
  { name: 'Man City vs Arsenal', sport: 'Football' },
  { name: 'Lakers vs Warriors', sport: 'Basketball' },
  { name: 'Djokovic vs Alcaraz', sport: 'Tennis' },
  { name: 'Real Madrid vs Barcelona', sport: 'Football' },
  { name: 'England vs South Africa', sport: 'Cricket' },
  { name: 'Celtics vs Heat', sport: 'Basketball' },
  { name: 'Swiatek vs Sabalenka', sport: 'Tennis' },
];

const SELECTIONS = ['Moneyline', 'Over 2.5', 'Under 2.5', 'Handicap -1.5', 'Next Goal'];

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function calculateEV(probability: number, odds: number) {
  return (probability * odds) - 1;
}

export function useMarketSimulation() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  // Initialize with some historical data
  useEffect(() => {
    const now = Date.now();
    const initialBets: Bet[] = [];
    
    // Generate some closed bets for the past 7 days
    for (let i = 0; i < 50; i++) {
      const placedAt = now - Math.random() * 7 * 24 * 60 * 60 * 1000;
      const match = MATCHES[Math.floor(Math.random() * MATCHES.length)];
      const trueProb = 0.3 + Math.random() * 0.5;
      const placementOdds = (1 / trueProb) + (Math.random() * 0.2 - 0.05); // Slight edge or negative
      const placementEv = calculateEV(trueProb, placementOdds);
      const stake = 10 + Math.floor(Math.random() * 90);
      const isWin = Math.random() < trueProb;
      
      initialBets.push({
        id: generateId(),
        matchName: match.name,
        sport: match.sport as Sport,
        selection: SELECTIONS[Math.floor(Math.random() * SELECTIONS.length)],
        odds: placementOdds,
        trueProbability: trueProb,
        ev: placementEv,
        placementEv,
        stake,
        status: isWin ? 'Won' : 'Lost',
        placedAt,
        resolvedAt: placedAt + 2 * 60 * 60 * 1000, // 2 hours later
        profit: isWin ? stake * (placementOdds - 1) : -stake,
        evHistory: [{ time: placedAt, ev: placementEv }]
      });
    }
    
    // Generate some open bets
    for (let i = 0; i < 8; i++) {
      const placedAt = now - Math.random() * 2 * 60 * 60 * 1000;
      const match = MATCHES[Math.floor(Math.random() * MATCHES.length)];
      const trueProb = 0.4 + Math.random() * 0.4;
      const odds = (1 / trueProb) + (Math.random() * 0.15); // Mostly +EV
      const ev = calculateEV(trueProb, odds);
      
      initialBets.push({
        id: generateId(),
        matchName: match.name,
        sport: match.sport as Sport,
        selection: SELECTIONS[Math.floor(Math.random() * SELECTIONS.length)],
        odds,
        trueProbability: trueProb,
        ev,
        placementEv: ev,
        stake: 25 + Math.floor(Math.random() * 75),
        status: 'Open',
        placedAt,
        evHistory: [{ time: placedAt, ev }]
      });
    }
    
    // Sort by placedAt
    initialBets.sort((a, b) => b.placedAt - a.placedAt);
    setBets(initialBets);
    setIsConnected(true);
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      
      setBets(currentBets => {
        let updated = false;
        const newBets = currentBets.map(bet => {
          if (bet.status !== 'Open') return bet;
          
          // 20% chance to update odds for an open bet
          if (Math.random() < 0.2) {
            updated = true;
            // Random walk for true probability
            let newProb = bet.trueProbability + (Math.random() * 0.04 - 0.02);
            newProb = Math.max(0.05, Math.min(0.95, newProb));
            
            // Market adjusts odds, but with some inefficiency
            let newOdds = bet.odds + (Math.random() * 0.1 - 0.05);
            newOdds = Math.max(1.01, newOdds);
            
            const newEv = calculateEV(newProb, newOdds);
            
            // Trigger alert if EV > 5% and wasn't before
            if (newEv > 0.05 && bet.ev <= 0.05) {
              setAlerts(prev => [{
                id: generateId(),
                message: `High EV Alert: ${bet.matchName} - ${bet.selection} (${(newEv * 100).toFixed(1)}%)`,
                ev: newEv,
                time: now,
                read: false
              }, ...prev].slice(0, 20));
            }
            
            return {
              ...bet,
              trueProbability: newProb,
              odds: newOdds,
              ev: newEv,
              evHistory: [...bet.evHistory, { time: now, ev: newEv }].slice(-20) // Keep last 20 data points
            };
          }
          
          // 5% chance to resolve an open bet
          if (Math.random() < 0.05) {
            updated = true;
            const isWin = Math.random() < bet.trueProbability;
            return {
              ...bet,
              status: (isWin ? 'Won' : 'Lost') as Bet['status'],
              resolvedAt: now,
              profit: isWin ? bet.stake * (bet.odds - 1) : -bet.stake
            };
          }
          
          return bet;
        });
        
        // 10% chance to add a new open bet
        if (Math.random() < 0.1 && newBets.filter(b => b.status === 'Open').length < 15) {
          updated = true;
          const match = MATCHES[Math.floor(Math.random() * MATCHES.length)];
          const trueProb = 0.3 + Math.random() * 0.5;
          const odds = (1 / trueProb) + (Math.random() * 0.2 - 0.05);
          const ev = calculateEV(trueProb, odds);
          
          newBets.unshift({
            id: generateId(),
            matchName: match.name,
            sport: match.sport as Sport,
            selection: SELECTIONS[Math.floor(Math.random() * SELECTIONS.length)],
            odds,
            trueProbability: trueProb,
            ev,
            placementEv: ev,
            stake: 10 + Math.floor(Math.random() * 90),
            status: 'Open',
            placedAt: now,
            evHistory: [{ time: now, ev }]
          });
        }
        
        return updated ? newBets : currentBets;
      });
    }, 3000); // Update every 3 seconds for active feel
    
    return () => clearInterval(interval);
  }, [isConnected]);

  const markAlertRead = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }, []);

  return { bets, alerts, isConnected, markAlertRead };
}
