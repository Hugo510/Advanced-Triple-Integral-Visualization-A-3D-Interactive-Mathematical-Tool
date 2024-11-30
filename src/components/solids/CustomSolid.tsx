import React, { useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGeometryWorker } from '../../hooks/useGeometryWorker';

export const CustomSolid: React.FC<any> = ({
    resolution,
    showDifferentials,
    transparency,
    bounds,
    function: fn,
}) => {
    const geometry = useGeometryWorker(fn, resolution, []);

    const material = useMemo(() => {
        return new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0x2563eb),
            transparent: true,
            opacity: transparency,
            metalness: 0.2,
            roughness: 0.1,
            side: THREE.DoubleSide,
        });
    }, [transparency]);

    const updateOpacity = useCallback((time: number) => {
        if (showDifferentials) {
            material.opacity = 0.3 + Math.sin(time) * 0.1;
        }
    }, [showDifferentials, material]);

    useFrame((state) => {
        updateOpacity(state.clock.getElapsedTime());
    });

    const scale = [
        bounds.x[1] - bounds.x[0],
        bounds.y[1] - bounds.y[0],
        bounds.z[1] - bounds.z[0],
    ];

    const position = [
        bounds.x[0] + scale[0] / 2,
        bounds.y[0] + scale[1] / 2,
        bounds.z[0] + scale[2] / 2,
    ];

    if (!geometry) return null;

    return (
        <mesh
            geometry={geometry}
            material={material}
            position={position}
            scale={scale}
            castShadow
            receiveShadow
            frustumCulled={true}
        />
    );
};