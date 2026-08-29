import React from 'react';
import { GVEDA_TRANSITION_PATHS } from './transitionData';

interface TransitionLogoProps {
  logoRef: React.RefObject<HTMLDivElement | null>;
}

export default function TransitionLogo({ logoRef }: TransitionLogoProps) {
  return (
    <div
      ref={logoRef}
      className="w-[min(20vw,360px)] pointer-events-none select-none"
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
              key={`draw-${item.id}`}
              className="draw-path"
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
              key={`fill-${item.id}`}
              className="fill-path"
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
