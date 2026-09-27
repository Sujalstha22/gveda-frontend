"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export interface CTAProps {
  badge?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  imageSrc?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTA({
  badge = "Ready to Transform",
  title = "Discover Your Ritual",
  description = "Experience the intersection of sacred botanical wisdom and modern skincare science. Thoughtfully formulated in small batches for luminous, balanced skin.",
  ctaText = "Explore Formulations",
  ctaHref = "/product",
  secondaryText = "Discover The Science",
  secondaryHref = "/about",
  imageSrc = "/images/product/gveda.png",
  className = "",
}: CTAProps) {
  return (
    <section
      aria-label="Call to action"
      className={`relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-[5vw] overflow-hidden select-none ${className}`}
    >
      {/* Luxury Architectural Container - Aligned exactly with Navbar content width */}
      <div className="group relative w-full bg-linear-to-l from-[#321E12] via-[#1A1009] to-[#0F0D0E] rounded-2xl sm:rounded-3xl border border-secondary/30 overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.22)] grid grid-cols-1 lg:grid-cols-12 items-stretch transition-all duration-500">
        {/* Subtle Ambient Botanical Radial Glow */}
        <div
          className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-botanical-gold/[0.14] rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#3D2516]/25 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        {/* ── Left Column: Editorial Content & Actions (col-span-7) ── */}
        <div className="relative z-10 lg:col-span-7 p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-center">
          <div>
            {/* Eyebrow with Botanical Seal */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-botanical-gold/15 border border-botanical-gold/40 flex items-center justify-center text-botanical-gold shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              {badge && (
                <span className="font-madison italic text-xl sm:text-2xl lg:text-[1.5vw] text-botanical-gold font-normal">
                  {badge}
                </span>
              )}
            </div>

            {/* Grand Architectural Title */}
            <h2 className="font-heading font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-[3.2vw] lg:leading-[1.12] text-white tracking-tight mb-5">
              {title}
            </h2>

            {/* Poetic Description */}
            {description && (
              <p className="font-primary text-sm sm:text-base lg:text-[1.05vw] text-white/80 mb-8 max-w-xl leading-relaxed">
                {description}
              </p>
            )}

            {/* Action Buttons - High Contrast & Clearly Visible */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              <Link href={ctaHref}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="!h-12 sm:!h-13 !px-8 sm:!px-10 text-xs sm:text-[13px] tracking-[0.16em] !bg-botanical-gold !text-rich-black !border-botanical-gold hover:!bg-white hover:!border-white hover:!text-rich-black shadow-md flex items-center justify-center transition-all duration-300"
                >
                  {ctaText}
                </Button>
              </Link>

              {secondaryText && secondaryHref && (
                <Link href={secondaryHref}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="!h-12 sm:!h-13 !px-7 sm:!px-9 text-xs sm:text-[13px] tracking-[0.16em] !text-white !border-white/50 hover:!bg-white hover:!border-white flex items-center justify-center transition-all duration-300"
                  >
                    {secondaryText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Column: High-Resolution Formulation Imagery (col-span-5, borderless) ── */}
        <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt="GVEDA Botanical Formulations"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-contain transition-transform duration-700 ease-out"
          />
        </div>
      </div>
    </section>
  );
}

export { CTA };
