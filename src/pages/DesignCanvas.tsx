
import { useState, useRef, useCallback } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Paintbrush,
  Type,
  Square,
  Circle,
  Triangle,
  Image,
  Layers,
  Move,
  RotateCw,
  Copy,
  Trash2,
  Download,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Palette,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Star,
  Heart,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface CanvasElement {
  id: string;
  type: 'text' | 'shape' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string;
  color?: string;
  fontSize?: number;
  locked?: boolean;
  visible?: boolean;
}

const shapeTypes = [
  { type: 'rectangle', icon: Square, name: 'Rectangle' },
  { type: 'circle', icon: Circle, name: 'Circle' },
  { type: 'triangle', icon: Triangle, name: 'Triangle' }
];

const colorPalette = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#84CC16', '#22C55E', '#10B981', '#14B8A6',
  '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
  '#8B5CF6', '#A855F7', '#C084FC', '#E879F9',
  '#EC4899', '#F43F5E', '#374151', '#6B7280'
];

const templates = [
  { id: 1, name: 'Social Media Post', width: 1080, height: 1080, category: 'Social' },
  { id: 2, name: 'Instagram Story', width: 1080, height: 1920, category: 'Social' },
  { id: 3, name: 'Business Card', width: 1050, height: 600, category: 'Print' },
  { id: 4, name: 'Flyer', width: 2480, height: 3508, category: 'Print' },
  { id: 5, name: 'Web Banner', width: 1200, height: 400, category: 'Web' },
  { id: 6, name: 'Presentation Slide', width: 1920, height: 1080, category: 'Presentation' }
];

