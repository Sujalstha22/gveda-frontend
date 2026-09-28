"use client";

import React from "react";
import Link from "next/link";
import WebxLogoSparkles from "./Webxsparkles";

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="w-full border-t border-black/10 pt-3 lg:pt-[0.8vw] flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs lg:text-[0.8vw] text-white font-primary">
      <p className="text-white">© {year} GVEDA. All Rights Reserved.</p>

      <div className="flex text-white items-center gap-1.5">
        <Link
          href="https://www.webxnepal.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:opacity-90 transition-opacity gap-1.5"
        >
          <span>Designed & developed by </span>
          <WebxLogoSparkles width={60} logoSrc="/logo/white-webxlogo.svg" className="inline-flex ml-0.5" />
        </Link>
      </div>
    </div>
  );
}
