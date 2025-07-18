
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star,
  Target,
  Zap,
  Crown,
  Award,
  Medal,
  Gem,
  Flame,
  Rocket,
  Users,
  Calendar
} from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "First Creation",
    description: "Create your first AI-generated asset",
    icon: Star,
    completed: true,
    rarity: "Common",
    points: 100,
    unlockedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Design Master",
    description: "Create 50 visual designs",
    icon: Crown,
    completed: true,
    rarity: "Rare",
    points: 500,
    unlockedAt: "2024-01-20"
  },
  {
    id: 3,
    title: "Speed Creator",
    description: "Generate 10 assets in one day",
    icon: Zap,
    completed: false,
    rarity: "Epic",
    points: 1000,
    progress: 6,
    total: 10
  },
  {
    id: 4,
    title: "Audio Virtuoso",
    description: "Create 25 audio tracks",
    icon: Award,
    completed: false,
    rarity: "Rare",
    points: 750,
    progress: 12,
    total: 25
  },
  {
    id: 5,
    title: "Content King",
    description: "Generate 100 text articles",
    icon: Trophy,
    completed: false,
    rarity: "Legendary",
    points: 2000,
    progress: 45,
    total: 100
  },
  {
    id: 6,
    title: "Community Helper",
    description: "Share 10 templates with community",
    icon: Users,
    completed: false,
    rarity: "Epic",
    points: 1500,
    progress: 3,
    total: 10
  }
];

const milestones = [
  { level: 1, title: "Novice Creator", xp: 0, completed: true },
  { level: 2, title: "Aspiring Artist", xp: 1000, completed: true },
  { level: 3, title: "Creative Professional", xp: 2500, completed: true },
  { level: 4, title: "Design Expert", xp: 5000, completed: false },
  { level: 5, title: "AI Master", xp: 10000, completed: false },
];

export default function Achievements() {
  const currentXP = 3200;
  const nextLevelXP = 5000;
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-600/20 text-gray-300";
      case "Rare": return "bg-blue-600/20 text-blue-300";
      case "Epic": return "bg-purple-600/20 text-purple-300";
      case "Legendary": return "bg-yellow-600/20 text-yellow-300";
      default: return "bg-gray-600/20 text-gray-300";
    }
  };

  const completedAchievements = achievements.filter(a => a.completed).length;
  const totalPoints = achievements.filter(a => a.completed).reduce((sum, a) => sum + a.points, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Achievements</h1>
            <p className="text-purple-300">Track your creative journey and milestones</p>
          </div>
          <Badge className="bg-gradient-purple text-white">
            <Trophy className="w-4 h-4 mr-1" />
            Level 3
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {completedAchievements}/{achievements.length}
              </div>
              <div className="text-purple-300 text-sm">Unlocked</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center">
                <Star className="w-5 h-5 mr-2 text-purple-400" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {totalPoints.toLocaleString()}
              </div>
              <div className="text-purple-300 text-sm">Achievement Points</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center">
                <Rocket className="w-5 h-5 mr-2 text-green-400" />
                Current Level
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-purple-300 text-sm">Creative Professional</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              Progress to Next Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-purple-300">XP Progress</span>
                <span className="text-white">{currentXP} / {nextLevelXP} XP</span>
              </div>
              <Progress value={progressPercentage} className="bg-slate-700" />
              <div className="text-sm text-purple-300">
                {nextLevelXP - currentXP} XP needed to reach Level 4
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="bg-slate-800 border-purple-500/20">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="milestones" className="data-[state=active]:bg-purple-600">
              <Medal className="w-4 h-4 mr-2" />
              Milestones
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">
              <Crown className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={achievement.id} className={`bg-slate-800/50 border-purple-500/20 ${
                    achievement.completed ? 'border-green-500/40' : ''
                  }`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <IconComponent className={`w-8 h-8 ${
                          achievement.completed ? 'text-yellow-400' : 'text-gray-500'
                        }`} />
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-white font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-purple-300 text-sm mb-3">{achievement.description}</p>
                      
                      {achievement.completed ? (
                        <div className="space-y-2">
                          <div className="flex items-center text-green-400 text-sm">
                            <Trophy className="w-4 h-4 mr-1" />
                            Completed
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-purple-300 text-sm">
                              Unlocked: {achievement.unlockedAt}
                            </span>
                            <Badge className="bg-yellow-600/20 text-yellow-300">
                              +{achievement.points} XP
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {achievement.progress !== undefined && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-purple-300">Progress</span>
                                <span className="text-white">
                                  {achievement.progress} / {achievement.total}
                                </span>
                              </div>
                              <Progress 
                                value={(achievement.progress! / achievement.total!) * 100} 
                                className="bg-slate-700" 
                              />
                            </div>
                          )}
                          <div className="text-right">
                            <Badge className="bg-purple-600/20 text-purple-300">
                              +{achievement.points} XP
                            </Badge>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <Card key={milestone.level} className={`bg-slate-800/50 border-purple-500/20 ${
                  milestone.completed ? 'border-green-500/40' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-600' : 'bg-slate-700'
                        }`}>
                          <span className="text-white font-bold">{milestone.level}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{milestone.title}</h3>
                          <p className="text-purple-300 text-sm">{milestone.xp} XP Required</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {milestone.completed ? (
                          <Badge className="bg-green-600/20 text-green-300">
                            <Trophy className="w-4 h-4 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-600/20 text-slate-300">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Global Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: "You", points: totalPoints, level: 3 },
                    { rank: 2, name: "CreativeAI_Pro", points: 4500, level: 4 },
                    { rank: 3, name: "DesignMaster", points: 4200, level: 4 },
                    { rank: 4, name: "ArtisticSoul", points: 3800, level: 3 },
                    { rank: 5, name: "ContentKing", points: 3500, level: 3 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          user.rank === 1 ? 'bg-yellow-600' : user.rank === 2 ? 'bg-gray-400' : user.rank === 3 ? 'bg-yellow-700' : 'bg-purple-600'
                        }`}>
                          <span className="text-white font-bold text-sm">#{user.rank}</span>
                        </div>
                        <div>
                          <span className={`font-medium ${user.name === 'You' ? 'text-purple-300' : 'text-white'}`}>
                            {user.name}
                          </span>
                          <div className="text-sm text-purple-300">Level {user.level}</div>
                        </div>
                      </div>
                      <div className="text-white font-medium">
                        {user.points.toLocaleString()} XP
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
