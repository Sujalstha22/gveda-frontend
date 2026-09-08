"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface CategoryCardProps {
  category: ProductCategory;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const fallback = getFallbackCategoryVisual(category.slug, category.name);
  const initialUrl = staticUrl(category.image?.name) || fallback;
  const [imageSrc, setImageSrc] = useState(initialUrl);

  const formattedName = (category.name || "collection").trim().toLowerCase();
  const href = `/product?category=${encodeURIComponent(category.slug || "")}`;

  return (
    <Link
      href={href}
      className="group relative w-full h-[310px] sm:h-[360px] md:h-[400px] lg:h-[430px] overflow-hidden bg-[#FAF9F6] block cursor-pointer"
    >
      {/* 1. High-Res Visual Stage */}
      <Image
        src={imageSrc}
        alt={`GVEDA Botanical ${formattedName}`}
        fill
        priority={index === 0}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
        onError={() => setImageSrc(fallback)}
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
      />

      {/* 2. Black Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors duration-500"
      />

      {/* 3. Rotated Category Typography (Top-Left, 90° Clockwise) */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-6 lg:top-7 lg:left-7 z-10 pointer-events-none">
        <span
          className="inline-block font-antessa capitalize text-warm-ivory text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-none tracking-tight [writing-mode:vertical-lr] select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          style={{ textOrientation: "mixed" }}
        >
          {formattedName}
        </span>
      </div>

      {/* 4. Bottom Centered Pill Button (Reveals on Hover) */}
      <div className="absolute bottom-5 sm:bottom-6 lg:bottom-7 left-1/2 -translate-x-1/2 z-10 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
        <div className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-xs text-rich-black font-primary text-xs font-medium tracking-wide shadow-lg group-hover:bg-rich-black group-hover:text-warm-ivory group-hover:shadow-xl group-hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap text-center">
          shop {formattedName}
        </div>
      </div>
    </Link>
  );
}

export default function CategoryProduct() {
  const { data, isLoading } = useProductCategories();
  const apiCategories = data?.results ?? [];
  const displayCategories =
    apiCategories.length > 0 ? apiCategories : DEFAULT_FALLBACK_CATEGORIES;

  return (
    <section
      aria-label="Shop by Category"
      className="w-full py-12 sm:py-16 lg:py-20 bg-warm-ivory select-none"
    >
      <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Section Title ── */}
        <Title
          eyebrow="Curated Disciplines"
          title="Top Categories"
          description="Pure, cold-extracted botanical formulations engineered for biological synergy across face, tools, and body."
        />

        {/* ── Dynamic Category Showcase Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/40 overflow-hidden rounded-2xl lg:rounded-3xl shadow-sm border border-secondary/20 w-full mt-8 sm:mt-12 lg:mt-[2.5vw]">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-[310px] sm:h-[360px] md:h-[400px] lg:h-[430px] bg-[#EFECE6] animate-pulse relative"
                >
                  <div className="absolute top-6 left-6 w-8 h-28 bg-black/10 rounded-md" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-8 bg-white/60 rounded-full" />
                </div>
              ))
            : displayCategories.map((category, index) => (
                <CategoryCard
                  key={category.slug || `${category.name}-${index}`}
                  category={category}
                  index={index}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
