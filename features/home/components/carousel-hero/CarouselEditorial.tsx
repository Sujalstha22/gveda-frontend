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
    <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-6 sm:left-12 md:left-16 z-30 max-w-5xl pointer-events-none">

      {/* Main Title (Luxury Serif / Bold Editorial Heading) */}
      <div className="overflow-hidden">
        <h1
          key={`title-${activeSlide.id}`}
          className="font-antessa text-5xl uppercase sm:text-6xl md:text-9xl text-white font-normal tracking-tight leading-none animate-in fade-in slide-in-from-bottom-4 duration-800"
        >
          Rediscover Your Natural Glow
        </h1>
      </div>
    </div>
  );
}
