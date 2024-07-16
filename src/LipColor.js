// src/components/LipColor.js
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LipColor = ({ prediction }) => {
  const meshRef = useRef();
  const { scaledMesh } = prediction;
  const lipIndices = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];

  useEffect(() => {
    const positions = new Float32Array(lipIndices.length * 3);
    for (let i = 0; i < lipIndices.length; i++) {
      const [x, y, z] = scaledMesh[lipIndices[i]];
      positions.set([x, y, z], i * 3);
    }

    const lipGeometry = new THREE.BufferGeometry();
    lipGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    meshRef.current.geometry = lipGeometry;
  }, [scaledMesh]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <meshBasicMaterial color="red" transparent opacity={0.6} />
    </mesh>
  );
};

export default LipColor;
