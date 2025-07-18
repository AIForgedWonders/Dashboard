
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History, 
  Search, 
  Filter,
  Eye,
  Download,
  Star,
  Trash2,
  Copy,
  Clock,
  Image,
  FileText,
  Music,
  Video,
  Calendar
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Brand Logo Design",
    type: "Visual",
    status: "Completed",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    thumbnail: "/history/1.png",
    favorite: true
  },
  {
    id: 2,
    name: "Social Media Campaign",
    type: "Text",
    status: "In Progress",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-16",
    thumbnail: "/history/2.jpeg",
    favorite: false
  },
  {
    id: 3,
    name: "Background Music Track",
    type: "Audio",
    status: "Completed",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
    thumbnail: "/history/3.png",
    favorite: true
  },
  {
    id: 4,
    name: "Product Demo Video",
    type: "Video",
    status: "Draft",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-14",
    thumbnail: "/history/4.jpeg",
    favorite: false
  }
];

export default function ProjectHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Visual": return Image;
      case "Text": return FileText;
      case "Audio": return Music;
      case "Video": return Video;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-600/20 text-green-300";
      case "In Progress": return "bg-blue-600/20 text-blue-300";
      case "Draft": return "bg-yellow-600/20 text-yellow-300";
      default: return "bg-gray-600/20 text-gray-300";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "All" || project.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Project History</h1>
            <p className="text-purple-300">Manage and track all your creative projects</p>
          </div>
          <Badge className="bg-gradient-purple text-white">
            <History className="w-4 h-4 mr-1" />
            {projects.length} Projects
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-purple-500/30 text-white"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-purple-500/30 text-purple-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-300">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="space-y-6">
          <TabsList className="bg-slate-800 border-purple-500/20">
            {["All", "Visual", "Text", "Audio", "Video"].map((filter) => (
              <TabsTrigger key={filter} value={filter} className="data-[state=active]:bg-purple-600">
                {filter}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const TypeIcon = getTypeIcon(project.type);
              return (
                <Card key={project.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                  <div className="aspect-video bg-slate-700 relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-8 h-8 p-0 ${project.favorite ? 'text-yellow-400' : 'text-gray-400'}`}
                      >
                        <Star className={`w-4 h-4 ${project.favorite ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" className="bg-purple-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg flex items-center">
                        <TypeIcon className="w-4 h-4 mr-2 text-purple-400" />
                        {project.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-purple-300 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Created: {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-purple-300 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Updated: {new Date(project.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Open Project
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-500/30 text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="text-center py-12">
                <History className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-purple-300">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </Tabs>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-purple-300">Used Storage</span>
                <span className="text-white font-medium">2.4 GB / 10 GB</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-purple h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-purple-300">Images</div>
                  <div className="text-white font-medium">1.2 GB</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-300">Audio</div>
                  <div className="text-white font-medium">800 MB</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-300">Video</div>
                  <div className="text-white font-medium">350 MB</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-300">Documents</div>
                  <div className="text-white font-medium">50 MB</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
