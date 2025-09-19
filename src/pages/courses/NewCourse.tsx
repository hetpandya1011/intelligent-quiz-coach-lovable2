import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Image, 
  File,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewCourse() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    files: [] as File[],
  });

  const steps = [
    { id: 1, title: "Course Details", description: "Basic information about your course" },
    { id: 2, title: "Upload Materials", description: "Add your study materials and documents" },
    { id: 3, title: "Review & Create", description: "Review and create your course" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setCourseData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (index: number) => {
    setCourseData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateCourse = () => {
    // Simulate course creation
    toast({
      title: "Course created successfully!",
      description: "Your course has been created and materials are being processed.",
    });
    navigate("/courses");
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.includes('pdf')) return FileText;
    return File;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return courseData.name.trim() !== "" && courseData.description.trim() !== "";
      case 2:
        return courseData.files.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate("/courses")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
        <p className="text-muted-foreground">
          Set up your course and upload study materials to generate AI-powered quizzes
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep === step.id 
                  ? "bg-primary border-primary text-primary-foreground"
                  : currentStep > step.id
                  ? "bg-success border-success text-success-foreground"
                  : "border-muted-foreground text-muted-foreground"
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-16 mx-4 ${
                  currentStep > step.id ? "bg-success" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Course Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  placeholder="e.g., Advanced Mathematics, Biology 101"
                  value={courseData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseDescription">Description</Label>
                <Textarea
                  id="courseDescription"
                  placeholder="Describe what this course covers and what you'll learn..."
                  value={courseData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 2: Upload Materials */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Study Materials</h3>
                <p className="text-muted-foreground mb-4">
                  Upload PDFs, documents, images, or other study materials
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <Label htmlFor="fileUpload" className="cursor-pointer">
                  <Button asChild>
                    <span>Choose Files</span>
                  </Button>
                </Label>
              </div>

              {courseData.files.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Uploaded Files ({courseData.files.length})</h4>
                  {courseData.files.map((file, index) => {
                    const FileIcon = getFileIcon(file);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileIcon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <span className="font-medium">{file.name}</span>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Create */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Course Name</h4>
                  <p className="text-muted-foreground">{courseData.name}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{courseData.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Study Materials</h4>
                  <p className="text-muted-foreground">{courseData.files.length} files uploaded</p>
                </div>
              </div>
              <Card className="bg-primary-light border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary mb-1">Ready to create!</h4>
                      <p className="text-sm text-primary/80">
                        Your course will be created and materials will be processed to generate AI quizzes.
                        This may take a few minutes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-primary"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleCreateCourse}
            disabled={!canProceed()}
            className="bg-gradient-success"
          >
            Create Course
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}