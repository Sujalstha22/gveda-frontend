'use client';

import React, { useEffect, RefObject } from 'react';
import Image from 'next/image';
import { SlideData } from './types';
import { usePreloader } from '@/shared/context/PreloaderContext';

interface CarouselSlidesProps {
  activeSlide: SlideData;
  previousSlide: SlideData;
  isTransitioning: boolean;
  incomingSlideRef: RefObject<HTMLDivElement | null>;
  activeSlideImageRef: RefObject<HTMLDivElement | null>;
}

export default function CarouselSlides({
  activeSlide,
  previousSlide,
  isTransitioning,
  incomingSlideRef,
  activeSlideImageRef,
}: CarouselSlidesProps) {
  const { setHeroImageLoaded } = usePreloader();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = previousSlide.image;
      if (img.complete) {
        setHeroImageLoaded(true);
      }
    }
  }, [previousSlide.image, setHeroImageLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* BASE SLIDE (Previous / Underlying Slide) */}
      <div
        key={`base-${previousSlide.id}`}
        className="absolute inset-0 w-full h-full z-10"
      >
        <div
          className={`relative w-full h-full transform transition-transform duration-[10000ms] ease-out ${!isTransitioning ? 'scale-105' : 'scale-100'
            }`}
        >
          <Image
            src={previousSlide.image}
            alt={previousSlide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.88]"
            onLoad={() => setHeroImageLoaded(true)}
          />
        </div>
      </div>

      {/* INCOMING SLIDE (Wave Mask Reveal Layer) */}
      <div
        ref={incomingSlideRef}
        key={`incoming-${activeSlide.id}`}
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-100 z-20' : 'opacity-0 z-0'
          }`}
        style={{
          maskImage: 'url(/images/mask_side_s.webp)',
          WebkitMaskImage: 'url(/images/mask_side_s.webp)',
          maskSize: '300% 600%',
          WebkitMaskSize: '300% 600%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: '-33.3% 0%',
          WebkitMaskPosition: '-33.3% 0%',
        }}
      >
        <div
          ref={activeSlideImageRef}
          className={`relative w-full h-full transform transition-transform duration-[10000ms] ease-out ${isTransitioning ? 'scale-105' : 'scale-100'
            }`}
        >
          <Image
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.88]"
          />
        </div>
      </div>

      {/* Persistent global overlay over images that stays continuous across all slide transitions */}
      <div className="absolute inset-0 bg-black/30 z-30 pointer-events-none" />

      {/* Bottom linear gradient to transition seamlessly into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 sm:h-64 lg:h-80 bg-linear-to-b from-transparent via-[#0F0D0E]/70 to-[#0F0D0E] z-30 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
