"use client";

import React, { useState } from "react";
import Button from "@/shared/ui/Button";
import { FOOTER_SOCIALS, SocialLink } from "./footerData";

function SocialIcon({ type }: { type: SocialLink["type"] }) {
  if (type === "facebook") {
    return (
      <svg
        className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg
        className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }

  return (
    <svg
      className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <h3 className="font-antessa font-semibold text-xs  lg:text-[2vw] text-primary mb-3 sm:mb-4 lg:mb-[0.8vw]">
        Stay Connected
      </h3>
      <p className="font-primary text-sm font-medium lg:text-[1vw] text-primary/70 leading-relaxed max-w-sm mb-3 lg:mb-[0.6vw]">
        Be the first to discover botanical releases and exclusive skincare
        rituals.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="w-full max-w-sm flex items-center gap-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER YOUR EMAIL"
          required
          className="flex-1 bg-transparent border-b border-black/20 pb-1.5 text-xs lg:text-[0.75vw] font-primary placeholder:text-muted placeholder:tracking-widest uppercase focus:outline-none focus:border-primary text-primary"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="py-1 px-3 text-[0.68rem] lg:text-[0.65vw] tracking-wider uppercase shrink-0"
        >
          {subscribed ? "Subscribed ✓" : "Subscribe"}
        </Button>
      </form>

      <div className="flex items-center gap-2 mt-4 lg:mt-[0.8vw]">
        {FOOTER_SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-8 h-8 lg:w-[1.8vw] lg:h-[1.8vw] rounded-full border border-black/20 flex items-center justify-center text-primary/75 hover:text-white hover:bg-primary hover:border-primary transition-all duration-200"
          >
            <SocialIcon type={social.type} />
          </a>
        ))}
      </div>
    </div>
  );
}
