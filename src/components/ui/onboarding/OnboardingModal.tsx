import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Brain, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  GraduationCap
} from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AI Quiz Coach!",
      description: "Transform your study materials into personalized learning experiences",
      icon: GraduationCap,
      content: (
        <div className="text-center py-6">
          <div className="h-20 w-20 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <p className="text-muted-foreground">
            Get ready to supercharge your learning with AI-powered quizzes and personalized feedback.
          </p>
        </div>
      )
    },
    {
      title: "Upload Your Materials",
      description: "Add lecture notes, PDFs, documents, and images",
      icon: Upload,
      content: (
        <div className="text-center py-6">
          <div className="h-20 w-20 rounded-full bg-primary-light mx-auto mb-4 flex items-center justify-center">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-3 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">PDFs, Word docs, PowerPoint slides</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Images of handwritten notes</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Text files and study guides</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI-Generated Quizzes",
      description: "Get personalized quizzes based on your materials",
      icon: Brain,
      content: (
        <div className="text-center py-6">
          <div className="h-20 w-20 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
            <Brain className="h-10 w-10 text-success" />
          </div>
          <div className="space-y-3 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Multiple choice questions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Adjustable difficulty levels</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Instant feedback and explanations</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Track Your Progress",
      description: "Get insights and focus on weak concepts",
      icon: BarChart3,
      content: (
        <div className="text-center py-6">
          <div className="h-20 w-20 rounded-full bg-warning-light mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="h-10 w-10 text-warning" />
          </div>
          <div className="space-y-3 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Detailed performance analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Identify concepts to review</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Personalized learning recommendations</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{currentStepData.title}</DialogTitle>
          <DialogDescription className="text-center">
            {currentStepData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Content */}
          {currentStepData.content}

          {/* Navigation */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              <Button variant="ghost" onClick={handleSkip}>
                Skip Tour
              </Button>
            </div>

            <Button 
              onClick={handleNext}
              className={currentStep === steps.length - 1 ? "bg-gradient-success" : "bg-gradient-primary"}
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}