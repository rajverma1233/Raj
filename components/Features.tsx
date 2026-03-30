'use client';

import { motion } from 'motion/react';
import { LineChart, Activity, BellRing, Trophy, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: <LineChart className="w-8 h-8 text-blue-400" />,
    title: 'Live EV Tracking',
    description: 'Track expected value in real time and instantly see which packs offer the best profit potential.',
    color: 'from-blue-500/20 to-blue-500/0',
    borderColor: 'group-hover:border-blue-500/50',
  },
  {
    icon: <Activity className="w-8 h-8 text-purple-400" />,
    title: 'Live EV Chart',
    description: 'Visualize EV trends in real time with dynamic charts to understand when opportunities are rising or falling',
    color: 'from-purple-500/20 to-purple-500/0',
    borderColor: 'group-hover:border-purple-500/50',
  },
  {
    icon: <BellRing className="w-8 h-8 text-emerald-400" />,
    title: '+EV Alerts',
    description: 'Get instant alerts when packs turn profitable so you never miss a high-value opportunity.',
    color: 'from-emerald-500/20 to-emerald-500/0',
    borderColor: 'group-hover:border-emerald-500/50',
  },
  {
    icon: <Trophy className="w-8 h-8 text-pink-400" />,
    title: 'Pack Rankings',
    description: 'Compare all available packs and see which ones rank highest based on real-time expected value.',
    color: 'from-pink-500/20 to-pink-500/0',
    borderColor: 'group-hover:border-pink-500/50',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-amber-400" />,
    title: 'Smart Odds (Calibrated Odds)',
    description: 'Access calibrated odds based on real data to understand true probabilities beyond displayed pack chances.',
    color: 'from-amber-500/20 to-amber-500/0',
    borderColor: 'group-hover:border-amber-500/50',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Win Big in the Market
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            A powerful suite of business tools designed to discover, analyze, and capitalize on profitable market opportunities faster than competitors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${feature.borderColor} overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
