"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none bg-[#0F0D0E]">
      {/* ── Seamless Bottom Gradient (Expanding from Black to Dark Brown) ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 sm:h-64 lg:h-100 bg-gradient-to-b from-[#0f0D0E] via-[#26180E]/80 to-[#26180E] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full lg:max-w-none mx-auto px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 10 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Title
            eyebrow="The Science of Beauty"
            title="Active Botanicals"
            description="Clinically calibrated plant actives for modern skin."
            titleClassName="text-white"
            descriptionClassName="text-white"
          />
        </motion.div>

        {/* ── 3-Column Balanced Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-[2vw] items-center">
          {/* Left Column Features — Fade in from Left */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 lg:gap-[1.8vw] lg:text-right order-2 lg:order-1">
            {LEFT_FEATURES.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col lg:items-end p-6 sm:p-7 lg:p-[1.6vw] rounded-2xl  text-white border border-secondary/20 hover:border-secondary/50 transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-3 sm:gap-4 lg:justify-end w-full">
                  <span className="font-editorial italic text-3xl sm:text-4xl lg:text-[2.2vw] lg:leading-none text-white font-normal order-2 lg:order-1">
                    {item.number}
                  </span>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.2vw] lg:h-[3.2vw] rounded-full bg-warm-ivory border border-secondary/30 flex items-center justify-center p-2.5 group-hover:border-botanical-gold group-hover:scale-105 transition-all duration-500 shrink-0 order-1 lg:order-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.icon || "/vector/leaves.png"}
                        alt={`${item.title} Botanical Icon`}
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 60px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 lg:mt-[0.6vw]">
                  {item.tag && (
                    <span className="font-primary font-light text-[10px] sm:text-[11px] lg:text-[0.62vw] uppercase tracking-[0.2em] text-white block mb-1">
                      {item.tag}
                    </span>
                  )}
                  <h3 className="font-heading font-medium text-xl sm:text-2xl lg:text-[1.3vw] lg:leading-snug text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.82vw] lg:leading-[1.65] text-white/75 leading-relaxed mt-2 lg:mt-[0.5vw]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Hero Product Visual — Fade in from Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1.0,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 my-6 lg:my-0"
          >
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
          </motion.div>

          {/* Right Column Features — Fade in from Right */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 lg:gap-[1.8vw] lg:text-left order-3">
            {RIGHT_FEATURES.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col lg:items-start p-6 sm:p-7 lg:p-[1.6vw] rounded-2xl bg-black/85  border border-secondary/20 hover:border-secondary/50 transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-3 sm:gap-4 lg:justify-start w-full">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.2vw] lg:h-[3.2vw] rounded-full bg-warm-ivory border border-secondary/30 flex items-center justify-center p-2.5 group-hover:border-botanical-gold group-hover:scale-105 transition-all duration-500 shrink-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.icon || "/vector/leaves.png"}
                        alt={`${item.title} Botanical Icon`}
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 60px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="font-editorial italic text-3xl sm:text-4xl lg:text-[2.2vw] lg:leading-none text-white font-normal">
                    {item.number}
                  </span>
                </div>
                <div className="mt-3 lg:mt-[0.6vw]">
                  {item.tag && (
                    <span className="font-primary font-light text-[10px] sm:text-[11px] lg:text-[0.62vw] uppercase tracking-[0.2em] text-white-gold block mb-1">
                      {item.tag}
                    </span>
                  )}
                  <h3 className="font-heading font-medium text-xl sm:text-2xl lg:text-[1.3vw] lg:leading-snug text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.82vw] lg:leading-[1.65] text-white/75 leading-relaxed mt-2 lg:mt-[0.5vw]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
