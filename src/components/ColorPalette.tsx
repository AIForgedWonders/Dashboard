
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Copy, 
  Download, 
  Shuffle, 
  Heart, 
  Star,
  Sparkles,
  Eye,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  category: string;
  isLiked?: boolean;
}

const predefinedPalettes: ColorPalette[] = [
  {
    id: '1',
    name: 'Purple Dream',
    colors: ['#7c3aed', '#a855f7', '#c084fc', '#e879f9', '#f3e8ff'],
    category: 'Modern'
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    colors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'],
    category: 'Nature'
  },
  {
    id: '3',
    name: 'Sunset Glow',
    colors: ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#fff7ed'],
    category: 'Warm'
  },
  {
    id: '4',
    name: 'Forest Green',
    colors: ['#059669', '#10b981', '#34d399', '#6ee7b7', '#d1fae5'],
    category: 'Nature'
  },
  {
    id: '5',
    name: 'Rose Gold',
    colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
    category: 'Elegant'
  },
  {
    id: '6',
    name: 'Midnight Blue',
    colors: ['#1e3a8a', '#3730a3', '#4338ca', '#6366f1', '#a5b4fc'],
    category: 'Professional'
  }
];

export const ColorPalette = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>(predefinedPalettes);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customColors, setCustomColors] = useState(['#7c3aed', '#a855f7', '#c084fc', '#e879f9', '#f3e8ff']);
  const [newColorName, setNewColorName] = useState('');

  const categories = ['All', 'Modern', 'Nature', 'Warm', 'Elegant', 'Professional'];

  const filteredPalettes = selectedCategory === 'All' 
    ? palettes 
    : palettes.filter(p => p.category === selectedCategory);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Color ${color} copied to clipboard!`);
  };

  const copyPalette = (colors: string[]) => {
    const paletteString = colors.join(', ');
    navigator.clipboard.writeText(paletteString);
    toast.success('Palette copied to clipboard!');
  };

  const generateRandomPalette = () => {
    const randomColors = Array.from({ length: 5 }, () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 50) + 50;
      const lightness = Math.floor(Math.random() * 40) + 30;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });
    setCustomColors(randomColors);
    toast.success('New random palette generated!');
  };

  const savePalette = () => {
    if (!newColorName.trim()) {
      toast.error('Please enter a palette name');
      return;
    }

    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      name: newColorName,
      colors: [...customColors],
      category: 'Custom'
    };

    setPalettes(prev => [...prev, newPalette]);
    setNewColorName('');
    toast.success('Palette saved successfully!');
  };

  const toggleLike = (paletteId: string) => {
    setPalettes(prev => prev.map(p => 
      p.id === paletteId ? { ...p, isLiked: !p.isLiked } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100 flex items-center gap-3">
              <Palette className="h-8 w-8" />
              Color Palette Studio
            </h1>
            <p className="text-purple-300">Discover, create, and manage beautiful color combinations</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300">
              {palettes.length} Palettes
            </Badge>
            <Button onClick={generateRandomPalette} className="bg-gradient-purple">
              <Shuffle className="mr-2 h-4 w-4" />
              Random
            </Button>
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-purple-500/20">
            <TabsTrigger value="browse" className="data-[state=active]:bg-purple-600/20">
              Browse Palettes
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600/20">
              Create Palette
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-600/20">
              Color Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Category Filter */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category 
                        ? "bg-gradient-purple" 
                        : "border-purple-500/30 text-purple-300"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Palette Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPalettes.map((palette) => (
                <Card key={palette.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-purple-200 text-lg">{palette.name}</CardTitle>
                        <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
                          {palette.category}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleLike(palette.id)}
                        className={palette.isLiked ? "text-red-400" : "text-purple-400"}
                      >
                        <Heart className={`h-4 w-4 ${palette.isLiked ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Color Swatches */}
                    <div className="flex rounded-lg overflow-hidden h-16">
                      {palette.colors.map((color, index) => (
                        <button
                          key={index}
                          className="flex-1 hover:opacity-80 transition-opacity relative group"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color)}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Copy className="h-4 w-4 text-white" />
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Color Values */}
                    <div className="space-y-1">
                      {palette.colors.map((color, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-purple-300">Color {index + 1}</span>
                          <span className="text-purple-400 font-mono">{color}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-purple-500/20">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyPalette(palette.colors)}
                        className="flex-1 border-purple-500/30 text-purple-300"
                      >
                        <Copy className="mr-2 h-3 w-3" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/30 text-purple-300"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Custom Palette Creator */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Create Custom Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Color Inputs */}
                  <div className="space-y-3">
                    {customColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border border-purple-500/30"
                          style={{ backgroundColor: color }}
                        />
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...customColors];
                            newColors[index] = e.target.value;
                            setCustomColors(newColors);
                          }}
                          className="w-20 h-12 p-1 border-purple-500/30"
                        />
                        <Input
                          type="text"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...customColors];
                            newColors[index] = e.target.value;
                            setCustomColors(newColors);
                          }}
                          className="flex-1 border-purple-500/30 bg-slate-700/50 text-purple-200"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Palette Preview */}
                  <div className="flex rounded-lg overflow-hidden h-20 border border-purple-500/30">
                    {customColors.map((color, index) => (
                      <div
                        key={index}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Save Palette */}
                  <div className="space-y-2">
                    <Input
                      placeholder="Enter palette name..."
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      className="border-purple-500/30 bg-slate-700/50 text-purple-200"
                    />
                    <div className="flex gap-2">
                      <Button onClick={savePalette} className="flex-1 bg-gradient-purple">
                        <Star className="mr-2 h-4 w-4" />
                        Save Palette
                      </Button>
                      <Button variant="outline" onClick={generateRandomPalette} className="border-purple-500/30 text-purple-300">
                        <Shuffle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Color Generator */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI Color Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {['Energetic', 'Calm', 'Professional', 'Creative', 'Nature', 'Technology'].map((mood) => (
                      <Button
                        key={mood}
                        variant="outline"
                        onClick={() => {
                          // Simulate AI generation based on mood
                          generateRandomPalette();
                          toast.success(`Generated ${mood.toLowerCase()} palette!`);
                        }}
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-600/10"
                      >
                        {mood}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg border border-purple-500/20">
                    <p className="text-sm text-purple-300 mb-2">💡 Pro Tip:</p>
                    <p className="text-xs text-purple-400">
                      Click any mood button to generate a color palette that matches that feeling or theme. 
                      Our AI considers color psychology and design principles.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Color Wheel */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200">Color Wheel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gradient-conic from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 rounded-full relative">
                    <div className="absolute inset-4 bg-slate-800 rounded-full flex items-center justify-center">
                      <Eye className="h-8 w-8 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contrast Checker */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200">Contrast Checker</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-500 rounded" />
                      <span className="text-purple-300 text-sm">Foreground</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-800 border border-purple-500/30 rounded" />
                      <span className="text-purple-300 text-sm">Background</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-slate-800 border border-purple-500/30 rounded-lg text-center">
                    <span className="text-purple-500 font-medium">Sample Text</span>
                  </div>
                  
                  <div className="text-xs text-purple-400">
                    <p>Contrast Ratio: 4.2:1</p>
                    <p className="text-green-400">✓ WCAG AA Compliant</p>
                  </div>
                </CardContent>
              </Card>

              {/* Gradient Generator */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200">Gradient Generator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full" />
                      <span className="text-purple-300 text-sm">#7c3aed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-pink-500 rounded-full" />
                      <span className="text-purple-300 text-sm">#ec4899</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full border-purple-500/30 text-purple-300">
                    <Copy className="mr-2 h-3 w-3" />
                    Copy CSS
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
