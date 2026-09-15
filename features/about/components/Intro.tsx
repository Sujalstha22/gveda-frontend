import React from "react";

const Intro = () => {
  return (
    <section
      aria-label="Welcome Intro"
      className="w-full py-16 sm:py-20 lg:py-[5vw] px-4 sm:px-8 lg:px-[5vw] select-none bg-[#F5F2ED]"
    >
      <div className="w-full lg:max-w-[65vw] mx-auto flex flex-col items-center text-center">
        {/* ── Tag / Eyebrow ── */}
        <span className="font-madison italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw] block">
          Sacred Botanical Wisdom
        </span>

        {/* ── Heading / Title ── */}
        <h2 className="font-heading capitalize font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.15] text-primary">
          Welcome to Gveda Botanical Science
        </h2>

        {/* ── Subtitle / Paragraph Copy ── */}
        <div className="w-full max-w-3xl lg:max-w-[55vw] mx-auto mt-6 sm:mt-8 lg:mt-[1.8vw]">
          <p className="font-primary font-normal text-sm sm:text-base lg:text-[0.95vw] lg:leading-[1.75] text-primary/75 leading-relaxed">
            At Gveda, we unite sacred botanical wisdom with modern
            dermatological science to nourish, protect, and restore your skin
            and hair&apos;s natural vitality. Our pure, biocompatible
            formulations are thoughtfully crafted to deliver an exceptional,
            calming ritual for modern beauty. Grounded in holistic wellness and
            clinical efficacy, every botanical active is ethically harvested and
            cold-pressed to preserve its living nutrients. We believe true
            luxury lies in simplicity—creating timeless rituals that nurture
            your skin barrier and reveal your enduring, luminous radiance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
