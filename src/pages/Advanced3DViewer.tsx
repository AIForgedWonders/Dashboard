import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Text, Float, PresentationControls, Stars, Sparkles } from '@react-three/drei';
import { Vector3, Color, MeshStandardMaterial, BoxGeometry, SphereGeometry, CylinderGeometry, TorusGeometry } from 'three';
import { Download, Share2, RotateCcw, Play, Pause, Settings, Palette, Box, Circle, Cylinder, Torus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DashboardLayout } from '@/components/DashboardLayout';

// 3D Model Component
function Model3D({ 
  shape, 
  color, 
  scale, 
  rotation, 
  position, 
  material, 
  animation,
  wireframe,
  roughness,
  metalness 
}: {
  shape: string;
  color: string;
  scale: number;
  rotation: [number, number, number];
  position: [number, number, number];
  material: string;
  animation: boolean;
  wireframe: boolean;
  roughness: number;
  metalness: number;
}) {
  const meshRef = useRef<any>();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (animation && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  const getGeometry = () => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[1, 1, 2, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.3, 16, 100]} />;
      case 'cube':
      default:
        return <boxGeometry args={[2, 2, 2]} />;
    }
  };

  const getMaterial = () => {
    const baseProps = {
      color: color,
      wireframe: wireframe,
      roughness: roughness,
      metalness: metalness,
    };

    switch (material) {
      case 'glass':
        return <meshPhysicalMaterial {...baseProps} transmission={0.9} thickness={0.5} />;
      case 'metal':
        return <meshStandardMaterial {...baseProps} metalness={0.9} roughness={0.1} />;
      case 'plastic':
        return <meshStandardMaterial {...baseProps} roughness={0.8} metalness={0.1} />;
      case 'emissive':
        return <meshStandardMaterial {...baseProps} emissive={color} emissiveIntensity={0.5} />;
      default:
        return <meshStandardMaterial {...baseProps} />;
    }
  };

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getGeometry()}
        {getMaterial()}
      </mesh>
    </Float>
  );
}

// Ground Text Component
function GroundText() {
  return (
    <Text
      position={[0, -2, 0]}
      fontSize={0.5}
      color="#a855f7"
      anchorX="center"
      anchorY="middle"
    >
      3D magic
    </Text>
  );
}

