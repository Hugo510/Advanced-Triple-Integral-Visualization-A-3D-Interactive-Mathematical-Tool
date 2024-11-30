import React from 'react';
import { Sliders, Eye, Activity, Droplets, Calculator, Box } from 'lucide-react';
import { useIntegrationStore } from '../store/useIntegrationStore';

export const Controls: React.FC = () => {
  const {
    bounds,
    boundFunctions,
    resolution,
    showDifferentials,
    animationSpeed,
    transparency,
    function: fn,
    solidType,
    error,
    setBounds,
    setBoundFunction,
    setResolution,
    setShowDifferentials,
    setAnimationSpeed,
    setTransparency,
    setFunction,
    setSolidType,
  } = useIntegrationStore();

  return (
    <div className="absolute right-0 top-0 p-4 bg-white/90 backdrop-blur-sm rounded-l-lg shadow-lg m-4 w-80">
      <h2 className="text-xl font-bold mb-4">Integration Controls</h2>

      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <Box className="w-4 h-4" /> Solid Type
        </label>
        <select
          value={solidType}
          onChange={(e) => setSolidType(e.target.value as any)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="custom">Custom Function</option>
          <option value="sphere">Sphere</option>
          <option value="cylinder">Cylinder</option>
          <option value="torus">Torus</option>
        </select>
      </div>

      {solidType === 'custom' && (
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Calculator className="w-4 h-4" /> Mathematical Function
          </label>
          <input
            type="text"
            value={fn}
            onChange={(e) => setFunction(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., x^2 + y^2 + z^2 - 1"
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      )}

      {['x', 'y', 'z'].map((axis) => (
        <div key={axis} className="mb-4">
          <label className="block text-sm font-medium mb-2">
            {axis.toUpperCase()} Bounds
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={boundFunctions[axis as keyof typeof boundFunctions][0]}
              onChange={(e) =>
                setBoundFunction(axis as keyof typeof boundFunctions, 0, e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
              placeholder={`Lower ${axis} bound`}
            />
            <input
              type="text"
              value={boundFunctions[axis as keyof typeof boundFunctions][1]}
              onChange={(e) =>
                setBoundFunction(axis as keyof typeof boundFunctions, 1, e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
              placeholder={`Upper ${axis} bound`}
            />
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Sliders className="w-4 h-4" /> Resolution
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={resolution}
            onChange={(e) => setResolution(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Activity className="w-4 h-4" /> Animation Speed
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Droplets className="w-4 h-4" /> Transparency
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={transparency}
            onChange={(e) => setTransparency(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <label className="text-sm font-medium">Show Differentials</label>
          <input
            type="checkbox"
            checked={showDifferentials}
            onChange={(e) => setShowDifferentials(e.target.checked)}
            className="ml-auto"
          />
        </div>
      </div>
    </div>
  );
};