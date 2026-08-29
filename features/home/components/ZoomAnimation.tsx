'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ZoomAnimationProps {
  leftText?: string;
  rightText?: string;
  mainImage?: string;
  videoSrc?: string;
  images?: string[];
  className?: string;
}

const DEFAULT_IMAGES = [
  '/images/about/img-1.jpg', // Top-Left: Botanical forest
  '/images/about/img-4.jpg', // Top-Right: Pure mountain minerals
  '/images/about/img-2.jpg', // Bottom-Left: Bioactive flora
  '/images/about/img-5.jpg', // Bottom-Right: Micro extraction
];

const FOUR_POSITIONS = [
  { className: 'img-pos-tl', defaultStyle: { top: '2vw', left: '12vw' } },
  { className: 'img-pos-tr', defaultStyle: { top: '2vw', right: '12vw' } },
  { className: 'img-pos-bl', defaultStyle: { bottom: '2vw', left: '20vw' } },
  { className: 'img-pos-br', defaultStyle: { bottom: '2vw', right: '20vw' } },
];

export default function ZoomAnimation({
  leftText = 'For The',
  rightText = 'Beauty',
  videoSrc = '/videos/gveda-about.mp4',
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

      // 1. Four corner images zoom briskly outward towards camera in 3D perspective
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
          font-size: 3.5vw;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-15%);
          z-index: 10;
          pointer-events: none;
        }

        .telescope-title .split-left {
          display: inline-block;
          transform: translate3d(calc(var(--progress, 0) * (-66vw + 100%) - 0.5vw), 0, 0);
          will-change: transform;
        }

        .telescope-title .split-right {
          display: inline-block;
          transform: translate3d(calc(var(--progress, 0) * (66vw - 100%)), 0, 0);
          will-change: transform;
        }

        @media (max-width: 768px) {
          .telescope-title {
            font-size: 8.5vw;
          }
          .telescope-title .split-left {
            transform: translate3d(calc(var(--progress, 0) * (-100vw + 100%) - 0.5vw), 0, 0);
          }
          .telescope-title .split-right {
            transform: translate3d(calc(var(--progress, 0) * (100vw - 100%)), 0, 0);
          }
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
          width: 16vw;
          height: auto;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 8px;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .telescope-small-img {
            width: 28vw;
          }
          .img-pos-tl {
            top: 14vw !important;
            left: 5vw !important;
          }
          .img-pos-tr {
            top: 14vw !important;
            right: 5vw !important;
          }
          .img-pos-bl {
            bottom: 14vw !important;
            left: 5vw !important;
          }
          .img-pos-br {
            bottom: 14vw !important;
            right: 5vw !important;
          }
        }
      `}</style>

      {/* Central Background Media (Scales from 0 to 1 smoothly with scroll) */}
      <div className="telescope-media">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full object-center"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Previous image code kept commented out:
          <Image
            src={mainImage}
            alt="Telescope view background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          */}
        </div>
      </div>

      {/* Central Splitting Headline */}
      <h2 className="telescope-title font-heading text-foreground tracking-normal">
        <span className="split-left mr-3">{leftText}</span>
        <span className="split-right">{rightText}</span>
      </h2>

      {/* 4 Clean Images on Four Sides Flying in 3D Perspective */}
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
              sizes="(max-width: 768px) 28vw, 16vw"
              className={`telescope-small-img ${pos.className}`}
              style={pos.defaultStyle}
            />
          );
        })}
      </div>
    </section>
  );
}