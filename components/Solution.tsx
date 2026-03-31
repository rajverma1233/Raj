'use client';

import { motion } from 'motion/react';
import { CheckCircle2, Eye, BellRing, Zap } from 'lucide-react';

const solutions = [
  {
    icon: <Eye className="w-6 h-6 text-green-400" aria-hidden="true" />,
    title: 'See profit before you act',
    description: 'Our predictive models show you the expected value (EV) of every decision instantly.',
  },
  {
    icon: <Zap className="w-6 h-6 text-green-400" aria-hidden="true" />,
    title: 'Real-time insights',
    description: 'Data updates by the millisecond, ensuring you always have the latest edge.',
  },
  {
    icon: <BellRing className="w-6 h-6 text-green-400" aria-hidden="true" />,
    title: 'Smart alerts',
    description: 'Get notified immediately when a high-profit opportunity arises.',
  },
];

export default function Solution() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400 mb-6">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              The Solution
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Turn Data Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Predictable Profit.
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Stop relying on luck. Our platform processes millions of data points to deliver 
              actionable insights directly to your dashboard.
            </p>

            <div className="space-y-6">
              {solutions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                    <p className="text-gray-400 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Opportunity Detected</div>
                    <div className="text-sm text-gray-400">Just now</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-xl">+42.5% EV</div>
                  <div className="text-sm text-gray-400">High Confidence</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-white/5 rounded-lg border border-white/5 flex items-center px-4 overflow-hidden relative">
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 bg-green-500/20"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${100 - i * 20}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                    />
                    <div className="relative z-10 flex justify-between w-full">
                      <span className="text-gray-300 text-sm">Metric {i}</span>
                      <span className="text-white font-medium">{100 - i * 20}% Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
