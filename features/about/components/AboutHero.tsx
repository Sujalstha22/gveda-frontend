"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Title from '@/shared/ui/Title';

const AboutHero = () => {
    return (
        <section
            aria-label="About GVEDA Hero"
            className="relative w-full h-screen flex flex-col justify-end overflow-hidden select-none"
        >
            <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/about/abt-gveda-2.jpeg"
                    alt="Radiant, glowing skin - GVEDA botanical science"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                />
                {/* Subtle Light Overlay */}
                <div className="absolute inset-0 w-full h-full bg-black/15 z-[1]" />
                <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black/80  to-black/40 z-[2]" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-8 lg:px-[5vw] pb-12 sm:pb-16 lg:pb-[4vw]"
            >
                <Title
                    eyebrow="Our Philosophy"
                    title="Rooted in Purity"
                    description="Discover the quiet intersection where sacred botanical wisdom meets modern dermatological science."
                    titleClassName="text-white"
                    descriptionClassName="text-white/85"
                    className="mb-0"
                />
            </motion.div>
        </section>
    );
};

export default AboutHero;
