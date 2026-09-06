'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import PreloaderLogo from './preloader/PreloaderLogo';
import PreloaderActions from './preloader/PreloaderActions';
import { useAssetTracker } from './preloader/useAssetTracker';
import { usePreloader } from '@/shared/context/PreloaderContext';

interface PreloaderProps {
  onComplete: (withSound: boolean) => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<'drawing' | 'exiting' | 'done'>('drawing');
  const [logoReady, setLogoReady] = useState(false);
  const { isHeroLoaded } = useAssetTracker();
  const { heroImageLoaded } = usePreloader();

  const isHeroReady = isHeroLoaded || heroImageLoaded;
  const exitingTriggeredRef = useRef(false);

  // Remove static flash element if present
  useEffect(() => {
    const flash = document.getElementById('__preloader_flash');
    if (flash) flash.remove();
  }, []);

  // Lock scroll while preloader is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Animate SVG Logo: Draw stroke outlines first, then fade in solid fills
  useEffect(() => {
    if (phase !== 'drawing') return;

    const logoContainer = logoRef.current;
    if (!logoContainer) return;

    const drawPaths = logoContainer.querySelectorAll('.preloader-draw-path');
    const fillPaths = logoContainer.querySelectorAll('.preloader-fill-path');

    if (drawPaths.length > 0) {
      drawPaths.forEach((path) => {
        const geomEl = path as SVGGeometryElement;
        const length = geomEl.getTotalLength();
        gsap.set(geomEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });
      });
    }

    if (fillPaths.length > 0) {
      gsap.set(fillPaths, { opacity: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setLogoReady(true);
      },
    });

    // 1. Draw logo outlines (crisp, fluid stroke animation)
    if (drawPaths.length > 0) {
      tl.to(drawPaths, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        stagger: 0.1,
      });
    }

    // 2. Fade in solid fills (Rich Black letters + Botanical Gold leaf)
    if (fillPaths.length > 0) {
      tl.to(
        fillPaths,
        {
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.25'
      );
    }

    return () => {
      tl.kill();
    };
  }, [phase]);

  // Exit animation — smooth parallax curtain slide up
  const handleExit = useCallback(() => {
    if (exitingTriggeredRef.current) return;
    exitingTriggeredRef.current = true;

    // Unlock iOS Safari media autoplay policy if videos exist
    if (typeof document !== 'undefined') {
      document.querySelectorAll<HTMLVideoElement>('video').forEach((vid) => {
        vid.muted = true;
        vid.playsInline = true;
        vid.play().catch(() => {});
      });
    }

    setPhase('exiting');

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) {
      onComplete(false);
      return;
    }

    container.style.transition = 'transform 0.9s cubic-bezier(0.55, 0, 0.1, 1)';
    content.style.transition = 'transform 0.9s cubic-bezier(0.55, 0, 0.1, 1)';
    container.style.willChange = 'transform';
    content.style.willChange = 'transform';

    void container.offsetHeight; // Force reflow

    container.style.transform = 'translateY(-100%)';
    content.style.transform = 'translateY(100%)';

    const handleTransitionEnd = () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      setPhase('done');
      onComplete(false);
    };

    container.addEventListener('transitionend', handleTransitionEnd);
  }, [onComplete]);

  // Auto-close: triggers automatically once logo is ready AND hero section is loaded.
  // If hero section is already loaded, it closes immediately after logo reveal.
  // If hero section is still loading, it waits until hero finishes loading.
  useEffect(() => {
    if (logoReady && isHeroReady && phase === 'drawing') {
      handleExit();
    }
  }, [logoReady, isHeroReady, phase, handleExit]);

  if (phase === 'done') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-warm-ivory"
      style={{ background: 'var(--warm-ivory, #F7F5F1)' }}
    >
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-[5vw] text-center select-none"
      >
        {/* Centered GVEDA Logo */}
        <PreloaderLogo logoRef={logoRef} />

        {/* Minimal Tagline (No Numbers, No Buttons) */}
        <PreloaderActions />
      </div>
    </div>
  );
}
