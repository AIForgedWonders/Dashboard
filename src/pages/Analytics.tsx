
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Target, 
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Star,
  Eye,
  MousePointer,
  Share2
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const overviewStats = [
    { label: "Total Projects", value: "247", change: "+12%", icon: Target, color: "text-blue-400" },
    { label: "AI Generations", value: "15,247", change: "+23%", icon: Zap, color: "text-purple-400" },
    { label: "Active Users", value: "1,847", change: "+8%", icon: Users, color: "text-green-400" },
    { label: "Success Rate", value: "98.2%", change: "+2.1%", icon: TrendingUp, color: "text-yellow-400" }
  ];

  const generationData = [
    { month: 'Jan', visual: 450, text: 320, audio: 180, total: 950 },
    { month: 'Feb', visual: 520, text: 380, audio: 220, total: 1120 },
    { month: 'Mar', visual: 680, text: 450, audio: 280, total: 1410 },
    { month: 'Apr', visual: 780, text: 520, audio: 340, total: 1640 },
    { month: 'May', visual: 920, text: 680, audio: 420, total: 2020 },
    { month: 'Jun', visual: 1150, text: 780, audio: 520, total: 2450 }
  ];

  const usageData = [
    { name: 'Visual Creator', value: 45, color: '#7c3aed' },
    { name: 'Text Generation', value: 30, color: '#a855f7' },
    { name: 'Audio Suite', value: 15, color: '#c084fc' },
    { name: '3D Viewer', value: 10, color: '#e879f9' }
  ];

  const performanceData = [
    { metric: 'Avg Response Time', value: '1.2s', trend: 'down', percentage: '15%' },
    { metric: 'Success Rate', value: '98.2%', trend: 'up', percentage: '2.1%' },
    { metric: 'User Satisfaction', value: '4.8/5', trend: 'up', percentage: '5%' },
    { metric: 'Uptime', value: '99.9%', trend: 'stable', percentage: '0%' }
  ];

  const topProjects = [
    { name: "Brand Identity Kit", type: "Visual", views: 1247, shares: 45, rating: 4.9 },
    { name: "Marketing Campaign", type: "Text", views: 987, shares: 38, rating: 4.7 },
    { name: "Product Demo Video", type: "3D", views: 756, shares: 29, rating: 4.8 },
    { name: "Podcast Intro", type: "Audio", views: 543, shares: 22, rating: 4.6 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100">Analytics</h1>
            <p className="text-purple-300">Track your creative performance and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-600/20 text-purple-300">
              <Calendar className="mr-1 h-3 w-3" />
              Last 30 days
            </Badge>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-purple rounded-lg text-white text-sm hover:opacity-90 transition-opacity">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <Badge className={`${stat.change.startsWith('+') ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-purple-100 mb-1">{stat.value}</div>
                <div className="text-sm text-purple-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-purple-500/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Generation Trends */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Generation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #7c3aed',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="visual" stackId="1" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="text" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="audio" stackId="1" stroke="#c084fc" fill="#c084fc" fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Usage Distribution */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Usage Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={usageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {usageData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-purple-300">{item.name}</span>
                        </div>
                        <span className="text-sm text-purple-200">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <h4 className="font-medium text-purple-100">{metric.metric}</h4>
                          <p className="text-2xl font-bold text-purple-200 mt-1">{metric.value}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${
                            metric.trend === 'up' ? 'bg-green-600/20 text-green-400' :
                            metric.trend === 'down' ? 'bg-red-600/20 text-red-400' :
                            'bg-gray-600/20 text-gray-400'
                          }`}>
                            {metric.percentage}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Daily Usage Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #7c3aed' }} />
                      <Line type="monotone" dataKey="total" stroke="#7c3aed" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={generationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #7c3aed' }} />
                      <Bar dataKey="total" fill="#7c3aed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Top Performing Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-100">{project.name}</h4>
                          <p className="text-sm text-purple-400">{project.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1 text-purple-300">
                          <Eye className="h-4 w-4" />
                          {project.views}
                        </div>
                        <div className="flex items-center gap-1 text-purple-300">
                          <Share2 className="h-4 w-4" />
                          {project.shares}
                        </div>
                        <div className="flex items-center gap-1 text-purple-300">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {project.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
