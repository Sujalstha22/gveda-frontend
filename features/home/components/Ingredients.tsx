"use client";

import React from "react";
import Image from "next/image";

interface IngredientFeature {
  number: string;
  title: string;
  description: string;
}

const LEFT_FEATURES: IngredientFeature[] = [
  {
    number: "01",
    title: "Natural ingredients",
    description:
      "We source only the finest botanical extracts, ensuring every drop is packed with vitamins and minerals in their most potent bioactive form.",
  },
  {
    number: "02",
    title: "Premium quality",
    description:
      "Each formula undergoes rigorous clinical quality control to maintain dermatological purity while staying true to our pure botanical roots.",
  },
];

const RIGHT_FEATURES: IngredientFeature[] = [
  {
    number: "03",
    title: "100% organic",
    description:
      "Our plant botanicals are harvested in sustainable, pesticide-free environments, respecting the earth while providing clean, safe nourishment.",
  },
  {
    number: "04",
    title: "Clean Beauty",
    description:
      "We avoid toxic fillers, parabens, and synthetic additives, delivering a concentrated experience that visibly restores skin resilience.",
  },
];

export default function Ingredients() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none">
      <div className="w-full lg:max-w-none mx-auto px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-[4vw] w-full lg:max-w-[60vw] mx-auto">
          <span className="font-madison italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw]">
            The Science of Beauty
          </span>
          <h2 className="font-antessa font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.1] text-primary">
            Our Promise
          </h2>
          <p className="font-primary font-normal text-base sm:text-lg lg:text-[1.2vw] lg:leading-[1.65] text-primary/80 w-full max-w-2xl lg:max-w-[44vw] mt-3 sm:mt-4 lg:mt-[0.9vw] leading-relaxed">
            Rooted in ancient Ayurvedic wisdom and validated by modern clinical
            research, GVEDA crafts high-performance botanical formulas that
            nurture, renew, and restore skin health naturally.
          </p>
        </div>

        {/* ── 3-Column Balanced Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[2.5vw] items-center">
          {/* Left Column Features */}
          <div className="lg:col-span-4 flex flex-col gap-8 sm:gap-10 lg:gap-[3.5vw] lg:text-right order-2 lg:order-1">
            {LEFT_FEATURES.map((item) => (
              <div
                key={item.number}
                className="flex flex-col lg:items-end gap-2 sm:gap-3 lg:gap-[0.5vw] group"
              >
                <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-none text-botanical-gold font-normal">
                  {item.number}
                </span>
                <h3 className="font-primary font-medium text-xl sm:text-2xl lg:text-[1.35vw] lg:leading-snug text-primary">
                  {item.title}
                </h3>
                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.8vw] lg:leading-[1.6] text-primary/70 leading-relaxed max-w-sm lg:max-w-[20vw] lg:ml-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Hero Product Visual */}
          <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 my-4 lg:my-0">
            <div className="relative w-64 sm:w-76 md:w-84 lg:w-full lg:max-w-[24vw] aspect-square flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-2 sm:inset-4 lg:inset-[1vw] rounded-full bg-secondary/30 border border-secondary/60 shadow-subtle"
              />

              <div className="relative w-[85%] h-[85%] z-10">
                <Image
                  src="/images/home/ingredients.png"
                  alt="GVEDA Nourishing Hair Conditioner - Pure Botanical Science"
                  fill
                  sizes="(max-width: 768px) 75vw, (max-width: 1200px) 30vw, 24vw"
                  className="object-contain hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column Features */}
          <div className="lg:col-span-4 flex flex-col gap-8 sm:gap-10 lg:gap-[3.5vw] lg:text-left order-3">
            {RIGHT_FEATURES.map((item) => (
              <div
                key={item.number}
                className="flex flex-col lg:items-start gap-2 sm:gap-3 lg:gap-[0.5vw] group"
              >
                <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-none text-botanical-gold font-normal">
                  {item.number}
                </span>
                <h3 className="font-primary font-medium text-xl sm:text-2xl lg:text-[1.35vw] lg:leading-snug text-primary">
                  {item.title}
                </h3>
                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.8vw] lg:leading-[1.6] text-primary/70 leading-relaxed max-w-sm lg:max-w-[20vw]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
