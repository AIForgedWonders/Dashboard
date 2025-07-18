
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Zap, Clock } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ElementType;
}

const stats: Stat[] = [
  {
    label: "Assets Generated",
    value: "2,847",
    change: 12.5,
    trend: "up",
    icon: Zap,
  },
  {
    label: "Active Projects",
    value: "23",
    change: -2.1,
    trend: "down",
    icon: Clock,
  },
  {
    label: "Team Collaboration",
    value: "8.4k",
    change: 18.2,
    trend: "up",
    icon: TrendingUp,
  },
];

export function StatsWidget() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-slate-800/50 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">
              {stat.label}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-100 mb-1">
              {stat.value}
            </div>
            <div className="flex items-center gap-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <Badge
                variant="outline"
                className={`text-xs ${
                  stat.trend === "up"
                    ? "border-green-500/30 text-green-400"
                    : "border-red-500/30 text-red-400"
                }`}
              >
                {stat.change > 0 ? "+" : ""}{stat.change}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
