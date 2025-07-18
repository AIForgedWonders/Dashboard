
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  Trophy, 
  Star, 
  Calendar, 
  Download, 
  Upload,
  Edit3,
  Camera,
  Shield,
  Crown,
  Zap,
  Target,
  TrendingUp,
  Award,
  Palette,
  Music,
  FileText,
  Box
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { useRef } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [editOpen, setEditOpen] = useState(false);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const stats = [
    { label: "Projects Created", value: "247", icon: Target, color: "text-purple-400" },
    { label: "AI Generations", value: "1,524", icon: Zap, color: "text-blue-400" },
    { label: "Storage Used", value: "8.4 GB", icon: Upload, color: "text-green-400" },
    { label: "Achievements", value: "23", icon: Trophy, color: "text-yellow-400" }
  ];

  const recentProjects = [
    { name: "Brand Identity Kit", type: "Logo Design", date: "2 hours ago", status: "completed", icon: Palette },
    { name: "Product Video", type: "3D Animation", date: "1 day ago", status: "in-progress", icon: Box },
    { name: "Marketing Copy", type: "AI Text", date: "3 days ago", status: "completed", icon: FileText },
    { name: "Podcast Intro", type: "Audio", date: "1 week ago", status: "completed", icon: Music }
  ];

  const skills = [
    { name: "Visual Design", level: 95, projects: 156 },
    { name: "3D Modeling", level: 78, projects: 43 },
    { name: "Content Writing", level: 87, projects: 89 },
    { name: "Audio Production", level: 65, projects: 32 }
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let photoURL = auth.currentUser?.photoURL || "/avatar.jpg";
      if (avatarFile) {
        // For demo: use a local URL. In production, upload to storage and get a URL.
        photoURL = URL.createObjectURL(avatarFile);
      }
      await updateProfile(auth.currentUser!, {
        displayName,
        photoURL,
      });
      toast.success("Profile updated!");
      setEditOpen(false);
      setAvatarFile(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-purple">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <Avatar className="w-24 h-24 ring-2 ring-purple-500/40">
              {avatarFile ? (
                <AvatarImage src={URL.createObjectURL(avatarFile)} alt="New Avatar" />
              ) : auth.currentUser?.photoURL ? (
                <AvatarImage src={auth.currentUser.photoURL} alt={auth.currentUser.displayName || auth.currentUser.email || 'User'} />
              ) : (
                <AvatarImage src="/avatar.jpg" alt="Default Avatar" />
              )}
              <AvatarFallback className="bg-gradient-purple text-white text-3xl font-bold flex items-center justify-center">
                {displayName ? displayName[0] : (auth.currentUser?.email ? auth.currentUser.email[0] : 'U')}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Camera className="mr-2 h-4 w-4" />
              Change Avatar
            </Button>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md border border-purple-500/30 bg-slate-800/70 text-purple-100"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave} disabled={saving} className="bg-gradient-purple w-full">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100">Profile</h1>
            <p className="text-purple-300">Manage your account and track your creative journey</p>
          </div>
          <Button className="bg-gradient-purple">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-purple-500/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Header */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 bg-gradient-purple">
                      <User className="w-12 h-12 text-white" />
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full bg-purple-600 hover:bg-purple-700">
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-purple-100">Alex Johnson</h2>
                      <Badge className="bg-gradient-purple">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro Creator
                      </Badge>
                    </div>
                    <p className="text-purple-300 mb-4">Creative Director & AI Enthusiast</p>
                    <div className="flex items-center gap-4 text-sm text-purple-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined March 2024
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Verified Account
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-100">Level 42</div>
                    <div className="text-sm text-purple-400">Creator Rank</div>
                    <Progress value={75} className="w-32 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-slate-800/50 border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-purple-100 mb-1">{stat.value}</div>
                    <div className="text-sm text-purple-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Projects */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-600/20 rounded-lg">
                          <project.icon className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-100">{project.name}</h4>
                          <p className="text-sm text-purple-400">{project.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                        <p className="text-xs text-purple-400 mt-1">{project.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-100">Completed "Brand Identity Kit" project</h4>
                        <p className="text-sm text-purple-400">Generated 15 logo variations using AI</p>
                        <p className="text-xs text-purple-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Skill Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-purple-100">{skill.name}</span>
                        <span className="text-sm text-purple-400">{skill.projects} projects</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                      <div className="text-xs text-purple-400">{skill.level}% mastery</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button className="bg-gradient-purple">
                  <Settings className="mr-2 h-4 w-4" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
