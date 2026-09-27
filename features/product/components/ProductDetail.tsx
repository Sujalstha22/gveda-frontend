'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useProduct } from '../hooks';
import { staticUrl } from '@/shared/api';
import RelatedProducts from './RelatedProducts';
import { useCart } from '@/shared/context/CartContext';

/* ── Tab Definitions & Content ── */
const TABS = [
    'Description',
    'Active Botanicals',
    'Ritual & Application',
    'Clinical Science',
] as const;
type Tab = (typeof TABS)[number];

/* ── Bottle Volume Configuration for Dynamic Pricing ── */
export interface VolumeOption {
    id: string;
    label: string;       // e.g. "300 ml"
    volume: string;      // e.g. "300 ml / 10.1 fl. oz."
    multiplier: number;  // Multiplier for price scaling
}

const VOLUME_OPTIONS: VolumeOption[] = [
    { id: '300ml', label: '300 ml', volume: '300 ml / 10.1 fl. oz.', multiplier: 1.0 },
    { id: '450ml', label: '450 ml', volume: '450 ml / 15.2 fl. oz.', multiplier: 1.45 },
    { id: '600ml', label: '600 ml', volume: '600 ml / 20.3 fl. oz.', multiplier: 1.85 },
];

const SUITABILITY_ITEMS = [
    {
        name: 'Sensitive & Reactive Skin',
        note: 'Hypoallergenic lipid matrix calms redness and reactive flares.',
        icon: (
            <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c3.5 0 6-2.5 6-6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18c-3.5 0-6-2.5-6-6" />
            </svg>
        ),
    },
    {
        name: 'Barrier-Compromised Skin',
        note: 'Bio-identical ceramides and plant squalane repair damaged barriers.',
        icon: (
            <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
        ),
    },
    {
        name: 'Dehydrated & Dry Skin',
        note: 'Multi-depth cellular hydration locks moisture for up to 48 hours.',
        icon: (
            <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.25 7.5-7.5 11.25-7.5 14.25a7.5 7.5 0 0 0 15 0c0-3-2.25-6.75-7.5-14.25Z" />
            </svg>
        ),
    },
    {
        name: 'Normal to Combination Skin',
        note: 'Regulates sebum naturally without pore-clogging heavy residues.',
        icon: (
            <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-8-5 4-7 4 7H4Zm12 0 4-7 4 7h-8ZM4 18h16" />
            </svg>
        ),
    },
    {
        name: 'Environmental Stress / City Living',
        note: 'Potent polyphenols neutralize free radicals and urban pollution.',
        icon: (
            <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
        ),
    },
];

const RITUAL_GAUGES = [
    { label: 'Nourish', score: '6 / 6' },
    { label: 'Protect', score: '6 / 6' },
    { label: 'Restore', score: '6 / 6' },
    { label: 'Balance', score: '5 / 6' },
];

const BOTANICAL_FEATURES = [
    'Cold-pressed whole-plant extraction to preserve living cellular vitality',
    '100% biocompatible lipid matrix matching skin’s natural lipid bilayer',
    'Free from parabens, phthalates, synthetic fragrance, sulfates, and mineral oils',
    'Rich in omega-3, 6, 9 fatty acids, botanical squalane, and active vitamin E',
    'Housed in UV-protective amber recyclable glass to prevent photo-oxidation',
    'Formulated and dermatologically evaluated for modern sensitive skin',
];

