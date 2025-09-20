import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { OnboardingModal } from "@/components/ui/onboarding/OnboardingModal";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Brain,
  Plus,
  ArrowRight,
  Zap
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show onboarding for new users (simulate)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingClose = (open: boolean) => {
    if (!open) {
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
    setShowOnboarding(open);
  };

  const stats = [
    {
      title: "Overall Accuracy",
      value: "84%",
      change: "+5%",
      icon: Target,
      color: "text-success",
      bgColor: "bg-success-light",
    },
    {
      title: "Study Streak",
      value: "12 days",
      change: "+2 days",
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning-light",
    },
    {
      title: "Quizzes Completed",
      value: "47",
      change: "+8 this week",
      icon: Trophy,
      color: "text-primary",
      bgColor: "bg-primary-light",
    },
    {
      title: "Study Time",
      value: "24h 32m",
      change: "+3h 15m",
      icon: Clock,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ];

  const recentCourses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      progress: 78,
      lastStudied: "2 hours ago",
      totalQuizzes: 12,
      accuracy: 87,
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      progress: 45,
      lastStudied: "1 day ago",
      totalQuizzes: 8,
      accuracy: 92,
    },
    {
      id: 3,
      name: "Biology: Cell Structure",
      progress: 92,
      lastStudied: "3 hours ago",
      totalQuizzes: 15,
      accuracy: 79,
    },
  ];

  const weakConcepts = [
    "Calculus: Integration by Parts",
    "Data Structures: Binary Trees",
    "Biology: Mitochondria Functions",
  ];

  return (
    <div className="container py-8">
      <OnboardingModal open={showOnboarding} onOpenChange={handleOnboardingClose} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-muted-foreground">
          You're doing great! Keep up the momentum with your studies.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover shadow-sm border-0 bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`h-10 w-10 rounded-xl ${stat.bgColor} flex items-center justify-center shadow-xs`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-success font-medium">{stat.change}</span> from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <Card className="card-hover shadow-md border-0 bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Courses</CardTitle>
                <CardDescription className="text-muted-foreground">Continue where you left off</CardDescription>
              </div>
              <Button asChild size="sm" variant="outline" className="border-primary/20 hover:bg-primary/5">
                <NavLink to="/courses">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-5 border-0 bg-background/50 rounded-xl shadow-xs hover:shadow-sm transition-all duration-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg">{course.name}</h3>
                      <Badge variant="secondary" className={`text-xs px-3 py-1 ${
                        course.accuracy >= 90 ? 'bg-success-soft text-success' :
                        course.accuracy >= 80 ? 'bg-info-soft text-info' :
                        'bg-warning-soft text-warning'
                      }`}>
                        {course.accuracy}% accuracy
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{course.totalQuizzes} quizzes</span>
                      <span>•</span>
                      <span>Last studied {course.lastStudied}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-secondary/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary transition-all duration-300 ease-out rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">{course.progress}%</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-6 bg-primary/5 hover:bg-primary/10 text-primary">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Weak Concepts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="card-hover shadow-md border-0 bg-gradient-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
              <CardDescription>Get started with your learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full h-12 btn-primary shadow-lg hover:shadow-xl">
                <NavLink to="/courses/new">
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Course
                </NavLink>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 border-primary/20 hover:bg-primary/5 hover:border-primary/30">
                <NavLink to="/quiz/create">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Create Quiz
                </NavLink>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 border-success/20 hover:bg-success/5 hover:border-success/30 text-success">
                <NavLink to="/learning">
                  <Brain className="mr-2 h-5 w-5" />
                  Practice Weak Areas
                </NavLink>
              </Button>
            </CardContent>
          </Card>

          {/* Concepts to Review */}
          <Card className="card-hover shadow-md border-0 bg-gradient-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                <div className="h-8 w-8 bg-warning-light rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-warning" />
                </div>
                Concepts to Review
              </CardTitle>
              <CardDescription>Areas where you can improve</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {weakConcepts.map((concept, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-warning-soft/30 rounded-xl border border-warning/10 hover:bg-warning-soft/50 transition-colors">
                  <span className="text-sm font-medium text-foreground">{concept}</span>
                  <Button variant="ghost" size="sm" className="text-warning hover:bg-warning/10 hover:text-warning">
                    Review
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}