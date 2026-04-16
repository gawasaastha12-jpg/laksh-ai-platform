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
  ExternalLink,
  ChevronRight,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EligibilityResult, Language } from "@/lib/types";
import { useProfile } from "@/lib/profile-context";
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
  const { profile } = useProfile();

  if (!result) return null;

  const { job, status, probability, qualifications, gaps } = result;
  const userLanguage = profile?.language || "english";

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

  // Determine ineligibility reasons for steps
  const getIneligibilityReason = (): string | null => {
    for (const gap of gaps) {
      if (gap.toLowerCase().includes("age")) return "age";
      if (gap.toLowerCase().includes("education") || gap.toLowerCase().includes("graduation") || gap.toLowerCase().includes("degree")) return "education";
      if (gap.toLowerCase().includes("percentage")) return "percentage";
      if (gap.toLowerCase().includes("certification")) return "certification";
      if (gap.toLowerCase().includes("attempt")) return "attempts";
    }
    return null;
  };

  const ineligibilityReason = getIneligibilityReason();
  const eligibilitySteps = ineligibilityReason && job.ineligibilitySteps?.[ineligibilityReason] 
    ? job.ineligibilitySteps[ineligibilityReason] 
    : [];

  // Get language-specific resources
  const languageResource = job.languageResources?.find(
    (r) => r.language === userLanguage
  ) || job.languageResources?.[0];

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

          {/* Apply Button */}
          <Button
            className="w-full mt-4 gap-2"
            onClick={() => window.open(job.officialUrl, "_blank", "noopener,noreferrer")}
          >
            Apply on Official Website
            <ExternalLink className="h-4 w-4" />
          </Button>
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

          {/* Exam Countdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Exam Countdown
            </h3>
            <CountdownTimer targetDate={job.examDate} />
          </div>

          {/* Why You Qualify / Don't Qualify */}
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

          {/* Why You Are Not Eligible (Ineligibility Diagnosis) */}
          {status === "ineligible" && gaps.length > 0 && (
            <div className="p-4 rounded-xl bg-[oklch(0.55_0.2_25)]/10 border border-[oklch(0.55_0.2_25)]/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[oklch(0.55_0.2_25)]">
                <XCircle className="h-5 w-5" />
                Why You Are Not Eligible
              </h3>
              <ul className="space-y-2 mb-4">
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

              {/* Steps to Become Eligible */}
              {eligibilitySteps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[oklch(0.55_0.2_25)]/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    Steps to Become Eligible
                  </h4>
                  <Accordion type="single" collapsible className="w-full">
                    {eligibilitySteps.map((step, index) => (
                      <AccordionItem key={index} value={`step-${index}`} className="border-b-0">
                        <AccordionTrigger className="text-sm py-3 hover:no-underline">
                          <span className="flex items-center gap-2">
                            <span className="h-6 w-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                              {index + 1}
                            </span>
                            {step.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pl-8">
                          <p className="mb-2">{step.description}</p>
                          {step.duration && (
                            <p className="text-xs text-primary mb-2">
                              Duration: {step.duration}
                            </p>
                          )}
                          {step.actionUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => window.open(step.actionUrl, "_blank")}
                            >
                              Learn More
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          )}

          {/* Near-Eligible Gaps */}
          {status === "near-eligible" && gaps.length > 0 && (
            <div className="p-4 rounded-xl bg-[oklch(0.75_0.15_85)]/10 border border-[oklch(0.75_0.15_85)]/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[oklch(0.75_0.15_85)]">
                <AlertTriangle className="h-5 w-5" />
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
                    <AlertTriangle className="h-4 w-4 text-[oklch(0.75_0.15_85)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Syllabus & Subjects */}
          {job.subjects && job.subjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Syllabus & Subjects
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {job.subjects.map((subject, index) => (
                  <AccordionItem key={index} value={`subject-${index}`}>
                    <AccordionTrigger className="text-sm hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{subject.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {subject.weightage}% weightage
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pl-4">
                        {subject.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <ChevronRight className="h-3 w-3 text-primary" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Language-Specific Resources */}
          {languageResource && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {languageResource.label}
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => window.open(languageResource.mockTestUrl, "_blank")}
                >
                  <span>Free Mock Tests</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => window.open(languageResource.studyMaterialUrl, "_blank")}
                >
                  <span>Study Materials & PDFs</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

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
