'use client';

import React from 'react';
import AnimatedText from './AnimatedText';

type ButtonVariant = 'primary' | 'ghost' | 'secondary' | 'secondary-outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '0.5rem 1.25rem', fontSize: '0.75rem' },
  md: { padding: '0.75rem 2rem',   fontSize: '0.8125rem' },
  lg: { padding: '0.875rem 2.5rem', fontSize: '0.9375rem' },
};

const baseStyles: React.CSSProperties = {
  display:        'inline-flex',
  alignItems:     'center',
  justifyContent: 'center',
  gap:            '0.5rem',
  fontFamily:     'var(--font-primary), "Montserrat", system-ui, sans-serif',
  fontWeight:     600,
  letterSpacing:  '0.12em',
  textTransform:  'uppercase',
  borderRadius:   '9999px',
  cursor:         'pointer',
  transition:     'background 0.22s ease, border-color 0.22s ease, color 0.22s ease',
  outline:        'none',
  textDecoration: 'none',
  whiteSpace:     'nowrap',
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background:  'var(--rich-black)',
    color:       'var(--warm-ivory)',
    border:      '1px solid var(--rich-black)',
  },
  ghost: {
    background:  'transparent',
    color:       'var(--rich-black)',
    border:      '1px solid var(--rich-black)',
  },
  secondary: {
    background:  'var(--botanical-gold)',
    color:       'var(--rich-black)',
    border:      '1px solid var(--botanical-gold)',
  },
  'secondary-outline': {
    background:  'transparent',
    color:       'var(--botanical-gold)',
    border:      '1px solid var(--botanical-gold)',
  },
};

const variantHover: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background:   '#2B2B2B',
    borderColor:  '#2B2B2B',
  },
  ghost: {
    background:  'var(--rich-black)',
    color:       'var(--warm-ivory)',
  },
  secondary: {
    background:  '#A88D6D',
    borderColor: '#A88D6D',
  },
  'secondary-outline': {
    background:  'var(--botanical-gold)',
    color:       'var(--rich-black)',
    borderColor: 'var(--botanical-gold)',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  style,
  disabled,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) setHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) setHovered(false);
    onMouseLeave?.(e);
  };

  const computedStyle: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(hovered && !disabled ? variantHover[variant] : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    ...style,
  };

  const isTextContent = typeof children === 'string' || typeof children === 'number';

  return (
    <button
      {...props}
      disabled={disabled}
      style={computedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && iconPosition === 'left' && icon}
      {isTextContent ? (
        <AnimatedText isHovered={hovered && !disabled}>
          {children}
        </AnimatedText>
      ) : (
        children
      )}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}