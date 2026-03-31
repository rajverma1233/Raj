'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react';

const initialPacks = [
  { id: 1, name: 'Alpha Tech Bundle', ev: 142.5, profit: 42.5, time: '2m ago', trend: 'up' },
  { id: 2, name: 'Crypto Momentum', ev: 118.2, profit: 18.2, time: '5m ago', trend: 'up' },
  { id: 3, name: 'Stable Yields', ev: 105.1, profit: 5.1, time: '12m ago', trend: 'down' },
  { id: 4, name: 'High Volatility Pack', ev: 189.4, profit: 89.4, time: '1h ago', trend: 'up' },
];

const initialAlerts = [
  { id: 101, name: 'Omega Bundle', profit: 24.5, trend: 'up' },
  { id: 102, name: 'Starter Pack', profit: 12.1, trend: 'up' },
  { id: 103, name: 'Stable Yields', profit: 5.1, trend: 'down' },
  { id: 104, name: 'Daily Special', profit: 8.4, trend: 'up' },
];

export default function LivePreview() {
  const [packs, setPacks] = useState(initialPacks);
  const [alerts, setAlerts] = useState(initialAlerts);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacks((prev) =>
        prev.map((pack) => {
          // Randomly update some packs
          if (Math.random() > 0.5) {
            const change = (Math.random() * 4 - 2); // -2 to +2
            const newEv = Math.max(100, pack.ev + change);
            return {
              ...pack,
              ev: Number(newEv.toFixed(1)),
              profit: Number((newEv - 100).toFixed(1)),
              trend: change > 0 ? 'up' : 'down',
            };
          }
          return pack;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let counter = 105;
    const packNames = ['Gamma Box', 'Sigma Pack', 'Nexus Bundle', 'Apex Crate', 'Void Premium', 'Lunar Pack', 'Solar Flare'];
    
    const interval = setInterval(() => {
      const isUp = Math.random() > 0.3; // mostly up
      const newAlert = {
        id: counter++,
        name: packNames[Math.floor(Math.random() * packNames.length)],
        profit: Number((Math.random() * 50 + 2).toFixed(1)),
        trend: isUp ? 'up' : 'down'
      };
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 3)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="packs" className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 mb-6">
            <Activity className="w-4 h-4 animate-pulse" aria-hidden="true" />
            Live Data Feed
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Get the ultimate value pack <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              immediately
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Our dashboard constantly updates, highlighting top EV opportunities before the market catches on
          </p>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20"
        >
          {/* Dashboard Header */}
          <div className="bg-white/[0.02] border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-gray-400 text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                Live Opportunities
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Connected
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <div className="grid grid-cols-12 gap-4 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">
              <div className="col-span-5">Opportunity Name</div>
              <div className="col-span-3 text-right">Expected Value (EV)</div>
              <div className="col-span-2 text-right">Profit %</div>
              <div className="col-span-2 text-right">Time Found</div>
            </div>

            <div className="space-y-3">
              {packs.map((pack) => (
                <motion.div
                  key={pack.id}
                  layout
                  className="grid grid-cols-12 gap-4 items-center bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-xl p-4 transition-colors"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      pack.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {pack.trend === 'up' ? <TrendingUp className="w-5 h-5" aria-hidden="true" /> : <TrendingDown className="w-5 h-5" aria-hidden="true" />}
                    </div>
                    <span className="text-white font-medium">{pack.name}</span>
                  </div>
                  
                  <div className="col-span-3 text-right">
                    <motion.span 
                      key={pack.ev}
                      initial={{ opacity: 0.5, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`text-lg font-bold ${pack.ev > 120 ? 'text-green-400' : 'text-white'}`}
                    >
                      {pack.ev}%
                    </motion.span>
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <motion.span 
                      key={pack.profit}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className={`text-sm font-medium ${pack.profit > 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      +{pack.profit}%
                    </motion.span>
                  </div>
                  
                  <div className="col-span-2 text-right flex items-center justify-end gap-1 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {pack.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Live Alerts Queue */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-medium px-2">
            <Activity className="w-4 h-4 text-blue-400" aria-hidden="true" />
            Recent Market Activity
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium text-sm truncate pr-2">{alert.name}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">Just now</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${
                      alert.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {alert.trend === 'up' ? <TrendingUp className="w-3 h-3" aria-hidden="true" /> : <TrendingDown className="w-3 h-3" aria-hidden="true" />}
                    </div>
                    <span className={`text-sm font-bold ${alert.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {alert.trend === 'up' ? '+' : '-'}{alert.profit}% EV
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
