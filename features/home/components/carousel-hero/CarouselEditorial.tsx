"use client";

import React from "react";
import { SlideData } from "./types";

interface CarouselEditorialProps {
  activeSlide: SlideData;
}

export default function CarouselEditorial({
  activeSlide,
}: CarouselEditorialProps) {
  return (
    <div className="absolute bottom-28 min-[380px]:bottom-32 sm:bottom-36 md:bottom-8 lg:bottom-10 left-5 sm:left-8 md:left-12 lg:left-16 right-5 md:right-auto z-30 max-w-5xl pointer-events-none">
      {/* Main Title (Luxury Serif / Bold Editorial Heading) */}
      <div className="overflow-visible">
        <h1
          key={`title-${activeSlide.id}`}
          className="font-heading font-medium text-2xl min-[360px]:text-3xl min-[410px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-normal tracking-tight leading-[1.05] md:leading-none  animate-in fade-in slide-in-from-bottom-4 duration-800"
        >
          Rediscover Your Natural Glow
        </h1>
      </div>
    </div>
  );
}
