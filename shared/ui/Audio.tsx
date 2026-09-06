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
  const { soundEnabled, setIsPlayingAudio } = usePreloader();

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
        .then(() => {
          setIsPlaying(true);
          setIsPlayingAudio(true);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsPlayingAudio(false);
        });
    }
  }, [soundEnabled, setIsPlayingAudio]);

  useEffect(() => {
    const handleToggle = (e: CustomEvent<{ action: string }>) => {
      if (e.detail?.action === "play") {
        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true);
            setIsPlayingAudio(true);
          })
          .catch(() => {
            setIsPlaying(false);
            setIsPlayingAudio(false);
          });
      } else if (e.detail?.action === "pause") {
        audioRef.current?.pause();
        setIsPlaying(false);
        setIsPlayingAudio(false);
      }
    };

    window.addEventListener("toggle-audio", handleToggle as EventListener);
    return () =>
      window.removeEventListener("toggle-audio", handleToggle as EventListener);
  }, [setIsPlayingAudio]);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPlayingAudio(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsPlayingAudio(true);
      } catch {
        setIsPlaying(false);
        setIsPlayingAudio(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/final-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Bottom right floating sound icon commented out in favor of navbar sound icon */}
      {/*
      <div className="fixed bottom-4 sm:bottom-6 lg:bottom-[2vw] right-4 sm:right-8 lg:right-[5vw] z-[990] overflow-hidden select-none pointer-events-auto">
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
          className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-[2.6vw] lg:h-[2.6vw] rounded-full cursor-pointer flex items-center justify-center group relative overflow-hidden transition-all ${
            isResearchPage ? "text-black" : "text-primary"
          }`}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-[1.2vw] lg:h-[1.2vw] transition-transform duration-200 group-hover:scale-110"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-[1.2vw] lg:h-[1.2vw] transition-transform duration-200 group-hover:scale-110 opacity-75"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="22" x2="16" y1="9" y2="15" />
              <line x1="16" x2="22" y1="9" y2="15" />
            </svg>
          )}
        </button>
      </div>
      */}
    </>
  );
}

