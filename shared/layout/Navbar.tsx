'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import NavMenuButton from './navbar/NavMenuButton';
import MobileDrawer from './navbar/MobileDrawer';
import Button from '@/shared/ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const delta = 10;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 0) return;

      if (currentScrollY <= 60) {
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
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-1050 transition-[background,box-shadow,border-color,transform] duration-400 ease-in-out"
        style={{
          background: mobileOpen
            ? 'rgba(247, 245, 241, 0.98)'
            : (scrolled ? 'rgba(247, 245, 241, 0.92)' : 'transparent'),
          backdropFilter: (scrolled || mobileOpen) ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: (scrolled || mobileOpen) ? 'blur(20px)' : 'none',
          borderBottom: (scrolled || mobileOpen)
            ? '1px solid var(--border)'
            : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-subtle)' : 'none',
          transform: (visible || mobileOpen) ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
          willChange: 'transform',
        }}
      >
        <div className="w-full flex items-center justify-between mx-auto px-4 sm:px-8 lg:px-[5vw] h-16 sm:h-18 lg:h-[4.5vw] transition-all duration-300">
          <NavLogo onClick={() => setMobileOpen(false)} />

          <DesktopNav />

          {/* Right Actions: Cart & Primary Login Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-[1.2vw]">
            {/* Add to Cart Icon Button */}
            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="p-1.5 sm:p-2 lg:p-[0.4vw] rounded-full text-primary hover:text-secondary hover:bg-black/5 transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-[1.6vw] lg:h-[1.6vw] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </Link>

            {/* Login Button */}
            <Link href="/login" className="inline-flex">
              <Button
                variant="primary"
                size="md"
                className="tracking-[0.14em] text-xs lg:text-[0.7vw] px-4 sm:px-5 lg:px-[1.2vw] py-1.5 sm:py-2 lg:py-[0.45vw] shadow-2xs"
              >
                LOGIN
              </Button>
            </Link>

            {/* Mobile Drawer Trigger */}
            <NavMenuButton
              open={mobileOpen}
              onToggle={() => setMobileOpen((prev) => !prev)}
            />
          </div>
        </div>
      </nav>
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}