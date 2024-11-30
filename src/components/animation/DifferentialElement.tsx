import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimationStore } from '../../store/useAnimationStore';

interface DifferentialElementProps {
    position: [number, number, number];
    size: [number, number, number];
    delay: number;
}

export const DifferentialElement: React.FC<DifferentialElementProps> = ({
    position,
    size,
    delay,
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const progress = useAnimationStore((state) => state.progress);
    const isPlaying = useAnimationStore((state) => state.isPlaying);

    useFrame((state) => {
        if (!meshRef.current || !isPlaying) return;

        const time = state.clock.getElapsedTime();
        const fadeIn = Math.max(0, Math.min(1, (progress - delay) * 2));

        meshRef.current.scale.set(
            size[0] * fadeIn,
            size[1] * fadeIn,
            size[2] * fadeIn
        );

        meshRef.current.material.opacity = fadeIn * 0.7;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
                color={new THREE.Color(0x3b82f6)}
                transparent
                opacity={0}
                metalness={0.1}
                roughness={0.2}
            />
        </mesh>
    );
};