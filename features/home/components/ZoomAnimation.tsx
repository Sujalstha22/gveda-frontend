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
    posClasses: "top-[6vh] md:top-[3vw] left-[4vw] md:left-[10vw]",
  },
  {
    key: "tr",
    posClasses: "top-[6vh] md:top-[3vw] right-[4vw] md:right-[10vw]",
  },
  {
    key: "bl",
    posClasses: "bottom-[6vh] md:bottom-[3vw] left-[4vw] md:left-[18vw]",
  },
  {
    key: "br",
    posClasses: "bottom-[6vh] md:bottom-[3vw] right-[4vw] md:right-[18vw]",
  },
];

export default function ZoomAnimation({
  leftText = "Everyday",
  rightText = "Wellness",
  videoSrc = "/videos/gveda-hero-3.mp4",
  images = DEFAULT_IMAGES,
  className = "bg-secondary",
}: ZoomAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleLeftRef = useRef<HTMLSpanElement>(null);
  const titleRightRef = useRef<HTMLSpanElement>(null);
  const cornerImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const displayImages = images.slice(0, 4);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // Ensure video is playing smoothly
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => { });
    }

    const mm = gsap.matchMedia();

    // Mobile & Tablet (< 769px): Native CSS Sticky + Hardware-accelerated GSAP Scrub
    mm.add("(max-width: 768px)", () => {
      const smallImages = cornerImagesRef.current.filter(Boolean) as HTMLDivElement[];
      const media = mediaRef.current;
      const mediaCard = mediaCardRef.current;
      const left = titleLeftRef.current;
      const right = titleRightRef.current;

      if (!media || !mediaCard || !left || !right) return;

      gsap.set(media, {
        scale: 0,
        opacity: 0.3,
        force3D: true,
        transformOrigin: "50% 50%",
      });
      gsap.set(mediaCard, {
        borderRadius: "24px",
        force3D: true,
      });
      gsap.set([left, right], {
        xPercent: 0,
        opacity: 1,
        force3D: true,
      });
      if (smallImages.length) {
        gsap.set(smallImages, {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
        });
      }

      // Native sticky avoids JS pin-spacer insertion and fixes the snap/jump glitch
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8, // Smooth touch scroll damping on mobile
          invalidateOnRefresh: true,
        },
      });

      // 1. Central media scales up smoothly without layout thrashing
      tl.to(
        media,
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        0,
      );

      tl.to(
        mediaCard,
        {
          borderRadius: "0px",
          duration: 0.85,
          ease: "power1.inOut",
        },
        0,
      );

      // 2. Central splitting headline moves outward smoothly
      tl.to(
        left,
        {
          xPercent: -100,
          opacity: 0,
          duration: 0.7,
          ease: "power1.in",
        },
        0,
      );
      tl.to(
        right,
        {
          xPercent: 100,
          opacity: 0,
          duration: 0.7,
          ease: "power1.in",
        },
        0,
      );

      // 3. Four corner images glide outward and fade cleanly
      const mobileVectors = [
        { xPercent: -45, yPercent: -35 }, // Top-Left
        { xPercent: 45, yPercent: -35 },  // Top-Right
        { xPercent: -45, yPercent: 35 },  // Bottom-Left
        { xPercent: 45, yPercent: 35 },   // Bottom-Right
      ];

      smallImages.forEach((img, idx) => {
        const v = mobileVectors[idx] || mobileVectors[0];
        tl.to(
          img,
          {
            xPercent: v.xPercent,
            yPercent: v.yPercent,
            scale: 1.15,
            opacity: 0,
            duration: 0.75,
            ease: "power1.in",
          },
          0,
        );
      });
    });

    // Desktop (>= 769px)
    mm.add("(min-width: 769px)", () => {
      const smallImages = cornerImagesRef.current.filter(Boolean) as HTMLDivElement[];
      const media = mediaRef.current;
      const mediaCard = mediaCardRef.current;
      const left = titleLeftRef.current;
      const right = titleRightRef.current;

      if (!media || !mediaCard || !left || !right) return;

      gsap.set(media, {
        scale: 0,
        opacity: 0.2,
        force3D: true,
        transformOrigin: "50% 50%",
      });
      gsap.set(mediaCard, {
        borderRadius: "44px",
        force3D: true,
      });
      gsap.set([left, right], {
        xPercent: 0,
        opacity: 1,
        force3D: true,
      });
      if (smallImages.length) {
        gsap.set(smallImages, {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Central media scales up to fill viewport
      tl.to(
        media,
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        0,
      );

      tl.to(
        mediaCard,
        {
          borderRadius: "0px",
          duration: 0.9,
          ease: "power1.inOut",
        },
        0,
      );

      // 2. Central splitting headline moves outward
      tl.to(
        left,
        {
          xPercent: -130,
          opacity: 0,
          duration: 0.8,
          ease: "power1.in",
        },
        0,
      );
      tl.to(
        right,
        {
          xPercent: 130,
          opacity: 0,
          duration: 0.8,
          ease: "power1.in",
        },
        0,
      );

      // 3. Four corner images glide outward and expand
      const desktopVectors = [
        { xPercent: -60, yPercent: -45 }, // Top-Left
        { xPercent: 60, yPercent: -45 },  // Top-Right
        { xPercent: -60, yPercent: 45 },  // Bottom-Left
        { xPercent: 60, yPercent: 45 },   // Bottom-Right
      ];

      smallImages.forEach((img, idx) => {
        const v = desktopVectors[idx] || desktopVectors[0];
        tl.to(
          img,
          {
            xPercent: v.xPercent,
            yPercent: v.yPercent,
            scale: 1.25,
            opacity: 0,
            duration: 0.8,
            ease: "power1.in",
          },
          0,
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Telescope Zoom Animation"
      className={`relative w-full h-[220vh] md:h-[250vh] bg-warm-ivory ${className}`}
    >
      {/* 
        Native CSS Sticky:
        Pins natively at the compositor level with 0ms latency.
        Completely eliminates JS pin-spacer DOM thrashing and Lenis scroll snap-backs.
      */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden select-none"
      >
        {/* Central Background Media */}
        <div
          ref={mediaRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-[1] will-change-transform"
          style={{
            transformOrigin: "50% 50%",
          }}
        >
          <div
            ref={mediaCardRef}
            className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-[40px] will-change-transform"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="object-cover w-full h-full object-center pointer-events-none select-none"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            {/* Soft luxury film tone */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </div>

        {/* Central Splitting Headline */}
        <h2
          className="relative z-10 uppercase flex items-center justify-center  text-2xl min-[360px]:text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-[5.2vw] text-primary tracking-normal sm:tracking-wider pointer-events-none select-none whitespace-nowrap px-4 md:translate-x-8"
          style={{ fontFamily: 'var(--font-galvero, "Galvero", "Galvero DEMO", serif)' }}
        >
          <span
            ref={titleLeftRef}
            className="inline-block mr-2 sm:mr-3 lg:mr-[0.8vw] will-change-transform"
          >
            {leftText}
          </span>
          <span
            ref={titleRightRef}
            className="inline-block will-change-transform"
          >
            {rightText}
          </span>
        </h2>

        {/* 4 Corner Images in Perspective */}
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
              >
                <Image
                  src={src}
                  alt={`Product card ${idx + 1}`}
                  width={400}
                  height={500}
                  priority
                  sizes="(max-width: 768px) 25vw, (max-width: 1024px) 18vw, 14vw"
                  className="w-[24vw] max-w-[110px] sm:w-[20vw] sm:max-w-[140px] md:w-[16vw] md:max-w-[170px] lg:w-[14vw] lg:max-w-[220px] aspect-[4/5] object-contain rounded-lg md:rounded-xl "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
