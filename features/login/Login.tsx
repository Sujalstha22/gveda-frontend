'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AuthCard from './AuthCard';
import { LOGIN_SLIDES } from './loginData';
import LoginVisualStage from './LoginVisualStage';
import { AuthMode } from './loginTypes';

export default function Login() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <main
      className={`w-full min-h-screen flex flex-col justify-center pt-24 sm:pt-28 lg:pt-32 select-none bg-warm-ivory transition-all duration-300 ${
        mode === 'signup' ? 'pb-24 lg:pb-36' : 'pb-14 lg:pb-16'
      }`}
    >
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

      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
        {/* ── Left Column: Venetian Blinds Image Stage (Permanent Sticky & Constant Size) ── */}
        <div className="lg:col-span-6 w-full flex flex-col lg:sticky lg:top-24 xl:top-28 self-start">
          <LoginVisualStage />
        </div>

        {/* ── Right Column: Warm Ivory Authentication Card ── */}
        <div className="lg:col-span-6 w-full flex flex-col">
          <AuthCard mode={mode} onSelectMode={setMode} />
        </div>
      </div>
    </main>
  );
}