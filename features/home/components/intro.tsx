"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Multi-layer depth parallax timeline scrubbed to scroll (Desktop only)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 1. Text Layer: Gently floats upward at a slower rate
      tl.fromTo(textRef.current, { y: 0 }, { y: 90, ease: "none" }, 0);

      // 2. Image Layer: Ascends faster with subtle scale breath into the light
      tl.fromTo(
        imageRef.current,
        { y: 50, scale: 0.9 },
        { y: 0, scale: 1, ease: "none" },
        0,
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Brand Philosophy"
      className="relative w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-between items-center pt-16 sm:pt-20 lg:pt-[4vw] px-4 sm:px-8 lg:px-[5vw] overflow-hidden select-none"
    >
      {/* Ambient Background Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] lg:w-[45vw] aspect-square rounded-full bg-accent-gold/10 blur-[80px] lg:blur-[5vw] pointer-events-none -z-10"
      />

      {/* Typography Depth Layer */}
      <div
        ref={textRef}
        className="relative z-10 w-full lg:max-w-[65vw] flex flex-col items-center text-center mx-auto will-change-transform"
      >
        <div className="flex flex-col items-center">
          <span className="font-antessa font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[2.5vw] lg:leading-[1.15] text-primary">
            Flaunt the
          </span>
          <span className="font-madison italic font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[5.5vw] lg:leading-[0.95] text-accent-gold mt-1 sm:mt-2 lg:mt-[0.4vw]">
            glow
          </span>
        </div>
        <div className="flex flex-col items-center mt-6 sm:mt-8 lg:mt-[1.8vw]">
          <span className="font-antessa font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[2.5vw] lg:leading-[1.15] text-primary">
            Forget the
          </span>
          <span className="font-madison italic font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[5.5vw] lg:leading-[0.95] text-accent-gold mt-1 sm:mt-2 lg:mt-[0.4vw]">
            flaws.
          </span>
        </div>
      </div>

      {/* Model Profile Image Depth Layer */}
      <div
        ref={imageRef}
        className="relative z-0 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-[50vw] aspect-16/11 sm:aspect-16/10 lg:aspect-16/10 mt-6 sm:mt-10 md:mt-12 lg:mt-[2vw] flex items-end justify-center pointer-events-none will-change-transform"
      >
        <Image
          src="/images/home/intro.png"
          alt="Luminous, radiant skin profile - GVEDA"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 50vw"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
