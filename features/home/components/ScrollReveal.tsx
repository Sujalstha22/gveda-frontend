'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealSlide {
    id: string | number;
    title: string;
    titleAccent?: string;
    subtitle?: string;
    description: string;
    image: string;
    tag?: string;
}

interface ScrollRevealProps {
    slides?: ScrollRevealSlide[];
    blindCount?: number;
    className?: string;
}

const DEFAULT_SLIDES: ScrollRevealSlide[] = [
    {
        id: 1,
        title: 'Botanical',
        titleAccent: 'Purity',
        subtitle: 'Cold-Extracted Bioactives',
        description:
            'Harvested at peak biological potency, each botanical compound is isolated through low-temperature extraction to preserve vital cellular energy.',
        image: '/images/home/process-4.jpeg',
        tag: 'Extraction & Potency',
    },
    {
        id: 2,
        title: 'Clinical',
        titleAccent: 'Precision',
        subtitle: 'Cellular Barrier Defense',
        description:
            'Synergistic ceramide complexes and active peptides penetrate deep into the stratum corneum to reinforce long-term hydration and structural integrity.',
        image: '/images/home/process-5.jpeg',
        tag: 'Formulation & Science',
    },
    {
        id: 3,
        title: 'Living',
        titleAccent: 'Radiance',
        subtitle: 'The Daily Transformation',
        description:
            'An understated sensory ritual that leaves the skin balanced, luminous, and deeply replenished without residual weight or artificial finish.',
        image: '/images/home/process-3.jpeg',
        tag: 'Results & Renewal',
    },
];

