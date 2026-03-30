'use client';

import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'We track every pull',
    description: "Our system continuously tracks every pack pull in real-time, collecting data on odds, value changes, and pool behavior to deliver accurate live insights.",
  },
  {
    number: '02',
    title: 'We calculate the real EV',
    description: "Using advanced data models and thousands of tracked pulls, we calculate the true expected value of each pack so you know what it's actually worth.",
  },
  {
    number: '03',
    title: 'You buy with an edge',
    description: "Check the EV before buying. When it's above 1.0, you're getting value. When it's below, you wait and make smarter decisions instead of guessing.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-[#0b0f14] relative border-t border-white/5 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00ff9c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#00ff9c] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            HOW IT WORKS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Card counting, but for mystery packs.
          </motion.h2>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col items-center w-full max-w-2xl space-y-20 md:space-y-28 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-[#00ff9c]/0 via-[#00ff9c]/20 to-[#00ff9c]/0 -translate-x-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center w-full"
            >
              {/* Circular Badge */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#131a22] border border-[#00ff9c]/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,156,0.1)] mb-8 transition-transform duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(0,255,156,0.2)]">
                <span className="text-2xl md:text-3xl font-bold text-[#00ff9c] drop-shadow-[0_0_10px_rgba(0,255,156,0.4)]">
                  {step.number}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
