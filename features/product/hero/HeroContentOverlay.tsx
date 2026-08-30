import React from 'react';
import { ProductHeroSlide } from './heroTypes';

interface HeroContentOverlayProps {
  slides: ProductHeroSlide[];
  onScrollToCollection: () => void;
}

export default function HeroContentOverlay({
  slides,
  onScrollToCollection,
}: HeroContentOverlayProps) {
  return (
    <>
      {/* Subtle Warm Ivory Scrim for Crisp Typography Legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-warm-ivory/85 via-warm-ivory/45 to-transparent sm:w-3/4 lg:w-3/5"
      />

      {/* Editorial Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-8 lg:px-[5vw] pb-16 sm:pb-20 lg:pb-[5vw]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            data-slide-index={index}
            className="product-hero-txt absolute w-full max-w-xl lg:max-w-[42vw] text-primary pointer-events-auto"
            style={{
              clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
              transform: index === 0 ? 'translateY(0px)' : 'translateY(35px)',
            }}
          >
            {slide.tag && (
              <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 sm:mb-2 lg:mb-[0.4vw] block">
                {slide.tag}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-[3.6vw] lg:leading-[1.08] text-primary font-medium tracking-tight">
              {slide.title}
              {slide.titleAccent && (
                <>
                  {' '}
                  <span className="font-editorial italic font-normal text-accent-gold">
                    {slide.titleAccent}
                  </span>
                </>
              )}
            </h1>

            {slide.subtitle && (
              <h2 className="text-xs sm:text-sm lg:text-[0.8vw] font-medium tracking-[0.2em] uppercase text-primary/70 mt-3 lg:mt-[0.6vw] font-primary">
                {slide.subtitle}
              </h2>
            )}

            <p className="font-primary font-normal text-sm sm:text-base lg:text-[0.9vw] lg:leading-[1.7] text-primary/80 w-full max-w-xl lg:max-w-[34vw] mt-3 sm:mt-4 lg:mt-[0.8vw] leading-relaxed">
              {slide.description}
            </p>

            <div className="mt-6 sm:mt-8 lg:mt-[1.8vw] flex items-center gap-4">
              <button
                type="button"
                onClick={onScrollToCollection}
                className="inline-flex items-center gap-2 lg:gap-[0.5vw] px-6 py-3 lg:px-[1.8vw] lg:py-[0.7vw] rounded-full bg-primary text-white text-xs sm:text-sm lg:text-[0.8vw] font-medium tracking-wider uppercase hover:bg-primary-hover transition-all cursor-pointer shadow-subtle hover:scale-[1.02]"
              >
                {slide.ctaText || 'Explore Collection'}
                <svg className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

