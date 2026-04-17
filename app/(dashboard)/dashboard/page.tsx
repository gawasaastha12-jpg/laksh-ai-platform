"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/lib/profile-context";
import { checkEligibility, EligibilityResult } from "@/lib/eligibility";
import { EligibilityStatus } from "@/lib/types";
import { JobCard } from "@/components/job-card";
import { JobDetailPanel } from "@/components/job-detail-panel";
import { ScanningAnimation } from "@/components/scanning-animation";

export default function DashboardPage() {
  const { profile, isLoading } = useProfile();
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<EligibilityResult | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [filterStatus, setFilterStatus] = useState<EligibilityStatus | "all">("all");

  useEffect(() => {
    if (isLoading) return;

    if (profile && profile.name) {
      const eligibilityResults = checkEligibility(profile);
      setResults(eligibilityResults);
      setIsScanning(false);
    } else {
       setIsScanning(false);
    }
  }, [profile, isLoading]);

  const filteredResults = results.filter((r) => filterStatus === "all" || r.status === filterStatus);

  const stats = {
    eligible: results.filter((r) => r.status === "ELIGIBLE").length,
    notEligible: results.filter((r) => r.status === "NOT ELIGIBLE").length,
  };

  if (isScanning) {
    return <ScanningAnimation />;
  }

  if (!profile || !profile.name) {
    return (
       <div className="flex flex-col items-center justify-center py-20 text-center">
         <User className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
         <h2 className="text-xl font-bold mb-2">Profile Missing</h2>
         <p className="text-muted-foreground mb-4">Please complete onboarding to view your dashboard.</p>
         <Button onClick={() => window.location.href='/onboarding'}>Go to Onboarding</Button>
       </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-muted-foreground">
            Your personalized Hard-Verdict eligibility dashboard
          </p>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div className="p-6 rounded-2xl bg-status-eligible/10 border border-status-eligible/30">
          <div className="text-4xl font-bold text-status-eligible mb-1">
            {stats.eligible}
          </div>
          <div className="text-sm text-muted-foreground">Eligible Jobs</div>
        </div>
        <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/30">
          <div className="text-4xl font-bold text-destructive mb-1">
            {stats.notEligible}
          </div>
          <div className="text-sm text-muted-foreground">Not Eligible</div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
      >
        <h2 className="text-xl font-semibold">Your Job Matches</h2>
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as EligibilityStatus | "all")}
            >
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="ELIGIBLE">Eligible Only</SelectItem>
                <SelectItem value="NOT ELIGIBLE">Not Eligible Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Job Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredResults.map((result, index) => (
            <motion.div
              layout
              key={result.job.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.05 * index }}
            >
              <JobCard result={result} onClick={() => setSelectedResult(result)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No jobs match the selected filter.
          </p>
        </div>
      )}

      {/* Job Detail Panel */}
      <JobDetailPanel
        result={selectedResult}
        onClose={() => setSelectedResult(null)}
      />
    </div>
  );
}
