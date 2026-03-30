'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Globe, 
  MapPin, 
  Zap, 
  Lock,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [region, setRegion] = useState<'india' | 'global'>('india');
  const [showUpiOptions, setShowUpiOptions] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [activeUpiMethod, setActiveUpiMethod] = useState<string | null>(null);
  const [upiId, setUpiId] = useState('');

  const handleVerifyUpi = (app: string) => {
    if (!upiId) {
      alert('Please enter your UPI ID');
      return;
    }
    setProcessing(app);
    setTimeout(() => {
      alert(`Verifying ${app} UPI ID: ${upiId}... (Integration pending)`);
      setProcessing(null);
    }, 1500);
  };

  const upiApps = [
    { id: 'GPay', name: 'Google Pay', icon: 'G', bg: 'bg-white', text: 'text-slate-900', placeholder: 'username@okaxis' },
    { id: 'PhonePe', name: 'PhonePe', icon: 'पे', bg: 'bg-[#5f259f]', text: 'text-white', placeholder: 'username@ybl' },
    { id: 'Paytm', name: 'Paytm', icon: 'P', bg: 'bg-[#00baf2]', text: 'text-white', placeholder: 'username@paytm' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-blue-500/30">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-3xl shadow-2xl overflow-hidden relative z-10"
      >
        {/* Header / Toggle Area */}
        <div className="p-6 sm:p-8 border-b border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Master Library <span className="text-blue-500">Pro</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Complete your subscription</p>
          </div>

          {/* Dual-Region Toggle */}
          <div className="flex p-1 bg-slate-950/50 border border-slate-800 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setRegion('india')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                region === 'india' 
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              🇮🇳 India (Local)
            </button>
            <button
              onClick={() => setRegion('global')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                region === 'global' 
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Globe className="w-4 h-4" />
              🇺🇸 Global (USD)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Panel: Summary */}
          <div className="p-6 sm:p-8 lg:p-10 bg-slate-900/20 border-b lg:border-b-0 lg:border-r border-slate-800/60 flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <p className="text-slate-400 font-medium mb-2 uppercase tracking-wider text-sm">Amount Due</p>
                <div className="h-16 flex items-end">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={region}
                      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.3 }}
                      className="flex items-baseline gap-2"
                    >
                      <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
                        {region === 'india' ? '₹844' : '$9'}
                      </span>
                      <span className="text-slate-400 font-medium text-lg">/month</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Pro Plan Benefits
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">Real-time +EV Alerts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">Multi-Market Tracking</span>
                  </li>
                  
                  {/* Adaptive Features */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={region}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {region === 'india' ? (
                        <>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-slate-300">UPI Autopay Supported</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-slate-300">Hinglish Support</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-slate-300">Global Analytics</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-slate-300">PSA/eBay Data</span>
                          </li>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-800/60">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Cancel anytime. No hidden fees.</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Payment Methods */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={region}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {region === 'india' ? (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
                    
                    <button 
                      onClick={() => setShowUpiOptions(!showUpiOptions)}
                      className="w-full group relative flex items-center justify-between py-4 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-2xl transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <div className="flex items-center gap-3 relative z-10">
                        <Smartphone className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-white">Pay with UPI</span>
                        <span className="text-slate-400 text-sm font-normal hidden sm:inline">(GPay, PhonePe, Paytm)</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 relative z-10 ${showUpiOptions ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showUpiOptions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 space-y-3">
                            {upiApps.map((app) => (
                              <div key={app.id} className="flex flex-col gap-2">
                                <button 
                                  onClick={() => {
                                    setActiveUpiMethod(activeUpiMethod === app.id ? null : app.id);
                                    setUpiId(''); // Reset input when switching
                                  }} 
                                  className={`w-full flex items-center justify-between p-4 bg-slate-900/50 border ${activeUpiMethod === app.id ? 'border-blue-500/50' : 'border-slate-800 hover:border-slate-700'} rounded-xl transition-colors`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${app.bg} flex items-center justify-center text-xs font-bold ${app.text}`}>{app.icon}</div>
                                    <span className="text-slate-200 font-medium">{app.name}</span>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${activeUpiMethod === app.id ? 'rotate-180 text-blue-400' : ''}`} />
                                </button>
                                
                                <AnimatePresence>
                                  {activeUpiMethod === app.id && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
                                        <label className="text-sm text-slate-400 mb-2 block">Enter your {app.name} UPI ID</label>
                                        <div className="flex gap-2">
                                          <input 
                                            type="text" 
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            placeholder={app.placeholder} 
                                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                                          />
                                          <button 
                                            onClick={() => handleVerifyUpi(app.id)} 
                                            disabled={processing === app.id}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center min-w-[80px]"
                                          >
                                            {processing === app.id ? <span className="animate-pulse">...</span> : 'Verify'}
                                          </button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-slate-900/40 px-4 text-xs text-slate-500 uppercase tracking-widest backdrop-blur-md">Or pay with card</span>
                      </div>
                    </div>

                    <button className="w-full group flex items-center justify-center gap-3 py-4 px-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all duration-300">
                      <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-slate-300" />
                      <span className="font-medium text-slate-300 group-hover:text-white">Credit / Debit Card</span>
                    </button>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
                      <Lock className="w-4 h-4" />
                      <span>Secured by <span className="font-semibold text-slate-300">Razorpay</span></span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Payment Details</h3>
                    
                    {/* 1-Click Option */}
                    <button className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-6 bg-[#00D632]/10 hover:bg-[#00D632]/20 border border-[#00D632]/20 hover:border-[#00D632]/50 rounded-2xl transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(0,214,50,0.2)]">
                      <span className="font-bold text-[#00D632] tracking-tight text-lg">$ Cash App Pay</span>
                    </button>

                    <button className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]">
                      <span className="font-semibold text-indigo-400">Pay with Link</span>
                      <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-slate-900/40 px-4 text-xs text-slate-500 uppercase tracking-widest backdrop-blur-md">Or pay with card</span>
                      </div>
                    </div>

                    {/* Stripe-style Card Input */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Card Information</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input 
                            type="text" 
                            placeholder="Card number" 
                            className="w-full bg-slate-950 border border-slate-800 rounded-t-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>
                        <div className="flex -mt-2">
                          <input 
                            type="text" 
                            placeholder="MM / YY" 
                            className="w-1/2 bg-slate-950 border border-slate-800 border-t-0 border-r-0 rounded-bl-xl py-3.5 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                          <input 
                            type="text" 
                            placeholder="CVC" 
                            className="w-1/2 bg-slate-950 border border-slate-800 border-t-0 rounded-br-xl py-3.5 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      
                      <button className="w-full group relative flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                        <span className="font-semibold text-white">Subscribe</span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </motion.div>

      {/* Footer Badge */}
      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <Lock className="w-4 h-4" />
        <span>Secure 256-bit SSL Encryption</span>
      </div>

    </div>
  );
}
