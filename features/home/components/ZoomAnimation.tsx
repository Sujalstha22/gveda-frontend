'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ZoomAnimationProps {
  leftText?: string;
  rightText?: string;
  videoSrc?: string;
  images?: string[];
  className?: string;
}

const DEFAULT_IMAGES = [
  '/images/about/img-1.jpg', // Top-Left: Botanical forest
  '/images/about/img-4.jpg', // Top-Right: Pure mountain minerals
  '/images/about/img-2.jpg', // Bioactive flora
  '/images/about/img-5.jpg', // Micro extraction
];

const FOUR_POSITIONS = [
  { className: 'img-pos-tl', defaultStyle: { top: '3vw', left: '10vw' } },
  { className: 'img-pos-tr', defaultStyle: { top: '3vw', right: '10vw' } },
  { className: 'img-pos-bl', defaultStyle: { bottom: '3vw', left: '18vw' } },
  { className: 'img-pos-br', defaultStyle: { bottom: '3vw', right: '18vw' } },
];

export default function ZoomAnimation({
  leftText = 'For The',
  rightText = 'Beauty',
  videoSrc = '/videos/gveda-hero-3.mp4',
  images = DEFAULT_IMAGES,
  className = 'bg-secondary/20',
}: ZoomAnimationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const smallImages = sectionRef.current?.querySelectorAll<HTMLElement>('.telescope-small-img');

      if (!smallImages) return;

      gsap.set(smallImages, {
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = gsap.parseEase('power1.inOut')(self.progress);
            if (sectionRef.current) {
              sectionRef.current.style.setProperty('--progress', progress.toString());
            }
          },
        },
      });

      // Four corner images zoom outward towards camera in 3D perspective
      tl.to(
        smallImages,
        {
          z: '135vh',
          duration: 0.85,
          ease: 'power1.in',
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const displayImages = images.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      aria-label="Telescope Zoom Animation"
      className={`telescope-section relative w-full h-screen flex items-center justify-center overflow-hidden select-none bg-background ${className}`}
      style={{
        ['--progress' as string]: 0,
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
          transform: scale(var(--progress, 0));
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .telescope-title {
          font-size: 8.5vw;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-15%);
          z-index: 10;
          pointer-events: none;
        }

        .telescope-title .split-left {
          display: inline-block;
          transform: translate3d(calc(var(--progress, 0) * (-100vw + 100%) - 0.5vw), 0, 0);
          will-change: transform;
        }

        .telescope-title .split-right {
          display: inline-block;
          transform: translate3d(calc(var(--progress, 0) * (100vw - 100%)), 0, 0);
          will-change: transform;
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
          width: 26vw;
          height: auto;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 6px;
          will-change: transform;
        }

        /* Mobile corner offsets */
        @media (max-width: 768px) {
          .img-pos-tl {
            top: 14vw !important;
            left: 4vw !important;
          }
          .img-pos-tr {
            top: 14vw !important;
            right: 4vw !important;
          }
          .img-pos-bl {
            bottom: 14vw !important;
            left: 4vw !important;
          }
          .img-pos-br {
            bottom: 14vw !important;
            right: 4vw !important;
          }
        }

        /* Tablet (769px - 1023px) */
        @media (min-width: 769px) and (max-width: 1023px) {
          .telescope-title {
            font-size: 5.5vw;
          }
          .telescope-title .split-left {
            transform: translate3d(calc(var(--progress, 0) * (-75vw + 100%) - 0.5vw), 0, 0);
          }
          .telescope-title .split-right {
            transform: translate3d(calc(var(--progress, 0) * (75vw - 100%)), 0, 0);
          }
          .telescope-small-img {
            width: 18vw;
            border-radius: 8px;
          }
        }

        /* Large Screens / Desktop (1024px+) */
        @media (min-width: 1024px) {
          .telescope-title {
            font-size: 4vw;
          }
          .telescope-title .split-left {
            transform: translate3d(calc(var(--progress, 0) * (-66vw + 100%) - 0.5vw), 0, 0);
          }
          .telescope-title .split-right {
            transform: translate3d(calc(var(--progress, 0) * (66vw - 100%)), 0, 0);
          }
          .telescope-small-img {
            width: 14vw;
            border-radius: 0.6vw;
          }
        }
      `}</style>

      {/* Central Background Media (Scales from 0 to 1 smoothly with scroll) */}
      <div className="telescope-media">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full object-top"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Central Splitting Headline */}
      <h2 className="telescope-title font-heading text-primary tracking-normal">
        <span className="split-left mr-3 lg:mr-[0.8vw]">{leftText}</span>
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
              alt={`Botanical element ${idx + 1}`}
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