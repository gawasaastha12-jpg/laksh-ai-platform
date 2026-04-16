"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, Users, IndianRupee, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EligibilityResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface JobCardProps {
  result: EligibilityResult;
  onClick: () => void;
}

function CircularProgress({
  value,
  size = 60,
  strokeWidth = 6,
  status,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  status: "eligible" | "near-eligible" | "ineligible";
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const statusColors = {
    eligible: "stroke-[oklch(0.65_0.2_145)]",
    "near-eligible": "stroke-[oklch(0.75_0.15_85)]",
    ineligible: "stroke-[oklch(0.55_0.2_25)]",
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={statusColors[status]}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold">{value}%</span>
      </div>
    </div>
  );
}

const stateLabels: Record<string, string> = {
  all: "All India",
  maharashtra: "Maharashtra",
  "uttar-pradesh": "Uttar Pradesh",
  karnataka: "Karnataka",
  "tamil-nadu": "Tamil Nadu",
  rajasthan: "Rajasthan",
  gujarat: "Gujarat",
  "madhya-pradesh": "Madhya Pradesh",
  bihar: "Bihar",
  "west-bengal": "West Bengal",
  "andhra-pradesh": "Andhra Pradesh",
};

export function JobCard({ result, onClick }: JobCardProps) {
  const { job, status, probability } = result;

  const statusConfig = {
    eligible: {
      label: "Eligible",
      bg: "bg-[oklch(0.65_0.2_145)]/10",
      text: "text-[oklch(0.65_0.2_145)]",
      border: "border-[oklch(0.65_0.2_145)]/30",
    },
    "near-eligible": {
      label: "Near Eligible",
      bg: "bg-[oklch(0.75_0.15_85)]/10",
      text: "text-[oklch(0.75_0.15_85)]",
      border: "border-[oklch(0.75_0.15_85)]/30",
    },
    ineligible: {
      label: "Ineligible",
      bg: "bg-[oklch(0.55_0.2_25)]/10",
      text: "text-[oklch(0.55_0.2_25)]",
      border: "border-[oklch(0.55_0.2_25)]/30",
    },
  };

  const config = statusConfig[status];

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(job.officialUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "p-6 rounded-2xl bg-card border cursor-pointer transition-all",
        "hover:shadow-lg hover:shadow-primary/5",
        config.border
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">{job.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{job.department}</span>
          </div>
        </div>
        <CircularProgress value={probability} status={status} />
      </div>

      {/* Status Badge & State */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
            config.bg,
            config.text
          )}
        >
          {config.label}
        </span>
        {job.state !== "all" && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <MapPin className="h-3 w-3" />
            {stateLabels[job.state] || job.state}
          </span>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <IndianRupee className="h-4 w-4" />
          <span className="truncate">{job.salary.split("-")[0].trim()}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{job.vacancies.toLocaleString()} posts</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground col-span-2">
          <Calendar className="h-4 w-4" />
          <span>
            Exam:{" "}
            {new Date(job.examDate).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Main Reason */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {result.reasons[0]}
        </p>
      </div>

      {/* Apply Button */}
      <div className="mt-4">
        <Button
          onClick={handleApplyClick}
          variant="outline"
          className="w-full gap-2 border-primary/50 hover:bg-primary/10 hover:text-primary"
        >
          Apply on Official Website
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
