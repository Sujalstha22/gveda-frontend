"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Custom hook to track match state of a CSS media query.
 * @param query - The media query string, e.g. "(max-width: 768px)"
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Convenience hook for responsive design breakpoint checking.
 */
export function useResponsive() {
  const isSmallerDevice = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = !isTablet;

  return {
    isSmallerDevice,
    isMobile,
    isTablet,
    isDesktop,
  };
}
