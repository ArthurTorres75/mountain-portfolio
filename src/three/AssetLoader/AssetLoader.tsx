"use client";

import { useGLTF } from "@react-three/drei";

interface AssetLoaderProps {
  path: string;
}

export default function AssetLoader({ path }: AssetLoaderProps) {
  useGLTF(path);
  return null;
}
