import React from "react";

interface ParallaxDividerProps {
    eyebrow?: string;
    quote?: string;
    italicWord?: string;
    author?: string;
    className?: string;
}

export default function ParallaxDivider({
    eyebrow = "Botanical Philosophy",
    quote = "Harmonizing ancient botanical science with",
    italicWord = "modern cellular biology.",
    author = "GVEDA Formulations",
    className = "",
}: ParallaxDividerProps) {
    return (
        <section
            aria-label="Botanical Philosophy Statement"
            className={`relative w-full py-20 sm:py-28 md:py-36 lg:py-44 flex items-center justify-center overflow-hidden select-none bg-fixed bg-center bg-cover bg-no-repeat ${className}`}
            style={{
                backgroundImage: "url('/images/home/parallax_image.jpeg')",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Dark luxury tint overlay for high editorial text contrast */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-brightness-75 pointer-events-none"
                aria-hidden="true"
            />

            {/* Subtle top and bottom architectural border lines */}
            <div className="absolute top-0 inset-x-0 h-px bg-white/10" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center">
                {/* Eyebrow */}
                {eyebrow && (
                    <span className="font-primary text-[10px] sm:text-xs lg:text-[0.7vw] font-medium tracking-[0.28em] uppercase text-botanical-gold mb-3 sm:mb-4 block">
                        {eyebrow}
                    </span>
                )}

                {/* Grand Headline with Editorial Cormorant Garamond Accent */}
                <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-snug sm:leading-tight max-w-3xl">
                    {quote}{" "}
                    {italicWord && (
                        <span className="font-editorial italic font-normal text-white">
                            {italicWord}
                        </span>
                    )}
                </h2>

                {/* Divider dot & Author tag */}
                {author && (
                    <div className="mt-5 sm:mt-7 flex items-center gap-3">
                        <span className="w-6 h-px bg-botanical-gold/60" />
                        <span className="font-primary text-[10px] sm:text-[11px] font-light tracking-[0.2em] uppercase text-white/70">
                            {author}
                        </span>
                        <span className="w-6 h-px bg-botanical-gold/60" />
                    </div>
                )}
            </div>
        </section>
    );
}