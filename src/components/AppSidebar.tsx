
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Palette,
  FileText,
  Music,
  Library,
  Home,
  Settings,
  User,
  Crown,
  Zap,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  History,
  Paintbrush,
  Box,
  Image,
  LogOut,
  Video, // Added Video icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Visual Creator", url: "/visual", icon: Palette },
  { title: "Text Generation", url: "/text", icon: FileText },
  { title: "Audio Suite", url: "/audio", icon: Music },
  { title: "Template Library", url: "/templates", icon: Library },
  { title: "Gallery", url: "/gallery", icon: Image },
];

const studioItems = [
  { title: "Logo Studio", url: "/logo-studio", icon: Target },
  { title: "Design Canvas", url: "/design-canvas", icon: Paintbrush },
  { title: "Color Palette", url: "/color-palette", icon: Palette },
  { title: "Advanced 3D Viewer", url: "/advanced-3d-viewer", icon: Box },
  { title: "Video Studio", url: "/video-studio", icon: Video },
];

const toolsItems = [
  { title: "AI Assistant", url: "/assistant", icon: Sparkles },
  { title: "Project History", url: "/history", icon: History },
  { title: "Achievements", url: "/achievements", icon: Crown },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Team", url: "/team", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Upgrade", url: "/upgrade", icon: Zap },
];

interface AppSidebarProps {
  sidebarScrollRef?: React.RefObject<HTMLDivElement>;
}

export function AppSidebar({ sidebarScrollRef }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-purple-600/20 to-purple-500/20 text-purple-300 border-r-2 border-purple-500 font-medium" 
      : "hover:bg-purple-600/10 hover:text-purple-300 transition-all duration-200";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-purple-500/20`}>
      <SidebarContent ref={sidebarScrollRef} className="bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Logo Section */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="flex items-center justify-center w-full">
            <img src="/logo.png" alt="Logo" className="w-50 h-200 object-contain mx-auto" />
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400 text-xs uppercase tracking-wider">
            {!collapsed ? "Services" : "S"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      data-active={isActive(item.url)}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Studios Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400 text-xs uppercase tracking-wider">
            {!collapsed ? "Studios" : "ST"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studioItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      data-active={isActive(item.url)}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400 text-xs uppercase tracking-wider">
            {!collapsed ? "Tools" : "T"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      data-active={isActive(item.url)}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400 text-xs uppercase tracking-wider">
            {!collapsed ? "Account" : "A"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      data-active={isActive(item.url)}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-full text-white font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex items-center justify-center gap-2 shadow-md" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
