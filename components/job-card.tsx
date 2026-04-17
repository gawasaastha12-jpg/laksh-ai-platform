"use client";

import { motion } from "framer-motion";
import { Building2, IndianRupee, AlertCircle, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { EligibilityResult } from "@/lib/eligibility";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface JobCardProps {
  result: EligibilityResult;
  onClick: () => void;
}

export function JobCard({ result, onClick }: JobCardProps) {
  const { job, status, reasons, roadmap } = result;

  const isEligible = status === "ELIGIBLE";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "p-6 rounded-2xl bg-card border cursor-pointer transition-all flex flex-col h-full",
        "hover:shadow-lg",
        isEligible 
          ? "border-status-eligible/50 hover:shadow-status-eligible/10" 
          : "border-destructive/50 hover:shadow-destructive/10"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold mb-1 line-clamp-2">{job.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{job.board}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          {isEligible ? (
             <CheckCircle2 className="h-8 w-8 text-status-eligible" />
          ) : (
             <XCircle className="h-8 w-8 text-destructive" />
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold",
            isEligible 
              ? "bg-status-eligible/10 text-status-eligible border border-status-eligible/30"
              : "bg-destructive/10 text-destructive border border-destructive/30"
          )}
        >
          {status}
        </span>
      </div>

      {/* Info Grid */}
      <div className="text-sm mb-4 flex-grow">
        <p className="text-muted-foreground line-clamp-2 mb-2">{job.description}</p>
        {!isEligible && reasons.length > 0 && (
          <div className="mt-4 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
             <div className="flex items-center gap-2 text-destructive font-semibold mb-1">
               <AlertCircle className="h-4 w-4" />
               Reason:
             </div>
             <ul className="list-disc list-inside text-destructive/80 text-xs space-y-1">
               {reasons.map((r, i) => <li key={i}>{r}</li>)}
             </ul>
          </div>
        )}
      </div>

      {/* Footer Button / Action */}
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        {!isEligible && roadmap.length > 0 ? (
          <Button variant="outline" className="w-full text-xs font-semibold text-primary border-primary/50 hover:bg-primary/10">
            Roadmap to Eligible
          </Button>
        ) : (
          <div className="flex items-center text-sm font-medium text-primary ml-auto group">
            View Syllabus <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
