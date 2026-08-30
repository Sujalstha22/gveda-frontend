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
    <div className="mt-8 sm:mt-12 lg:mt-[3vw] w-full flex flex-col items-center justify-center min-h-[90px] lg:min-h-[5vw]">
      {/* Loading Percentage — shown while loading assets */}
      {!isLoaded && (
        <div className="flex flex-col items-center gap-2 lg:gap-[0.5vw] transition-opacity duration-300">
          <span className="font-primary text-xs sm:text-sm lg:text-[0.85vw] tracking-[0.25em] uppercase text-primary/70 font-medium">
            {Math.min(100, Math.floor(displayProgress))}%
          </span>
          <span className="font-primary text-[0.65rem] sm:text-[0.72rem] lg:text-[0.7vw] tracking-[0.18em] uppercase text-muted">
            Botanical Science for Modern Skin
          </span>
        </div>
      )}

      {/* Enter Action Buttons — revealed when loaded */}
      {isLoaded && (
        <div
          ref={buttonsRef}
          className="flex flex-col items-center justify-center gap-3 lg:gap-[0.8vw] w-full max-w-sm lg:max-w-[22vw]"
        >
          <Button
            variant="primary"
            className="w-full sm:w-72 lg:w-[17vw] text-xs sm:text-sm lg:text-[0.8vw] py-3 lg:py-[0.7vw] shadow-subtle hover:scale-[1.02] transition-transform"
            size="md"
            onClick={() => onEnter(true)}
          >
            explore with music
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-72 lg:w-[17vw] text-xs sm:text-sm lg:text-[0.8vw] py-3 lg:py-[0.7vw] opacity-80 hover:opacity-100"
            size="md"
            onClick={() => onEnter(false)}
          >
            explore in silence
          </Button>
        </div>
      )}
    </div>
  );
}
