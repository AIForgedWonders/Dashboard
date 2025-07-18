
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  Sparkles,
  MessageSquare,
  Lightbulb,
  Zap,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { useEffect } from "react";

const suggestions = [
  "How do I create a logo for my brand?",
  "What's the best way to generate social media content?",
  "Can you help me with color palette selection?",
  "How do I optimize my designs for different platforms?"
];

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState([
    {
      id: 1,
      type: "assistant",
      message: "Hello! I'm your AI assistant. I can help you with design creation, content generation, and creative workflows. What would you like to create today?",
      timestamp: "2 min ago"
    }
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = {
      id: Date.now(),
      type: "user",
      message,
      timestamp: "now"
    };
    setChat((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setMessage("");
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a helpful creative AI assistant." },
            ...chat.filter(m => m.type === "assistant" || m.type === "user").map(m => ({
              role: m.type === "user" ? "user" : "assistant",
              content: m.message
            })),
            { role: "user", content: message }
          ],
          max_tokens: 512,
        }),
      });
      const data = await response.json();
      const aiMsg = {
        id: Date.now() + 1,
        type: "assistant",
        message: data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.",
        timestamp: "now"
      };
      setChat((prev) => [...prev, aiMsg]);
    } catch (err) {
      setChat((prev) => [...prev, {
        id: Date.now() + 2,
        type: "assistant",
        message: "Sorry, there was an error contacting the AI.",
        timestamp: "now"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Responsive quick start suggestions
  const handleSuggestion = (suggestion: string) => {
    setMessage(suggestion);
    document.getElementById("ai-assistant-input")?.focus();
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-slate-900 to-purple-800 animate-gradient-move opacity-90" />
        <div className="relative z-10 space-y-8 px-2 md:px-0 pt-6 pb-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">AI Assistant</h1>
              <p className="text-purple-200 text-lg font-medium mt-1">Your creative companion for all projects</p>
            </div>
            <Badge className="bg-gradient-purple text-white shadow-md">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              AI Powered
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl rounded-3xl h-[650px] flex flex-col overflow-hidden">
                <CardHeader className="flex-shrink-0 border-b border-purple-500/10 bg-gradient-to-r from-purple-900/40 to-slate-900/10 rounded-t-3xl">
                  <CardTitle className="text-white flex items-center gap-2 text-2xl font-bold">
                    <Bot className="w-6 h-6 text-purple-400 animate-bounce-slow" />
                    Chat Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  <div className="flex flex-col h-full flex-1">
                    <ScrollArea className="flex-1 px-6 py-2 overflow-y-auto">
                      <div className="flex flex-col justify-end min-h-full space-y-6 py-2">
                        {chat.map((chatMsg, idx) => (
                          <div
                            key={chatMsg.id}
                            className={`flex ${chatMsg.type === 'user' ? 'justify-end' : 'justify-start'} w-full transition-all duration-300 animate-fade-in`}
                          >
                            <div className={`max-w-[80%] ${chatMsg.type === 'user' ? 'order-2' : 'order-1'}`}>
                              <div className={`flex items-end space-x-2 ${chatMsg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${chatMsg.type === 'user' ? 'bg-gradient-to-br from-purple-600 to-fuchsia-500' : 'bg-slate-800/80'}`}>
                                  {chatMsg.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-purple-400" />}
                                </div>
                                <div className={`rounded-2xl px-5 py-4 shadow-xl border border-purple-500/10 ${chatMsg.type === 'user' ? 'bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white' : 'bg-white/10 text-purple-100'} max-w-full w-fit animate-bubble-pop`}
                                  style={{ wordBreak: 'break-word', overflowX: 'auto' }}>
                                  <p className="whitespace-pre-line break-words overflow-x-auto text-base leading-relaxed">{chatMsg.message}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs opacity-70 font-mono">{chatMsg.timestamp}</span>
                                    {chatMsg.type === 'assistant' && (
                                      <div className="flex space-x-1">
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-purple-700/20 transition-colors">
                                          <ThumbsUp className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-purple-700/20 transition-colors">
                                          <ThumbsDown className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-purple-700/20 transition-colors">
                                          <Copy className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start animate-fade-in">
                            <div className="flex items-end space-x-2">
                              <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shadow-lg">
                                <Bot className="w-5 h-5 text-purple-400 animate-bounce" />
                              </div>
                              <div className="bg-white/10 rounded-2xl px-5 py-4 shadow-xl border border-purple-500/10">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="flex-shrink-0 p-5 border-t border-purple-500/10 bg-gradient-to-r from-purple-900/30 to-slate-900/10 rounded-b-3xl">
                    <div className="flex space-x-3 items-center">
                      <Input
                        id="ai-assistant-input"
                        placeholder="Ask me anything about your creative projects..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-slate-800/80 border-0 text-white rounded-full px-5 py-3 shadow-inner focus:ring-2 focus:ring-purple-500/40 transition-all text-base"
                      />
                      <Button
                        onClick={handleSend}
                        className="bg-gradient-to-br from-purple-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-600 text-white rounded-full shadow-lg px-5 py-3 text-lg font-bold transition-all duration-200 focus:ring-2 focus:ring-purple-500/40"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-xl rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-xl gap-2">
                    <Lightbulb className="w-6 h-6 text-purple-400 animate-pulse" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left border-purple-500/30 text-purple-300 hover:bg-gradient-to-r hover:from-purple-700/30 hover:to-fuchsia-600/20 hover:text-white justify-start h-auto p-4 whitespace-normal break-words rounded-xl shadow-sm transition-all duration-200"
                      onClick={() => handleSuggestion(suggestion)}
                    >
                      <MessageSquare className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="text-base whitespace-normal break-words">{suggestion}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-xl rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-xl gap-2">
                    <Zap className="w-6 h-6 text-purple-400 animate-pulse" />
                    AI Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-purple-300 text-base">Design guidance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-purple-300 text-base">Content creation tips</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-purple-300 text-base">Workflow optimization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-purple-300 text-base">Technical support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-purple-300 text-base">Creative inspiration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-xl rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Usage Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-300 text-base">Questions today</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300 text-base">Total conversations</span>
                      <span className="text-white font-semibold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300 text-base">Helpful responses</span>
                      <span className="text-white font-semibold">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
          .animate-fade-in {
            animation: fadeIn 0.7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
          }
          .animate-bubble-pop {
            animation: bubblePop 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes bubblePop {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
}