export default function DesignCanvas() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState([100]);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [brushSize, setBrushSize] = useState([10]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const addElement = (type: CanvasElement['type']) => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type,
      x: Math.random() * (canvasSize.width - 100),
      y: Math.random() * (canvasSize.height - 100),
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 50 : 100,
      rotation: 0,
      color: selectedColor,
      content: type === 'text' ? 'Sample Text' : undefined,
      fontSize: type === 'text' ? 24 : undefined,
      visible: true,
      locked: false
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added to canvas`);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
    toast.success('Element deleted');
  };

  const duplicateElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: Date.now().toString(),
        x: element.x + 20,
        y: element.y + 20
      };
      setElements(prev => [...prev, newElement]);
      setSelectedElement(newElement.id);
      toast.success('Element duplicated');
    }
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    setSelectedElement(elementId);
    setIsDragging(true);
    
    const element = elements.find(el => el.id === elementId);
    if (element) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left - element.x,
          y: e.clientY - rect.top - element.y
        });
      }
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && selectedElement) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;
        
        updateElement(selectedElement, {
          x: Math.max(0, Math.min(newX, canvasSize.width - 100)),
          y: Math.max(0, Math.min(newY, canvasSize.height - 100))
        });
      }
    }
  }, [isDragging, selectedElement, dragOffset, canvasSize]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const exportCanvas = (format: string) => {
    toast.success(`Canvas exported as ${format.toUpperCase()}`);
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Paintbrush className="h-8 w-8 text-purple-400" />
              Design Canvas
            </h1>
            <p className="text-purple-300">Professional drag-and-drop design editor</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300">
              <Layers className="w-3 h-3 mr-1" />
              {elements.length} Elements
            </Badge>
            <Button variant="outline" className="border-purple-500/30">
              <Undo className="mr-2 h-4 w-4" />
              Undo
            </Button>
            <Button variant="outline" className="border-purple-500/30">
              <Redo className="mr-2 h-4 w-4" />
              Redo
            </Button>
            <Button className="bg-gradient-purple">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Tools */}
          <div className="space-y-6">
            {/* Quick Tools */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-sm">Quick Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => addElement('text')}
                  className="w-full justify-start bg-slate-700/50 hover:bg-purple-600/20"
                >
                  <Type className="mr-2 h-4 w-4" />
                  Add Text
                </Button>
                
                <div className="space-y-2">
                  <p className="text-xs text-purple-400">Shapes</p>
                  {shapeTypes.map((shape) => (
                    <Button
                      key={shape.type}
                      onClick={() => addElement('shape')}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-purple-500/30 text-purple-300"
                    >
                      <shape.icon className="mr-2 h-3 w-3" />
                      {shape.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-sm flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {colorPalette.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        selectedColor === color ? 'border-white scale-110' : 'border-purple-500/30'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-sm">Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templates.slice(0, 4).map((template) => (
                    <Button
                      key={template.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-purple-500/30 text-purple-300 text-xs"
                      onClick={() => {
                        setCanvasSize({ width: template.width / 2, height: template.height / 2 });
                        toast.success(`Template "${template.name}" loaded`);
                      }}
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Canvas Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoom([Math.max(25, zoom[0] - 25)])}
                    className="border-purple-500/30"
                  >
                    <ZoomOut className="h-3 w-3" />
                  </Button>
                  <span className="text-sm text-purple-300 min-w-[60px] text-center">
                    {zoom[0]}%
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoom([Math.min(200, zoom[0] + 25)])}
                    className="border-purple-500/30"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowGrid(!showGrid)}
                  className={`border-purple-500/30 ${showGrid ? 'bg-purple-600/20' : ''}`}
                >
                  <Grid3X3 className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-purple-500/30">
                  <Download className="mr-1 h-3 w-3" />
                  Export
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="relative bg-white rounded-lg overflow-hidden" style={{ height: '500px' }}>
                  <div
                    ref={canvasRef}
                    className="relative w-full h-full"
                    style={{
                      transform: `scale(${zoom[0] / 100})`,
                      transformOrigin: 'top left',
                      backgroundImage: showGrid ? 
                        'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' : 'none',
                      backgroundSize: showGrid ? '20px 20px' : 'none'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                  >
                    {elements.map((element) => (
                      <div
                        key={element.id}
                        className={`absolute cursor-move border-2 transition-all ${
                          selectedElement === element.id
                            ? 'border-blue-500 shadow-lg'
                            : 'border-transparent hover:border-gray-300'
                        } ${!element.visible ? 'opacity-50' : ''}`}
                        style={{
                          left: element.x,
                          top: element.y,
                          width: element.width,
                          height: element.height,
                          transform: `rotate(${element.rotation}deg)`,
                          backgroundColor: element.type === 'shape' ? element.color : 'transparent',
                          pointerEvents: element.locked ? 'none' : 'auto'
                        }}
                        onMouseDown={(e) => !element.locked && handleMouseDown(e, element.id)}
                      >
                        {element.type === 'text' && (
                          <div
                            className="w-full h-full flex items-center justify-center text-center px-2"
                            style={{
                              fontSize: element.fontSize,
                              color: element.color,
                              fontWeight: 'bold'
                            }}
                          >
                            {element.content}
                          </div>
                        )}
                        {element.type === 'shape' && (
                          <div className="w-full h-full rounded-lg"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="space-y-6">
            {/* Layers Panel */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-sm flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Layers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${
                        selectedElement === element.id
                          ? 'border-purple-500 bg-purple-600/20'
                          : 'border-purple-500/30 hover:border-purple-400'
                      }`}
                      onClick={() => setSelectedElement(element.id)}
                    >
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateElement(element.id, { visible: !element.visible });
                          }}
                        >
                          {element.visible ? (
                            <Eye className="h-3 w-3 text-purple-400" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-gray-500" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateElement(element.id, { locked: !element.locked });
                          }}
                        >
                          {element.locked ? (
                            <Lock className="h-3 w-3 text-red-400" />
                          ) : (
                            <Unlock className="h-3 w-3 text-purple-400" />
                          )}
                        </button>
                      </div>
                      <span className="text-xs text-purple-300 flex-1">
                        {element.type === 'text' ? element.content : element.type}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateElement(element.id);
                          }}
                          className="p-1 hover:bg-purple-600/20 rounded"
                        >
                          <Copy className="h-3 w-3 text-purple-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteElement(element.id);
                          }}
                          className="p-1 hover:bg-red-600/20 rounded"
                        >
                          <Trash2 className="h-3 w-3 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Properties Panel */}
            {selectedElementData && (
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 text-sm">Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-purple-400">X</label>
                      <input
                        type="number"
                        value={Math.round(selectedElementData.x)}
                        onChange={(e) => updateElement(selectedElementData.id, { x: Number(e.target.value) })}
                        className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-purple-400">Y</label>
                      <input
                        type="number"
                        value={Math.round(selectedElementData.y)}
                        onChange={(e) => updateElement(selectedElementData.id, { y: Number(e.target.value) })}
                        className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded text-xs text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-purple-400">Width</label>
                      <input
                        type="number"
                        value={selectedElementData.width}
                        onChange={(e) => updateElement(selectedElementData.id, { width: Number(e.target.value) })}
                        className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-purple-400">Height</label>
                      <input
                        type="number"
                        value={selectedElementData.height}
                        onChange={(e) => updateElement(selectedElementData.id, { height: Number(e.target.value) })}
                        className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded text-xs text-white"
                      />
                    </div>
                  </div>

                  {selectedElementData.type === 'text' && (
                    <>
                      <div>
                        <label className="text-xs text-purple-400">Text</label>
                        <input
                          type="text"
                          value={selectedElementData.content || ''}
                          onChange={(e) => updateElement(selectedElementData.id, { content: e.target.value })}
                          className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-purple-400">Font Size</label>
                        <input
                          type="number"
                          value={selectedElementData.fontSize || 24}
                          onChange={(e) => updateElement(selectedElementData.id, { fontSize: Number(e.target.value) })}
                          className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded text-xs text-white"
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="text-xs text-purple-400">Color</label>
                    <input
                      type="color"
                      value={selectedElementData.color || '#3B82F6'}
                      onChange={(e) => updateElement(selectedElementData.id, { color: e.target.value })}
                      className="w-full h-8 bg-slate-700/50 border border-purple-500/30 rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
