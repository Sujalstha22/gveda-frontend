"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/shared/context/CartContext";
import { useHomepage } from "@/features/home/hooks";
import { useProducts, toCardProduct } from "@/features/product";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCH_TAGS = [
  "Botanical Serum",
  "Hydrating Cleanser",
  "Daily Moisturizer",
  "Facial Oil",
  "Eye Elixir",
  "Vitamin C",
  "Night Cream",
  "Barrier Restore",
];

function SearchProductCard({
  product,
  onSelect,
}: {
  product: {
    id: number | string;
    slug?: string;
    name: string;
    volume?: string;
    price?: number | string;
    comparePrice?: number | string | null;
    image: string;
    category?: string;
  };
  onSelect: () => void;
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const href = product.slug ? `/product/${product.slug}` : "/product";

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    onSelect();
    router.push(href);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);

    const numericPrice =
      typeof product.price === "number"
        ? product.price
        : parseFloat(String(product.price || "").replace(/[^0-9.]/g, "")) || 48;

    addToCart({
      id: String(product.id || product.slug || product.name),
      name: product.name,
      price: numericPrice,
      image: product.image,
      category: product.category,
      size: product.volume,
      slug: product.slug,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/90 hover:bg-white border border-border hover:border-botanical-gold/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-subtle"
    >
      {/* Product Image Stage (Left) */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg bg-warm-ivory/80 border border-border/80 flex items-center justify-center p-1.5 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="64px"
          className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details (Middle) */}
      <div className="flex flex-col flex-1 min-w-0 text-left">
        {product.category && product.category.toLowerCase() !== "gveda" && (
          <span className="font-primary text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-secondary font-medium truncate">
            {product.category}
          </span>
        )}
        <h4 className="font-primary text-xs sm:text-sm font-medium text-primary line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
          {product.name}
        </h4>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="font-primary text-xs sm:text-sm font-semibold text-primary">
            Rs. {Number(product.price || 48).toFixed(2)}
          </span>
          {Boolean(
            product.comparePrice &&
            Number(product.comparePrice) > Number(product.price || 0),
          ) && (
            <span className="font-primary text-[10px] sm:text-[11px] text-primary/40 line-through">
              Rs. {Number(product.comparePrice).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quick Add Button (Right) */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={added}
        aria-label={`Add ${product.name} to bag`}
        className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-full text-[10px] sm:text-[11px] tracking-wider uppercase font-medium transition-all duration-300 flex items-center gap-1 shrink-0 cursor-pointer active:scale-95 ${
          added
            ? "bg-botanical-gold text-white border border-botanical-gold"
            : "bg-primary text-white hover:bg-neutral-800 border border-primary"
        }`}
      >
        {added ? (
          <>
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline
                points="20 6 9 17 4 12"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Added</span>
          </>
        ) : (
          <>
            <span className="text-xs leading-none font-light">+</span>
            <span>Add</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search input to prevent rapid refetches
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setDebouncedQuery("");
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(trimmed);
      setIsDebouncing(false);
    }, 350);

    return () => clearTimeout(handler);
  }, [query]);

  // Home page popular products (from first page)
  const { data: homeData, isLoading: isHomeLoading } = useHomepage();
  const popularRaw = homeData?.results?.popularProducts ?? [];

  // Fallback products if home popular is empty
  const { data: fallbackData } = useProducts({ pageSize: 8 });
  const fallbackRaw = fallbackData?.results ?? [];

  const popularList = (popularRaw.length > 0 ? popularRaw : fallbackRaw).slice(
    0,
    8,
  );

  // Active search query results - only queried with debounced text
  const hasQuery = Boolean(debouncedQuery.trim());
  const { data: searchData, isFetching } = useProducts(
    {
      search: hasQuery ? debouncedQuery.trim() : undefined,
      pageSize: 8,
    },
    { enabled: hasQuery },
  );

  const searchResults = searchData?.results ?? [];
  const isSearchPending = isDebouncing || (hasQuery && isFetching);

  // Focus input when opened & lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setQuery("");
        setDebouncedQuery("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/product?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      {/* ── TOP INPUT BAR: Seamlessly occupies the navbar header row ── */}
      <div
        className={`absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 visible pointer-events-auto translate-y-0"
            : "opacity-0 invisible pointer-events-none translate-y-1.5"
        }`}
      >
        <div className="w-full flex-1 flex items-center">
          <div className="w-full px-3 sm:px-8 lg:px-[5vw] flex items-center justify-between">
            {/* Spacer matching Logo width on desktop so input doesn't overlap logo */}
            <div className="shrink-0 w-24 sm:w-28 md:w-32 hidden sm:block pointer-events-none" />

            {/* Search Input Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex items-center mr-2 sm:mx-6 md:mx-10 max-w-2xl px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-secondary/35 bg-white/95 sm:bg-warm-ivory/60 focus-within:border-accent-gold focus-within:bg-white shadow-xs transition-all duration-300"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold shrink-0 mr-2 sm:mr-3 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                <path
                  d="m21 21-4.35-4.35"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search botanical skincare, rituals..."
                className="w-full bg-transparent text-primary text-base sm:text-sm md:text-base font-primary placeholder:text-primary/45 focus:outline-none tracking-wide"
              />

              {isSearchPending && (
                <div
                  aria-label="Searching"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mr-2 shrink-0"
                />
              )}

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear query"
                  className="p-1 text-primary/40 hover:text-primary transition-colors cursor-pointer mr-0.5"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </form>

            {/* Spacer matching right Close button on mobile and all icons on desktop */}
            <div className="shrink-0 w-8 sm:w-32 md:w-40 pointer-events-none" />
          </div>
        </div>

        {/* ── BORDER DIRECTLY BELOW SEARCH BAR ── */}
        <div className="w-full px-3 sm:px-8 lg:px-[5vw]">
          <div className="w-full border-b border-[#ECE4DA]" />
        </div>
      </div>

      {/* ── DROPDOWN PANEL: Drops down smoothly below the navbar ── */}
      <div
        className={`absolute left-0 right-0 top-full bg-[#F7F5F1] shadow-xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "max-h-[calc(100dvh-3.75rem)] sm:max-h-[85vh] opacity-100 py-4 sm:py-8 border-b border-secondary/25"
            : "max-h-0 opacity-0 pointer-events-none py-0 border-b-0"
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-[5vw] overflow-y-auto max-h-[calc(100dvh-5.5rem)] sm:max-h-[75vh] overscroll-contain pb-8">
          {/* Suggested Quick Tags (Always accessible for rapid tap search) */}
          <div className="mb-4 sm:mb-6">
            <span className="block font-primary text-[10px] sm:text-xs tracking-[0.15em] uppercase text-primary/50 font-medium mb-2">
              Popular Searches
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0">
              {POPULAR_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className={`shrink-0 px-3 py-1 sm:py-1.5 rounded-full text-xs font-primary transition-all duration-200 cursor-pointer ${
                    query === tag
                      ? "bg-primary text-white border border-primary"
                      : "bg-white/80 hover:bg-white text-primary/80 hover:text-primary border border-secondary/25 hover:border-accent-gold"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* STATE 1: No Query -> Popular Products */}
          {!query.trim() && (
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center justify-between pb-1 border-b border-secondary/20">
                <h3 className="font-antessa capitalize font-normal text-lg sm:text-2xl md:text-3xl text-primary">
                  Popular Botanical Formulations
                </h3>
              </div>

              {isHomeLoading && popularList.length === 0 ? (
                <div className="py-8 flex justify-center items-center text-primary/50 text-xs font-primary">
                  <div className="w-4 h-4 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mr-2" />
                  Loading popular formulations...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
                  {popularList.slice(0, 8).map((item) => (
                    <SearchProductCard
                      key={item._id}
                      product={toCardProduct(item)}
                      onSelect={onClose}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STATE 2: Query Typed -> Live Instant Search Results */}
          {query.trim() && (
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-4 pb-2 border-b border-secondary/20">
                <h3 className="font-antessa uppercase font-normal text-base sm:text-xl md:text-2xl text-primary">
                  {isSearchPending
                    ? "Searching catalog..."
                    : `Results for "${debouncedQuery}" (${searchResults.length})`}
                </h3>
                {searchResults.length > 0 && (
                  <Link
                    href={`/product?search=${encodeURIComponent(debouncedQuery)}`}
                    onClick={onClose}
                    className="text-[11px] sm:text-xs text-accent-gold hover:text-primary font-primary uppercase tracking-wider transition-colors shrink-0"
                  >
                    View all in collection →
                  </Link>
                )}
              </div>

              {isSearchPending ? (
                <div className="py-10 flex justify-center items-center text-primary/50 text-xs font-primary">
                  <div className="w-4 h-4 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mr-2.5" />
                  Searching formulations...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
                  {searchResults.map((item) => (
                    <SearchProductCard
                      key={item._id}
                      product={toCardProduct(item)}
                      onSelect={onClose}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center flex flex-col items-center">
                  <p className="font-primary text-sm text-primary/80 mb-1">
                    No botanical formulations found for &ldquo;{debouncedQuery}
                    &rdquo;.
                  </p>
                  <p className="font-primary text-xs text-primary/50">
                    Try searching for ingredients like Aloe, Neem, or categories
                    like Serums.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── BOTTOM BORDER (Matching search bar width) ── */}
        <div className="w-full px-4 sm:px-8 lg:px-[5vw] pt-2 sm:pt-3">
          <div className="w-full border-b border-[#ECE4DA]" />
        </div>
      </div>
    </>
  );
}
