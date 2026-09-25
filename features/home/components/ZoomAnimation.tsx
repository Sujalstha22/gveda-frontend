"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ZoomAnimationProps {
  leftText?: string;
  rightText?: string;
  videoSrc?: string;
  images?: string[];
  className?: string;
}

const DEFAULT_IMAGES = [
  "/zoomanimation/1product.png", // Keratin Shampoo
  "/zoomanimation/2product.png", // Niacinamide Face Wash
  "/zoomanimation/3product.png", // Retinol C Face Toner
  "/zoomanimation/4product.png", // Shea Butter Body Lotion
];

const FOUR_POSITIONS = [
  {
    key: "tl",
    posClasses: "top-[7vh] md:top-[4vw] left-[4vw] md:left-[8vw]",
    initialRotation: -6,
    endRotation: -24,
    xVector: -60,
    yVector: -45,
  },
  {
    key: "tr",
    posClasses: "top-[7vh] md:top-[4vw] right-[4vw] md:right-[8vw]",
    initialRotation: 6,
    endRotation: 24,
    xVector: 60,
    yVector: -45,
  },
  {
    key: "bl",
    posClasses: "bottom-[7vh] md:bottom-[4vw] left-[4vw] md:left-[8vw]",
    initialRotation: -5,
    endRotation: -20,
    xVector: -60,
    yVector: 45,
  },
  {
    key: "br",
    posClasses: "bottom-[7vh] md:bottom-[4vw] right-[4vw] md:right-[8vw]",
    initialRotation: 5,
    endRotation: 20,
    xVector: 60,
    yVector: 45,
  },
];

