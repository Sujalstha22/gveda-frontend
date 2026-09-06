import React from "react";
import Link from "next/link";
import { FOOTER_NAV_LINKS } from "./footerData";

export default function FooterNav() {
  return (
    <div className="flex flex-col items-start">
      <h3 className="font-antessa font-semibold text-xl lg:text-[2vw]  text-primary  mb-3 sm:mb-4 lg:mb-[0.8vw]">
        Navigate
      </h3>

      <div className="flex flex-col items-start gap-2.5 sm:gap-3 lg:gap-[0.55vw]">
        {FOOTER_NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-primary text-sm font-medium lg:text-[1vw] text-primary/75 hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
