import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';

export function Stats3DModelCard() {
  return (
    <div className="bg-gradient-to-br from-purple-900/60 to-slate-900/80 border-2 border-purple-500/40 rounded-2xl shadow-xl p-0 flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-purple-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition" />
      </div>
      <div className="w-full flex flex-col items-center justify-center p-4 z-10">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-purple-200 font-semibold text-lg">3D Model</span>
          <span className="text-xs bg-purple-700/30 text-purple-200 px-2 py-1 rounded-full">Live</span>
        </div>
        <div className="w-full aspect-square rounded-xl bg-slate-900/80 border border-purple-700/30 flex items-center justify-center shadow-inner">
          <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }} className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a855f7" />
            <Float speed={1.5} rotationIntensity={1.2} floatIntensity={0.8}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshStandardMaterial color="#a855f7" roughness={0.3} metalness={0.7} />
              </mesh>
            </Float>
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
        </div>
        <div className="mt-3 text-center">
          <span className="text-purple-300 text-sm">Interactive 3D Cube</span>
        </div>
      </div>
      <div className="absolute -inset-1 rounded-2xl border-2 border-purple-500/40 pointer-events-none animate-pulse group-hover:animate-none" />
    </div>
  );
} 