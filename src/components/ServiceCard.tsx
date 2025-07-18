
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  isNew?: boolean;
  isPro?: boolean;
  progress?: number;
  onClick?: () => void;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  features,
  isNew = false,
  isPro = false,
  progress,
  onClick,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`group relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-300 cursor-pointer ${
        isHovered ? "scale-105 shadow-2xl glow-purple" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="p-3 bg-gradient-purple rounded-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30">
                New
              </Badge>
            )}
            {isPro && (
              <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
                Pro
              </Badge>
            )}
          </div>
        </div>
        
        <CardTitle className="text-purple-200 group-hover:text-purple-100 transition-colors">
          {title}
        </CardTitle>
        <p className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
          {description}
        </p>
      </CardHeader>

      <CardContent className="relative">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-purple-900/30 border-purple-500/30 text-purple-300"
              >
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-purple-900/30 border-purple-500/30 text-purple-300"
              >
                +{features.length - 3} more
              </Badge>
            )}
          </div>

          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-purple-400">
                <span>Generation Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-slate-700"
              />
            </div>
          )}

          <Button
            className="w-full bg-gradient-purple hover:from-purple-600 hover:to-purple-700 text-white font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Launch {title}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
