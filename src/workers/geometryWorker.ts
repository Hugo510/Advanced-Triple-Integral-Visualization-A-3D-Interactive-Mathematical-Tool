// Web Worker for geometry calculations
import { isPointInFunction } from "../utils/mathParser";

self.onmessage = (e) => {
  const { positions, fn, resolution } = e.data;
  const newPositions = new Float32Array(positions.length);

  // Process vertices in chunks for better performance
  const chunkSize = 1000;
  for (let i = 0; i < positions.length; i += chunkSize * 3) {
    const end = Math.min(i + chunkSize * 3, positions.length);
    for (let j = i; j < end; j += 3) {
      const x = positions[j];
      const y = positions[j + 1];
      const z = positions[j + 2];

      if (isPointInFunction(fn, x, y, z)) {
        newPositions[j] = x;
        newPositions[j + 1] = y;
        newPositions[j + 2] = z;
      }
    }
  }

  self.postMessage({ positions: newPositions }, [newPositions.buffer]);
};
