
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette,
  Copy,
  Download,
  Save,
  Shuffle,
  Heart,
  Star,
  Eye,
  Lightbulb,
  Zap,
  Sparkles,
  RefreshCw,
  Camera,
  Upload,
  Wand2,
  Crown,
  Target
} from "lucide-react";
import { toast } from "sonner";

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  category: string;
  likes: number;
  isLiked: boolean;
}

interface ColorAnalysis {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name: string;
  temperature: string;
  accessibility: string;
}

const colorHarmonyTypes = [
  { id: 'monochromatic', name: 'Monochromatic', description: 'Variations of single hue' },
  { id: 'analogous', name: 'Analogous', description: 'Adjacent colors on wheel' },
  { id: 'complementary', name: 'Complementary', description: 'Opposite colors' },
  { id: 'triadic', name: 'Triadic', description: 'Three evenly spaced colors' },
  { id: 'tetradic', name: 'Tetradic', description: 'Four colors forming rectangle' },
  { id: 'split-complementary', name: 'Split Complementary', description: 'Base + two adjacent to complement' }
];

const trendingPalettes: ColorPalette[] = [
  {
    id: '1',
    name: 'Sunset Vibes',
    colors: ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569', '#F8B500'],
    category: 'Warm',
    likes: 1247,
    isLiked: false
  },
  {
    id: '2',
    name: 'Ocean Deep',
    colors: ['#0077BE', '#00A8CC', '#0ABAB5', '#40E0D0', '#48CAE4'],
    category: 'Cool',
    likes: 892,
    isLiked: true
  },
  {
    id: '3',
    name: 'Forest Canopy',
    colors: ['#2D5016', '#3B6E2A', '#4F7942', '#68A357', '#7BC950'],
    category: 'Nature',
    likes: 1056,
    isLiked: false
  },
  {
    id: '4',
    name: 'Royal Purple',
    colors: ['#2E1065', '#5B21B6', '#7C3AED', '#A855F7', '#C084FC'],
    category: 'Luxury',
    likes: 1534,
    isLiked: true
  },
  {
    id: '5',
    name: 'Autumn Leaves',
    colors: ['#8B4513', '#CD853F', '#D2691E', '#FF7F50', '#FF6347'],
    category: 'Seasonal',
    likes: 743,
    isLiked: false
  },
  {
    id: '6',
    name: 'Minimalist',
    colors: ['#F8F9FA', '#E9ECEF', '#6C757D', '#495057', '#212529'],
    category: 'Neutral',
    likes: 2156,
    isLiked: false
  }
];

const colorCategories = ['All', 'Warm', 'Cool', 'Nature', 'Luxury', 'Seasonal', 'Neutral'];

