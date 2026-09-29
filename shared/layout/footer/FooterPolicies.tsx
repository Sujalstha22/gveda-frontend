"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const POLICIES = [
  { slug: "company-policy", label: "Company Policy" },
  { slug: "associate-policy", label: "Associate Policy" },
  { slug: "privacy-policy", label: "Privacy Policy" },
  { slug: "shipping-policy", label: "Shipping Policy" },
  { slug: "terms-and-conditions", label: "Terms & Conditions" },
  {
    slug: "cancellation-exchange-and-refund-policy",
    label: "Exchange & Refund Policy",
  },
  {
    slug: "global-victors-code-of-ethics-and-conduct",
    label: "Code of Ethics and Conduct",
  },
];

export default function FooterPolicies() {
  return (
    <div className="flex flex-col items-start">
      <h3 className="font-heading font-semibold text-xl lg:text-[2vw] text-white mb-3 sm:mb-4 lg:mb-[0.8vw]">
        Policies and Care
      </h3>

      <div className="flex flex-col items-start gap-2.5 sm:gap-3 lg:gap-[0.55vw]">
        {POLICIES.map((item) => (
          <Link
            key={item.label}
            href={`/policies/${item.slug}`}
            className="group inline-flex items-center gap-1.5 font-primary text-sm lg:text-[1vw] text-white/80 hover:text-white transition-colors duration-200"
          >
            <span>{item.label}</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw] opacity-0 -translate-x-1 translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 text-white shrink-0"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
