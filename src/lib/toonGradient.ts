import { DataTexture, NearestFilter, RedFormat } from "three";

// 3-step cel-shade gradient: shadow → midtone → highlight
// Shared singleton — create once, reuse across all MeshToonMaterial instances.
let _gradientMap: DataTexture | null = null;

export function getToonGradientMap(): DataTexture {
  if (!_gradientMap) {
    const pixels = new Uint8Array([50, 150, 255]);
    _gradientMap = new DataTexture(pixels, 3, 1, RedFormat);
    _gradientMap.needsUpdate = true;
    _gradientMap.magFilter = NearestFilter;
    _gradientMap.minFilter = NearestFilter;
  }
  return _gradientMap;
}
