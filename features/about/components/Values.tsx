'use client';

import React from 'react';
import Image from 'next/image';
import Title from '@/shared/ui/Title';

interface ValueItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

const values: ValueItem[] = [
    {
        id: 1,
        title: 'Botanical Integrity',
        description: 'Ethically harvested whole-plant extracts cold-pressed to preserve cellular vitality.',
        image: '/images/home/our-story.jpg',
    },
    {
        id: 2,
        title: 'Clinical Biocompatibility',
        description: 'Formulations engineered in molecular harmony with the skin’s delicate lipid barrier.',
        image: '/images/contact/gveda-c-2.jpeg',
    },
    {
        id: 3,
        title: 'Mindful Daily Rituals',
        description: 'Transforming everyday hair and skin care into an intentional act of restorative self-care.',
        image: '/images/home/hero-1.jpeg',
    },
];

const Values = () => {
    return (
        <section className="w-full py-20 sm:pb-28  px-6 sm:px-12 md:px-16 select-none bg-background">
            <div className=" flex flex-col items-center">
                {/* ── Section Header matching brand style ── */}
                <Title
                    eyebrow="Our Guiding Principles"
                    title="Pillars of Botanical Living"
                    description="Mindfully crafted values guiding our formulations, ethical sourcing, and holistic skin wellness."
                    className="mb-14 sm:mb-20 max-w-3xl"
                />

                {/* ── 3-Column Image & Editorial Caption Grid ── */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                    {values.map((item) => (
                        <div key={item.id} className="flex flex-col items-center text-center group">
                            {/* Image Container */}
                            <div className="relative aspect-4/5 sm:aspect-square w-full overflow-hidden rounded-2xl border border-secondary/40 group bg-primary-dark/10">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Editorial Caption */}
                            <h3 className="font-heading uppercase font-medium text-xl sm:text-2xl lg:text-[1.5vw] text-primary mt-6 mb-2 group-hover:text-accent-gold transition-colors">
                                {item.title}
                            </h3>

                            {/* Subtitle */}
                            <p className="font-primary font-light text-xs sm:text-sm text-primary/70 max-w-xs leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;