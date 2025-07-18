import { useRef, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Video, Scissors, Wand2, Download, Plus, Trash2, Music, Text, Layers, Play, Pause, UploadCloud, Library } from "lucide-react";

export default function VideoStudio() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [prompt, setPrompt] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleGenerate = () => {
    // Mocked AI video generation
    alert("[DEMO] AI Video generated from prompt: " + prompt);
  };

  const handleExport = () => {
    alert("[DEMO] Export/Download video feature coming soon!");
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-fuchsia-900 via-slate-900 to-purple-800 animate-gradient-move opacity-90" />
        <div className="relative z-10 space-y-8 px-4 md:px-8 pt-8 pb-16 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg flex items-center gap-3">
                <Video className="w-10 h-10 text-fuchsia-400 animate-bounce-slow" />
                Video Studio
              </h1>
              <p className="text-fuchsia-200 text-lg md:text-xl font-medium mt-2">Advanced AI Video Editor & Generator IDE</p>
            </div>
            <Badge className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg px-6 py-3 text-lg rounded-xl">
              <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
              AI Powered
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Asset/Media Library & AI Showcase */}
            <div className="col-span-1 space-y-8">
              <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl rounded-2xl p-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center text-xl gap-2">
                    <Library className="w-6 h-6 text-fuchsia-400" />
                    Media Library
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className="aspect-square bg-slate-800/60 rounded-lg flex items-center justify-center text-fuchsia-300 text-xs font-bold cursor-pointer hover:bg-fuchsia-700/30 transition-all shadow-md">{`Clip ${i}`}</div>
                    ))}
                  </div>
                  <label className="block mt-2 bg-fuchsia-700/30 text-fuchsia-200 px-4 py-3 rounded-xl cursor-pointer hover:bg-fuchsia-700/50 transition-all text-center font-semibold shadow">
                    <input type="file" accept="video/*,audio/*,image/*" className="hidden" />
                    + Add Media
                  </label>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl rounded-2xl p-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center text-xl gap-2">
                    <Wand2 className="w-6 h-6 text-fuchsia-400 animate-pulse" />
                    AI Showcase
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-fuchsia-200 text-base font-semibold">Try these AI-powered video ideas:</div>
                  <ul className="list-disc pl-5 text-fuchsia-100 space-y-1 text-sm">
                    <li>"A travel vlog with dynamic transitions"</li>
                    <li>"A product promo with animated text overlays"</li>
                    <li>"A music video with beat-synced effects"</li>
                    <li>"A cinematic intro with AI color grading"</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* Main Editor Area */}
            <div className="col-span-1 lg:col-span-3 flex flex-col gap-8 min-w-0 max-w-full">
              {/* AI Showcase Carousel/Grid */}
              <div className="mb-4">
                <div className="w-full overflow-x-hidden pb-2">
                  {/* Removed AI Video Idea cards and descriptions */}
                </div>
                {/* AI Prompt Area */}
                <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 flex flex-col gap-2">
                    <label htmlFor="ai-video-prompt" className="text-fuchsia-200 font-semibold mb-1 text-lg">Describe your video or select a template:</label>
                    <div className="flex gap-2 flex-wrap">
                      {["Travel Vlog", "Product Promo", "Music Video", "Cinematic Intro"].map((s, idx) => (
                        <button
                          key={s}
                          type="button"
                          className="px-5 py-2 rounded-full bg-fuchsia-700/30 text-fuchsia-200 text-sm font-semibold hover:bg-fuchsia-700/50 transition-all shadow"
                          onClick={() => setPrompt(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <Input
                      id="ai-video-prompt"
                      placeholder="e.g. A sunrise over the mountains with music"
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                      className="bg-slate-800/80 border-0 text-white rounded-full px-6 py-4 shadow-inner focus:ring-2 focus:ring-fuchsia-500/40 transition-all text-base mt-2"
                    />
                  </div>
                  <Button
                    onClick={handleGenerate}
                    className="bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white rounded-full shadow-lg px-10 py-4 text-xl font-bold transition-all duration-200 focus:ring-2 focus:ring-fuchsia-500/40 mt-4 md:mt-0"
                  >
                    <Sparkles className="w-6 h-6 mr-3 animate-pulse" />Generate Video
                  </Button>
                </div>
                {/* Demo Progress/Feedback */}
                {prompt && (
                  <div className="mt-6 flex items-center gap-4 animate-fade-in-slow">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center animate-spin-slow">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-fuchsia-200 text-base font-medium">Generating AI video for: <span className="font-bold">{prompt}</span> ...</span>
                  </div>
                )}
                {/* AI Features Highlight */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: <Wand2 className="w-7 h-7 text-fuchsia-400" />, label: "Auto-Edit" },
                    { icon: <Sparkles className="w-7 h-7 text-fuchsia-400" />, label: "Smart Effects" },
                    { icon: <Scissors className="w-7 h-7 text-fuchsia-400" />, label: "Scene Detection" },
                    { icon: <Download className="w-7 h-7 text-fuchsia-400" />, label: "1-Click Export" },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center justify-center bg-fuchsia-700/20 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:bg-fuchsia-700/30">
                      {f.icon}
                      <span className="text-fuchsia-200 text-sm md:text-base mt-3 font-semibold">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Video Preview & AI Suggestions */}
              <div className="flex flex-col md:flex-row gap-8 items-stretch">
                <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-fuchsia-500/10 bg-black/60 flex items-center justify-center">
                    {/* Mocked video preview */}
                    <Video className="w-24 h-24 text-fuchsia-700/40" />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6">
                      <Button className="bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white rounded-full shadow-lg px-8 py-4 text-xl font-bold">
                        <Play className="w-6 h-6" />
                      </Button>
                      <Button className="bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white rounded-full shadow-lg px-8 py-4 text-xl font-bold">
                        <Pause className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </div>
                {/* AI Suggestions */}
                <div className="w-full md:w-80 flex-shrink-0">
                  <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl rounded-2xl h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white flex items-center text-xl gap-2">
                        <Sparkles className="w-6 h-6 text-fuchsia-400 animate-pulse" />
                        AI Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-1">
                      <div className="text-fuchsia-200 text-base font-semibold">Smart edits and effects:</div>
                      <ul className="list-disc pl-5 text-fuchsia-100 space-y-1 text-sm">
                        <li>Auto-cut silences</li>
                        <li>AI color grading</li>
                        <li>Auto-captioning</li>
                        <li>Beat sync transitions</li>
                        <li>Remove background</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {/* Timeline Controls */}
              <div className="flex flex-wrap items-center gap-4 mb-4 justify-center md:justify-start">
                <Button size="sm" className="bg-fuchsia-700/40 text-fuchsia-200 rounded-xl px-4 py-2 text-base flex items-center gap-2"><Scissors className="w-5 h-5" />Cut</Button>
                <Button size="sm" className="bg-fuchsia-700/40 text-fuchsia-200 rounded-xl px-4 py-2 text-base flex items-center gap-2"><Trash2 className="w-5 h-5" />Delete</Button>
                <Button size="sm" className="bg-fuchsia-700/40 text-fuchsia-200 rounded-xl px-4 py-2 text-base flex items-center gap-2"><Wand2 className="w-5 h-5" />AI Effect</Button>
                <Button size="sm" className="bg-fuchsia-700/40 text-fuchsia-200 rounded-xl px-4 py-2 text-base flex items-center gap-2"><Text className="w-5 h-5" />Add Text</Button>
                <Button size="sm" className="bg-fuchsia-700/40 text-fuchsia-200 rounded-xl px-4 py-2 text-base flex items-center gap-2"><Music className="w-5 h-5" />Add Audio</Button>
                <div className="flex-1" />
                <Button size="sm" className="bg-fuchsia-700/40 text-fuchsia-200 rounded-xl px-4 py-2 text-base">-</Button>
                <span className="text-fuchsia-200 text-base font-semibold">Zoom</span>
                <Button size="sm" className="bg-fuchsia-700/40 text-fuchsia-200 rounded-xl px-4 py-2 text-base">+</Button>
              </div>
              {/* Multi-track Timeline (Mocked) */}
              <div className="w-full bg-gradient-to-r from-fuchsia-900/40 to-purple-900/30 rounded-2xl border border-fuchsia-500/10 shadow-inner p-4 overflow-x-hidden min-h-[160px] max-w-full flex flex-col gap-4">
                {/* Track labels */}
                <div className="flex flex-wrap gap-3 mb-3 w-full max-w-full">
                  <Badge className="bg-fuchsia-700/40 text-fuchsia-200 px-4 py-2 text-base flex items-center gap-2"><Video className="w-5 h-5" />Video</Badge>
                  <Badge className="bg-purple-700/40 text-purple-200 px-4 py-2 text-base flex items-center gap-2"><Music className="w-5 h-5" />Audio</Badge>
                  <Badge className="bg-blue-700/40 text-blue-200 px-4 py-2 text-base flex items-center gap-2"><Text className="w-5 h-5" />Text</Badge>
                  <Badge className="bg-green-700/40 text-green-200 px-4 py-2 text-base flex items-center gap-2"><Wand2 className="w-5 h-5" />Effects</Badge>
                </div>
                {/* Timeline grid (mocked clips) */}
                <div className="flex flex-col gap-3 w-full max-w-full">
                  {/* Video Track */}
                  <div className="flex flex-wrap gap-3 items-center w-full max-w-full">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-10 w-full max-w-[140px] bg-fuchsia-600/80 rounded-lg flex items-center justify-center text-white text-base font-bold cursor-pointer hover:bg-fuchsia-700/90 transition-all shadow">Video {i}</div>
                    ))}
                  </div>
                  {/* Audio Track */}
                  <div className="flex flex-wrap gap-3 items-center w-full max-w-full">
                    {[1,2].map(i => (
                      <div key={i} className="h-10 w-full max-w-[110px] bg-purple-600/80 rounded-lg flex items-center justify-center text-white text-base font-bold cursor-pointer hover:bg-purple-700/90 transition-all shadow">Audio {i}</div>
                    ))}
                  </div>
                  {/* Text Track */}
                  <div className="flex flex-wrap gap-3 items-center w-full max-w-full">
                    {[1].map(i => (
                      <div key={i} className="h-10 w-full max-w-[90px] bg-blue-600/80 rounded-lg flex items-center justify-center text-white text-base font-bold cursor-pointer hover:bg-blue-700/90 transition-all shadow">Text {i}</div>
                    ))}
                  </div>
                  {/* Effects Track */}
                  <div className="flex flex-wrap gap-3 items-center w-full max-w-full">
                    {[1].map(i => (
                      <div key={i} className="h-10 w-full max-w-[90px] bg-green-600/80 rounded-lg flex items-center justify-center text-white text-base font-bold cursor-pointer hover:bg-green-700/90 transition-all shadow">FX {i}</div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Export Button */}
              <div className="flex justify-end mt-8">
                <Button onClick={handleExport} className="bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white rounded-full shadow-lg px-12 py-4 text-xl font-bold transition-all duration-200 focus:ring-2 focus:ring-fuchsia-500/40">
                  <Download className="w-6 h-6 mr-3" />Export Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 12s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
      `}</style>
    </DashboardLayout>
  );
} 