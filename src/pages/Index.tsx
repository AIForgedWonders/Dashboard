
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ServiceCard } from "@/components/ServiceCard";
import { StatsWidget } from "@/components/StatsWidget";
import { AIAssistant } from "@/components/AIAssistant";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Palette,
  Box,
  FileText,
  Music,
  Library,
  Sparkles,
  Trophy,
  Clock,
  Users,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Stats3DModelCard } from '@/components/Stats3DModelCard';
import { StatsChartCard } from '@/components/StatsChartCard';
import { StatsLineChartCard } from '@/components/StatsLineChartCard';
import { StatsPieChartCard } from '@/components/StatsPieChartCard';
import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const services = [
  {
    title: "Visual Creator",
    description: "AI-powered image generation, editing, and enhancement tools",
    icon: Palette,
    features: ["Image Generation", "Style Transfer", "Background Removal", "Upscaling"],
    isNew: true,
    progress: 85,
  },
  {
    title: "3D & Motion Studio",
    description: "Create stunning 3D models, animations, and motion graphics",
    icon: Box,
    features: ["3D Modeling", "Animation", "Rigging", "Rendering"],
    isPro: true,
    progress: 92,
  },
  {
    title: "Text Generation",
    description: "Advanced AI writing assistant for all your content needs",
    icon: FileText,
    features: ["Copywriting", "Blog Posts", "Scripts", "Translation"],
    progress: 78,
  },
  {
    title: "Audio Suite",
    description: "Professional audio generation, editing, and mastering",
    icon: Music,
    features: ["Music Generation", "Voice Synthesis", "Audio Enhancement", "Mixing"],
    isNew: true,
    progress: 67,
  },
  {
    title: "Template Library",
    description: "Vast collection of professional templates and presets",
    icon: Library,
    features: ["Design Templates", "Presets", "Components", "Workflows"],
    progress: 100,
  },
  {
    title: "Video Studio",
    description: "AI-powered video editing and generation",
    icon: Sparkles,
    features: ["Video Editing", "Video Generation", "Effects", "Templates"],
    isNew: true,
    progress: 60,
  },
];

const recentProjects = [
  { name: "E-commerce Product Shots", type: "Visual", status: "completed", time: "2h ago" },
  { name: "Brand Animation", type: "3D & Motion", status: "in-progress", time: "5h ago" },
  { name: "Marketing Copy", type: "Text", status: "completed", time: "1d ago" },
  { name: "Podcast Intro", type: "Audio", status: "in-progress", time: "2d ago" },
];

const achievements = [
  { title: "First Generation", icon: Star, unlocked: true },
  { title: "Speed Creator", icon: Zap, unlocked: true },
  { title: "Collaboration Master", icon: Users, unlocked: false },
  { title: "Pro Creator", icon: Trophy, unlocked: false },
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleServiceClick = (title: string) => {
    setSelectedService(title);
    toast.success(`Launching ${title}...`, {
      description: "Opening your creative workspace",
    });
  };

  return (
    <>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-purple-500/20">
            <div className="absolute inset-0 opacity-10">
              <ThreeCanvas />
            </div>
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:gap-8">
              {/* User Info Card */}
              {user && (
                <div className="flex items-center gap-4 bg-slate-900/70 rounded-xl p-4 shadow-lg border border-purple-500/30 mb-6 md:mb-0">
                  <Avatar className="w-16 h-16 ring-2 ring-purple-500/40">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName || user.email || "User"} />
                    ) : (
                      <AvatarImage src="/avatar.jpg" alt="Default Avatar" />
                    )}
                    <AvatarFallback className="bg-gradient-purple text-white text-3xl font-bold flex items-center justify-center">
                      {user.displayName ? user.displayName[0] : (user.email ? user.email[0] : "U")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-100 flex items-center gap-2">
                      {user.displayName || "Welcome!"}
                      <span className="ml-2 px-2 py-1 text-xs rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold">Logged In</span>
                    </h2>
                    <p className="text-purple-300 text-sm">{user.email}</p>
                  </div>
                </div>
              )}
              <div className="max-w-3xl flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                    Welcome Back
                  </Badge>
                  <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                    All Systems Online
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-purple-100 mb-4">
                  Welcome to AiForged
                  <span className="bg-gradient-purple bg-clip-text text-transparent">
                    {" "}Wonders
                  </span>
                </h1>
                <p className="text-purple-300 text-lg mb-6 max-w-2xl">
                  Unleash your creativity with our suite of AI-powered tools. Generate, edit, and enhance visual, audio, and written content with cutting-edge artificial intelligence.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-purple hover:from-purple-600 hover:to-purple-700 text-white font-medium">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Creating
                  </Button>
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-600/10">
                    View Templates
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <StatsWidget />

          {/* Services Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-100">AI Services</h2>
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                5 Services Available
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  {...service}
                  onClick={() => handleServiceClick(service.title)}
                />
              ))}
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 py-6 px-2 md:px-6">
            {/* Recent Projects */}
            <Card className="bg-slate-800/50 border-purple-500/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-400/40 p-8 md:p-10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-200">
                  <Clock className="h-5 w-5" />
                  Recent Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-purple-200">{project.name}</h4>
                        <p className="text-xs text-purple-400">{project.type} • {project.time}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          project.status === "completed"
                            ? "border-green-500/30 text-green-400"
                            : "border-yellow-500/30 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-purple-300 hover:text-purple-200">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* 3D Model Card */}
            <div className="h-full">
              <Stats3DModelCard />
            </div>

            {/* Chart Card */}
            <div className="h-full">
              <StatsChartCard />
            </div>

            {/* Line Chart Card */}
            <div className="h-full">
              <StatsLineChartCard />
            </div>

            {/* Pie Chart Card */}
            <div className="h-full">
              <StatsPieChartCard />
            </div>

            {/* Achievements */}
            <Card className="bg-slate-800/50 border-purple-500/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-400/40 p-8 md:p-10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-200">
                  <Trophy className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((ach, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <ach.icon className="h-5 w-5 text-purple-400" />
                      <div>
                        <h4 className="text-sm font-medium text-purple-200">{ach.title}</h4>
                        <p className="text-xs text-purple-400">{ach.unlocked ? "Unlocked" : "Locked"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
