"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, UserProfile } from "@/lib/types";

const steps = [
  { id: 1, title: "Personal", icon: User },
  { id: 2, title: "Education", icon: GraduationCap },
  { id: 3, title: "Skills", icon: Award },
];

const categories: { value: Category; label: string }[] = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC (Other Backward Class)" },
  { value: "sc", label: "SC (Scheduled Caste)" },
  { value: "st", label: "ST (Scheduled Tribe)" },
  { value: "ews", label: "EWS (Economically Weaker Section)" },
  { value: "pwd", label: "PwD (Person with Disability)" },
];

const degrees = [
  "Bachelor of Arts (B.A.)",
  "Bachelor of Science (B.Sc.)",
  "Bachelor of Commerce (B.Com.)",
  "Bachelor of Technology (B.Tech.)",
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Computer Applications (BCA)",
  "Master of Arts (M.A.)",
  "Master of Science (M.Sc.)",
  "Master of Commerce (M.Com.)",
  "Master of Technology (M.Tech.)",
  "Master of Business Administration (MBA)",
  "12th Pass (HSC/Intermediate)",
  "10th Pass (SSC/Matriculation)",
];

const skillOptions = [
  "Mathematics",
  "Reasoning",
  "English",
  "General Knowledge",
  "Computer Skills",
  "Hindi",
  "Current Affairs",
  "Banking Knowledge",
  "Data Analysis",
  "Communication",
];

const certificationOptions = [
  "NIELIT CCC",
  "SWAYAM Certificate",
  "NPTEL Course",
  "Tally Certification",
  "MS Office Certification",
  "Typing Certificate (Hindi/English)",
  "State Government Certificate",
  "ITI Certificate",
];

const STORAGE_KEY = 'laksh_profile';
const ONBOARDED_KEY = 'laksh_onboarded';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    category: "" as Category | "",
    degree: "",
    graduationYear: "",
    percentage: "",
    skills: [] as string[],
    certifications: [] as string[],
  });

  useEffect(() => {
    setMounted(true);
    // Check if already onboarded
    const isOnboarded = localStorage.getItem(ONBOARDED_KEY) === 'true';
    if (isOnboarded) {
      router.push('/dashboard');
    }
  }, [router]);

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "skills" | "certifications", item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.age && formData.category;
      case 2:
        return formData.degree && formData.graduationYear && formData.percentage;
      case 3:
        return formData.skills.length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const profile: UserProfile = {
      name: formData.name,
      age: parseInt(formData.age),
      category: formData.category as Category,
      degree: formData.degree,
      graduationYear: parseInt(formData.graduationYear),
      percentage: parseFloat(formData.percentage),
      skills: formData.skills,
      certifications: formData.certifications,
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem(ONBOARDED_KEY, 'true');
    
    router.push("/dashboard");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Progress */}
      <div className="hidden lg:flex w-96 bg-card border-r border-border flex-col p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">Laksh</span>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
          <p className="text-muted-foreground mb-8">
            Complete these steps to get your personalized eligibility report
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      currentStep >= step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Step {step.id} of {steps.length}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-[55px] mt-16 h-8 w-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Your data is secure and only used to calculate eligibility
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Laksh</span>
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="lg:hidden px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {steps[currentStep - 1].title}
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Personal Details</h1>
                    <p className="text-muted-foreground">
                      Let&apos;s start with some basic information
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        className="h-12 bg-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age (as on exam date)</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="e.g., 25"
                        min={16}
                        max={60}
                        value={formData.age}
                        onChange={(e) => updateFormData("age", e.target.value)}
                        className="h-12 bg-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => updateFormData("category", value)}
                      >
                        <SelectTrigger className="h-12 bg-input">
                          <SelectValue placeholder="Select your category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Education */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Education</h1>
                    <p className="text-muted-foreground">
                      Tell us about your educational qualifications
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="degree">Highest Degree</Label>
                      <Select
                        value={formData.degree}
                        onValueChange={(value) => updateFormData("degree", value)}
                      >
                        <SelectTrigger className="h-12 bg-input">
                          <SelectValue placeholder="Select your degree" />
                        </SelectTrigger>
                        <SelectContent>
                          {degrees.map((degree) => (
                            <SelectItem key={degree} value={degree}>
                              {degree}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Year of Completion</Label>
                      <Input
                        id="graduationYear"
                        type="number"
                        placeholder="e.g., 2023"
                        min={1990}
                        max={2030}
                        value={formData.graduationYear}
                        onChange={(e) =>
                          updateFormData("graduationYear", e.target.value)
                        }
                        className="h-12 bg-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="percentage">Percentage / CGPA</Label>
                      <Input
                        id="percentage"
                        type="number"
                        placeholder="e.g., 75.5"
                        step="0.1"
                        min={0}
                        max={100}
                        value={formData.percentage}
                        onChange={(e) =>
                          updateFormData("percentage", e.target.value)
                        }
                        className="h-12 bg-input"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter percentage (out of 100) or CGPA converted to percentage
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Skills */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Skills & Certifications</h1>
                    <p className="text-muted-foreground">
                      Select your strengths and any certifications you hold
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Skills (select all that apply)</Label>
                      <div className="flex flex-wrap gap-2">
                        {skillOptions.map((skill) => (
                          <motion.button
                            key={skill}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleArrayItem("skills", skill)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              formData.skills.includes(skill)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {skill}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Certifications (optional)</Label>
                      <div className="flex flex-wrap gap-2">
                        {certificationOptions.map((cert) => (
                          <motion.button
                            key={cert}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleArrayItem("certifications", cert)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              formData.certifications.includes(cert)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {cert}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  disabled={!canProceed()}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="gap-2 bg-primary hover:bg-primary/90 min-w-[160px]"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <>
                      Get My Verdict
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
