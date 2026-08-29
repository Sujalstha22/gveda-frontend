'use client';

import React from 'react';
import Image from 'next/image';

interface IngredientFeature {
    number: string;
    title: string;
    description: string;
}

const LEFT_FEATURES: IngredientFeature[] = [
    {
        number: '01',
        title: 'Natural ingredients',
        description:
            'We source only the finest botanical extracts, ensuring every drop is packed with vitamins and minerals in their most potent bioactive form.',
    },
    {
        number: '02',
        title: 'Premium quality',
        description:
            'Each formula undergoes rigorous clinical quality control to maintain dermatological purity while staying true to our pure botanical roots.',
    },
];

const RIGHT_FEATURES: IngredientFeature[] = [
    {
        number: '03',
        title: '100% organic',
        description:
            'Our plant botanicals are harvested in sustainable, pesticide-free environments, respecting the earth while providing clean, safe nourishment.',
    },
    {
        number: '04',
        title: 'Clean Beauty',
        description:
            'We avoid toxic fillers, parabens, and synthetic additives, delivering a concentrated experience that visibly restores skin resilience.',
    },
];

export default function Ingredients() {
    return (
        <section
            className="relative w-full py-20 sm:py-24 overflow-hidden select-none "
        >
            <div className="w-full max-w-360 mx-auto px-6 sm:px-10 lg:px-16">

                <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
                    <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                        The Science of Beauty
                    </span>
                    <h2 className=" text-4xl sm:text-5xl  text-primary font-medium ">
                        Our Promise
                    </h2>
                    <p className="font-primary font-normal text-sm sm:text-base text-primary/75 max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                        Rooted in ancient Ayurvedic wisdom and validated by modern clinical research, GVEDA crafts high-performance botanical formulas that nurture, renew, and restore skin health naturally.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-8 items-center">

                    <div className="lg:col-span-4 flex flex-col gap-10 sm:gap-14 lg:gap-20 lg:text-right order-2 lg:order-1">
                        {LEFT_FEATURES.map((item) => (
                            <div key={item.number} className="flex flex-col lg:items-end gap-2 sm:gap-3 group">
                                <span className="font-editorial italic text-2xl sm:text-3xl text-botanical-gold font-normal">
                                    {item.number}
                                </span>
                                <h3 className="font-primary font-medium text-xl sm:text-2xl text-primary">
                                    {item.title}
                                </h3>
                                <p className="font-primary font-normal text-xs sm:text-sm text-primary/70 leading-relaxed max-w-sm lg:ml-auto">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 my-4 lg:my-0">
                        <div className="relative w-72 sm:w-84 md:w-96 lg:w-full max-w-95 aspect-square flex items-center justify-center">
                            <div
                                aria-hidden="true"
                                className="absolute inset-2 sm:inset-4 rounded-full bg-secondary/30 border border-secondary/60 shadow-subtle"
                            />

                            <div className="relative w-[85%] h-[85%] z-10">
                                <Image
                                    src="/images/home/ingredients.png"
                                    alt="GVEDA Nourishing Hair Conditioner - Pure Botanical Science"
                                    fill
                                    sizes="(max-width: 768px) 75vw, 380px"
                                    className="object-contain hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-10 sm:gap-14 lg:gap-20 lg:text-left order-3">
                        {RIGHT_FEATURES.map((item) => (
                            <div key={item.number} className="flex flex-col lg:items-start gap-2 sm:gap-3 group">
                                <span className="font-editorial italic text-2xl sm:text-3xl text-botanical-gold font-normal">
                                    {item.number}
                                </span>
                                <h3 className="font-primary font-medium text-xl sm:text-2xl text-primary">
                                    {item.title}
                                </h3>
                                <p className="font-primary font-normal text-xs sm:text-sm text-primary/70 leading-relaxed max-w-sm">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}