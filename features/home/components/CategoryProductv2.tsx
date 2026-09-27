"use client";

import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Title from "@/shared/ui/Title";
import { useProductCategories } from "@/features/product";

interface EditorialCategoryItem {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    subtag?: string;
    description: string;
    image: string;
}

/** Curated editorial visual assets for each discipline */
function getCategoryVisual(slug: string, name: string): string {
    const query = `${slug} ${name}`.toLowerCase();
    if (query.includes("skin") || query.includes("face") || query.includes("lip")) {
        return "/images/categories/skincare.png";
    }
    if (query.includes("tool") || query.includes("wellness") || query.includes("welness") || query.includes("eye")) {
        return "/images/categories/welness.png";
    }
    if (query.includes("body") || query.includes("personal") || query.includes("complexion")) {
        return "/images/categories/personalcare.png";
    }
    if (query.includes("hair")) {
        return "/images/categories/haircare.png";
    }
    if (query.includes("tea") || query.includes("coffee")) {
        return "/images/categories/tea and coffee.png";
    }
    if (query.includes("fragrance") || query.includes("fragnanvce") || query.includes("finish") || query.includes("prep")) {
        return "/images/categories/fragnanvce.png";
    }
    return "/images/categories/skincare.png";
}

/** Editorial taglines reflecting clinical botanical science */
function getCategoryTagline(slug: string, name: string): { tagline: string; subtag?: string } {
    const query = `${slug} ${name}`.toLowerCase();
    if (query.includes("skin") || query.includes("face")) {
        return { tagline: "BIOLOGICAL BARRIER", subtag: "ILLUMINATE & RESTORE" };
    }
    if (query.includes("tool") || query.includes("wellness") || query.includes("welness")) {
        return { tagline: "LYMPHATIC FLOW", subtag: "FACIAL SCULPTING" };
    }
    if (query.includes("body") || query.includes("personal")) {
        return { tagline: "COLD-PRESSED BIO-LIPIDS", subtag: "TOTAL BODY RENEWAL" };
    }
    if (query.includes("hair")) {
        return { tagline: "FOLLICULAR SCIENCE", subtag: "ROOT VITALITY" };
    }
    if (query.includes("tea") || query.includes("coffee")) {
        return { tagline: "CELLULAR SYNERGY", subtag: "ORGANIC INFUSIONS" };
    }
    if (query.includes("fragrance") || query.includes("fragnanvce")) {
        return { tagline: "PURE ESSENCES", subtag: "BOTANICAL DISTILLATES" };
    }
    return { tagline: "BOTANICAL FORMULATION", subtag: "CLINICAL PURITY" };
}

/** Editorial descriptor for each category */
function getCategoryDescription(slug: string, name: string): string {
    const query = `${slug} ${name}`.toLowerCase();
    if (query.includes("skin") || query.includes("face")) {
        return "Pure, cold-extracted botanical formulations for daily glow.";
    }
    if (query.includes("tool") || query.includes("wellness") || query.includes("welness")) {
        return "Engineered tools and holistic treatments for rejuvenation.";
    }
    if (query.includes("body") || query.includes("personal")) {
        return "Considered daily nourishment and bio-lipid renewal for the body.";
    }
    if (query.includes("hair")) {
        return "Holistic scalp vitality and root strength formulations.";
    }
    if (query.includes("tea") || query.includes("coffee")) {
        return "Restorative organic botanical blends and cellular synergy infusions.";
    }
    if (query.includes("fragrance") || query.includes("fragnanvce")) {
        return "Subtle signature botanical extracts and sensory distillates.";
    }
    return "Thoughtfully formulated botanical care.";
}

