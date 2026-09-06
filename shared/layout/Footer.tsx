'use client';

import React from 'react';
import FooterScrollTop from './footer/FooterScrollTop';
import FooterNewsletter from './footer/FooterNewsletter';
import FooterBrand from './footer/FooterBrand';
import FooterNav from './footer/FooterNav';
import FooterPolicies from './footer/FooterPolicies';
import FooterBottom from './footer/FooterBottom';

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative w-full bg-secondary/20 border-t border-black/5 pt-8  pb-8 overflow-hidden select-none"
    >
      <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
        <FooterScrollTop />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          <FooterNewsletter />
          <FooterBrand />
          <FooterNav />
        </div>

        <FooterPolicies />

        <FooterBottom />
      </div>
    </footer>
  );
}