import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Star,
  Lightbulb,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Learning() {
  const [activeTab, setActiveTab] = useState("concepts");

  const weakConcepts = [
    {
      id: 1,
      topic: "Calculus: Integration by Parts",
      course: "Advanced Mathematics",
      accuracy: 65,
      priority: "high",
      studyTime: "12 min",
      lastPracticed: "2 days ago",
      improvement: -5,
      totalQuestions: 24,
      explanation: "A technique for evaluating integrals of products of functions."
    },
    {
      id: 2,
      topic: "Data Structures: Binary Trees",
      course: "Computer Science",
      accuracy: 72,
      priority: "medium", 
      studyTime: "8 min",
      lastPracticed: "1 day ago",
      improvement: +8,
      totalQuestions: 18,
      explanation: "Hierarchical data structures with nodes containing at most two children."
    },
    {
      id: 3,
      topic: "Biology: Mitochondria Functions",
      course: "Cell Biology",
      accuracy: 58,
      priority: "high",
      studyTime: "15 min",
      lastPracticed: "3 days ago",
      improvement: -12,
      totalQuestions: 20,
      explanation: "The powerhouse organelles responsible for cellular energy production."
    }
  ];

  const practiceQuizzes = [
    {
      id: 1,
      title: "Integration Techniques Review",
      description: "Focused practice on integration by parts and substitution",
      questions: 10,
      difficulty: "Medium",
      estimatedTime: "15 min",
      topics: ["Integration by Parts", "U-Substitution"],
      completionRate: 0
    },
    {
      id: 2,
      title: "Tree Traversal Methods",
      description: "Practice binary tree operations and traversal algorithms",
      questions: 8,
      difficulty: "Hard",
      estimatedTime: "12 min", 
      topics: ["Binary Trees", "Tree Traversal"],
      completionRate: 0
    },
    {
      id: 3,
      title: "Cellular Respiration Deep-dive",
      description: "Master the steps of cellular respiration and ATP production",
      questions: 12,
      difficulty: "Medium",
      estimatedTime: "18 min",
      topics: ["Mitochondria", "ATP Production", "Cellular Respiration"],
      completionRate: 0
    }
  ];

  const studyMaterials = [
    {
      id: 1,
      title: "Integration by Parts - Step by Step Guide",
      type: "Article",
      readTime: "5 min",
      difficulty: "Beginner",
      topic: "Calculus"
    },
    {
      id: 2, 
      title: "Binary Tree Visualization Interactive Demo",
      type: "Interactive",
      readTime: "8 min",
      difficulty: "Intermediate",
      topic: "Computer Science"
    },
    {
      id: 3,
      title: "Mitochondria Structure and Function Video",
      type: "Video",
      readTime: "12 min", 
      difficulty: "Beginner",
      topic: "Biology"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20' };
      case 'medium': return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' };
      default: return { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Hard': return 'destructive';
      case 'Medium': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Personalized Learning</h1>
        <p className="text-muted-foreground">
          Target your weak concepts with AI-powered explanations and practice quizzes
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="concepts">Weak Concepts</TabsTrigger>
          <TabsTrigger value="practice">Practice Quizzes</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
        </TabsList>

        {/* Weak Concepts Tab */}
        <TabsContent value="concepts" className="space-y-6">
          <div className="grid gap-6">
            {weakConcepts.map((concept) => {
              const priorityStyle = getPriorityColor(concept.priority);
              return (
                <Card key={concept.id} className={`shadow-sm ${priorityStyle.border} border`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{concept.topic}</CardTitle>
                          <Badge variant="outline" className={`${priorityStyle.bg} ${priorityStyle.text}`}>
                            {concept.priority} priority
                          </Badge>
                        </div>
                        <CardDescription>{concept.course}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold mb-1">{concept.accuracy}%</div>
                        <div className={`flex items-center text-sm ${
                          concept.improvement > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {concept.improvement > 0 ? '+' : ''}{concept.improvement}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{concept.totalQuestions} practice questions</span>
                      <span>Last practiced {concept.lastPracticed}</span>
                      <span>~{concept.studyTime} to master</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Mastery Progress</span>
                        <span className="text-sm text-muted-foreground">{concept.accuracy}%</span>
                      </div>
                      <Progress value={concept.accuracy} className="h-2" />
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{concept.explanation}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-primary">
                        <Play className="mr-1 h-3 w-3" />
                        Practice Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <BookOpen className="mr-1 h-3 w-3" />
                        Study Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Practice Quizzes Tab */}
        <TabsContent value="practice" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {practiceQuizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <Badge variant={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{quiz.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {quiz.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {quiz.completionRate > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-muted-foreground">{quiz.completionRate}%</span>
                      </div>
                      <Progress value={quiz.completionRate} className="h-1" />
                    </div>
                  )}

                  <Button asChild className="w-full">
                    <NavLink to="/quiz/take">
                      <Play className="mr-2 h-4 w-4" />
                      Start Quiz
                    </NavLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Study Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {studyMaterials.map((material) => (
              <Card key={material.id} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{material.type}</Badge>
                    <Badge variant="secondary">{material.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{material.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{material.topic}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Study Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}