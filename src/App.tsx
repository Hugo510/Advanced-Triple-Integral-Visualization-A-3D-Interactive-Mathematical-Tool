/* import React from 'react'; */
import { Scene } from './components/Scene';
import { Controls } from './components/Controls';

function App() {
  return (
    <div className="w-full h-screen relative">
      <Scene />
      <Controls />
      <div className="absolute left-4 bottom-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Volume Calculator</h2>
        <p className="text-sm text-gray-600">
          Adjust the bounds and parameters to visualize the triple integral.
        </p>
      </div>
    </div>
  );
}

export default App;