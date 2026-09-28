"use client";

import React from "react";
import { useHomepage } from "../hooks";
import { toCardProduct } from "@/features/product";
import ProductCardV2 from "@/features/product/components/ProductCardV2";
import Title from "@/shared/ui/Title";

interface EditorialProduct {
    id: string | number;
    name: string;
    price: number | string;
    comparePrice?: number | string | null;
    tags?: string[];
    image: string;
    category?: string;
    description?: string;
    slug?: string;
}

const FALLBACK_BESTSELLERS: EditorialProduct[] = [
    {
        id: "bs-1",
        name: "Illuminating Cleansing Gel",
        price: 1800,
        tags: ["ILLUMINATE"],
        image: "/zoomanimation/1product.png",
        category: "Cleanser",
        description: "Gentle foaming cleanser infused with botanical extracts.",
        slug: "illuminating-cleansing-gel",
    },
    {
        id: "bs-2",
        name: "Unifying Serum Spray",
        price: 2400,
        tags: ["UNIFY", "TIGHTEN PORES"],
        image: "/zoomanimation/2product.png",
        category: "Serum",
        description: "Ultra-fine calming mist to restore moisture & tighten pores.",
        slug: "unifying-serum-spray",
    },
    {
        id: "bs-3",
        name: "Super Glow Ritual Duo",
        price: 4200,
        comparePrice: 4800,
        tags: ["NATURAL GLOW"],
        image: "/zoomanimation/3product.png",
        category: "Set",
        description: "Two-step radiance formulation for cellular skin nourishment.",
        slug: "super-glow-set",
    },
    {
        id: "bs-4",
        name: "Radiance Barrier Day Oil",
        price: 3200,
        tags: ["PROTECT", "ILLUMINATE"],
        image: "/zoomanimation/4product.png",
        category: "Oil",
        description: "Cold-pressed barrier defense oil for deep glow.",
        slug: "radiance-day-oil",
    },
    {
        id: "bs-5",
        name: "Super Glow Complete Ritual",
        price: 4500,
        comparePrice: 5200,
        tags: ["NATURAL GLOW", "COMPLETE CARE"],
        image: "/images/home/skincare.png",
        category: "Set",
        description: "Complete restorative ritual for optimal skin renewal.",
        slug: "super-glow-ritual",
    },
    {
        id: "bs-6",
        name: "Essential Barrier Duo",
        price: 3600,
        comparePrice: 4200,
        tags: ["BARRIER DEFENSE"],
        image: "/images/home/abtsection/pdt1.png",
        category: "Set",
        description: "Daily nutrient-rich barrier defense duo.",
        slug: "essential-barrier-duo",
    },
];

export default function FeaturedV2() {
    const { data } = useHomepage();

    // Extract products from homepage hook or fallback
    const dynamicProducts = (data?.results?.popularProducts ?? []).map(toCardProduct);

    const bestsellersList: EditorialProduct[] =
        dynamicProducts.length > 0
            ? dynamicProducts.map((p, idx) => ({
                id: p.id,
                name: p.name,
                price: typeof p.price === "number" ? p.price : Number(p.price) || 1800,
                comparePrice: p.comparePrice,
                tags:
                    idx === 0
                        ? ["ILLUMINATE"]
                        : idx === 1
                            ? ["UNIFY", "TIGHTEN PORES"]
                            : idx === 2
                                ? ["NATURAL GLOW"]
                                : ["PROTECT", "ILLUMINATE"],
                image: p.image || "/zoomanimation/1product.png",
                category: p.category,
                description: p.description,
                slug: p.slug,
            }))
            : FALLBACK_BESTSELLERS;

    return (
        <section
            aria-label="Featured Products Editorial Showcase"
            className="relative w-full py-16 sm:py-20 lg:py-[5vw] select-none bg-[#ffffff]"
        >
            <div className="relative z-10 w-full px-4 sm:px-8 lg:px-[5vw]">
                {/* ── Top Header: Editorial Title ── */}
                <div className="mb-8 sm:mb-12 lg:mb-[3vw]">
                    <Title
                        eyebrow="Most Loved"
                        title="Our Botanical Best Sellers"
                        description="Thoughtfully crafted botanical formulations powered by clinical science to nourish, protect, and restore your skin's natural barrier."
                    />
                </div>

                {/* ── Editorial Grid Layout Following Navbar & Global Layout ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bestsellersList.map((product) => (
                        <ProductCardV2
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                comparePrice: product.comparePrice,
                                image: product.image,
                                category: product.category,
                                description: product.description,
                                slug: product.slug,
                            }}
                            className="border border-[#E5E5E5] transition-all duration-500 hover:border-black/40"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
