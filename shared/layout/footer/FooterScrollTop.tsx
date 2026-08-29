'use client';

import React from 'react';

export default function FooterScrollTop() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-end items-center mb-8 sm:mb-12">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-primary/80 hover:text-primary cursor-pointer transition-colors"
      >
        <span>TOP</span>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/20 flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
          <svg
            width="14"
            height="14"
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
