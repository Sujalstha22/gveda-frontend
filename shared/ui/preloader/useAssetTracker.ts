'use client';

import { useState, useEffect, useRef } from 'react';

const CRITICAL_VIDEOS = [
  '/videos/blogs.mp4',
  '/videos/paperReveal.mp4',
  '/videos/final-about-home.mp4',
  '/videos/product-hero-video.mp4',
  '/videos/why-us-2.mp4',
];

export function useAssetTracker() {
  const [targetProgress, setTargetProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const completedRef = useRef(false);

  // Smooth lerp ticker: increments displayProgress smoothly towards targetProgress
  useEffect(() => {
    let animationId: number;

    const tick = () => {
      setDisplayProgress((prev) => {
        if (prev >= 100) return 100;

        const diff = targetProgress - prev;

        if (diff <= 0 && targetProgress < 100) {
          // Slow crawl while waiting
          return Math.min(99, prev + 0.15);
        }

        const step = Math.max(0.4, Math.min(diff * 0.1, 2.5));
        const next = prev + step;

        if (targetProgress >= 100 && next >= 99.5) {
          return 100;
        }
        return next;
      });

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [targetProgress]);

  // Asset Loading Tracker: Window, Fonts, Images, and HTML Video Elements
  useEffect(() => {
    let isCancelled = false;

    const checkAndPreloadAssets = async () => {
      const domVideos = Array.from(document.querySelectorAll<HTMLVideoElement>('video'));
      const domImages = Array.from(document.querySelectorAll<HTMLImageElement>('img'));

      let totalItems = domVideos.length + domImages.length + 2;
      if (domVideos.length === 0) {
        totalItems += CRITICAL_VIDEOS.length;
      }

      let loadedItems = 0;

      const updateProgress = () => {
        if (isCancelled) return;
        loadedItems++;
        const pct = Math.min(100, Math.round((loadedItems / totalItems) * 100));
        setTargetProgress((prev) => Math.max(prev, pct));
      };

      // 1. Window load
      if (document.readyState === 'complete') {
        updateProgress();
      } else {
        const handleWindowLoad = () => {
          updateProgress();
          window.removeEventListener('load', handleWindowLoad);
        };
        window.addEventListener('load', handleWindowLoad);
      }

      // 2. Fonts
      if (document.fonts) {
        document.fonts.ready.then(() => updateProgress()).catch(() => updateProgress());
      } else {
        updateProgress();
      }

      // 3. DOM Images
      if (domImages.length > 0) {
        domImages.forEach((img) => {
          if (img.complete && img.naturalWidth > 0) {
            updateProgress();
          } else {
            const onImgDone = () => {
              img.removeEventListener('load', onImgDone);
              img.removeEventListener('error', onImgDone);
              updateProgress();
            };
            img.addEventListener('load', onImgDone);
            img.addEventListener('error', onImgDone);
          }
        });
      }

      // 4. DOM Videos & Critical Videos
      if (domVideos.length > 0) {
        domVideos.forEach((video) => {
          video.preload = 'auto';
          video.playsInline = true;
          video.setAttribute('playsinline', '');
          video.muted = true;
          if (video.readyState >= 1) {
            updateProgress();
          } else {
            const onVideoReady = () => {
              video.removeEventListener('loadedmetadata', onVideoReady);
              video.removeEventListener('canplaythrough', onVideoReady);
              video.removeEventListener('canplay', onVideoReady);
              video.removeEventListener('loadeddata', onVideoReady);
              video.removeEventListener('error', onVideoReady);
              updateProgress();
            };
            video.addEventListener('loadedmetadata', onVideoReady);
            video.addEventListener('canplaythrough', onVideoReady);
            video.addEventListener('canplay', onVideoReady);
            video.addEventListener('loadeddata', onVideoReady);
            video.addEventListener('error', onVideoReady);
            video.load();
          }
        });
      } else {
        CRITICAL_VIDEOS.forEach((src) => {
          const vid = document.createElement('video');
          vid.preload = 'auto';
          vid.muted = true;
          vid.playsInline = true;
          vid.setAttribute('playsinline', '');
          vid.src = src;

          const onVidReady = () => {
            vid.removeEventListener('loadedmetadata', onVidReady);
            vid.removeEventListener('canplaythrough', onVidReady);
            vid.removeEventListener('canplay', onVidReady);
            vid.removeEventListener('loadeddata', onVidReady);
            vid.removeEventListener('error', onVidReady);
            updateProgress();
          };
          vid.addEventListener('loadedmetadata', onVidReady);
          vid.addEventListener('canplaythrough', onVidReady);
          vid.addEventListener('canplay', onVidReady);
          vid.addEventListener('loadeddata', onVidReady);
          vid.addEventListener('error', onVidReady);
          vid.load();
        });
      }
    };

    checkAndPreloadAssets();

    // Safety fallback timer to prevent infinite loading
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setTargetProgress(100);
      }
    }, 4000);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  // When displayProgress hits 100%, trigger isLoaded
  useEffect(() => {
    if (displayProgress >= 100 && !completedRef.current) {
      completedRef.current = true;
      setIsLoaded(true);
    }
  }, [displayProgress]);

  return {
    displayProgress,
    isLoaded,
  };
}
