'use client';

import Image from 'next/image';
import AuthCard from './AuthCard';
import { LOGIN_SLIDES } from './loginData';
import LoginVisualStage from './LoginVisualStage';

export default function Login() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center pt-20 sm:pt-24 lg:pt-[5vw] pb-12 lg:pb-[3vw] px-4 sm:px-8 lg:px-[5vw]  select-none">
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

      <div className="w-full max-w-6xl lg:max-w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[4vw] items-stretch">
        {/* ── Left Column: Venetian Blinds Image Stage ── */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center w-full h-full">
          <LoginVisualStage />
        </div>

        {/* ── Right Column: Warm Ivory Authentication Card ── */}
        <div className="lg:col-span-6 flex items-center justify-center w-full h-full">
          <AuthCard />
        </div>
      </div>
    </main>
  );
}