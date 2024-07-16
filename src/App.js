// src/App.js
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import FaceMesh from './FaceMesh';
import { OrbitControls } from '@react-three/drei';
import LipColor from './LipColor';

const App = () => {
  const [predictions, setPredictions] = useState([]);

  return (
    <div>
      <FaceMesh onResults={setPredictions} />
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {predictions.map((prediction, index) => (
          <LipColor key={index} prediction={prediction} />
        ))}
      </Canvas>
    </div>
  );
};

export default App;
