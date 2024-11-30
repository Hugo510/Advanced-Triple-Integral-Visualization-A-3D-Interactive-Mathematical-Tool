export interface IntegrationBounds {
  x: [number, number];
  y: [number, number];
  z: [number, number];
}

export interface IntegrationState {
  bounds: IntegrationBounds;
  resolution: number;
  showDifferentials: boolean;
  animationSpeed: number;
  transparency: number;
  function: string;
  boundFunctions: {
    x: [string, string];
    y: [string, string];
    z: [string, string];
  };
  solidType: "custom" | "sphere" | "cylinder" | "torus";
  error: string | null;
}

export type Point3D = [number, number, number];

export interface ParametricSurface {
  x: (u: number, v: number) => number;
  y: (u: number, v: number) => number;
  z: (u: number, v: number) => number;
}
