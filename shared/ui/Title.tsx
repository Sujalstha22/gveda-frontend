import React from "react";

export interface TitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function Title({
  eyebrow,
  title,
  description,
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: TitleProps) {
  return (
    <div
      className={`flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-[3vw] w-full lg:max-w-[55vw] mx-auto ${className}`}
    >
      {eyebrow && (
        <span
          className={`font-great-vibes italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw] ${eyebrowClassName}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading font-medium text-3xl sm:text-4xl md:text-7xl lg:text-[4vw] lg:leading-[1.15] text-accent-gold uppercase ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`font-primary font-normal text-base sm:text-lg lg:text-[1.2vw] lg:leading-[1.65] text-primary/80 w-full max-w-xl lg:max-w-[44vw] mt-3 sm:mt-4 lg:mt-[0.9vw] leading-relaxed ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { Title };
