import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV_LINKS } from './footerData';

export default function FooterNav() {
  return (
    <div className="md:col-span-4 flex flex-col items-start md:items-end">
      <div className="w-full max-w-xs md:text-right">
        <h3 className="font-primary font-medium text-base sm:text-3xl tracking-wider text-primary uppercase mb-4 sm:mb-6">
          NAVIGATE
        </h3>

        <div className="grid grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-3.5 sm:gap-y-4 text-left">
          {FOOTER_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-primary font-medium text-xs tracking-wider text-primary/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
