'use client';

import React from 'react';
import Image from 'next/image';

export default function Intro() {
    return (
        <section
            className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between items-center pt-16 sm:pt-24  overflow-hidden select-none "
        >
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <span className="font-primary font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary">
                        Flaunt the
                    </span>
                    <span className="font-editorial italic font-normal text-6xl sm:text-7xl text-accent-gold mt-1 sm:mt-2">
                        glow
                    </span>
                </div>
                <div className="flex flex-col items-center mt-6 sm:mt-8">
                    <span className="font-primary font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary">
                        Forget the
                    </span>
                    <span className="font-editorial italic font-normal text-6xl sm:text-7xl text-accent-gold mt-1 sm:mt-2">
                        flaws.
                    </span>
                </div>
            </div>

            <div className="relative z-0 w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl aspect-16/11 sm:aspect-16/10 mt-6 sm:mt-10 md:mt-14 flex items-end justify-center pointer-events-none">
                <Image
                    src="/images/home/intro.png"
                    alt="Luminous, radiant skin profile - GVEDA"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    className="object-contain object-bottom"
                />
            </div>
        </section>
    );
}