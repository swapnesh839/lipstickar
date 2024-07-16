// src/components/FaceMesh.js
import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';

const FaceMesh = ({ onResults }) => {
  const videoRef = useRef();

  useEffect(() => {
    const setupCamera = async () => {
      const video = videoRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
      }
    };

    const loadFaceMesh = async () => {
      await setupCamera();
      const model = await facemesh.load();
      const video = videoRef.current;

      const detectFaces = async () => {
        if (video.readyState === 4) {
          const predictions = await model.estimateFaces(video);
          onResults(predictions);
        }
        requestAnimationFrame(detectFaces);
      };

      video.addEventListener('loadeddata', detectFaces);
    };

    loadFaceMesh();
  }, [onResults]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{ display: 'none' }}
      onLoadedMetadata={(e) => {
        e.target.play().catch((error) => console.error('Video play error:', error));
      }}
    />
  );
};

export default FaceMesh;
