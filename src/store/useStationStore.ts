import { create } from 'zustand'

type StationTheme = 'journal' | 'cinematic'

interface StationState {
  activeStation: string | null
  theme: StationTheme
  scrollProgress: number
  setActiveStation: (id: string | null) => void
  setTheme: (theme: StationTheme) => void
  setScrollProgress: (p: number) => void
}

export const useStationStore = create<StationState>((set) => ({
  activeStation: null,
  theme: 'journal',
  scrollProgress: 0,
  setActiveStation: (id) => set({ activeStation: id }),
  setTheme: (theme) => set({ theme }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
}))
