"use client";

import React, { useEffect, useRef } from "react";

export type SparklesCoreProps = {
    particleColor?: string;
    particleDensity?: number;
    maxSize?: number;
    minSize?: number;
    speed?: number;
    className?: string;
};

export const SparklesCore = ({
    particleColor = "#FFFFFF",
    particleDensity = 120,
    maxSize = 1.2,
    minSize = 0.4,
    speed = 0.8,
    className = "",
}: SparklesCoreProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = canvas.parentElement?.clientWidth || 200);
        let height = (canvas.height = canvas.parentElement?.clientHeight || 80);

        const handleResize = () => {
            if (!canvas || !canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        };

        window.addEventListener("resize", handleResize);

        const count = Math.min(particleDensity, 120);
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * (maxSize - minSize) + minSize,
            opacity: Math.random(),
            speedX: (Math.random() - 0.5) * speed * 0.4,
            speedY: (Math.random() - 0.5) * speed * 0.4,
            fadeSpeed: (Math.random() * 0.02 + 0.005) * speed,
        }));

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = particleColor;

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.opacity += p.fadeSpeed;

                if (p.opacity >= 1 || p.opacity <= 0) {
                    p.fadeSpeed = -p.fadeSpeed;
                }

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleColor, particleDensity, maxSize, minSize, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none h-full w-full ${className}`}
        />
    );
};