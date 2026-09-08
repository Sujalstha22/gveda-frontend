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
    <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-6 sm:right-10 md:right-16 z-30 flex flex-col items-end pointer-events-auto select-none">
      {/* Slide Category & Name */}
      <div className="text-right mb-3 sm:mb-4">
        <p className="font-madison italic text-xl sm:text-2xl md:text-3xl text-accent-gold font-normal capitalize">
          {activeSlide.title}
        </p>
        <h3 className="font-antessa font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-white capitalize mt-0.5 sm:mt-1">
          {activeSlide.subtitle}
        </h3>
      </div>

      {/* Rolling Counter & Navigation Buttons */}
      <div className="flex items-center gap-3 sm:gap-4 font-primary text-xs sm:text-sm tracking-widest text-white/90">
        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isTransitioning}
          aria-label="Previous Slide"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent-gold hover:bg-[#A88D6D] border border-accent-gold/80 flex items-center justify-center text-rich-black transition-all duration-300 cursor-pointer active:scale-95 shadow-md hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Rolling Number Counter */}
        <div className="flex items-center font-medium">
          <div className="relative h-5 w-6 overflow-hidden inline-flex flex-col justify-start">
            <div
              className="transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col items-center"
              style={{ transform: `translateY(-${currentIndex * 20}px)` }}
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  className="h-5 flex items-center justify-center text-xs sm:text-sm leading-none font-semibold text-accent-gold"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
          <span className="text-white/40 mx-1">/</span>
          <span className="text-white/60 text-xs sm:text-sm">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={onNext}
          disabled={isTransitioning}
          aria-label="Next Slide"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent-gold hover:bg-[#A88D6D] border border-accent-gold/80 flex items-center justify-center text-rich-black transition-all duration-300 cursor-pointer active:scale-95 shadow-md hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Autoplay Progress Line */}
      <div className="w-full max-w-40 sm:max-w-44 h-0.5 bg-white/20 mt-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-gold transition-all duration-75 ease-linear"
          style={{ width: `${autoplayProgress}%` }}
        />
      </div>
    </div>
  );
}
