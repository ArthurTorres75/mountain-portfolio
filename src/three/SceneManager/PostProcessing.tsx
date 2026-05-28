"use client";

import { EffectComposer, Bloom, Vignette, FXAA } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

// Skipped on mobile — too expensive. Canvas is always client-only (ssr:false) so window is safe here.
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export default function PostProcessing() {
  if (isMobile) return null;

  return (
    // multisampling={0} — MSAA removed (4x = 4x more fragment work per frame).
    // FXAA replaces it: single post-process pass, visually close, ~10x cheaper.
    <EffectComposer multisampling={0}>
      <FXAA />
      <Bloom
        intensity={0.7}
        kernelSize={KernelSize.MEDIUM}
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
