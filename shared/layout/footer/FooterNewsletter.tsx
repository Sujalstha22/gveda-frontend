"use client";

import React, { useState } from "react";
import Button from "@/shared/ui/Button";
import { createLucideIcon } from "lucide-react";
import { FOOTER_SOCIALS, SocialLink } from "./footerData";

const Facebook = createLucideIcon("facebook", [
  [
    "path",
    {
      d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
      key: "fb-1",
    },
  ],
]);

const Instagram = createLucideIcon("instagram", [
  [
    "rect",
    {
      width: "20",
      height: "20",
      x: "2",
      y: "2",
      rx: "5",
      ry: "5",
      key: "ig-1",
    },
  ],
  [
    "path",
    {
      d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
      key: "ig-2",
    },
  ],
  [
    "line",
    {
      x1: "17.5",
      x2: "17.51",
      y1: "6.5",
      y2: "6.5",
      key: "ig-3",
    },
  ],
]);

const Linkedin = createLucideIcon("linkedin", [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "li-1",
    },
  ],
  [
    "rect",
    {
      width: "4",
      height: "12",
      x: "2",
      y: "9",
      key: "li-2",
    },
  ],
  [
    "circle",
    {
      cx: "4",
      cy: "4",
      r: "2",
      key: "li-3",
    },
  ],
]);

function SocialIcon({ type }: { type: SocialLink["type"] }) {
  if (type === "facebook") {
    return (
      <Facebook
        className="w-5.5 h-5.5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw]"
        strokeWidth={1.65}
        aria-hidden
      />
    );
  }

  if (type === "linkedin") {
    return (
      <Linkedin
        className="w-5.5 h-5.5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw]"
        strokeWidth={1.65}
        aria-hidden
      />
    );
  }

  return (
    <Instagram
      className="w-5.5 h-5.5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw]"
      strokeWidth={1.65}
      aria-hidden
    />
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
      <h3 className="font-antessa font-semibold text-xl lg:text-[2vw] text-primary mb-3 sm:mb-4 lg:mb-[0.8vw]">
        Stay Connected
      </h3>
      <p className="font-primary text-sm font-medium lg:text-[1vw] text-primary/70 leading-relaxed max-w-sm mb-4 lg:mb-[1vw]">
        Be the first to discover botanical releases and exclusive skincare
        rituals.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="w-full max-w-md flex items-center gap-3"
      >
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            required
            className="w-full bg-transparent border-b border-black/25 pb-2.5 pt-2 text-xs sm:text-sm lg:text-[0.8vw] font-primary placeholder:text-muted placeholder:tracking-widest uppercase focus:outline-none focus:border-primary text-primary transition-colors"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          className="h-11 sm:h-12 lg:h-[2.6vw] px-6 sm:px-7 lg:px-[1.6vw] text-xs lg:text-[0.75vw] tracking-wider uppercase shrink-0 font-medium cursor-pointer"
        >
          {subscribed ? "Subscribed ✓" : "Subscribe"}
        </Button>
      </form>

      <div className="flex items-center gap-3.5 sm:gap-4 lg:gap-[0.9vw] mt-9 sm:mt-11 lg:mt-[2.2vw]">
        {FOOTER_SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-12 h-12 sm:w-[52px] sm:h-[52px] lg:w-[2.8vw] lg:h-[2.8vw] rounded-full border border-black/20 flex items-center justify-center text-primary/80 hover:text-white hover:bg-primary hover:border-primary transition-all duration-200 cursor-pointer shadow-xs"
          >
            <SocialIcon type={social.type} />
          </a>
        ))}
      </div>
    </div>
  );
}
