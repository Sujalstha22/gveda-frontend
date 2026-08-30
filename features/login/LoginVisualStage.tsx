'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LOGIN_SLIDES } from './loginData';
import { BlindItem } from './loginTypes';

const BLIND_COUNT = 20;
const VB_WIDTH = 100;
const VB_HEIGHT = 100;

export default function LoginVisualStage() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const blindsGroupRef = useRef<SVGGElement | null>(null);
  const baseImageRef = useRef<SVGImageElement | null>(null);
  const maskedImageRef = useRef<SVGImageElement | null>(null);
  const blindsRef = useRef<BlindItem[]>([]);
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Blinds SVG Elements inside the Mask
  useEffect(() => {
    const g = blindsGroupRef.current;
    if (!g) return;
    g.innerHTML = '';

    const h = VB_HEIGHT / BLIND_COUNT;
    const newBlinds: BlindItem[] = [];
    let currentY = 0;

    for (let i = 0; i < BLIND_COUNT; i++) {
      const centerY = VB_HEIGHT - (currentY + h / 2);
      const rectTop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const rectBottom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      [rectTop, rectBottom].forEach((r) => {
        r.setAttribute('x', '0');
        r.setAttribute('width', VB_WIDTH.toString());
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

  // Automatic Venetian Blinds Transition Loop
  useEffect(() => {
    const triggerNext = () => {
      if (isTransitioningRef.current) return;

      const currentIdx = currentIndexRef.current;
      const nextIdx = (currentIdx + 1) % LOGIN_SLIDES.length;

      const blinds = blindsRef.current;
      const maskedImg = maskedImageRef.current;
      const baseImg = baseImageRef.current;

      if (!maskedImg || !baseImg || blinds.length === 0) {
        currentIndexRef.current = nextIdx;
        return;
      }

      isTransitioningRef.current = true;
      maskedImg.setAttribute('href', LOGIN_SLIDES[nextIdx].image);

      blinds.forEach((b) => {
        b.top.setAttribute('y', b.y.toString());
        b.top.setAttribute('height', '0');
        b.bottom.setAttribute('y', b.y.toString());
        b.bottom.setAttribute('height', '0');
      });

      const tl = gsap.timeline({
        onComplete: () => {
          baseImg.setAttribute('href', LOGIN_SLIDES[nextIdx].image);
          blinds.forEach((b) => {
            b.top.setAttribute('height', '0');
            b.bottom.setAttribute('height', '0');
          });
          currentIndexRef.current = nextIdx;
          isTransitioningRef.current = false;
        },
      });

      blinds.forEach((b, i) => {
        const topY = b.y - b.h;
        const delay = i * 0.015;

        tl.to(
          b.top,
          {
            y: topY,
            height: b.h,
            duration: 1.0,
            ease: 'power2.inOut',
          },
          delay
        );

        tl.to(
          b.bottom,
          {
            y: b.y,
            height: b.h,
            duration: 1.0,
            ease: 'power2.inOut',
          },
          delay
        );
      });
    };

    timerRef.current = setInterval(triggerNext, 3400);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-[24vw] aspect-square sm:aspect-4/3 lg:aspect-[4/3.4] overflow-hidden rounded-2xl lg:rounded-[1.2vw] bg-white border border-secondary/30 shadow-2xs">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="login-blinds-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={VB_WIDTH} height={VB_HEIGHT} fill="black" />
            <g ref={blindsGroupRef} id="login-blinds-group" />
          </mask>
        </defs>

        {/* Base Settled Image */}
        <image
          ref={baseImageRef}
          href={LOGIN_SLIDES[0].image}
          x="0"
          y="0"
          width={VB_WIDTH}
          height={VB_HEIGHT}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        />

        {/* Masked Incoming Image */}
        <image
          ref={maskedImageRef}
          href={LOGIN_SLIDES[0].image}
          x="0"
          y="0"
          width={VB_WIDTH}
          height={VB_HEIGHT}
          preserveAspectRatio="xMidYMid slice"
          mask="url(#login-blinds-mask)"
          className="w-full h-full"
        />
      </svg>
    </div>
  );
}
