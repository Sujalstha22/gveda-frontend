'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import Button from '../Button';

interface PreloaderActionsProps {
  displayProgress: number;
  isLoaded: boolean;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
  onEnter: (withSound: boolean) => void;
}

export default function PreloaderActions({
  displayProgress,
  isLoaded,
  buttonsRef,
  onEnter,
}: PreloaderActionsProps) {
  useEffect(() => {
    if (isLoaded && buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }
  }, [isLoaded, buttonsRef]);

  return (
    <div className="mt-8 sm:mt-12 w-full flex flex-col items-center justify-center min-h-[90px]">
      {/* Loading Percentage — shown while loading assets */}
      {!isLoaded && (
        <div className="flex flex-col items-center gap-2 transition-opacity duration-300">
          <span className="font-primary text-xs sm:text-sm tracking-[0.25em] uppercase text-primary/70 font-medium">
            {Math.min(100, Math.floor(displayProgress))}%
          </span>
          <span className="font-primary text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] uppercase text-muted">
            Botanical Science for Modern Skin
          </span>
        </div>
      )}

      {/* Enter Action Buttons — revealed when loaded */}
      {isLoaded && (
        <div
          ref={buttonsRef}
          className="flex flex-col items-center justify-center gap-3 w-full max-w-xs"
        >
          <Button
            variant="primary"
            className="w-full text-xs sm:text-sm px-6 py-2.5 sm:py-3 shadow-subtle hover:scale-[1.02] transition-transform"
            size="sm"
            onClick={() => onEnter(true)}
          >
            explore with music
          </Button>
          <Button
            variant="ghost"
            className="w-full text-xs sm:text-sm px-6 py-2.5 sm:py-3 opacity-80 hover:opacity-100"
            size="sm"
            onClick={() => onEnter(false)}
          >
            explore in silence
          </Button>
        </div>
      )}
    </div>
  );
}
