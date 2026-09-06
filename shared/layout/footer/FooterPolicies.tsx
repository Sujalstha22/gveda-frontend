"use client";

import React from "react";
import Link from "next/link";

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
      <h3 className="font-antessa font-semibold text-xl lg:text-[2vw] text-primary mb-3 sm:mb-4 lg:mb-[0.8vw]">
        Policies & Care
      </h3>

      <div className="flex flex-col items-start gap-2.5 sm:gap-3 lg:gap-[0.55vw]">
        {POLICIES.map((item) => (
          <Link
            key={item.label}
            href={`/policies/${item.slug}`}
            className="font-primary text-sm font-medium lg:text-[1vw] text-primary/75 hover:text-primary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
