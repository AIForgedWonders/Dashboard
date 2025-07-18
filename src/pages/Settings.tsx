
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Zap,
  Download,
  Upload,
  Monitor,
  Moon,
  Sun,
  Volume2,
  Wifi,
  Database,
  Key,
  Eye,
  Lock,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showActivity: true,
    allowMessages: true,
    dataCollection: false
  });
  const [quality, setQuality] = useState([80]);
  const [volume, setVolume] = useState([75]);

  const saveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-100">Settings</h1>
            <p className="text-purple-300">Customize your AiForged experience</p>
          </div>
          <Button onClick={saveSettings} className="bg-gradient-purple">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-purple-500/20">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alex Johnson"
                      className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">Email</label>
                    <input 
                      type="email" 
                      defaultValue="alex@example.com"
                      className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">Bio</label>
                    <textarea 
                      defaultValue="Creative Director & AI Enthusiast"
                      className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200 h-20"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    AI Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">Default AI Model</label>
                    <select className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200">
                      <option>GPT-4 Turbo</option>
                      <option>Claude 3.5</option>
                      <option>Gemini Pro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">Generation Quality: {quality[0]}%</label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Auto-save projects</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Smart suggestions</span>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-purple-300">Color Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-gradient-purple rounded-lg border-2 border-purple-500 cursor-pointer">
                        <div className="text-center text-white text-xs">Purple</div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg border-2 border-transparent cursor-pointer hover:border-blue-500">
                        <div className="text-center text-white text-xs">Blue</div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-600 to-green-800 rounded-lg border-2 border-transparent cursor-pointer hover:border-green-500">
                        <div className="text-center text-white text-xs">Green</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Dark mode</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">High contrast</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Reduced motion</span>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Interface Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">Sidebar width</label>
                    <select className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200">
                      <option>Compact</option>
                      <option>Normal</option>
                      <option>Wide</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">Font size</label>
                    <select className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200">
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Show tooltips</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Auto-collapse sidebar</span>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Email notifications</h4>
                      <p className="text-sm text-purple-400">Receive updates via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Push notifications</h4>
                      <p className="text-sm text-purple-400">Real-time browser notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Desktop notifications</h4>
                      <p className="text-sm text-purple-400">System notifications on desktop</p>
                    </div>
                    <Switch 
                      checked={notifications.desktop}
                      onCheckedChange={(checked) => setNotifications({...notifications, desktop: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Marketing emails</h4>
                      <p className="text-sm text-purple-400">Product updates and tips</p>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Public profile</h4>
                      <p className="text-sm text-purple-400">Make your profile visible to others</p>
                    </div>
                    <Switch 
                      checked={privacy.profilePublic}
                      onCheckedChange={(checked) => setPrivacy({...privacy, profilePublic: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Show activity</h4>
                      <p className="text-sm text-purple-400">Display your recent activity</p>
                    </div>
                    <Switch 
                      checked={privacy.showActivity}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showActivity: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Allow messages</h4>
                      <p className="text-sm text-purple-400">Let others send you messages</p>
                    </div>
                    <Switch 
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-200">Data collection</h4>
                      <p className="text-sm text-purple-400">Allow analytics data collection</p>
                    </div>
                    <Switch 
                      checked={privacy.dataCollection}
                      onCheckedChange={(checked) => setPrivacy({...privacy, dataCollection: checked})}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-purple-500/20">
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-purple-500/30">
                      <Key className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="border-purple-500/30">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Storage & Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-300">Storage used</span>
                      <span className="text-sm text-purple-200">8.4 GB / 100 GB</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-gradient-purple h-2 rounded-full" style={{ width: '8.4%' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Auto-optimize storage</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Cache enabled</span>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline" className="w-full border-purple-500/30">
                    Clear Cache
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    API & Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-300">API Rate Limit</label>
                    <select className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-md text-purple-200">
                      <option>Standard (1000/hour)</option>
                      <option>Pro (5000/hour)</option>
                      <option>Enterprise (Unlimited)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">API access enabled</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">Webhook notifications</span>
                    <Switch />
                  </div>
                  <Button variant="outline" className="w-full border-purple-500/30">
                    <Key className="mr-2 h-4 w-4" />
                    Generate API Key
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
