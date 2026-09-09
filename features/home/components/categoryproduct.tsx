"use client";

import React, { useId, useState } from "react";
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

function getCategoryDescription(category: ProductCategory): string {
  const query = `${category.slug} ${category.name}`.toLowerCase();
  if (query.includes("skin") || query.includes("face")) return "Everyday care, from your first cleanse to your final step.";
  if (query.includes("tool") || query.includes("wellness")) return "Thoughtful tools for a moment of care.";
  if (query.includes("body") || query.includes("personal")) return "Make everyday body care a little more considered.";
  if (query.includes("hair")) return "Discover care for your hair and scalp.";
  if (query.includes("tea") || query.includes("coffee")) return "Take a moment. Find your daily blend.";
  if (query.includes("fragrance")) return "A personal finishing touch to your daily ritual.";
  return "Explore a new part of your daily ritual.";
}

function CategoryArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`h-5 w-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategoryProduct() {
  const { data, isLoading } = useProductCategories();
  const reduceMotion = useReducedMotion();
  const sectionId = useId();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mobileClosed, setMobileClosed] = useState(false);
  const apiCategories = data?.results ?? [];
  const displayCategories = (apiCategories.length > 0 ? apiCategories : DEFAULT_FALLBACK_CATEGORIES).slice(0, 4);
  const activeCategory = displayCategories.find((category) => category.slug === activeSlug) ?? displayCategories[0];

  return (
    <section aria-label="Shop by Category" className="w-full bg-warm-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-[5vw]">
        <Title
          eyebrow="Curated Disciplines"
          title="Top Categories"
          description="Pure, cold-extracted botanical formulations engineered for biological synergy across face, tools, and body."
        />

        <div className="grid items-center md:grid-cols-2 md:gap-10 lg:gap-20">
          <div className="relative hidden aspect-[4/5] max-h-[620px] w-full overflow-hidden rounded-md bg-soft-white md:block">
            {isLoading ? (
              <div className="absolute inset-0 bg-secondary/10" role="status" aria-label="Loading categories" />
            ) : (
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeCategory.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                >
                  <CategoryVisual key={activeCategory.image?.name || activeCategory.slug} category={activeCategory} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <nav aria-label="Product categories" className="min-w-0">
            <ul className="divide-y divide-secondary/30 border-y border-secondary/30">
              {displayCategories.map((category, index) => {
                const isActive = activeCategory.slug === category.slug;
                const isOpen = isActive && !mobileClosed;
                const panelId = `${sectionId}-panel-${index}`;
                const buttonId = `${sectionId}-button-${index}`;
                const href = `/product?category=${encodeURIComponent(category.slug)}`;
                const description = getCategoryDescription(category);

                return (
                  <li key={category.slug}>
                    <Link
                      href={href}
                      onMouseEnter={() => setActiveSlug(category.slug)}
                      onFocus={() => setActiveSlug(category.slug)}
                      className="group hidden items-center justify-between gap-6 py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary md:flex lg:py-10"
                    >
                      <div className="min-w-0">
                        <h3 className="font-antessa text-2xl font-medium capitalize leading-tight tracking-tight text-primary lg:text-3xl">
                          {category.name}
                        </h3>
                        <p className="mt-3 max-w-sm font-primary text-sm leading-[1.7] text-primary/65">
                          {description}
                        </p>
                      </div>
                      <CategoryArrow className={`text-secondary transition-opacity duration-300 motion-reduce:transition-none ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`} />
                    </Link>

                    <div className="md:hidden">
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => {
                            setActiveSlug(category.slug);
                            setMobileClosed(isOpen);
                          }}
                          className="flex w-full items-center justify-between gap-5 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                        >
                          <span className="font-antessa text-2xl font-medium capitalize leading-tight tracking-tight text-primary">
                            {category.name}
                          </span>
                          <span aria-hidden="true" className="font-primary text-2xl font-light text-secondary">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                      </h3>
                      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                        {isOpen && (
                          <div className="pb-7">
                            <p className="mb-5 max-w-sm font-primary text-sm leading-[1.7] text-primary/65">
                              {description}
                            </p>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-soft-white">
                              <CategoryVisual key={category.image?.name || category.slug} category={category} />
                            </div>
                            <Link
                              href={href}
                              aria-label={`Shop ${category.name}`}
                              className="mt-5 inline-flex min-h-11 items-center gap-4 border-b border-secondary font-primary text-xs font-medium uppercase tracking-[0.12em] text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                            >
                              Shop category
                              <CategoryArrow className="text-secondary" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
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
