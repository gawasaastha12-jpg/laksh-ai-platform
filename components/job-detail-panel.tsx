"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  BookOpen,
  Lightbulb,
  Calendar,
  IndianRupee,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EligibilityResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface JobDetailPanelProps {
  result: EligibilityResult | null;
  onClose: () => void;
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-secondary rounded-lg px-3 py-2 min-w-[50px]">
            <span className="text-xl font-bold text-primary">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-muted-foreground capitalize mt-1 block">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export function JobDetailPanel({ result, onClose }: JobDetailPanelProps) {
  if (!result) return null;

  const { job, status, probability, qualifications, gaps } = result;

  const statusConfig = {
    eligible: {
      icon: CheckCircle2,
      label: "You are Eligible",
      color: "text-[oklch(0.65_0.2_145)]",
      bg: "bg-[oklch(0.65_0.2_145)]/10",
    },
    "near-eligible": {
      icon: AlertTriangle,
      label: "Nearly Eligible",
      color: "text-[oklch(0.75_0.15_85)]",
      bg: "bg-[oklch(0.75_0.15_85)]/10",
    },
    ineligible: {
      icon: XCircle,
      label: "Not Eligible",
      color: "text-[oklch(0.55_0.2_25)]",
      bg: "bg-[oklch(0.55_0.2_25)]/10",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l border-border z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{job.name}</h2>
              <p className="text-muted-foreground">{job.fullName}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Status Badge */}
          <div
            className={cn(
              "mt-4 p-4 rounded-xl flex items-center gap-3",
              config.bg
            )}
          >
            <StatusIcon className={cn("h-6 w-6", config.color)} />
            <div>
              <p className={cn("font-semibold", config.color)}>{config.label}</p>
              <p className="text-sm text-muted-foreground">
                Success Probability: {probability}%
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Job Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <IndianRupee className="h-4 w-4" />
                <span className="text-sm">Salary</span>
              </div>
              <p className="font-medium">{job.salary}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">Vacancies</span>
              </div>
              <p className="font-medium">{job.vacancies.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">Department</span>
              </div>
              <p className="font-medium">{job.department}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Apply By</span>
              </div>
              <p className="font-medium">
                {new Date(job.applicationDeadline).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Result Countdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Exam Countdown
            </h3>
            <CountdownTimer targetDate={job.examDate} />
          </div>

          {/* Why You Qualify */}
          {qualifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[oklch(0.65_0.2_145)]" />
                Why You Qualify
              </h3>
              <ul className="space-y-2">
                {qualifications.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[oklch(0.65_0.2_145)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Gaps to Address */}
          {gaps.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[oklch(0.75_0.15_85)]" />
                Gaps to Address
              </h3>
              <ul className="space-y-2">
                {gaps.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <XCircle className="h-4 w-4 text-[oklch(0.55_0.2_25)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Exam Syllabus */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Exam Syllabus
            </h3>
            <div className="space-y-2">
              {job.syllabus.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-secondary text-sm"
                >
                  {topic}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Preparation Tips */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Preparation Tips
            </h3>
            <ul className="space-y-3">
              {job.tips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-medium">
                    {index + 1}
                  </span>
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
