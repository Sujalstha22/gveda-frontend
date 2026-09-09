"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Title from "@/shared/ui/Title";
import { useProductCategories } from "@/features/product";
import type { ProductCategory } from "@/features/product/interface";

/** Coordinated editorial category photography from public/categoris. */
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

function CategoryVisual({ category, eager = false }: { category: ProductCategory; eager?: boolean }) {
  const imageSrc = getCategoryVisual(category.slug, category.name);

  return (
    <Image
      src={imageSrc}
      alt={`GVEDA ${category.name}`}
      fill
      sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1599px) 45vw, 680px"
      quality={90}
      loading={eager ? "eager" : "lazy"}
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
  const displayCategories = apiCategories.length > 0 ? apiCategories : DEFAULT_FALLBACK_CATEGORIES;
  const activeCategory = displayCategories.find((category) => category.slug === activeSlug) ?? displayCategories[0];

  return (
    <section aria-label="Shop by Category" className="w-full bg-warm-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-[5vw]">
        <Title
          eyebrow="Curated Disciplines"
          title="Top Categories"
          description="Pure, cold-extracted botanical formulations engineered for biological synergy across face, tools, and body."
        />

        <div className="grid items-start md:grid-cols-2 md:gap-10 lg:gap-20">
          <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-2xl bg-soft-white md:sticky md:top-28 md:block md:self-start">
            {isLoading ? (
              <div className="absolute inset-0 bg-secondary/10" role="status" aria-label="Loading categories" />
            ) : (
              displayCategories.map((category) => (
                <motion.div
                  key={category.slug}
                  className="absolute inset-0"
                  aria-hidden={category.slug !== activeCategory.slug}
                  initial={false}
                  animate={{ opacity: category.slug === activeCategory.slug ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
                >
                  <CategoryVisual category={category} eager />
                </motion.div>
              ))
            )}
          </div>

          <nav aria-label="Product categories" className="min-w-0">
            <ul className="divide-y divide-secondary/30 border-y border-secondary/30">
              {displayCategories.map((category, index) => {
                const isActive = activeCategory.slug === category.slug;
                const isOpen = isActive && !mobileClosed;
                const panelId = `${sectionId}-panel-${index}`;
                const buttonId = `${sectionId}-button-${index}`;
                const href = `/product?category=${encodeURIComponent(category.slug)}#products-display-section`;
                const description = getCategoryDescription(category);

                return (
                  <li key={category.slug}>
                    <Link
                      href={href}
                      onMouseEnter={() => setActiveSlug(category.slug)}
                      onFocus={() => setActiveSlug(category.slug)}
                      className="group hidden items-center justify-between gap-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary md:flex lg:py-5"
                    >
                      <div className="min-w-0">
                        <h3 className={`font-antessa text-xl font-medium capitalize leading-tight tracking-tight transition-colors duration-300 motion-reduce:transition-none lg:text-2xl ${isActive ? "text-secondary" : "text-primary group-hover:text-secondary group-focus-visible:text-secondary"}`}>
                          {category.name}
                        </h3>
                        <p className="mt-2 max-w-sm font-primary text-xs leading-[1.7] text-primary/65 lg:text-[13px]">
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
                          <span className={`font-antessa text-xl font-medium capitalize leading-tight tracking-tight transition-colors duration-300 motion-reduce:transition-none ${isOpen ? "text-secondary" : "text-primary"}`}>
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
