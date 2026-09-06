'use client';

import React from 'react';

interface CarouselQuickActionProps {
  onClick?: () => void;
}

export default function CarouselQuickAction({ onClick }: CarouselQuickActionProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex">
      <button
        type="button"
        onClick={onClick}
        aria-label="More Options"
        className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#2D2A26]/85 hover:bg-[#3D3A36] text-white/80 hover:text-white backdrop-blur-md shadow-lg border border-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <span className="tracking-widest text-xs font-bold leading-none select-none">···</span>
      </button>
    </div>
  );
}
