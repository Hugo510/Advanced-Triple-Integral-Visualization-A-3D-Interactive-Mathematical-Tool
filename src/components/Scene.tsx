import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera } from '@react-three/drei';
import { TripleIntegral } from './TripleIntegral';
import { AnimationControls } from './animation/AnimationControls';
import { LoadingSpinner } from './LoadingSpinner';

export const Scene: React.FC = () => {
  return (
    <>
      <Canvas
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Adaptive resolution based on device pixel ratio
      >
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <Suspense fallback={null}>
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#374151"
            fadeDistance={30}
            fadeStrength={1}
            followCamera={false}
          />

          <TripleIntegral />
        </Suspense>
      </Canvas>
      <AnimationControls />
      <LoadingSpinner />
    </>
  );
};