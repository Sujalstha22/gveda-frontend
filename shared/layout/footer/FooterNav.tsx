import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FOOTER_NAV_LINKS } from "./footerData";

export default function FooterNav() {
  return (
    <div className="flex flex-col items-start">
      <h3 className="font-antessa font-semibold text-xl lg:text-[2vw] text-primary mb-3 sm:mb-4 lg:mb-[0.8vw]">
        Navigate
      </h3>

      <div className="flex flex-col items-start gap-2.5 sm:gap-3 lg:gap-[0.55vw]">
        {FOOTER_NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group inline-flex items-center gap-1.5 font-primary text-sm font-medium lg:text-[1vw] text-primary/75 hover:text-primary transition-colors duration-200"
          >
            <span>{link.label}</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw] opacity-0 -translate-x-1 translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 text-primary shrink-0"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
