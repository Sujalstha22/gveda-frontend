'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { LOGIN_SLIDES } from './loginData';
import { BlindItem } from './loginTypes';

const BLIND_COUNT = 14;

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

  const startAutoplayRef = useRef<() => void>(() => {});

  // Main Transition Execution with SVG attribute animation & subpixel overlap
  const triggerTransition = useCallback((nextIndex: number) => {
    if (isTransitioningRef.current) return;
    const currentIdx = currentIndexRef.current;
    if (nextIndex === currentIdx) return;

    isTransitioningRef.current = true;

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

  // Initialize and handle window resizing
  useEffect(() => {
    updateDimensionsAndBlinds();
    startAutoplay();

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
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (transitionTlRef.current) transitionTlRef.current.kill();
    };
  }, [updateDimensionsAndBlinds, startAutoplay]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-90 sm:min-h-110 lg:min-h-[30vw] aspect-square sm:aspect-4/3 lg:aspect-[4/3.4] overflow-hidden rounded-2xl lg:rounded-[1.2vw] bg-white border border-secondary/30 shadow-2xs"
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
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
    </div>
  );
}
