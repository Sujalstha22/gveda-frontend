"use client";

import React from "react";
import Image from "next/image";
import Title from "@/shared/ui/Title";

interface IngredientFeature {
  number: string;
  tag?: string;
  title: string;
  description: string;
  icon?: string;
}

const LEFT_FEATURES: IngredientFeature[] = [
  {
    number: "01",

    title: "Bioactive Botanicals",
    description:
      "We harness potent cold-extracted plant actives rich in vitamins and antioxidants, delivering cellular nourishment to strengthen skin vitality.",
    icon: "/vector/leaves.png",
  },
  {
    number: "02",
    title: "Dermatological Balance",
    description:
      "Every formulation is clinically balanced for optimal biocompatibility, soothing sensitive skin and respecting the natural epidermal barrier.",
    icon: "/vector/fl.png",
  },
];

const RIGHT_FEATURES: IngredientFeature[] = [
  {
    number: "03",
    title: "Barrier Defense",
    description:
      "Nutrient-dense plant lipids and essential fatty acids reinforce the skin's moisture mantle, locking in deep hydration against environmental stress.",
    icon: "/vector/root.png",
  },
  {
    number: "04",
    title: "Clean Formulation",
    description:
      "Crafted without parabens, sulfates, silicones, or synthetic fragrances, preserving the skin’s delicate microbiome for lasting resilience.",
    icon: "/vector/roo.png",
  },
];

export default function Ingredients() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none bg-secondary/20">
      <div className="w-full lg:max-w-none mx-auto px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Section Header ── */}
        <Title
          eyebrow="The Science of Beauty"
          title="Active Botanicals"
          description="Clinically calibrated plant actives for modern skin."
        />

        {/* ── 3-Column Balanced Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-[2vw] items-center">
          {/* Left Column Features */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 lg:gap-[1.8vw] lg:text-right order-2 lg:order-1">
            {LEFT_FEATURES.map((item) => (
              <div
                key={item.number}
                className="group relative flex flex-col lg:items-end p-6 sm:p-7 lg:p-[1.6vw] rounded-2xl bg-surface/85 hover:bg-surface border border-secondary/20 hover:border-secondary/50 transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-3 sm:gap-4 lg:justify-end w-full">
                  <span className="font-editorial italic text-3xl sm:text-4xl lg:text-[2.2vw] lg:leading-none text-botanical-gold font-normal order-2 lg:order-1">
                    {item.number}
                  </span>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.2vw] lg:h-[3.2vw] rounded-full bg-warm-ivory border border-secondary/30 flex items-center justify-center p-2.5 group-hover:border-botanical-gold group-hover:scale-105 transition-all duration-500 shrink-0 order-1 lg:order-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.icon || "/vector/leaves.png"}
                        alt={`${item.title} Botanical Icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 lg:mt-[0.6vw]">
                  {item.tag && (
                    <span className="font-primary font-light text-[10px] sm:text-[11px] lg:text-[0.62vw] uppercase tracking-[0.2em] text-botanical-gold block mb-1">
                      {item.tag}
                    </span>
                  )}
                  <h3 className="font-antessa font-medium text-xl sm:text-2xl lg:text-[1.3vw] lg:leading-snug text-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.82vw] lg:leading-[1.65] text-primary/75 leading-relaxed mt-2 lg:mt-[0.5vw]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Hero Product Visual */}
          <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 my-6 lg:my-0">
            <div className="relative w-72 sm:w-84 md:w-96 lg:w-full lg:max-w-[27vw] aspect-square flex items-center justify-center">
              <div className="relative w-[90%] h-[90%] z-10 flex items-center justify-center">
                <Image
                  src="/images/home/image.png"
                  alt="GVEDA Botanical Skincare Formulation - Pure Bioactive Science"
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 27vw"
                  className="object-contain rotate-12 hover:rotate-6 hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column Features */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 lg:gap-[1.8vw] lg:text-left order-3">
            {RIGHT_FEATURES.map((item) => (
              <div
                key={item.number}
                className="group relative flex flex-col lg:items-start p-6 sm:p-7 lg:p-[1.6vw] rounded-2xl bg-surface/85 hover:bg-surface border border-secondary/20 hover:border-secondary/50 transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-3 sm:gap-4 lg:justify-start w-full">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.2vw] lg:h-[3.2vw] rounded-full bg-warm-ivory border border-secondary/30 flex items-center justify-center p-2.5 group-hover:border-botanical-gold group-hover:scale-105 transition-all duration-500 shrink-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.icon || "/vector/leaves.png"}
                        alt={`${item.title} Botanical Icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="font-editorial italic text-3xl sm:text-4xl lg:text-[2.2vw] lg:leading-none text-botanical-gold font-normal">
                    {item.number}
                  </span>
                </div>
                <div className="mt-3 lg:mt-[0.6vw]">
                  {item.tag && (
                    <span className="font-primary font-light text-[10px] sm:text-[11px] lg:text-[0.62vw] uppercase tracking-[0.2em] text-botanical-gold block mb-1">
                      {item.tag}
                    </span>
                  )}
                  <h3 className="font-antessa font-medium text-xl sm:text-2xl lg:text-[1.3vw] lg:leading-snug text-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.82vw] lg:leading-[1.65] text-primary/75 leading-relaxed mt-2 lg:mt-[0.5vw]">
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
