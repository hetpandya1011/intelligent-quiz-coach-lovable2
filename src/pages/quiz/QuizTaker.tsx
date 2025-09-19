import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  XCircle,
  Flag,
  SkipForward
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function QuizTaker() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Mock quiz data
  const quiz = {
    id: searchParams.get('id') || '1',
    title: "Calculus: Derivatives",
    course: "Advanced Mathematics",
    totalQuestions: 5,
    timeLimit: 30, // minutes
    difficulty: "Medium"
  };

  const questions = [
    {
      id: 1,
      question: "What is the derivative of f(x) = x² + 3x - 2?",
      options: ["2x + 3", "x² + 3", "2x + 3x", "x + 3"],
      correctAnswer: "2x + 3",
      explanation: "Using the power rule: d/dx(x²) = 2x and d/dx(3x) = 3, so the derivative is 2x + 3."
    },
    {
      id: 2,
      question: "Find the derivative of f(x) = sin(x) + cos(x)",
      options: ["cos(x) - sin(x)", "cos(x) + sin(x)", "-sin(x) + cos(x)", "sin(x) - cos(x)"],
      correctAnswer: "cos(x) - sin(x)",
      explanation: "The derivative of sin(x) is cos(x) and the derivative of cos(x) is -sin(x)."
    },
    {
      id: 3,
      question: "What is the chain rule for f(g(x))?",
      options: ["f'(x) × g'(x)", "f'(g(x)) × g'(x)", "f(g'(x))", "f'(x) × g(x)"],
      correctAnswer: "f'(g(x)) × g'(x)",
      explanation: "The chain rule states that the derivative of a composition is f'(g(x)) × g'(x)."
    },
    {
      id: 4,
      question: "Find the derivative of f(x) = e^(2x)",
      options: ["e^(2x)", "2e^(2x)", "2e^x", "e^x"],
      correctAnswer: "2e^(2x)",
      explanation: "Using the chain rule: d/dx(e^(2x)) = e^(2x) × d/dx(2x) = e^(2x) × 2 = 2e^(2x)."
    },
    {
      id: 5,
      question: "What is the derivative of f(x) = ln(x)?",
      options: ["1/x", "ln(x)/x", "x", "1"],
      correctAnswer: "1/x",
      explanation: "The derivative of the natural logarithm ln(x) is 1/x."
    }
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestionData = questions[currentQuestion];
    const correct = selectedAnswer === currentQuestionData.correctAnswer;
    
    setAnswers(prev => ({ ...prev, [currentQuestion]: selectedAnswer }));
    setIsCorrect(correct);
    setShowFeedback(true);

    // Auto-advance after showing feedback
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setShowFeedback(false);
    }
  };

  const handleFinishQuiz = () => {
    // Calculate results
    const correctAnswers = Object.entries(answers).filter(([index, answer]) => 
      questions[parseInt(index)].correctAnswer === answer
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    toast({
      title: "Quiz completed!",
      description: `You scored ${score}% (${correctAnswers}/${questions.length} correct)`,
    });

    // Navigate to results page
    navigate(`/quiz/results?score=${score}&correct=${correctAnswers}&total=${questions.length}&time=${timeElapsed}`);
  };

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container max-w-4xl py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Quiz
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.course}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
          <Badge variant="outline">{quiz.difficulty}</Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestionData.question}</CardTitle>
          {showFeedback && (
            <div className={`flex items-center gap-2 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span className="font-medium">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedAnswer === option
                    ? showFeedback
                      ? option === currentQuestionData.correctAnswer
                        ? 'bg-success-light border-success text-success-foreground'
                        : 'bg-destructive/10 border-destructive text-destructive'
                      : 'bg-primary-light border-primary text-primary-foreground'
                    : showFeedback && option === currentQuestionData.correctAnswer
                    ? 'bg-success-light border-success text-success-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showFeedback && option === currentQuestionData.correctAnswer && (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {showFeedback && selectedAnswer === option && option !== currentQuestionData.correctAnswer && (
                    <XCircle className="h-4 w-4" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showFeedback && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Explanation:</h4>
              <p className="text-sm text-muted-foreground">{currentQuestionData.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline">
            <Flag className="mr-2 h-4 w-4" />
            Flag
          </Button>
        </div>

        <div className="flex gap-2">
          {!showFeedback ? (
            <>
              <Button variant="outline">
                <SkipForward className="mr-2 h-4 w-4" />
                Skip
              </Button>
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="bg-gradient-primary"
              >
                Submit Answer
              </Button>
            </>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-primary"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}