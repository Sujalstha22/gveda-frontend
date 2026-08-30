'use client';

import React, { useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

interface TestimonialItem {
    id: number;
    name: string;
    role: string;
    product: string;
    quote: string;
    avatar: string;
    rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
    {
        id: 1,
        name: 'Olivia Wilson',
        role: 'Verified Buyer',
        product: 'Niacinamide Face Wash',
        quote:
            '“ I can’t say enough good things about the Niacinamide Face Wash. It balanced my skin without stripping moisture and left my complexion calm, clear, and glowing naturally every morning. ”',
        avatar: '/images/home/try1.png',
        rating: 5,
    },
    {
        id: 2,
        name: 'Sophia Bennett',
        role: 'Verified Buyer',
        product: 'Retinol C Face Toner',
        quote:
            '“ The Retinol C Toner is gentle yet so effective. The rose water infusion gives an instant soothing hydration boost, and my skin texture has smoothed out noticeably within just two weeks. ”',
        avatar: '/images/home/abt.jpeg',
        rating: 5,
    },
    {
        id: 3,
        name: 'Elena Rostova',
        role: 'Verified Buyer',
        product: 'Nourishing Hair Conditioner',
        quote:
            '“ Pure botanical perfection. The almond and jojoba oil blend detangles my dry ends without heavy buildup. My hair feels incredibly silky and looks luminous in natural light. ”',
        avatar: '/images/home/hero-1.jpeg',
        rating: 5,
    },
    {
        id: 4,
        name: 'Maya Chen',
        role: 'Verified Buyer',
        product: 'Shea Butter Body Lotion',
        quote:
            '“ Deep cellular moisture that truly lasts all day. It absorbs seamlessly into the skin with zero greasiness, making my post-shower botanical ritual feel like a luxury spa experience. ”',
        avatar: '/images/home/our-story.jpg',
        rating: 5,
    },
    {
        id: 5,
        name: 'Aria Sharma',
        role: 'Verified Buyer',
        product: 'Keratin Shampoo',
        quote:
            '“ After months of chemical damage, this shampoo restored strength and fullness to my strands. Knowing every ingredient is clean, organic, and ethically sourced gives me total peace of mind. ”',
        avatar: '/images/home/try1.png',
        rating: 5,
    },
];

export default function Testimonial() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        containScroll: 'trimSnaps',
        loop: true,
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
        [emblaApi]
    );

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

    const selectedIndex = useSyncExternalStore(
        subscribe,
        () => (emblaApi ? emblaApi.selectedScrollSnap() : 0),
        () => 0
    );

    return (
        <section
            aria-label="Customer Testimonials"
            className="relative w-full py-16 sm:py-20 lg:py-[5vw] overflow-hidden select-none"
        >
            <div className="w-full px-4 sm:px-8 lg:px-[5vw]">
                {/* ── Section Header ── */}
                <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-[4vw] w-full lg:max-w-[60vw] mx-auto">
                    <span className="font-editorial italic text-2xl sm:text-3xl lg:text-[1.8vw] lg:leading-[1.2] text-accent-gold font-normal mb-1 lg:mb-[0.3vw]">
                        Kind Words
                    </span>
                    <h2 className="font-primary font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] lg:leading-[1.1] text-primary">
                        Stories of Radiance
                    </h2>
                    <p className="font-primary font-normal text-sm sm:text-base lg:text-[0.9vw] lg:leading-[1.6] text-primary/75 w-full max-w-2xl lg:max-w-none mt-3 sm:mt-4 lg:mt-[0.8vw] leading-relaxed">
                        Thoughtful reflections from those who have embraced our daily botanical science rituals.
                    </p>
                </div>

                {/* ── Carousel Container ── */}
                <div className="relative w-full">
                    {/* Left Arrow Button */}
                    <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        aria-label="Previous testimonial"
                        className="hidden md:flex absolute -left-4 lg:left-[-3vw] top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-[2.8vw] lg:h-[2.8vw] rounded-full items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-white hover:border-black/30 hover:scale-105 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <span className="text-xl lg:text-[1.2vw] font-light leading-none -translate-x-px">←</span>
                    </button>

                    {/* Right Arrow Button */}
                    <button
                        type="button"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        aria-label="Next testimonial"
                        className="hidden md:flex absolute -right-4 lg:right-[-3vw] top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-[2.8vw] lg:h-[2.8vw] rounded-full items-center justify-center bg-white/95 backdrop-blur-sm border border-black/10 text-primary shadow-subtle hover:bg-white hover:border-black/30 hover:scale-105 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <span className="text-xl lg:text-[1.2vw] font-light leading-none translate-x-px">→</span>
                    </button>

                    {/* Embla Viewport */}
                    <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing px-1 sm:px-2">
                        <div className="flex -ml-4 sm:-ml-6 lg:ml-[-2vw] pt-14 sm:pt-16 lg:pt-[3.5vw] pb-8 lg:pb-[2vw]">
                            {TESTIMONIALS.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex-[0_0_100%] sm:flex-[0_0_55%] md:flex-[0_0_46%] lg:flex-[0_0_34%] min-w-0 pl-4 sm:pl-6 lg:pl-[2vw]"
                                >
                                    {/* Testimonial Card */}
                                    <div
                                        onClick={() => scrollTo(index)}
                                        className={`relative bg-white/95 rounded-3xl lg:rounded-[1.2vw] border border-black/5 p-6 pt-14 sm:p-8 sm:pt-16 lg:p-[1.8vw] lg:pt-[3vw] flex flex-col items-center text-center transition-all duration-500 cursor-pointer h-full justify-between  ${selectedIndex === index
                                            ? 'border-black/10 scale-[1.03] '
                                            : 'opacity-85 hover:opacity-100'
                                            }`}
                                    >
                                        {/* Overlapping Top Circular Avatar */}
                                        <div className="absolute -top-10 sm:-top-12 lg:top-[-3vw] left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 lg:w-[6vw] lg:h-[6vw] rounded-full border-4 lg:border-[0.22vw] border-white overflow-hidden bg-secondary/20 shadow-xs">
                                            <Image
                                                src={item.avatar}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 6vw"
                                                className="object-cover object-center"
                                            />
                                        </div>

                                        {/* Quote Text */}
                                        <p className="font-primary font-normal text-xs sm:text-sm lg:text-[0.9vw] lg:leading-[1.7] text-primary/75 leading-relaxed mt-2 lg:mt-[0.5vw] line-clamp-4">
                                            {item.quote}
                                        </p>

                                        {/* Author & Rating Footer */}
                                        <div className="flex flex-col items-center mt-6 lg:mt-[1.4vw] pt-4 lg:pt-[1vw] border-t border-black/5 w-full">
                                            <h3 className="font-primary font-medium text-lg sm:text-xl lg:text-[1.4vw] text-primary">
                                                {item.name}
                                            </h3>

                                            {/* Star Rating */}
                                            <div
                                                className="flex items-center justify-center gap-1.5 lg:gap-[0.3vw] mt-2 lg:mt-[0.4vw] text-accent-gold text-sm sm:text-base lg:text-[1vw]"
                                                aria-label={`${item.rating} out of 5 stars`}
                                            >
                                                {Array.from({ length: item.rating }).map((_, i) => (
                                                    <span key={i} className="leading-none">
                                                        ★
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Product Tag */}
                                            <span className="font-primary text-[0.7rem] sm:text-xs lg:text-[0.8vw] uppercase tracking-wider text-muted mt-2 lg:mt-[0.4vw]">
                                                {item.product}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex items-center justify-center gap-2 lg:gap-[0.5vw] mt-6 lg:mt-[1.8vw]">
                        {TESTIMONIALS.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                                className={`h-2 lg:h-[0.4vw] rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === index
                                    ? 'w-7 lg:w-[1.8vw] bg-primary'
                                    : 'w-2 lg:w-[0.4vw] bg-primary/20 hover:bg-primary/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}