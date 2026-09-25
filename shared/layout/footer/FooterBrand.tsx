import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_SOCIALS, SocialLink } from './footerData';

function SocialIcon({ type }: { type: SocialLink['type'] }) {
  if (type === 'facebook') {
    return (
      <svg className="w-5 h-5 lg:w-[1.2vw] lg:h-[1.2vw]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (type === 'linkedin') {
    return (
      <svg className="w-5 h-5 lg:w-[1.2vw] lg:h-[1.2vw]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }

  return (
    <svg className="w-5 h-5 lg:w-[1.2vw] lg:h-[1.2vw]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function FooterBrand() {
  return (
    <div className="md:col-span-4 flex flex-col items-center text-center">
      <Link
        href="/"
        aria-label="Gveda home"
        className="inline-block transition-transform hover:scale-105 duration-300"
      >
        <Image
          src="/logo/gveda_logo.svg"
          alt="Gveda - Whisper of Nature"
          width={200}
          height={58}
          className="object-contain w-40 sm:w-48 lg:w-[12vw] h-auto brightness-0 invert"
        />
      </Link>

      <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.8vw] lg:leading-[1.6] text-white/80 max-w-xs lg:max-w-[20vw] mt-4 lg:mt-[1vw] leading-relaxed">
        Organic ingredients that nourish the skin and promote its natural radiance.
      </p>

      <div className="flex items-center justify-center gap-2.5 lg:gap-[0.6vw] mt-5 lg:mt-[1.2vw]">
        {FOOTER_SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-10 h-10 sm:w-11 sm:h-11 lg:w-[2.6vw] lg:h-[2.6vw] rounded lg:rounded-[0.3vw] border border-white/20 flex items-center justify-center text-white/80 hover:text-rich-black hover:bg-white hover:border-white transition-all duration-200"
          >
            <SocialIcon type={social.type} />
          </a>
        ))}
      </div>
    </div>
  );
}

