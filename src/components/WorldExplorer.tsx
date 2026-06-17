"use client";

import { useCallback, useState } from "react";

import SceneViewport from "@/components/SceneViewport";
import LoadingScreen from "@/components/LoadingScreen";
import StationEntryPrompt from "@/components/StationEntryPrompt";
import { useExperienceStore } from "@/store/useExperienceStore";
import { SECTION, type Section, type WorldLocation } from "@/types";

const WORLD_LOCATIONS: WorldLocation[] = [
  {
    id: SECTION.ABOUT,
    label: "Base Town",
    title: "Arthur Torres, Computer Engineer",
    description:
      "Computer Engineer with 8+ years building web applications that run fast, hold up under load, and grow with the business. I work with method — and when no path exists, I design one.",
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
    worldPosition: [-16.0, 0.2, 1.0],
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
    worldPosition: [-18.0, 0.28, -24.0],
  },
  {
    id: SECTION.CONTACT,
    label: "Summit Viewpoint",
    title: "Let Us Build Something Lasting",
    description: "I build with discipline, gratitude, and purpose.",
    secondary: "Guided since before the beginning.",
    worldPosition: [11.0, 0.5, -13.5],
  },
];

export default function WorldExplorer() {
  const [selectedLocationId, setSelectedLocationId] = useState<WorldLocation["id"]>(SECTION.ABOUT);
  const [nearestLocationId, setNearestLocationId] = useState<string | null>(null);
  const [sanctuaryActivated, setSanctuaryActivated] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [pendingStationId, setPendingStationId] = useState<string | null>(null);

  const setActiveSection = useExperienceStore((s) => s.setActiveSection);

  const selectedLocation = WORLD_LOCATIONS.find((l) => l.id === selectedLocationId) ?? WORLD_LOCATIONS[0];
  const nearestLocation = WORLD_LOCATIONS.find((l) => l.id === nearestLocationId) ?? null;
  const pendingLocation = pendingStationId
    ? WORLD_LOCATIONS.find((l) => l.id === pendingStationId) ?? null
    : null;

  function activateSanctuary(locationId: string) {
    if (locationId === SECTION.SANCTUARY) setSanctuaryActivated(true);
  }

  function handleEnterLocation(locationId: string) {
    setSelectedLocationId(locationId as WorldLocation["id"]);
    setActiveSection(locationId as Section);
    activateSanctuary(locationId);
    setPendingStationId(locationId);
  }

  const handleClosePrompt = useCallback(() => {
    setPendingStationId(null);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#1a2e4a] lg:h-screen lg:overflow-hidden">
      <SceneViewport
        locations={WORLD_LOCATIONS}
        onEnterLocation={handleEnterLocation}
        onNearestLocationChange={setNearestLocationId}
        selectedLocationId={selectedLocationId}
        sanctuaryActivated={sanctuaryActivated}
        onReady={() => setSceneReady(true)}
      />
      <LoadingScreen visible={!sceneReady} />

      {/* Mobile layout: vertical stack with normal flow.
          Desktop (lg+): wrapper fills the viewport so each lg:absolute child anchors to main. */}
      <div className="pointer-events-none relative z-10 flex flex-col gap-4 p-4 sm:gap-5 sm:p-6 lg:absolute lg:inset-0 lg:gap-0 lg:p-0">
        {/* Header + portfolio link */}
        <div className="pointer-events-auto flex flex-col items-stretch gap-3 lg:absolute lg:inset-x-0 lg:top-0 lg:flex-row lg:items-start lg:justify-between lg:gap-4 lg:p-10">
          <header className="rounded-3xl border border-white/25 bg-white/10 p-4 backdrop-blur-md sm:p-6 lg:max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/90">Mountain Portfolio World</p>
            <h1 className="mt-3 text-balance text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Explore The World
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-sky-100/85 sm:text-base">
              <span className="hidden lg:inline">
                Navigate with WASD and mouse. Approach a location and press E to reveal its details,
                or click the golden markers on the map.
              </span>
              <span className="lg:hidden">
                Tap a location below to learn about each stop on the journey.
              </span>
            </p>
          </header>

          <a
            href="https://arthurtorres75.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Arthur Torres portfolio"
            className="self-start rounded-full border border-amber-300/40 bg-black/40 px-4 py-2 text-center text-sm font-semibold text-amber-200 backdrop-blur-md transition-colors hover:border-amber-300/70 hover:bg-amber-300/20 lg:flex-shrink-0"
          >
            See Portfolio →
          </a>
        </div>

        {/* Mobile-only notice — hidden on desktop */}
        <div className="pointer-events-auto rounded-2xl border border-amber-300/30 bg-amber-300/10 p-3 text-center text-xs leading-relaxed text-amber-100 backdrop-blur-md sm:text-sm lg:hidden">
          For the full 3D mountain experience, please open this site on desktop.
        </div>

        {/* Location detail */}
        <article className="pointer-events-auto max-h-none overflow-visible rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:p-5 lg:absolute lg:bottom-16 lg:right-10 lg:max-h-56 lg:w-[340px] lg:overflow-y-auto">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-200/90">{selectedLocation.label}</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">{selectedLocation.title}</h2>
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

        {/* Nav buttons */}
        <aside className="pointer-events-auto flex flex-wrap content-start items-center gap-2 rounded-2xl border border-white/20 bg-white/8 p-3 backdrop-blur-md lg:absolute lg:bottom-16 lg:left-10 lg:max-w-xl">
          {WORLD_LOCATIONS.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => {
                setSelectedLocationId(location.id);
                activateSanctuary(location.id);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors sm:px-4 sm:py-2 sm:text-sm ${
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

      {/* Desktop-only HUD hints */}
      {nearestLocation ? (
        <div className="pointer-events-none absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-amber-100/45 bg-black/45 px-4 py-2 text-sm text-amber-100 backdrop-blur lg:block">
          Near {nearestLocation.label}. Press E to enter.
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs tracking-[0.18em] text-zinc-100/90 backdrop-blur lg:block lg:text-sm">
        WASD move · Mouse look · Shift sprint · ESC release mouse
      </div>

      {pendingLocation ? (
        <StationEntryPrompt
          stationId={pendingLocation.id}
          stationLabel={pendingLocation.label}
          onClose={handleClosePrompt}
        />
      ) : null}
    </main>
  );
}
