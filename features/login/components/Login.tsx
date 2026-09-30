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
    <main className="w-full min-h-screen bg-warm-ivory select-none pt-[84px] sm:pt-[88px] lg:pt-[96px] pb-12 sm:pb-16 px-4 sm:px-8 lg:px-[5vw]">
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

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* ── Left Column (40% Width): Visual Image Stage (Sticky below Navbar) ── */}
        <aside className="w-full lg:col-span-5 lg:sticky lg:top-[96px] self-start order-1">
          <LoginVisualStage />
        </aside>

        {/* ── Right Column (60% Width): Scrollable Form Area ── */}
        <section className="w-full lg:col-span-7 order-2 flex flex-col">
          <AuthCard mode={mode} onSelectMode={setMode} />
        </section>
      </div>
    </main>
  );
}