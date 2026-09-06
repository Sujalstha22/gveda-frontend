'use client';

import React from 'react';
import { SlideData } from './types';

interface CarouselEditorialProps {
  activeSlide: SlideData;
}

export default function CarouselEditorial({ activeSlide }: CarouselEditorialProps) {
  return (
    <div className="absolute bottom-12 md:bottom-20 left-6 sm:left-12 md:left-16 z-30 max-w-xl pointer-events-none">
      {/* Kicker (Editorial Italic Serif) */}
      <div className="overflow-hidden mb-2 sm:mb-4">
        {/* <p
          key={`kicker-${activeSlide.id}`}
          className="font-['Cormorant_Garamond'] italic text-lg sm:text-2xl md:text-3xl text-white/90 leading-snug font-normal tracking-wide animate-in fade-in slide-in-from-bottom-3 duration-700 whitespace-pre-line"
        >
          {activeSlide.kicker}
        </p> */}
      </div>

      {/* Main Title (Luxury Serif / Bold Editorial Heading) */}
      <div className="overflow-hidden">
        <h1
          key={`title-${activeSlide.id}`}
          className=" text-7xl text-white font-light! tracking-tight leading-none animate-in fade-in slide-in-from-bottom-4 duration-800"
        >
          Rediscover Your Natural Glow
        </h1>
      </div>
    </div>
  );
}