export default function ColorPalette() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedHarmony, setSelectedHarmony] = useState('complementary');
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [generatedPalette, setGeneratedPalette] = useState<string[]>([]);
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>(trendingPalettes);
  const [colorAnalysis, setColorAnalysis] = useState<ColorAnalysis | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [brightness, setBrightness] = useState([50]);
  const [saturation, setSaturation] = useState([50]);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Generate color harmony
  const generateHarmony = (baseHex: string, type: string) => {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [baseHex];

    switch (type) {
      case 'complementary':
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 30)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(80, hsl.l + 30)));
        break;
      case 'triadic':
        colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
        break;
      case 'analogous':
        colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l));
        break;
      case 'monochromatic':
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 20)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 40)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 20)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 40)));
        break;
      default:
        break;
    }

    return colors.slice(0, 5);
  };

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Analyze color
  const analyzeColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const temperature = hsl.h > 180 && hsl.h < 300 ? 'Cool' : 'Warm';
    const brightness = hsl.l > 50 ? 'Light' : 'Dark';
    const accessibility = hsl.l > 60 || hsl.l < 40 ? 'Good contrast' : 'Poor contrast';

    return {
      hex,
      rgb,
      hsl,
      name: getColorName(hex),
      temperature,
      accessibility
    };
  };

  const getColorName = (hex: string) => {
    // Simple color name mapping
    const colorNames: { [key: string]: string } = {
      '#FF0000': 'Red',
      '#00FF00': 'Green',
      '#0000FF': 'Blue',
      '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta',
      '#00FFFF': 'Cyan',
      '#000000': 'Black',
      '#FFFFFF': 'White',
      '#808080': 'Gray'
    };
    return colorNames[hex.toUpperCase()] || 'Custom Color';
  };

  const generatePalette = async () => {
    setIsGenerating(true);
    toast.info('Generating color harmony...');
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const colors = generateHarmony(baseColor, selectedHarmony);
    setGeneratedPalette(colors);
    setColorAnalysis(analyzeColor(baseColor));
    setIsGenerating(false);
    toast.success('Color palette generated!');
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied to clipboard!`);
  };

  const savePalette = () => {
    if (generatedPalette.length === 0) return;
    
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      name: `Custom Palette ${savedPalettes.length + 1}`,
      colors: generatedPalette,
      category: 'Custom',
      likes: 0,
      isLiked: false
    };
    
    setSavedPalettes(prev => [newPalette, ...prev]);
    toast.success('Palette saved!');
  };

  const toggleLike = (id: string) => {
    setSavedPalettes(prev => prev.map(palette => 
      palette.id === id 
        ? { ...palette, isLiked: !palette.isLiked, likes: palette.isLiked ? palette.likes - 1 : palette.likes + 1 }
        : palette
    ));
  };

  const filteredPalettes = selectedCategory === 'All' 
    ? savedPalettes 
    : savedPalettes.filter(palette => palette.category === selectedCategory);

  useEffect(() => {
    generatePalette();
  }, [baseColor, selectedHarmony]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Palette className="h-8 w-8 text-purple-400" />
              Color Palette Studio
            </h1>
            <p className="text-purple-300">Advanced color theory and palette generation tools</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300">
              <Crown className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
            <Button className="bg-gradient-purple">
              <Save className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Generator */}
          <div className="space-y-6">
            {/* Color Input */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Base Color
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-purple-500/30 cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white font-mono"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={() => setBaseColor('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'))}
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-300"
                >
                  <Shuffle className="mr-2 h-4 w-4" />
                  Random Color
                </Button>
              </CardContent>
            </Card>

            {/* Harmony Type */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Color Harmony
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {colorHarmonyTypes.map((harmony) => (
                  <button
                    key={harmony.id}
                    onClick={() => setSelectedHarmony(harmony.id)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      selectedHarmony === harmony.id
                        ? 'border-purple-500 bg-purple-600/20'
                        : 'border-purple-500/30 hover:border-purple-400'
                    }`}
                  >
                    <div className="font-medium text-purple-200">{harmony.name}</div>
                    <div className="text-xs text-purple-400">{harmony.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Advanced Controls */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg">Fine Tuning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-300 mb-2 block">
                    Brightness: {brightness[0]}%
                  </label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-purple-300 mb-2 block">
                    Saturation: {saturation[0]}%
                  </label>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <Button
                  onClick={generatePalette}
                  disabled={isGenerating}
                  className="w-full bg-gradient-purple"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Palette
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Generated Palette */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generated Palette */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-200 text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Generated Palette
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={savePalette}
                      size="sm"
                      className="bg-purple-600"
                      disabled={generatedPalette.length === 0}
                    >
                      <Save className="mr-1 h-3 w-3" />
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedPalette.join(', '));
                        toast.success('Palette copied!');
                      }}
                      size="sm"
                      variant="outline"
                      className="border-purple-500/30"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {generatedPalette.map((color, index) => (
                    <div key={index} className="aspect-square">
                      <div
                        className="w-full h-full rounded-lg border-2 border-purple-500/20 cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                      />
                      <p className="text-xs text-purple-300 text-center mt-1 font-mono">
                        {color}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Palette Preview */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-purple-200">Preview Applications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Website Preview */}
                    <div className="bg-white rounded-lg p-4 text-sm">
                      <div 
                        className="h-8 rounded mb-2"
                        style={{ backgroundColor: generatedPalette[0] || '#3B82F6' }}
                      />
                      <div className="h-2 bg-gray-200 rounded mb-1" />
                      <div className="h-2 bg-gray-200 rounded w-3/4 mb-2" />
                      <div 
                        className="h-6 rounded text-white text-xs flex items-center justify-center"
                        style={{ backgroundColor: generatedPalette[1] || '#6366F1' }}
                      >
                        Button
                      </div>
                    </div>
                    
                    {/* Brand Preview */}
                    <div className="bg-slate-900 rounded-lg p-4 text-center">
                      <div 
                        className="w-12 h-12 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: generatedPalette[0] || '#3B82F6' }}
                      />
                      <div className="text-white text-sm font-bold">Brand Logo</div>
                      <div 
                        className="text-xs mt-1"
                        style={{ color: generatedPalette[2] || '#A855F7' }}
                      >
                        Tagline here
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Analysis */}
            {colorAnalysis && (
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Color Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-purple-400 text-xs">RGB</p>
                      <p className="text-white font-mono text-sm">
                        {colorAnalysis.rgb.r}, {colorAnalysis.rgb.g}, {colorAnalysis.rgb.b}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-400 text-xs">HSL</p>
                      <p className="text-white font-mono text-sm">
                        {colorAnalysis.hsl.h}°, {colorAnalysis.hsl.s}%, {colorAnalysis.hsl.l}%
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-400 text-xs">Temperature</p>
                      <p className="text-white text-sm">{colorAnalysis.temperature}</p>
                    </div>
                    <div>
                      <p className="text-purple-400 text-xs">Accessibility</p>
                      <p className="text-white text-sm">{colorAnalysis.accessibility}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Saved Palettes */}
          <div className="space-y-6">
            {/* Category Filter */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {colorCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full p-2 rounded-lg text-left transition-all ${
                        selectedCategory === category
                          ? 'bg-purple-600/20 text-purple-200'
                          : 'text-purple-400 hover:bg-purple-600/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Palettes */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 text-lg">
                  Saved Palettes ({filteredPalettes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredPalettes.map((palette) => (
                    <div key={palette.id} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-purple-200">{palette.name}</h4>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleLike(palette.id)}
                            className={`p-1 rounded ${
                              palette.isLiked ? 'text-red-400' : 'text-purple-400 hover:text-red-400'
                            }`}
                          >
                            <Heart className={`h-3 w-3 ${palette.isLiked ? 'fill-current' : ''}`} />
                          </button>
                          <span className="text-xs text-purple-400">{palette.likes}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {palette.colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 h-8 rounded cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => copyToClipboard(color)}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
                          {palette.category}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="opacity-0 group-hover:opacity-100 transition-opacity border-purple-500/30 text-purple-300"
                          onClick={() => {
                            setGeneratedPalette(palette.colors);
                            setBaseColor(palette.colors[0]);
                          }}
                        >
                          Use
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
