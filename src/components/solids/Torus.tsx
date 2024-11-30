import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const Torus: React.FC<any> = ({
    resolution,
    showDifferentials,
    transparency,
    bounds,
}) => {
    const geometry = useMemo(() => {
        return new THREE.TorusGeometry(0.5, 0.2, resolution, resolution);
    }, [resolution]);

    const material = useMemo(() => {
        return new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0x2563eb),
            transparent: true,
            opacity: transparency,
            metalness: 0.2,
            roughness: 0.1,
        });
    }, [transparency]);

    useFrame((state) => {
        if (showDifferentials) {
            material.opacity = 0.3 + Math.sin(state.clock.getElapsedTime()) * 0.1;
        }
    });

    const scale = Math.min(
        bounds.x[1] - bounds.x[0],
        bounds.y[1] - bounds.y[0],
        bounds.z[1] - bounds.z[0]
    );

    const position = [
        (bounds.x[0] + bounds.x[1]) / 2,
        (bounds.y[0] + bounds.y[1]) / 2,
        (bounds.z[0] + bounds.z[1]) / 2,
    ];

    return (
        <mesh
            geometry={geometry}
            material={material}
            position={position}
            scale={scale}
            castShadow
            receiveShadow
        />
    );
};