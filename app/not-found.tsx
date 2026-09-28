"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/shared/ui/Button";

export default function NotFound() {
  return (
    <main
      aria-label="404 - Page Not Found"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden select-none bg-[#0F0D0E] text-white px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* ── Background Ambient Botanical Glows ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] sm:w-[50rem] lg:w-[70rem] h-[25rem] sm:h-[35rem] lg:h-[40rem] bg-botanical-gold/[0.07] rounded-full blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-96 h-96 bg-[#3D2516]/25 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-96 h-96 bg-[#3D2516]/25 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ── Main 404 Showcase Container (75vh scale) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* ── 75vh 404 Section with Center Product Showcase ── */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[75vh] flex items-center justify-center">
          {/* Background Huge 404 Typography */}
          <div className="flex items-center justify-center gap-1 sm:gap-4 md:gap-8 lg:gap-12 w-full h-full">
            {/* Left '4' */}
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold text-[35vw] sm:text-[40vh] md:text-[50vh] lg:text-[65vh] leading-none text-white/[0.08] select-none tracking-tighter"
            >
              4
            </motion.span>

            {/* Center '0' Frame with Product Showcase */}
            <div className="relative flex items-center justify-center w-[36vw] sm:w-[42vh] md:w-[52vh] lg:w-[62vh] h-full">
              {/* Giant '0' Outline Ring / Frame */}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-bold text-[35vw] sm:text-[40vh] md:text-[50vh] lg:text-[65vh] leading-none text-white/[0.07] select-none tracking-tighter"
              >
                0
              </motion.span>

              {/* Showcase Product Bottle Floating within Center 0 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: [0, -6, 0],
                  scale: 1,
                }}
                transition={{
                  opacity: { duration: 0.9, delay: 0.15 },
                  scale: { duration: 0.9, delay: 0.15 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-0 m-auto w-[110%] sm:w-[120%] lg:w-[130%] h-[110%] sm:h-[120%] lg:h-[130%] z-10 flex items-center justify-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] pointer-events-none"
              >
                {/* Radial Golden Halo behind Product */}
                <div
                  className="absolute inset-0 m-auto w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-botanical-gold/20 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative w-full h-full flex items-center justify-center scale-110 sm:scale-130 lg:scale-145 pointer-events-none">
                  <Image
                    src="/images/home/abtsection/abt-img.png"
                    alt="GVEDA Signature Botanical Formulation"
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 45vw"
                    className="object-contain pointer-events-none"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right '4' */}
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold text-[35vw] sm:text-[40vh] md:text-[50vh] lg:text-[65vh] leading-none text-white/[0.08] select-none tracking-tighter pointer-events-none"
            >
              4
            </motion.span>
          </div>
        </div>

        {/* ── Editorial Message & Return Action ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 flex flex-col items-center text-center mt-2 sm:mt-4 lg:mt-6"
        >
          {/* Eyebrow */}
          <span className="font-madison italic text-xl sm:text-2xl lg:text-[1.5vw] text-botanical-gold font-normal mb-1">
            Botanical Science
          </span>

          {/* Page Not Found Description */}
          <p className="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-wider mb-3">
            Page Not Found
          </p>

          <p className="font-primary font-light text-sm sm:text-base lg:text-[1vw] text-white/70 max-w-lg mb-8 leading-relaxed">
            The botanical formulation or ritual you are seeking has been moved,
            archived, or does not exist.
          </p>

          {/* Action Link to Home Page */}
          <Link href="/" className="relative z-30 inline-block">
            <Button
              variant="secondary"
              size="lg"
              className="!h-12 sm:!h-13 !px-8 sm:!px-10 text-xs sm:text-[13px] tracking-[0.18em] uppercase flex items-center justify-center gap-2 group shadow-lg hover:shadow-botanical-gold/20 cursor-pointer"
            >
              <span>Explore the Botanicals</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
