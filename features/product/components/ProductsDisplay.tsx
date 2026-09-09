"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTransitionState } from "next-transition-router";
import { useLenis } from "@/shared/providers/LenisProvider";
import ProductCard from "./ProductCard";
import Title from "@/shared/ui/Title";
import Pagination from "@/shared/ui/Pagination";
import {
  useProducts,
  useProductsByCategory,
  useProductCategories,
  toCardProduct,
} from "..";

const ProductsDisplay: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const { stage } = useTransitionState();
  const { lenis } = useLenis();
  const lastScrollTarget = useRef<string | null>(null);
  const [pagination, setPagination] = useState({ category: selectedCategory, page: 1 });
  const currentPage = pagination.category === selectedCategory ? pagination.page : 1;
  const setCurrentPage = (page: number) => setPagination({ category: selectedCategory, page });

  const PRODUCTS_PER_PAGE = 12; // Exactly 3 rows on 4-column desktop grid

  const categoriesQuery = useProductCategories();
  const categories = categoriesQuery.data?.results ?? [];

  const listQuery = useProducts({
    search: searchQuery || undefined,
    pageSize: 100,
  });
  const categoryQuery = useProductsByCategory(
    selectedCategory === "all" ? "" : selectedCategory,
  );

  const active = selectedCategory === "all" ? listQuery : categoryQuery;
  const products = active.data?.results ?? [];

  const setSelectedCategory = (category: string) => {
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    window.history.pushState(null, "", url.pathname + url.search + url.hash);
    setCurrentPage(1);
  };

  // Wait for the transition's scroll-to-top reset before following category links.
  useEffect(() => {
    if (stage !== "none" || !lenis || categoriesQuery.isLoading || active.isLoading) return;
    if (window.location.hash !== "#products-display-section") return;
    const targetKey = window.location.search + window.location.hash;
    if (lastScrollTarget.current === targetKey) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById("products-display-section");
      if (!target) return;
      lenis.resize();
      lenis.scrollTo(target, {
        offset: -88,
        immediate: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        duration: 0.5,
        force: true,
      });
      lastScrollTarget.current = targetKey;
    });
    return () => cancelAnimationFrame(frame);
  }, [stage, lenis, categoriesQuery.isLoading, active.isLoading, selectedCategory]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  return (
    <section id="products-display-section" className="w-full scroll-mt-24 py-16 sm:py-20 lg:py-[5vw] select-none bg-secondary/20">
      <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Section Header ── */}
        <Title
          eyebrow="Botanical Science"
          title="The Complete Collection"
          description="Pure, biocompatible botanical formulations designed to nourish and protect skin and hair health naturally."
        />

        {/* ── Filter Bar ── */}
        <div className="w-full mb-8 sm:mb-10 lg:mb-[2.2vw] flex items-center justify-center p-3.5 sm:p-4 rounded-4xl bg-editorial">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              aria-pressed={selectedCategory === "all"}
              className={`px-4 py-2 rounded-full text-xs font-primary font-medium tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-xs"
                  : "bg-transparent text-primary/70 hover:text-primary hover:bg-black/5"
              }`}
            >
              All
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 rounded-full text-xs font-primary font-medium tracking-wider uppercase transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-transparent text-primary/70 hover:text-primary hover:bg-black/5"
                  }`}
                >
                  {cat.name.trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Products Grid ── */}
        <div className="w-full">
          {active.isLoading ? (
            <p className="text-center py-16 font-primary text-primary/50 text-sm">
              Loading products…
            </p>
          ) : active.isError ? (
            <div className="text-center py-16">
              <p className="font-primary text-primary/60 text-sm mb-4">
                Couldn&apos;t load products.
              </p>
              <button
                type="button"
                onClick={() => active.refetch()}
                className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                Try again
              </button>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[1.5vw]">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={toCardProduct(product)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={products.length}
                  pageSize={PRODUCTS_PER_PAGE}
                  itemName="Formulations"
                  scrollTargetId="products-display-section"
                />
              )}
            </>
          ) : (
            <div className="text-center py-16 sm:py-24 border border-dashed border-border rounded-2xl max-w-3xl mx-auto">
              <h3 className="font-primary text-lg sm:text-xl text-primary font-medium mb-2">
                No Products Found
              </h3>
              <p className="font-primary text-primary/60 text-xs sm:text-sm max-w-sm mx-auto mb-4">
                We couldn&apos;t find any items matching your search or filters.
                Try adjusting your selections.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-primary border border-black/20 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsDisplay;
