"use client";

import { useState } from "react";
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
  const { setSoundEnabled } = usePreloader();

  const isHomePage = pathname === "/";
  const [showPreloader, setShowPreloader] = useState(isHomePage);

  const handlePreloaderComplete = () => {
    setSoundEnabled(false);
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {children}
    </>
  );
}
