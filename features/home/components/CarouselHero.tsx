'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    SLIDES,
    CarouselSlides,
    CarouselEditorial,
    CarouselControls,
    CarouselScrollAttention,
} from './carousel-hero';

// Ease out quad function matching Ayana's transition
function easeOutQuad(t: number): number {
    return t * (2 - t);
}

export default function CarouselHero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [autoplayProgress, setAutoplayProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // References for animation state
    const animRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const waveCountRef = useRef<number>(Math.random() * Math.PI);
    const incomingSlideRef = useRef<HTMLDivElement | null>(null);
    const activeSlideImageRef = useRef<HTMLDivElement | null>(null);

    // Autoplay timer references
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const progressAnimRef = useRef<number | null>(null);
    const progressStartRef = useRef<number | null>(null);

    // Drag handling references
    const dragStartXRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);

    const TRANSITION_DURATION = 1800; // 1.8 seconds fluid wave wipe
    const HOLD_DURATION = 4200; // 4.2 seconds hold before next transition

    // Execute the exact AYANA wave mask animation
    const startWaveTransition = useCallback((fromIdx: number, toIdx: number) => {
        if (isTransitioning || fromIdx === toIdx) return;

        setIsTransitioning(true);
        setPrevIndex(fromIdx);
        setCurrentIndex(toIdx);
        setAutoplayProgress(0);

        const el = incomingSlideRef.current;
        if (el) {
            el.style.opacity = '1';
            el.style.zIndex = '20';
            el.style.maskPosition = '-33.3% 0%';
            el.style.webkitMaskPosition = '-33.3% 0%';
        }

        startTimeRef.current = null;

        const animateMask = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const linearProgress = Math.min(elapsed / TRANSITION_DURATION, 1);
            const easedProgress = easeOutQuad(linearProgress);

            // AYANA mathematical displacement formula:
            // X travels from -33.3% to +66.7% (total span of 100%)
            const x = -33.3 + easedProgress * 100;

            // Vertical sine wave oscillation:
            let y = 0;
            if (linearProgress > 0 && linearProgress < 1) {
                waveCountRef.current += 0.012;
                y = (Math.sin(waveCountRef.current) * 0.5 + 0.5) * 100;
            }

            const maskPos = `${x.toFixed(2)}% ${y.toFixed(2)}%`;
            if (incomingSlideRef.current) {
                incomingSlideRef.current.style.maskPosition = maskPos;
                incomingSlideRef.current.style.webkitMaskPosition = maskPos;
            }

            if (linearProgress < 1) {
                animRef.current = requestAnimationFrame(animateMask);
            } else {
                // Transition finished
                if (incomingSlideRef.current) {
                    incomingSlideRef.current.style.maskPosition = '66.7% 0%';
                    incomingSlideRef.current.style.webkitMaskPosition = '66.7% 0%';
                }
                setIsTransitioning(false);
                setPrevIndex(toIdx);
            }
        };

        animRef.current = requestAnimationFrame(animateMask);
    }, [isTransitioning]);

    const goToNext = useCallback(() => {
        if (isTransitioning) return;
        const nextIdx = (currentIndex + 1) % SLIDES.length;
        startWaveTransition(currentIndex, nextIdx);
    }, [currentIndex, isTransitioning, startWaveTransition]);

    const goToPrev = useCallback(() => {
        if (isTransitioning) return;
        const prev = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
        startWaveTransition(currentIndex, prev);
    }, [currentIndex, isTransitioning, startWaveTransition]);

    // Autoplay and progress loop
    useEffect(() => {
        if (isPaused || isTransitioning) {
            if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
            if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
            return;
        }

        progressStartRef.current = performance.now();

        const updateProgress = (timestamp: number) => {
            if (!progressStartRef.current) progressStartRef.current = timestamp;
            const elapsed = timestamp - progressStartRef.current;
            const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
            setAutoplayProgress(progress);

            if (elapsed < HOLD_DURATION) {
                progressAnimRef.current = requestAnimationFrame(updateProgress);
            } else {
                goToNext();
            }
        };

        progressAnimRef.current = requestAnimationFrame(updateProgress);

        return () => {
            if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
            if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
        };
    }, [currentIndex, isPaused, isTransitioning, goToNext]);

    // Clean up RAF on unmount
    useEffect(() => {
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
            if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
        };
    }, []);

    // Touch and Drag handlers for smooth swipe
    const handlePointerDown = (e: React.PointerEvent) => {
        dragStartXRef.current = e.clientX;
        isDraggingRef.current = true;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!isDraggingRef.current || dragStartXRef.current === null) return;
        const deltaX = e.clientX - dragStartXRef.current;
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
        dragStartXRef.current = null;
        isDraggingRef.current = false;
    };

    const activeSlide = SLIDES[currentIndex];
    const previousSlide = SLIDES[prevIndex];

    return (
        <div
            className="relative w-full h-dvh min-h-155 overflow-hidden select-none text-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            {/* ── BACKGROUND IMAGE SLIDES (AYANA ORGANIC WAVE MASK ENGINE) ── */}
            <CarouselSlides
                activeSlide={activeSlide}
                previousSlide={previousSlide}
                isTransitioning={isTransitioning}
                incomingSlideRef={incomingSlideRef}
                activeSlideImageRef={activeSlideImageRef}
            />

            {/* ── EDITORIAL CONTENT OVERLAY (Bottom Left) ── */}
            <CarouselEditorial activeSlide={activeSlide} />

            {/* ── BOTTOM CENTER SCROLL ATTENTION BUTTON ── */}
            <CarouselScrollAttention />

            {/* ── BOTTOM RIGHT CAROUSEL CONTROLS & ROLLING COUNTER ── */}
            <CarouselControls
                slides={SLIDES}
                currentIndex={currentIndex}
                activeSlide={activeSlide}
                isTransitioning={isTransitioning}
                autoplayProgress={autoplayProgress}
                onPrev={goToPrev}
                onNext={goToNext}
            />
        </div>
    );
}
