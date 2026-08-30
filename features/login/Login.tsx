'use client';

import React from 'react';
import Image from 'next/image';
import LoginVisualStage from './LoginVisualStage';
import LoginBrandCaption from './LoginBrandCaption';
import AuthCard from './AuthCard';
import { LOGIN_SLIDES } from './loginData';

export default function Login() {
  return (
    <main className="w-full min-h-[calc(100vh-4.5vw)] flex items-center justify-center pt-20 sm:pt-24 lg:pt-[5vw] pb-12 lg:pb-[3vw] px-4 sm:px-8 lg:px-[5vw] bg-warm-ivory select-none">
      {/* Hidden preloader for smooth Next.js image caching */}
      <div className="hidden" aria-hidden="true">
        {LOGIN_SLIDES.map((slide) => (
          <Image
            key={slide.id}
            src={slide.image}
            alt="Preload slide"
            width={100}
            height={100}
            priority
          />
        ))}
      </div>

      <div className="w-full max-w-6xl lg:max-w-[78vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[4vw] items-center">
        {/* ── Left Column: Venetian Blinds Image Stage & Brand Statement ── */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <LoginVisualStage />
          <LoginBrandCaption />
        </div>

        {/* ── Right Column: Warm Ivory Authentication Card ── */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <AuthCard />
        </div>
      </div>
    </main>
  );
}