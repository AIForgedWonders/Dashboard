
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Library, 
  Search, 
  Filter,
  Star,
  Download,
  Eye,
  Heart,
  Zap,
  Layers,
  FileText,
  Image,
  Video
} from "lucide-react";

const templates = [
  { id: 1, name: "Social Media Pack", category: "Social", type: "Design", rating: 4.8, downloads: 1250, premium: true },
  { id: 2, name: "Blog Post Template", category: "Content", type: "Text", rating: 4.6, downloads: 980, premium: false },
  { id: 3, name: "Logo Collection", category: "Branding", type: "Design", rating: 4.9, downloads: 2100, premium: true },
  { id: 4, name: "Music Loops", category: "Audio", type: "Audio", rating: 4.7, downloads: 850, premium: true },
  { id: 5, name: "Video Intro Pack", category: "Video", type: "Video", rating: 4.5, downloads: 1500, premium: true },
  { id: 6, name: "Email Templates", category: "Marketing", type: "Text", rating: 4.4, downloads: 750, premium: false },
];

const categories = ["All", "Social", "Content", "Branding", "Audio", "Video", "Marketing"];

const templateImages = {
  1: "/template/1.avif",
  2: "/template/2.jpg",
  3: "/template/3.webp",
  4: "/template/4.jpeg",
  5: "/template/5.jpg",
  6: "/template/6.jpg",
};

export default function TemplateLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Design": return Image;
      case "Text": return FileText;
      case "Audio": return Library;
      case "Video": return Video;
      default: return Layers;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Template Library</h1>
            <p className="text-purple-300">Discover and use professional templates</p>
          </div>
          <Badge className="bg-gradient-purple text-white">
            <Library className="w-4 h-4 mr-1" />
            {templates.length} Templates
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-purple-500/30 text-white"
            />
          </div>
          <Button variant="outline" className="border-purple-500/30 text-purple-300">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="bg-slate-800 border-purple-500/20">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="data-[state=active]:bg-purple-600">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const TypeIcon = getTypeIcon(template.type);
              const imgSrc = templateImages[template.id];
              return (
                <Card key={template.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                  <div className="aspect-video bg-slate-700 relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-purple opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {imgSrc ? (
                        <img src={imgSrc} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <TypeIcon className="w-12 h-12 text-white/80" />
                      )}
                    </div>
                    {template.premium && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-purple text-white">
                          <Zap className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" className="bg-purple-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {template.category}
                      </Badge>
                      <span className="text-purple-300 text-sm">{template.downloads} downloads</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" className="border-purple-500/30">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="text-center py-12">
                <Library className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
                <p className="text-purple-300">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </Tabs>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Featured Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <Image className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Design Essentials</h3>
                <p className="text-purple-300 text-sm">50+ templates</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <FileText className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Content Starter Pack</h3>
                <p className="text-purple-300 text-sm">30+ templates</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <Video className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                <h3 className="text-white font-medium">Video Templates</h3>
                <p className="text-purple-300 text-sm">25+ templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
