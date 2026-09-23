'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TransitionRouter } from 'next-transition-router';
import TransitionOverlay from './transition/TransitionOverlay';
import { usePreloader } from '@/shared/context/PreloaderContext';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setHeroReady } = usePreloader();

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.body.style.position = '';
    document.body.style.width = '';
  };

  return (
    <>
      <TransitionOverlay ref={panelRef} logoRef={logoRef} />

      <TransitionRouter
        leave={(next) => {
          const el = panelRef.current;
          if (!el) return next();

          lockScroll();
          setHeroReady(false);

          // Reset logo before curtain slides in
          if (logoRef.current) {
            gsap.set(logoRef.current, { opacity: 0, clearProps: 'transform' });
          }

          // Slide curtain up from bottom to cover the screen
          gsap.set(el, { display: 'block', yPercent: 100 });
          gsap.to(el, {
            yPercent: 0,
            duration: 0.42,
            ease: 'power3.inOut',
            onComplete: () => {
              window.scrollTo(0, 0);
              next();
            },
          });
        }}
        enter={(next) => {
          const el = panelRef.current;
          const logo = logoRef.current;
          const content = contentRef.current;
          if (!el || !logo || !content) return next();

          window.scrollTo(0, 0);

          // Prepare content for reveal animation
          gsap.set(content, { opacity: 0, scale: 1.02, y: 15 });

          // Set up SVG stroke-draw animation
          const drawPaths = logo.querySelectorAll('.draw-path');
          const fillPaths = logo.querySelectorAll('.fill-path');

          if (drawPaths.length > 0) {
            drawPaths.forEach((p) => {
              const pathEl = p as SVGGeometryElement;
              const len = pathEl.getTotalLength();
              gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
            });
          }
          if (fillPaths.length > 0) {
            gsap.set(fillPaths, { opacity: 0 });
          }
          gsap.set(logo, { opacity: 1, clearProps: 'transform' });

          // Build the animation timeline
          const tl = gsap.timeline({
            onComplete: () => {
              gsap.set(el, { display: 'none', yPercent: 100 });
              gsap.set(logo, { clearProps: 'all' });
              unlockScroll();
              next();
              setTimeout(() => ScrollTrigger.refresh(), 100);
            },
          });

          // 1. Draw GVEDA logo stroke outlines (deliberate & smooth botanical drawing)
          if (drawPaths.length > 0) {
            tl.to(drawPaths, {
              strokeDashoffset: 0,
              duration: 1.24,
              ease: 'power2.inOut',
              stagger: 0.12,
            });
          }
          // 2. Fade in solid fills (Rich Black letters + Botanical Gold leaf)
          if (fillPaths.length > 0) {
            tl.to(
              fillPaths,
              {
                opacity: 1,
                duration: 0.31,
                ease: 'power2.out',
              },
              '-=0.20'
            );
          }
          // 3. Hold to admire the completed mark
          tl.to({}, { duration: 0.28 })
            // 4. Fade out logo gracefully
            .to(logo, {
              opacity: 0,
              y: -16,
              duration: 0.25,
              ease: 'power2.in',
            })
            // 5. Trigger destination page entrance animations (Navbar & Hero Editorial)
            .call(() => {
              setHeroReady(true);
            })
            // 6. Slide curtain up to reveal page
            .to(
              el,
              {
                yPercent: -100,
                duration: 0.59,
                ease: 'expo.inOut',
              },
              '-=0.06'
            )
            // 7. Smooth reveal of destination page
            .to(
              content,
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.59,
                ease: 'power4.out',
                clearProps: 'all',
              },
              '-=0.48'
            );
        }}
        auto
      >
        {/* Page content wrapper — animated during transition reveal */}
        <div ref={contentRef} className="w-full min-h-screen">
          {children}
        </div>
      </TransitionRouter>
    </>
  );
}