export default function ScrollReveal({
    slides = DEFAULT_SLIDES,
    blindCount = 28,
    className = '',
}: ScrollRevealProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
        width: 100,
        height: 56.25, // default 16:9 ratio
    });

    useEffect(() => {
        const stageEl = stageRef.current;
        if (!stageEl) return;

        let masterTimeline: gsap.core.Timeline | null = null;
        let progressTrigger: ScrollTrigger | null = null;

        const updateAndBuild = () => {
            const width = window.innerWidth || 1;
            const height = window.innerHeight || 1;
            const vbWidth = 100;
            const vbHeight = (height / width) * 100;

            setDimensions({ width: vbWidth, height: vbHeight });

            // Generate blinds rectangles inside SVG group for slides >= 1
            const h = vbHeight / blindCount;
            const allBlinds: Record<number, Array<{ top: SVGRectElement; bottom: SVGRectElement; y: number; h: number }>> = {};

            slides.forEach((_, slideIdx) => {
                if (slideIdx === 0) return; // Slide 0 is the base visible photo

                const g = document.getElementById(`blinds-${slideIdx}`);
                if (!g) return;
                g.innerHTML = '';

                const blinds: Array<{ top: SVGRectElement; bottom: SVGRectElement; y: number; h: number }> = [];
                let currentY = 0;

                for (let i = 0; i < blindCount; i++) {
                    const centerY = vbHeight - (currentY + h / 2);
                    const rectTop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    const rectBottom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

                    [rectTop, rectBottom].forEach((r) => {
                        r.setAttribute('x', '0');
                        r.setAttribute('width', vbWidth.toString());
                        r.setAttribute('height', '0');
                        r.setAttribute('fill', 'white');
                        r.setAttribute('shape-rendering', 'crispEdges');
                    });

                    rectTop.setAttribute('y', centerY.toString());
                    rectBottom.setAttribute('y', centerY.toString());

                    g.appendChild(rectTop);
                    g.appendChild(rectBottom);

                    blinds.push({
                        top: rectTop,
                        bottom: rectBottom,
                        y: centerY,
                        h: h / 2,
                    });
                    currentY += h;
                }

                allBlinds[slideIdx] = blinds;
            });

            // Clear previous timelines
            if (masterTimeline) masterTimeline.kill();
            if (progressTrigger) progressTrigger.kill();

            const textElements = stageEl.querySelectorAll<HTMLElement>('.scroll-reveal-txt');

            // Reset initial text positions
            textElements?.forEach((el, idx) => {
                gsap.set(el, {
                    clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                    y: idx === 0 ? 0 : 40,
                });
            });

            // Create Master ScrollTrigger timeline
            masterTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: stageEl,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Build transitions between slides (0 -> 1, 1 -> 2, etc.)
            for (let i = 1; i < slides.length; i++) {
                const prevText = textElements?.[i - 1];
                const currText = textElements?.[i];
                const currBlinds = allBlinds[i];

                // 1. Animate previous text OUT
                if (prevText) {
                    masterTimeline.to(prevText, {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        y: -30,
                        duration: 1,
                        ease: 'power2.inOut',
                    });
                }

                // 2. Open current slide blinds (reveals new photo)
                if (currBlinds && currBlinds.length > 0) {
                    masterTimeline.to(
                        currBlinds.flatMap((b) => [b.top, b.bottom]),
                        {
                            attr: {
                                y: (idx) => {
                                    const b = currBlinds[Math.floor(idx / 2)];
                                    return idx % 2 === 0 ? b.y - b.h : b.y;
                                },
                                height: (idx) => {
                                    const b = currBlinds[Math.floor(idx / 2)];
                                    return b.h + 0.01;
                                },
                            },
                            duration: 1.6,
                            ease: 'power3.out',
                            stagger: {
                                each: 0.02,
                                from: 'start',
                            },
                        },
                        '-=0.6'
                    );
                }

                // 3. Animate current text IN
                if (currText) {
                    masterTimeline.to(
                        currText,
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            y: 0,
                            duration: 1.4,
                            ease: 'expo.out',
                        },
                        '-=0.4'
                    );
                }

                // Hold on current slide before next transition if not the last
                if (i < slides.length - 1) {
                    masterTimeline.to({}, { duration: 0.6 });
                }
            }

            // Segmented Progress Bar Trigger
            const progressFills = stageEl.querySelectorAll<HTMLElement>('.progress-segment-fill');
            if (progressFills && progressFills.length > 0) {
                progressTrigger = ScrollTrigger.create({
                    trigger: stageEl,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const totalSteps = progressFills.length;
                        progressFills.forEach((fill, i) => {
                            let p = (progress - i / totalSteps) * totalSteps;
                            p = Math.max(0, Math.min(1, p));
                            fill.style.width = `${p * 100}%`;
                        });
                    },
                });
            }
        };

        updateAndBuild();

        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateAndBuild, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (masterTimeline) masterTimeline.kill();
            if (progressTrigger) progressTrigger.kill();
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === stageEl) st.kill();
            });
        };
    }, [slides, blindCount]);

    const totalHeightVh = slides.length * 100;

    return (
        <section
            ref={stageRef}
            aria-label="SVG Mask Scroll Reveal"
            className={`relative w-full select-none text-white ${className}`}
            style={{ height: `${totalHeightVh}vh` }}
        >
            {/* Hidden preloader for Next.js image optimization */}
            <div className="hidden" aria-hidden="true">
                {slides.map((slide) => (
                    <Image
                        key={slide.id}
                        src={slide.image}
                        alt={slide.title}
                        width={100}
                        height={100}
                        priority
                    />
                ))}
            </div>

            {/* Sticky Fullscreen Stage */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {/* SVG Layers */}
                {slides.map((slide, index) => (
                    <svg
                        key={slide.id}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                        preserveAspectRatio="none"
                    >
                        {index > 0 && (
                            <defs>
                                <mask id={`mask-${index}`} maskUnits="userSpaceOnUse">
                                    <rect
                                        x="0"
                                        y="0"
                                        width={dimensions.width}
                                        height={dimensions.height}
                                        fill="black"
                                    />
                                    <g id={`blinds-${index}`} />
                                </mask>
                            </defs>
                        )}
                        <image
                            href={slide.image}
                            x="0"
                            y="0"
                            width={dimensions.width}
                            height={dimensions.height}
                            preserveAspectRatio="xMidYMid slice"
                            mask={index > 0 ? `url(#mask-${index})` : undefined}
                            className="w-full h-full   transition-all duration-300"
                        />
                    </svg>
                ))}

                {/* Dark Vignette Overlay for maximum editorial readability */}
                {/* <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-radial-[circle_at_30%_50%]_from-black/40_via-black/20_to-black/60"
                /> */}

                {/* Editorial Text Layer */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="scroll-reveal-txt absolute max-w-2xl text-white"
                            style={{
                                clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                                transform: index === 0 ? 'translateY(0px)' : 'translateY(40px)',
                            }}
                        >
                            {slide.tag && (
                                <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1 block">
                                    {slide.tag}
                                </span>
                            )}

                            <h2 className="text-4xl sm:text-5xl text-primary font-medium">
                                {slide.title}
                                {slide.titleAccent && (
                                    <>
                                        {' '}
                                        <span className="">
                                            {slide.titleAccent}
                                        </span>
                                    </>
                                )}
                            </h2>

                            {/* {slide.subtitle && (
                                <h3 className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white/80 mt-2">
                                    {slide.subtitle}
                                </h3>
                            )} */}

                            <p className="font-primary font-normal text-sm sm:text-base text-primary/75 max-w-2xl mt-3 sm:mt-4 leading-relaxed">
                                {slide.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Segmented Progress Bar */}
                <div className="absolute bottom-8 sm:bottom-12 left-0 w-full px-6 sm:px-12 md:px-20 lg:px-28 z-20">
                    <div className="flex items-center gap-3 sm:gap-4 max-w-full">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className="flex-1 h-0.5 bg-white overflow-hidden relative rounded-full"
                            >
                                <div
                                    className="progress-segment-fill absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-75"
                                    style={{ width: '0%' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}