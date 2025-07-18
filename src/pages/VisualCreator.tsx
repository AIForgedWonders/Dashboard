
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image, 
  Palette, 
  Wand2, 
  Download, 
  Share2, 
  Heart,
  Star,
  Filter,
  Layers,
  Sparkles
} from "lucide-react";
import { generateImageFromPrompt } from "@/lib/huggingface";

const generatedImages = [
  {
    id: 1,
    url: "/placeholder.svg",
    prompt: "Futuristic cityscape with neon lights",
    style: "Cyberpunk",
    resolution: "1024x1024",
    likes: 245
  },
  {
    id: 2,
    url: "/placeholder.svg",
    prompt: "Mystical forest with glowing mushrooms",
    style: "Fantasy",
    resolution: "1024x1024",
    likes: 189
  },
  {
    id: 3,
    url: "/placeholder.svg",
    prompt: "Abstract geometric patterns in purple",
    style: "Abstract",
    resolution: "1024x1024",
    likes: 156
  }
];

export default function VisualCreator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setPreviewImage(null);
    try {
      const imageUrl = await generateImageFromPrompt(prompt + ", " + selectedStyle);
      if (imageUrl) {
        setPreviewImage(imageUrl);
        setGeneratedImages(prev => [{ id: Date.now(), url: imageUrl, prompt, style: selectedStyle, likes: 0 }, ...prev]);
      } else {
        alert("Failed to generate image. Try again.");
      }
    } catch (e) {
      alert("Error generating image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const styles = [
    "Photorealistic", "Digital Art", "Oil Painting", "Watercolor", 
    "Sketch", "Anime", "Cyberpunk", "Fantasy", "Abstract", "Minimalist"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Visual Creator</h1>
            <p className="text-purple-300">Generate stunning visuals with AI</p>
          </div>
          <Badge className="bg-gradient-purple text-white">
            <Sparkles className="w-4 h-4 mr-1" />
            Premium
          </Badge>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="bg-slate-800 border-purple-500/20">
            <TabsTrigger value="generate" className="data-[state=active]:bg-purple-600">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-600">
              <Image className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="styles" className="data-[state=active]:bg-purple-600">
              <Palette className="w-4 h-4 mr-2" />
              Styles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Wand2 className="w-5 h-5 mr-2 text-purple-400" />
                    AI Image Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-purple-300 mb-2 block">
                      Describe your vision
                    </label>
                    <Textarea
                      placeholder="A majestic dragon soaring through a sunset sky..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-slate-700 border-purple-500/30 text-white"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-purple-300 mb-2 block">
                      Style
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {styles.slice(0, 5).map((style) => (
                        <Button
                          key={style}
                          variant={selectedStyle === style ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedStyle(style)}
                          className={selectedStyle === style ? "bg-purple-600 text-white font-semibold shadow-md" : "border-purple-500/40 text-purple-300 hover:bg-purple-700/10 font-semibold"}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-purple-300 mb-2 block">
                        Resolution
                      </label>
                      <Input
                        value="1024x1024"
                        className="bg-slate-700 border-purple-500/30 text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-purple-300 mb-2 block">
                        Quality
                      </label>
                      <Input
                        value="Ultra HD"
                        className="bg-slate-700 border-purple-500/30 text-white"
                        readOnly
                      />
                    </div>
                  </div>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-300">Generating...</span>
                        <span className="text-purple-300">{progress}%</span>
                      </div>
                      <Progress value={progress} className="bg-slate-700" />
                    </div>
                  )}

                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt || isGenerating}
                    className="w-full bg-gradient-purple text-white font-semibold shadow-lg hover:opacity-90 text-lg py-3"
                  >
                    {isGenerating ? "Generating..." : "Create Image"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Image className="w-5 h-5 mr-2 text-purple-400" />
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {previewImage ? (
                    <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-500/30">
                      <img
                        src={previewImage}
                        alt="Generated Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-500/30">
                      <div className="text-center text-purple-300">
                        <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Your generated image will appear here</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="border-purple-500/40 text-purple-300 hover:bg-purple-700/10 font-semibold">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/40 text-purple-300 hover:bg-purple-700/10 font-semibold">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/40 text-purple-300 hover:bg-purple-700/10 font-semibold">
                      <Heart className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Creations</h2>
              <Button variant="outline" size="sm" className="border-purple-500/40 text-purple-300 hover:bg-purple-700/10 font-semibold">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image) => (
                <Card key={image.id} className="bg-slate-800/50 border-purple-500/20 overflow-hidden group hover:border-purple-500/40 transition-colors">
                  <div className="aspect-square bg-slate-700 relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" className="bg-purple-600">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-white text-sm mb-2 line-clamp-2">{image.prompt}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {image.style}
                      </Badge>
                      <div className="flex items-center text-purple-300 text-sm">
                        <Heart className="w-4 h-4 mr-1" />
                        {image.likes}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="styles" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {styles.map((style) => (
                <Card key={style} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="aspect-square bg-gradient-purple rounded-lg mb-3 flex items-center justify-center">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-medium">{style}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
