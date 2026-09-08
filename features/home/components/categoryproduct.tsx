"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Title from "@/shared/ui/Title";
import { useProductCategories } from "@/features/product";
import { staticUrl } from "@/shared/api";

export default function CategoryProduct() {
  const { data, isLoading } = useProductCategories();
  const categories = data?.results ?? [];

  if (!isLoading && categories.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Top Categories"
      className="w-full py-16 sm:py-24 lg:py-[6vw] bg-warm-ivory select-none"
    >
      <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Section Title ── */}
        <Title
          eyebrow="Curated Disciplines"
          title="Top Categories"
          description="Pure, cold-extracted botanical formulations engineered for biological synergy across skin, hair, and holistic wellness."
        />

        {/* ── Dynamic Categories Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full mt-10 sm:mt-14 lg:mt-[3vw]">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden border border-secondary/15 animate-pulse"
                >
                  <div className="w-full aspect-[4/5] bg-secondary/10" />
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="w-32 h-5 bg-secondary/20 rounded-md" />
                    <div className="w-20 h-3 bg-secondary/15 rounded-md" />
                  </div>
                </div>
              ))
            : categories.slice(0, 4).map((category, index) => {
                const imageUrl =
                  staticUrl(category.image?.name) || "/images/products/product-hero-1.jpeg";
                const indexFormatted = String(index + 1).padStart(2, "0");

                return (
                  <Link
                    key={category.slug || index}
                    href={`/product?category=${category.slug}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-secondary/15 hover:border-secondary/40 transition-all duration-500 shadow-2xs hover:shadow-lg cursor-pointer"
                  >
                    {/* 1. Category Visual Stage */}
                    <div className="relative w-full aspect-[4/5] bg-[#FAF9F6] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                      />

                      {/* Gentle ambient gradient on hover */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Index Number */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="font-editorial italic text-2xl lg:text-3xl text-accent-gold font-normal drop-shadow-xs">
                          {indexFormatted}
                        </span>
                      </div>
                    </div>

                    {/* 2. Editorial Details */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        <span className="font-primary text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-secondary font-medium block mb-1">
                          Collection
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary tracking-tight group-hover:text-secondary transition-colors">
                          {category.name}
                        </h3>
                      </div>

                      {/* 3. Link Divider */}
                      <div className="mt-6 pt-4 border-t border-secondary/15 flex items-center justify-between text-primary group-hover:text-secondary transition-colors">
                        <span className="font-primary text-[11px] tracking-[0.16em] uppercase font-medium">
                          Explore Collection
                        </span>
                        <span className="font-primary text-base font-light transform group-hover:translate-x-1.5 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
