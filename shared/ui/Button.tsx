'use client';

import React from 'react';
import AnimatedText from './AnimatedText';

type ButtonVariant = 'primary' | 'ghost' | 'secondary' | 'secondary-outline';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-rich-black text-warm-ivory border border-rich-black hover:bg-[#2B2B2B] hover:border-[#2B2B2B]',
  ghost:
    'bg-transparent text-white border border-rich-black hover:bg-warm-ivory hover:text-rich-black',
  secondary:
    'bg-botanical-gold text-rich-black border border-botanical-gold hover:bg-[#A88D6D] hover:border-[#A88D6D]',
  'secondary-outline':
    'bg-transparent text-botanical-gold border border-botanical-gold hover:bg-botanical-gold hover:text-rich-black',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5 lg:px-[1.1vw] lg:py-[0.45vw] lg:text-[0.7vw] lg:gap-[0.35vw] [&>svg]:w-3 [&>svg]:h-3 lg:[&>svg]:w-[0.75vw] lg:[&>svg]:h-[0.75vw]',
  md: 'px-6 sm:px-8 py-2.5 sm:py-3 text-[13px] gap-2 lg:px-[1.8vw] lg:py-[0.7vw] lg:text-[0.8vw] lg:gap-[0.45vw] [&>svg]:w-3.5 [&>svg]:h-3.5 lg:[&>svg]:w-[0.9vw] lg:[&>svg]:h-[0.9vw]',
  lg: 'px-8 sm:px-10 py-3 sm:py-3.5 text-sm gap-2.5 lg:px-[2.3vw] lg:py-[0.85vw] lg:text-[0.9vw] lg:gap-[0.55vw] [&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-[1vw] lg:[&>svg]:h-[1vw]',
};

const hoverTextClasses: Record<ButtonVariant, string> = {
  primary: 'text-warm-ivory',
  ghost: 'text-black',
  secondary: 'text-rich-black',
  'secondary-outline': 'text-rich-black',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
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

  const isTextContent = typeof children === 'string' || typeof children === 'number';

  return (
    <button
      {...props}
      disabled={disabled}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center font-primary font-semibold tracking-[0.12em] uppercase rounded-full cursor-pointer transition-[background-color,border-color,color] duration-200 ease-out outline-none no-underline whitespace-nowrap select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && iconPosition === 'left' && icon}
      {isTextContent ? (
        <AnimatedText
          isHovered={hovered && !disabled}
          hoverClassName={hoverTextClasses[variant]}
        >
          {children}
        </AnimatedText>
      ) : (
        children
      )}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}