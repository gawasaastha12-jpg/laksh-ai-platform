"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EligibilityResult } from "@/lib/eligibility";
import { mockSyllabus } from "@/lib/mock/syllabus";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/profile-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface JobDetailPanelProps {
  result: EligibilityResult | null;
  onClose: () => void;
}

export function JobDetailPanel({ result, onClose }: JobDetailPanelProps) {
  const { profile } = useProfile();
  
  // Use a ref to cache the previous result for the exit animation
  const prevResultRef = useRef<EligibilityResult | null>(null);
  useEffect(() => {
    if (result) prevResultRef.current = result;
  }, [result]);

  const displayResult = result || prevResultRef.current;

  return (
    <AnimatePresence>
      {result && displayResult && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="panel"
        initial={{ y: "100%", opacity: 0, rotateX: -15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        exit={{ y: "100%", opacity: 0, rotateX: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-x-0 bottom-0 md:top-4 md:bottom-4 md:right-4 md:left-auto md:max-w-xl w-full bg-card md:rounded-2xl border border-border z-50 overflow-y-auto shadow-2xl"
        style={{ transformOrigin: "bottom center" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border p-6 z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{displayResult.job.title}</h2>
              <p className="text-muted-foreground">{displayResult.job.board}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className={cn("p-4 rounded-xl flex items-start gap-3", displayResult.status === "ELIGIBLE" ? "bg-status-eligible/10" : "bg-destructive/10")}>
             {displayResult.status === "ELIGIBLE" ? (
               <CheckCircle2 className="h-6 w-6 text-status-eligible shrink-0" />
             ) : (
               <XCircle className="h-6 w-6 text-destructive shrink-0" />
             )}
             <div>
                <p className={cn("font-bold text-lg", displayResult.status === "ELIGIBLE" ? "text-status-eligible" : "text-destructive")}>
                  {displayResult.status}
                </p>
                {displayResult.status === "ELIGIBLE" ? (
                  <p className="text-sm text-foreground/80 mt-1">You meet all the requirements for this position!</p>
                ) : (
                  <div className="text-sm text-foreground/80 mt-1">
                    <p className="font-semibold mb-1">Reason(s):</p>
                    <ul className="list-disc list-inside space-y-1 ml-1 text-destructive/90">
                      {displayResult.reasons.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          {/* Apply Button */}
          {displayResult.status === "ELIGIBLE" ? (
            <Button className="w-full text-lg h-14 bg-primary hover:bg-primary/90" onClick={() => window.open(displayResult.job.officialUrl, '_blank')}>
              Apply on Official Govt Portal
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            displayResult.roadmap.length > 0 && (
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <h3 className="font-bold flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-primary" /> Roadmap to Eligible
                </h3>
                <ul className="space-y-2">
                  {displayResult.roadmap.map((step: string, i: number) => (
                    <li key={i} className="flex gap-2 items-start text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{i+1}</div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* Job Info Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Job Summary</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{displayResult.job.description}</p>
          </div>

          {/* Syllabus Accordion */}
          {mockSyllabus.find(s => s.jobId === displayResult.job.id) && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Focus Syllabus
              </h3>
              
              <Accordion type="single" collapsible className="w-full border border-border rounded-xl px-4 bg-muted/20">
                {mockSyllabus.find(s => s.jobId === displayResult.job.id)!.subjects.map((subject, idx) => (
                  <AccordionItem value={`item-${idx}`} key={idx} className="border-b last:border-none border-border">
                    <AccordionTrigger className="font-semibold hover:text-primary transition-colors">
                      {subject.subjectName}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2 pb-4">
                        {subject.topics.map((topic, tidx) => (
                          <div key={tidx} className="bg-background rounded-lg p-3 border border-border shadow-sm">
                            <h4 className="font-semibold mb-2 text-primary">{topic.title[profile?.language || 'EN']}</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                               {topic.details.map((detail, didx) => (
                                 <li key={didx}>{detail}</li>
                               ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

        </div>
      </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
