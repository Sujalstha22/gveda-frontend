'use client';

import React from 'react';
import { SlideData } from './types';

interface CarouselSubNavProps {
  categories: string[];
  currentIndex: number;
  activeSlide: SlideData;
  onSelectCategory: (category: string) => void;
}

export default function CarouselSubNav({
  categories,
  currentIndex,
  activeSlide,
  onSelectCategory,
}: CarouselSubNavProps) {
  return (
    <div className="absolute top-20 md:top-24 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-2 pointer-events-none border-t border-white/10">
      {/* Left Sub-heading (Editorial Italic Serif) */}
      <div className="font-editorial italic text-2xl md:text-3xl text-white/95 font-normal tracking-wide pointer-events-auto">
        Formulations
      </div>

      {/* Right Category Filter Tabs */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 font-['Montserrat'] text-[11px] sm:text-xs tracking-[0.15em] text-white/75 pointer-events-auto">
        {categories.map((cat) => {
          const isOverview = cat === 'Overview';
          const isActive =
            (isOverview && currentIndex === 0) ||
            (!isOverview && activeSlide.category.toUpperCase() === cat.toUpperCase());

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-1.5 py-1 transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-white/60 hover:text-white font-normal'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'border-white text-white bg-white/20'
                    : 'border-white/40 text-white/40 group-hover:border-white'
                }`}
                style={{ fontSize: '8px' }}
              >
                ›
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
