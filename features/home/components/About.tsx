"use client";

import React from "react";
import Title from "@/shared/ui/Title";
import ScrollReveal from "@/shared/ui/ScrollTextReveal";

const About = () => {
  return (
    <section className="relative w-full pt-20 sm:pt-28 lg:pt-[7vw] pb-20 sm:pb-28 lg:pb-[7vw] px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#0F0D0E] ">
      {/* ── Seamless Ambient Background Glow & Lighting ── */}
      <div
        className="absolute top-0 inset-x-0 h-40 bg-linear-to-b from-[#0F0D0E] to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-40 sm:h-56 lg:h-72 bg-linear-to-b from-transparent to-[#110F10] pointer-events-none z-0"
        aria-hidden="true"
      />



      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <Title
          eyebrow="Our Story"
          title="About GVEDA"
          className="mb-8 sm:mb-12 lg:mb-[2.5vw]"
          titleClassName="text-white"
        />

        {/* Story Text Reveal */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal
            baseRotation={0}
            enableBlur={false}
            baseOpacity={0.25}
            wordAnimationEnd="bottom 65%"
            containerClassName="!my-0"
            textClassName="font-primary text-lg sm:text-xl lg:text-[1.35rem] leading-[1.8] text-white text-center font-normal"
          >
            {
              "At GVEDA, we combine nature's best ingredients with scientific innovation to create products that improve your health, beauty, and lifestyle. Our range offers premium skincare, wellness supplements, grooming essentials, and cosmetics for both men and women. Proudly owned by Global Victors, GVEDA brings together four distinct brands to meet a wide range of needs."
            }
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
