'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="w-full flex items-center justify-between px-3 md:px-6 pt-3 md:pt-4 relative">
        {/* Logo */}
        <Link href="/" aria-label="Pulzo Home">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer group"
            tabIndex={0}
            role="link"
          >
            <span className="text-[32px] md:text-[36px] font-black tracking-[-0.09em] text-white lowercase leading-none select-none transition-opacity duration-300 group-hover:opacity-80">
              pulzo
            </span>
          </motion.div>
        </Link>

        {/* Hamburger Menu Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-50 relative"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          tabIndex={0}
        >
          {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </motion.button>

        {/* Dropdown Menu (First Version) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-black border-b border-white/10 rounded-b-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex flex-col p-4 gap-4">
                <Link 
                  href="/#features" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-1"
                  tabIndex={0}
                >
                  Features
                </Link>
                <Link 
                  href="/#packs" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-1"
                  tabIndex={0}
                >
                  Packs
                </Link>
                
                {isLoggedIn ? (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-300 hover:text-white font-medium transition-colors px-2 py-1"
                    aria-label="Sign Out"
                    tabIndex={0}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link 
                    href="/join" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-1"
                    aria-label="Sign In"
                    tabIndex={0}
                  >
                    Sign In
                  </Link>
                )}
                
                {!isLoggedIn && (
                  <>
                    <div className="h-px w-full bg-white/10 my-1" role="separator" />
                    <Link href="/join" onClick={() => setIsMenuOpen(false)} tabIndex={-1}>
                      <button 
                        className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                        aria-label="Join Now"
                        tabIndex={0}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative">Join Now</span>
                        <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
