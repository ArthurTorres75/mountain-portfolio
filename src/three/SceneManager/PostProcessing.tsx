"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

// Skipped on mobile — too expensive. Canvas is always client-only (ssr:false) so window is safe here.
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export default function PostProcessing() {
  if (isMobile) return null;

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.8}
        kernelSize={KernelSize.LARGE}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.08}
        mipmapBlur
      />
      <Vignette
        offset={0.4}
        darkness={0.65}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
