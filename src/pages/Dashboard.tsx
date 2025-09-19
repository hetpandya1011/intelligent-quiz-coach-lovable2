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
          <Card key={stat.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.change}</span> from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Courses</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </div>
              <Button asChild size="sm">
                <NavLink to="/courses">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{course.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {course.accuracy}% accuracy
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>{course.totalQuizzes} quizzes</span>
                      <span>•</span>
                      <span>Last studied {course.lastStudied}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-4">
                    Continue
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Weak Concepts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full bg-gradient-primary">
                <NavLink to="/courses/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Course
                </NavLink>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <NavLink to="/quiz/create">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Quiz
                </NavLink>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <NavLink to="/learning">
                  <Brain className="mr-2 h-4 w-4" />
                  Practice Weak Areas
                </NavLink>
              </Button>
            </CardContent>
          </Card>

          {/* Concepts to Review */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-warning" />
                Concepts to Review
              </CardTitle>
              <CardDescription>Areas where you can improve</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {weakConcepts.map((concept, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-warning-light rounded-md">
                  <span className="text-sm font-medium">{concept}</span>
                  <Button variant="ghost" size="sm">
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