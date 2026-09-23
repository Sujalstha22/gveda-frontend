"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePreloader } from "@/shared/context/PreloaderContext";
import { SlideData } from "./types";

interface CarouselEditorialProps {
  activeSlide?: SlideData;
}

export default function CarouselEditorial({ }: CarouselEditorialProps) {
  const { heroReady } = usePreloader();
  const pathname = usePathname();

  return (
    <div className="absolute bottom-28 min-[380px]:bottom-32 sm:bottom-36 md:bottom-8 lg:bottom-10 left-5 sm:left-8 md:left-12 lg:left-16 right-5 md:right-auto z-30 max-w-5xl pointer-events-none">
      {/* Main Title with Soft Entrance Reveal on Page Load & Route Transition */}
      <div className="overflow-hidden py-1">
        <motion.h1
          key={`hero-title-${pathname}`}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={
            heroReady
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 40, filter: "blur(8px)" }
          }
          transition={{
            duration: 1.4,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-heading font-medium text-2xl min-[360px]:text-3xl min-[410px]:text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl text-white tracking-tight leading-[1.05] md:leading-none"
        >
          Rediscover Your Natural Glow
        </motion.h1>
      </div>
    </div>
  );
}
