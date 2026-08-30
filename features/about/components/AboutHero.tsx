import React from 'react';
import Image from 'next/image';

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
                <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-primary font-normal mb-1 lg:mb-[0.3vw]">
                    Our Philosophy
                </span>

                <h1 className="font-primary font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[3.2vw] lg:leading-[1.1] text-primary">
                    Rooted in Purity
                </h1>

                <p className="font-primary font-normal text-sm sm:text-base lg:text-[0.95vw] lg:leading-[1.6] text-primary/75 w-full max-w-lg lg:max-w-[42vw] mt-3 sm:mt-4 lg:mt-[0.8vw] leading-relaxed">
                    Discover the quiet intersection where sacred botanical wisdom meets modern dermatological science.
                </p>
            </div>
        </section>
    );
};

export default AboutHero;
