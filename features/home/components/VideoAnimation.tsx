"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useResponsive } from "@/hooks/useMediaQuery";

// Register plugins safely in the browser context
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const VideoAnimation = () => {
    const { isSmallerDevice } = useResponsive();

    const currentStart = isSmallerDevice ? 1 : 1;
    const currentEnd = isSmallerDevice ? 105 : 105;
    const currentFolder = isSmallerDevice
        ? "/compressed"
        : "/compressed";

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const lastFrameRef = useRef<number>(-1);
    const [isReady, setIsReady] = useState(false);

    const totalFrames = currentEnd - currentStart + 1;

    // Helper to render a specific frame onto canvas without redundant redraws
    const renderFrame = (index: number) => {
        if (index === lastFrameRef.current) return;

        const img = imagesRef.current[index];
        const canvas = canvasRef.current;
        if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastFrameRef.current = index;
    };

    // 1. Preload sequence frames
    useEffect(() => {
        let loaded = 0;
        const loadedImages: HTMLImageElement[] = [];
        lastFrameRef.current = -1;

        const handleImageLoad = () => {
            loaded += 1;
            if (loaded === totalFrames) {
                setIsReady(true);
            }
        };

        for (let i = currentStart; i <= currentEnd; i++) {
            const img = new window.Image();
            const frameFileName = String(i);
            img.src = `${currentFolder}/${frameFileName}.webp`;
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad; // Don't block if a frame fails
            loadedImages.push(img);
        }

        imagesRef.current = loadedImages;

        return () => {
            setIsReady(false);
        };
    }, [currentStart, currentEnd, totalFrames, currentFolder]);

    // 2. Scroll Scrub GSAP Timeline
    useGSAP(
        () => {
            if (!isReady || imagesRef.current.length === 0) return;

            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;

            // Draw initial frame immediately
            renderFrame(0);

            const obj = { frame: 0 };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    anticipatePin: 1,
                    preventOverlaps: true,
                    fastScrollEnd: true,
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    refreshPriority: 3,
                },
            });

            ScrollTrigger.sort();

            tl.to(
                obj,
                {
                    frame: totalFrames - 1,
                    ease: "none",
                    duration: 2,
                    onUpdate: () => {
                        renderFrame(Math.round(obj.frame));
                    },
                },
                0,
            );
        },
        {
            scope: containerRef,
            dependencies: [isReady, totalFrames, isSmallerDevice],
        },
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full"
        >
            <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="relative w-full h-full object-cover object-center z-10"
                />
            </div>
        </div>
    );
};

export default VideoAnimation;