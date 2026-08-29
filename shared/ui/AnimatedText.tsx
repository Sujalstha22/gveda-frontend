'use client';

import React, { useRef, useEffect, type ElementType } from 'react';
import gsap from 'gsap';

export type AnimatedTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  stagger?: number;
  hoverClassName?: string;
  /** Force-uppercase the rendered text. Defaults to false. */
  uppercase?: boolean;
  /** Controlled hover state from a parent element (e.g. Button). */
  isHovered?: boolean;
};

export default function AnimatedText({
  children,
  className = '',
  as: Tag = 'span',
  stagger = 0.015,
  hoverClassName = 'text-inherit',
  uppercase = false,
  isHovered,
}: AnimatedTextProps) {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const textContent =
    typeof children === 'string' || typeof children === 'number'
      ? String(children).trim()
      : null;

  useEffect(() => {
    if (!root.current || !textContent) return;

    const ctx = gsap.context(() => {
      const top = root.current?.querySelectorAll('[data-layer="top"] > span');
      const bottom = root.current?.querySelectorAll('[data-layer="bottom"] > span');

      if (top && bottom && top.length > 0) {
        timeline.current = gsap
          .timeline({
            paused: true,
            defaults: { ease: 'power3.out', duration: 0.4 },
          })
          .to(top, { yPercent: -100, stagger }, 0)
          .fromTo(bottom, { yPercent: 100 }, { yPercent: 0, stagger }, 0);
      }
    }, root);

    return () => {
      ctx.revert();
      timeline.current = null;
    };
  }, [textContent, stagger]);

  useEffect(() => {
    if (isHovered === undefined || !timeline.current) return;
    if (isHovered) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [isHovered]);

  const enter = () => {
    if (isHovered === undefined) {
      timeline.current?.play();
    }
  };

  const leave = () => {
    if (isHovered === undefined) {
      timeline.current?.reverse();
    }
  };

  if (textContent === null) {
    return <Tag className={className}>{children}</Tag>;
  }

  const displayText = uppercase ? textContent.toUpperCase() : textContent;

  const letters = (extra: string) =>
    displayText.split('').map((char, i) => (
      <span key={`${char}-${i}`} className={`inline-block ${extra}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <Tag
      ref={root as never}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`relative inline-block overflow-hidden whitespace-nowrap ${
        uppercase ? 'uppercase' : ''
      } ${className}`}
      style={{ lineHeight: 1.15 }}
    >
      <span data-layer="top" className="relative block">
        {letters('')}
      </span>
      <span data-layer="bottom" className="absolute inset-0 block pointer-events-none">
        {letters(hoverClassName)}
      </span>
    </Tag>
  );
}
