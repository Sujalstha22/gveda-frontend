'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/shared/ui/Button';

export default function OurStory() {
    return (
        <section
            aria-label="Our Story"
            className="relative bg-secondary/20 w-full  overflow-hidden select-none"
        >
            <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-[5vw] items-center">

                    {/* ── Left Visual ── */}
                    <div className="relative w-full aspect-4/3 sm:aspect-16/11 lg:aspect-square rounded-2xl lg:rounded-[1vw] overflow-hidden group shadow-2xs">
                        <Image
                            src="/images/home/abt2.png"
                            alt="GVEDA botanical formulation and laboratory extraction"
                            fill
                            sizes="(max-width: 1024px) 100vw, 45vw"
                            className="object-cover object-center "
                        />
                    </div>

                    {/* ── Right Content ── */}
                    <div className="flex flex-col items-start justify-center w-full max-w-xl lg:max-w-none lg:pr-[2vw]">
                        <span className="font-madison italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw]">
                            Discover
                        </span>

                        <h2 className="font-antessa uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.1] text-primary mb-6 sm:mb-8 lg:mb-[1.8vw]">
                            Our Story
                        </h2>

                        <div className="space-y-4 lg:space-y-[1vw] font-primary font-normal text-sm sm:text-base lg:text-[0.9vw] lg:leading-[1.7] text-primary/80 mb-8 sm:mb-10 lg:mb-[2.2vw]">
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

                        <Link href="/about">
                            <Button
                                variant="ghost"
                                size="md"
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