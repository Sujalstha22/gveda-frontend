'use client';

import React from 'react';

export default function FooterBigText() {
  return (
    <div className="w-full min-w-0 flex-1 flex items-center justify-center [container-type:inline-size] select-none pointer-events-none my-auto py-2 sm:py-4">
      {/* Size against the padded footer width and preserve the font's full line box. */}
      <span className="font-antessa uppercase font-medium text-primary tracking-[0.02em] leading-[normal] text-[22cqw] block text-center whitespace-nowrap w-full">
        GVEDA
      </span>
    </div>
  );
}
