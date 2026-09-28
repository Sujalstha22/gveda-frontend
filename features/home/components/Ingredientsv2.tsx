"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
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
    tag: "Potent Bioactives",
    title: "Bioactive Botanicals",
    description:
      "We harness potent cold-extracted plant actives rich in vitamins and antioxidants, delivering cellular nourishment to strengthen skin vitality.",
    icon: "/vector/leaves.png",
  },
  {
    number: "02",
    tag: "Biocompatible",
    title: "Dermatological Balance",
    description:
      "Every formulation is clinically balanced for optimal biocompatibility, soothing sensitive skin and respecting the natural epidermal barrier.",
    icon: "/vector/fl.png",
  },
];

const RIGHT_FEATURES: IngredientFeature[] = [
  {
    number: "03",
    tag: "Lipid Complex",
    title: "Barrier Defense",
    description:
      "Nutrient-dense plant lipids and essential fatty acids reinforce the skin's moisture mantle, locking in deep hydration against environmental stress.",
    icon: "/vector/root.png",
  },
  {
    number: "04",
    tag: "Zero Toxins",
    title: "Clean Formulation",
    description:
      "Crafted without parabens, sulfates, silicones, or synthetic fragrances, preserving the skin’s delicate microbiome for lasting resilience.",
    icon: "/vector/roo.png",
  },
];

