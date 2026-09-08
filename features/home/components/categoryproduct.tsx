"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Title from "@/shared/ui/Title";
import { useProductCategories } from "@/features/product";
import { staticUrl } from "@/shared/api";
import type { ProductCategory } from "@/features/product/interface";

/** Curated fallback images mapped by category keywords */
function getFallbackCategoryVisual(slug: string, name: string): string {
  const query = `${slug} ${name}`.toLowerCase();
  if (query.includes("skin") || query.includes("face")) {
    return "/images/categories/category-face.jpg";
  }
  if (query.includes("tool") || query.includes("wellness")) {
    return "/images/categories/category-tools.jpg";
  }
  if (query.includes("body") || query.includes("personal")) {
    return "/images/categories/category-body.jpg";
  }
  if (query.includes("hair")) {
    return "/images/home/process-4.jpeg";
  }
  if (query.includes("tea") || query.includes("coffee")) {
    return "/images/products/tea-coffee.jpg";
  }
  if (query.includes("fragrance")) {
    return "/images/home/process-1.jpeg";
  }
  return "/images/categories/category-face.jpg";
}

/** Fallback categories if API is unavailable or returns an empty list */
const DEFAULT_FALLBACK_CATEGORIES: ProductCategory[] = [
  {
    name: "face",
    slug: "skin-care",
    image: { name: "", alt: "face" },
    children: [],
  },
  {
    name: "beauty tools",
    slug: "wellness",
    image: { name: "", alt: "beauty tools" },
    children: [],
  },
  {
    name: "body",
    slug: "personal-care",
    image: { name: "", alt: "body" },
    children: [],
  },
];

function CategoryVisual({ category }: { category: ProductCategory }) {
  const fallback = getFallbackCategoryVisual(category.slug, category.name);
  const [imageSrc, setImageSrc] = useState(staticUrl(category.image?.name) || fallback);

  return (
    <Image
      src={imageSrc}
      alt={`GVEDA ${category.name}`}
      fill
      sizes="(max-width: 768px) 90vw, 45vw"
      onError={() => setImageSrc(fallback)}
      className="object-cover object-center"
    />
  );
}

export default function CategoryProduct() {
  const { data, isLoading } = useProductCategories();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const apiCategories = data?.results ?? [];
  const displayCategories =
    apiCategories.length > 0 ? apiCategories : DEFAULT_FALLBACK_CATEGORIES;
  const activeCategory = displayCategories[activeIndex] || displayCategories[0];

  return (
    <section
      aria-label="Shop by Category"
      className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none bg-warm-ivory"
    >
      <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
        {/* Section Header matching all other homepage sections */}
        <Title
          eyebrow="Curated Disciplines"
          title="Top Categories"
          description="Pure, cold-extracted botanical formulations engineered for biological synergy across face, tools, and body."
        />

        {/* 2-Column Equal-Height Showcase */}
        <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Left Column: Visual Stage */}
          <div className="relative aspect-[4/3] md:aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-2xl bg-soft-white shadow-xs">
            {isLoading ? (
              <div className="absolute inset-0 bg-secondary/10 animate-pulse motion-reduce:animate-none" />
            ) : (
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeCategory.slug}
                  className="absolute inset-0 bg-soft-white will-change-[clip-path]"
                  initial={{ clipPath: reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)', zIndex: 2 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', zIndex: 2 }}
                  exit={{
                    zIndex: 1,
                    opacity: 0,
                    transition: {
                      zIndex: { duration: 0 },
                      opacity: { delay: reduceMotion ? 0 : 0.5, duration: 0 },
                    },
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <CategoryVisual category={activeCategory} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Right Column: Category List Matching Left Height */}
          <nav aria-label="Product categories" className="w-full h-full flex flex-col">
            <ul className="divide-y divide-secondary/30 border-y border-secondary/30 flex flex-col justify-between h-full flex-1">
              {displayCategories.map((category, index) => {
                const isActive = activeIndex === index;
                const indexFormatted = String(index + 1).padStart(2, "0");

                return (
                  <li key={category.slug || category.name} className="flex-1 flex items-stretch">
                    <Link
                      href={`/product?category=${encodeURIComponent(category.slug || "")}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className="group flex items-center justify-between gap-4 w-full py-5 sm:py-6 lg:py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-gold transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span
                          className={`font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] transition-colors duration-300 ${
                            isActive ? "text-accent-gold" : "text-primary/30 group-hover:text-accent-gold"
                          }`}
                        >
                          {indexFormatted}
                        </span>
                        <span
                          className={`font-antessa text-2xl sm:text-3xl lg:text-4xl capitalize font-normal leading-tight transition-colors duration-300 ${
                            isActive
                              ? "text-accent-gold"
                              : "text-primary group-hover:text-accent-gold group-focus-visible:text-accent-gold"
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`hidden sm:inline-block font-primary text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                            isActive ? "text-accent-gold" : "text-primary/40 group-hover:text-accent-gold"
                          }`}
                        >
                          Explore
                        </span>
                        <svg
                          aria-hidden="true"
                          className={`h-5 w-5 shrink-0 transition-all duration-300 motion-reduce:transform-none ${
                            isActive
                              ? "text-accent-gold translate-x-1.5"
                              : "text-primary/40 group-hover:text-accent-gold group-hover:translate-x-1.5"
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
