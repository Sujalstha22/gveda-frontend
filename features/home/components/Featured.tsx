"use client";

import React, { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "@/features/product/components/ProductCard";
import { useHomepage } from "../hooks";
import { toCardProduct } from "@/features/product";

export default function Featured() {
  const { data } = useHomepage();
  const bestsellers = (data?.results?.popularProducts ?? []).map(toCardProduct);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const subscribe = useCallback(
    (callback: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", callback);
      emblaApi.on("reInit", callback);
      return () => {
        emblaApi.off("select", callback);
        emblaApi.off("reInit", callback);
      };
    },
    [emblaApi],
  );

  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => (emblaApi ? emblaApi.canScrollPrev() : false),
    () => false,
  );

  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => (emblaApi ? emblaApi.canScrollNext() : false),
    () => false,
  );

  const selectedIndex = useSyncExternalStore(
    subscribe,
    () => (emblaApi ? emblaApi.selectedScrollSnap() : 0),
    () => 0,
  );

  return (
    <section
      aria-label="Bestsellers Section"
      className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none bg-secondary/20"
    >
      <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
        {/* ── Center Header: Title ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-[3vw] w-full lg:max-w-[55vw] mx-auto">
          <span className="font-madison italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw]">
            Most Loved
          </span>
          <h2 className="font-antessa font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.15] text-primary">
            Our Botanical Bestsellers
          </h2>
          <p className="font-primary font-normal text-base sm:text-lg lg:text-[1.2vw] lg:leading-[1.65] text-primary/80 w-full max-w-xl lg:max-w-[44vw] mt-3 sm:mt-4 lg:mt-[0.9vw] leading-relaxed">
            Thoughtfully crafted botanical formulations powered by clinical
            science to nourish, protect, and restore your skin's natural
            barrier.
          </p>
        </div>

        {/* ── Full Width Carousel Container ── */}
        <div className="relative w-full">
          {/* Embla Carousel Viewport */}
          <div
            ref={emblaRef}
            className="overflow-hidden w-full cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-4 sm:gap-6 lg:gap-[1.5vw]">
              {bestsellers.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_46%] md:flex-[0_0_32%] lg:flex-[0_0_23.5%] min-w-0 flex flex-col"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Carousel Bottom Controls (< Dots >) ── */}
          {bestsellers.length > 1 && (
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-[2.5vw]">
              {/* Left Arrow Button (<) */}
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous products"
                className="w-9 h-9 sm:w-11 sm:h-11 lg:w-[2.6vw] lg:h-[2.6vw] rounded-full flex items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-white/95 disabled:hover:text-primary disabled:hover:border-black/10 cursor-pointer shrink-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-[1vw] lg:h-[1vw] -translate-x-px"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div
                className="flex items-center gap-2 lg:gap-[0.5vw]"
                role="tablist"
                aria-label="Bestsellers carousel pagination"
              >
                {bestsellers.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={selectedIndex === index ? "true" : undefined}
                    className={`h-2 lg:h-[0.4vw] rounded-full transition-all duration-300 cursor-pointer ${
                      selectedIndex === index
                        ? "w-7 lg:w-[1.8vw] bg-primary"
                        : "w-2 lg:w-[0.4vw] bg-primary/20 hover:bg-primary/45"
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow Button (>) */}
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next products"
                className="w-9 h-9 sm:w-11 sm:h-11 lg:w-[2.6vw] lg:h-[2.6vw] rounded-full flex items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-white/95 disabled:hover:text-primary disabled:hover:border-black/10 cursor-pointer shrink-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-[1vw] lg:h-[1vw] translate-x-px"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
