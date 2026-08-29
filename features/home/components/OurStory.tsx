'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/shared/ui/Button';

export default function OurStory() {
    return (
        <section
            aria-label="Our Story"
            className="relative  w-full pt-16 overflow-hidden"
        >
            <div className="w-full px-6 sm:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">

                    <div className="relative w-full aspect-4/3 sm:aspect-16/11 lg:aspect-4/4 rounded-lg overflow-hidden group ">
                        <Image
                            src="/images/home/abt2.png"
                            alt="GVEDA botanical formulation and laboratory extraction"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-col items-start justify-center max-w-xl">
                        <span className="font-editorial italic text-2xl sm:text-3xl text-botanical-gold font-normal mb-1">
                            Discover
                        </span>

                        <h2 className="font-primary font-medium text-3xl sm:text-4xl md:text-5xl text-primary mb-6 sm:mb-8">
                            Our Story
                        </h2>

                        <div className="space-y-4 font-primary font-normal text-base sm:text-md text-primary/80 mb-8 sm:mb-10">
                            <p>
                                Born from a reverence for ancient botanical remedies and the
                                precision of modern dermatology, GVEDA blends the purity of
                                organic botanicals with clinically validated active science. Every
                                formula is thoughtfully developed to restore skin barrier health,
                                awaken radiance, and make your daily skincare ritual personal,
                                calming, and transformative.
                            </p>
                            <p>
                                Through cold-extraction techniques and clean formulation standards,
                                we preserve the potent vitality of bioactive plant nutrients without
                                unnecessary additives or harsh chemicals.
                            </p>
                        </div>

                        <Link href="/our-story">
                            <Button
                                variant="ghost"
                                size="md"
                                className="px-8 sm:px-10 py-3 text-xs sm:text-sm font-primary font-medium tracking-[0.14em] uppercase rounded-full hover:shadow-subtle"
                            >
                                Know More
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}