"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextType {
  showPreloader: boolean;
  soundEnabled: boolean;
  heroImageLoaded: boolean;
  setShowPreloader: (show: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHeroImageLoaded: (loaded: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
  // Always start with preloader hidden by default (will be shown on home page only)
  const [showPreloader, setShowPreloader] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  return (
    <PreloaderContext.Provider
      value={{
        showPreloader,
        soundEnabled,
        heroImageLoaded,
        setShowPreloader,
        setSoundEnabled,
        setHeroImageLoaded,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
