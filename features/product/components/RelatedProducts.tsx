"use client";

import React, { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useProductsByCategory, toCardProduct } from '..';
import ProductCard from './ProductCard';
import Title from '@/shared/ui/Title';

interface RelatedProductsProps {
    currentProductSlug: string;
    categorySlug: string;
}

export default function RelatedProducts({ currentProductSlug, categorySlug }: RelatedProductsProps) {
    const { data } = useProductsByCategory(categorySlug);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

    const allRelated = (data?.results ?? []).filter(
        (p) => p.slug !== currentProductSlug
    );

    // Embla Carousel Setup: Strict 1-card snap per drag/swipe
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        startIndex: 0,
        containScroll: 'trimSnaps',
        dragFree: false,
        skipSnaps: false,
        loop: false,
    });

    // Ensure carousel always starts at the beginning on load or category change
    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0, true);
        }
    }, [emblaApi, currentProductSlug, allRelated.length]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const subscribe = useCallback(
        (callback: () => void) => {
            if (!emblaApi) return () => {};
            emblaApi.on('select', callback);
            emblaApi.on('reInit', callback);
            emblaApi.on('scroll', callback);
            return () => {
                emblaApi.off('select', callback);
                emblaApi.off('reInit', callback);
                emblaApi.off('scroll', callback);
            };
        },
        [emblaApi]
    );

    const scrollProgress = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? Math.max(0, Math.min(1, emblaApi.scrollProgress())) : 0),
        () => 0
    );

    const canScrollPrev = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? emblaApi.canScrollPrev() : false),
        () => false
    );

    const canScrollNext = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? emblaApi.canScrollNext() : true),
        () => true
    );

    // Smooth marquee autoplay movement that pauses on hover / interaction
    useEffect(() => {
        if (!emblaApi || isPaused) {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
            return;
        }

        autoplayTimerRef.current = setInterval(() => {
            if (emblaApi) {
                if (emblaApi.canScrollNext()) {
                    emblaApi.scrollNext();
                } else {
                    // Loop back smoothly to start
                    emblaApi.scrollTo(0);
                }
            }
        }, 3500);

        return () => {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        };
    }, [emblaApi, isPaused]);

    if (allRelated.length === 0) return null;

    return (
        <section
            id="related-products-section"
            aria-label="Related Products Carousel"
            className="w-full pt-16 sm:pt-20 lg:pt-[5vw] select-none"
        >
            <div className="w-full">
                {/* ── Top Header with Title and Side Controls ── */}
                <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 lg:mb-10">
                    <Title
                        eyebrow="Complete Your Ritual"
                        title="Related Formulations"
                        className="mb-0"
                    />

                    {/* Navigation Control Buttons (Header Right) */}
                    {allRelated.length > 1 && (
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-auto">
                            <button
                                type="button"
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                aria-label="Previous related products"
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white text-primary flex items-center justify-center transition-all duration-300 hover:border-black/40 hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs hover:shadow-sm"
                            >
                                <svg
                                    className="w-4 h-4 -translate-x-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                aria-label="Next related products"
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white text-primary flex items-center justify-center transition-all duration-300 hover:border-black/40 hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs hover:shadow-sm"
                            >
                                <svg
                                    className="w-4 h-4 translate-x-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Draggable Carousel Stage ── */}
                <div
                    className="relative w-full"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <div
                        ref={emblaRef}
                        className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-2 px-1"
                    >
                        <div className="grid grid-flow-col auto-cols-[85%] min-[480px]:auto-cols-[65%] sm:auto-cols-[45%] md:auto-cols-[32%] lg:auto-cols-[24%] gap-4">
                            {allRelated.map((product) => (
                                <div key={product._id} className="min-w-0 h-full flex flex-col">
                                    <ProductCard product={toCardProduct(product)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Progress Indicator Bar ── */}
                    {allRelated.length > 3 && (
                        <div className="w-full flex items-center justify-between mt-6 sm:mt-8 px-1">
                            <div className="relative w-28 sm:w-40 h-[2px] bg-black/15 rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 bottom-0 bg-primary transition-all duration-150 ease-out rounded-full"
                                    style={{
                                        width: '35%',
                                        left: `${scrollProgress * 65}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
