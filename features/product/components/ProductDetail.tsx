'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
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
    'Delivery & Care',
] as const;
type Tab = (typeof TABS)[number];

const SUITABILITY_ITEMS = [
    {
        name: 'Sensitive & Reactive Skin',
        percentage: '96%',
        width: '96%',
        note: 'Hypoallergenic lipid matrix calms redness and reactive flares.',
        tag: 'Dermatologist Tested',
    },
    {
        name: 'Barrier-Compromised Skin',
        percentage: '94%',
        width: '94%',
        note: 'Bio-identical ceramides and plant squalane repair damaged barriers.',
        tag: 'Intensive Repair',
    },
    {
        name: 'Dehydrated & Dry Skin',
        percentage: '92%',
        width: '92%',
        note: 'Multi-depth cellular hydration locks moisture for up to 48 hours.',
        tag: 'Deep Hydration',
    },
    {
        name: 'Normal to Combination Skin',
        percentage: '89%',
        width: '89%',
        note: 'Regulates sebum naturally without pore-clogging heavy residues.',
        tag: 'Balancing',
    },
    {
        name: 'Environmental Stress / City Living',
        percentage: '93%',
        width: '93%',
        note: 'Potent polyphenols neutralize free radicals and urban pollution.',
        tag: 'Daily Shield',
    },
];

