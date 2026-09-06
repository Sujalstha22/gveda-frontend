import React from 'react';
import Image from 'next/image';
import Title from '@/shared/ui/Title';

const AboutHero = () => {
    return (
        <section
            aria-label="About GVEDA Hero"
            className="relative w-full h-screen flex flex-col justify-end overflow-hidden select-none"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/about/abt-gveda-2.jpeg"
                    alt="Radiant, glowing skin - GVEDA botanical science"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                />
                <div className="absolute inset-0 w-full h-full bg-linear-to-t from-background/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-8 lg:px-[5vw] pb-12 sm:pb-16 lg:pb-[4vw]">
                <Title
                    eyebrow="Our Philosophy"
                    title="Rooted in Purity"
                    description="Discover the quiet intersection where sacred botanical wisdom meets modern dermatological science."
                    className="mb-0"
                />
            </div>
        </section>
    );
};

export default AboutHero;
