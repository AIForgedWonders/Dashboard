
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  Crown, 
  Shield, 
  Settings, 
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Target,
  TrendingUp,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "sonner";

export default function Team() {
  const [activeTab, setActiveTab] = useState("members");

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      email: "sarah@company.com",
      avatar: "SC",
      status: "online",
      permissions: "Admin",
      projects: 45,
      lastActive: "Active now",
      badge: "Pro"
    },
    {
      name: "Marcus Rodriguez",
      role: "3D Artist",
      email: "marcus@company.com", 
      avatar: "MR",
      status: "away",
      permissions: "Editor",
      projects: 32,
      lastActive: "2 hours ago",
      badge: "Plus"
    },
    {
      name: "Elena Vasquez",
      role: "Content Writer",
      email: "elena@company.com",
      avatar: "EV", 
      status: "online",
      permissions: "Editor",
      projects: 28,
      lastActive: "Active now",
      badge: "Pro"
    },
    {
      name: "David Kim",
      role: "Motion Designer",
      email: "david@company.com",
      avatar: "DK",
      status: "offline",
      permissions: "Viewer",
      projects: 15,
      lastActive: "1 day ago",
      badge: "Basic"
    }
  ];

  const teamProjects = [
    {
      name: "Brand Campaign 2024",
      members: 4,
      progress: 85,
      status: "in-progress",
      deadline: "Dec 15, 2024",
      type: "Visual Campaign"
    },
    {
      name: "Product Launch Videos",
      members: 3,
      progress: 60,
      status: "in-progress", 
      deadline: "Dec 20, 2024",
      type: "3D Animation"
    },
    {
      name: "Website Content",
      members: 2,
      progress: 100,
      status: "completed",
      deadline: "Dec 10, 2024",
      type: "Text Generation"
    }
  ];

  const teamStats = [
    { label: "Team Members", value: "4", icon: Users, color: "text-blue-400" },
    { label: "Active Projects", value: "12", icon: Target, color: "text-purple-400" },
    { label: "Total Generations", value: "2,847", icon: Zap, color: "text-green-400" },
    { label: "Team Level", value: "Pro", icon: Crown, color: "text-yellow-400" }
  ];

  const inviteUser = () => {
    toast.success("Invitation sent successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100">Team</h1>
            <p className="text-purple-300">Collaborate and manage your creative team</p>
          </div>
          <Button onClick={inviteUser} className="bg-gradient-purple">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamStats.map((stat, index) => (
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-purple-500/20">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12 bg-gradient-purple text-white">
                            {member.avatar}
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-slate-800`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-purple-100">{member.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {member.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-purple-400">{member.role}</p>
                          <p className="text-xs text-purple-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {member.permissions}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-purple-400">{member.projects} projects</p>
                        <p className="text-xs text-purple-500">{member.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Team Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamProjects.map((project, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-purple-100">{project.name}</h4>
                          <p className="text-sm text-purple-400">{project.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                            {project.status === 'completed' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-400">Progress</span>
                          <span className="text-purple-300">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-purple h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-purple-400">
                          <span>{project.members} members</span>
                          <span>Due: {project.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Permission Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-5 w-5 text-yellow-400" />
                        <h4 className="font-medium text-purple-100">Admin</h4>
                      </div>
                      <p className="text-sm text-purple-400">Full access to all features and settings</p>
                    </div>
                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <h4 className="font-medium text-purple-100">Editor</h4>
                      </div>
                      <p className="text-sm text-purple-400">Can create and edit projects</p>
                    </div>
                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-green-400" />
                        <h4 className="font-medium text-purple-100">Viewer</h4>
                      </div>
                      <p className="text-sm text-purple-400">Read-only access to projects</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
