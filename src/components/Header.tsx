
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  MessageSquare,
  Mic,
  MicOff,
  User,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export function Header() {
  const [isListening, setIsListening] = useState(false);
  const [notifications] = useState(3);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const toggleVoiceCommand = () => {
    setIsListening(!isListening);
    // Mock voice command toggle
    if (!isListening) {
      console.log("Voice commands activated");
    } else {
      console.log("Voice commands deactivated");
    }
  };

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
    <header className="h-16 border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-purple-300 hover:text-purple-200" />
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
          <Input
            placeholder="Search projects, templates, assets..."
            className="pl-10 pr-4 w-64 lg:w-80 bg-slate-800/50 border-purple-500/30 focus:border-purple-500/60 text-purple-100 placeholder:text-purple-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Voice Command Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleVoiceCommand}
          className={`relative p-2 rounded-full transition-all duration-200 ${
            isListening 
              ? "bg-purple-600/20 text-purple-300 animate-pulse-glow" 
              : "text-purple-400 hover:text-purple-300 hover:bg-purple-600/10"
          }`}
        >
          {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          {isListening && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>

        {/* AI Assistant */}
        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-2">
          <MessageSquare className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative text-purple-400 hover:text-purple-300 p-2" asChild>
          <Link to="/notifications">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {notifications}
              </Badge>
            )}
          </Link>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 ring-2 ring-purple-500/30">
                {user && user.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName || user.email || "User"} />
                ) : (
                  <AvatarImage src="/avatar.jpg" alt="Default Avatar" />
                )}
                <AvatarFallback className="bg-gradient-purple text-white text-lg font-bold flex items-center justify-center">
                  {user ? (user.displayName ? user.displayName[0] : (user.email ? user.email[0] : "U")) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 bg-slate-800 border-purple-500/30" 
            align="end" 
            forceMount
          >
            <div className="flex items-center justify-start gap-2 p-2">
              <Avatar className="h-10 w-10 ring-2 ring-purple-500/30">
                {user && user.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName || user.email || "User"} />
                ) : (
                  <AvatarImage src="/avatar.jpg" alt="Default Avatar" />
                )}
                <AvatarFallback className="bg-gradient-purple text-white text-xl font-bold flex items-center justify-center">
                  {user ? (user.displayName ? user.displayName[0] : (user.email ? user.email[0] : "U")) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-purple-200">{user ? (user.displayName || "User") : "User"}</p>
                <p className="w-[200px] truncate text-sm text-purple-400">
                  {user ? user.email : ""}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-purple-500/20" />
            <DropdownMenuItem asChild className="text-purple-200 hover:bg-purple-600/20">
              <Link to="/profile" className="flex items-center gap-2 w-full">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-purple-200 hover:bg-purple-600/20">
              <Link to="/settings" className="flex items-center gap-2 w-full">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-purple-200 hover:bg-purple-600/20">
              <Link to="/notifications" className="flex items-center gap-2 w-full">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-purple-200 hover:bg-purple-600/20">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-purple-500/20" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-600/20" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
