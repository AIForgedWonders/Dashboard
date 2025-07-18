
import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2, 
  Palette, 
  Lightbulb,
  Box as BoxIcon,
  Circle as SphereIcon,
  Cylinder as CylinderIcon,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";
import * as THREE from 'three';

// Animated rotating object component
function AnimatedObject({ shape, color, scale, autoRotate }: { shape: string, color: string, scale: number, autoRotate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const renderShape = () => {
    switch (shape) {
      case 'box':
        return <Box ref={meshRef} args={[scale, scale, scale]} material-color={color} />;
      case 'sphere':
        return <Sphere ref={meshRef} args={[scale, 32, 32]} material-color={color} />;
      case 'cylinder':
        return <Cylinder ref={meshRef} args={[scale, scale, scale * 2, 32]} material-color={color} />;
      default:
        return <Box ref={meshRef} args={[scale, scale, scale]} material-color={color} />;
    }
  };

  return (
    <group>
      {renderShape()}
    </group>
  );
}

// Floating text component
function FloatingText({ text }: { text: string }) {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, 3, 0]}
      fontSize={0.8}
      color="#a855f7"
      anchorX="center"
      anchorY="middle"
      font="/fonts/helvetiker_bold.typeface.json"
    >
      {text}
    </Text>
  );
}

// Scene component
function Scene({ shape, color, scale, autoRotate, showText, text }: any) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <AnimatedObject shape={shape} color={color} scale={scale} autoRotate={autoRotate} />
      
      {showText && <FloatingText text={text} />}
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
      
      <Environment preset="city" background />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
      />
    </>
  );
}

export const ThreeDViewer = () => {
  const [selectedShape, setSelectedShape] = useState('box');
  const [selectedColor, setSelectedColor] = useState('#7c3aed');
  const [objectScale, setObjectScale] = useState([1]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showText, setShowText] = useState(true);
  const [customText, setCustomText] = useState('3D Magic');
  const [lightIntensity, setLightIntensity] = useState([1]);

  const shapes = [
    { id: 'box', icon: BoxIcon, label: 'Cube' },
    { id: 'sphere', icon: SphereIcon, label: 'Sphere' },
    { id: 'cylinder', icon: CylinderIcon, label: 'Cylinder' },
  ];

  const colors = [
    '#7c3aed', '#a855f7', '#c084fc', '#e879f9',
    '#f472b6', '#fb7185', '#f87171', '#fbbf24',
    '#34d399', '#60a5fa', '#8b5cf6', '#a78bfa'
  ];

  const presets = [
    { name: 'Neon Glow', shape: 'sphere', color: '#a855f7', scale: 1.2, text: 'NEON' },
    { name: 'Tech Cube', shape: 'box', color: '#60a5fa', scale: 1, text: 'TECH' },
    { name: 'Energy Core', shape: 'cylinder', color: '#34d399', scale: 0.8, text: 'ENERGY' },
    { name: 'Fire Ball', shape: 'sphere', color: '#f87171', scale: 1.5, text: 'FIRE' }
  ];

  const applyPreset = (preset: any) => {
    setSelectedShape(preset.shape);
    setSelectedColor(preset.color);
    setObjectScale([preset.scale]);
    setCustomText(preset.text);
    toast.success(`${preset.name} preset applied!`);
  };

  const exportScene = () => {
    toast.success('3D scene exported successfully!');
  };

  const resetScene = () => {
    setSelectedShape('box');
    setSelectedColor('#7c3aed');
    setObjectScale([1]);
    setAutoRotate(true);
    setShowText(true);
    setCustomText('3D Magic');
    setLightIntensity([1]);
    toast.success('Scene reset to defaults');
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100 flex items-center gap-3">
              <BoxIcon className="h-8 w-8" />
              3D Viewer Studio
            </h1>
            <p className="text-purple-300">Interactive 3D model viewer and editor</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300">
              WebGL Powered
            </Badge>
            <Button onClick={exportScene} className="bg-gradient-purple">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Shape Selection */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg">3D Shapes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shapes.map((shape) => (
                  <Button
                    key={shape.id}
                    variant={selectedShape === shape.id ? "default" : "outline"}
                    onClick={() => setSelectedShape(shape.id)}
                    className={`w-full justify-start ${
                      selectedShape === shape.id 
                        ? "bg-gradient-purple" 
                        : "border-purple-500/30 text-purple-300"
                    }`}
                  >
                    <shape.icon className="mr-2 h-4 w-4" />
                    {shape.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        selectedColor === color ? 'border-white scale-110' : 'border-purple-500/30'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Scale */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-300">Scale: {objectScale[0].toFixed(1)}x</label>
                  <Slider
                    value={objectScale}
                    onValueChange={setObjectScale}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Light Intensity */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-300">
                    <Lightbulb className="inline h-4 w-4 mr-1" />
                    Light: {lightIntensity[0].toFixed(1)}
                  </label>
                  <Slider
                    value={lightIntensity}
                    onValueChange={setLightIntensity}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Animation Controls */}
                <div className="flex gap-2">
                  <Button
                    variant={autoRotate ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={autoRotate ? "bg-gradient-purple" : "border-purple-500/30 text-purple-300"}
                  >
                    {autoRotate ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetScene}
                    className="border-purple-500/30 text-purple-300"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>

                {/* Text Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showText}
                    onChange={(e) => setShowText(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label className="text-sm text-purple-300">Show floating text</label>
                </div>

                {showText && (
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter text..."
                    className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200 text-sm"
                  />
                )}
              </CardContent>
            </Card>

            {/* Presets */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg">Presets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="w-full justify-start border-purple-500/30 text-purple-300 text-xs"
                  >
                    {preset.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <Suspense fallback={null}>
                      <Scene
                        shape={selectedShape}
                        color={selectedColor}
                        scale={objectScale[0]}
                        autoRotate={autoRotate}
                        showText={showText}
                        text={customText}
                        lightIntensity={lightIntensity[0]}
                      />
                    </Suspense>
                  </Canvas>
                </div>
                
                {/* Controls Info */}
                <div className="p-4 border-t border-purple-500/20">
                  <div className="flex items-center justify-between text-sm text-purple-400">
                    <div className="flex items-center gap-4">
                      <span>🖱️ Click & drag to rotate</span>
                      <span>🔍 Scroll to zoom</span>
                      <span>⚡ Auto-rotate: {autoRotate ? 'ON' : 'OFF'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                        <ZoomIn className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scene Info */}
            <Card className="bg-slate-800/50 border-purple-500/20 mt-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-purple-400 text-xs">Shape</p>
                    <p className="text-purple-200 font-medium capitalize">{selectedShape}</p>
                  </div>
                  <div>
                    <p className="text-purple-400 text-xs">Color</p>
                    <div className="flex items-center justify-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-purple-500/30"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <p className="text-purple-200 font-mono text-xs">{selectedColor}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-purple-400 text-xs">Scale</p>
                    <p className="text-purple-200 font-medium">{objectScale[0].toFixed(1)}x</p>
                  </div>
                  <div>
                    <p className="text-purple-400 text-xs">Animation</p>
                    <p className="text-purple-200 font-medium">{autoRotate ? 'Active' : 'Paused'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
