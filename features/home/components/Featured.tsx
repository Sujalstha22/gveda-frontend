"use client";

import React, { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "@/features/product/components/ProductCard";
import Title from "@/shared/ui/Title";
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
        <Title
          eyebrow="Most Loved"
          title="Our Botanical Bestsellers"
          description="Thoughtfully crafted botanical formulations powered by clinical science to nourish, protect, and restore your skin's natural barrier."
        />

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
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full bg-accent-gold hover:bg-[#A88D6D] border border-accent-gold/80 flex items-center justify-center text-soft-white transition-all duration-300 cursor-pointer active:scale-95 shadow-md hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-accent-gold disabled:active:scale-100 shrink-0"
              >
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-[1vw] lg:h-[1vw] -translate-x-px text-soft-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
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
                        ? "w-7 lg:w-[1.8vw] bg-accent-gold"
                        : "w-2 lg:w-[0.4vw] bg-primary/20 hover:bg-accent-gold/50"
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
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full bg-accent-gold hover:bg-[#A88D6D] border border-accent-gold/80 flex items-center justify-center text-soft-white transition-all duration-300 cursor-pointer active:scale-95 shadow-md hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-accent-gold disabled:active:scale-100 shrink-0"
              >
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-[1vw] lg:h-[1vw] translate-x-px text-soft-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
