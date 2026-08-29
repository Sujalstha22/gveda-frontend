'use client';

import React, { useEffect, useState, useRef } from 'react';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import NavMenuButton from './navbar/NavMenuButton';
import MobileDrawer from './navbar/MobileDrawer';

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
        <div className="flex items-center justify-between mx-auto px-6 sm:px-8 lg:px-12 h-17.5 sm:h-19.5 transition-all duration-300">
          <NavLogo onClick={() => setMobileOpen(false)} />
          <DesktopNav />
          <NavMenuButton
            open={mobileOpen}
            onToggle={() => setMobileOpen((prev) => !prev)}
          />
        </div>
      </nav>
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}