import React from 'react';
import { ProductHeroSlide } from './heroTypes';

interface HeroControlsProps {
  slides: ProductHeroSlide[];
  currentIndex: number;
  progressBarsRef: React.RefObject<(HTMLDivElement | null)[]>;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export default function HeroControls({
  slides,
  currentIndex,
  progressBarsRef,
  onPrev,
  onNext,
  onSelectSlide,
}: HeroControlsProps) {
  return (
    <div className="absolute bottom-8 sm:bottom-10 lg:bottom-[3vw] left-0 w-full px-4 sm:px-8 lg:px-[5vw] z-20 flex flex-col gap-3 sm:gap-3.5 lg:gap-[0.8vw] pointer-events-auto">
      <div className="flex items-center justify-between text-xs lg:text-[0.75vw] tracking-widest uppercase text-accent-gold/80 font-primary">
        {/* Slide Counter & Label */}
        <div className="flex items-center gap-2 lg:gap-[0.4vw]">
          <span className="font-semibold text-accent-gold">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-accent-gold/40">/</span>
          <span className="text-accent-gold/60">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 lg:gap-[0.5vw]">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous slide"
            className="w-8 h-8 lg:w-[2.2vw] lg:h-[2.2vw] rounded-full border border-accent-gold/30 flex items-center justify-center text-accent-gold hover:text-white hover:bg-accent-gold hover:border-accent-gold transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next slide"
            className="w-8 h-8 lg:w-[2.2vw] lg:h-[2.2vw] rounded-full border border-accent-gold/30 flex items-center justify-center text-accent-gold hover:text-white hover:bg-accent-gold hover:border-accent-gold transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Interactive Segmented Progress Bars */}
      <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-[0.8vw] max-w-full">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelectSlide(idx)}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            className="group relative flex-1 h-0.5 lg:h-[0.14vw] bg-accent-gold/20 hover:bg-accent-gold/35 rounded-full overflow-hidden transition-colors cursor-pointer focus:outline-none"
          >
            <div
              ref={(el) => {
                if (progressBarsRef.current) {
                  progressBarsRef.current[idx] = el;
                }
              }}
              className="h-full bg-accent-gold rounded-full transition-none"
              style={{ width: idx < currentIndex ? '100%' : '0%' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

