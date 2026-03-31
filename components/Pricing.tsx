'use client';

import { motion } from 'motion/react';
import { CheckCircle2, Star } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Pro',
    price: '9',
    description: 'For serious traders who want real-time data and AI-driven insights.',
    features: [
      'Advanced Live EV Tracking',
      'Real-Time Live EV Chart',
      'Pack Rankings',
      'Priority 24/7 Support',
      'Exclusive Pro Community',
    ],
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Easy Pricing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              High ROI.
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Pick the plan that matches your strategy. This plan can generate returns with just a single profitable decision
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative bg-[#0a0a0a] rounded-3xl p-8 md:p-12 flex flex-col ${
                plan.highlighted
                  ? 'border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)]'
                  : 'border border-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                <span className="text-gray-400 font-medium">/month</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.highlighted ? 'text-purple-400' : 'text-gray-500'}`} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/checkout" className="w-full" aria-label={`Join Now for ${plan.name} plan`} tabIndex={0}>
                <button
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02]'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                  tabIndex={-1}
                >
                  Join Now
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