// Scene Component
function Scene({ 
  shape, 
  color, 
  scale, 
  material, 
  animation, 
  wireframe, 
  roughness, 
  metalness,
  lighting,
  environment,
  showStars,
  showSparkles,
  particleCount
}: {
  shape: string;
  color: string;
  scale: number;
  material: string;
  animation: boolean;
  wireframe: boolean;
  roughness: number;
  metalness: number;
  lighting: string;
  environment: string;
  showStars: boolean;
  showSparkles: boolean;
  particleCount: number;
}) {
  return (
    <>
      {/* Lighting */}
      {lighting === 'studio' && (
        <>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
        </>
      )}
      {lighting === 'sunset' && (
        <>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ff6b35" />
          <pointLight position={[-5, 5, -5]} intensity={0.8} color="#ffd700" />
        </>
      )}
      {lighting === 'neon' && (
        <>
          <ambientLight intensity={0.1} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ff00ff" />
          <pointLight position={[-5, 5, -5]} intensity={1} color="#00ffff" />
          <pointLight position={[0, -5, 0]} intensity={0.8} color="#ffff00" />
        </>
      )}

      {/* Environment */}
      <Environment preset={environment} />

      {/* Stars Background */}
      {showStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>

      {/* 3D Model */}
      <Model3D
        shape={shape}
        color={color}
        scale={scale}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        material={material}
        animation={animation}
        wireframe={wireframe}
        roughness={roughness}
        metalness={metalness}
      />

      {/* Sparkles around the model */}
      {showSparkles && <Sparkles count={particleCount} scale={4} size={2} speed={0.3} opacity={0.6} />}

      {/* Ground Text */}
      <GroundText />
    </>
  );
}

export default function Advanced3DViewer() {
  const [shape, setShape] = useState('cube');
  const [color, setColor] = useState('#7c3aed');
  const [scale, setScale] = useState(1);
  const [material, setMaterial] = useState('standard');
  const [animation, setAnimation] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [roughness, setRoughness] = useState(0.5);
  const [metalness, setMetalness] = useState(0.5);
  const [lighting, setLighting] = useState('studio');
  const [environment, setEnvironment] = useState('apartment');
  const [autoRotate, setAutoRotate] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showAxes, setShowAxes] = useState(false);
  const [showStars, setShowStars] = useState(true);
  const [showSparkles, setShowSparkles] = useState(true);
  const [particleCount, setParticleCount] = useState(100);

  const colors = [
    '#7c3aed', '#ef4444', '#f97316', '#eab308', '#22c55e', 
    '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e',
    '#84cc16', '#14b8a6'
  ];

  const shapes = [
    { id: 'cube', name: 'Cube', icon: Box },
    { id: 'sphere', name: 'Sphere', icon: Circle },
    { id: 'cylinder', name: 'Cylinder', icon: Cylinder },
    { id: 'torus', name: 'Torus', icon: Torus }
  ];

  const materials = [
    { id: 'standard', name: 'Standard' },
    { id: 'metal', name: 'Metal' },
    { id: 'glass', name: 'Glass' },
    { id: 'plastic', name: 'Plastic' },
    { id: 'emissive', name: 'Emissive' }
  ];

  const lightingOptions = [
    { id: 'studio', name: 'Studio' },
    { id: 'sunset', name: 'Sunset' },
    { id: 'neon', name: 'Neon' }
  ];

  const environmentOptions = [
    { id: 'apartment', name: 'Apartment' },
    { id: 'city', name: 'City' },
    { id: 'dawn', name: 'Dawn' },
    { id: 'forest', name: 'Forest' },
    { id: 'lobby', name: 'Lobby' },
    { id: 'night', name: 'Night' },
    { id: 'park', name: 'Park' },
    { id: 'sunset', name: 'Sunset' },
    { id: 'warehouse', name: 'Warehouse' }
  ];

  const handleExport = () => {
    console.log('Exporting 3D model...');
  };

  const handleShare = () => {
    console.log('Sharing 3D model...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-100">Advanced 3D Studio</h1>
            <p className="text-purple-300">Professional 3D model viewer and editor</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* 3D Viewer Container */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg border border-purple-500/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row h-[600px] lg:h-[700px]">
            {/* Left Panel - Controls */}
            <div className="w-full lg:w-80 bg-slate-800/50 border-b lg:border-b-0 lg:border-r border-purple-500/20 p-4 lg:p-6 overflow-y-auto">
              <div className="space-y-4 lg:space-y-6">
                {/* Shape Selection */}
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-purple-300">3D Shapes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {shapes.map((shapeOption) => {
                        const Icon = shapeOption.icon;
                        return (
                          <Button
                            key={shapeOption.id}
                            variant={shape === shapeOption.id ? "default" : "outline"}
                            size="sm"
                            className={`h-10 lg:h-12 text-xs lg:text-sm ${shape === shapeOption.id ? 'bg-purple-600 border-purple-500' : 'border-purple-500/30 text-purple-300 hover:bg-purple-600/20'}`}
                            onClick={() => setShape(shapeOption.id)}
                          >
                            <Icon className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                            {shapeOption.name}
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Color Palette */}
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Colors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((colorOption) => (
                        <button
                          key={colorOption}
                          className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg border-2 transition-all ${
                            color === colorOption 
                              ? 'border-white scale-110' 
                              : 'border-purple-500/30 hover:border-purple-400'
                          }`}
                          style={{ backgroundColor: colorOption }}
                          onClick={() => setColor(colorOption)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Material Settings */}
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-purple-300">Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {materials.map((materialOption) => (
                        <Button
                          key={materialOption.id}
                          variant={material === materialOption.id ? "default" : "outline"}
                          size="sm"
                          className={`w-full justify-start ${material === materialOption.id ? 'bg-purple-600 border-purple-500' : 'border-purple-500/30 text-purple-300 hover:bg-purple-600/20'}`}
                          onClick={() => setMaterial(materialOption.id)}
                        >
                          {materialOption.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Properties */}
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs text-purple-300">Scale: {scale.toFixed(1)}x</Label>
                      <Slider
                        value={[scale]}
                        onValueChange={(value) => setScale(value[0])}
                        max={3}
                        min={0.1}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs text-purple-300">Roughness: {roughness.toFixed(2)}</Label>
                      <Slider
                        value={[roughness]}
                        onValueChange={(value) => setRoughness(value[0])}
                        max={1}
                        min={0}
                        step={0.01}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-purple-300">Metalness: {metalness.toFixed(2)}</Label>
                      <Slider
                        value={[metalness]}
                        onValueChange={(value) => setMetalness(value[0])}
                        max={1}
                        min={0}
                        step={0.01}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Lighting & Environment */}
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-purple-300">Lighting & Environment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs text-purple-300">Lighting</Label>
                      <select
                        value={lighting}
                        onChange={(e) => setLighting(e.target.value)}
                        className="w-full mt-1 bg-slate-600 border border-purple-500/30 rounded px-3 py-2 text-sm text-white"
                      >
                        {lightingOptions.map((option) => (
                          <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs text-purple-300">Environment</Label>
                      <select
                        value={environment}
                        onChange={(e) => setEnvironment(e.target.value)}
                        className="w-full mt-1 bg-slate-600 border border-purple-500/30 rounded px-3 py-2 text-sm text-white"
                      >
                        {environmentOptions.map((option) => (
                          <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Display Options */}
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-purple-300">Display Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-purple-300">Animation</Label>
                      <Switch
                        checked={animation}
                        onCheckedChange={setAnimation}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-purple-300">Wireframe</Label>
                      <Switch
                        checked={wireframe}
                        onCheckedChange={setWireframe}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-purple-300">Auto-rotate</Label>
                      <Switch
                        checked={autoRotate}
                        onCheckedChange={setAutoRotate}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-purple-300">Show Grid</Label>
                      <Switch
                        checked={showGrid}
                        onCheckedChange={setShowGrid}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-purple-300">Show Axes</Label>
                      <Switch
                        checked={showAxes}
                        onCheckedChange={setShowAxes}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Effects */}
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-purple-300">Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-purple-300">Stars Background</Label>
                      <Switch
                        checked={showStars}
                        onCheckedChange={setShowStars}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-purple-300">Sparkles</Label>
                      <Switch
                        checked={showSparkles}
                        onCheckedChange={setShowSparkles}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-purple-300">Particle Count: {particleCount}</Label>
                      <Slider
                        value={[particleCount]}
                        onValueChange={(value) => setParticleCount(value[0])}
                        max={500}
                        min={10}
                        step={10}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Viewport */}
            <div className="flex-1 flex flex-col">
              {/* Status Bar */}
              <div className="h-12 bg-slate-800/50 border-b border-purple-500/20 flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
                    WebGL Powered
                  </Badge>
                  <div className="text-xs lg:text-sm text-purple-300">
                    Shape: {shapes.find(s => s.id === shape)?.name} | 
                    Color: {color} | 
                    Scale: {scale.toFixed(1)}x | 
                    Animation: {animation ? 'Active' : 'Paused'}
                  </div>
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="flex-1 relative">
                <Canvas
                  shadows
                  camera={{ position: [5, 5, 5], fov: 50 }}
                  className="w-full h-full"
                >
                  <Scene
                    shape={shape}
                    color={color}
                    scale={scale}
                    material={material}
                    animation={animation}
                    wireframe={wireframe}
                    roughness={roughness}
                    metalness={metalness}
                    lighting={lighting}
                    environment={environment}
                    showStars={showStars}
                    showSparkles={showSparkles}
                    particleCount={particleCount}
                  />
                  
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    autoRotate={autoRotate}
                    autoRotateSpeed={0.5}
                    maxDistance={20}
                    minDistance={2}
                  />
                </Canvas>

                {/* Instructions Overlay */}
                <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 text-xs text-purple-300">
                  <div className="space-y-1">
                    <div>Click & drag to rotate</div>
                    <div>Scroll to zoom</div>
                    <div>Auto-rotate: {autoRotate ? 'ON' : 'OFF'}</div>
                  </div>
                </div>

                {/* Viewport Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button size="sm" variant="outline" className="bg-slate-800/80 backdrop-blur-sm border-purple-500/30">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-slate-800/80 backdrop-blur-sm border-purple-500/30">
                    {animation ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 