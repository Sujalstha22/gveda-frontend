import React from 'react';
import { GVEDA_TRANSITION_PATHS } from '../transition/transitionData';

interface PreloaderLogoProps {
  logoRef: React.RefObject<HTMLDivElement | null>;
}

export default function PreloaderLogo({ logoRef }: PreloaderLogoProps) {
  return (
    <div
      ref={logoRef}
      className="relative w-48 sm:w-64 md:w-80 max-w-[80vw] h-auto pointer-events-none select-none"
    >
      <svg
        viewBox="82 194 628 224"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        aria-hidden="true"
      >
        {/* 1. Outline draw paths (stroke drawing animation) */}
        <g transform="matrix(1,0,0,-1,0,612)">
          {GVEDA_TRANSITION_PATHS.map((item) => (
            <path
              key={`preloader-draw-${item.id}`}
              className="preloader-draw-path"
              d={item.d}
              fill="none"
              stroke={item.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillRule={item.fillRule}
              style={{ opacity: 0 }}
            />
          ))}
        </g>

        {/* 2. Solid fill overlays (fade-in animation) */}
        <g transform="matrix(1,0,0,-1,0,612)">
          {GVEDA_TRANSITION_PATHS.map((item) => (
            <path
              key={`preloader-fill-${item.id}`}
              className="preloader-fill-path"
              d={item.d}
              fill={item.fill}
              fillRule={item.fillRule}
              style={{ opacity: 0 }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
