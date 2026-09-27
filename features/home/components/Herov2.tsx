"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePreloader } from "@/shared/context/PreloaderContext";

interface Herov2Props {
    imageSrc?: string;
    imageAlt?: string;
    title?: React.ReactNode;
    description?: string;
}

export default function Herov2({
    imageSrc = "/images/home/herobg.png",
    imageAlt = "Radiant, glowing skin - GVEDA botanical science",
    title = (
        <>
            Rediscover <br /> Your Natural Glow
        </>
    ),
    description = "Science-backed botanical formulations engineered to restore and protect your natural barrier.",
}: Herov2Props) {
    const { heroReady, setHeroImageLoaded } = usePreloader();
    const pathname = usePathname();
    const [isLoaded, setIsLoaded] = useState(false);

    // Preloader synchronization: notify context that hero image is ready
    useEffect(() => {
        if (typeof window === "undefined") return;
        let active = true;
        const img = new window.Image();
        const onLoad = () => {
            if (!active) return;
            setIsLoaded(true);
            setHeroImageLoaded(true);
        };
        img.onload = onLoad;
        img.src = imageSrc;
        if (img.complete) {
            requestAnimationFrame(onLoad);
        }
        return () => {
            active = false;
            img.onload = null;
        };
    }, [imageSrc, setHeroImageLoaded]);

    const handleImageLoad = () => {
        setIsLoaded(true);
        setHeroImageLoaded(true);
    };

    const isReady = heroReady || isLoaded;

    return (
        <section className="relative w-full h-dvh min-h-[560px] md:min-h-[640px] flex flex-col justify-end overflow-hidden select-none text-white">
            {/* ── Static Hero Image with Gentle Scale-In Animation ── */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div
                    className={`relative w-full h-full transform transition-transform duration-[8000ms] ease-out ${isReady ? "scale-100" : "scale-105"
                        }`}
                >
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center brightness-[0.88]"
                        onLoad={handleImageLoad}
                    />
                </div>

                {/* Subtle architectural vertical gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 z-10 pointer-events-none" />
            </div>

            {/* ── Editorial Hero Content (Aligned with Navbar) ── */}
            <div className="relative z-20 w-full px-4 sm:px-8 lg:px-[5vw] pb-12 sm:pb-16 lg:pb-[3.5vw] pt-28 lg:pt-0">
                <div className="w-full flex flex-col items-start max-w-3xl lg:max-w-[55vw]">
                    {/* Main Headline with Line Break */}
                    <div className="overflow-hidden py-1">
                        <motion.h1
                            key={`hero-title-${pathname}`}
                            initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                            animate={
                                isReady
                                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                                    : { opacity: 0, y: 35, filter: "blur(6px)" }
                            }
                            transition={{
                                duration: 0.85,
                                delay: 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="font-heading font-medium text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-[4.5vw] text-white tracking-tight leading-[1.08]"
                        >
                            {title}
                        </motion.h1>
                    </div>

                    {/* Subtitle / Description placed directly below title */}
                    <motion.div
                        key={`hero-desc-${pathname}`}
                        initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                        animate={
                            isReady
                                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                                : { opacity: 0, y: 25, filter: "blur(4px)" }
                        }
                        transition={{
                            duration: 0.85,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-4 sm:mt-6 max-w-xl lg:max-w-2xl"
                    >
                        <p className="font-primary font-normal text-sm sm:text-base md:text-lg lg:text-[1.15vw] text-white/85 leading-relaxed">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
