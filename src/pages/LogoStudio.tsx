
import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Download, 
  Share2, 
  Palette, 
  Type,
  Layers,
  Zap,
  Star,
  Heart,
  Play,
  Pause,
  RotateCw,
  Save,
  Eye,
  Grid3X3,
  Target,
  Wand2,
  Crown,
  Diamond
} from "lucide-react";
import { toast } from "sonner";
import { generateImageFromPrompt } from "@/lib/huggingface";

const logoStyles = [
  { id: 'minimalist', name: 'Minimalist', icon: '○', color: 'bg-blue-500' },
  { id: 'modern', name: 'Modern', icon: '◇', color: 'bg-purple-500' },
  { id: 'vintage', name: 'Vintage', icon: '❋', color: 'bg-amber-500' },
  { id: 'tech', name: 'Tech', icon: '◈', color: 'bg-green-500' },
  { id: 'elegant', name: 'Elegant', icon: '◊', color: 'bg-pink-500' },
  { id: 'bold', name: 'Bold', icon: '●', color: 'bg-red-500' }
];

const industries = [
  'Technology', 'Fashion', 'Food & Beverage', 'Healthcare', 'Finance', 
  'Education', 'Real Estate', 'Entertainment', 'Sports', 'Travel'
];

const colorPalettes = [
  { name: 'Ocean', colors: ['#0EA5E9', '#0284C7', '#0369A1', '#1E40AF'] },
  { name: 'Sunset', colors: ['#F59E0B', '#F97316', '#EF4444', '#DC2626'] },
  { name: 'Forest', colors: ['#10B981', '#059669', '#047857', '#065F46'] },
  { name: 'Royal', colors: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'] },
  { name: 'Monochrome', colors: ['#374151', '#4B5563', '#6B7280', '#9CA3AF'] }
];

const generatedLogos = [
  { id: 1, name: 'TechFlow', style: 'Modern', industry: 'Technology', rating: 4.8 },
  { id: 2, name: 'EcoVibe', style: 'Minimalist', industry: 'Environment', rating: 4.9 },
  { id: 3, name: 'FoodieHub', style: 'Vintage', industry: 'Food & Beverage', rating: 4.7 },
  { id: 4, name: 'MedCare+', style: 'Clean', industry: 'Healthcare', rating: 4.6 },
  { id: 5, name: 'FinanceForward', style: 'Corporate', industry: 'Finance', rating: 4.8 },
  { id: 6, name: 'EduSpark', style: 'Playful', industry: 'Education', rating: 4.9 }
];

export default function LogoStudio() {
  const [companyName, setCompanyName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('minimalist');
  const [selectedIndustry, setSelectedIndustry] = useState('Technology');
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [complexity, setComplexity] = useState([50]);
  const [modernness, setModernness] = useState([75]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedLogos, setGeneratedLogos] = useState<any[]>([]);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const generateLogo = async () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      return;
    }
    setIsGenerating(true);
    setPreviewLogo(null);
    toast.info('AI is crafting your logo...');
    try {
      const paletteColors = colorPalettes[selectedPalette]?.colors?.join(", ") || "";
      const prompt = `Logo for ${companyName}, style: ${selectedStyle}, industry: ${selectedIndustry}, colors: ${paletteColors}`;
      const logoUrl = await generateImageFromPrompt(prompt);
      if (logoUrl) {
        setPreviewLogo(logoUrl);
        setGeneratedLogos(prev => [{ id: Date.now(), url: logoUrl, name: companyName, style: selectedStyle, industry: selectedIndustry, likes: 0 }, ...prev]);
        toast.success('Logo generated successfully!');
      } else {
        toast.error('Failed to generate logo. Try again.');
      }
    } catch (e) {
      toast.error('Error generating logo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportLogo = (format: string) => {
    toast.success(`Logo exported as ${format.toUpperCase()}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-400" />
              AI Logo Studio
            </h1>
            <p className="text-purple-300">Create professional logos with AI-powered design</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300">
              <Crown className="w-3 h-3 mr-1" />
              Pro Features
            </Badge>
            <Button className="bg-gradient-purple text-white font-semibold shadow-lg">
              <Save className="mr-2 h-4 w-4" />
              Save Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Brand Input */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Brand Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-300 mb-2 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name..."
                    className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-purple-300 mb-2 block">
                    Industry
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white"
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Design Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {logoStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedStyle === style.id
                          ? 'border-purple-500 bg-purple-600/20'
                          : 'border-purple-500/30 hover:border-purple-400'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${style.color} flex items-center justify-center text-white font-bold mb-2 mx-auto`}>
                        {style.icon}
                      </div>
                      <p className="text-sm text-purple-300">{style.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Controls */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  AI Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-300 mb-2 block">
                    Complexity: {complexity[0]}%
                  </label>
                  <Slider
                    value={complexity}
                    onValueChange={setComplexity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-purple-300 mb-2 block">
                    Modernness: {modernness[0]}%
                  </label>
                  <Slider
                    value={modernness}
                    onValueChange={setModernness}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Color Palettes */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Color Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {colorPalettes.map((palette, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPalette(index)}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        selectedPalette === index
                          ? 'border-purple-500 bg-purple-600/20'
                          : 'border-purple-500/30 hover:border-purple-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {palette.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-purple-300">{palette.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={generateLogo}
              disabled={isGenerating}
              className="w-full bg-gradient-purple text-white font-semibold shadow-lg text-lg py-3"
            >
              {isGenerating ? (
                <>
                  <Zap className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Logo
                </>
              )}
            </Button>
          </div>

          {/* Center Panel - Canvas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Canvas */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-purple-500/30">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-500/30">
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {previewLogo ? (
                    <img src={previewLogo} alt="Generated Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Target className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                        <p className="text-purple-300">Enter company name to preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['PNG', 'SVG', 'PDF', 'AI'].map((format) => (
                    <Button
                      key={format}
                      onClick={() => exportLogo(format)}
                      variant="outline"
                      className="border-purple-500/40 text-purple-300 hover:bg-purple-700/10 font-semibold"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generated Logos Gallery */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Generated Logos ({generatedLogos.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {generatedLogos.map((logo) => (
                    <div key={logo.id} className="group relative">
                      <div className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center border border-purple-500/20 hover:border-purple-400 transition-colors">
                        <img src={logo.url} alt={logo.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" className="bg-purple-600 text-white font-semibold shadow-md">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" className="bg-purple-600 text-white font-semibold shadow-md">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" className="bg-purple-600 text-white font-semibold shadow-md">
                          <Heart className="h-3 w-3" />
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
