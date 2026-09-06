'use client';

import React, { RefObject } from 'react';
import Image from 'next/image';
import { SlideData } from './types';

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
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* BASE SLIDE (Previous / Underlying Slide) */}
      <div
        key={`base-${previousSlide.id}`}
        className="absolute inset-0 w-full h-full z-10"
      >
        <div
          className={`relative w-full h-full transform transition-transform duration-[10000ms] ease-out ${
            !isTransitioning ? 'scale-105' : 'scale-100'
          }`}
        >
          <Image
            src={previousSlide.image}
            alt={previousSlide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.88]"
          />
          {/* Soft luxury vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>
      </div>

      {/* INCOMING SLIDE (Wave Mask Reveal Layer) */}
      <div
        ref={incomingSlideRef}
        key={`incoming-${activeSlide.id}`}
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
          isTransitioning ? 'opacity-100 z-20' : 'opacity-0 z-0'
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
          className={`relative w-full h-full transform transition-transform duration-[10000ms] ease-out ${
            isTransitioning ? 'scale-105' : 'scale-100'
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
          {/* Soft luxury vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
