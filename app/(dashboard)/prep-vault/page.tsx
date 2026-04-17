"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ExternalLink,
  Clock,
  Award,
  TrendingUp,
  Target,
  FileText,
  X,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";
import { mockTests, MockTest, Question } from "@/lib/mock/mock-tests";

const getRecommendedCourses = () => [
  { id: "c1", name: "Complete Math Foundation", provider: "YouTube: SSC Adda247", link: "https://youtube.com" },
  { id: "c2", name: "Daily Current Affairs (Hindi)", provider: "PDF: Testbook", link: "https://testbook.com" },
  { id: "c3", name: "Reasoning Speed Drills", provider: "YouTube: WiFiStudy", link: "https://youtube.com" }
];

// Mock weakness data
const weaknessAreas = [
  { subject: "Quantitative Aptitude", score: 45, maxScore: 100 },
  { subject: "General Awareness", score: 62, maxScore: 100 },
  { subject: "English Comprehension", score: 78, maxScore: 100 },
];

function WeaknessHeatmap() {
  const getHeatColor = (score: number) => {
    if (score >= 70) return "bg-status-eligible";
    if (score >= 50) return "bg-status-near";
    return "bg-destructive";
  };

  const getHeatBorder = (score: number) => {
    if (score >= 70) return "border-status-eligible/50";
    if (score >= 50) return "border-status-near/50";
    return "border-destructive/50";
  };

  const getLabel = (score: number) => {
    if (score >= 70) return "Strong";
    if (score >= 50) return "Moderate";
    return "Needs Work";
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        Weakness Heatmap
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {weaknessAreas.map((area, index) => (
          <motion.div
            key={area.subject}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-4 rounded-xl border-2 transition-all hover:scale-105",
              getHeatBorder(area.score)
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn("h-3 w-3 rounded-full", getHeatColor(area.score))} />
              <span className="text-xs text-muted-foreground">{getLabel(area.score)}</span>
            </div>
            <h4 className="font-medium text-sm mb-2 line-clamp-1">{area.subject}</h4>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{area.score}%</span>
              <Progress value={area.score} className="w-16 h-2" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MockTestSession({ test, profileLang, onClose }: { test: MockTest, profileLang: 'EN' | 'HI', onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit();
      return;
    }
    if (submitted) return;
    
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted]);

  const handleSubmit = () => {
    let s = 0;
    test.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) s += test.positiveMarks;
      else if (answers[q.id] !== undefined) s -= test.negativeMarks;
    });
    setScore(s);
    setSubmitted(true);
  };

  const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div>
           <h2 className="text-xl font-bold">{test.testId.toUpperCase()} Mock Test</h2>
           <p className="text-sm text-muted-foreground">Language: {profileLang === 'EN' ? 'English' : 'Hindi'}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xl font-mono text-primary bg-primary/10 px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="w-5 h-5"/> {formatTime(timeLeft)}
          </div>
          <Button variant="ghost" onClick={onClose}><X /></Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
         {submitted ? (
            <div className="bg-card p-8 border rounded-2xl text-center space-y-6">
               <Award className="w-16 h-16 text-primary mx-auto" />
               <h2 className="text-3xl font-bold">Test Completed</h2>
               <div className="text-xl">Your Score: <span className="font-bold text-primary">{score}</span> / {test.questions.length * test.positiveMarks}</div>
               <Button onClick={onClose}>Back to Vault</Button>

               <div className="mt-8 text-left space-y-6">
                 <h3 className="text-2xl font-bold border-b pb-4">Solutions</h3>
                 {test.questions.map((q, i) => (
                    <div key={q.id} className="p-4 border rounded-xl bg-muted/20">
                       <p className="font-bold mb-4">{i+1}. {q.text[profileLang]}</p>
                       <p className="text-sm text-primary mb-2 font-semibold">Correct Answer: {q.options[profileLang][q.correctAnswerIndex]}</p>
                       <p className="text-sm bg-background p-3 rounded-lg border">{q.explanation[profileLang]}</p>
                    </div>
                 ))}
               </div>
            </div>
         ) : (
            <div className="space-y-8 pb-32">
               {test.questions.map((q, i) => (
                 <div key={q.id} className="p-6 bg-card border rounded-2xl">
                    <h3 className="font-semibold text-lg mb-4">{i + 1}. {q.text[profileLang]}</h3>
                    <div className="space-y-3">
                       {q.options[profileLang].map((opt, optIdx) => (
                          <div 
                            key={optIdx} 
                            onClick={() => setAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                            className={cn(
                              "p-4 rounded-xl border cursor-pointer hover:bg-muted transition-colors",
                              answers[q.id] === optIdx ? "bg-primary/20 border-primary" : "bg-background"
                            )}
                          >
                            {opt}
                          </div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         )}
      </div>

      {!submitted && (
        <div className="border-t bg-card p-4 flex justify-between absolute bottom-0 w-full left-0 px-8">
           <div className="text-sm text-muted-foreground mt-2">
              Marked: {Object.keys(answers).length} / {test.questions.length}
           </div>
           <Button onClick={handleSubmit} size="lg" className="px-12 bg-primary">Submit Test</Button>
        </div>
      )}
    </div>
  );
}

export default function PrepVaultPage() {
  const { profile } = useProfile();
  const courses = getRecommendedCourses();
  const [activeTab, setActiveTab] = useState<"heatmap" | "courses" | "mocks">("mocks");
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);

  const profileLanguage = profile?.language || 'EN';

  if (activeTest) {
     return <MockTestSession test={activeTest} profileLang={profileLanguage} onClose={() => setActiveTest(null)} />
  }

  const overallScore = 65;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Language-Specific Prep Vault</h1>
        <p className="text-muted-foreground">Access mock tests entirely in {profileLanguage === 'HI' ? 'Hindi' : 'English'}</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-border pb-4">
        <Button variant={activeTab === "mocks" ? "default" : "ghost"} onClick={() => setActiveTab("mocks")} className="gap-2">
          <FileText className="h-4 w-4" /> Mock Tests
        </Button>
        <Button variant={activeTab === "heatmap" ? "default" : "ghost"} onClick={() => setActiveTab("heatmap")} className="gap-2">
          <Target className="h-4 w-4" /> Weakness Heatmap
        </Button>
        <Button variant={activeTab === "courses" ? "default" : "ghost"} onClick={() => setActiveTab("courses")} className="gap-2">
          <BookOpen className="h-4 w-4" /> Recommended Courses
        </Button>
      </div>

      {activeTab === "heatmap" && <WeaknessHeatmap />}
      
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
             <div key={course.id} className="p-6 rounded-2xl bg-card border group">
               <h3 className="font-semibold text-lg mb-1">{course.name}</h3>
               <p className="text-sm text-primary mb-3">{course.provider}</p>
               <Button variant="outline" className="w-full gap-2" asChild>
                 <a href={course.link} target="_blank" rel="noopener noreferrer">Start Learning <ExternalLink className="h-4 w-4" /></a>
               </Button>
             </div>
          ))}
        </div>
      )}

      {activeTab === "mocks" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((mt) => (
             <div key={mt.testId} className="p-6 rounded-2xl bg-card border group hover:border-primary transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="bg-muted px-2 py-1 rounded text-xs font-bold">{profileLanguage}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{mt.testId.toUpperCase()}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                   <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {mt.durationMinutes}m</span>
                   <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> {mt.positiveMarks} / -{mt.negativeMarks}</span>
                </div>
                <Button className="w-full" onClick={() => setActiveTest(mt)}>Start Test</Button>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
