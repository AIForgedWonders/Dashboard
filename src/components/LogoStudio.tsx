
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Download, 
  Share2, 
  Heart, 
  Copy,
  Target,
  Palette,
  Type,
  Layers,
  Zap,
  Crown,
  Briefcase,
  Coffee,
  Gamepad2
} from "lucide-react";
import { toast } from "sonner";

interface LogoTemplate {
  id: string;
  name: string;
  category: string;
  icon: any;
  colors: string[];
  style: string;
}

const logoTemplates: LogoTemplate[] = [
  { id: '1', name: 'Tech Startup', category: 'Technology', icon: Zap, colors: ['#3b82f6', '#1d4ed8'], style: 'Modern' },
  { id: '2', name: 'Creative Agency', category: 'Creative', icon: Palette, colors: ['#7c3aed', '#a855f7'], style: 'Artistic' },
  { id: '3', name: 'Coffee Shop', category: 'Food & Beverage', icon: Coffee, colors: ['#92400e', '#d97706'], style: 'Organic' },
  { id: '4', name: 'Gaming Studio', category: 'Gaming', icon: Gamepad2, colors: ['#dc2626', '#991b1b'], style: 'Bold' },
  { id: '5', name: 'Law Firm', category: 'Professional', icon: Briefcase, colors: ['#1f2937', '#374151'], style: 'Professional' },
  { id: '6', name: 'Premium Brand', category: 'Luxury', icon: Crown, colors: ['#fbbf24', '#f59e0b'], style: 'Elegant' },
];

export const LogoStudio = () => {
  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<LogoTemplate | null>(null);
  const [generatedLogos, setGeneratedLogos] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ['All', 'Technology', 'Creative', 'Food & Beverage', 'Gaming', 'Professional', 'Luxury'];

  const filteredTemplates = selectedCategory === 'All' 
    ? logoTemplates 
    : logoTemplates.filter(t => t.category === selectedCategory);

  const generateLogo = async () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI logo generation
    setTimeout(() => {
      const newLogos = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        name: `${companyName} Logo ${i + 1}`,
        style: ['Modern', 'Classic', 'Minimalist', 'Bold', 'Elegant', 'Creative'][i],
        colors: [
          ['#7c3aed', '#a855f7'],
          ['#3b82f6', '#1d4ed8'],
          ['#059669', '#10b981'],
          ['#dc2626', '#991b1b'],
          ['#92400e', '#d97706'],
          ['#7c2d12', '#a16207']
        ][i],
        icon: [Target, Zap, Sparkles, Crown, Coffee, Palette][i]
      }));
      
      setGeneratedLogos(newLogos);
      setIsGenerating(false);
      toast.success('Logo variations generated successfully!');
    }, 2000);
  };

  const downloadLogo = (logo: any) => {
    toast.success(`${logo.name} downloaded successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100 flex items-center gap-3">
              <Target className="h-8 w-8" />
              Logo Studio
            </h1>
            <p className="text-purple-300">Create professional logos with AI-powered design</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300">
              AI-Powered
            </Badge>
            <Button className="bg-gradient-purple">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Pro
            </Button>
          </div>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-purple-500/20">
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600/20">
              Create Logo
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600/20">
              Templates
            </TabsTrigger>
            <TabsTrigger value="generated" className="data-[state=active]:bg-purple-600/20">
              Generated ({generatedLogos.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Logo Creator Form */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-purple-200 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Logo Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-purple-300">Company Name *</label>
                      <Input
                        placeholder="Enter your company name..."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="border-purple-500/30 bg-slate-700/50 text-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-purple-300">Tagline (Optional)</label>
                      <Input
                        placeholder="Your company tagline..."
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="border-purple-500/30 bg-slate-700/50 text-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-purple-300">Industry</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.slice(1).map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={selectedCategory === category 
                              ? "bg-gradient-purple text-xs" 
                              : "border-purple-500/30 text-purple-300 text-xs"
                            }
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-purple-300">Description</label>
                      <Textarea
                        placeholder="Describe your brand, values, and target audience..."
                        className="border-purple-500/30 bg-slate-700/50 text-purple-200 min-h-[80px]"
                      />
                    </div>

                    <Button 
                      onClick={generateLogo} 
                      disabled={isGenerating}
                      className="w-full bg-gradient-purple"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Logo
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Style Options */}
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-purple-200 text-lg">Style Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {['Modern', 'Classic', 'Minimalist', 'Bold', 'Elegant', 'Creative'].map((style) => (
                      <Button
                        key={style}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-purple-500/30 text-purple-300"
                      >
                        {style}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Preview Area */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-purple-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-purple-200">Logo Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center min-h-[400px]">
                    {companyName ? (
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 bg-gradient-purple rounded-xl flex items-center justify-center mx-auto">
                          <Target className="h-16 w-16 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-purple-200">{companyName}</h2>
                          {tagline && <p className="text-purple-400 text-sm mt-1">{tagline}</p>}
                        </div>
                        <Badge className="bg-purple-600/20 text-purple-300">
                          Preview Mode
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto border-2 border-dashed border-purple-500/30">
                          <Target className="h-16 w-16 text-purple-500/50" />
                        </div>
                        <p className="text-purple-400">Enter company name to see preview</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
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

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
                  <CardContent className="p-6 space-y-4">
                    {/* Logo Preview */}
                    <div className="aspect-square bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-xl flex flex-col items-center justify-center border border-purple-500/20">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center mb-3"
                        style={{ 
                          background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})` 
                        }}
                      >
                        <template.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-purple-200 font-semibold">{template.name}</h3>
                      <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400 mt-2">
                        {template.style}
                      </Badge>
                    </div>

                    {/* Template Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-300">{template.category}</span>
                        <div className="flex gap-1">
                          {template.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-purple-500/30"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-purple"
                        onClick={() => {
                          setSelectedTemplate(template);
                          toast.success(`${template.name} template selected!`);
                        }}
                      >
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="generated" className="space-y-6">
            {generatedLogos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedLogos.map((logo) => (
                  <Card key={logo.id} className="bg-slate-800/50 border-purple-500/20">
                    <CardContent className="p-6 space-y-4">
                      {/* Logo Display */}
                      <div className="aspect-square bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-xl flex flex-col items-center justify-center border border-purple-500/20">
                        <div 
                          className="w-20 h-20 rounded-lg flex items-center justify-center mb-4"
                          style={{ 
                            background: `linear-gradient(135deg, ${logo.colors[0]}, ${logo.colors[1]})` 
                          }}
                        >
                          <logo.icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-purple-200 font-semibold text-center">{companyName}</h3>
                        {tagline && <p className="text-purple-400 text-xs text-center mt-1">{tagline}</p>}
                      </div>

                      {/* Logo Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
                            {logo.style}
                          </Badge>
                          <div className="flex gap-1">
                            {logo.colors.map((color: string, index: number) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full border border-purple-500/30"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => downloadLogo(logo)}
                          className="flex-1 bg-gradient-purple"
                        >
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                          <Share2 className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Target className="h-16 w-16 text-purple-500/50 mb-4" />
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">No Generated Logos</h3>
                  <p className="text-purple-400 text-center mb-6">
                    Generate your first logo by filling out the form in the Create tab
                  </p>
                  <Button className="bg-gradient-purple">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Creating
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
