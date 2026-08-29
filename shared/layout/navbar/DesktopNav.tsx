'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from './navData';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <ul className="hidden lg:flex items-center gap-7 xl:gap-10 list-none m-0 p-0">
      {NAV_LINKS.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              className={[
                'group relative font-primary font-medium text-[0.78rem] xl:text-[0.84rem] tracking-[0.14em] uppercase pb-1.5',
                'transition-colors duration-200 text-primary',
                isActive ? 'text-primary font-semibold' : 'text-primary/75 hover:text-primary',
              ].join(' ')}
            >
              {label}
              <span
                className={[
                  'absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full origin-left bg-primary',
                  'transition-transform duration-250 ease-in-out',
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                ].join(' ')}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
