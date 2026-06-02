"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// World uses section IDs (about, skills…), station pages use slug IDs (base-town, workshop-cabin…).
const SECTION_TO_STATION: Record<string, string> = {
  about: "base-town",
  skills: "workshop-cabin",
  experience: "climbing-road",
  projects: "cave-of-challenges",
  "human-side": "dog-park",
  sanctuary: "hidden-sanctuary",
  contact: "summit-viewpoint",
};

interface StationEntryPromptProps {
  stationId: string;
  stationLabel: string;
  onClose: () => void;
}

export default function StationEntryPrompt({
  stationId,
  stationLabel,
  onClose,
}: StationEntryPromptProps) {
  const router = useRouter();
  const stationSlug = SECTION_TO_STATION[stationId] ?? stationId;

  const handleEnter = useCallback(() => {
    router.push(`/station/${stationSlug}`);
  }, [router, stationSlug]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === "Enter" || event.code === "KeyY") {
        event.preventDefault();
        handleEnter();
      }
      if (event.code === "Escape" || event.code === "KeyN") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleEnter, onClose]);

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Enter ${stationLabel}`}
    >
      <div className="mx-4 flex max-w-sm flex-col items-center gap-5 rounded-3xl border border-amber-300/30 bg-zinc-900/90 px-8 py-7 shadow-2xl backdrop-blur-lg">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">
          Station found
        </p>
        <h2 className="text-center text-xl font-semibold text-white">
          Enter {stationLabel}?
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleEnter}
            className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
            aria-label={`Yes, enter ${stationLabel}`}
          >
            Enter
            <kbd className="ml-2 hidden rounded bg-amber-600/30 px-1.5 py-0.5 text-[10px] text-amber-950 lg:inline">
              Y
            </kbd>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            aria-label="Stay in the world"
          >
            Stay
            <kbd className="ml-2 hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60 lg:inline">
              N
            </kbd>
          </button>
        </div>
        <p className="text-xs text-zinc-400">
          <span className="hidden lg:inline">Press Y to enter, N or Esc to stay</span>
          <span className="lg:hidden">Tap to choose</span>
        </p>
      </div>
    </div>
  );
}
