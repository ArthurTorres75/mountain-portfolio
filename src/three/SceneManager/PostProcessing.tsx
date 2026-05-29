"use client";

import { EffectComposer, Bloom, Vignette, FXAA } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

// PostProcessing is only mounted inside SceneManager, which SceneViewport
// never renders on mobile — no separate mobile guard needed here.
export default function PostProcessing() {
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