/** Fallback categories matching editorial discipline cards */
const FALLBACK_CATEGORIES: EditorialCategoryItem[] = [
    {
        id: "cat-1",
        name: "Skin Care",
        slug: "skin-care",
        tagline: "CATEGORY",
        description: "Pure, cold-extracted botanical formulations for daily glow.",
        image: "/images/categories/skincare.png",
    },
    {
        id: "cat-2",
        name: "Wellness",
        slug: "wellness",
        tagline: "CATEGORY",
        description: "Engineered tools and holistic treatments for rejuvenation.",
        image: "/images/categories/welness.png",
    },
    {
        id: "cat-3",
        name: "Personal Care",
        slug: "personal-care",
        tagline: "CATEGORY",
        description: "Considered daily nourishment and bio-lipid renewal for the body.",
        image: "/images/categories/personalcare.png",
    },
    {
        id: "cat-4",
        name: "Hair Care",
        slug: "hair-care",
        tagline: "CATEGORY",
        description: "Holistic scalp vitality and root strength formulations.",
        image: "/images/categories/haircare.png",
    },
    {
        id: "cat-5",
        name: "Tea & Coffee",
        slug: "tea",
        tagline: "CATEGORY",
        description: "Restorative organic botanical blends and cellular synergy infusions.",
        image: "/images/categories/tea and coffee.png",
    },
    {
        id: "cat-6",
        name: "Fragrance",
        slug: "fragrance",
        tagline: "CATEGORY",
        description: "Subtle signature botanical extracts and sensory distillates.",
        image: "/images/categories/fragnanvce.png",
    },
];

