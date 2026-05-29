"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  /** Set to false when the 3D scene is ready — triggers the fade-out */
  visible: boolean;
}

const STARS: { x: string; y: string; r: string; opacity: number; delay: string }[] = [
  { x: "8%",  y: "10%", r: "1.5px", opacity: 0.7, delay: "0s"    },
  { x: "18%", y: "5%",  r: "1px",   opacity: 0.5, delay: "0.4s"  },
  { x: "33%", y: "8%",  r: "1.5px", opacity: 0.6, delay: "0.9s"  },
  { x: "54%", y: "4%",  r: "1px",   opacity: 0.4, delay: "0.6s"  },
  { x: "70%", y: "9%",  r: "1.5px", opacity: 0.7, delay: "1.2s"  },
  { x: "84%", y: "6%",  r: "1px",   opacity: 0.5, delay: "0.2s"  },
  { x: "92%", y: "14%", r: "1.5px", opacity: 0.6, delay: "1.0s"  },
  { x: "12%", y: "28%", r: "1px",   opacity: 0.3, delay: "1.5s"  },
  { x: "78%", y: "24%", r: "1px",   opacity: 0.4, delay: "0.7s"  },
  { x: "44%", y: "16%", r: "1px",   opacity: 0.3, delay: "1.3s"  },
  { x: "60%", y: "20%", r: "1.5px", opacity: 0.5, delay: "0.5s"  },
  { x: "26%", y: "22%", r: "1px",   opacity: 0.4, delay: "1.1s"  },
];

export default function LoadingScreen({ visible }: LoadingScreenProps) {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  // Ease progress toward 92% — leaves room for the "100% snap" when scene is ready
  useEffect(() => {
    const id = setInterval(() => {
      progressRef.current += (92 - progressRef.current) * 0.055;
      setProgress(Math.min(92, progressRef.current));
    }, 60);
    return () => clearInterval(id);
  }, []);

  // Scene ready → snap to 100, then unmount after fade completes
  useEffect(() => {
    if (!visible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(100);
      const t = setTimeout(() => setMounted(false), 1100);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0c1a2e] transition-opacity duration-1000 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute animate-pulse rounded-full bg-white"
            style={{ left: s.x, top: s.y, width: s.r, height: s.r, opacity: s.opacity, animationDelay: s.delay }}
          />
        ))}
      </div>

      {/* Mountain silhouettes */}
      <svg viewBox="0 0 480 200" className="relative w-[min(18rem,85vw)] sm:w-96" aria-hidden="true">
        <polygon points="10,200 130,55 250,200"  fill="#162840" />
        <polygon points="220,200 330,25 440,200" fill="#1a3050" />
        <polygon points="110,200 230,45 350,200" fill="#25476a" />
        <polygon points="0,200 70,135 190,200"   fill="#1a3050" />
        <polygon points="310,200 400,125 480,200" fill="#1a3050" />
        {/* Snow caps */}
        <polygon points="130,55 143,80 117,80"   fill="#cfe0f0" opacity="0.45" />
        <polygon points="330,25 345,54 315,54"   fill="#cfe0f0" opacity="0.45" />
        <polygon points="230,45 244,72 216,72"   fill="#d8eaf8" opacity="0.50" />
        {/* Divine star at highest peak */}
        <circle cx="330" cy="23" r="3.5" fill="#F5C842" opacity="0.95" />
        <line x1="330" y1="14" x2="330" y2="10" stroke="#F5C842" strokeWidth="1" opacity="0.6" />
        <line x1="321" y1="23" x2="317" y2="23" stroke="#F5C842" strokeWidth="1" opacity="0.6" />
        <line x1="339" y1="23" x2="343" y2="23" stroke="#F5C842" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Title — pl-[0.4em] balances trailing letter-spacing so the block looks centered */}
      <h1 className="relative mt-6 pl-[0.4em] text-center text-lg font-semibold tracking-[0.4em] text-white/85 uppercase sm:text-xl">
        Mountain Portfolio
      </h1>
      <p className="relative mt-2 pl-[0.3em] text-center text-xs tracking-[0.3em] text-amber-200/45 uppercase">
        Preparing your journey
      </p>

      {/* Progress bar */}
      <div className="relative mt-8 w-[min(12rem,70vw)] sm:w-60">
        <div className="h-px w-full bg-white/10" />
        <div
          className="absolute inset-y-0 left-0 h-px bg-gradient-to-r from-amber-400/80 to-amber-200/60 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="relative mt-2 text-xs tabular-nums text-white/20">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
