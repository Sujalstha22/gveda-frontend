'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AuthMode } from './loginTypes';

interface AuthTabsProps {
  mode: AuthMode;
  onSelectMode: (mode: AuthMode) => void;
}

export default function AuthTabs({ mode, onSelectMode }: AuthTabsProps) {
  return (
    <div className="flex items-center gap-6 sm:gap-8 lg:gap-[1.8vw] border-b border-black/10 pb-2.5 lg:pb-[0.6vw] mb-6 lg:mb-[1.5vw]">
      <button
        type="button"
        onClick={() => onSelectMode('login')}
        className={`font-primary text-sm sm:text-base lg:text-[0.95vw] uppercase tracking-wider font-semibold transition-all relative pb-2 lg:pb-[0.4vw] cursor-pointer ${
          mode === 'login' ? 'text-primary' : 'text-primary/40 hover:text-primary/70'
        }`}
      >
        Login
        {mode === 'login' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 lg:h-[0.14vw] bg-primary rounded-full"
          />
        )}
      </button>

      <button
        type="button"
        onClick={() => onSelectMode('signup')}
        className={`font-primary text-sm sm:text-base lg:text-[0.95vw] uppercase tracking-wider font-semibold transition-all relative pb-2 lg:pb-[0.4vw] cursor-pointer ${
          mode === 'signup' ? 'text-primary' : 'text-primary/40 hover:text-primary/70'
        }`}
      >
        Sign Up
        {mode === 'signup' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 lg:h-[0.14vw] bg-primary rounded-full"
          />
        )}
      </button>
    </div>
  );
}
