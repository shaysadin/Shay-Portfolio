import React,{ Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Decal, Float, OrbitControls, Preload, useTexture
} from '@react-three/drei';

import CanvasLoader from '../Loader';
const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  const [isInteracting, setIsInteracting] = useState(false); // New state for interaction

  const [shakeParams, setShakeParams] = useState({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  });

  useFrame((state, delta) => {
    // Shake behavior when not interacting
    if (!isInteracting) {
      const time = state.clock.getElapsedTime();
      const shakeIntensity = 0.07;
      setShakeParams({
        position: [Math.sin(time * 10) * shakeIntensity, 0, 0],
        rotation: [0, Math.sin(time * 5) * shakeIntensity, 0],
      });
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={isInteracting ? 1 : 0} floatIntensity={isInteracting ? 0 : 2}>
      <ambientLight intensity={0.9}/>
      <directionalLight position={[0, 0, 0.05]}/>
      <mesh 
        castShadow 
        receiveShadow 
        scale={2.75}
        position={shakeParams.position}
        rotation={shakeParams.rotation}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#ffffff" // Lighter color
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal 
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
          scale={1}
          flatShading
        />
      </mesh>
    </Float>
  )
}

const BallCanvas = ({ icon }) => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
        />
        <Ball imgUrl={icon} isInteracting={isInteracting} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas;