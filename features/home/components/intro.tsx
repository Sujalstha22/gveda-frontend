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
      className="relative w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-between items-center pt-16 sm:pt-20 lg:pt-[4vw] px-4 sm:px-8 lg:px-[5vw] overflow-hidden select-none bg-primary"
    >
      {/* Ambient Background Radial Glows & Focused Brownish Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] lg:w-[45vw] aspect-square rounded-full bg-accent-gold/10 blur-[80px] lg:blur-[5vw] pointer-events-none -z-10"
      />

      {/* Rich Warm Brownish Gradient Focusing the Image Area */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110vw] sm:w-[90vw] lg:w-[65vw] h-[60vh] lg:h-[72vh] rounded-t-full bg-[radial-gradient(ellipse_at_bottom,_rgba(92,59,36,0.55)_0%,_rgba(61,37,22,0.35)_40%,_rgba(189,159,125,0.12)_65%,_transparent_85%)] blur-[60px] lg:blur-[90px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70vw] lg:w-[42vw] aspect-square rounded-full bg-[#5C3B24]/40 blur-[90px] lg:blur-[120px] pointer-events-none -z-10"
      />

      {/* Typography Depth Layer */}
      <div
        ref={textRef}
        className="relative z-10 w-full lg:max-w-[75vw] flex flex-col items-center text-center mx-auto will-change-transform"
      >
        <div className="flex flex-col items-center">
          <span className="font-heading capitalize font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[3.2vw] lg:leading-[1.15] text-white tracking-wide">
            Flaunt the
          </span>
          <span className="font-madison italic font-normal text-7xl sm:text-8xl md:text-9xl lg:text-[7.5vw] lg:leading-[0.92] text-accent-gold mt-1 sm:mt-2 lg:mt-[0.4vw]">
            glow
          </span>
        </div>
        <div className="flex flex-col items-center mt-8 sm:mt-10 lg:mt-[2.2vw]">
          <span className="font-heading font-medium capitalize text-3xl sm:text-4xl md:text-5xl lg:text-[3.2vw] lg:leading-[1.15] text-white tracking-wide">
            Forget the
          </span>
          <span className="font-madison italic font-normal text-7xl sm:text-8xl md:text-9xl lg:text-[7.5vw] lg:leading-[0.92] text-accent-gold mt-1 sm:mt-2 lg:mt-[0.4vw]">
            flaws.
          </span>
        </div>
      </div>

      {/* Model Profile Image Depth Layer */}
      <div
        ref={imageRef}
        className="relative z-0 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-[50vw] aspect-16/11 sm:aspect-16/10 lg:aspect-16/10 mt-6 sm:mt-10 md:mt-12 lg:mt-[2vw] flex items-end justify-center pointer-events-none will-change-transform"
      >
        {/* Soft Focused Core Glow directly behind the model silhouette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full bg-[radial-gradient(circle,_rgba(120,75,45,0.45)_0%,_rgba(92,59,36,0.25)_50%,_transparent_80%)] blur-[50px] lg:blur-[70px] pointer-events-none"
        />

        <Image
          src="/images/home/intro.png"
          alt="Luminous, radiant skin profile - GVEDA"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 50vw"
          className="object-contain object-bottom relative z-10"
        />
      </div>
    </section>
  );
}
