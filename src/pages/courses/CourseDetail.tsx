import { useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  FileText, 
  Play, 
  BarChart3,
  Upload,
  MoreVertical,
  Download,
  Eye,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Brain
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("materials");

  // Mock course data
  const course = {
    id: courseId,
    name: "Advanced Mathematics", 
    description: "Calculus, Linear Algebra, and Statistics",
    progress: 78,
    accuracy: 87,
    totalQuizzes: 8,
    completedQuizzes: 6,
    studyStreak: 5,
    lastStudied: "2 hours ago"
  };

  const materials = [
    {
      id: 1,
      name: "Calculus Fundamentals.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2 days ago",
      processed: true
    },
    {
      id: 2,
      name: "Linear Algebra Notes.docx", 
      type: "Document",
      size: "1.8 MB",
      uploadedAt: "3 days ago",
      processed: true
    },
    {
      id: 3,
      name: "Statistics Chapter 1.pdf",
      type: "PDF", 
      size: "3.1 MB",
      uploadedAt: "1 week ago",
      processed: false
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: "Calculus: Derivatives",
      questions: 15,
      difficulty: "Medium",
      lastScore: 92,
      attempts: 3,
      createdAt: "2 days ago",
      status: "completed"
    },
    {
      id: 2,
      title: "Linear Algebra: Matrices",
      questions: 12,
      difficulty: "Hard", 
      lastScore: 78,
      attempts: 2,
      createdAt: "3 days ago",
      status: "completed"
    },
    {
      id: 3,
      title: "Statistics: Probability",
      questions: 10,
      difficulty: "Easy",
      lastScore: null,
      attempts: 0,
      createdAt: "1 day ago",
      status: "draft"
    }
  ];

  const insights = {
    weakConcepts: [
      { concept: "Integration by Parts", accuracy: 65, improvement: -5 },
      { concept: "Matrix Multiplication", accuracy: 72, improvement: +8 },
      { concept: "Normal Distribution", accuracy: 58, improvement: -12 }
    ],
    studyTime: "24h 32m",
    averageScore: 84,
    bestSubject: "Linear Algebra"
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate("/courses")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <MoreVertical className="mr-2 h-4 w-4" />
              Options
            </Button>
            <Button asChild className="bg-gradient-primary">
              <NavLink to={`/quiz/create?course=${courseId}`}>
                <Plus className="mr-2 h-4 w-4" />
                New Quiz
              </NavLink>
            </Button>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-xl font-bold">{course.progress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success-light flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-xl font-bold">{course.accuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-warning-light flex items-center justify-center">
                <Play className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quizzes</p>
                <p className="text-xl font-bold">{course.completedQuizzes}/{course.totalQuizzes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Studied</p>
                <p className="text-xl font-bold">{course.lastStudied}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Study Materials</h2>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </div>

          <div className="grid gap-4">
            {materials.map((material) => (
              <Card key={material.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{material.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {material.type} • {material.size} • Uploaded {material.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {material.processed ? (
                        <Badge variant="secondary" className="bg-success-light text-success">
                          Processed
                        </Badge>
                      ) : (
                        <Badge variant="outline">Processing...</Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Quizzes</h2>
            <Button asChild className="bg-gradient-primary">
              <NavLink to={`/quiz/create?course=${courseId}`}>
                <Plus className="mr-2 h-4 w-4" />
                Create Quiz
              </NavLink>
            </Button>
          </div>

          <div className="grid gap-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{quiz.title}</h3>
                        <Badge variant={quiz.difficulty === 'Easy' ? 'secondary' : quiz.difficulty === 'Medium' ? 'default' : 'destructive'}>
                          {quiz.difficulty}
                        </Badge>
                        {quiz.status === 'completed' && quiz.lastScore && (
                          <Badge variant="secondary" className="bg-success-light text-success">
                            {quiz.lastScore}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{quiz.questions} questions</span>
                        <span>•</span>
                        <span>{quiz.attempts} attempts</span>
                        <span>•</span>
                        <span>Created {quiz.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {quiz.status === 'completed' ? (
                        <Button size="sm">
                          <Play className="mr-1 h-3 w-3" />
                          Retake
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-gradient-primary">
                          <Play className="mr-1 h-3 w-3" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <h2 className="text-xl font-semibold">Course Insights</h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Performance Overview */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your learning progress at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Score</span>
                  <span className="text-2xl font-bold text-success">{insights.averageScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Study Time</span>
                  <span className="text-lg font-semibold">{insights.studyTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Best Subject</span>
                  <Badge variant="secondary" className="bg-success-light text-success">
                    {insights.bestSubject}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Weak Concepts */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-warning" />
                  Concepts to Review
                </CardTitle>
                <CardDescription>Areas where you can improve</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights.weakConcepts.map((concept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{concept.concept}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{concept.accuracy}%</span>
                        <div className={`flex items-center text-xs ${
                          concept.improvement > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {concept.improvement > 0 ? '+' : ''}{concept.improvement}%
                        </div>
                      </div>
                    </div>
                    <Progress value={concept.accuracy} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}