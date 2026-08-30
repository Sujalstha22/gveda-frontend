'use client';

import React, { useCallback, useSyncExternalStore } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ProductCard from '@/features/product/components/ProductCard';
import { useHomepage } from '../hooks';
import { toCardProduct } from '@/features/product';


export default function Featured() {
    const { data } = useHomepage();
    const bestsellers = (data?.results?.popularProducts ?? []).map(toCardProduct);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const subscribe = useCallback(
        (callback: () => void) => {
            if (!emblaApi) return () => { };
            emblaApi.on('select', callback);
            emblaApi.on('reInit', callback);
            return () => {
                emblaApi.off('select', callback);
                emblaApi.off('reInit', callback);
            };
        },
        [emblaApi]
    );

    const canScrollPrev = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? emblaApi.canScrollPrev() : false),
        () => false
    );

    const canScrollNext = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? emblaApi.canScrollNext() : false),
        () => false
    );

    return (
        <section
            aria-label="Bestsellers Section"
            className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none bg-secondary/20"
        >
            <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
                {/* ── Center Header: Title ── */}
                <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-[3vw] w-full lg:max-w-[55vw] mx-auto">
                    <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw]">
                        Most Loved
                    </span>
                    <h2 className="font-primary font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.1] text-primary">
                        Bestsellers
                    </h2>
                    <p className="font-primary font-normal text-sm sm:text-base lg:text-[0.9vw] lg:leading-[1.6] text-primary/75 w-full max-w-lg lg:max-w-none mt-3 sm:mt-4 lg:mt-[0.8vw] leading-relaxed">
                        Thoughtfully crafted botanical formulations powered by clinical science to nourish, protect, and restore your skin’s natural barrier.
                    </p>
                </div>

                {/* ── Full Width Carousel Container ── */}
                <div className="relative w-full">
                    {/* Left Arrow Button */}
                    <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        aria-label="Previous product"
                        className="absolute -left-2 sm:-left-2 lg:-left-[1.6vw] top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 lg:w-[2.8vw] lg:h-[2.8vw] rounded-full flex items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-white hover:border-black/30 hover:scale-105 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    >
                        <span className="text-lg sm:text-xl lg:text-[1.2vw] font-light leading-none -translate-x-px">←</span>
                    </button>

                    {/* Right Arrow Button */}
                    <button
                        type="button"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        aria-label="Next product"
                        className="absolute -right-2 sm:-right-2 lg:-right-[1.6vw] top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 lg:w-[2.8vw] lg:h-[2.8vw] rounded-full flex items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-white hover:border-black/30 hover:scale-105 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    >
                        <span className="text-lg sm:text-xl lg:text-[1.2vw] font-light leading-none translate-x-px">→</span>
                    </button>

                    {/* Embla Carousel Viewport */}
                    <div
                        ref={emblaRef}
                        className="overflow-hidden w-full max-w-[88vw] sm:max-w-none mx-auto cursor-grab active:cursor-grabbing"
                    >
                        <div className="flex gap-4 sm:gap-6 lg:gap-[1.5vw]">
                            {bestsellers.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex-[0_0_100%] sm:flex-[0_0_46%] md:flex-[0_0_32%] lg:flex-[0_0_23.5%] min-w-0"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}