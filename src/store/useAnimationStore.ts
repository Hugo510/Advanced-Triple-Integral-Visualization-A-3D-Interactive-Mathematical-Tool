import { create } from "zustand";
import { AnimationState } from "../types/animation";

interface AnimationStore extends AnimationState {
  play: () => void;
  pause: () => void;
  reset: () => void;
  setCurrentAxis: (axis: "x" | "y" | "z") => void;
  setProgress: (progress: number) => void;
  addDifferentialElement: (element: [number, number, number]) => void;
  addCompletedLayer: (layer: number) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  currentLayer: 0,
  isPlaying: false,
  currentAxis: "z",
  differentialElements: [],
  completedLayers: [],
  progress: 0,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () =>
    set({
      currentLayer: 0,
      isPlaying: false,
      differentialElements: [],
      completedLayers: [],
      progress: 0,
    }),
  setCurrentAxis: (axis) => set({ currentAxis: axis }),
  setProgress: (progress) => set({ progress }),
  addDifferentialElement: (element) =>
    set((state) => ({
      differentialElements: [...state.differentialElements, element],
    })),
  addCompletedLayer: (layer) =>
    set((state) => ({
      completedLayers: [...state.completedLayers, layer],
    })),
}));
