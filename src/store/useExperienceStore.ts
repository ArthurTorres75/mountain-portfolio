import { create } from "zustand";
import type { Section } from "@/types";

// Navigation modes: free-roam = player controls camera freely,
// focus-event = GSAP takes over briefly for a cinematic beat,
// guided-mobile = simplified click-to-navigate for touchscreens
const NAV_MODE = {
  FREE_ROAM: "free-roam",
  FOCUS_EVENT: "focus-event",
  GUIDED_MOBILE: "guided-mobile",
} as const;

type NavMode = (typeof NAV_MODE)[keyof typeof NAV_MODE];

const QUALITY = {
  HIGH: "high",
  LOW: "low",
} as const;

type Quality = (typeof QUALITY)[keyof typeof QUALITY];

interface ExperienceState {
  navMode: NavMode;
  activeSection: Section | null;
  quality: Quality;
  isMobile: boolean;
  audioEnabled: boolean;

  setNavMode: (mode: NavMode) => void;
  setActiveSection: (section: Section | null) => void;
  setQuality: (quality: Quality) => void;
  setIsMobile: (isMobile: boolean) => void;
  toggleAudio: () => void;

  enterFocusEvent: (section: Section) => void;
  exitFocusEvent: () => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  navMode: NAV_MODE.FREE_ROAM,
  activeSection: null,
  quality: QUALITY.HIGH,
  isMobile: false,
  audioEnabled: false,

  setNavMode: (mode) => set({ navMode: mode }),
  setActiveSection: (section) => set({ activeSection: section }),
  setQuality: (quality) => set({ quality }),
  setIsMobile: (isMobile) =>
    set({ isMobile, navMode: isMobile ? NAV_MODE.GUIDED_MOBILE : NAV_MODE.FREE_ROAM }),
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),

  enterFocusEvent: (section) =>
    set({ navMode: NAV_MODE.FOCUS_EVENT, activeSection: section }),
  exitFocusEvent: () =>
    set({ navMode: NAV_MODE.FREE_ROAM }),
}));

// Re-export constants for consumers
export { NAV_MODE, QUALITY };
