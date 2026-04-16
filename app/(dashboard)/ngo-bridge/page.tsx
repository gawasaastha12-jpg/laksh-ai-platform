"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  IndianRupee,
  Users,
  CheckCircle2,
  Search,
  Filter,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getScholarships } from "@/lib/eligibility";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

interface ApplicationModalProps {
  scholarship: ReturnType<typeof getScholarships>[0] | null;
  onClose: () => void;
}

function ApplicationModal({ scholarship, onClose }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (!scholarship) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="h-16 w-16 rounded-full bg-[oklch(0.65_0.2_145)]/20 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="h-8 w-8 text-[oklch(0.65_0.2_145)]" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground mb-6">
                Your application for {scholarship.name} has been submitted successfully.
                You&apos;ll receive updates via email.
              </p>
              <Button onClick={onClose} className="bg-primary">
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">{scholarship.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {scholarship.organization}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-semibold">{scholarship.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {scholarship.eligibility}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    required
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Why do you need this scholarship?
                  </label>
                  <textarea
                    className="w-full h-24 px-3 py-2 rounded-lg bg-input border border-border text-sm resize-none"
                    placeholder="Briefly explain your situation..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function NGOBridgePage() {
  const { profile } = useProfile();
  const scholarships = getScholarships();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedScholarship, setSelectedScholarship] = useState<
    ReturnType<typeof getScholarships>[0] | null
  >(null);

  const filteredScholarships = scholarships.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      s.eligibility.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">NGO Bridge</h1>
          <p className="text-muted-foreground">
            Discover scholarship programs and apply for financial assistance
          </p>
        </motion.div>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/30 mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Financial Support Available</h2>
            <p className="text-muted-foreground mb-4">
              Based on your profile ({profile?.category?.toUpperCase() || "Category"}),
              you may be eligible for special scholarship programs. We&apos;ve curated
              opportunities from government and private organizations.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>{scholarships.length} Programs Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Deadlines Approaching</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scholarships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[160px] bg-card">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="obc">OBC</SelectItem>
              <SelectItem value="sc">SC/ST</SelectItem>
              <SelectItem value="girl">Girls</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScholarships.map((scholarship, index) => {
          const daysLeft = getDaysUntilDeadline(scholarship.deadline);
          const isUrgent = daysLeft <= 30;

          return (
            <motion.div
              key={scholarship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {scholarship.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {scholarship.organization}
                  </p>
                </div>
                {isUrgent && (
                  <span className="px-3 py-1 rounded-full bg-[oklch(0.55_0.2_25)]/10 text-[oklch(0.55_0.2_25)] text-xs font-medium">
                    {daysLeft} days left
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-secondary mb-4">
                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                  <IndianRupee className="h-4 w-4" />
                  <span>{scholarship.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {scholarship.eligibility}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Deadline:{" "}
                    {new Date(scholarship.deadline).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <Button
                  onClick={() => setSelectedScholarship(scholarship)}
                  className="bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  Apply Now
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No scholarships match your search criteria.
          </p>
        </div>
      )}

      {/* External Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "National Scholarship Portal",
              url: "https://scholarships.gov.in/",
            },
            {
              name: "AICTE Scholarships",
              url: "https://www.aicte-india.org/",
            },
            {
              name: "State Government Schemes",
              url: "#",
            },
          ].map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="text-sm font-medium">{resource.name}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Application Modal */}
      {selectedScholarship && (
        <ApplicationModal
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
        />
      )}
    </div>
  );
}
