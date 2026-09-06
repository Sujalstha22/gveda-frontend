'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MobileDrawer from './navbar/MobileDrawer';
import { NAV_LINKS } from './navbar/navData';

function CartIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}


function UserIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const isGallery = pathname === '/gallery' || pathname?.startsWith('/gallery/');
  const isTransparent = !isGallery && !scrolled && !mobileOpen;

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out py-2.5 sm:py-3 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-[#F7F5F1]/95 backdrop-blur-md border-b border-[#ECE4DA] shadow-subtle'
        } ${
          visible || mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-8 lg:px-[5vw] mx-auto">
          {/* ── LEFT: Brand Logo ── */}
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              className="flex items-center gap-3.5 group cursor-pointer"
              onClick={() => setMobileOpen(false)}
              aria-label="GVEDA Home"
            >
              <Image
                src="/logo/gveda_logo.svg"
                alt="GVEDA Logo"
                width={150}
                height={40}
                className={`w-24 sm:w-28 md:w-32 h-auto object-contain object-left transition-all duration-300 ${
                  isTransparent ? 'brightness-0 invert' : ''
                }`}
                priority
              />
            </Link>
          </div>

          {/* ── CENTER: Primary Nav Links ── */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden lg:flex items-center justify-center shrink-0 gap-6 xl:gap-8 font-primary text-sm xl:text-[15px] tracking-normal capitalize transition-colors duration-300 ${
              isTransparent ? 'text-white/80' : 'text-primary/80'
            }`}
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative py-1 transition-colors duration-200 ${
                    isTransparent
                      ? isActive
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white font-normal'
                      : isActive
                      ? 'text-primary font-semibold'
                      : 'text-primary/75 hover:text-primary font-normal'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full transition-transform duration-200 origin-left ${
                      isTransparent ? 'bg-white' : 'bg-primary'
                    } ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: Cart & User Login Icons (+ Mobile Toggle) ── */}
          <div
            className={`flex-1 flex items-center justify-end gap-1.5 sm:gap-2.5 transition-colors duration-300 ${
              isTransparent ? 'text-white/85' : 'text-primary/80'
            }`}
          >
            {/* Cart Icon */}
            <Link
              href="/cart"
              aria-label="Shopping Cart"
              title="Cart"
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isTransparent
                  ? 'text-white hover:bg-white/15'
                  : pathname === '/cart'
                  ? 'text-primary bg-black/10'
                  : 'text-primary/80 hover:text-primary hover:bg-black/5'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <CartIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </Link>

            {/* User / Login Icon */}
            <Link
              href="/login"
              aria-label="Account / Login"
              title="Account"
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isTransparent
                  ? 'text-white hover:bg-white/15'
                  : pathname === '/login'
                  ? 'text-primary bg-black/10'
                  : 'text-primary/80 hover:text-primary hover:bg-black/5'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <UserIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`lg:hidden flex flex-col items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 gap-1 focus:outline-none cursor-pointer rounded-full transition-colors ml-0.5 ${
                isTransparent
                  ? 'text-white hover:bg-white/15'
                  : 'text-primary hover:bg-black/5'
              }`}
            >
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-primary'
                } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-primary'
                } ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-primary'
                } ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
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