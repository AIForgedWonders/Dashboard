import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Music, 
  Mic, 
  Play, 
  Pause,
  Volume2,
  Download,
  AudioWaveform,
  RadioIcon,
  Headphones,
  Star
} from "lucide-react";
import { generateAudioFromPrompt } from "@/lib/huggingface";

const audioTypes = [
  { id: "music", name: "Music Generation", icon: Music, description: "Create original music tracks" },
  { id: "voice", name: "Voice Synthesis", icon: Mic, description: "Generate natural voices" },
  { id: "sfx", name: "Sound Effects", icon: AudioWaveform, description: "Create sound effects" },
  { id: "podcast", name: "Podcast Intro", icon: RadioIcon, description: "Podcast intros & outros" },
];

export default function AudioSuite() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedType, setSelectedType] = useState("music");
  const [duration, setDuration] = useState([30]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setAudioUrl(null);
    setIsPlaying(false);
    try {
      let model = "facebook/musicgen-small";
      if (selectedType === "voice") model = "suno/bark";
      if (selectedType === "sfx") model = "facebook/musicgen-small"; // Replace with SFX model if available
      if (selectedType === "podcast") model = "facebook/musicgen-small"; // Replace with podcast/voice model if available
      const url = await generateAudioFromPrompt(prompt, model);
      if (url) {
        setAudioUrl(url);
        const audio = new Audio(url);
        setAudioObj(audio);
      } else {
        alert("Failed to generate audio. Try again.");
      }
    } catch (e) {
      alert("Error generating audio.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioObj) return;
    if (isPlaying) {
      audioObj.pause();
      setIsPlaying(false);
    } else {
      audioObj.play();
      setIsPlaying(true);
      audioObj.onended = () => setIsPlaying(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Audio Suite</h1>
            <p className="text-purple-300">Generate music, voices, and sound effects</p>
          </div>
          <Badge className="bg-gradient-purple text-white">
            <Headphones className="w-4 h-4 mr-1" />
            Studio Quality
          </Badge>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="bg-slate-800 border-purple-500/20">
            <TabsTrigger value="generate" className="data-[state=active]:bg-purple-600">
              <Music className="w-4 h-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="library" className="data-[state=active]:bg-purple-600">
              <AudioWaveform className="w-4 h-4 mr-2" />
              Library
            </TabsTrigger>
            <TabsTrigger value="studio" className="data-[state=active]:bg-purple-600">
              <AudioWaveform className="w-4 h-4 mr-2" />
              Studio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Audio Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {audioTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedType === type.id
                            ? "bg-purple-600/20 border border-purple-500/40"
                            : "bg-slate-700/50 hover:bg-slate-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <type.icon className="w-5 h-5 text-purple-400" />
                          <div>
                            <h3 className="text-white font-medium">{type.name}</h3>
                            <p className="text-purple-300 text-sm">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-purple-300 mb-2 block">
                        Duration (seconds)
                      </label>
                      <Slider
                        value={duration}
                        onValueChange={setDuration}
                        max={180}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-sm text-purple-300 mt-1">{duration[0]}s</div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-purple-300 mb-2 block">
                        Quality
                      </label>
                      <Input
                        value="High Fidelity"
                        className="bg-slate-700 border-purple-500/30 text-white"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-purple-300 mb-2 block">
                        Format
                      </label>
                      <Input
                        value="WAV / MP3"
                        className="bg-slate-700 border-purple-500/30 text-white"
                        readOnly
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Music className="w-5 h-5 mr-2 text-purple-400" />
                      Audio Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Describe the audio you want to create..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-slate-700 border-purple-500/30 text-white min-h-[120px]"
                    />
                    
                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">Generating audio...</span>
                          <span className="text-purple-300">{progress}%</span>
                        </div>
                        <Progress value={progress} className="bg-slate-700" />
                      </div>
                    )}

                    <Button
                      onClick={handleGenerate}
                      disabled={!prompt || isGenerating}
                      className="w-full bg-gradient-purple hover:opacity-90"
                    >
                      {isGenerating ? "Generating..." : "Generate Audio"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <AudioWaveform className="w-5 h-5 mr-2 text-purple-400" />
                      Audio Player
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-700/50 rounded-lg p-6">
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handlePlayPause}
                          className="border-purple-500/30 text-purple-300 rounded-full w-16 h-16"
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="h-2 bg-slate-600 rounded-full">
                          <div className="h-2 bg-gradient-purple rounded-full w-1/3"></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-purple-300">
                          <span>0:12</span>
                          <div className="flex items-center space-x-2">
                            <Volume2 className="w-4 h-4" />
                            <div className="w-20 h-1 bg-slate-600 rounded-full">
                              <div className="w-3/4 h-1 bg-purple-500 rounded-full"></div>
                            </div>
                          </div>
                          <span>0:30</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">Track {item}</h3>
                      <Badge className="bg-purple-600/20 text-purple-300">Music</Badge>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-center">
                        <Button variant="ghost" size="sm" className="text-purple-300">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-purple-300">
                      <span>0:30</span>
                      <Button variant="outline" size="sm" className="border-purple-500/30">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="studio">
            <Card className="bg-gradient-to-br from-slate-900/70 to-purple-900/60 border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <AudioWaveform className="w-8 h-8 text-purple-400 animate-pulse" />
                  Professional Audio Studio
                </CardTitle>
                <p className="text-purple-300 mt-2 text-lg">Advanced audio editing and mixing tools</p>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Timeline Ruler */}
                <div className="flex items-center gap-2 mb-6 mt-2">
                  {[0, 10, 20, 30, 40, 50, 60].map((sec) => (
                    <div key={sec} className="flex flex-col items-center w-16">
                      <span className="text-xs text-purple-400">{sec}s</span>
                      <div className="w-0.5 h-4 bg-purple-700/60 rounded-full" />
                    </div>
                  ))}
                </div>
                {/* Mocked Tracks */}
                <div className="space-y-4 mb-8">
                  {["Vocals", "Drums", "Bass", "Synth"].map((track, idx) => (
                    <div key={track} className="relative flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-4 group hover:bg-purple-700/10 transition-all">
                      <div className="w-24 flex items-center gap-2">
                        <span className="text-purple-200 font-semibold text-sm">{track}</span>
                        <Button size="icon" variant="ghost" className="text-purple-400 hover:text-purple-200">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-purple-400 hover:text-purple-200">
                          <Pause className="w-4 h-4" />
                        </Button>
                      </div>
                      {/* Mocked waveform */}
                      <div className="flex-1 h-10 bg-gradient-to-r from-purple-500/30 via-fuchsia-500/20 to-purple-900/30 rounded-lg overflow-hidden flex items-center">
                        <div className="w-full h-full flex items-center gap-1 px-2">
                          {[...Array(32)].map((_, i) => (
                            <div key={i} className={`h-${2 + (i % 8)} w-1 rounded bg-purple-400/70`} style={{ height: `${6 + (Math.sin(i + idx) * 8)}px` }} />
                          ))}
                        </div>
                      </div>
                      {/* Track Controls */}
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="icon" variant="ghost" className="text-purple-400 hover:text-purple-200">
                          <span className="sr-only">Mute</span>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-purple-400 hover:text-purple-200">
                          <span className="sr-only">Solo</span>
                          <Star className="w-4 h-4" />
                        </Button>
                        <input type="range" min="0" max="100" defaultValue="80" className="w-16 accent-purple-500" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Export/Download Button */}
                <div className="flex justify-end mt-8">
                  <Button className="bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white rounded-full shadow-lg px-10 py-4 text-lg font-bold transition-all duration-200 focus:ring-2 focus:ring-fuchsia-500/40">
                    <Download className="w-5 h-5 mr-2" />Export Mix
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
