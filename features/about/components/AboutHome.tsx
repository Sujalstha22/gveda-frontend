'use client';

import React, { useRef } from 'react';

const AboutHome = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="w-full flex flex-col lg:flex-row overflow-hidden items-center justify-center select-none bg-background">
            {/* Media Column (Image Container) */}
            <div className="w-full lg:w-1/2 relative h-[45vh] sm:h-[65vh] lg:h-[80vh] overflow-hidden">
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
                        <source src="/videos/abt-gveda-1.mp4" type="video/mp4" />
                    </video>
                    {/* <Image
                        src="/images/home/abt.jpeg"
                        alt="GVEDA Botanical Science Formulation"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center"
                    /> */}
                </div>
            </div>

            {/* Text Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-6 sm:px-10 md:px-16 lg:px-16 py-10 sm:py-14 lg:py-20">
                <div className="max-w-[85vw] md:max-w-[70vw] lg:max-w-[38vw] mx-auto lg:mx-0 flex flex-col gap-4 sm:gap-6">
                    {/* Editorial Eyebrow & Heading */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                            Botanical Formulations
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-[3vw] text-primary font-heading font-medium leading-tight">
                            Formulated With Scientific Purpose
                        </h2>
                    </div>

                    {/* Paragraph */}
                    <div className="flex flex-col gap-4 text-sm sm:text-base lg:text-[1.1vw] font-normal text-primary/75 leading-relaxed text-center lg:text-left font-primary">
                        <p>
                            We stripped away harsh chemicals and artificial fillers to embrace the raw, restorative intelligence of nature. At GVEDA, our formulations are a meticulous fusion of active biocompatible botanicals, cold-pressed plant oils, and nutrient-dense hydration. Every drop is crafted to heal and protect, bringing uncompromising, science-backed nourishment directly into your daily ritual.
                        </p>
                        {/* <p>
                            Rooted in clinical precision and mindful craftsmanship, each remedy works in harmony with the skin and hair barrier to promote strength, elasticity, and radiant vitality. We honor your personal wellness journey by ensuring every botanical touch leaves you visibly renewed day after day.
                        </p> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHome;