
import { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Square, 
  Circle, 
  Triangle, 
  Type, 
  Image, 
  Palette, 
  Download, 
  Undo2, 
  Redo2,
  Trash2,
  Move,
  RotateCw,
  Copy
} from "lucide-react";
import { toast } from "sonner";

interface CanvasElement {
  id: string;
  type: 'rectangle' | 'circle' | 'triangle' | 'text' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text?: string;
  rotation?: number;
}

export const DesignCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [selectedColor, setSelectedColor] = useState('#7c3aed');
  const [canvasSize, setCanvasSize] = useState([800]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const colors = [
    '#7c3aed', '#a855f7', '#c084fc', '#e879f9',
    '#f472b6', '#fb7185', '#f87171', '#fbbf24',
    '#34d399', '#60a5fa', '#8b5cf6', '#a78bfa'
  ];

  const tools = [
    { id: 'select', icon: Move, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'triangle', icon: Triangle, label: 'Triangle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: Image, label: 'Image' },
  ];

  useEffect(() => {
    drawCanvas();
  }, [elements]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw elements
    elements.forEach(element => {
      ctx.save();
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
      ctx.rotate((element.rotation || 0) * Math.PI / 180);
      ctx.translate(-element.width / 2, -element.height / 2);

      ctx.fillStyle = element.color;
      
      switch (element.type) {
        case 'rectangle':
          ctx.fillRect(0, 0, element.width, element.height);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(element.width / 2, element.height / 2, Math.min(element.width, element.height) / 2, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(element.width / 2, 0);
          ctx.lineTo(0, element.height);
          ctx.lineTo(element.width, element.height);
          ctx.closePath();
          ctx.fill();
          break;
        case 'text':
          ctx.font = '16px Arial';
          ctx.fillText(element.text || 'Text', 0, element.height / 2);
          break;
      }
      ctx.restore();
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool !== 'select') {
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: selectedTool as any,
        x: x - 50,
        y: y - 50,
        width: 100,
        height: 100,
        color: selectedColor,
        text: selectedTool === 'text' ? 'Sample Text' : undefined,
        rotation: 0
      };

      setElements(prev => [...prev, newElement]);
      toast.success(`${selectedTool} added to canvas`);
    }
  };

  const addElement = (type: string) => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: type as any,
      x: Math.random() * 600,
      y: Math.random() * 400,
      width: 100,
      height: 100,
      color: selectedColor,
      text: type === 'text' ? 'New Text' : undefined,
      rotation: 0
    };

    setElements(prev => [...prev, newElement]);
    toast.success(`${type} added to canvas`);
  };

  const clearCanvas = () => {
    setElements([]);
    toast.success('Canvas cleared');
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'design.png';
    link.href = canvas.toDataURL();
    link.click();
    toast.success('Design exported successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100">Design Canvas</h1>
            <p className="text-purple-300">Create stunning designs with drag-and-drop simplicity</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300">
              {elements.length} Elements
            </Badge>
            <Button onClick={exportCanvas} className="bg-gradient-purple">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Toolbar */}
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-200 text-lg">Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drawing Tools */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-purple-300">Drawing Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTool(tool.id)}
                      className={selectedTool === tool.id ? "bg-gradient-purple" : "border-purple-500/30 text-purple-300"}
                    >
                      <tool.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-purple-300">Colors</h3>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        selectedColor === color ? 'border-white scale-110' : 'border-purple-500/30'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-purple-300">Quick Add</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => addElement('rectangle')} className="border-purple-500/30 text-purple-300">
                    <Square className="h-3 w-3 mr-1" />
                    Box
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addElement('circle')} className="border-purple-500/30 text-purple-300">
                    <Circle className="h-3 w-3 mr-1" />
                    Circle
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addElement('text')} className="border-purple-500/30 text-purple-300">
                    <Type className="h-3 w-3 mr-1" />
                    Text
                  </Button>
                </div>
              </div>

              {/* Canvas Size */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-purple-300">Canvas Size</h3>
                <Slider
                  value={canvasSize}
                  onValueChange={setCanvasSize}
                  max={1200}
                  min={400}
                  step={50}
                  className="w-full"
                />
                <p className="text-xs text-purple-400">{canvasSize[0]}px width</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-purple-500/20">
                <Button size="sm" variant="outline" onClick={clearCanvas} className="border-purple-500/30 text-purple-300">
                  <Trash2 className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                  <Undo2 className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                  <Redo2 className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-6">
                <div className="relative overflow-auto">
                  <canvas
                    ref={canvasRef}
                    width={canvasSize[0]}
                    height={600}
                    onClick={handleCanvasClick}
                    className="border border-purple-500/30 rounded-lg cursor-crosshair bg-slate-700"
                  />
                </div>
                
                {/* Canvas Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-purple-400">
                  <div className="flex items-center gap-4">
                    <span>Tool: {selectedTool}</span>
                    <span>Color: {selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>{elements.length} elements</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Templates Section */}
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-200">Design Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Instagram Post', 'Logo Design', 'Business Card', 'Flyer', 'Banner', 'Poster'].map((template) => (
                <button
                  key={template}
                  className="aspect-square bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center hover:from-purple-600/30 hover:to-purple-500/20 transition-all duration-200"
                >
                  <div className="w-full h-12 bg-purple-500/20 rounded-md mb-2"></div>
                  <p className="text-xs text-purple-300 font-medium">{template}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
