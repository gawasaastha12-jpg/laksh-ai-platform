import { UserProfile, EligibilityStatus } from "./types";
import { mockJobs, Job } from "./mock/jobs";

export interface EligibilityResult {
  job: Job;
  status: EligibilityStatus;
  reasons: string[];
  roadmap: string[];
}

export function checkEligibility(profile: UserProfile): EligibilityResult[] {
  if (!profile) return [];
  
  const results = mockJobs.map((job) => {
    let isEligible = true;
    const reasons: string[] = [];
    const roadmap: string[] = [];

    // 1. Check State Domicile
    if (job.stateReq !== 'ALL' && job.stateReq.toLowerCase() !== (profile.stateDomicile || '').toLowerCase()) {
      isEligible = false;
      reasons.push(`State Domicile mismatch. Required: ${job.stateReq}`);
    }

    // 2. Check Age
    // Map categories depending on how it's saved. e.g. 'general' -> 'UR', 'obc' -> 'OBC'
    const categoryMapping: Record<string, keyof typeof job.ageLimits> = {
      'general': 'UR', 'obc': 'OBC', 'sc': 'SC', 'st': 'ST', 'ews': 'EWS', 'pwd': 'UR'
    };
    const catFormatted = categoryMapping[profile.category] || 'UR';
    const maxAge = job.ageLimits[catFormatted as keyof typeof job.ageLimits];
    
    if (profile.age > maxAge) {
      isEligible = false;
      reasons.push(`Age Exceeded limit. Max for your category: ${maxAge}, Your Age: ${profile.age}`);
    }

    // 3. Check Education
    if (job.educationReq.length > 0) {
      const degreeLower = (profile.degree || '').toLowerCase();
      const hasEducation = job.educationReq.some((req) => {
        const rLower = req.toLowerCase();
        if (degreeLower.includes(rLower) || rLower.includes(degreeLower)) return true;
        if (degreeLower.includes('bachelor') && rLower.includes('bachelor')) return true;
        if (degreeLower.includes('master') && rLower.includes('master')) return true;
        if (degreeLower.includes('12th') && rLower.includes('12th')) return true;
        if (degreeLower.includes('10th') && rLower.includes('10th')) return true;
        if (degreeLower.includes('b.tech') && rLower.includes('tech')) return true;
        if (degreeLower.includes('b.e.') && rLower.includes('tech')) return true;
        return false;
      });

      if (!hasEducation) {
        isEligible = false;
        reasons.push(`Education Mismatch. Required one of: ${job.educationReq.join(', ')}`);
        roadmap.push(`Pursue ${job.educationReq[0]}`);
      }
    }
    // 4. Check Subjects
    if (job.subjectsReq.length > 0) {
      const hasSubject = job.subjectsReq.some(subj => profile.subjects.includes(subj));
      if (!hasSubject) {
        isEligible = false;
        reasons.push(`Subject Mismatch. Required one of: ${job.subjectsReq.join(', ')}`);
        roadmap.push(`Complete a foundation course / bridge program in ${job.subjectsReq[0]}`);
      }
    }

    const resultStatus: EligibilityStatus = isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE';
    
    return {
      job,
      status: resultStatus,
      reasons,
      roadmap
    };
  });

  // Prioritize state matches
  return results.sort((a, b) => {
    const aIsStateMatch = a.job.stateReq.toLowerCase() === (profile.stateDomicile || '').toLowerCase();
    const bIsStateMatch = b.job.stateReq.toLowerCase() === (profile.stateDomicile || '').toLowerCase();
    
    if (aIsStateMatch && !bIsStateMatch) return -1;
    if (!aIsStateMatch && bIsStateMatch) return 1;
    
    // Fallback: Eligible first
    if (a.status === 'ELIGIBLE' && b.status === 'NOT ELIGIBLE') return -1;
    if (a.status === 'NOT ELIGIBLE' && b.status === 'ELIGIBLE') return 1;
    
    return 0;
  });
}

export function getScholarships() {
  return [
    {
      id: "schol-1",
      name: "Merit-cum-Means Scholarship",
      organization: "Ministry of Minority Affairs",
      amount: "₹20,000/year",
      eligibility: "Technical & Professional Courses",
      deadline: "2024-10-31"
    },
    {
      id: "schol-2",
      name: "Udaan Scholarship",
      organization: "CBSE",
      amount: "₹15,000",
      eligibility: "Girl Students in Class 11-12",
      deadline: "2024-09-15"
    }
  ];
}

