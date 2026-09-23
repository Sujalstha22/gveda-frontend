"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePreloader } from "../context/PreloaderContext";
import Preloader from "./Preloader";

/**
 * ClientShell — wraps the page content with preloader logic.
 * Only shows the preloader on the home page ("/").
 * On all other routes, renders children directly.
 */
export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setSoundEnabled, setHeroReady } = usePreloader();

  const isHomePage = pathname === "/";
  // Only show preloader on initial entry if arriving on the home page
  const [showPreloader, setShowPreloader] = useState(isHomePage);

  useLayoutEffect(() => {
    if (showPreloader) {
      setHeroReady(false);
    }
  }, [showPreloader, setHeroReady]);

  const handlePreloaderComplete = () => {
    setSoundEnabled(false);
    setShowPreloader(false);
    setHeroReady(true);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {children}
    </>
  );
}
