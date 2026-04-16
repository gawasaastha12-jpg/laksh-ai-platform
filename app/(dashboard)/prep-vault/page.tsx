"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ExternalLink,
  Clock,
  Award,
  TrendingUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProfile } from "@/lib/profile-context";
import { getRecommendedCourses } from "@/lib/eligibility";
import { cn } from "@/lib/utils";

// Mock weakness data based on common exam areas
const weaknessAreas = [
  { subject: "Quantitative Aptitude", score: 45, maxScore: 100 },
  { subject: "General Awareness", score: 62, maxScore: 100 },
  { subject: "English Comprehension", score: 78, maxScore: 100 },
  { subject: "Reasoning Ability", score: 55, maxScore: 100 },
  { subject: "Computer Knowledge", score: 70, maxScore: 100 },
  { subject: "Banking Awareness", score: 38, maxScore: 100 },
];

function WeaknessHeatmap() {
  const getHeatColor = (score: number) => {
    if (score >= 70) return "bg-[oklch(0.65_0.2_145)]"; // Green - Strong
    if (score >= 50) return "bg-[oklch(0.75_0.15_85)]"; // Amber - Moderate
    return "bg-[oklch(0.55_0.2_25)]"; // Red - Weak
  };

  const getHeatBorder = (score: number) => {
    if (score >= 70) return "border-[oklch(0.65_0.2_145)]/50";
    if (score >= 50) return "border-[oklch(0.75_0.15_85)]/50";
    return "border-[oklch(0.55_0.2_25)]/50";
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
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  getHeatColor(area.score)
                )}
              />
              <span className="text-xs text-muted-foreground">
                {getLabel(area.score)}
              </span>
            </div>
            <h4 className="font-medium text-sm mb-2 line-clamp-1">
              {area.subject}
            </h4>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{area.score}%</span>
              <Progress
                value={area.score}
                className="w-16 h-2"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[oklch(0.55_0.2_25)]" />
          <span className="text-xs text-muted-foreground">
            {"< 50% - Weak"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[oklch(0.75_0.15_85)]" />
          <span className="text-xs text-muted-foreground">50-70% - Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[oklch(0.65_0.2_145)]" />
          <span className="text-xs text-muted-foreground">
            {"> 70% - Strong"}
          </span>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  index,
}: {
  course: ReturnType<typeof getRecommendedCourses>[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{course.duration}</span>
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-1">{course.name}</h3>
      <p className="text-sm text-primary mb-3">{course.provider}</p>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {course.description}
      </p>

      <Button variant="outline" className="w-full gap-2" asChild>
        <a href={course.link} target="_blank" rel="noopener noreferrer">
          Start Learning
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </motion.div>
  );
}

export default function PrepVaultPage() {
  const { profile } = useProfile();
  const courses = getRecommendedCourses([]);
  const [activeTab, setActiveTab] = useState<"heatmap" | "courses">("heatmap");

  // Calculate overall readiness
  const overallScore = Math.round(
    weaknessAreas.reduce((acc, area) => acc + area.score, 0) / weaknessAreas.length
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Prep Vault</h1>
          <p className="text-muted-foreground">
            Identify your weak areas and access recommended courses
          </p>
        </motion.div>
      </div>

      {/* Overall Readiness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/30 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-secondary"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-primary"
                initial={{ strokeDashoffset: 352 }}
                animate={{
                  strokeDashoffset: 352 - (352 * overallScore) / 100,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ strokeDasharray: 352 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold">{overallScore}%</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Overall Exam Readiness
            </h2>
            <p className="text-muted-foreground mb-4">
              Based on your profile analysis across all exam subjects
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[oklch(0.65_0.2_145)]" />
                <span className="text-sm">
                  {weaknessAreas.filter((a) => a.score >= 70).length} Strong Areas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  {profile?.certifications?.length || 0} Certifications
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-6"
      >
        <Button
          variant={activeTab === "heatmap" ? "default" : "ghost"}
          onClick={() => setActiveTab("heatmap")}
          className={cn(
            "gap-2",
            activeTab === "heatmap" && "bg-primary text-primary-foreground"
          )}
        >
          <Target className="h-4 w-4" />
          Weakness Heatmap
        </Button>
        <Button
          variant={activeTab === "courses" ? "default" : "ghost"}
          onClick={() => setActiveTab("courses")}
          className={cn(
            "gap-2",
            activeTab === "courses" && "bg-primary text-primary-foreground"
          )}
        >
          <BookOpen className="h-4 w-4" />
          Recommended Courses
        </Button>
      </motion.div>

      {/* Content */}
      {activeTab === "heatmap" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <WeaknessHeatmap />

          {/* Improvement Suggestions */}
          <div className="mt-6 p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-semibold mb-4">Priority Focus Areas</h3>
            <div className="space-y-4">
              {weaknessAreas
                .filter((a) => a.score < 50)
                .sort((a, b) => a.score - b.score)
                .map((area, index) => (
                  <div
                    key={area.subject}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-full bg-[oklch(0.55_0.2_25)]/20 text-[oklch(0.55_0.2_25)] flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{area.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          Current score: {area.score}%
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Start Practice
                    </Button>
                  </div>
                ))}
              {weaknessAreas.filter((a) => a.score < 50).length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Great job! No critical weak areas identified.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
