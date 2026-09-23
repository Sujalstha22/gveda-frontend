"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutImage() {
    const reduceMotion = useReducedMotion();

    return (
        <div
            aria-label="Botanical Dual Product Showcase"
            className="relative w-full h-[52vh] sm:h-[58vh] lg:h-[62vh] min-h-[460px] max-h-[640px] bg-transparent overflow-visible select-none flex items-center justify-center py-4"
        >
            <div className="relative w-[340px] min-[400px]:w-[380px] sm:w-[580px] md:w-[680px] lg:w-[740px] h-[400px] sm:h-[460px] md:h-[500px] flex items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.85,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute left-[5%] sm:left-[8%] md:left-[10%] bottom-[8px] sm:bottom-[15px] w-[140px] sm:w-[210px] md:w-[250px] lg:w-[270px] h-[65px] sm:h-[95px] md:h-[115px] lg:h-[125px] z-10 pointer-events-none drop-shadow-[0_16px_22px_rgba(0,0,0,0.14)]"
                >
                    <Image
                        src="/images/home/abtsection/stone1.png"
                        alt="Natural Stone"
                        fill
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 250px, 270px"
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* ── 2. STONE 2 (Right Stone Pedestal - Supporting Right Bottle) ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.85,
                        delay: 0.15,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute right-[6%] sm:right-[10%] md:right-[12%] bottom-[12px] sm:bottom-[20px] w-[160px] sm:w-[240px] md:w-[280px] lg:w-[310px] h-[75px] sm:h-[110px] md:h-[130px] lg:h-[145px] z-10 pointer-events-none drop-shadow-[0_20px_26px_rgba(0,0,0,0.16)] -rotate-3"
                >
                    <Image
                        src="/images/home/abtsection/stone2.png"
                        alt="Natural Stone"
                        fill
                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 280px, 310px"
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* ── 3. BOTTLE 1 (Left: Aqua Fresh Hand Wash - Standing Upright at Left Center) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 35, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 65, scale: 1.2 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.9,
                        delay: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group/left-bottle absolute left-[16%] sm:left-[30%] md:left-[30%] bottom-[32px] sm:bottom-[45px] md:bottom-[50px] w-[130px] sm:w-[190px] md:w-[225px] lg:w-[245px] h-[210px] sm:h-[300px] md:h-[355px] lg:h-[390px] z-30 cursor-pointer"
                >

                    <div className="relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-out group-hover/left-bottle:scale-105">
                        <Image
                            src="/images/home/abtsection/pdt1.png"
                            alt="Aqua Fresh Hand Wash"
                            fill
                            sizes="(max-width: 640px) 130px, (max-width: 1024px) 225px, 245px"
                            className="object-contain"
                            priority
                        />
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40, x: 0, scale: 1.2 }}
                    whileInView={{ opacity: 1, y: 50, x: 70, scale: 1.4 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.9,
                        delay: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group/right-bottle absolute right-[22%] sm:right-[26%] md:right-[28%] bottom-[75px] sm:bottom-[115px] md:bottom-[130px] w-[135px] sm:w-[200px] md:w-[235px] lg:w-[255px] h-[220px] sm:h-[315px] md:h-[370px] lg:h-[405px] z-20 cursor-pointer"
                >
                    <div className="relative w-full h-full drop-shadow-[0_18px_26px_rgba(0,0,0,0.24)] transition-transform duration-500 ease-out group-hover/right-bottle:scale-105">
                        <Image
                            src="/images/home/abtsection/pdt2.png"
                            alt="Aloe Shower Gel"
                            fill
                            sizes="(max-width: 640px) 135px, (max-width: 1024px) 235px, 255px"
                            className="object-contain"
                            priority
                        />
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
