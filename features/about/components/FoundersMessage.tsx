"use client";

import React from "react";
import Image from "next/image";

const FoundersMessage = () => {
  return (
    <section
      aria-label="Message from Founder"
      className="w-full py-16 sm:py-24 lg:py-[6vw] px-4 sm:px-8 lg:px-[5vw] select-none bg-[#F5F2ED]"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-[4vw] items-center">
        {/* ── Left Column: Founder Visual ── */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] min-h-[400px] h-[450px] lg:h-[540px] rounded-2xl lg:rounded-[1.2vw] overflow-hidden shadow-sm border border-black/5 group">
          <Image
            src="/founder1.png"
            alt="GVEDA Founder - Botanical Science & Rituals"
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── Right Column: Editorial Message ── */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left lg:pl-[2vw]">
          {/* Eyebrow / Tag */}
          <span className="font-madison italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw] block">
            A Personal Note
          </span>

          {/* Section Title */}
          <h2 className="font-antessa uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.15] text-primary mb-6 sm:mb-8 lg:mb-[1.8vw]">
            Message From Our Founder
          </h2>

          {/* Quote / Editorial Body */}
          <div className="relative pl-5 border-l-2 border-accent-gold/40 mb-8 sm:mb-10 lg:mb-[2vw]">
            <p className="font-primary font-normal text-sm sm:text-base lg:text-[0.95vw] lg:leading-[1.8] text-primary/80 leading-relaxed italic">
              &ldquo;When we founded GVEDA, our vision was simple yet
              unyielding: to honor the age-old intelligence of sacred botanicals
              while grounding every formulation in modern dermatological
              science. Skincare should never feel frantic or chemical; it should
              be a quiet, restorative ritual that nourishes your natural
              vitality.&rdquo;
            </p>
          </div>

          <div className="space-y-4 lg:space-y-[1vw] font-primary font-normal text-sm sm:text-base lg:text-[0.9vw] lg:leading-[1.75] text-primary/75 mb-8 sm:mb-10 lg:mb-[2.2vw]">
            <p>
              Every cold-pressed oil, plant extract, and bioactive lipid in our
              collection is ethically harvested and meticulously tested. We
              strip away synthetic fillers to deliver raw, biocompatible purity
              directly to your skin and hair barrier.
            </p>
            <p>
              Thank you for letting GVEDA be a part of your daily botanical
              journey toward enduring radiance and mindful wellness.
            </p>
          </div>

          {/* Founder Signature Block */}
          <div className="flex flex-col pt-2 border-t border-black/10 w-full sm:w-auto">
            <span className="font-madison italic text-2xl sm:text-3xl lg:text-[1.6vw] text-accent-gold font-normal">
              Gveda Botanicals
            </span>
            <span className="font-primary uppercase tracking-[0.15em] text-[10px] sm:text-xs text-primary/60 font-light mt-0.5">
              Founder & Chief Formulation Officer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersMessage;
