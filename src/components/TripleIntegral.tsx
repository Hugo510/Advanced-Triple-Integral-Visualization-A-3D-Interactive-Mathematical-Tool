import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useIntegrationStore } from '../store/useIntegrationStore';
import { useAnimationStore } from '../store/useAnimationStore';
import { DifferentialElement } from './animation/DifferentialElement';
import { IntegrationLayer } from './animation/IntegrationLayer';
import { Sphere } from './solids/Sphere';
import { Cylinder } from './solids/Cylinder';
import { Torus } from './solids/Torus';
import { CustomSolid } from './solids/CustomSolid';

export const TripleIntegral: React.FC = () => {
  const {
    bounds,
    resolution,
    showDifferentials,
    transparency,
    function: fn,
    solidType,
    boundFunctions,
    animationSpeed,
  } = useIntegrationStore();

  const {
    isPlaying,
    currentAxis,
    progress,
    setProgress,
    differentialElements,
    addDifferentialElement,
    addCompletedLayer,
  } = useAnimationStore();

  useFrame((state) => {
    if (isPlaying) {
      const newProgress = progress + 0.001 * animationSpeed;
      if (newProgress >= 1) {
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }
  });

  useEffect(() => {
    if (progress >= 1) {
      addCompletedLayer(Math.floor(progress * resolution));
    }
  }, [progress, resolution]);

  const generateDifferentialElements = () => {
    const elements: JSX.Element[] = [];
    const layerCount = Math.floor(progress * resolution);

    for (let i = 0; i < layerCount; i++) {
      const t = i / resolution;
      const delay = t;

      const position: [number, number, number] = [0, 0, 0];
      const size: [number, number, number] = [
        bounds.x[1] - bounds.x[0],
        bounds.y[1] - bounds.y[0],
        bounds.z[1] - bounds.z[0],
      ].map((s) => s / resolution) as [number, number, number];

      switch (currentAxis) {
        case 'x':
          position[0] = bounds.x[0] + t * (bounds.x[1] - bounds.x[0]);
          break;
        case 'y':
          position[1] = bounds.y[0] + t * (bounds.y[1] - bounds.y[0]);
          break;
        case 'z':
          position[2] = bounds.z[0] + t * (bounds.z[1] - bounds.z[0]);
          break;
      }

      elements.push(
        <DifferentialElement
          key={i}
          position={position}
          size={size}
          delay={delay}
        />
      );
    }

    return elements;
  };

  const solidProps = {
    resolution,
    showDifferentials,
    transparency: transparency * (1 - progress * 0.7),
    bounds,
    boundFunctions,
  };

  return (
    <group>
      {solidType === 'sphere' && <Sphere {...solidProps} />}
      {solidType === 'cylinder' && <Cylinder {...solidProps} />}
      {solidType === 'torus' && <Torus {...solidProps} />}
      {solidType === 'custom' && <CustomSolid {...solidProps} function={fn} />}

      {showDifferentials && generateDifferentialElements()}

      {Array.from({ length: resolution }).map((_, i) => (
        <IntegrationLayer
          key={i}
          layer={i}
          height={bounds[currentAxis][0] + (i / resolution) * (bounds[currentAxis][1] - bounds[currentAxis][0])}
          bounds={[bounds.x[0], bounds.x[1], bounds.y[0], bounds.y[1]]}
          axis={currentAxis}
        />
      ))}
    </group>
  );
};