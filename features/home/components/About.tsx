"use client";

import React from "react";
import Image from "next/image";
import Title from "@/shared/ui/Title";
import ScrollReveal from "@/shared/ui/ScrollTextReveal";

const About = () => {
  return (
    <section className="relative w-full pt-20 sm:pt-28 lg:pt-[6vw] pb-16 sm:pb-24 lg:pb-[5vw] px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-warm-ivory">
      {/* Background Editorial Leaf Shadow & Flourish Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/home/abtsection/abtbg.jpeg"
          alt="Botanical Background Texture"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
          priority={false}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <Title
          eyebrow="Our Story"
          title="About GVEDA"
          className="mb-8 sm:mb-12 lg:mb-[2.5vw]"
        />

        {/* Story Text Reveal */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal
            baseRotation={0}
            enableBlur={false}
            baseOpacity={0.2}
            wordAnimationEnd="bottom 65%"
            containerClassName="!my-0"
            textClassName="font-primary text-lg sm:text-xl lg:text-[1.35rem] leading-[1.75] text-primary text-center font-normal"
          >
            {
              "At GVEDA, we combine nature's best ingredients with scientific innovation to create products that improve your health, beauty, and lifestyle. Our range offers premium skincare, wellness supplements, grooming essentials, and cosmetics for both men and women. Proudly owned by Global Victors, GVEDA brings together four distinct brands to meet a wide range of needs."
            }
          </ScrollReveal>
        </div>

        {/* Center Botanical Bottles on Stone Image */}
        <div className="w-full flex justify-center items-center mt-4 md:mt-8">
          <div className="relative w-[320px] min-[420px]:w-[380px] sm:w-[500px] md:w-[620px] lg:w-[720px] aspect-[16/9] drop-shadow-[0_20px_32px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-out hover:scale-105">
            <Image
              src="/images/home/abtsection/abt-img.png"
              alt="GVEDA Botanical Products Seated on Natural Stone"
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 620px, 720px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
