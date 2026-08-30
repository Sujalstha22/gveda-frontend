'use client';

import React from 'react';
import {
  HeroSvgStage,
  HeroContentOverlay,
  HeroControls,
  useHeroCarousel,
  DEFAULT_PRODUCT_HERO_SLIDES,
  ProductHeroProps,
} from '../hero';

export type { ProductHeroSlide, ProductHeroProps } from '../hero';
export { DEFAULT_PRODUCT_HERO_SLIDES } from '../hero';

export default function ProductHero({
  slides = DEFAULT_PRODUCT_HERO_SLIDES,
  intervalMs = 3000,
  blindCount = 28,
  className = '',
}: ProductHeroProps) {
  const {
    currentIndex,
    dimensions,
    stageRef,
    svgRef,
    blindsGroupRef,
    baseImageRef,
    maskedImageRef,
    progressBarsRef,
    handleManualNext,
    handleManualPrev,
    handleSelectSlide,
    handleScrollToCollection,
  } = useHeroCarousel({
    slides,
    intervalMs,
    blindCount,
  });

  return (
    <section
      ref={stageRef}
      aria-label="Full-screen Product Carousel"
      className={`relative w-full h-screen min-h-[450px] sm:min-h-[550px] lg:min-h-0 overflow-hidden select-none bg-warm-ivory text-primary ${className}`}
    >
      <HeroSvgStage
        slides={slides}
        dimensions={dimensions}
        svgRef={svgRef}
        blindsGroupRef={blindsGroupRef}
        baseImageRef={baseImageRef}
        maskedImageRef={maskedImageRef}
      />

      {/* <HeroContentOverlay
        slides={slides}
        onScrollToCollection={handleScrollToCollection}
      /> */}

      <HeroControls
        slides={slides}
        currentIndex={currentIndex}
        progressBarsRef={progressBarsRef}
        onPrev={handleManualPrev}
        onNext={handleManualNext}
        onSelectSlide={handleSelectSlide}
      />
    </section>
  );
}