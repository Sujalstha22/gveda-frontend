'use client';

import React, { useRef } from 'react';

const WhyUs = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="w-full flex flex-col lg:flex-row overflow-hidden items-center justify-center select-none bg-background">
            {/* Media Column (Image Container) - Placed ON TOP on mobile, on RIGHT on desktop */}
            <div className="w-full lg:w-1/2 relative h-[45vh] sm:h-[65vh] lg:h-[80vh] overflow-hidden order-first lg:order-last">
                <div
                    ref={imageRef}
                    className="absolute inset-0 w-full h-full z-0 overflow-hidden"
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full object-center"
                    >
                        <source src="/videos/abt-gveda-2.mp4" type="video/mp4" />
                    </video>
                    {/* <Image
                        src="/images/home/abt.jpeg"
                        alt="The Art of Thoughtful Beauty - GVEDA"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center"
                    /> */}
                </div>
            </div>

            {/* Text Column - Placed BELOW image on mobile, on LEFT on desktop */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-6 sm:px-10 md:px-16 lg:px-16 py-10 sm:py-14 lg:py-20 order-last lg:order-first">
                <div className="max-w-[85vw] md:max-w-[70vw] lg:max-w-[38vw] mx-auto lg:mx-0 flex flex-col gap-4 sm:gap-6">
                    {/* Editorial Eyebrow & Heading */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                            Mindful Wellness
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-[3vw] text-primary font-heading font-medium leading-tight">
                            The Art Of Thoughtful Beauty
                        </h2>
                    </div>

                    {/* Paragraph */}
                    <div className="flex flex-col gap-4 text-sm sm:text-base lg:text-[1.1vw] font-normal text-primary/75 leading-relaxed text-center lg:text-left font-primary">
                        <p>
                            We believe that exceptional skincare and haircare is an art form. At GVEDA, we don&apos;t just formulate products; we curate a standard of living rooted in biological synergy and botanical purity. By seamlessly blending the purest herbal extracts with advanced cosmetic innovation, our entire collection is designed to honour the unique vitality of your skin and hair without compromise.
                        </p>
                        {/* <p>
                            Every formula is intentionally developed to elevate your daily routine into a moment of restorative self-care. From sustainably harvested botanicals to soothing sensory textures, our commitment extends beyond aesthetics to deliver lasting cellular rejuvenation, empowering you to embrace your enduring natural glow with confidence.
                        </p> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;