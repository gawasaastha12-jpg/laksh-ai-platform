"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, ArrowUpDown, Upload, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/lib/profile-context";
import { checkEligibility } from "@/lib/eligibility";
import { EligibilityResult, EligibilityStatus } from "@/lib/types";
import { JobCard } from "@/components/job-card";
import { JobDetailPanel } from "@/components/job-detail-panel";
import { ScanningAnimation } from "@/components/scanning-animation";

export default function DashboardPage() {
  const { profile } = useProfile();
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<EligibilityResult | null>(
    null
  );
  const [isScanning, setIsScanning] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<EligibilityStatus | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"probability" | "deadline">("probability");

  useEffect(() => {
    if (profile) {
      // Simulate scanning animation
      const timer = setTimeout(() => {
        const eligibilityResults = checkEligibility(profile);
        setResults(eligibilityResults);
        setIsScanning(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [profile]);

  const handleCertificateUpload = async () => {
    setIsUploading(true);
    // Simulate OCR processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsUploading(false);
  };

  const filteredResults = results
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "probability") {
        return b.probability - a.probability;
      }
      return (
        new Date(a.job.applicationDeadline).getTime() -
        new Date(b.job.applicationDeadline).getTime()
      );
    });

  const stats = {
    eligible: results.filter((r) => r.status === "eligible").length,
    nearEligible: results.filter((r) => r.status === "near-eligible").length,
    ineligible: results.filter((r) => r.status === "ineligible").length,
  };

  if (isScanning) {
    return <ScanningAnimation />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-muted-foreground">
            Your personalized eligibility dashboard
          </p>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="p-6 rounded-2xl bg-[oklch(0.65_0.2_145)]/10 border border-[oklch(0.65_0.2_145)]/30">
          <div className="text-4xl font-bold text-[oklch(0.65_0.2_145)] mb-1">
            {stats.eligible}
          </div>
          <div className="text-sm text-muted-foreground">Eligible Jobs</div>
        </div>
        <div className="p-6 rounded-2xl bg-[oklch(0.75_0.15_85)]/10 border border-[oklch(0.75_0.15_85)]/30">
          <div className="text-4xl font-bold text-[oklch(0.75_0.15_85)] mb-1">
            {stats.nearEligible}
          </div>
          <div className="text-sm text-muted-foreground">Near Eligible</div>
        </div>
        <div className="p-6 rounded-2xl bg-[oklch(0.55_0.2_25)]/10 border border-[oklch(0.55_0.2_25)]/30">
          <div className="text-4xl font-bold text-[oklch(0.55_0.2_25)] mb-1">
            {stats.ineligible}
          </div>
          <div className="text-sm text-muted-foreground">Not Eligible</div>
        </div>
      </motion.div>

      {/* Certificate Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-card border border-border mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              {isUploading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FileCheck className="h-6 w-6 text-primary" />
                </motion.div>
              ) : (
                <Upload className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">Upload Certificate</h3>
              <p className="text-sm text-muted-foreground">
                {isUploading
                  ? "Scanning document with AI OCR..."
                  : "Add certificates to verify your qualifications"}
              </p>
            </div>
          </div>
          <Button
            onClick={handleCertificateUpload}
            disabled={isUploading}
            variant="outline"
            className="gap-2"
          >
            {isUploading ? "Processing..." : "Upload"}
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
      >
        <h2 className="text-xl font-semibold">Your Job Matches</h2>
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterStatus}
              onValueChange={(value) =>
                setFilterStatus(value as EligibilityStatus | "all")
              }
            >
              <SelectTrigger className="w-[140px] bg-card">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="near-eligible">Near Eligible</SelectItem>
                <SelectItem value="ineligible">Ineligible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select
              value={sortBy}
              onValueChange={(value) =>
                setSortBy(value as "probability" | "deadline")
              }
            >
              <SelectTrigger className="w-[140px] bg-card">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="probability">Probability</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Job Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredResults.map((result, index) => (
          <motion.div
            key={result.job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <JobCard result={result} onClick={() => setSelectedResult(result)} />
          </motion.div>
        ))}
      </motion.div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No jobs match the selected filter.
          </p>
        </div>
      )}

      {/* Job Detail Panel */}
      {selectedResult && (
        <JobDetailPanel
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
}
