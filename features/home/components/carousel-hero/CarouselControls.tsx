'use client';

import React from 'react';
import { SlideData } from './types';

interface CarouselControlsProps {
  slides: SlideData[];
  currentIndex: number;
  activeSlide: SlideData;
  isTransitioning: boolean;
  autoplayProgress: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function CarouselControls({
  slides,
  currentIndex,
  activeSlide,
  isTransitioning,
  autoplayProgress,
  onPrev,
  onNext,
}: CarouselControlsProps) {
  return (
    <div className="absolute bottom-12 md:bottom-20 right-6 sm:right-12 md:right-16 z-30 flex flex-col items-end pointer-events-auto">
      {/* Slide Category & Name */}
      <div className="text-right mb-3">
        <p className="font-['Montserrat'] text-[10px] sm:text-xs tracking-[0.25em] text-white/70 uppercase">
          {activeSlide.title}
        </p>
        <h3 className="font-['Montserrat'] font-bold text-sm sm:text-base tracking-[0.2em] text-white uppercase">
          {activeSlide.subtitle}
        </h3>
      </div>

      {/* Rolling Counter & Navigation Buttons */}
      <div className="flex items-center gap-3 sm:gap-4 font-['Montserrat'] text-xs sm:text-sm tracking-widest text-white/90">
        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isTransitioning}
          aria-label="Previous Slide"
          className="p-1 text-white/70 hover:text-white transition-transform hover:-translate-x-0.5 cursor-pointer disabled:opacity-40"
        >
          &lt;
        </button>

        {/* Rolling Number Counter */}
        <div className="flex items-center font-medium">
          <div className="relative h-5 w-4 overflow-hidden inline-flex flex-col justify-start">
            <div
              className="transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col"
              style={{ transform: `translateY(-${currentIndex * 20}px)` }}
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  className="h-5 flex items-center justify-center text-xs sm:text-sm leading-none"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <span className="text-white/50 mx-0.5">/</span>
          <span className="text-white/70 text-xs sm:text-sm">{slides.length}</span>
        </div>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={onNext}
          disabled={isTransitioning}
          aria-label="Next Slide"
          className="p-1 text-white/70 hover:text-white transition-transform hover:translate-x-0.5 cursor-pointer disabled:opacity-40"
        >
          &gt;
        </button>
      </div>

      {/* Autoplay Progress Line */}
      <div className="w-24 h-[1.5px] bg-white/20 mt-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/80 transition-all duration-75 ease-linear"
          style={{ width: `${autoplayProgress}%` }}
        />
      </div>
    </div>
  );
}
