"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileText, 
  Zap, 
  Shield, 
  Users, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Instant Eligibility Check",
    description: "Get your verdict in seconds, not hours of manual PDF reading"
  },
  {
    icon: Shield,
    title: "Category-Aware Analysis",
    description: "Accurate age relaxations and reservations for OBC, SC, ST, EWS"
  },
  {
    icon: TrendingUp,
    title: "Success Probability",
    description: "AI-powered predictions based on your profile strength"
  },
  {
    icon: FileText,
    title: "Smart Prep Guidance",
    description: "Personalized study plans targeting your weak areas"
  }
];

const stats = [
  { value: "20%", label: "Rejection rate due to eligibility errors" },
  { value: "50+", label: "Pages in average exam notification" },
  { value: "10s", label: "Time to check with Laksh" },
  { value: "4+", label: "Major exams covered" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Laksh</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/onboarding">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Career Guidance</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              From 50-Page PDFs to a{" "}
              <span className="text-primary">10-Second AI Verdict</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              Stop wasting hours decoding government job notifications. 
              Let AI check your eligibility for SSC, UPSC, IBPS, and Railway exams instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/onboarding">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg">
                  Check My Eligibility
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-border hover:bg-secondary">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Problem Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-24 p-8 rounded-2xl bg-gradient-to-br from-destructive/10 via-background to-background border border-destructive/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-destructive/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-destructive">20%</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">The Hidden Problem</h3>
                <p className="text-muted-foreground text-lg">
                  <strong className="text-foreground">1 in 5 applications</strong> get rejected due to eligibility errors. 
                  Candidates misread age limits, category relaxations, or education requirements buried in lengthy PDF notifications.
                  Don&apos;t let paperwork stand between you and your dream government job.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Laksh?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built specifically for Indian government job aspirants with all the nuances considered
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-card/50 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to your eligibility report
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Enter your age, category, education, and skills in our smart wizard",
                icon: Users
              },
              {
                step: "02",
                title: "AI Analyzes Jobs",
                description: "Our engine compares your profile against all major exam requirements",
                icon: Zap
              },
              {
                step: "03",
                title: "Get Your Verdict",
                description: "See eligible jobs with success probability and personalized prep plans",
                icon: CheckCircle2
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-12 pl-4">
                  <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Covered */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Exams We Cover
            </h2>
            <p className="text-muted-foreground text-lg">
              From banking to railways, we&apos;ve got you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "SSC CGL", posts: "12,500+ Vacancies" },
              { name: "UPSC CSE", posts: "1,050+ Vacancies" },
              { name: "IBPS PO", posts: "8,500+ Vacancies" },
              { name: "RRB NTPC", posts: "35,000+ Vacancies" }
            ].map((exam, index) => (
              <motion.div
                key={exam.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-card border border-border text-center cursor-pointer hover:border-primary/50 transition-all"
              >
                <div className="text-xl font-bold mb-1">{exam.name}</div>
                <div className="text-sm text-muted-foreground">{exam.posts}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/30"
          >
            <Clock className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop Guessing, Start Preparing
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of aspirants who&apos;ve already discovered their perfect government job match
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 text-lg">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Laksh</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with care for Indian government job aspirants
          </p>
        </div>
      </footer>
    </div>
  );
}
