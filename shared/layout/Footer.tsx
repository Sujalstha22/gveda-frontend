"use client";

import FooterNewsletter from "./footer/FooterNewsletter";
import FooterNav from "./footer/FooterNav";
import FooterPolicies from "./footer/FooterPolicies";
import FooterBottom from "./footer/FooterBottom";
import FooterBigText from "./footer/FooterBigText";

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative w-full min-h-[100dvh] h-auto bg-warm-ivory border-t border-black/10 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ── UPPER SECTION: Links, Policies, Newsletter (h-auto) ── */}
      <div className="w-full h-auto flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-[5vw] pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 border-b border-black/10">
        {/* Links Grid: Navigation, Policies, and Stay Connected */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start py-4">
          <div className="md:col-span-4">
            <FooterNav />
          </div>
          <div className="md:col-span-4">
            <FooterPolicies />
          </div>
          <div className="md:col-span-4">
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* ── LOWER SECTION: Big GVEDA Text & Bottom Credits (h-auto) ── */}
      <div className="w-full h-auto min-h-[38vh] flex flex-col justify-between px-4 sm:px-8 lg:px-[4vw] pt-4 sm:pt-6 pb-4 sm:pb-6 overflow-hidden">
        {/* Big GVEDA text taking the center */}
        <FooterBigText />

        {/* Bottom Copyright & WebX Credits */}
        <FooterBottom />
      </div>
    </footer>
  );
}
