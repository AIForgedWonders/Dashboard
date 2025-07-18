
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wand2, Copy, Download, RefreshCw, BookOpen, PenTool, MessageSquare, Mail, Newspaper } from "lucide-react";

const contentTypes = [
  { id: "blog", name: "Blog Post", icon: BookOpen, description: "Engaging articles and posts", system: "You are an expert blog writer. Write a high-quality blog post." },
  { id: "social", name: "Social Media", icon: MessageSquare, description: "Captions and posts", system: "You are a social media expert. Write a catchy social media post or caption." },
  { id: "email", name: "Email Copy", icon: Mail, description: "Marketing emails", system: "You are a professional email copywriter. Write a compelling marketing email." },
  { id: "article", name: "Article", icon: Newspaper, description: "Long-form content", system: "You are a skilled journalist. Write a detailed article." },
  { id: "copy", name: "Ad Copy", icon: PenTool, description: "Persuasive advertising", system: "You are an advertising expert. Write persuasive ad copy." },
];

export default function TextGeneration() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("blog");

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const systemPrompt = contentTypes.find(t => t.id === selectedType)?.system || "You are a helpful AI assistant.";
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          max_tokens: 512,
        }),
      });
      if (!response.ok) throw new Error("Failed to generate text");
      const data = await response.json();
      setResult(data.choices?.[0]?.message?.content || "No result");
    } catch (err) {
      setError("Error generating text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Text Generation</h1>
            <p className="text-purple-300">Create compelling content with AI</p>
          </div>
          <Badge className="bg-gradient-purple text-white">
            <Wand2 className="w-4 h-4 mr-1" />
            AI Powered
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Content Type Selection */}
          <div className="space-y-6 md:col-span-1">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Content Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contentTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3 ${
                      selectedType === type.id
                        ? "bg-purple-600/20 border border-purple-500/40"
                        : "bg-slate-700/50 hover:bg-slate-700"
                    }`}
                  >
                    <type.icon className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="text-white font-medium">{type.name}</h3>
                      <p className="text-purple-300 text-sm">{type.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Prompt and Result */}
          <div className="space-y-6 md:col-span-2">
            <Card className="bg-slate-800/50 border-purple-500/20 rounded-2xl shadow-xl p-6">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {contentTypes.find(t => t.id === selectedType)?.name || "Generate Text"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder={`Enter your ${contentTypes.find(t => t.id === selectedType)?.name?.toLowerCase() || "prompt"} here...`}
                    className="min-h-[80px]"
                    disabled={loading}
                  />
                  <Button onClick={handleGenerate} disabled={loading || !prompt} className="bg-gradient-purple w-full text-white font-semibold shadow-lg text-lg py-3">
                    {loading ? <RefreshCw className="animate-spin mr-2 h-4 w-4" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate
                  </Button>
                  {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
                  {result && (
                    <div className="mt-4 max-h-72 md:max-h-80 overflow-y-auto p-4 bg-slate-900/80 rounded-xl border border-purple-700/30 text-purple-100 whitespace-pre-line shadow-inner transition-all duration-300">
                      {result}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
