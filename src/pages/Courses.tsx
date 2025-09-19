import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Target,
  MoreVertical,
  Play,
  FileText,
  BarChart3
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      description: "Calculus, Linear Algebra, and Statistics",
      progress: 78,
      totalMaterials: 12,
      totalQuizzes: 8,
      accuracy: 87,
      lastStudied: "2 hours ago",
      color: "bg-primary-light",
      textColor: "text-primary",
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      description: "Data Structures, Algorithms, and Programming",
      progress: 45,
      totalMaterials: 15,
      totalQuizzes: 5,
      accuracy: 92,
      lastStudied: "1 day ago",
      color: "bg-success-light",
      textColor: "text-success",
    },
    {
      id: 3,
      name: "Biology: Cell Structure",
      description: "Cellular biology and molecular processes",
      progress: 92,
      totalMaterials: 8,
      totalQuizzes: 12,
      accuracy: 79,
      lastStudied: "3 hours ago",
      color: "bg-warning-light",
      textColor: "text-warning",
    },
    {
      id: 4,
      name: "World History",
      description: "Ancient civilizations to modern era",
      progress: 23,
      totalMaterials: 20,
      totalQuizzes: 3,
      accuracy: 85,
      lastStudied: "5 days ago",
      color: "bg-muted",
      textColor: "text-muted-foreground",
    },
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">
            Manage your study materials and track your progress
          </p>
        </div>
        <Button asChild className="bg-gradient-primary">
          <NavLink to="/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </NavLink>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first course"}
            </p>
            <Button asChild>
              <NavLink to="/courses/new">Create Course</NavLink>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`h-10 w-10 rounded-lg ${course.color} flex items-center justify-center mb-3`}>
                    <BookOpen className={`h-5 w-5 ${course.textColor}`} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Course</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.totalMaterials} materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.totalQuizzes} quizzes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.accuracy}% accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.lastStudied}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1" size="sm">
                    <NavLink to={`/courses/${course.id}`}>
                      <Play className="mr-1 h-3 w-3" />
                      Continue
                    </NavLink>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <NavLink to={`/courses/${course.id}/insights`}>
                      <BarChart3 className="h-3 w-3" />
                    </NavLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}