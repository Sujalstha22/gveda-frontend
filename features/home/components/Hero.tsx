'use client';

import React from 'react';
import Image from 'next/image';
// import Button from '@/shared/ui/Button';

export default function Hero() {
    return (
        <section
            className="relative w-full h-screen  flex flex-col justify-end overflow-hidden select-none "
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/about/gveda-main-img.jpeg"
                    alt="Radiant, glowing skin - GVEDA botanical science"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top "
                />
            </div>
        </section>
    );
}
