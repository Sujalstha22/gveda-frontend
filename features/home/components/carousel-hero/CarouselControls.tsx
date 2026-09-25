'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePreloader } from '@/shared/context/PreloaderContext';
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
  const { heroReady } = usePreloader();
  const pathname = usePathname();

  return (
    <motion.div
      key={`controls-${pathname}`}
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      animate={
        heroReady
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 30, filter: 'blur(4px)' }
      }
      transition={{
        duration: 0.85,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="absolute bottom-5 sm:bottom-8 md:bottom-12 lg:bottom-16 left-5 sm:left-8 md:left-auto right-5 sm:right-8 md:right-12 lg:right-16 z-30 pointer-events-auto select-none"
    >
      <div className="w-full flex flex-row md:flex-col items-end justify-between md:justify-start gap-4">
        {/* Slide Category & Name */}
        <div className="text-left md:text-right">
          <p
            key={`title-${activeSlide.id}`}
            className="font-madison italic text-base sm:text-xl md:text-2xl lg:text-3xl text-accent-gold font-normal capitalize leading-tight animate-in fade-in duration-500"
          >
            {activeSlide.title}
          </p>
          <h3
            key={`sub-${activeSlide.id}`}
            className="font-heading font-normal text-sm sm:text-lg md:text-2xl lg:text-3xl tracking-wide text-white capitalize mt-0.5 animate-in fade-in duration-500"
          >
            {activeSlide.subtitle}
          </h3>
        </div>

        {/* Rolling Counter & Navigation Buttons */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 font-primary text-xs sm:text-sm tracking-widest text-white/90">
            {/* Previous Arrow Button */}
            <button
              type="button"
              onClick={onPrev}
              disabled={isTransitioning}
              aria-label="Previous Slide"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-accent-gold hover:bg-[#A88D6D] border border-accent-gold/80 flex items-center justify-center text-soft-white transition-all duration-300 cursor-pointer active:scale-95 shadow-md hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-soft-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="text-white/40 mx-0.5 sm:mx-1">/</span>
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
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-accent-gold hover:bg-[#A88D6D] border border-accent-gold/80 flex items-center justify-center text-soft-white transition-all duration-300 cursor-pointer active:scale-95 shadow-md hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-soft-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Autoplay Progress Line */}
          <div className="w-full max-w-28 sm:max-w-36 md:max-w-44 h-0.5 bg-white/20 mt-2 sm:mt-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-gold transition-all duration-75 ease-linear"
              style={{ width: `${autoplayProgress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
