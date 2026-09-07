'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useHomepage } from '@/features/home/hooks';
import { useProducts, toCardProduct } from '@/features/product';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCH_TAGS = [
  'Botanical Serum',
  'Hydrating Cleanser',
  'Daily Moisturizer',
  'Facial Oil',
  'Eye Elixir',
  'Vitamin C',
  'Night Cream',
  'Barrier Restore',
  'Sun Protection',
  'Herbal Essence',
];

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search input to prevent rapid refetches
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 280);
    return () => clearTimeout(handler);
  }, [query]);

  // Home page popular products (from first page)
  const { data: homeData, isLoading: isHomeLoading } = useHomepage();
  const popularRaw = homeData?.results?.popularProducts ?? [];

  // Fallback products if home popular is empty
  const { data: fallbackData } = useProducts({ pageSize: 8 });
  const fallbackRaw = fallbackData?.results ?? [];

  const popularList = (popularRaw.length > 0 ? popularRaw : fallbackRaw).slice(0, 8);

  // Active search query results
  const { data: searchData, isLoading: isSearching } = useProducts({
    search: debouncedQuery || undefined,
    pageSize: 8,
  });

  const searchResults = searchData?.results ?? [];

  // Focus input when opened & lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setQuery('');
        setDebouncedQuery('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/product?search=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectProduct = (slug: string) => {
    onClose();
    router.push(`/product/${slug}`);
  };

  return (
    <>
      {/* ── TOP INPUT BAR: Seamlessly occupies the navbar header row ── */}
      <div
        className={`absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 visible pointer-events-auto translate-y-0'
            : 'opacity-0 invisible pointer-events-none translate-y-1.5'
        }`}
      >
        <div className="w-full flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-[5vw] flex items-center justify-between">
            <form onSubmit={handleSubmit} className="flex-1 flex items-center mr-3 sm:mr-4">
              <svg
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-accent-gold shrink-0 mr-3 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                <path d="m21 21-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search botanical skincare, ingredients, rituals..."
                className="w-full bg-transparent text-primary text-sm sm:text-base lg:text-lg font-primary placeholder:text-primary/40 focus:outline-none tracking-wide"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear query"
                  className="p-1 text-primary/40 hover:text-primary transition-colors cursor-pointer mr-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="h-8 px-3 sm:px-3.5 rounded-full border border-black/15 hover:border-accent-gold hover:text-accent-gold text-primary text-[11px] uppercase tracking-widest font-primary font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <span>CLOSE</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── BORDER DIRECTLY BELOW SEARCH BAR (Same width as search bar) ── */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-[5vw]">
          <div className="w-full border-b border-[#ECE4DA]" />
        </div>
      </div>

      {/* ── DROPDOWN PANEL: Drops down smoothly below the navbar ── */}
      <div
        className={`absolute left-0 right-0 top-full bg-[#F7F5F1] shadow-xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'max-h-[85vh] opacity-100 py-6 sm:py-8'
            : 'max-h-0 opacity-0 pointer-events-none py-0'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-[5vw] overflow-y-auto max-h-[75vh]">
          {/* STATE 1: No Query -> Popular Searches + Popular Products From First Page */}
          {!query.trim() && (
            <div className="flex flex-col gap-6 sm:gap-7">
              {/* Popular Searches Pills */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[11px] uppercase tracking-[0.2em] text-accent-gold font-primary font-semibold">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-primary text-primary/80 bg-white border border-secondary/30 hover:border-accent-gold hover:text-primary hover:bg-black/5 transition-all cursor-pointer shadow-2xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Products From First / Home Page */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-accent-gold font-primary font-semibold">
                    Popular Botanical Formulations
                  </span>
                  <Link
                    href="/product"
                    onClick={onClose}
                    className="text-xs text-primary/70 hover:text-accent-gold font-primary uppercase tracking-wider transition-colors"
                  >
                    Explore Catalog →
                  </Link>
                </div>

                {isHomeLoading && popularList.length === 0 ? (
                  <div className="py-8 flex justify-center items-center text-primary/50 text-xs font-primary">
                    <div className="w-4 h-4 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mr-2" />
                    Loading popular formulations...
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {popularList.slice(0, 4).map((item) => {
                      const card = toCardProduct(item);
                      return (
                        <div
                          key={item._id}
                          onClick={() => handleSelectProduct(item.slug)}
                          className="group flex flex-col p-3 rounded-lg bg-white border border-secondary/25 hover:border-accent-gold transition-all duration-300 cursor-pointer shadow-2xs"
                        >
                          <div className="relative w-full aspect-square rounded-md overflow-hidden bg-warm-ivory mb-2.5">
                            <Image
                              src={card.image}
                              alt={card.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <span className="text-[10px] uppercase tracking-wider text-accent-gold font-medium truncate">
                            {item.brand || card.category || 'GVEDA'}
                          </span>
                          <h4 className="font-primary text-xs sm:text-sm font-medium text-primary group-hover:text-accent-gold transition-colors truncate mt-0.5">
                            {card.name}
                          </h4>
                          {item.price ? (
                            <span className="text-xs font-semibold text-primary/80 mt-1">
                              ${item.price.toFixed(2)}
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STATE 2: Query Typed -> Live Instant Search Results */}
          {query.trim() && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-accent-gold font-primary font-semibold">
                  {isSearching
                    ? 'Searching catalog...'
                    : `Results for "${debouncedQuery}" (${searchResults.length})`}
                </span>
                {searchResults.length > 0 && (
                  <Link
                    href={`/product?search=${encodeURIComponent(debouncedQuery)}`}
                    onClick={onClose}
                    className="text-xs text-primary/70 hover:text-accent-gold font-primary uppercase tracking-wider transition-colors"
                  >
                    View all in collection →
                  </Link>
                )}
              </div>

              {isSearching ? (
                <div className="py-12 flex justify-center items-center text-primary/50 text-xs font-primary">
                  <div className="w-5 h-5 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mr-3" />
                  Searching formulations...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2 -mx-0.5 px-0.5">
                  {searchResults.map((item) => {
                    const card = toCardProduct(item);
                    return (
                      <div
                        key={item._id}
                        onClick={() => handleSelectProduct(item.slug)}
                        className="group flex flex-col p-3 rounded-lg bg-white border border-secondary/25 hover:border-accent-gold transition-all duration-300 cursor-pointer shadow-2xs w-[44vw] sm:w-[28vw] md:w-[22vw] lg:w-[calc(25%-12px)] shrink-0"
                      >
                        <div className="relative w-full aspect-square rounded-md overflow-hidden bg-warm-ivory mb-2.5">
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 25vw, 20vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-accent-gold font-medium truncate">
                          {item.brand || card.category || 'GVEDA'}
                        </span>
                        <h4 className="font-primary text-xs sm:text-sm font-medium text-primary group-hover:text-accent-gold transition-colors truncate mt-0.5">
                          {card.name}
                        </h4>
                        {item.price ? (
                          <span className="text-xs font-semibold text-primary/80 mt-1">
                            ${item.price.toFixed(2)}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center flex flex-col items-center">
                  <p className="font-primary text-sm text-primary/80 mb-1">
                    No botanical formulations found for &ldquo;{debouncedQuery}&rdquo;.
                  </p>
                  <p className="font-primary text-xs text-primary/50">
                    Try searching for ingredients like Aloe, Neem, or categories like Serums.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── BOTTOM BORDER (Matching search bar width) ── */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-[5vw] pt-2 sm:pt-3">
          <div className="w-full border-b border-[#ECE4DA]" />
        </div>
      </div>
    </>
  );
}
