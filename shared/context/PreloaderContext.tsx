"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextType {
  showPreloader: boolean;
  soundEnabled: boolean;
  heroImageLoaded: boolean;
  isPlayingAudio: boolean;
  setShowPreloader: (show: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHeroImageLoaded: (loaded: boolean) => void;
  setIsPlayingAudio: (playing: boolean) => void;
  toggleAudio: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
  // Always start with preloader hidden by default (will be shown on home page only)
  const [showPreloader, setShowPreloader] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("toggle-audio", {
          detail: { action: isPlayingAudio ? "pause" : "play" },
        })
      );
    }
  };

  return (
    <PreloaderContext.Provider
      value={{
        showPreloader,
        soundEnabled,
        heroImageLoaded,
        isPlayingAudio,
        setShowPreloader,
        setSoundEnabled,
        setHeroImageLoaded,
        setIsPlayingAudio,
        toggleAudio,
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
