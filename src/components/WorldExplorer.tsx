"use client";

import { useState } from "react";

import SceneViewport from "@/components/SceneViewport";
import LoadingScreen from "@/components/LoadingScreen";
import { useExperienceStore } from "@/store/useExperienceStore";
import { SECTION, type Section, type WorldLocation } from "@/types";

const WORLD_LOCATIONS: WorldLocation[] = [
  {
    id: SECTION.ABOUT,
    label: "Base Town",
    title: "Arthur, Full Stack Engineer",
    description:
      "Building resilient systems with thoughtful product execution and long-term maintainability.",
    worldPosition: [0, 0.18, 2.4],
  },
  {
    id: SECTION.SKILLS,
    label: "Workshop Cabin",
    title: "Stack And Craft",
    description:
      "React, Angular, Next.js, NestJS, Node.js, MongoDB, PostgreSQL, AWS, TypeScript and Clean Architecture.",
    worldPosition: [2.4, 1.0, -6.2],
  },
  {
    id: SECTION.EXPERIENCE,
    label: "Climbing Road",
    title: "Experience Through Difficult Terrain",
    description:
      "Architecture decisions, migrations and scaling stories from products that had to perform under pressure.",
    worldPosition: [1.5, 2.0, -17.5],
  },
  {
    id: SECTION.PROJECTS,
    label: "Cave Of Challenges",
    title: "Complex Projects, Clear Outcomes",
    description:
      "From legacy rescue to greenfield systems, balancing speed, quality and reliability.",
    worldPosition: [-7.0, 0.2, -23.5],
  },
  {
    id: SECTION.HUMAN_SIDE,
    label: "Dog Park",
    title: "Human Side",
    description:
      "My wife walks every road with me — my life partner, my support, and my greatest source of growth. Laika and Kira keep every sprint honest: joy, discipline and consistency.",
    worldPosition: [-2.2, 0.2, -5.1],
  },
  {
    id: SECTION.SANCTUARY,
    label: "Hidden Sanctuary",
    title: "Place Of Purpose",
    description:
      "Jesus said, \"I am the way and the truth and the life.\"",
    secondary: "John 14:6",
    quotes: [
      "\"Seek first the kingdom of God and his righteousness, and all these things will be added to you.\" — Matthew 6:33",
      "\"Pray to your Father who sees in secret, and your Father who sees in secret will reward you openly.\" — Matthew 6:6",
      "All glory be to God.",
    ],
    worldPosition: [-14.5, 0.28, -15.5],
  },
  {
    id: SECTION.CONTACT,
    label: "Summit Viewpoint",
    title: "Let Us Build Something Lasting",
    description: "I build with discipline, gratitude, and purpose.",
    secondary: "Guided since before the beginning.",
    worldPosition: [8.1, 0.24, -13.8],
  },
];

export default function WorldExplorer() {
  const [selectedLocationId, setSelectedLocationId] = useState<WorldLocation["id"]>(SECTION.ABOUT);
  const [nearestLocationId, setNearestLocationId] = useState<string | null>(null);
  const [sanctuaryActivated, setSanctuaryActivated] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const setActiveSection = useExperienceStore((s) => s.setActiveSection);

  const selectedLocation = WORLD_LOCATIONS.find((l) => l.id === selectedLocationId) ?? WORLD_LOCATIONS[0];
  const nearestLocation = WORLD_LOCATIONS.find((l) => l.id === nearestLocationId) ?? null;

  function activateSanctuary(locationId: string) {
    if (locationId === SECTION.SANCTUARY) setSanctuaryActivated(true);
  }

  function handleEnterLocation(locationId: string) {
    setSelectedLocationId(locationId as WorldLocation["id"]);
    setActiveSection(locationId as Section);
    activateSanctuary(locationId);
  }

  return (
    <main className="relative h-screen overflow-hidden bg-[#1a2e4a]">
      <SceneViewport
        locations={WORLD_LOCATIONS}
        onEnterLocation={handleEnterLocation}
        onNearestLocationChange={setNearestLocationId}
        selectedLocationId={selectedLocationId}
        sanctuaryActivated={sanctuaryActivated}
        onReady={() => setSceneReady(true)}
      />
      <LoadingScreen visible={!sceneReady} />

      {/* Top panel — header + portfolio link */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-7 lg:p-10">
        <header className="max-w-2xl rounded-3xl border border-white/25 bg-white/10 p-4 backdrop-blur-md sm:p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/90">Mountain Portfolio World</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold text-white sm:text-4xl">
            Explore The World
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sky-100/85 sm:text-base">
            Navigate with WASD and mouse. Approach a location and press E to reveal its details,
            or click the golden markers on the map.
          </p>
        </header>

        <a
          href="https://arthurtorres75.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Arthur Torres portfolio"
          className="pointer-events-auto flex-shrink-0 rounded-full border border-amber-300/40 bg-black/40 px-4 py-2 text-sm font-semibold text-amber-200 backdrop-blur-md transition-colors hover:border-amber-300/70 hover:bg-amber-300/20"
        >
          See Portfolio →
        </a>
      </div>

      {/* Nav buttons — independently anchored to bottom-left, never moves */}
      <div className="pointer-events-none absolute bottom-14 left-4 z-10 sm:bottom-14 sm:left-7 lg:bottom-16 lg:left-10">
        <aside className="pointer-events-auto flex max-w-xl flex-wrap content-start items-center gap-2 rounded-2xl border border-white/20 bg-white/8 p-3 backdrop-blur-md">
          {WORLD_LOCATIONS.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => {
                setSelectedLocationId(location.id);
                activateSanctuary(location.id);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors sm:text-sm ${
                selectedLocation.id === location.id
                  ? "bg-amber-300 text-zinc-950"
                  : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {location.label}
            </button>
          ))}
        </aside>
      </div>

      {/* Location detail — independently anchored to bottom-right, grows up on its own */}
      <div className="pointer-events-none absolute bottom-14 right-4 z-10 hidden w-[340px] sm:bottom-14 sm:right-7 lg:bottom-16 lg:right-10 lg:block">
        <article className="pointer-events-auto max-h-56 overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-200/90">{selectedLocation.label}</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{selectedLocation.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-100/95">
            {selectedLocation.description}
          </p>
          {selectedLocation.secondary ? (
            <p className="mt-2 text-sm leading-relaxed text-amber-100/95">
              {selectedLocation.secondary}
            </p>
          ) : null}
          {selectedLocation.quotes?.map((quote, i) => (
            <p key={i} className="mt-2 text-sm leading-relaxed text-amber-100/80 italic">
              {quote}
            </p>
          ))}
        </article>
      </div>

      {nearestLocation ? (
        <div className="pointer-events-none absolute bottom-28 left-1/2 z-20 -translate-x-1/2 rounded-full border border-amber-100/45 bg-black/45 px-4 py-2 text-sm text-amber-100 backdrop-blur">
          Near {nearestLocation.label}. Press E to enter.
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs tracking-[0.18em] text-zinc-100/90 backdrop-blur sm:text-sm">
        WASD move · Mouse look · Shift sprint · ESC release mouse
      </div>
    </main>
  );
}
