import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-black/10 mt-10 sm:mt-12 lg:mt-[2.5vw] pt-6 lg:pt-[1.2vw] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-[0.6vw] text-center">
      <p className="font-primary text-xs lg:text-[0.75vw] text-primary/70">
        © Copyright {year} | All Rights Reserved
      </p>
      <span className="hidden sm:inline text-primary/40 lg:text-[0.75vw]">|</span>
      <div className="flex items-center gap-1.5 lg:gap-[0.3vw] font-primary text-xs lg:text-[0.75vw] text-primary/70">
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
            className="object-contain inline-block ml-0.5 w-10 sm:w-12 lg:w-[2.8vw] h-auto"
          />
        </Link>
      </div>
    </div>
  );
}

