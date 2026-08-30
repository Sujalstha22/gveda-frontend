import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV_LINKS } from './footerData';

export default function FooterNav() {
  return (
    <div className="md:col-span-4 flex flex-col items-start md:items-end">
      <div className="w-full max-w-xs lg:max-w-[22vw] md:text-right">
        <h3 className="font-primary font-medium text-base sm:text-lg lg:text-[1.2vw] lg:leading-tight tracking-wider text-primary uppercase mb-4 sm:mb-6 lg:mb-[1.2vw]">
          NAVIGATE
        </h3>

        <div className="grid grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-[1.8vw] gap-y-3.5 sm:gap-y-4 lg:gap-y-[0.8vw] text-left">
          {FOOTER_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-primary font-medium text-xs lg:text-[0.75vw] tracking-wider text-primary/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

