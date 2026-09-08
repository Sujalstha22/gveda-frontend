'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MobileDrawer from './navbar/MobileDrawer';
import SearchBar from './navbar/SearchBar';
import { NAV_LINKS } from './navbar/navData';
import { useCart } from '@/shared/context/CartContext';

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


function SearchIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
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
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { openCart, totalItems } = useCart();

  // Only the home page ('/') has a dark cinematic carousel hero requiring white text/logo;
  // all other pages (/about, /product, /blog, /contact, etc.) use black text & black logo.
  const isDarkContentPage = pathname !== '/';
  const isSolidPage =
    pathname === '/gallery' ||
    pathname?.startsWith('/gallery/') ||
    pathname === '/events' ||
    pathname?.startsWith('/events/');
  const isTransparent = !isSolidPage && !scrolled && !mobileOpen && !searchOpen;
  const isWhiteNav = isTransparent && !isDarkContentPage;

  // Auto-close search when route changes
  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const delta = 15;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // Prevent iOS / Safari rubber-band bounce negative scroll trigger
      if (currentScrollY < 0) {
        ticking = false;
        return;
      }

      // Keep navbar visible & transparent near top of page
      if (currentScrollY <= 80) {
        setScrolled(false);
        setVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      setScrolled(true);

      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) >= delta) {
        // Scrolling up -> visible: true, Scrolling down -> visible: false
        setVisible(diff < 0);
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transform-gpu transition-all duration-300 ease-in-out ${
          searchOpen
            ? 'bg-[#F7F5F1] shadow-none'
            : isTransparent
            ? 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-[#F7F5F1] border-b border-[#ECE4DA] shadow-subtle'
        } ${
          visible || mobileOpen || searchOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative w-full py-2.5 sm:py-3 min-h-10 sm:min-h-11 flex items-center">
          {/* ── NAVBAR ROW ── */}
          <div className="w-full px-4 sm:px-8 lg:px-[5vw] flex items-center justify-between">
          {/* ── LEFT: Brand Logo ── */}
          <div className="flex-1 flex items-center justify-start z-30">
            <Link
              href="/"
              className="flex items-center gap-3.5 group cursor-pointer"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(false);
              }}
              aria-label="GVEDA Home"
            >
              <Image
                src="/logo/gveda_logo.svg"
                alt="GVEDA Logo"
                width={150}
                height={40}
                className={`w-24 sm:w-28 md:w-32 h-auto object-contain object-left transition-all duration-300 ${
                  isWhiteNav && !searchOpen ? 'brightness-0 invert' : ''
                }`}
                priority
              />
            </Link>
          </div>

          {/* ── CENTER: Primary Nav Links ── */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden lg:flex items-center justify-center shrink-0 gap-6 xl:gap-8 font-primary text-sm xl:text-[15px] tracking-normal capitalize transition-all duration-300 ${
              searchOpen
                ? 'opacity-0 invisible pointer-events-none'
                : 'opacity-100 visible pointer-events-auto'
            } ${isWhiteNav ? 'text-white/80' : 'text-primary/80'}`}
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
                    isWhiteNav
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
                      isWhiteNav ? 'bg-white' : 'bg-primary'
                    } ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: Search/Close, Cart & User Login Icons (+ Mobile Toggle) ── */}
          <div
            className={`flex-1 flex items-center justify-end gap-1.5 sm:gap-2.5 transition-colors duration-300 z-30 ${
              isWhiteNav && !searchOpen ? 'text-white/85' : 'text-primary/80'
            }`}
          >
            {/* Search / Close Toggle Button (stays in exact same place) */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen((prev) => !prev);
              }}
              aria-label={searchOpen ? 'Close search' : 'Search products'}
              title={searchOpen ? 'Close search' : 'Search'}
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isWhiteNav && !searchOpen
                  ? 'text-white hover:bg-white/15'
                  : searchOpen
                  ? 'text-primary bg-black/5 hover:bg-black/10'
                  : 'text-primary/80 hover:text-primary hover:bg-black/5'
              }`}
            >
              {searchOpen ? (
                <svg
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <SearchIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Cart Icon */}
            <button
              type="button"
              aria-label={`Shopping Cart (${totalItems} items)`}
              title="Cart"
              className={`relative p-1.5 sm:p-2 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isWhiteNav
                  ? 'text-white hover:bg-white/15'
                  : 'text-primary/80 hover:text-primary hover:bg-black/5'
              }`}
              onClick={() => {
                setMobileOpen(false);
                openCart();
              }}
            >
              <CartIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-botanical-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* User / Login Icon */}
            <Link
              href="/login"
              aria-label="Account / Login"
              title="Account"
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isWhiteNav
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
                isWhiteNav
                  ? 'text-white hover:bg-white/15'
                  : 'text-primary hover:bg-black/5'
              }`}
            >
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isWhiteNav ? 'bg-white' : 'bg-primary'
                } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isWhiteNav ? 'bg-white' : 'bg-primary'
                } ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isWhiteNav && !searchOpen ? 'bg-white' : 'bg-primary'
                } ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>

          {/* ── SEARCH BAR: Morphs into navbar row + attached dropdown below ── */}
          <SearchBar
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
          />
        </div>
      </header>

      {/* ── BACKDROP OVERLAY (Covers viewport below the navbar when search is open) ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSearchOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}