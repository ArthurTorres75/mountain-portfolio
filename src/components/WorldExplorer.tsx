"use client";

import { useState } from "react";

import SceneViewport from "@/components/SceneViewport";
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
    worldPosition: [2.8, 0.26, -1.4],
  },
  {
    id: SECTION.EXPERIENCE,
    label: "Climbing Road",
    title: "Experience Through Difficult Terrain",
    description:
      "Architecture decisions, migrations and scaling stories from products that had to perform under pressure.",
    worldPosition: [3.7, 0.32, -5.4],
  },
  {
    id: SECTION.PROJECTS,
    label: "Cave Of Challenges",
    title: "Complex Projects, Clear Outcomes",
    description:
      "From legacy rescue to greenfield systems, balancing speed, quality and reliability.",
    worldPosition: [1.1, 0.25, -9.2],
  },
  {
    id: SECTION.HUMAN_SIDE,
    label: "Dog Park",
    title: "Human Side",
    description:
      "Laika and Kira keep every sprint honest: joy, discipline and consistency.",
    worldPosition: [-2.2, 0.2, -5.1],
  },
  {
    id: SECTION.SANCTUARY,
    label: "Hidden Sanctuary",
    title: "Place Of Purpose",
    description:
      "Jesus said, \"I am the way and the truth and the life.\"",
    secondary: "John 14:6",
    worldPosition: [-9.6, 0.28, -12.8],
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

  const setActiveSection = useExperienceStore((s) => s.setActiveSection);

  const selectedLocation = WORLD_LOCATIONS.find((l) => l.id === selectedLocationId) ?? WORLD_LOCATIONS[0];
  const nearestLocation = WORLD_LOCATIONS.find((l) => l.id === nearestLocationId) ?? null;

  function handleEnterLocation(locationId: string) {
    setSelectedLocationId(locationId as WorldLocation["id"]);
    setActiveSection(locationId as Section);
  }

  return (
    <main className="relative h-screen overflow-hidden bg-[#1a2e4a]">
      <SceneViewport
        locations={WORLD_LOCATIONS}
        onEnterLocation={handleEnterLocation}
        onNearestLocationChange={setNearestLocationId}
        selectedLocationId={selectedLocationId}
      />

      <section className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-4 sm:p-7 lg:p-10">
        <header className="max-w-2xl rounded-3xl border border-white/25 bg-white/10 p-4 backdrop-blur-md sm:p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/90">Mountain Portfolio World</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold text-white sm:text-4xl">
            Explorá el mundo
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sky-100/85 sm:text-base">
            Recorré el mapa con WASD y mouse. Acercate a un lugar y presioná E para entrar en sus detalles,
            o hacé click en los nodos dorados del mundo.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <aside className="pointer-events-auto flex max-w-xl flex-wrap items-center gap-2 rounded-2xl border border-white/20 bg-white/8 p-3 backdrop-blur-md">
            {WORLD_LOCATIONS.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => {
                  setSelectedLocationId(location.id);
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

          <article className="pointer-events-auto rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-amber-200/90">{selectedLocation.label}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{selectedLocation.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-100/95 sm:text-base">
              {selectedLocation.description}
            </p>
            {selectedLocation.secondary ? (
              <p className="mt-2 text-sm leading-relaxed text-amber-100/95 sm:text-base">
                {selectedLocation.secondary}
              </p>
            ) : null}
          </article>
        </div>
      </section>

      {nearestLocation ? (
        <div className="pointer-events-none absolute bottom-28 left-1/2 z-20 -translate-x-1/2 rounded-full border border-amber-100/45 bg-black/45 px-4 py-2 text-sm text-amber-100 backdrop-blur">
          Cerca de {nearestLocation.label}. Presiona E para entrar.
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs tracking-[0.18em] text-zinc-100/90 backdrop-blur sm:text-sm">
        WASD mover · Mouse mirar · Shift sprint
      </div>
    </main>
  );
}
