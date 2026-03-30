'use client';

import { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, DollarSign, Target, Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const TIME_FILTERS = [
  { label: '1 Hour', value: 1 },
  { label: '2 Hours', value: 2 },
  { label: '3 Hours', value: 3 },
  { label: '4 Hours', value: 4 },
];

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState(24); // Default Today
  
  const [liveData, setLiveData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalBets: 0, positiveEV: 0, negativeEV: 0, winRate: 0 });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching from the Next.js API route to avoid Mixed Content (HTTPS -> HTTP) and CORS errors
        const res = await fetch('/api/ev/live');
        if (!res.ok) throw new Error('Network response was not ok');
        
        const data = await res.json();
        setLiveData(data);

        // Derive chart data from the live data
        const chart = data.map((item: any, i: number) => ({
          time: i,
          formattedTime: `T+${i}`,
          ev: parseFloat(item.ev),
          evPercent: parseFloat(item.ev) * 100,
          profit: parseFloat(item.ev) * 100,
          match: item.match,
          team: item.team,
          odds: item.odds,
          status: 'Open'
        }));
        setChartData(chart);
        
        // Generate alerts from positive EV items
        const newAlerts = data
          .filter((item: any) => parseFloat(item.ev) > 0)
          .map((item: any, i: number) => ({
            id: `alert-${i}-${Date.now()}`,
            match: item.match,
            team: item.team,
            ev: parseFloat(item.ev),
            time: Date.now()
          }));
        setAlerts(newAlerts.slice(0, 5)); // Keep top 5 alerts
        
        // Derive stats
        const positiveEVCount = data.filter((item: any) => parseFloat(item.ev) > 0).length;
        const negativeEVCount = data.filter((item: any) => parseFloat(item.ev) < 0).length;
        setStats({
          totalBets: data.length,
          positiveEV: positiveEVCount,
          negativeEV: negativeEVCount,
          winRate: data.length > 0 ? ((positiveEVCount / data.length) * 100).toFixed(1) : 0
        });

        setIsConnected(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // 10 sec refresh
    return () => clearInterval(interval);
  }, [timeFilter]);

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const currentEv = liveData.length > 0 
    ? liveData.reduce((acc, bet) => acc + parseFloat(bet.ev), 0) / liveData.length 
    : 0;
  
  const totalEvToday = liveData.reduce((acc, item) => acc + parseFloat(item.ev || 0), 0);
  const liveProfitLoss = liveData.reduce((acc, item) => acc + parseFloat(item.ev || 0), 0);
  const totalBetsCount = liveData.length;

  const totalSessions = Math.max(1, Math.floor(totalBetsCount / 5));
  const finalBets = stats.totalBets;
  const totalWagered = stats.totalBets * 50; // Simulated $50 per bet
  const winRate = parseFloat(stats.winRate);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Connection Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live EV Tracking</h1>
          <p className="text-zinc-400 text-sm">Real-time market analysis and portfolio tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${isConnected ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            {isConnected ? 'Market Connected' : 'Connecting...'}
          </div>
        </div>
      </div>

      {/* Alerts Panel */}
      {alerts.filter(a => !a.read).length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-400 font-medium mb-3">
            <AlertTriangle className="w-5 h-5" />
            Active Opportunities (Trial Limit: 5/day)
          </div>
          <div className="space-y-2">
            {alerts.filter(a => !a.read).slice(0, 3).map(alert => (
              <div key={alert.id} className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3 text-sm">
                <span className="text-zinc-300">{alert.message}</span>
                <button 
                  onClick={() => markAlertRead(alert.id)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Current EV %" 
          value={`${(currentEv * 100).toFixed(2)}%`} 
          icon={<Activity className="w-5 h-5 text-blue-400" />}
          trend={currentEv > 0 ? 'up' : 'down'}
          color="blue"
        />
        <StatCard 
          title="Total EV Today" 
          value={`${(totalEvToday * 100).toFixed(2)}%`} 
          icon={<Target className="w-5 h-5 text-purple-400" />}
          trend={totalEvToday > 0 ? 'up' : 'down'}
          color="purple"
        />
        <StatCard 
          title="Live Profit / Loss" 
          value={`$${liveProfitLoss.toFixed(2)}`} 
          icon={<DollarSign className="w-5 h-5 text-green-400" />}
          trend={liveProfitLoss >= 0 ? 'up' : 'down'}
          color={liveProfitLoss >= 0 ? 'green' : 'red'}
        />
        <StatCard 
          title="Total Bets Count" 
          value={totalBetsCount} 
          icon={<TrendingUp className="w-5 h-5 text-zinc-400" />}
          color="zinc"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-center">
          <div className="text-sm text-zinc-400 mb-1">Total Sessions</div>
          <div className="text-2xl font-bold">{totalSessions}</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-center">
          <div className="text-sm text-zinc-400 mb-1">Final Bets</div>
          <div className="text-2xl font-bold">{finalBets}</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-center">
          <div className="text-sm text-zinc-400 mb-1">Total Wagered</div>
          <div className="text-2xl font-bold">${totalWagered.toFixed(2)}</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-center">
          <div className="text-sm text-zinc-400 mb-1">Win Rate %</div>
          <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="flex flex-wrap gap-2">
        {TIME_FILTERS.map(filter => (
          <button
            key={filter.value}
            onClick={() => setTimeFilter(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeFilter === filter.value 
                ? 'bg-zinc-100 text-zinc-900' 
                : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800/50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Live EV Chart</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="formattedTime" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="evPercent" name="EV %" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Profit / Loss</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="formattedTime" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                />
                <ReferenceLine y={0} stroke="#52525b" />
                <Bar dataKey="profit" name="Profit/Loss" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#22c55e' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bets Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Bets */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/80">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Open Bets
            </h3>
            <span className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-300">{liveData.length} Active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/30">
                <tr>
                  <th className="px-4 py-3 font-medium">Match</th>
                  <th className="px-4 py-3 font-medium">Team</th>
                  <th className="px-4 py-3 font-medium">Odds</th>
                  <th className="px-4 py-3 font-medium">EV</th>
                  <th className="px-4 py-3 font-medium">Signal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {liveData.map((bet, i) => (
                  <tr key={`${bet.id}-${i}`} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-zinc-200">{bet.match}</td>
                    <td className="px-4 py-3 text-zinc-400">{bet.team}</td>
                    <td className="px-4 py-3 font-mono">{parseFloat(bet.odds).toFixed(2)}</td>
                    <td className={`px-4 py-3 font-mono font-medium ${parseFloat(bet.ev) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(bet.ev).toFixed(3)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${parseFloat(bet.ev) > 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {bet.signal || (parseFloat(bet.ev) > 0 ? 'POSITIVE' : 'NEGATIVE')}
                      </span>
                    </td>
                  </tr>
                ))}
                {liveData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">No open bets found for this period.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Closed Bets */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/80">
            <h3 className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-400" />
              Closed Bets
            </h3>
            <span className="text-xs bg-zinc-800 px-2 py-1 rounded-full text-zinc-300">{chartData.filter(b => b.status === 'Closed').length} Settled</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/30">
                <tr>
                  <th className="px-4 py-3 font-medium">Match</th>
                  <th className="px-4 py-3 font-medium">Result</th>
                  <th className="px-4 py-3 font-medium">P/L</th>
                  <th className="px-4 py-3 font-medium">EV (Placement)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {chartData.filter(b => b.status === 'Closed').slice(0, 10).map((bet, i) => (
                  <tr key={`${bet.id || 'closed'}-${i}`} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-zinc-200">{bet.match || 'Unknown Match'}</div>
                      <div className="text-xs text-zinc-500">{bet.team || 'Unknown Selection'} @ {bet.odds?.toFixed(2) || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3">
                      {bet.profit > 0 ? (
                        <span className="inline-flex items-center gap-1 text-green-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Won
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400 font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Lost
                        </span>
                      )}
                    </td>
                    <td className={`px-4 py-3 font-mono font-medium ${bet.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {bet.profit > 0 ? '+' : ''}{bet.profit?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 font-mono text-zinc-400">
                      {(bet.ev * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
                {chartData.filter(b => b.status === 'Closed').length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">No closed bets found for this period.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color }: { title: string, value: string | number, icon: React.ReactNode, trend?: 'up' | 'down', color: 'blue' | 'green' | 'red' | 'purple' | 'zinc' }) {
  const colorMap = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    green: { bg: 'bg-green-500/10', text: 'text-green-400' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
    zinc: { bg: 'bg-zinc-500/10', text: 'text-zinc-400' },
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${colorMap[color].bg} rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50`} />
      <div className="flex justify-between items-start mb-4">
        <div className="text-zinc-400 text-sm font-medium">{title}</div>
        <div className={`p-2 ${colorMap[color].bg} rounded-lg`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {trend && (
          <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          </div>
        )}
      </div>
    </div>
  );
}
