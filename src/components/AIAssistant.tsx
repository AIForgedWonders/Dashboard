
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Lightbulb, Zap } from "lucide-react";

interface Message {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  "Create a logo for my startup",
  "Generate 3D product mockup",
  "Write marketing copy",
  "Compose background music",
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "👋 Hi! I'm your AI assistant. How can I help you create something amazing today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me suggest some creative options based on your request.",
        "Great idea! I'll guide you through the process step by step.",
        "Perfect! I can generate several variations for you to choose from.",
        "Excellent choice! Let's create something unique together.",
      ];

      const aiMessage: Message = {
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="bg-slate-800/50 border-purple-500/20 h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-200">
          <div className="p-2 bg-gradient-purple rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          AI Creative Assistant
          <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.type === "user"
                    ? "bg-gradient-purple text-white"
                    : "bg-slate-700 text-purple-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-purple-100 p-3 rounded-lg">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestion(suggestion)}
              className="text-xs bg-purple-900/30 border-purple-500/30 text-purple-300 hover:bg-purple-800/40"
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              {suggestion}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about creating content..."
            className="bg-slate-700 border-purple-500/30 text-purple-100 placeholder:text-purple-400"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-purple hover:from-purple-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
