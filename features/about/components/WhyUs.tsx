'use client';

import React from 'react';

const WhyUs = () => {
    return (
        <section
            aria-label="Mindful Wellness - Why Us"
            className="w-full flex flex-col lg:flex-row overflow-hidden items-center justify-center select-none bg-background"
        >
            {/* ── Media Column (Video Container) - Top on mobile, Right on desktop ── */}
            <div className="w-full lg:w-1/2 relative h-[50vh] sm:h-[65vh] lg:h-[40vw] overflow-hidden order-first lg:order-last">
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full object-center"
                    >
                        <source src="/videos/abt-gveda-2.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* ── Text Column - Bottom on mobile, Left on desktop ── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-6 sm:px-10 md:px-14 lg:px-[5vw] py-12 sm:py-16 lg:py-[5vw] order-last lg:order-first">
                <div className="w-full max-w-xl lg:max-w-[36vw] mx-auto lg:mx-0 flex flex-col gap-4 sm:gap-6 lg:gap-[1.4vw]">
                    {/* Editorial Eyebrow & Heading */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <span className="font-madison italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw]">
                            Mindful Wellness
                        </span>
                        <h2 className="font-antessa uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.1] text-primary">
                            The Art Of Thoughtful Beauty
                        </h2>
                    </div>

                    {/* Paragraph */}
                    <div className="font-primary font-normal text-sm sm:text-base lg:text-[0.9vw] lg:leading-[1.7] text-primary/75 leading-relaxed text-center lg:text-left flex flex-col gap-4 lg:gap-[1vw]">
                        <p>
                            We believe that exceptional skincare and haircare is an art form. At GVEDA, we don&apos;t just formulate products; we curate a standard of living rooted in biological synergy and botanical purity. By seamlessly blending the purest herbal extracts with advanced cosmetic innovation, our entire collection is designed to honour the unique vitality of your skin and hair without compromise.
                        </p>
                        <p>
                            We believe that exceptional skincare and haircare is an art form. At GVEDA, we don&apos;t just formulate products; we curate a standard of living rooted in biological synergy and botanical purity. By seamlessly blending the purest herbal extracts with advanced cosmetic innovation, our entire collection is designed to honour the unique vitality of your skin and hair without compromise.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;