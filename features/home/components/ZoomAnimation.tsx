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
  { className: "img-pos-tl", defaultStyle: { top: "3vw", left: "10vw" } },
  { className: "img-pos-tr", defaultStyle: { top: "3vw", right: "10vw" } },
  { className: "img-pos-bl", defaultStyle: { bottom: "3vw", left: "18vw" } },
  { className: "img-pos-br", defaultStyle: { bottom: "3vw", right: "18vw" } },
];

export default function ZoomAnimation({
  leftText = "Nature's",
  rightText = "Precision",
  videoSrc = "/videos/gveda-hero-3.mp4",
  images = DEFAULT_IMAGES,
  className = "bg-secondary",
}: ZoomAnimationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const displayImages = images.slice(0, 4);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const smallImages = sectionRef.current?.querySelectorAll<HTMLElement>(
        ".telescope-small-img",
      );

      if (!smallImages) return;

      gsap.set(smallImages, {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        force3D: true,
        opacity: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = gsap.parseEase("power1.inOut")(self.progress);
            if (sectionRef.current) {
              sectionRef.current.style.setProperty(
                "--progress",
                progress.toString(),
              );
            }
          },
        },
      });

      // Four corner images zoom outward towards camera in 3D perspective with smooth fade
      tl.to(
        smallImages,
        {
          z: "85vh",
          opacity: 0,
          scale: 1.15,
          duration: 0.85,
          ease: "power1.in",
        },
        0,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Telescope Zoom Animation"
      className={`telescope-section relative w-full h-screen h-dvh flex items-center justify-center overflow-hidden select-none bg-warm-ivory ${className}`}
      style={{
        ["--progress" as string]: 0,
      }}
    >
      <style jsx global>{`
        .telescope-section {
          --progress: 0;
        }

        .telescope-media {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          transform: scale(var(--progress, 0)) translateZ(0);
          transform-origin: 50% 50%;
          border-radius: calc((1 - var(--progress, 0)) * 84px);
          overflow: hidden;
          will-change: transform, border-radius;
          isolation: isolate;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
        }

        .telescope-media > div,
        .telescope-media video {
          border-radius: inherit;
        }

        .telescope-title {
          font-family: var(--font-antessa, "Antesa", "Antessa", serif);
          font-size: 7.5vw;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-15%);
          z-index: 10;
          pointer-events: none;
          white-space: nowrap;
          padding: 0 1rem;
        }

        .telescope-title .split-left {
          display: inline-block;
          transform: translate3d(
            calc(var(--progress, 0) * (-100vw + 100%) - 0.5vw),
            0,
            0
          );
          opacity: calc(1 - var(--progress, 0) * 1.5);
          will-change: transform, opacity;
        }

        .telescope-title .split-right {
          display: inline-block;
          transform: translate3d(
            calc(var(--progress, 0) * (100vw - 100%)),
            0,
            0
          );
          opacity: calc(1 - var(--progress, 0) * 1.5);
          will-change: transform, opacity;
        }

        .telescope-images-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          perspective: 100vh;
          perspective-origin: 50% 50%;
          z-index: 5;
          pointer-events: none;
        }

        .telescope-small-img {
          position: absolute;
          width: 25vw;
          max-width: 115px;
          height: auto;
          aspect-ratio: 4/5;
          object-fit: contain;
          border-radius: 8px;
          will-change: transform, opacity;
        }

        /* Mobile corner offsets */
        @media (max-width: 768px) {
          .telescope-title {
            font-size: clamp(1.75rem, 7.5vw, 2.75rem);
            letter-spacing: 0.02em;
          }
          .img-pos-tl {
            top: 7vh !important;
            left: 4vw !important;
          }
          .img-pos-tr {
            top: 7vh !important;
            right: 4vw !important;
          }
          .img-pos-bl {
            bottom: 7vh !important;
            left: 4vw !important;
          }
          .img-pos-br {
            bottom: 7vh !important;
            right: 4vw !important;
          }
        }

        /* Tablet (769px - 1023px) */
        @media (min-width: 769px) and (max-width: 1023px) {
          .telescope-title {
            font-size: 6.5vw;
          }
          .telescope-title .split-left {
            transform: translate3d(
              calc(var(--progress, 0) * (-75vw + 100%) - 0.5vw),
              0,
              0
            );
          }
          .telescope-title .split-right {
            transform: translate3d(
              calc(var(--progress, 0) * (75vw - 100%)),
              0,
              0
            );
          }
          .telescope-small-img {
            width: 18vw;
            max-width: 160px;
            border-radius: 10px;
          }
        }

        /* Large Screens / Desktop (1024px+) */
        @media (min-width: 1024px) {
          .telescope-title {
            font-size: 5.2vw;
          }
          .telescope-title .split-left {
            transform: translate3d(
              calc(var(--progress, 0) * (-66vw + 100%) - 0.5vw),
              0,
              0
            );
          }
          .telescope-title .split-right {
            transform: translate3d(
              calc(var(--progress, 0) * (66vw - 100%)),
              0,
              0
            );
          }
          .telescope-small-img {
            width: 14vw;
            max-width: 220px;
            border-radius: 0.8vw;
          }
        }
      `}</style>

      {/* Central Background Media (Scales from 0 to 1 smoothly with scroll) */}
      <div className="telescope-media rounded-[inherit]">
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[inherit]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full object-center rounded-[inherit]"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Soft luxury film tone */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-[inherit]" />
        </div>
      </div>

      {/* Central Splitting Headline */}
      <h2 className="telescope-title font-antessa uppercase text-2xl min-[360px]:text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-[5.2vw] text-primary tracking-normal sm:tracking-wider">
        <span className="split-left mr-2 sm:mr-3 lg:mr-[0.8vw]">{leftText}</span>
        <span className="split-right">{rightText}</span>
      </h2>

      {/* 4 Corner Images in 3D Perspective */}
      <div className="telescope-images-container">
        {displayImages.map((src, idx) => {
          const pos = FOUR_POSITIONS[idx] || FOUR_POSITIONS[0];
          return (
            <Image
              key={idx}
              src={src}
              alt={`Product card ${idx + 1}`}
              width={400}
              height={500}
              sizes="(max-width: 768px) 26vw, (max-width: 1024px) 18vw, 14vw"
              className={`telescope-small-img ${pos.className}`}
              style={pos.defaultStyle}
            />
          );
        })}
      </div>
    </section>
  );
}
