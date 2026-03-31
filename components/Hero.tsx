'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { ArrowRight, TrendingUp, Users, Activity } from 'lucide-react';

const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: 100 + Math.random() * 50 + (i * 2),
  }));
};

export default function Hero() {
  const [data, setData] = useState(generateData());
  const [profit, setProfit] = useState(2340);
  const [ev, setEv] = useState(132);
  const [users, setUsers] = useState(128);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastValue = prev[prev.length - 1].value;
        newData.push({
          time: prev[prev.length - 1].time + 1,
          value: lastValue + (Math.random() * 20 - 8),
        });
        return newData;
      });

      setProfit((prev) => prev + Math.floor(Math.random() * 50 - 10));
      setEv((prev) => Math.max(100, Math.min(200, prev + Math.floor(Math.random() * 5 - 2))));
      setUsers((prev) => Math.max(100, prev + Math.floor(Math.random() * 3 - 1)));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 pb-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Live Analytics Engine Active
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Stop Buying Packs Blindly
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
              Real-time EV tracking across Courtyard, DYLI, and more.
              Pulzo tells you when the math is in your favor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/checkout" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] w-full sm:w-auto" aria-label="Join Now and go to checkout" tabIndex={0}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Join Now</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <button className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto" aria-label="View Demo" tabIndex={0}>
                View Demo
              </button>
            </div>
          </motion.div>

          {/* Right Content - Live Graph & Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            {/* Main Graph Card */}
            <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium">Live Profit Margin</h3>
                  <div className="text-3xl font-bold text-white mt-1">
                    +₹{profit.toLocaleString()}
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  +14.2%
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      itemStyle={{ color: '#a855f7' }}
                      formatter={(value: any) => [value ? `₹${Number(value).toFixed(2)}` : '', 'Profit']}
                      labelStyle={{ display: 'none' }}
                    />
                    <YAxis domain={['dataMin - 20', 'dataMax + 20']} hide />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#a855f7"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }}
                      filter="url(#glow)"
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white/[0.05] border border-white/10 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-3"
            >
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Activity className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Live EV</div>
                <div className="text-lg font-bold text-white">{ev}%</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white/[0.05] border border-white/10 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-3"
            >
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Active Users</div>
                <div className="text-lg font-bold text-white">{users}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
