"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AtmosphereParallax() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) {
        return;
      }

      const layers = gsap.utils.toArray<HTMLElement>("[data-parallax-layer]", rootRef.current);

      layers.forEach((layer) => {
        const amplitude = Number(layer.dataset.velocity ?? "20");

        gsap.to(layer, {
          y: amplitude * 0.4,
          x: amplitude * 0.15,
          duration: 5 + amplitude * 0.06,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        data-parallax-layer
        data-velocity="24"
        className="absolute -left-24 top-24 h-56 w-56 rounded-full bg-amber-200/16 blur-3xl"
      />
      <div
        data-parallax-layer
        data-velocity="38"
        className="absolute right-0 top-[22%] h-72 w-72 rounded-full bg-sky-300/12 blur-3xl"
      />
      <div
        data-parallax-layer
        data-velocity="52"
        className="absolute left-[36%] top-[38%] h-80 w-80 rounded-full bg-amber-100/10 blur-3xl"
      />
      <div
        data-parallax-layer
        data-velocity="30"
        className="absolute -right-20 bottom-[16%] h-64 w-64 rounded-full bg-yellow-100/14 blur-3xl"
      />
    </div>
  );
}