const EFFICACY_METRICS = [
    { label: 'Barrier Restoration', score: '6 / 6', fill: '100%' },
    { label: 'Deep Hydration Lock', score: '6 / 6', fill: '100%' },
    { label: 'Antioxidant Defense', score: '5 / 6', fill: '83.3%' },
    { label: 'Soothing & Anti-Redness', score: '6 / 6', fill: '100%' },
    { label: 'Biocompatible Absorption', score: '5 / 6', fill: '83.3%' },
    { label: 'Sebum Regulation', score: '5 / 6', fill: '83.3%' },
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

const VOLUMES = ['30 ml / 1.0 fl. oz.', '50 ml / 1.7 fl. oz.', '100 ml / 3.4 fl. oz.'];

export default function ProductDetail({ slug }: { slug: string }) {
    const { data, isLoading, isError } = useProduct(slug);
    const product = data?.results;
    const { addToCart } = useCart();

    const [activeTab, setActiveTab] = useState<Tab>('Description');
    const [selectedVolume, setSelectedVolume] = useState<string>(VOLUMES[1]);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number>(0);

    const thumbContainerRef = useRef<HTMLDivElement>(null);
    const detailsStoryRef = useRef<HTMLDivElement>(null);

    /* ── Product Images Extractor ── */
    const images = useMemo(() => {
        if (!product) return ['/images/product/product1.jpeg'];
        const list = (product.images ?? [])
            .map((img) => staticUrl(img.name))
            .filter(Boolean) as string[];
        return list.length > 0 ? Array.from(new Set(list)) : ['/images/product/product1.jpeg'];
    }, [product]);

    /* ── Embla Carousel Setup for silky smooth dragging ── */
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps',
        duration: 25,
        skipSnaps: false,
    });

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

    const lightboxNext = useCallback(() => {
        setLightboxIndex((prev) => (prev + 1) % (images.length || 1));
    }, [images.length]);

    const lightboxPrev = useCallback(() => {
        setLightboxIndex((prev) => (prev - 1 + (images.length || 1)) % (images.length || 1));
    }, [images.length]);

    useEffect(() => {
        if (!lightboxOpen) return;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') lightboxNext();
            if (e.key === 'ArrowLeft') lightboxPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen, lightboxNext, lightboxPrev]);

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);

        const productName = product?.title || 'Botanical Formulation';
        const rawPrice = product?.price ?? 48;
        const numericPrice = typeof rawPrice === 'number'
            ? rawPrice
            : parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 48;

        const mainImage = images.length > 0 ? images[0] : '/images/product/product1.jpeg';

        addToCart({
            id: String(product?._id || slug || productName),
            name: productName,
            price: numericPrice,
            image: mainImage,
            category: product?.category?.name || 'Botanical Skincare',
            size: selectedVolume,
            quantity: quantity,
            slug: slug,
        });
    };

    const toggleWishlist = () => {
        setIsSaved((prev) => !prev);
    };

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

    const price = Number(product.price ?? 0);
    const comparePrice = product.comparePrice ? Number(product.comparePrice) : null;
    const hasDiscount = comparePrice !== null && comparePrice > price;
    const discountPercentage = hasDiscount ? Math.round(((comparePrice! - price) / comparePrice!) * 100) : null;
    const rawCategory = product.category?.name;
    const categoryTitle =
        rawCategory && rawCategory.toLowerCase() !== 'gveda'
            ? rawCategory
            : null;
    const earnedPoints = Math.round(price * 0.1);

    return (
        <main className="w-full min-h-screen pt-20 sm:pt-24 pb-20 px-4 sm:px-8 lg:px-[5vw] select-none bg-background text-primary">
            {/* ── TOP HERO SECTION: Left Scrolling Column + Sticky Purchasing Sidebar ── */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-14">

                {/* ════ LEFT SCROLLING COLUMN (Images, Story, Tabs, Suitability, Performance) ════ */}
                <div className="flex-1 min-w-0 w-full space-y-12 sm:space-y-16">

                    {/* CAROUSEL ROW: Vertical Thumbnail Strip + Embla Drag Carousel */}
                    <div className="flex flex-col lg:flex-row items-start gap-4 xl:gap-5">
                        {/* Far Left: Vertical Thumbnail Strip (Desktop lg+) */}
                        {images.length > 1 && (
                            <div className="hidden lg:flex w-20 shrink-0 flex-col items-center gap-3 pr-1">
                                <div
                                    ref={thumbContainerRef}
                                    className="flex flex-col gap-3 overflow-y-auto max-h-[560px] xl:max-h-[620px] py-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    {images.map((src, i) => (
                                        <button
                                            key={src + i}
                                            type="button"
                                            onClick={() => selectThumbnail(i)}
                                            className={`relative h-20 w-18 shrink-0 overflow-hidden rounded-lg border transition-all cursor-pointer bg-white ${
                                                activeImageIndex === i
                                                    ? 'border-accent-gold ring-2 ring-accent-gold/40 shadow-xs'
                                                    : 'border-secondary/30 hover:border-accent-gold/60 opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <Image
                                                src={src}
                                                alt={`${product.title} thumb ${i + 1}`}
                                                fill
                                                sizes="80px"
                                                className="object-contain p-1.5"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Smooth Native Draggable Carousel Stage */}
                        <div className="flex-1 min-w-0 w-full relative">
                            <div
                                ref={emblaRef}
                                className="overflow-hidden w-full cursor-grab active:cursor-grabbing rounded-lg select-none touch-pan-y border border-secondary/30 bg-white shadow-xs"
                            >
                                <div className="flex items-stretch h-[440px] sm:h-[540px] lg:h-[580px] xl:h-[620px]">
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
                                            <div className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 border border-secondary/30 text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs pointer-events-none">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Compact Floating Carousel Arrows */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                                    <button
                                        type="button"
                                        onClick={prevImage}
                                        aria-label="Previous image"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-secondary/40 shadow-md backdrop-blur-xs transition-all hover:bg-white hover:border-accent-gold active:scale-95 text-primary cursor-pointer"
                                    >
                                        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextImage}
                                        aria-label="Next image"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-secondary/40 shadow-md backdrop-blur-xs transition-all hover:bg-white hover:border-accent-gold active:scale-95 text-primary cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Mobile Horizontal Thumbnail Strip (sm/xs) */}
                            {images.length > 1 && (
                                <div className="flex lg:hidden overflow-x-auto gap-2.5 pt-3 pb-1 scrollbar-none">
                                    {images.map((src, i) => (
                                        <button
                                            key={src + i}
                                            type="button"
                                            onClick={() => selectThumbnail(i)}
                                            className={`relative h-18 w-16 shrink-0 overflow-hidden rounded-lg border transition-all cursor-pointer bg-white ${
                                                activeImageIndex === i
                                                    ? 'border-accent-gold ring-2 ring-accent-gold/40'
                                                    : 'border-secondary/30 opacity-70'
                                            }`}
                                        >
                                            <Image src={src} alt="" fill className="object-contain p-1" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PRODUCT DETAILS & BOTANICAL STORY */}
                    <div ref={detailsStoryRef} className="border-t border-secondary/30 pt-8 sm:pt-10 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-editorial italic text-2xl sm:text-3xl text-accent-gold font-normal">
                                Botanical Formulation
                            </span>
                        </div>
                        <h3 className="font-primary font-medium text-xl sm:text-2xl text-primary tracking-tight mb-4">
                            The Philosophy of Pure Restoration
                        </h3>
                        <p className="font-primary font-normal text-sm sm:text-base leading-relaxed text-primary/80 whitespace-pre-line">
                            {product.description ||
                                'Crafted through cold-pressed botanical extraction and clinical dermatological science, this formulation delivers bio-identical nourishment deep within the skin lipid barrier. Stripped of synthetic perfumes, harsh fillers, and volatile alcohols, it works synergistically to soothe sensitivity, restore hydration, and unveil enduring radiance.'}
                        </p>
                    </div>

                    {/* TABS & COMPREHENSIVE SPECIFICATIONS SECTION */}
                    <div className="pt-2 w-full">
                        <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 border-b border-secondary/30 pb-3">
                            {TABS.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setActiveTab(t)}
                                    className={`font-primary text-xs sm:text-sm uppercase tracking-wider transition-all pb-2 border-b-2 cursor-pointer ${
                                        activeTab === t
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
                                        <div className="p-3.5 rounded-lg bg-white border border-secondary/25">
                                            <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-1">
                                                Texture
                                            </span>
                                            <span className="text-sm font-medium text-primary">
                                                Silky, fast-absorbing botanical lipid emulsion
                                            </span>
                                        </div>
                                        <div className="p-3.5 rounded-lg bg-white border border-secondary/25">
                                            <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-1">
                                                Aroma
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
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Dispense & Warm</h4>
                                            <p className="text-xs text-primary/70">Place 3–4 drops into palms and gently warm together.</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white border border-secondary/25 text-center sm:text-left">
                                            <span className="font-editorial italic text-2xl text-accent-gold block mb-1">Step 02</span>
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Press In</h4>
                                            <p className="text-xs text-primary/70">Press into clean face, neck, and chest in upward lifting motions.</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white border border-secondary/25 text-center sm:text-left">
                                            <span className="font-editorial italic text-2xl text-accent-gold block mb-1">Step 03</span>
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Seal & Protect</h4>
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

                            {activeTab === 'Delivery & Care' && (
                                <div className="space-y-3">
                                    <p>
                                        Complimentary tracked delivery across Nepal for orders over NPR 2,500. Shipped in protective, zero-plastic recyclable packaging.
                                    </p>
                                    <p className="text-xs text-primary/70">
                                        Store in a cool, dry place away from direct sunlight. To ensure maximum active potency, use within 12 months of opening.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SKIN TYPE & TARGET SUITABILITY SECTION */}
                    <div className="border-t border-secondary/30 pt-10 space-y-6 w-full">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl sm:text-2xl font-medium text-primary tracking-tight">
                                    Skin Type & Target Suitability
                                </h3>
                                <div className="p-1 rounded-full bg-accent-gold/15 text-accent-gold">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="mt-1 text-xs sm:text-sm text-primary/65">
                                Formulated to harmonize with diverse dermatological profiles.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white border border-secondary/30 p-4 sm:p-6 space-y-4 shadow-xs">
                            {SUITABILITY_ITEMS.map((item, idx) => (
                                <div
                                    key={item.name}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 ${
                                        idx !== SUITABILITY_ITEMS.length - 1 ? 'border-b border-secondary/20' : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3 w-56 shrink-0">
                                        <div className="p-2 rounded-lg bg-background border border-secondary/30 text-accent-gold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="text-xs sm:text-sm font-medium text-primary block">
                                                {item.name}
                                            </span>
                                            <span className="text-[10px] text-accent-gold uppercase tracking-wider font-semibold">
                                                {item.tag}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden border border-secondary/20">
                                            <div
                                                className="h-full bg-accent-gold rounded-full transition-all duration-1000"
                                                style={{ width: item.width }}
                                            />
                                        </div>
                                        <span className="font-mono text-xs font-bold text-primary w-10 text-right">
                                            {item.percentage}
                                        </span>
                                    </div>

                                    <p className="text-xs text-primary/65 sm:w-60 sm:text-right shrink-0">
                                        {item.note}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PERFORMANCE & CLINICAL EFFICACY SECTION */}
                    <div className="border-t border-secondary/30 pt-10 space-y-6 w-full">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-primary tracking-tight">
                                Clinical Botanical Efficacy
                            </h3>
                            <div className="p-1 rounded-full bg-accent-gold/15 text-accent-gold">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            {EFFICACY_METRICS.map((metric) => (
                                <div key={metric.label} className="space-y-2 p-4 rounded-lg bg-white border border-secondary/25 shadow-xs">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-primary font-medium">
                                            {metric.label}
                                        </span>
                                        <span className="font-mono text-accent-gold font-bold">{metric.score}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-secondary/20 flex">
                                        <div
                                            className="h-full bg-accent-gold transition-all duration-1000"
                                            style={{ width: metric.fill }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RITUAL FOCUS CIRCLE GAUGES */}
                    <div className="border-t border-secondary/30 pt-10 space-y-6 w-full">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-primary tracking-tight">
                                Ritual Focus Matrix
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-1">
                            {RITUAL_GAUGES.map((gauge) => (
                                <div
                                    key={gauge.label}
                                    className="flex flex-col items-center justify-center p-5 rounded-lg bg-white border border-secondary/30 shadow-xs text-center group hover:border-accent-gold transition-colors"
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

                    {/* BOTANICAL FEATURES CHECKLIST */}
                    <div className="border-t border-secondary/30 pt-10 space-y-6 w-full">
                        <h3 className="text-xl sm:text-2xl font-medium text-primary tracking-tight">
                            Key Botanical Highlights
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm leading-relaxed text-primary/75">
                            {BOTANICAL_FEATURES.map((feat, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-secondary/20 shadow-xs">
                                    <span className="text-accent-gold font-bold select-none text-base leading-none mt-0.5">✓</span>
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ════ RIGHT SIDEBAR: PINNED STICKY PURCHASING OPTIONS (Frameless / No Card) ════ */}
                <div className="w-full lg:w-[400px] xl:w-[450px] 2xl:w-[480px] shrink-0 flex flex-col space-y-5 lg:sticky lg:top-24 lg:self-start z-10">

                    {/* Uppercase Breadcrumb: Category > Product Name */}
                    <div className="font-primary text-[11px] uppercase tracking-widest text-primary/50 flex items-center gap-1.5 flex-wrap">
                        <Link
                            href="/product"
                            className="hover:text-primary transition-colors"
                        >
                            {categoryTitle || 'Products'}
                        </Link>
                        <span>&gt;</span>
                        <span className="text-primary font-semibold">
                            {product.title}
                        </span>
                    </div>

                    {/* Title & Short Description */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-[2.2vw] font-heading text-primary font-medium leading-tight">
                            {product.title}
                        </h1>
                        <p className="mt-2 text-xs sm:text-sm text-primary/65 leading-relaxed">
                            {product.description ? product.description.slice(0, 110) + '...' : 'Cold-pressed botanical elixir for skin barrier restoration.'}
                        </p>
                    </div>

                    {/* Rating Row */}
                    <div className="flex items-center gap-2.5 pb-4 border-b border-secondary/30">
                        <div className="flex items-center gap-1 text-accent-gold text-sm">
                            {'★'.repeat(5)}
                        </div>
                        <span className="text-xs font-semibold text-primary">4.9</span>
                        <span className="text-primary/40">•</span>
                        <button
                            type="button"
                            onClick={() => detailsStoryRef.current?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-xs text-primary/60 hover:text-accent-gold transition-colors underline cursor-pointer"
                        >
                            24 Reviews
                        </button>
                    </div>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl sm:text-3xl font-semibold text-primary font-primary">
                            Rs. {price.toLocaleString()}
                        </span>
                        {hasDiscount && (
                            <>
                                <span className="text-sm sm:text-base font-normal text-primary/40 line-through">
                                    Rs. {comparePrice!.toLocaleString()}
                                </span>
                                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                    {discountPercentage}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* Volume / Size Options */}
                    <div className="space-y-2.5 pt-1">
                        <div className="flex items-center justify-between text-xs text-primary/70 font-medium">
                            <span className="uppercase tracking-wider">Select Size</span>
                            <span className="text-accent-gold font-semibold">{selectedVolume}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {VOLUMES.map((vol) => (
                                <button
                                    key={vol}
                                    type="button"
                                    onClick={() => setSelectedVolume(vol)}
                                    className={`py-2.5 px-2 text-center rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        selectedVolume === vol
                                            ? 'bg-primary text-white border-primary shadow-xs'
                                            : 'bg-white/80 text-primary/80 border-secondary/40 hover:border-accent-gold'
                                    }`}
                                >
                                    {vol.split(' / ')[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & CTA Action Buttons */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-secondary/40 rounded-full bg-white px-3 py-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
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
                                className={`h-11 w-11 shrink-0 flex items-center justify-center rounded-full border transition-all cursor-pointer ${
                                    isSaved
                                        ? 'border-red-300 bg-red-50 text-red-500'
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
                        </div>

                        {/* Add to Cart / Ritual Button */}
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className={`w-full h-12 rounded-full font-primary text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                                addedToCart
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.99] shadow-sm'
                            }`}
                        >
                            {addedToCart ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Added to Ritual
                                </>
                            ) : (
                                'Add to Ritual'
                            )}
                        </button>

                        {/* Secondary Enquire Button */}
                        <Link
                            href="/contact"
                            className="w-full h-11 rounded-full border border-secondary/60 bg-transparent text-primary hover:bg-secondary/15 hover:border-accent-gold transition-all text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center"
                        >
                            Bespoke Consultation
                        </Link>
                    </div>

                    {/* Botanical Care Points Banner */}
                    <div className="flex items-center gap-2 text-xs text-primary/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                        <span>Earn <strong className="text-primary font-semibold">+{earnedPoints} care points</strong> with this order</span>
                    </div>

                    {/* Value Proposition Perks (Clean Divider Style, No Card) */}
                    <div className="border-t border-b border-secondary/30 py-5 space-y-3.5 text-xs text-primary/75">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-secondary/25 text-accent-gold shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-semibold text-primary block">Complimentary Delivery</span>
                                <span className="text-[11px] text-primary/60">Free courier dispatch across Nepal over Rs. 2,500</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-secondary/25 text-accent-gold shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-semibold text-primary block">Pure Botanical Guarantee</span>
                                <span className="text-[11px] text-primary/60">14-day return if not fully aligned with your skin</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white border border-secondary/25 text-accent-gold shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-semibold text-primary block">Dispatch Window</span>
                                <span className="text-[11px] text-primary/60">Typically delivers in 2–4 working days</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ════ RELATED PRODUCTS ("Complete Your Ritual") ════ */}
            {product.category?.slug && (
                <div className="mt-20 pt-10 border-t border-secondary/30">
                    <RelatedProducts
                        currentProductSlug={product.slug}
                        categorySlug={product.category.slug}
                    />
                </div>
            )}

            {/* ════ FULLSCREEN MAMMUT-STYLE LIGHTBOX MODAL ════ */}
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
                                            className={`relative h-16 w-14 sm:h-20 sm:w-18 shrink-0 overflow-hidden rounded-lg bg-white/10 transition-all border-2 cursor-pointer ${
                                                isActive
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
