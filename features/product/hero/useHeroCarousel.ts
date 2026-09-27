'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ProductHeroSlide, BlindItem } from './heroTypes';

interface UseHeroCarouselOptions {
  slides: ProductHeroSlide[];
  intervalMs: number;
  blindCount: number;
}

export function useHeroCarousel({
  slides,
  intervalMs,
  blindCount,
}: UseHeroCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 100,
    height: 56.25,
  });

  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blindsGroupRef = useRef<SVGGElement>(null);
  const baseImageRef = useRef<SVGImageElement>(null);
  const maskedImageRef = useRef<SVGImageElement>(null);
  const blindsRef = useRef<BlindItem[]>([]);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  const isTransitioningRef = useRef(false);
  const currentIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const transitionTlRef = useRef<gsap.core.Timeline | null>(null);

  // Sync index ref
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Generate blinds SVG geometry matching ScrollReveal.tsx
  const updateDimensionsAndBlinds = useCallback(() => {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    const vbWidth = 100;
    const vbHeight = (height / width) * 100;

    setDimensions({ width: vbWidth, height: vbHeight });

    const g = blindsGroupRef.current;
    if (!g) return;
    g.innerHTML = '';

    const h = vbHeight / blindCount;
    const newBlinds: BlindItem[] = [];
    let currentY = 0;

    for (let i = 0; i < blindCount; i++) {
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
  }, [blindCount]);

  // Main Transition Execution: SVG Blinds Mask Reveal & Text Clipping
  const triggerTransition = useCallback(
    (nextIndex: number, direction: 'next' | 'prev' = 'next') => {
      if (isTransitioningRef.current) return;
      const currentIdx = currentIndexRef.current;
      if (nextIndex === currentIdx) return;

      isTransitioningRef.current = true;

      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressTweenRef.current) progressTweenRef.current.kill();
      if (transitionTlRef.current) transitionTlRef.current.kill();

      const blinds = blindsRef.current;
      const maskedImg = maskedImageRef.current;
      const baseImg = baseImageRef.current;
      const stageEl = stageRef.current;

      if (!maskedImg || !baseImg || blinds.length === 0 || !stageEl) {
        setCurrentIndex(nextIndex);
        currentIndexRef.current = nextIndex;
        isTransitioningRef.current = false;
        return;
      }

      maskedImg.setAttribute('href', slides[nextIndex].image);

      blinds.forEach((b) => {
        b.top.setAttribute('y', b.y.toString());
        b.top.setAttribute('height', '0');
        b.bottom.setAttribute('y', b.y.toString());
        b.bottom.setAttribute('height', '0');
      });

      const textEls = stageEl.querySelectorAll<HTMLElement>('.product-hero-txt');
      const prevText = textEls[currentIdx];
      const nextText = textEls[nextIndex];

      const tl = gsap.timeline({
        onComplete: () => {
          baseImg.setAttribute('href', slides[nextIndex].image);

          blinds.forEach((b) => {
            b.top.setAttribute('y', b.y.toString());
            b.top.setAttribute('height', '0');
            b.bottom.setAttribute('y', b.y.toString());
            b.bottom.setAttribute('height', '0');
          });

          setCurrentIndex(nextIndex);
          currentIndexRef.current = nextIndex;
          isTransitioningRef.current = false;
        },
      });

      transitionTlRef.current = tl;

      // 1. Animate outgoing text
      if (prevText) {
        tl.to(
          prevText,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            y: -25,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          0
        );
      }

      // 2. Animate blind rectangles expanding outwards
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
              return b.h + 0.02;
            },
          },
          duration: 1.3,
          ease: 'power3.out',
          stagger: {
            each: 0.015,
            from: direction === 'prev' ? 'end' : 'start',
          },
        },
        0
      );

      // 3. Animate incoming text
      if (nextText) {
        tl.fromTo(
          nextText,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            y: 35,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.0,
            ease: 'expo.out',
          },
          0.3
        );
      }
    },
    [slides]
  );

  // Start Autoplay & Segment Progress Fill
  const startAutoplay = useCallback(
    (activeIdx: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressTweenRef.current) progressTweenRef.current.kill();

      progressBarsRef.current.forEach((bar, i) => {
        if (!bar) return;
        if (i < activeIdx) {
          bar.style.width = '100%';
        } else {
          bar.style.width = '0%';
        }
      });

      const activeBar = progressBarsRef.current[activeIdx];
      if (activeBar) {
        progressTweenRef.current = gsap.fromTo(
          activeBar,
          { width: '0%' },
          {
            width: '100%',
            duration: intervalMs / 1000,
            ease: 'linear',
          }
        );
      }

      timerRef.current = setTimeout(() => {
        const next = (activeIdx + 1) % slides.length;
        triggerTransition(next, 'next');
      }, intervalMs);
    },
    [intervalMs, slides.length, triggerTransition]
  );

  // Run autoplay on index change
  useEffect(() => {
    startAutoplay(currentIndex);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressTweenRef.current) progressTweenRef.current.kill();
    };
  }, [currentIndex, startAutoplay]);

  // Window resize handler
  useEffect(() => {
    const rafId = requestAnimationFrame(updateDimensionsAndBlinds);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensionsAndBlinds, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [updateDimensionsAndBlinds]);

  // Page visibility handler (tab switch)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressTweenRef.current) progressTweenRef.current.pause();
      } else {
        startAutoplay(currentIndexRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startAutoplay]);

  const handleManualNext = () => {
    if (isTransitioningRef.current) return;
    const next = (currentIndexRef.current + 1) % slides.length;
    triggerTransition(next, 'next');
  };

  const handleManualPrev = () => {
    if (isTransitioningRef.current) return;
    const prev = (currentIndexRef.current - 1 + slides.length) % slides.length;
    triggerTransition(prev, 'prev');
  };

  const handleSelectSlide = (index: number) => {
    if (isTransitioningRef.current || index === currentIndexRef.current) return;
    const dir = index > currentIndexRef.current ? 'next' : 'prev';
    triggerTransition(index, dir);
  };

  const handleScrollToCollection = () => {
    const target = document.getElementById('products-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return {
    currentIndex,
    dimensions,
    stageRef,
    svgRef,
    blindsGroupRef,
    baseImageRef,
    maskedImageRef,
    progressBarsRef,
    handleManualNext,
    handleManualPrev,
    handleSelectSlide,
    handleScrollToCollection,
  };
}
