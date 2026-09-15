'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { LOGIN_STORIES, LOGIN_SLIDES } from './loginData';
import { BlindItem } from './loginTypes';

const BLIND_COUNT = 10;

export default function LoginVisualStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const blindsGroupRef = useRef<SVGGElement | null>(null);
  const baseImageRef = useRef<SVGImageElement | null>(null);
  const maskedImageRef = useRef<SVGImageElement | null>(null);
  const blindsRef = useRef<BlindItem[]>([]);
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTlRef = useRef<gsap.core.Timeline | null>(null);

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 100,
    height: 85,
  });

  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // Calculate viewBox dimensions and build blinds geometry
  const updateDimensionsAndBlinds = useCallback(() => {
    const container = containerRef.current;
    const width = container ? container.clientWidth : 100;
    const height = container ? container.clientHeight : 85;

    const vbWidth = 100;
    const vbHeight = width > 0 ? (height / width) * 100 : 85;

    setDimensions({ width: vbWidth, height: vbHeight });

    const g = blindsGroupRef.current;
    if (!g) return;
    g.innerHTML = '';

    const h = vbHeight / BLIND_COUNT;
    const newBlinds: BlindItem[] = [];
    let currentY = 0;

    for (let i = 0; i < BLIND_COUNT; i++) {
      const centerY = vbHeight - (currentY + h / 2);
      const rectTop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const rectBottom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      [rectTop, rectBottom].forEach((r) => {
        r.setAttribute('x', '0');
        r.setAttribute('width', vbWidth.toString());
        r.setAttribute('height', '0');
        r.setAttribute('fill', 'white');
        r.setAttribute('shape-rendering', 'crispEdges');
      });

      rectTop.setAttribute('y', centerY.toString());
      rectBottom.setAttribute('y', centerY.toString());

      g.appendChild(rectTop);
      g.appendChild(rectBottom);

      newBlinds.push({
        top: rectTop,
        bottom: rectBottom,
        y: centerY,
        h: h / 2,
      });

      currentY += h;
    }

    blindsRef.current = newBlinds;
  }, []);

  const startAutoplayRef = useRef<() => void>(() => { });

  // Main Transition Execution with SVG attribute animation & subpixel overlap
  const triggerTransition = useCallback((nextIndex: number) => {
    if (isTransitioningRef.current) return;
    const currentIdx = currentIndexRef.current;
    if (nextIndex === currentIdx) return;

    isTransitioningRef.current = true;
    setActiveStoryIndex(nextIndex);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (transitionTlRef.current) transitionTlRef.current.kill();

    const blinds = blindsRef.current;
    const maskedImg = maskedImageRef.current;
    const baseImg = baseImageRef.current;

    if (!maskedImg || !baseImg || blinds.length === 0) {
      currentIndexRef.current = nextIndex;
      isTransitioningRef.current = false;
      return;
    }

    maskedImg.setAttribute('href', LOGIN_SLIDES[nextIndex].image);

    // Reset blinds to center with zero height
    blinds.forEach((b) => {
      b.top.setAttribute('y', b.y.toString());
      b.top.setAttribute('height', '0');
      b.bottom.setAttribute('y', b.y.toString());
      b.bottom.setAttribute('height', '0');
    });

    const tl = gsap.timeline({
      onComplete: () => {
        baseImg.setAttribute('href', LOGIN_SLIDES[nextIndex].image);
        blinds.forEach((b) => {
          b.top.setAttribute('y', b.y.toString());
          b.top.setAttribute('height', '0');
          b.bottom.setAttribute('y', b.y.toString());
          b.bottom.setAttribute('height', '0');
        });
        currentIndexRef.current = nextIndex;
        isTransitioningRef.current = false;
        startAutoplayRef.current();
      },
    });

    transitionTlRef.current = tl;

    // Animate SVG attributes expanding from center with smooth easing & subpixel gap fix
    tl.to(
      blinds.flatMap((b) => [b.top, b.bottom]),
      {
        attr: {
          y: (idx) => {
            const b = blinds[Math.floor(idx / 2)];
            return idx % 2 === 0 ? b.y - b.h : b.y;
          },
          height: (idx) => {
            const b = blinds[Math.floor(idx / 2)];
            return b.h + 0.04; // Subpixel overlap prevents 1px line glitch
          },
        },
        duration: 1.25,
        ease: 'power3.out',
        stagger: {
          each: 0.018,
          from: 'start',
        },
      },
      0
    );
  }, []);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const nextIdx = (currentIndexRef.current + 1) % LOGIN_SLIDES.length;
      triggerTransition(nextIdx);
    }, 3200);
  }, [triggerTransition]);

  useEffect(() => {
    startAutoplayRef.current = startAutoplay;
  }, [startAutoplay]);

  // Initialize and handle window/container resizing
  useEffect(() => {
    updateDimensionsAndBlinds();
    startAutoplay();

    const container = containerRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateDimensionsAndBlinds();
      });
      resizeObserver.observe(container);
    }

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensionsAndBlinds, 150);
    };

    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearTimeout(timerRef.current);
      } else {
        startAutoplay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (transitionTlRef.current) transitionTlRef.current.kill();
    };
  }, [updateDimensionsAndBlinds, startAutoplay]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[calc(100vh-7.5rem)] max-h-[820px] overflow-hidden rounded-3xl bg-neutral-900 border border-[#e8e2d9]/60 shadow-[0_16px_45px_rgba(0,0,0,0.06)] flex flex-col justify-between p-6 sm:p-8 lg:p-9 text-white group"
    >
      {/* Background Animated Blinds SVG */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="login-blinds-mask" maskUnits="userSpaceOnUse">
            <rect
              x="0"
              y="0"
              width={dimensions.width}
              height={dimensions.height}
              fill="black"
            />
            <g ref={blindsGroupRef} id="login-blinds-group" />
          </mask>
        </defs>

        {/* Base Settled Image */}
        <image
          ref={baseImageRef}
          href={LOGIN_SLIDES[0].image}
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full transition-none"
        />

        {/* Masked Incoming Image */}
        <image
          ref={maskedImageRef}
          href={LOGIN_SLIDES[0].image}
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
          preserveAspectRatio="xMidYMid slice"
          mask="url(#login-blinds-mask)"
          className="w-full h-full transition-none"
        />
      </svg>

      {/* Subtle Dark Editorial Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/80 pointer-events-none z-1" />

      {/* Top Header Overlay */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="max-w-xs">
          <p className="text-[10px] sm:text-[11px] font-primary font-medium tracking-[0.22em] text-accent-gold uppercase mb-1.5">
            Modern Botanical Care
          </p>
          <h2 className="text-xl sm:text-2xl xl:text-3xl font-heading font-normal tracking-tight text-white leading-snug transition-all duration-500">
            {LOGIN_STORIES[activeStoryIndex]?.title || 'Guiding you to healthy, radiant skin'}
          </h2>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 shadow-xs">
          <Sparkles className="w-4 h-4 text-accent-gold" />
        </div>
      </div>

      {/* Dominant Frosted Glass Story Card with Black Heading */}
      <div className="relative z-10 mt-auto pt-6">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/70 rounded-3xl p-6 sm:p-7 text-primary shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col gap-3.5 transition-all duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-heading font-bold text-primary tracking-tight">
              {LOGIN_STORIES[activeStoryIndex]?.tag}
            </h3>
            {/* Slide indicators that trigger transition between the 3 stories & 3 images */}
            <div className="flex items-center gap-1.5">
              {LOGIN_STORIES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => triggerTransition(idx)}
                  aria-label={`Story ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeStoryIndex === idx
                      ? 'w-6 bg-primary shadow-xs'
                      : 'w-2 bg-primary/25 hover:bg-primary/60'
                    }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm sm:text-[14.5px] text-primary/85 leading-relaxed font-primary font-normal">
            {LOGIN_STORIES[activeStoryIndex]?.quote}
          </p>
          <Link
            href={LOGIN_STORIES[activeStoryIndex]?.link || '/about'}
            className="inline-flex items-center justify-between mt-1 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-black active:scale-[0.99] transition-all text-xs sm:text-[13px] font-semibold group/btn shadow-md self-start"
          >
            <span>{LOGIN_STORIES[activeStoryIndex]?.linkText}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
