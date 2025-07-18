
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VisualCreator from "./pages/VisualCreator";
import TextGeneration from "./pages/TextGeneration";
import AudioSuite from "./pages/AudioSuite";
import TemplateLibrary from "./pages/TemplateLibrary";
import AIAssistant from "./pages/AIAssistant";
import ProjectHistory from "./pages/ProjectHistory";
import Achievements from "./pages/Achievements";
import DesignCanvas from "./pages/DesignCanvas";
import ColorPalette from "./pages/ColorPalette";
import LogoStudio from "./pages/LogoStudio";
import Advanced3DViewer from "./pages/Advanced3DViewer";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Upgrade from "./pages/Upgrade";
import Analytics from "./pages/Analytics";
import Gallery from "./pages/Gallery";
import VideoStudio from "./pages/VideoStudio";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null; // or a spinner
  if (!user) {
    window.location.href = "/login";
    return null;
  }
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/visual" element={<ProtectedRoute><VisualCreator /></ProtectedRoute>} />
          <Route path="/text" element={<ProtectedRoute><TextGeneration /></ProtectedRoute>} />
          <Route path="/audio" element={<ProtectedRoute><AudioSuite /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><TemplateLibrary /></ProtectedRoute>} />
          <Route path="/logo-studio" element={<ProtectedRoute><LogoStudio /></ProtectedRoute>} />
          <Route path="/design-canvas" element={<ProtectedRoute><DesignCanvas /></ProtectedRoute>} />
          <Route path="/color-palette" element={<ProtectedRoute><ColorPalette /></ProtectedRoute>} />
          <Route path="/advanced-3d-viewer" element={<ProtectedRoute><Advanced3DViewer /></ProtectedRoute>} />
          <Route path="/assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><ProjectHistory /></ProtectedRoute>} />
          <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="/video-studio" element={<ProtectedRoute><VideoStudio /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
