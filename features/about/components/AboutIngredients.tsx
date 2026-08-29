'use client';

import React from 'react';

interface PillarItem {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const pillars: PillarItem[] = [
    {
        id: 1,
        title: 'Cold-Pressed Extraction',
        description: 'Heat-free mechanical extraction preserves vital living phytonutrients, vitamins, and antioxidants in their most bio-active state.',
        icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        ),
    },
    {
        id: 2,
        title: 'Bio-Active Ingredients',
        description: 'Pure plant lipids and biocompatible botanical actives that nourish your skin’s natural lipid barrier without disruption.',
        icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
            </svg>
        ),
    },
    {
        id: 3,
        title: 'Herbal Synergy',
        description: 'Centuries of traditional botanical alchemy combined with modern dermatological science for profound cellular health.',
        icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.06 9.06 0 0112 15a9.06 9.06 0 01-6.23-.693L4.2 13.9M19.8 15.3a2.25 2.25 0 01-1.07 1.916l-4.5 2.7a2.25 2.25 0 01-2.46 0l-4.5-2.7a2.25 2.25 0 01-1.07-1.916V14.5" />
            </svg>
        ),
    },
    {
        id: 4,
        title: 'Uncompromised Purity',
        description: '100% cruelty-free and sustainably sourced—formulated without sulfates, parabens, synthetic dyes, or harsh artificial fillers.',
        icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        ),
    },
];

const AboutIngredients = () => {
    return (
        <section className="w-full py-20 sm:py-24 px-6 sm:px-12 md:px-16 select-none  text-primary">
            <div className=" flex flex-col items-center">
                {/* ── Section Header ── */}
                {/* <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                    <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1 block">
                        Botanical Science
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight">
                        The GVEDA Difference
                    </h2>
                    <p className="font-primary font-normal text-xs sm:text-sm md:text-base text-primary mt-4 leading-relaxed max-w-2xl mx-auto">
                        Discover the foundational pillars that define every GVEDA formulation—from biocompatible cold-pressing to verified botanical science.
                    </p>
                </div> */}

                {/* ── 4-Column Feature Grid ── */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.id}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Icon Container */}
                            <div className="mb-6 p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-accent-gold/50 group-hover:bg-accent-gold/10 transition-all duration-300">
                                {pillar.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-lg sm:text-xl text-primary font-medium mb-3 tracking-wide">
                                {pillar.title}
                            </h3>

                            {/* Description */}
                            <p className="font-primary font-light text-xs sm:text-sm text-primary leading-relaxed max-w-xs">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutIngredients;