import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavLogoProps {
  onClick?: () => void;
}

export default function NavLogo({ onClick }: NavLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Gveda home"
      onClick={onClick}
      className="shrink-0 relative z-1051 inline-flex items-center"
    >
      <Image
        src="/logo/gveda_logo.svg"
        alt="Gveda"
        width={120}
        height={44}
        style={{ maxWidth: '100%', height: 'auto' }}
        className="w-31.25 sm:w-33.75 md:w-35 h-auto object-contain object-left transition-all duration-300"
        priority
      />
    </Link>
  );
}
