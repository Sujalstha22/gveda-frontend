'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from './navData';

import Button from '@/shared/ui/Button';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const asideRef = useRef<HTMLElement>(null);

  /* Lock body scroll when mobile drawer is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* Close drawer on Escape key */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  /* Close drawer on route change */
  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [pathname, open, onClose]);

  return (
    <>
      {/* ── Backdrop Overlay ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-1035 bg-black/40 backdrop-blur-xs lg:hidden',
          'transition-opacity duration-400 ease-out',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* ── Slide-out Drawer ── */}
      <aside
        ref={asideRef}
        aria-label="Mobile Navigation Menu"
        aria-hidden={!open}
        className={[
          'fixed top-0 right-0 bottom-0 z-1040 lg:hidden',
          'w-[85vw] max-w-80 h-full flex flex-col justify-between shadow-xl',
          'border-l border-border transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'bg-warm-ivory text-primary',
          open ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none',
        ].join(' ')}
        style={{
          background: 'rgba(247, 245, 241, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="pt-24 px-6 sm:px-8 pb-8 flex-1 overflow-y-auto flex flex-col justify-between">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map(({ label, href }, idx) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  style={{
                    transitionDelay: open ? `${idx * 50 + 80}ms` : '0ms',
                  }}
                  className={[
                    'group flex items-center justify-between py-3.5 text-base font-primary tracking-normal capitalize font-medium border-b border-border/40',
                    'transition-all duration-300 ease-out transform text-primary',
                    open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
                    isActive ? 'font-bold text-primary' : 'text-primary/75 hover:text-primary hover:translate-x-2',
                  ].join(' ')}
                >
                  <span>{label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-botanical-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-border/40 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 w-full">
              <Link href="/cart" onClick={onClose} className="w-full">
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full tracking-widest text-xs py-3"
                >
                  CART
                </Button>
              </Link>
              <Link href="/login" onClick={onClose} className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full tracking-widest text-xs py-3"
                >
                  LOGIN
                </Button>
              </Link>
            </div>
            <p className="font-primary text-xs text-muted tracking-wider uppercase text-center mt-1">
              Botanical Science for Modern Skin
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
