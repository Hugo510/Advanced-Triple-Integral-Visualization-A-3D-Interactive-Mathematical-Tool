import { useState, useEffect } from "react";
import * as THREE from "three";

export const useGeometryWorker = (
  fn: string,
  resolution: number,
  dependencies: any[] = []
) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/geometryWorker.ts", import.meta.url),
      { type: "module" }
    );

    const geo = new THREE.BoxGeometry(
      1,
      1,
      1,
      resolution,
      resolution,
      resolution
    );
    const positions = geo.attributes.position.array;

    worker.postMessage(
      {
        positions: positions,
        fn,
        resolution,
      },
      [positions.buffer]
    );

    worker.onmessage = (e) => {
      const { positions } = e.data;
      const newGeometry = new THREE.BufferGeometry();
      newGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      newGeometry.computeVertexNormals();
      setGeometry(newGeometry);
    };

    return () => worker.terminate();
  }, [fn, resolution, ...dependencies]);

  return geometry;
};