export default function ZoomAnimation({
  leftText = "Everyday",
  rightText = "Wellness",
  videoSrc = "/videos/gveda-hero-3.mp4",
  images = DEFAULT_IMAGES,
  className = "",
}: ZoomAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoSlotRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleLeftRef = useRef<HTMLSpanElement>(null);
  const titleRightRef = useRef<HTMLSpanElement>(null);
  const cornerImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const displayImages = images.slice(0, 4);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // Ensure video plays smoothly
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => { });
    }

    const mm = gsap.matchMedia();

    // Mobile & Tablet (< 768px)
    mm.add("(max-width: 768px)", () => {
      const smallImages = cornerImagesRef.current.filter(Boolean) as HTMLDivElement[];
      const videoSlot = videoSlotRef.current;
      const left = titleLeftRef.current;
      const right = titleRightRef.current;

      if (!videoSlot || !left || !right) return;

      gsap.set(videoSlot, {
        width: "72px",
        height: "44px",
        borderRadius: "22px",
        borderWidth: "1px",
        borderColor: "rgba(189, 159, 125, 0.45)",
        force3D: true,
        transformOrigin: "50% 50%",
      });

      gsap.set([left, right], {
        xPercent: 0,
        opacity: 1,
        force3D: true,
      });

      smallImages.forEach((img, idx) => {
        const pos = FOUR_POSITIONS[idx] || FOUR_POSITIONS[0];
        gsap.set(img, {
          xPercent: 0,
          yPercent: 0,
          rotation: pos.initialRotation,
          scale: 1,
          opacity: 1,
          force3D: true,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 1. Central video slot expands, pushing text left and right without overlap
      tl.to(
        videoSlot,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          borderColor: "rgba(189, 159, 125, 0)",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Headline text parts outward cleanly
      tl.to(
        left,
        {
          xPercent: -100,
          opacity: 0,
          duration: 0.7,
          ease: "power2.in",
        },
        0
      );

      tl.to(
        right,
        {
          xPercent: 100,
          opacity: 0,
          duration: 0.7,
          ease: "power2.in",
        },
        0
      );

      // 3. Side bottles tilt and glide outward
      smallImages.forEach((img, idx) => {
        const pos = FOUR_POSITIONS[idx] || FOUR_POSITIONS[0];
        tl.to(
          img,
          {
            xPercent: pos.xVector * 0.75,
            yPercent: pos.yVector * 0.75,
            rotation: pos.endRotation,
            scale: 1.15,
            opacity: 0,
            duration: 0.75,
            ease: "power1.in",
          },
          0
        );
      });
    });

    // Desktop (>= 769px)
    mm.add("(min-width: 769px)", () => {
      const smallImages = cornerImagesRef.current.filter(Boolean) as HTMLDivElement[];
      const videoSlot = videoSlotRef.current;
      const left = titleLeftRef.current;
      const right = titleRightRef.current;

      if (!videoSlot || !left || !right) return;

      gsap.set(videoSlot, {
        width: "135px",
        height: "76px",
        borderRadius: "38px",
        borderWidth: "1.5px",
        borderColor: "rgba(189, 159, 125, 0.5)",
        force3D: true,
        transformOrigin: "50% 50%",
      });

      gsap.set([left, right], {
        xPercent: 0,
        opacity: 1,
        force3D: true,
      });

      smallImages.forEach((img, idx) => {
        const pos = FOUR_POSITIONS[idx] || FOUR_POSITIONS[0];
        gsap.set(img, {
          xPercent: 0,
          yPercent: 0,
          rotation: pos.initialRotation,
          scale: 1,
          opacity: 1,
          force3D: true,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Central video slot expands from inline capsule to full viewport
      tl.to(
        videoSlot,
        {
          width: "105vw",
          height: "102vh",
          borderRadius: "0px",
          borderColor: "rgba(189, 159, 125, 0)",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Headline text pushes outward
      tl.to(
        left,
        {
          xPercent: -120,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        0
      );

      tl.to(
        right,
        {
          xPercent: 120,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        0
      );

      // 3. Four corner bottles tilt dynamically as they drift offscreen
      smallImages.forEach((img, idx) => {
        const pos = FOUR_POSITIONS[idx] || FOUR_POSITIONS[0];
        tl.to(
          img,
          {
            xPercent: pos.xVector,
            yPercent: pos.yVector,
            rotation: pos.endRotation,
            scale: 1.25,
            opacity: 0,
            duration: 0.85,
            ease: "power1.in",
          },
          0
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Telescope Zoom Animation"
      className={`relative w-full h-[220vh] md:h-[260vh] bg-[#120D09] bg-[radial-gradient(ellipse_at_center,_#36261B_0%,_#201710_45%,_#0E0A07_100%)] overflow-clip ${className}`}
    >
      {/* Ambient Botanical Gold & Warm Brown Atmosphere Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[650px] h-[50vh] max-h-[500px] bg-[#BD9F7D]/15 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[40vh] max-h-[400px] bg-[#5C432D]/20 rounded-full blur-[160px] pointer-events-none select-none" />

      {/* 
        Native CSS Sticky Container
      */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden select-none"
      >
        {/* Central Headline with Inline Expanding Video Slot that pushes text apart */}
        <div className="relative z-10 w-full flex items-center justify-center pointer-events-none select-none px-4">
          <h2 className="font-heading flex items-center justify-center text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-[5.5vw] text-white tracking-tight font-medium">
            <span
              ref={titleLeftRef}
              className="inline-block whitespace-nowrap will-change-transform"
            >
              {leftText}
            </span>

            {/* Expanding Video Pill that physically pushes text apart */}
            <span
              ref={videoSlotRef}
              className="inline-flex items-center justify-center mx-2.5 sm:mx-4 md:mx-6 overflow-hidden shadow-[0_0_35px_rgba(189,159,125,0.25)] will-change-[width,height,border-radius,border-color] relative z-20 shrink-0"
              style={{
                width: "135px",
                height: "76px",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              {/* Subtle luxury film grade tint */}
              <span className="absolute inset-0 bg-black/25 pointer-events-none" />
            </span>

            <span
              ref={titleRightRef}
              className="inline-block whitespace-nowrap will-change-transform"
            >
              {rightText}
            </span>
          </h2>
        </div>

        {/* 4 Floating Corner Product Bottles with Physics Tilt on Scroll */}
        <div className="absolute inset-0 w-full h-full z-[5] pointer-events-none select-none overflow-hidden">
          {displayImages.map((src, idx) => {
            const pos = FOUR_POSITIONS[idx] || FOUR_POSITIONS[0];
            return (
              <div
                key={idx}
                ref={(el) => {
                  cornerImagesRef.current[idx] = el;
                }}
                className={`absolute ${pos.posClasses} will-change-transform`}
                style={{
                  transform: `rotate(${pos.initialRotation}deg)`,
                }}
              >
                <div className="relative drop-shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
                  <Image
                    src={src}
                    alt={`Botanical product ${idx + 1}`}
                    width={400}
                    height={500}
                    priority
                    sizes="(max-width: 768px) 25vw, (max-width: 1024px) 18vw, 14vw"
                    className="w-[24vw] max-w-[115px] sm:w-[20vw] sm:max-w-[145px] md:w-[16vw] md:max-w-[175px] lg:w-[14vw] lg:max-w-[220px] aspect-[4/5] object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
