import { useSearchParams, NavLink, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  Brain,
  RefreshCw,
  Home,
  Share,
  BookOpen,
  ArrowRight
} from "lucide-react";

export default function QuizResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const score = parseInt(searchParams.get('score') || '0');
  const correct = parseInt(searchParams.get('correct') || '0');
  const total = parseInt(searchParams.get('total') || '0');
  const time = parseInt(searchParams.get('time') || '0');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-success-light', text: 'text-success', icon: Trophy };
    if (score >= 70) return { bg: 'bg-primary-light', text: 'text-primary', icon: Target };
    return { bg: 'bg-warning-light', text: 'text-warning', icon: TrendingUp };
  };

  const scoreStyle = getScoreColor(score);
  const ScoreIcon = scoreStyle.icon;

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { title: "Excellent Work!", message: "You've mastered this topic! Keep up the great work." };
    if (score >= 70) return { title: "Good Job!", message: "You're doing well. Review the areas below to improve further." };
    return { title: "Keep Learning!", message: "Don't worry, practice makes perfect. Focus on the concepts below." };
  };

  const performance = getPerformanceMessage(score);

  // Mock weak concepts data
  const weakConcepts = [
    { topic: "Chain Rule Applications", accuracy: 60, priority: "high" },
    { topic: "Integration by Parts", accuracy: 75, priority: "medium" },
    { topic: "Trigonometric Derivatives", accuracy: 45, priority: "high" }
  ];

  const recommendations = [
    "Review chain rule examples with complex functions",
    "Practice more derivative problems with trigonometric functions", 
    "Study the relationship between derivatives and integrals"
  ];

  return (
    <div className="container max-w-4xl py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${scoreStyle.bg} mb-4`}>
          <ScoreIcon className={`h-10 w-10 ${scoreStyle.text}`} />
        </div>
        <h1 className="text-3xl font-bold mb-2">{performance.title}</h1>
        <p className="text-muted-foreground text-lg">{performance.message}</p>
      </div>

      {/* Score Summary */}
      <Card className="shadow-lg mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2">{score}%</CardTitle>
          <CardDescription className="text-lg">
            You got {correct} out of {total} questions correct
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-primary-light mx-auto mb-2 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-xl font-bold">{score}%</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-success-light mx-auto mb-2 flex items-center justify-center">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-xl font-bold">{formatTime(time)}</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-warning-light mx-auto mb-2 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <p className="text-sm text-muted-foreground">Questions</p>
              <p className="text-xl font-bold">{correct}/{total}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{score}%</span>
            </div>
            <Progress value={score} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Concepts to Review */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-warning" />
              Concepts to Review
            </CardTitle>
            <CardDescription>Focus on these areas to improve your performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weakConcepts.map((concept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{concept.topic}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={concept.priority === 'high' ? 'destructive' : 'secondary'}>
                      {concept.priority} priority
                    </Badge>
                    <span className="text-sm text-muted-foreground">{concept.accuracy}%</span>
                  </div>
                </div>
                <Progress value={concept.accuracy} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions for your learning path</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-primary-light rounded-lg">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                </div>
                <p className="text-sm text-primary">{recommendation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          <Home className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retake Quiz
        </Button>
        <Button asChild className="bg-gradient-primary">
          <NavLink to="/learning">
            <Brain className="mr-2 h-4 w-4" />
            Practice Weak Areas
            <ArrowRight className="ml-2 h-4 w-4" />
          </NavLink>
        </Button>
        <Button variant="outline">
          <Share className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </div>
    </div>
  );
}