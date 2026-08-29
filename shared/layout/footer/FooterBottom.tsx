import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-black/10 mt-12 sm:mt-16 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
      <p className="font-primary text-xs text-primary/70">
        © Copyright {year} | All Rights Reserved
      </p>
      <span className="hidden sm:inline text-primary/40">|</span>
      <div className="flex items-center gap-1.5 font-primary text-xs text-primary/70">
        <span>Designed & developed by</span>
        <Link
          href="https://www.webxnepal.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo/black-logo-png.webp"
            alt="WebX Nepal"
            width={50}
            height={20}
            className="object-contain inline-block ml-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
