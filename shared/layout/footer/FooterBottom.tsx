"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="w-full border-t border-black/10 pt-3 lg:pt-[0.8vw] flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs lg:text-[1vw] text-primary font-primary">
      <p>© {year} GVEDA. All Rights Reserved.</p>

      <div className="flex  items-center gap-1.5">
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
            className="object-contain inline-block ml-0.5 w-12 sm:w-12 lg:w-[4vw] h-auto"
          />
        </Link>
      </div>
    </div>
  );
}
