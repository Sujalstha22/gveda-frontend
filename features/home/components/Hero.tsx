'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/shared/ui/Button';

export default function Hero() {
    return (
        <section
            className="relative w-full h-dvh flex flex-col justify-end overflow-hidden select-none"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/about/gveda-main-img.jpeg"
                    alt="Radiant, glowing skin - GVEDA botanical science"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                />
                <div className="absolute inset-0 w-full h-full bg-linear-to-t from-background/30 to-transparent" />
            </div>

            <div className="relative z-10 w-full px-4 sm:px-8 lg:px-[5vw] pb-12 sm:pb-16 lg:pb-[3.5vw] pt-28 lg:pt-0">
                <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 sm:gap-10 lg:gap-[4vw]">
                    <div className="flex flex-col items-start w-full lg:max-w-[50vw]">
                        <h1 className="font-secondary font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[4.2vw] lg:leading-[1.08] text-primary">
                            Skin that <br /> holds the light.
                        </h1>
                        <Button
                            type="button"
                            size="md"
                            variant="ghost"
                            className="mt-6 lg:mt-[1.5vw]"
                        >
                            Explore More
                        </Button>
                    </div>

                    <div className="w-full lg:max-w-[26vw] flex lg:pb-[1.2vw]">
                        <p className="font-primary font-medium text-lg sm:text-xl md:text-2xl lg:text-[1.4vw] lg:leading-normal text-primary">
                            Science-backed skincare formulated to restore your natural glow.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}