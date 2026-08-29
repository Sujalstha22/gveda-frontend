import React from 'react';

interface NavMenuButtonProps {
  open: boolean;
  onToggle: () => void;
}

export default function NavMenuButton({ open, onToggle }: NavMenuButtonProps) {
  return (
    <button
      type="button"
      className="flex lg:hidden items-center justify-center cursor-pointer bg-transparent border-0 p-2 sm:p-2.5 rounded-full text-primary hover:bg-black/5 transition-colors duration-200 focus:outline-none"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onToggle}
    >
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
        <rect
          x="0"
          y={open ? '7' : '0'}
          width="22"
          height="2"
          rx="1"
          fill="currentColor"
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: open ? 'rotate(45deg)' : 'none',
            transformOrigin: '50% 50%',
          }}
        />
        <rect
          x="0"
          y="7"
          width="22"
          height="2"
          rx="1"
          fill="currentColor"
          style={{
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : 'scaleX(1)',
            transformOrigin: '50% 50%',
          }}
        />
        <rect
          x="0"
          y={open ? '7' : '14'}
          width="22"
          height="2"
          rx="1"
          fill="currentColor"
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: open ? 'rotate(-45deg)' : 'none',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
    </button>
  );
}