export default function CategoryProductv2() {
    const { data } = useProductCategories();
    const [isPaused, setIsPaused] = useState(false);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

    const apiCategories = data?.results ?? [];
    const categoriesList: EditorialCategoryItem[] =
        apiCategories.length > 0
            ? apiCategories.map((c, idx) => {
                const { tagline, subtag } = getCategoryTagline(c.slug, c.name);
                return {
                    id: `cat-api-${idx}`,
                    name: c.name,
                    slug: c.slug,
                    tagline,
                    subtag,
                    description: getCategoryDescription(c.slug, c.name),
                    image: getCategoryVisual(c.slug, c.name),
                };
            })
            : FALLBACK_CATEGORIES;

    // Embla Carousel Setup: Strict 1-card snap per drag/swipe matching button controls
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        startIndex: 0,
        containScroll: "trimSnaps",
        dragFree: false,
        skipSnaps: false,
        loop: false,
    });

    // Ensure carousel always starts at index 0 upon initial load or data arrival
    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0, true);
        }
    }, [emblaApi, categoriesList.length]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const subscribe = useCallback(
        (callback: () => void) => {
            if (!emblaApi) return () => { };
            emblaApi.on("select", callback);
            emblaApi.on("reInit", callback);
            emblaApi.on("scroll", callback);
            return () => {
                emblaApi.off("select", callback);
                emblaApi.off("reInit", callback);
                emblaApi.off("scroll", callback);
            };
        },
        [emblaApi]
    );

    const scrollProgress = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? Math.max(0, Math.min(1, emblaApi.scrollProgress())) : 0),
        () => 0
    );

    const canScrollPrev = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? emblaApi.canScrollPrev() : false),
        () => false
    );

    const canScrollNext = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? emblaApi.canScrollNext() : true),
        () => true
    );

    // Simple horizontal auto-movement that smoothly ends at the last card
    useEffect(() => {
        if (!emblaApi || isPaused) {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
            return;
        }

        autoplayTimerRef.current = setInterval(() => {
            if (emblaApi) {
                if (emblaApi.canScrollNext()) {
                    emblaApi.scrollNext();
                } else if (autoplayTimerRef.current) {
                    clearInterval(autoplayTimerRef.current);
                }
            }
        }, 3600);

        return () => {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        };
    }, [emblaApi, isPaused]);

    return (
        <section
            aria-label="Shop by Category"
            className="w-full bg-warm-ivory py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-[5vw]">
                {/* ── Top Header: Editorial Title ── */}
                <div className="mb-8 sm:mb-12 lg:mb-[3vw]">
                    <Title
                        eyebrow="Curated Disciplines"
                        title="Top Categories"
                        description="Pure, cold-extracted botanical formulations engineered for biological synergy across face, tools, and body."
                    />
                </div>

                {/* ── Editorial Grid-Based Carousel Container ── */}
                <div
                    className="relative w-full"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Main Grid Carousel with Gaps and Rounded Cards */}
                    <div className="w-full">
                        <div
                            ref={emblaRef}
                            className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-2 px-1"
                        >
                            <div className="grid grid-flow-col auto-cols-[90%] min-[480px]:auto-cols-[70%] sm:auto-cols-[54%] md:auto-cols-[38%] lg:auto-cols-[30%] gap-4 sm:gap-5 lg:gap-6">
                                {categoriesList.map((category) => {
                                    const categoryHref = `/product?category=${encodeURIComponent(category.slug)}#products-display-section`;

                                    return (
                                        <div
                                            key={category.id}
                                            className="min-w-0 group relative flex flex-col justify-between bg-white border border-[#E5E5E5] transition-all duration-500 hover:border-black/40 "
                                        >
                                            {/* Product Image Section: Full width and height, no padding */}
                                            <div className="relative w-full aspect-[4/4.8] bg-neutral-100 overflow-hidden block ">
                                                <Link
                                                    href={categoryHref}
                                                    className="relative w-full h-full flex items-center justify-center overflow-hidden"
                                                    aria-label={`Explore ${category.name}`}
                                                >
                                                    <Image
                                                        src={category.image}
                                                        alt={category.name}
                                                        fill
                                                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 38vw, 30vw"
                                                        className="object-cover object-center w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                                    />
                                                </Link>

                                                <Link
                                                    href={categoryHref}
                                                    className="absolute bottom-0 inset-x-0 w-full py-3.5 px-4 bg-rich-black backdrop-blur-md border-t border-white/20 text-white flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer z-10 shadow-xs"
                                                >
                                                    <span>Explore Discoveries</span>
                                                    <svg
                                                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>

                                            {/* Thin Horizontal Divider */}
                                            <div className="w-full border-t border-[#EAEAEA]" />

                                            {/* Category Details: Title & Description */}
                                            <div className="w-full flex flex-col items-center    text-center pt-5 pb-6 sm:pt-6 sm:pb-7 px-4 sm:px-6">
                                                <Link
                                                    href={categoryHref}
                                                    className="font-heading text-base sm:text-lg font-semibold text-rich-black hover:text-botanical-gold transition-colors duration-200 leading-snug line-clamp-1"
                                                >
                                                    {category.name}
                                                </Link>

                                                <p className="font-primary text-xs sm:text-[13px] font-normal text-neutral-500 leading-relaxed mt-2 max-w-[260px] line-clamp-2 min-h-[36px]">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom Controls: Progress Indicator & Navigation Buttons (Bottom Right) ── */}
                    <div className="w-full flex items-center justify-between mt-8 sm:mt-10 lg:mt-[2.5vw] px-1">
                        {/* Minimal Progress Bar */}
                        <div className="relative w-32 sm:w-48 lg:w-[14vw] h-[2px] bg-black/15 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 bottom-0 bg-primary transition-all duration-150 ease-out rounded-full"
                                style={{
                                    width: "35%",
                                    left: `${scrollProgress * 65}%`,
                                }}
                            />
                        </div>

                        {/* Navigation Control Buttons (Bottom Right) */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                aria-label="Previous categories"
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white text-primary flex items-center justify-center transition-all duration-300 hover:border-black/40 hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs hover:shadow-sm"
                            >
                                <svg
                                    className="w-4 h-4 -translate-x-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                aria-label="Next categories"
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white text-primary flex items-center justify-center transition-all duration-300 hover:border-black/40 hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs hover:shadow-sm"
                            >
                                <svg
                                    className="w-4 h-4 translate-x-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