export default function Ingredientsv2() {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // ── Scroll Parallax ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.001,
  });

  // Parallax Y & Rotation transforms across different scroll depths
  const yFlower = useTransform(smoothProgress, [0, 1], [-80, 80]);
  const yBeans = useTransform(smoothProgress, [0, 1], [70, -70]);
  const yLeaves = useTransform(smoothProgress, [0, 1], [-90, 70]);
  const yLeaves1 = useTransform(smoothProgress, [0, 1], [80, -80]);
  const rotateFlower = useTransform(smoothProgress, [0, 1], [-15, 20]);

  // ── Interactive Mouse Parallax for Desktop Stage ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 35);
    mouseY.set(y * 35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 lg:py-[5.5vw] overflow-hidden select-none bg-[#0F0D0E]"
    >
      {/* ── Seamless Ambient Background Lighting ── */}
      <div
        className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-[#0F0D0E] to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-48 sm:h-64 lg:h-96 bg-linear-to-b from-transparent via-[#26180E]/60 to-[#26180E] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle Golden Glow Halo behind composition */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] sm:w-[42rem] lg:w-[50rem] h-[30rem] sm:h-[42rem] lg:h-[50rem] bg-botanical-gold/[0.06] rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl lg:max-w-none mx-auto px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Title
            eyebrow="The Science of Beauty"
            title="Active Botanicals"
            description="Clinically calibrated plant actives for modern skin."
            titleClassName="text-white"
            descriptionClassName="text-white/80"
          />
        </motion.div>

        {/* ── 3-Column Balanced Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-[2.5vw] items-center mt-6 lg:mt-[2vw]">

          {/* ── Left Column Features (Transparent Glass Cards) ── */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 lg:gap-[1.8vw] lg:text-right order-2 lg:order-1">
            {LEFT_FEATURES.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.85,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col lg:items-end p-6 sm:p-7 lg:p-[1.6vw] rounded-2xl bg-white/[0.03]  border border-white/[0.08] hover:border-secondary/40 hover:bg-white/[0.06] transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-3 sm:gap-4 lg:justify-end w-full">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-[1.5vw] lg:leading-snug text-white">
                    {item.title}
                  </h3>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.2vw] lg:h-[3.2vw] rounded-full bg-botanical-gold/15 backdrop-blur-md border border-botanical-gold/40 flex items-center justify-center p-2.5 group-hover:border-botanical-gold group-hover:bg-botanical-gold/25 group-hover:scale-105 transition-all duration-500 shrink-0 order-1 lg:order-2 shadow-xs">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.icon || "/vector/leaves.png"}
                        alt={`${item.title} Botanical Icon`}
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 60px"
                        className="object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>


                <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.82vw] lg:leading-[1.65] text-white/75 leading-relaxed mt-2 lg:mt-[0.5vw]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Center Visual Stage: Foundation + Closer Botanical Images ── */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 my-8 lg:my-0 relative"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[28vw] aspect-square flex items-center justify-center">

              {/* Soft Radial Backlight */}
              <div
                className="absolute inset-4 sm:inset-8 bg-botanical-gold/15 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* ── Botanical Image Element 1: Flower (Top Right - Closer to Center) ── */}
              <motion.div
                style={{
                  y: yFlower,
                  rotate: rotateFlower,
                  x: smoothMouseX,
                }}
                className="absolute top-0 sm:top-1 right-2 sm:right-6 lg:right-2 w-20 sm:w-28 lg:w-[7.2vw] aspect-square z-20 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              >
                <motion.div
                  animate={{
                    y: [-6, 6, -6],
                    rotate: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/images/home/ingredients/flower.png"
                    alt="Botanical Flower Active Ingredient"
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 120px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* ── Botanical Image Element 2: Leaves (Top Left - Closer to Center) ── */}
              <motion.div
                style={{
                  y: yLeaves,
                  x: smoothMouseX,
                }}
                className="absolute top-1 sm:top-2 left-2 sm:left-6 lg:left-2 w-24 sm:w-32 lg:w-[8.5vw] aspect-square z-20 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              >
                <motion.div
                  animate={{
                    y: [7, -7, 7],

                  }}
                  transition={{
                    duration: 6.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/images/home/ingredients/leaves.png"
                    alt="Botanical Leaves Active Ingredient"
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 140px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* ── Botanical Image Element 3: Beans / Seeds (Bottom Left - Closer to Center) ── */}
              <motion.div
                style={{
                  y: yBeans,
                  x: smoothMouseX,
                }}
                className="absolute bottom-0 sm:bottom-1 left-4 sm:left-8 lg:left-4 w-20 sm:w-28 lg:w-[7.2vw] aspect-square z-20 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              >
                <motion.div
                  animate={{
                    y: [-8, 8, -8],
                    rotate: [-4, 4, -4],
                  }}
                  transition={{
                    duration: 5.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/images/home/ingredients/beans.png"
                    alt="Botanical Seed Extracts Active Ingredient"
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 120px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* ── Botanical Image Element 4: Leaves Variant (Bottom Right - Closer to Center) ── */}
              <motion.div
                style={{
                  y: yLeaves1,
                  x: smoothMouseX,
                }}
                className="absolute bottom-1 sm:bottom-2 right-4 sm:right-8 lg:right-4 w-22 sm:w-30 lg:w-[8vw] aspect-square z-20 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              >
                <motion.div
                  animate={{
                    y: [6, -6, 6],
                    rotate: [4, -4, 4],
                  }}
                  transition={{
                    duration: 6.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/images/home/ingredients/leaves1.png"
                    alt="Botanical Leaf Extract"
                    fill
                    sizes="(max-width: 640px) 88px, (max-width: 1024px) 120px, 130px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* ── CENTER MAIN IMAGE: Foundation Formulation Base with Slow Subtle Scale & Tilt on Hover ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  scale: 1.045,
                  rotateZ: 2,
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{
                  x: smoothMouseX,
                  y: smoothMouseY,
                }}
                className="relative w-[85%] h-[85%] sm:w-[90%] sm:h-[90%] z-10 flex items-center justify-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/home/ingredients/foundation.png"
                    alt="GVEDA Botanical Foundation Formulation - Center Core Active"
                    fill
                    priority
                    sizes="(max-width: 768px) 75vw, (max-width: 1200px) 32vw, 26vw"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Right Column Features (Transparent Glass Cards) ── */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 lg:gap-[1.8vw] lg:text-left order-3">
            {RIGHT_FEATURES.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col lg:items-start p-6 sm:p-7 lg:p-[1.6vw] rounded-2xl bg-white/[0.03]  border border-white/[0.08] hover:border-secondary/40 hover:bg-white/[0.06]  transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-3 sm:gap-4 lg:justify-start w-full">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.2vw] lg:h-[3.2vw] rounded-full bg-botanical-gold/15 backdrop-blur-md border border-botanical-gold/40 flex items-center justify-center p-2.5 group-hover:border-botanical-gold group-hover:bg-botanical-gold/25 group-hover:scale-105 transition-all duration-500 shrink-0 shadow-xs">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.icon || "/vector/leaves.png"}
                        alt={`${item.title} Botanical Icon`}
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 60px"
                        className="object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-[1.5vw] lg:leading-snug text-white">
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

