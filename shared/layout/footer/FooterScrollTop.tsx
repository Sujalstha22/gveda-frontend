'use client';

import React from 'react';

export default function FooterScrollTop({ className = '' }: { className?: string }) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex justify-end items-center ${className}`}>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group flex items-center gap-2 lg:gap-[0.4vw] text-xs lg:text-[0.7vw] font-medium tracking-widest uppercase text-white/80 hover:text-white cursor-pointer transition-colors"
      >
        <span>TOP</span>
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-[2.2vw] lg:h-[2.2vw] rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-rich-black">
          <svg
            className="w-3.5 h-3.5 lg:w-[0.8vw] lg:h-[0.8vw]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>
      </button>
    </div>
  );
}

