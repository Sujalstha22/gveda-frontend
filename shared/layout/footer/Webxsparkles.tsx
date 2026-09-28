"use client";

import Image from "next/image";
import React from "react";
import { SparklesCore } from "./Sparkles-core";


export type WebxLogoSparklesProps = {
  /** Rendered logo width in px. Height scales to the 238:74 aspect ratio. */
  width?: number;
  className?: string;
  /** Path to the WebX logo SVG. */
  logoSrc?: string;
  particleColor?: string;
  particleDensity?: number;
};

/**
 * WebX wordmark + mark lockup with an animated sparkle field bleeding out
 * from behind it. Self-contained — drop it anywhere on a dark surface.
 */
export const WebxLogoSparkles = ({
  width = 65,
  className,
  logoSrc = "/logo/white-webxlogo.svg",
  particleColor = "#FFFFFF",
  particleDensity = 320,
}: WebxLogoSparklesProps) => {
  const height = Math.round((width * 74) / 238);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
      style={{ width, height }}
    >
      <div
        className="pointer-events-none absolute -inset-x-[40%] -inset-y-[120%]"
        style={{
          maskImage:
            "radial-gradient(60% 50% at 50% 50%, white, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(60% 50% at 50% 50%, white, transparent 75%)",
        }}
      >
        <SparklesCore
          particleColor={particleColor}
          particleDensity={particleDensity}
          maxSize={1.2}
          minSize={0.4}
          speed={0.8}
        />
      </div>
      <Image
        src={logoSrc}
        alt="WebX Nepal"
        width={width}
        height={height}
        className="relative select-none h-auto w-full object-contain"
        draggable={false}
      />
    </div>
  );
};

export const Webxsparkles = WebxLogoSparkles;
export default WebxLogoSparkles;