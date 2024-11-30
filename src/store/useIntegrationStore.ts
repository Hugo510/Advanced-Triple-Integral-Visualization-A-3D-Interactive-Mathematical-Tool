import { create } from "zustand";
import { IntegrationState, IntegrationBounds } from "../types/math";
import { validateExpression } from "../utils/mathParser";

interface IntegrationStore extends IntegrationState {
  setBounds: (axis: keyof IntegrationBounds, bounds: [number, number]) => void;
  setResolution: (resolution: number) => void;
  setShowDifferentials: (show: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setTransparency: (transparency: number) => void;
  setFunction: (fn: string) => void;
  setBoundFunction: (
    axis: keyof IntegrationBounds,
    index: 0 | 1,
    fn: string
  ) => void;
  setSolidType: (type: IntegrationState["solidType"]) => void;
}

export const useIntegrationStore = create<IntegrationStore>((set) => ({
  bounds: {
    x: [-1, 1],
    y: [-1, 1],
    z: [-1, 1],
  },
  boundFunctions: {
    x: ["0", "1"],
    y: ["0", "1"],
    z: ["0", "1"],
  },
  resolution: 50,
  showDifferentials: true,
  animationSpeed: 1,
  transparency: 0.7,
  function: "x^2 + y^2 + z^2 - 1",
  solidType: "custom",
  error: null,
  setBounds: (axis, bounds) =>
    set((state) => ({
      bounds: { ...state.bounds, [axis]: bounds },
    })),
  setResolution: (resolution) => set({ resolution }),
  setShowDifferentials: (showDifferentials) => set({ showDifferentials }),
  setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
  setTransparency: (transparency) => set({ transparency }),
  setFunction: (fn) =>
    set({
      function: fn,
      error: validateExpression(fn),
    }),
  setBoundFunction: (axis, index, fn) =>
    set((state) => ({
      boundFunctions: {
        ...state.boundFunctions,
        [axis]:
          index === 0
            ? [fn, state.boundFunctions[axis][1]]
            : [state.boundFunctions[axis][0], fn],
      },
      error: validateExpression(fn),
    })),
  setSolidType: (solidType) => set({ solidType }),
}));
