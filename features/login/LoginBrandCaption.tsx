import React from 'react';

export default function LoginBrandCaption() {
  return (
    <div className="mt-6 sm:mt-8 lg:mt-[1.8vw] flex flex-col items-center text-center">
      <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal block mb-1 lg:mb-[0.3vw]">
        Our Vision
      </span>

      <h1 className="font-primary font-medium text-3xl sm:text-4xl lg:text-[2.2vw] lg:leading-[1.15] text-primary">
        For Your Skin
      </h1>

      <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.85vw] lg:leading-[1.6] text-primary/70 max-w-sm sm:max-w-md lg:max-w-[26vw] mt-2.5 lg:mt-[0.6vw] leading-relaxed">
        Skin-first innovation built to protect, nourish, and support your natural glow in everyday life.
      </p>
    </div>
  );
}
