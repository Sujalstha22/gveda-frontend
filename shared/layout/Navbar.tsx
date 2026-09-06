'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileDrawer from './navbar/MobileDrawer';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
}

const PRIMARY_NAV: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Product', href: '/product' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
];

const UTILITY_NAV: NavItem[] = [
  { label: 'Cart', href: '/cart' },
  { label: 'Contact', href: '/contact' },

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const delta = 10;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 0) return;

      if (currentScrollY <= 40) {
        setScrolled(false);
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      setScrolled(true);

      if (Math.abs(currentScrollY - lastScrollY) >= delta) {
        setVisible(currentScrollY <= lastScrollY);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out ${scrolled
          ? 'bg-rich-black/85 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
          : 'bg-linear-to-b from-black/40 via-black/15 to-transparent py-6'
          } ${visible || mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="w-full flex items-center justify-between px-6 md:px-12 mx-auto">
          {/* ── LEFT: Dotted Brand Logo & Title ── */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            {/* 3x3 Dots Matrix Icon */}
            {/* <div className="grid grid-cols-3 gap-1 w-5 h-5 items-center justify-items-center">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-125 transition-all duration-200"
                />
              ))}
            </div> */}

            <Image src="/logo/gveda_logo.svg" alt="logo" width={150} height={40} />
          </Link>

          {/* ── CENTER: Primary Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-['Montserrat'] text-md tracking-wide text-white/80">
            {PRIMARY_NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative transition-colors duration-200 pb-1 ${isActive
                    ? 'text-white font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-white'
                    : 'hover:text-white font-normal'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: Utility Links & Reserve Action ── */}
          <div className="flex items-center gap-4 sm:gap-6 xl:gap-7 font-['Montserrat'] text-md! tracking-wide text-white/80">
            {UTILITY_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors duration-200 hidden sm:inline-block"
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 text-white focus:outline-none cursor-pointer"
            >
              <span
                className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''
                  }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}