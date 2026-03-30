'use client';

import { motion } from 'motion/react';
import { AlertTriangle, TrendingDown, XCircle } from 'lucide-react';

const problems = [
  {
    icon: <TrendingDown className="w-6 h-6 text-red-500" />,
    title: 'Losing money on random decisions',
    description: 'Relying on gut feeling instead of hard data leads to consistent losses over time.',
  },
  {
    icon: <XCircle className="w-6 h-6 text-red-500" />,
    title: 'No data, only guessing',
    description: 'Without real-time analytics, you are flying blind in a highly competitive market.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    title: 'Missing profitable opportunities',
    description: 'By the time you spot a trend manually, the smart money has already moved on.',
  },
];

export default function Problem() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The Hidden Cost of <span className="text-red-500">Guessing in Decisions</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Every business decision made without accurate data is a risky gamble. In today’s fast-paced market, guessing can quickly drain capital and hurt growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0a0a0a] border border-red-500/10 rounded-2xl p-8 hover:border-red-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 border border-red-500/20">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
