import React from 'react';
import Image from 'next/image';
import { ProductHeroSlide } from './heroTypes';

interface HeroSvgStageProps {
  slides: ProductHeroSlide[];
  dimensions: { width: number; height: number };
  svgRef: React.RefObject<SVGSVGElement | null>;
  blindsGroupRef: React.RefObject<SVGGElement | null>;
  baseImageRef: React.RefObject<SVGImageElement | null>;
  maskedImageRef: React.RefObject<SVGImageElement | null>;
}

export default function HeroSvgStage({
  slides,
  dimensions,
  svgRef,
  blindsGroupRef,
  baseImageRef,
  maskedImageRef,
}: HeroSvgStageProps) {
  const initialImage = slides[0]?.image || '';

  return (
    <>
      {/* Hidden preloader for Next.js image optimization */}
      <div className="hidden" aria-hidden="true">
        {slides.map((slide) => (
          <Image
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            width={100}
            height={100}
            priority
          />
        ))}
      </div>

      {/* SVG Image Stage with Venetian Blind Mask */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="product-hero-carousel-mask" maskUnits="userSpaceOnUse">
            <rect
              x="0"
              y="0"
              width={dimensions.width}
              height={dimensions.height}
              fill="black"
            />
            <g ref={blindsGroupRef} id="product-hero-blinds" />
          </mask>
        </defs>

        {/* Base Layer: Currently Settled Image */}
        <image
          ref={baseImageRef}
          href={initialImage}
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full transition-none"
        />

        {/* Transition Layer: Incoming Image Unmasked via Blinds */}
        <image
          ref={maskedImageRef}
          href={initialImage}
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
          preserveAspectRatio="xMidYMid slice"
          mask="url(#product-hero-carousel-mask)"
          className="w-full h-full transition-none"
        />
      </svg>
    </>
  );
}
