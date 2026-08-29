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
            className="relative w-full py-18 sm:py-24  overflow-hidden select-none bg-secondary/20"
        >
            <div className="w-full px-4 sm:px-8 lg:px-12">
                {/* ── Center Header: Title ── */}
                <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
                    <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal mb-1">
                        Most Loved
                    </span>
                    <h2 className=" text-4xl sm:text-5xl  text-primary font-medium ">
                        Bestsellers
                    </h2>
                    <p className="font-primary font-normal text-sm sm:text-base text-primary/75 max-w-lg mt-3 sm:mt-4 leading-relaxed">
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
                        className="absolute -left-2 sm:left-0 lg:-left-8 top-[46%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-white hover:border-black/30 hover:scale-105 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    >
                        <span className="text-xl sm:text-2xl font-light leading-none -translate-x-px">←</span>
                    </button>

                    {/* Right Arrow Button */}
                    <button
                        type="button"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        aria-label="Next product"
                        className="absolute -right-2 sm:right-0 lg:-right-10 top-[46%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-white hover:border-black/30 hover:scale-105 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    >
                        <span className="text-xl sm:text-2xl font-light leading-none translate-x-px">→</span>
                    </button>

                    {/* Embla Carousel Viewport */}
                    <div
                        ref={emblaRef}
                        className="overflow-hidden max-w-[90vw] mx-auto cursor-grab active:cursor-grabbing px-2 sm:px-4"
                    >
                        <div className="flex gap-5 sm:gap-6 lg:gap-8">
                            {bestsellers.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex-[0_0_82%] sm:flex-[0_0_46%] md:flex-[0_0_32%] lg:flex-[0_0_26%] min-w-0"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Centered See All CTA Button ── */}
                {/* <div className="flex justify-center mt-10 sm:mt-14">
                    <Link
                        href="/product"
                        className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-primary/40 hover:border-primary text-xs sm:text-sm font-primary font-medium tracking-[0.14em] uppercase text-primary transition-all duration-300 hover:bg-primary hover:text-warm-ivory"
                    >
                        <span>See all</span>
                        <span
                            aria-hidden="true"
                            className="transform transition-transform duration-300 group-hover:translate-x-1 font-sans text-sm sm:text-base"
                        >
                            →
                        </span>
                    </Link>
                </div> */}
            </div>
        </section>
    );
}