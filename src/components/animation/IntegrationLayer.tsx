import React from 'react';
import * as THREE from 'three';
import { useAnimationStore } from '../../store/useAnimationStore';

interface IntegrationLayerProps {
    layer: number;
    height: number;
    bounds: [number, number, number, number];
    axis: 'x' | 'y' | 'z';
}

export const IntegrationLayer: React.FC<IntegrationLayerProps> = ({
    layer,
    height,
    bounds,
    axis,
}) => {
    const completedLayers = useAnimationStore((state) => state.completedLayers);
    const isCompleted = completedLayers.includes(layer);

    const getLayerGeometry = () => {
        switch (axis) {
            case 'x':
                return new THREE.PlaneGeometry(
                    bounds[1] - bounds[0],
                    bounds[3] - bounds[2]
                );
            case 'y':
                return new THREE.PlaneGeometry(
                    bounds[1] - bounds[0],
                    bounds[3] - bounds[2]
                );
            case 'z':
                return new THREE.PlaneGeometry(
                    bounds[1] - bounds[0],
                    bounds[3] - bounds[2]
                );
        }
    };

    const getLayerPosition = (): [number, number, number] => {
        const center = [
            (bounds[1] + bounds[0]) / 2,
            (bounds[3] + bounds[2]) / 2,
            height,
        ];

        switch (axis) {
            case 'x':
                return [height, center[1], center[2]];
            case 'y':
                return [center[0], height, center[2]];
            case 'z':
                return [center[0], center[1], height];
        }
    };

    return (
        <mesh position={getLayerPosition()} rotation={axis === 'y' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}>
            <primitive object={getLayerGeometry()} />
            <meshPhysicalMaterial
                color={new THREE.Color(isCompleted ? 0x60a5fa : 0x3b82f6)}
                transparent
                opacity={0.3}
                metalness={0.1}
                roughness={0.2}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};