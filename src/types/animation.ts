import { Point3D } from "./math";

export interface AnimationState {
  currentLayer: number;
  isPlaying: boolean;
  currentAxis: "x" | "y" | "z";
  differentialElements: Point3D[];
  completedLayers: number[];
  progress: number;
}

export interface AnimationControls {
  play: () => void;
  pause: () => void;
  reset: () => void;
  setCurrentAxis: (axis: "x" | "y" | "z") => void;
  setProgress: (progress: number) => void;
}
