'use client';

import React from 'react';

export default function FooterBigText() {
  return (
    <div className="w-full min-w-0 flex-1 flex items-center justify-center [container-type:inline-size] select-none pointer-events-none  ">
      {/* Size against the padded footer width and preserve the font's full line box. */}
      <span className="font-heading font-medium text-white tracking-[0.02em] leading-tight text-[16cqw] block text-center whitespace-nowrap w-full">
        GVEDA
      </span>
    </div>
  );
}
