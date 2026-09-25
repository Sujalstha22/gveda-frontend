"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProductCategories } from "@/features/product";
import Title from "@/shared/ui/Title";

interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    tagline?: string;
    description?: string;
    image: string;
}

/** Visual mapping for category cards */
function getCategoryVisual(slug: string, name: string): string {
    const query = `${slug} ${name}`.toLowerCase();
    if (query.includes("skin") || query.includes("face")) {
        return "/categoris/skin-editorial-v2.webp";
    }
    if (query.includes("tool") || query.includes("wellness")) {
        return "/categoris/wellness-editorial-v2.webp";
    }
    if (query.includes("body") || query.includes("personal")) {
        return "/categoris/personal-editorial-v2.webp";
    }
    if (query.includes("hair")) {
        return "/categoris/hair-editorial-v2.webp";
    }
    if (query.includes("tea") || query.includes("coffee")) {
        return "/categoris/tea-editorial-v2.webp";
    }
    if (query.includes("fragrance")) {
        return "/categoris/fragrance-editorial-v2.webp";
    }
    return "/categoris/skin-editorial-v2.webp";
}

/** Editorial taglines reflecting clinical botanical science */
function getCategoryTagline(slug: string, name: string): string {
    const query = `${slug} ${name}`.toLowerCase();
    if (query.includes("skin") || query.includes("face")) return "Biological Barrier";
    if (query.includes("tool") || query.includes("wellness")) return "Lymphatic Flow";
    if (query.includes("body") || query.includes("personal")) return "Bio-Lipid Renewal";
    if (query.includes("hair")) return "Follicular Science";
    if (query.includes("tea") || query.includes("coffee")) return "Cellular Synergy";
    if (query.includes("fragrance")) return "Botanical Distillates";
    return "Botanical Formulation";
}

/** Editorial descriptor for each category */
function getCategoryDescription(slug: string, name: string): string {
    const query = `${slug} ${name}`.toLowerCase();
    if (query.includes("skin") || query.includes("face")) return "Everyday care for biological synergy";
    if (query.includes("tool") || query.includes("wellness")) return "Engineered tools for elevated sculpting";
    if (query.includes("body") || query.includes("personal")) return "Considered daily nourishment for the body";
    if (query.includes("hair")) return "Holistic scalp vitality & root strength";
    if (query.includes("tea") || query.includes("coffee")) return "Restorative organic botanical blends";
    if (query.includes("fragrance")) return "Subtle signature sensory extracts";
    return "Thoughtfully formulated botanical care";
}

/** 6 Curated Fallback Categories */
const FALLBACK_CATEGORIES: CategoryItem[] = [
    {
        id: "cat-1",
        name: "Skin Care",
        slug: "skin-care",
        tagline: "Biological Barrier",
        description: "Pure botanical actives for skin vitality",
        image: "/categoris/skin-editorial-v2.webp",
    },
    {
        id: "cat-2",
        name: "Beauty Tools",
        slug: "wellness",
        tagline: "Lymphatic Flow",
        description: "Sculpting tools for holistic renewal",
        image: "/categoris/wellness-editorial-v2.webp",
    },
    {
        id: "cat-3",
        name: "Body Care",
        slug: "personal-care",
        tagline: "Bio-Lipid Renewal",
        description: "Deep restorative nourishment",
        image: "/categoris/personal-editorial-v2.webp",
    },
    {
        id: "cat-4",
        name: "Hair & Scalp",
        slug: "hair-care",
        tagline: "Follicular Science",
        description: "Root vitality and nutrient support",
        image: "/categoris/hair-editorial-v2.webp",
    },
    {
        id: "cat-5",
        name: "Tea & Wellness",
        slug: "tea",
        tagline: "Cellular Synergy",
        description: "Restorative organic botanical blends",
        image: "/categoris/tea-editorial-v2.webp",
    },
    {
        id: "cat-6",
        name: "Fragrance",
        slug: "fragrance",
        tagline: "Botanical Distillates",
        description: "Subtle signature sensory notes",
        image: "/categoris/fragrance-editorial-v2.webp",
    },
];

export default function CategoryProductv3() {
    const { data } = useProductCategories();

    const categoriesList = useMemo<CategoryItem[]>(() => {
        const apiCategories = data?.results ?? [];
        if (apiCategories.length > 0) {
            const mapped: CategoryItem[] = apiCategories.slice(0, 6).map((c, idx) => ({
                id: `cat-api-${idx}`,
                name: c.name,
                slug: c.slug,
                tagline: getCategoryTagline(c.slug, c.name),
                description: getCategoryDescription(c.slug, c.name),
                image: getCategoryVisual(c.slug, c.name),
            }));

            if (mapped.length < 6) {
                return [...mapped, ...FALLBACK_CATEGORIES.slice(mapped.length, 6)];
            }
            return mapped;
        }

        return FALLBACK_CATEGORIES;
    }, [data]);

    return (
        <section className="relative w-screen max-w-none mt-15 overflow-hidden select-none ">
            {/* ── Grid Layout where each row is 100vh (h-screen) ── */}
            <div className="mb-8 sm:mb-12 lg:mb-[3vw]">
                <Title
                    eyebrow="Curated Disciplines"
                    title="Top Categories"
                    description="Pure, cold-extracted botanical formulations engineered for biological synergy across face, tools, and body."
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                {categoriesList.map((category, index) => {
                    const categoryHref = `/product?category=${encodeURIComponent(category.slug)}#products-display-section`;

                    return (
                        <Link
                            key={category.id}
                            href={categoryHref}
                            className="group relative w-full h-screen min-h-[550px] lg:h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 md:border-r last:border-r-0 lg:[&:nth-child(2n)]:border-r-0 cursor-pointer"
                            aria-label={`Explore ${category.name}`}
                        >
                            {/* Full-bleed Background Image with Smooth Hover Zoom */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-center p-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                                />
                                {/* Persistent Editorial Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85 transition-opacity duration-700 group-hover:opacity-90" />
                            </div>

                            {/* ── Top Section: Category Title & Index ── */}
                            <div className="relative z-10 p-8 sm:p-10 lg:p-14 flex flex-col items-start text-left">

                                <h3 className="font-heading font-medium text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wider leading-tight">
                                    {category.name}
                                </h3>
                                {category.tagline && (
                                    <p className="font-primary text-sm sm:text-base text-white/75 tracking-wide mt-3 font-light max-w-md">
                                        {category.tagline}
                                    </p>
                                )}
                                {category.description && (
                                    <p className="font-primary text-xs sm:text-sm text-white/50 tracking-normal mt-1.5 font-light max-w-sm hidden sm:block">
                                        {category.description}
                                    </p>
                                )}
                            </div>

                            {/* ── Bottom Section with Soft Glass Button that Appears on Hover ── */}
                            <div className="relative z-10 p-8 sm:p-10 lg:p-14 flex flex-col items-start w-full">
                                {/* Soft Glass Type Button */}
                                <div className="w-full max-w-xs transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <div className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 backdrop-blur-md text-white text-xs font-medium tracking-[0.2em] uppercase shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300">
                                        <span>Explore Discipline</span>
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
