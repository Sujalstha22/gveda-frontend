'use client';

import { useState, useEffect } from 'react';

// Critical assets for the Hero Section
const HERO_PRIMARY_IMAGE = '/images/about/gveda-main-img.jpeg';
const HERO_WAVE_MASK = '/images/mask_side_s.webp';

export function useAssetTracker() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const checkHeroReady = async () => {
      const promises: Promise<void>[] = [];

      if (typeof window !== 'undefined') {
        // 1. Primary Hero Slide Image
        const heroImg = new window.Image();
        heroImg.src = HERO_PRIMARY_IMAGE;
        if (!heroImg.complete) {
          promises.push(
            new Promise<void>((resolve) => {
              heroImg.onload = () => resolve();
              heroImg.onerror = () => resolve();
            })
          );
        }

        // 2. Hero Wave Mask
        const maskImg = new window.Image();
        maskImg.src = HERO_WAVE_MASK;
        if (!maskImg.complete) {
          promises.push(
            new Promise<void>((resolve) => {
              maskImg.onload = () => resolve();
              maskImg.onerror = () => resolve();
            })
          );
        }

        // 3. Document Fonts
        if (document.fonts) {
          promises.push(
            document.fonts.ready.then(() => {}).catch(() => {})
          );
        }

        // 4. Any priority images in the DOM
        const priorityImages = Array.from(
          document.querySelectorAll<HTMLImageElement>('img[priority], img[fetchpriority="high"]')
        );
        priorityImages.forEach((img) => {
          if (!img.complete) {
            promises.push(
              new Promise<void>((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
              })
            );
          }
        });
      }

      await Promise.all(promises);

      if (!isCancelled) {
        setIsHeroLoaded(true);
      }
    };

    checkHeroReady();

    // Safety fallback timer so preloader never hangs indefinitely
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsHeroLoaded(true);
      }
    }, 5000);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, []);

  return {
    isHeroLoaded,
  };
}
