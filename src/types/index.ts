// Section identifiers
export const SECTION = {
  HERO: "hero",
  ABOUT: "about",
  SKILLS: "skills",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  HUMAN_SIDE: "human-side",
  SANCTUARY: "sanctuary",
  CONTACT: "contact",
} as const;

export type Section = (typeof SECTION)[keyof typeof SECTION];

// Camera state used by exploration controls
export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  section: Section;
}

export interface WorldLocation {
  id: Exclude<Section, "hero">;
  label: string;
  title: string;
  description: string;
  secondary?: string;
  quotes?: string[];
  worldPosition: [number, number, number];
}

// Asset manifest entry
export interface SceneAsset {
  id: string;
  path: string;
  type: "gltf" | "texture" | "audio";
}
