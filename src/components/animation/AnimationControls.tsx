import React from 'react';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { useAnimationStore } from '../../store/useAnimationStore';

export const AnimationControls: React.FC = () => {
    const {
        isPlaying,
        currentAxis,
        progress,
        play,
        pause,
        reset,
        setCurrentAxis,
        setProgress,
    } = useAnimationStore();

    return (
        <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Animation Controls</h3>

            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={isPlaying ? pause : play}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                    onClick={reset}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Integration Axis</label>
                    <div className="flex gap-2">
                        {(['x', 'y', 'z'] as const).map((axis) => (
                            <button
                                key={axis}
                                onClick={() => setCurrentAxis(axis)}
                                className={`px-3 py-1 rounded ${currentAxis === axis
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {axis.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Progress</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={progress}
                        onChange={(e) => setProgress(parseFloat(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                <p>Current Layer: {Math.floor(progress * 100)}%</p>
                <p>Integration Direction: {currentAxis.toUpperCase()} Axis</p>
            </div>
        </div>
    );
};