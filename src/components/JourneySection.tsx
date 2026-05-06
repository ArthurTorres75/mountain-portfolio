"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface JourneySectionProps {
  id: string;
  label: string;
  title: string;
  copy: string;
  secondary?: string;
}

export default function JourneySection({
  id,
  label,
  title,
  copy,
  secondary,
}: JourneySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="rounded-3xl border border-white/15 bg-white/8 p-7 backdrop-blur-md sm:p-10"
    >
      <p className="text-xs uppercase tracking-[0.26em] text-amber-100/90">{label}</p>
      <h2 className="mt-3 text-pretty text-2xl font-semibold text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-100/90 sm:text-lg">
        {copy}
      </p>
      {secondary ? (
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-amber-100/95 sm:text-lg">
          {secondary}
        </p>
      ) : null}
    </section>
  );
}
