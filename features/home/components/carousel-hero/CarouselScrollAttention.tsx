'use client';

import React from 'react';

interface CarouselScrollAttentionProps {
  onClick?: () => void;
}

export default function CarouselScrollAttention({ onClick }: CarouselScrollAttentionProps) {
  return (
    <div
      onClick={onClick}
      className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group"
    >
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs transition-all duration-300 group-hover:scale-110 group-hover:border-white/60">
        <div className="w-2 h-2 rounded-full bg-white/90 group-hover:bg-white" />
        {/* Ripple wave ring */}
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping pointer-events-none opacity-40" />
      </div>
    </div>
  );
}
