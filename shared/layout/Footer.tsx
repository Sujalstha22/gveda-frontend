"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import CTA from "@/shared/ui/CTA";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterNav from "./footer/FooterNav";
import FooterPolicies from "./footer/FooterPolicies";
import FooterBottom from "./footer/FooterBottom";
import FooterBigText from "./footer/FooterBigText";

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact' || pathname?.startsWith('/contact');

  return (
    <footer
      aria-label="Site footer"
      className="relative w-full min-h-[100dvh] h-auto bg-primary text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ── CTA SECTION: Upper Footer CTA with Warm Ivory background (hidden on contact page) ── */}
      <div className="bg-warm-ivory">
        {!isContactPage && (
          <CTA
            badge="Ready to Transform"
            title="Discover Your Ritual"
            description="Experience the intersection of botanical wisdom and modern skincare science. Thoughtfully formulated in small batches for luminous, balanced skin."
            ctaText="Meet the Formula"
            ctaHref="/product"
            secondaryText="Discover The Science"
            secondaryHref="/about"
            variant="primary"
          />
        )}
      </div>

      {/* ── MAIN FOOTER CONTENT WITH BACKGROUND IMAGE (EXCEPT CTA) ── */}
      <div className="relative w-full flex-1 flex flex-col justify-between overflow-hidden">
        {/* Background Image & Texture Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/home/footer-bg.png"
            alt="Botanical background texture"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40 brightness-75"
            priority={false}
          />
          <div className="absolute inset-0 bg-primary/25 pointer-events-none" />
        </div>

        {/* ── UPPER SECTION: Links, Policies, Newsletter (h-auto) ── */}
        <div className="relative z-10 w-full h-auto flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-[5vw] pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 border-b border-white/10">
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
        <div className="relative z-10 w-full h-auto min-h-[38vh] flex flex-col justify-between px-4 sm:px-8 lg:px-[4vw] pt-4 sm:pt-6 pb-4 sm:pb-6 overflow-hidden">
          {/* Big GVEDA text taking the center */}
          <FooterBigText />

          {/* Bottom Copyright & WebX Credits */}
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}

