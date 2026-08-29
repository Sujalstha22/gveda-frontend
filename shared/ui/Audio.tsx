"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePreloader } from "../context/PreloaderContext";

// Generates a mathematically continuous sine wave path for any phase angle
function generateSinePath(phase: number): string {
  const points: string[] = [];
  const totalPoints = 32;
  const width = 10;
  const centerY = 2.5;
  const amplitude = 1.6;

  for (let i = 0; i <= totalPoints; i++) {
    const x = (i / totalPoints) * width;
    const y = centerY + Math.sin((x / width) * Math.PI * 2 - phase) * amplitude;
    if (i === 0) {
      points.push(`M ${x.toFixed(3)} ${y.toFixed(3)}`);
    } else {
      points.push(`L ${x.toFixed(3)} ${y.toFixed(3)}`);
    }
  }
  return points.join(" ");
}

export default function Audio() {
  const pathname = usePathname();
  const isResearchPage = pathname?.startsWith("/research");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const phaseRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const { soundEnabled } = usePreloader();

  // Initialize initial wave path
  useEffect(() => {
    if (pathRef.current) {
      pathRef.current.setAttribute("d", generateSinePath(phaseRef.current));
    }
  }, []);

  // Real-time 60fps mathematical sine wave phase animation
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Advance phase by 4.5 radians per second
      phaseRef.current = (phaseRef.current + delta * 4.5) % (Math.PI * 2);

      if (pathRef.current) {
        pathRef.current.setAttribute("d", generateSinePath(phaseRef.current));
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      lastTime = performance.now();
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Auto-play when sound is enabled from preloader
  useEffect(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [soundEnabled]);

  useEffect(() => {
    const handleToggle = (e: CustomEvent<{ action: string }>) => {
      if (e.detail?.action === "play") {
        audioRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch(() => { });
      } else if (e.detail?.action === "pause") {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("toggle-audio", handleToggle as EventListener);
    return () =>
      window.removeEventListener("toggle-audio", handleToggle as EventListener);
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-8 md:right-12 z-990 overflow-hidden ">
      <audio ref={audioRef} loop>
        <source src="/music/final-music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
        className={`w-11 h-11 sm:w-12 sm:h-12 cursor-pointer flex items-center justify-center group relative overflow-hidden ${isResearchPage ? "text-black" : " text-primary"
          }`}
      >
        {/*
        <div className="flex items-center justify-center w-8 h-4 relative overflow-hidden">
          <svg
            className={`sound-svg w-full h-full transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-45"
              }`}
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d={generateSinePath(0)}
              vectorEffect="non-scaling-stroke"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        */}

        {isPlaying ? (
          /* Speaker with sound waves (Sound ON) */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          /* Speaker with X (Muted / Sound OFF) */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 opacity-75"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="22" x2="16" y1="9" y2="15" />
            <line x1="16" x2="22" y1="9" y2="15" />
          </svg>
        )}
      </button>
    </div>
  );
}