export default function ProductDetail({ slug }: { slug: string }) {
    const { data, isLoading, isError } = useProduct(slug);
    const product = data?.results;
    const { addToCart } = useCart();

    const visibleTabs = TABS.filter((tab) => slug !== 'hair-growth-oil' || tab !== 'Description');
    const [selectedTab, setActiveTab] = useState<Tab>('Description');
    const activeTab = visibleTabs.includes(selectedTab) ? selectedTab : visibleTabs[0];

    // Dynamic Volume & Price State
    const [selectedVolumeOption, setSelectedVolumeOption] = useState<VolumeOption>(VOLUME_OPTIONS[0]);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number>(0);
    const [copied, setCopied] = useState<boolean>(false);

    // Expandable Accordions State (All closed by default)
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
        suitability: false,
        matrix: false,
        botanicals: false,
        standards: false,
        delivery: false,
    });

    const toggleAccordion = (key: string) => {
        setOpenAccordions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    /* ── Product Images Extractor ── */
    const images = useMemo(() => {
        if (!product) return ['/images/product/product1.jpeg'];
        const list = (product.images ?? [])
            .map((img) => staticUrl(img.name))
            .filter(Boolean) as string[];
        return list.length > 0 ? Array.from(new Set(list)) : ['/images/product/product1.jpeg'];
    }, [product]);

    /* ── Embla Carousel Setup ── */
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        startIndex: 0,
        containScroll: 'trimSnaps',
        duration: 25,
        skipSnaps: false,
    });

    const [prevSlug, setPrevSlug] = useState(slug);
    if (prevSlug !== slug) {
        setPrevSlug(slug);
        setActiveImageIndex(0);
    }

    // Ensure gallery always starts at the first image on load or product change
    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0, true);
        }
    }, [emblaApi, slug]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setActiveImageIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    const selectThumbnail = (index: number) => {
        setActiveImageIndex(index);
        if (emblaApi) emblaApi.scrollTo(index);
    };

    const nextImage = () => {
        if (emblaApi) emblaApi.scrollNext();
        else if (images.length > 0) setActiveImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        if (emblaApi) emblaApi.scrollPrev();
        else if (images.length > 0)
            setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    /* ── Fullscreen Lightbox Controls ── */
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const lightboxNext = () => {
        setLightboxIndex((prev) => (prev + 1) % (images.length || 1));
    };

    const lightboxPrev = () => {
        setLightboxIndex((prev) => (prev - 1 + (images.length || 1)) % (images.length || 1));
    };

    useEffect(() => {
        if (!lightboxOpen) return;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % (images.length || 1));
            if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + (images.length || 1)) % (images.length || 1));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen, images.length]);

    /* ── Dynamic Price Calculation ── */
    const basePrice = Number(product?.price || 490);
    const dynamicPrice = Math.round(basePrice * selectedVolumeOption.multiplier);

    const baseComparePrice = product?.comparePrice ? Number(product.comparePrice) : null;
    const dynamicComparePrice = baseComparePrice
        ? Math.round(baseComparePrice * selectedVolumeOption.multiplier)
        : null;
    const hasDiscount = dynamicComparePrice !== null && dynamicComparePrice > dynamicPrice;
    const discountPercentage = hasDiscount
        ? Math.round(((dynamicComparePrice! - dynamicPrice) / dynamicComparePrice!) * 100)
        : null;

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);

        const productName = product?.title || 'Botanical Formulation';
        const mainImage = images.length > 0 ? images[0] : '/images/product/product1.jpeg';

        addToCart({
            id: String(product?._id || slug || productName),
            name: productName,
            price: dynamicPrice,
            image: mainImage,
            category: product?.category?.name || 'Botanical Skincare',
            size: selectedVolumeOption.volume,
            quantity: quantity,
            slug: slug,
        });
    };

    const toggleWishlist = () => {
        setIsSaved((prev) => !prev);
    };

    const handleShare = useCallback(async () => {
        const shareData = {
            title: product?.title ? `${product.title} | GVEDA` : 'GVEDA Botanical Skincare',
            text: product?.description ? product.description.slice(0, 120) + '…' : 'Discover botanical skincare from GVEDA.',
            url: typeof window !== 'undefined' ? window.location.href : '',
        };

        if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if ((err as Error).name === 'AbortError') return;
            }
        }

        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2400);
            } catch {
                // ignore
            }
        }
    }, [product]);

    /* ── Loading Skeleton ── */
    if (isLoading) {
        return (
            <main className="w-full min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-[5vw] select-none bg-background">
                <div className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    <div className="hidden lg:flex w-20 flex-col gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square w-20 rounded-xl animate-pulse bg-secondary/20" />
                        ))}
                    </div>
                    <div className="flex-1 aspect-[4/5] rounded-2xl animate-pulse bg-secondary/20 w-full" />
                    <div className="w-full lg:w-[420px] xl:w-[480px] space-y-6">
                        <div className="h-4 w-1/3 rounded animate-pulse bg-secondary/20" />
                        <div className="h-10 w-3/4 rounded animate-pulse bg-secondary/20" />
                        <div className="h-6 w-1/4 rounded animate-pulse bg-secondary/20" />
                        <div className="h-24 w-full rounded animate-pulse bg-secondary/20" />
                        <div className="h-12 w-full rounded-full animate-pulse bg-secondary/20" />
                    </div>
                </div>
            </main>
        );
    }

    /* ── Error / Not Found ── */
    if (isError || !product) {
        return (
            <main className="w-full min-h-[70vh] flex flex-col items-center justify-center pt-24 pb-20 px-4 select-none bg-background text-center">
                <span className="font-editorial italic text-3xl text-accent-gold mb-2">GVEDA Botanical Archive</span>
                <h1 className="font-primary font-medium text-2xl sm:text-3xl text-primary mb-4">
                    Product Formulation Not Found
                </h1>
                <p className="font-primary font-normal text-sm text-primary/65 mb-8 max-w-md">
                    This formulation may have been rotated or is currently unavailable in our active catalog.
                </p>
                <Link
                    href="/product"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-primary/90 transition-all cursor-pointer"
                >
                    Return to Collection
                </Link>
            </main>
        );
    }

    const rawCategory = product.category?.name;
    const categoryTitle =
        rawCategory && rawCategory.toLowerCase() !== 'gveda'
            ? rawCategory
            : null;

    return (
        <main className="w-full min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-[5vw] bg-background text-primary select-none">

            {/* ── 1. TOP STAGE: Gallery (Left) & Natural Scrolling Purchase Box (Right) ── */}
            <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 pb-14 sm:pb-18 border-b border-secondary/25">

                {/* ── LEFT: Product Gallery (7 Columns) ── */}
                <div className="lg:col-span-7 w-full flex flex-col items-start gap-4 xl:gap-5">
                    {/* Carousel Stage */}
                    <div className="w-full relative">
                        <div
                            ref={emblaRef}
                            className="overflow-hidden w-full cursor-grab active:cursor-grabbing rounded-xl select-none touch-pan-y bg-white border border-secondary/20"
                        >
                            <div className="flex items-stretch h-[360px] sm:h-[450px] lg:h-[480px] xl:h-[520px]">
                                {images.map((src, i) => (
                                    <div
                                        key={src + i}
                                        onClick={() => openLightbox(i)}
                                        className="relative shrink-0 w-full h-full flex items-center justify-center p-8 sm:p-12 select-none cursor-zoom-in group"
                                        title="Click to view full-screen"
                                    >
                                        <Image
                                            src={src}
                                            alt={`${product.title} view ${i + 1}`}
                                            fill
                                            priority={i === 0}
                                            draggable={false}
                                            sizes="(min-width: 1024px) 55vw, 95vw"
                                            className="object-contain p-6 sm:p-10 pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        {/* Zoom Indicator Badge */}
                                        <div className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-background/80 border border-secondary/30 text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs pointer-events-none">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Carousel Arrows */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    aria-label="Previous image"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-secondary/40 backdrop-blur-xs transition-all hover:bg-white hover:border-accent-gold active:scale-95 text-primary cursor-pointer shadow-xs"
                                >
                                    <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    aria-label="Next image"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-secondary/40 backdrop-blur-xs transition-all hover:bg-white hover:border-accent-gold active:scale-95 text-primary cursor-pointer shadow-xs"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="flex w-full gap-3 overflow-x-auto py-1 scrollbar-none">
                            {images.map((src, i) => (
                                <button
                                    key={src + i}
                                    type="button"
                                    onClick={() => selectThumbnail(i)}
                                    aria-label={`View product image ${i + 1}`}
                                    aria-pressed={activeImageIndex === i}
                                    className={`relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer bg-white ${activeImageIndex === i
                                        ? 'border-accent-gold shadow-xs ring-1 ring-accent-gold/40'
                                        : 'border-secondary/30 opacity-70 hover:opacity-100 hover:border-accent-gold/60'
                                        }`}
                                >
                                    <Image src={src} alt="" fill sizes="96px" className="object-contain p-1.5" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Purchasing Options & Dynamic Price (5 Columns - Naturally Scrolled) ── */}
                <div className="lg:col-span-5 w-full flex flex-col gap-6 sm:gap-7">

                    {/* Breadcrumb */}
                    <div className="font-primary text-xs sm:text-sm text-primary/55 flex items-center gap-2 flex-wrap">
                        <Link href="/product" className="hover:text-primary transition-colors">
                            {categoryTitle || 'Products'}
                        </Link>
                        <svg aria-hidden="true" className="h-3 w-3 shrink-0 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-primary font-medium truncate max-w-[200px] sm:max-w-xs">
                            {product.title}
                        </span>
                    </div>

                    {/* Title & Reviews */}
                    <div>
                        <h1 className="font-heading text-3xl sm:text-4xl xl:text-[40px] text-primary font-normal leading-[1.15] tracking-[-0.02em] text-balance">
                            {product.title}
                        </h1>
                        <div className="mt-3 flex items-center gap-3">
                            <span aria-hidden="true" className="flex items-center gap-1 text-secondary">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <svg key={index} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="m12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z" />
                                    </svg>
                                ))}
                            </span>
                            <span className="text-xs text-primary/60 font-primary">Botanical Formulation • In Stock</span>
                        </div>
                    </div>

                    {/* Dynamic Price Display */}
                    <div className="flex flex-wrap items-baseline gap-3 border-b border-secondary/25 pb-6">
                        <span className="text-3xl font-normal text-primary font-heading transition-all duration-300">
                            Rs. {dynamicPrice.toLocaleString()}
                        </span>
                        {hasDiscount && (
                            <>
                                <span className="text-base font-normal text-primary/40 line-through">
                                    Rs. {dynamicComparePrice!.toLocaleString()}
                                </span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-botanical-gold/15 text-primary">
                                    Save {discountPercentage}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Bottle Size Selector (Dynamic Selection) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="uppercase tracking-wider text-primary/70">Select Bottle Size</span>
                            <span className="text-accent-gold font-semibold">{selectedVolumeOption.volume}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                            {VOLUME_OPTIONS.map((opt) => {
                                const isSelected = selectedVolumeOption.id === opt.id;
                                const optPrice = Math.round(basePrice * opt.multiplier);
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setSelectedVolumeOption(opt)}
                                        aria-pressed={isSelected}
                                        className={`py-3 px-2 text-center rounded-lg border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${isSelected
                                            ? 'bg-secondary/15 text-primary border-accent-gold shadow-2xs'
                                            : 'bg-white/80 text-primary/70 border-secondary/35 hover:border-accent-gold hover:bg-white'
                                            }`}
                                    >
                                        <span className="font-primary text-xs sm:text-sm font-semibold">
                                            {opt.label}
                                        </span>
                                        <span className="font-primary text-[11px] text-primary/55 font-medium">
                                            Rs. {optPrice.toLocaleString()}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quantity & CTA Action Buttons */}
                    <div className="space-y-4 pt-1">
                        <div className="flex items-center gap-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-secondary/40 rounded-full bg-white px-3 py-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    aria-label="Decrease quantity"
                                    disabled={quantity === 1}
                                    className="w-6 h-6 flex items-center justify-center text-primary/60 hover:text-primary transition-colors text-sm font-bold cursor-pointer"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center text-xs font-semibold text-primary">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => q + 1)}
                                    aria-label="Increase quantity"
                                    className="w-6 h-6 flex items-center justify-center text-primary/60 hover:text-primary transition-colors text-sm font-bold cursor-pointer"
                                >
                                    +
                                </button>
                            </div>

                            {/* Wishlist Heart Button */}
                            <button
                                type="button"
                                onClick={toggleWishlist}
                                aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                                className={`h-11 w-11 shrink-0 flex items-center justify-center rounded-full border transition-all cursor-pointer ${isSaved
                                    ? 'border-accent-gold bg-secondary/15 text-primary'
                                    : 'border-secondary/40 bg-white text-primary/60 hover:text-primary hover:border-accent-gold'
                                    }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill={isSaved ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>

                            {/* Share Button */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={handleShare}
                                    aria-label="Share product"
                                    title={copied ? 'Link copied!' : 'Share formulation'}
                                    className={`h-11 w-11 shrink-0 flex items-center justify-center rounded-full border transition-all cursor-pointer ${copied
                                        ? 'border-accent-gold bg-secondary/20 text-primary'
                                        : 'border-secondary/40 bg-white text-primary/60 hover:text-primary hover:border-accent-gold'
                                        }`}
                                >
                                    {copied ? (
                                        <svg
                                            className="w-5 h-5 text-accent-gold transition-transform duration-200 scale-110"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="18" cy="5" r="3" />
                                            <circle cx="6" cy="12" r="3" />
                                            <circle cx="18" cy="19" r="3" />
                                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                        </svg>
                                    )}
                                </button>
                                {copied && (
                                    <div
                                        role="status"
                                        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-rich-black text-white text-[10px] tracking-wide font-medium shadow-md pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                                    >
                                        Link copied!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Add to Bag CTA Button */}
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className={`w-full h-14 rounded-full font-primary text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${addedToCart
                                ? 'bg-primary/85 text-white'
                                : 'bg-primary text-white hover:bg-neutral-800 active:scale-[0.99] shadow-xs'
                                }`}
                        >
                            {addedToCart ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Added to Bag
                                </>
                            ) : (
                                `+ Add to Bag `
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* ── 2. EDITORIAL DETAILS & TABS SECTION (Revealed as you scroll down) ── */}
            <div className="mx-auto max-w-[1600px] pt-12 sm:pt-16 space-y-12 sm:space-y-16">

                {/* ── THE TAB BAR ── */}
                <div className="w-full">
                    <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 border-b border-secondary/30 pb-3">
                        {visibleTabs.map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setActiveTab(t)}
                                className={`font-primary text-xs sm:text-sm uppercase tracking-wider transition-all pb-2 border-b-2 cursor-pointer ${activeTab === t
                                    ? 'border-accent-gold text-primary font-semibold'
                                    : 'border-transparent text-primary/50 hover:text-primary'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 text-sm sm:text-base leading-relaxed text-primary/80 font-primary">
                        {activeTab === 'Description' && (
                            <div className="space-y-4">
                                <p className="whitespace-pre-line leading-relaxed">
                                    {product.description ||
                                        'An uncompromising botanical formula designed to harmonize with your skin’s natural biological rhythm. Provides intensive moisture, lipid barrier reinforcement, and continuous environmental defense.'}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                                    <div className="p-4 rounded-lg bg-white border border-secondary/25">
                                        <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-1">
                                            Texture Profile
                                        </span>
                                        <span className="text-sm font-medium text-primary">
                                            Silky, fast-absorbing botanical lipid emulsion
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white border border-secondary/25">
                                        <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-1">
                                            Aromatic Essence
                                        </span>
                                        <span className="text-sm font-medium text-primary">
                                            Subtle, unfragranced raw herbal notes
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Active Botanicals' && (
                            <div className="space-y-4">
                                <p>
                                    Every botanical active is harvested with care and cold-extracted to preserve its living molecular integrity without thermal breakdown.
                                </p>
                                <ul className="space-y-2.5 pt-2">
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-accent-gold font-bold">•</span>
                                        <span><strong>Plant Squalane:</strong> Biomimetic hydrator that matches skin sebum for instant, weightless absorption.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-accent-gold font-bold">•</span>
                                        <span><strong>Cold-Pressed Seed Oils:</strong> Abundant in essential linoleic and oleic fatty acids to rebuild cracked barriers.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-accent-gold font-bold">•</span>
                                        <span><strong>Botanical Antioxidants:</strong> Vitamin E and adaptogenic polyphenols countering UV oxidative stress.</span>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'Ritual & Application' && (
                            <div className="space-y-4">
                                <p>
                                    Incorporate into your morning and evening skincare ritual for optimal barrier restoration.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                    <div className="p-4 rounded-lg bg-white border border-secondary/25 text-center sm:text-left">
                                        <span className="font-editorial italic text-2xl text-accent-gold block mb-1">Step 01</span>
                                        <h4 className="font-heading text-xl font-normal text-primary mb-1">Dispense & Warm</h4>
                                        <p className="text-xs text-primary/70">Place 3–4 drops into palms and gently warm together.</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white border border-secondary/25 text-center sm:text-left">
                                        <span className="font-editorial italic text-2xl text-accent-gold block mb-1">Step 02</span>
                                        <h4 className="font-heading text-xl font-normal text-primary mb-1">Press In</h4>
                                        <p className="text-xs text-primary/70">Press into clean face, neck, and chest in upward lifting motions.</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white border border-secondary/25 text-center sm:text-left">
                                        <span className="font-editorial italic text-2xl text-accent-gold block mb-1">Step 03</span>
                                        <h4 className="font-heading text-xl font-normal text-primary mb-1">Seal & Protect</h4>
                                        <p className="text-xs text-primary/70">Follow with daily sunscreen in morning or night cream at dusk.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Clinical Science' && (
                            <div className="space-y-3">
                                <p>
                                    GVEDA bridges ancient botanical knowledge with modern clinical biocompatibility. Our pH 5.5 formulation respects the skin’s acid mantle, ensuring beneficial microflora thrive while preventing bacterial colonization.
                                </p>
                                <p className="text-xs text-primary/65 pt-2">
                                    100% Vegan • Cruelty-Free • Non-Comedogenic • Free of Artificial Fragrance & Phthalates
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── 3. EXPANDABLE ACCORDIONS FOR ALL OTHER SPECIFICATIONS ── */}
                <div className="w-full pt-4">
                    <div className="mb-6">
                        <h3 className="font-heading text-2xl sm:text-3xl font-normal text-secondary tracking-tight">
                            Formulation & Ritual Specifications
                        </h3>
                    </div>

                    <div className="border-t border-secondary/25 divide-y divide-secondary/25">

                        {/* ── ACCORDION 1: Skin Type & Target Suitability ── */}
                        <div className="w-full py-2">
                            <button
                                type="button"
                                onClick={() => toggleAccordion('suitability')}
                                aria-expanded={openAccordions.suitability}
                                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <h4 className="font-heading text-xl sm:text-2xl font-normal text-primary group-hover:text-accent-gold transition-colors">
                                        Skin Type & Target Suitability
                                    </h4>
                                </div>
                                <div className={`w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center text-primary/70 transition-transform duration-300 ${openAccordions.suitability ? 'rotate-180 bg-secondary/10 border-accent-gold' : ''
                                    }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {openAccordions.suitability && (
                                <div className="pt-2 pb-6 animate-in fade-in duration-300">
                                    <div className="divide-y divide-secondary/20">
                                        {SUITABILITY_ITEMS.map((item) => (
                                            <div
                                                key={item.name}
                                                className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] gap-3 sm:gap-8 py-5 first:pt-2 last:pb-2 items-start sm:items-center"
                                            >
                                                <div className="flex items-center gap-3.5 sm:gap-4">
                                                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-secondary/35 flex items-center justify-center shrink-0 shadow-2xs">
                                                        {item.icon}
                                                    </div>
                                                    <span className="font-primary text-sm sm:text-base font-semibold text-primary leading-snug">
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <p className="m-0 text-xs sm:text-sm leading-relaxed text-primary/70 font-primary">
                                                    {item.note}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── ACCORDION 2: Ritual Focus Matrix ── */}
                        <div className="w-full py-2">
                            <button
                                type="button"
                                onClick={() => toggleAccordion('matrix')}
                                aria-expanded={openAccordions.matrix}
                                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <h4 className="font-heading text-xl sm:text-2xl font-normal text-primary group-hover:text-accent-gold transition-colors">
                                        Ritual Focus Matrix
                                    </h4>
                                </div>
                                <div className={`w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center text-primary/70 transition-transform duration-300 ${openAccordions.matrix ? 'rotate-180 bg-secondary/10 border-accent-gold' : ''
                                    }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {openAccordions.matrix && (
                                <div className="pt-2 pb-6 animate-in fade-in duration-300">
                                    <p className="text-xs sm:text-sm text-primary/60 mb-6 max-w-xl">
                                        Measured biological performance scores across essential therapeutic metrics.
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                                        {RITUAL_GAUGES.map((gauge) => (
                                            <div
                                                key={gauge.label}
                                                className="flex flex-col items-center justify-center p-5 rounded-lg bg-white border border-secondary/30 shadow-2xs text-center group hover:border-accent-gold transition-colors"
                                            >
                                                <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-3 border-accent-gold/40 font-mono text-xs sm:text-sm font-bold text-primary mb-2 group-hover:border-accent-gold transition-colors">
                                                    {gauge.score}
                                                </div>
                                                <span className="text-xs sm:text-sm font-medium text-primary">
                                                    {gauge.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── ACCORDION 3: Key Botanical Highlights ── */}
                        <div className="w-full py-2">
                            <button
                                type="button"
                                onClick={() => toggleAccordion('botanicals')}
                                aria-expanded={openAccordions.botanicals}
                                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <h4 className="font-heading text-xl sm:text-2xl font-normal text-primary group-hover:text-accent-gold transition-colors">
                                        Key Botanical Highlights
                                    </h4>
                                </div>
                                <div className={`w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center text-primary/70 transition-transform duration-300 ${openAccordions.botanicals ? 'rotate-180 bg-secondary/10 border-accent-gold' : ''
                                    }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {openAccordions.botanicals && (
                                <div className="pt-2 pb-6 animate-in fade-in duration-300">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm leading-relaxed text-primary/80">
                                        {BOTANICAL_FEATURES.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-secondary/25">
                                                <span className="text-accent-gold font-bold select-none text-base leading-none mt-0.5">✓</span>
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── ACCORDION 4: Formulation Integrity & Standards ── */}
                        <div className="w-full py-2">
                            <button
                                type="button"
                                onClick={() => toggleAccordion('standards')}
                                aria-expanded={openAccordions.standards}
                                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <h4 className="font-heading text-xl sm:text-2xl font-normal text-primary group-hover:text-accent-gold transition-colors">
                                        Formulation Integrity & Clinical Standards
                                    </h4>
                                </div>
                                <div className={`w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center text-primary/70 transition-transform duration-300 ${openAccordions.standards ? 'rotate-180 bg-secondary/10 border-accent-gold' : ''
                                    }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {openAccordions.standards && (
                                <div className="pt-2 pb-6 animate-in fade-in duration-300">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                                        <div className="p-4 rounded-lg bg-white border border-secondary/25 space-y-1.5">
                                            <span className="text-accent-gold font-semibold uppercase tracking-wider text-[11px] block">pH 5.5 Mantle</span>
                                            <p className="text-primary/75 leading-relaxed">Formulated to mirror the skin’s biological acid mantle, preventing dryness and barrier thinning.</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white border border-secondary/25 space-y-1.5">
                                            <span className="text-accent-gold font-semibold uppercase tracking-wider text-[11px] block">Cold Bio-Extraction</span>
                                            <p className="text-primary/75 leading-relaxed">Preserves thermal-sensitive active botanicals and polyphenols at full potency.</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white border border-secondary/25 space-y-1.5">
                                            <span className="text-accent-gold font-semibold uppercase tracking-wider text-[11px] block">Zero Fillers</span>
                                            <p className="text-primary/75 leading-relaxed">100% active botanical ingredients without parabens, synthetic perfumes, or petrochemicals.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── ACCORDION 5: Storage, Delivery & Botanical Guarantee ── */}
                        <div className="w-full py-2">
                            <button
                                type="button"
                                onClick={() => toggleAccordion('delivery')}
                                aria-expanded={openAccordions.delivery}
                                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <h4 className="font-heading text-xl sm:text-2xl font-normal text-primary group-hover:text-accent-gold transition-colors">
                                        Storage, Delivery & Botanical Guarantee
                                    </h4>
                                </div>
                                <div className={`w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center text-primary/70 transition-transform duration-300 ${openAccordions.delivery ? 'rotate-180 bg-secondary/10 border-accent-gold' : ''
                                    }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {openAccordions.delivery && (
                                <div className="pt-2 pb-6 animate-in fade-in duration-300">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                                        <div className="p-4 rounded-lg bg-white border border-secondary/25">
                                            <h5 className="font-semibold text-primary mb-1">Preservation Guidelines</h5>
                                            <p className="text-primary/70 leading-relaxed">Store at ambient temperatures below 25°C away from direct sunlight in its protective amber glass bottle.</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white border border-secondary/25">
                                            <h5 className="font-semibold text-primary mb-1">Fulfillment & Guarantee</h5>
                                            <p className="text-primary/70 leading-relaxed">Dispatched within 24–48 hours in sustainable biodegradable packaging. Supported by our 30-day botanical guarantee.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>

            {/* ── 4. RELATED PRODUCTS ("Complete Your Ritual") ── */}
            {product.category?.slug && (
                <div className="mt-20 pt-10 border-t border-secondary/30">
                    <RelatedProducts
                        currentProductSlug={product.slug}
                        categorySlug={product.category.slug}
                    />
                </div>
            )}

            {/* ── FULLSCREEN LIGHTBOX MODAL ── */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/90 backdrop-blur-md p-4 sm:p-6 select-none animate-in fade-in duration-200">
                    {/* Top Control Bar */}
                    <div className="flex items-center justify-between w-full z-20">
                        <div className="font-primary text-xs uppercase tracking-widest text-white/70">
                            {lightboxIndex + 1} / {images.length} — {product.title}
                        </div>
                        <button
                            type="button"
                            onClick={closeLightbox}
                            aria-label="Close image modal"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Center Stage: High Res Image & Circular Floating Prev/Next Buttons */}
                    <div className="relative flex-1 w-full flex items-center justify-center min-h-0 my-3">
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={lightboxPrev}
                                aria-label="Previous image"
                                className="absolute left-3 sm:left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white shadow-2xl backdrop-blur-xs transition-all hover:bg-white hover:text-black active:scale-95 cursor-pointer"
                            >
                                <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}

                        <div className="relative w-full h-full max-w-5xl flex items-center justify-center p-4">
                            <Image
                                src={images[lightboxIndex] || images[0]}
                                alt={`${product.title} view ${lightboxIndex + 1}`}
                                fill
                                priority
                                sizes="100vw"
                                className="object-contain select-none"
                            />
                        </div>

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={lightboxNext}
                                aria-label="Next image"
                                className="absolute right-3 sm:right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white shadow-2xl backdrop-blur-xs transition-all hover:bg-white hover:text-black active:scale-95 cursor-pointer"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Bottom Thumbnail Strip Indicator */}
                    {images.length > 1 && (
                        <div className="w-full flex justify-center z-20 pt-2">
                            <div className="flex items-center gap-2.5 overflow-x-auto max-w-full pb-2 pt-1 scrollbar-none px-2">
                                {images.map((src, idx) => {
                                    const isActive = lightboxIndex === idx;
                                    return (
                                        <button
                                            key={src + idx}
                                            type="button"
                                            onClick={() => setLightboxIndex(idx)}
                                            className={`relative h-16 w-14 sm:h-20 sm:w-18 shrink-0 overflow-hidden rounded-lg bg-white/10 transition-all border-2 cursor-pointer ${isActive
                                                ? 'border-accent-gold opacity-100 ring-2 ring-accent-gold/50'
                                                : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                                                }`}
                                        >
                                            <Image
                                                src={src}
                                                alt={`Thumb ${idx + 1}`}
                                                fill
                                                sizes="80px"
                                                className="object-contain p-1 pointer-events-none select-none"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
