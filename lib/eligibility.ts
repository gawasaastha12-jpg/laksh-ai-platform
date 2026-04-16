import { UserProfile, Job, EligibilityResult, EligibilityStatus } from './types';
import jobsData from './data/jobs.json';

export function checkEligibility(profile: UserProfile): EligibilityResult[] {
  const jobs = jobsData as Job[];
  
  return jobs.map(job => {
    const reasons: string[] = [];
    const qualifications: string[] = [];
    const gaps: string[] = [];
    let score = 100;
    
    // Check age eligibility
    const maxAge = job.requirements.maxAge[profile.category];
    if (profile.age > maxAge) {
      reasons.push(`Age limit exceeded (Max: ${maxAge} for ${profile.category.toUpperCase()})`);
      score -= 50;
      gaps.push('Age exceeds maximum limit');
    } else if (profile.age === maxAge) {
      qualifications.push('Just within age limit');
      reasons.push('Within age limit (barely)');
    } else {
      qualifications.push(`Within age limit (${maxAge - profile.age} years margin)`);
    }
    
    if (profile.age < job.requirements.minAge) {
      reasons.push(`Below minimum age (Min: ${job.requirements.minAge})`);
      score -= 50;
      gaps.push('Below minimum age requirement');
    }
    
    // Check education eligibility
    const educationLevels = { '10th': 1, '12th': 2, 'graduation': 3 };
    const userEducationLevel = profile.degree.toLowerCase().includes('graduate') || 
                               profile.degree.toLowerCase().includes('bachelor') ||
                               profile.degree.toLowerCase().includes('b.') ? 3 :
                               profile.degree.toLowerCase().includes('12') || 
                               profile.degree.toLowerCase().includes('intermediate') ||
                               profile.degree.toLowerCase().includes('hsc') ? 2 : 1;
    
    const requiredLevel = educationLevels[job.requirements.minEducation];
    
    if (userEducationLevel < requiredLevel) {
      reasons.push(`${job.requirements.minEducation} required`);
      score -= 40;
      gaps.push(`Need to complete ${job.requirements.minEducation}`);
    } else {
      qualifications.push(`Education requirement met (${profile.degree})`);
    }
    
    // Check percentage
    if (job.requirements.minPercentage > 0) {
      if (profile.percentage < job.requirements.minPercentage) {
        reasons.push(`Minimum ${job.requirements.minPercentage}% required (You have: ${profile.percentage}%)`);
        score -= 30;
        gaps.push('Percentage below requirement');
      } else {
        qualifications.push(`Percentage requirement met (${profile.percentage}%)`);
      }
    }
    
    // Category advantage
    if (profile.category !== 'general') {
      qualifications.push(`Reserved category benefit (${profile.category.toUpperCase()})`);
      score += 10;
    }
    
    // Skills bonus
    const relevantSkills = profile.skills.filter(skill => 
      job.syllabus.some(topic => 
        topic.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(topic.toLowerCase().split(' ')[0])
      )
    );
    
    if (relevantSkills.length > 0) {
      qualifications.push(`Relevant skills: ${relevantSkills.join(', ')}`);
      score += relevantSkills.length * 5;
    }
    
    // Certifications bonus
    if (profile.certifications.length > 0) {
      qualifications.push(`Certifications: ${profile.certifications.length} held`);
      score += profile.certifications.length * 3;
    }
    
    // Calculate final status
    let status: EligibilityStatus;
    const probability = Math.min(Math.max(score, 0), 100);
    
    if (score >= 70) {
      status = 'eligible';
    } else if (score >= 40) {
      status = 'near-eligible';
    } else {
      status = 'ineligible';
    }
    
    return {
      job,
      status,
      probability,
      reasons: reasons.length > 0 ? reasons : ['Meets all basic requirements'],
      qualifications,
      gaps
    };
  });
}

export function getRecommendedCourses(weaknesses: string[]) {
  const courses = [
    {
      id: 'nielit-ccc',
      name: 'NIELIT CCC',
      provider: 'NIELIT',
      duration: '80 hours',
      description: 'Course on Computer Concepts - Essential for government job computer literacy',
      link: 'https://student.nielit.gov.in/'
    },
    {
      id: 'swayam-english',
      name: 'English Communication Skills',
      provider: 'SWAYAM',
      duration: '12 weeks',
      description: 'Improve English comprehension and communication for competitive exams',
      link: 'https://swayam.gov.in/'
    },
    {
      id: 'swayam-quant',
      name: 'Quantitative Aptitude',
      provider: 'SWAYAM',
      duration: '8 weeks',
      description: 'Master mathematical concepts required for SSC, Banking, and Railway exams',
      link: 'https://swayam.gov.in/'
    },
    {
      id: 'nptel-reasoning',
      name: 'Logical Reasoning & Aptitude',
      provider: 'NPTEL',
      duration: '12 weeks',
      description: 'Develop logical and analytical reasoning skills',
      link: 'https://nptel.ac.in/'
    },
    {
      id: 'ignou-gk',
      name: 'General Knowledge & Current Affairs',
      provider: 'IGNOU',
      duration: '6 months',
      description: 'Comprehensive coverage of GK topics for competitive exams',
      link: 'https://ignou.ac.in/'
    },
    {
      id: 'unacademy-banking',
      name: 'Banking Awareness',
      provider: 'Various',
      duration: '4 weeks',
      description: 'Banking sector knowledge for IBPS and SBI exams',
      link: '#'
    }
  ];
  
  return courses;
}

export function getScholarships() {
  return [
    {
      id: 'nsp-central',
      name: 'Central Sector Scheme',
      organization: 'Ministry of Education',
      amount: '₹10,000 - ₹20,000/year',
      eligibility: 'Students above 80th percentile in Class XII',
      deadline: '2026-10-31'
    },
    {
      id: 'pm-scholarship',
      name: 'PM Scholarship Scheme',
      organization: 'Ministry of Defence',
      amount: '₹2,500 - ₹3,000/month',
      eligibility: 'Wards of Ex-servicemen/Ex-Coast Guard personnel',
      deadline: '2026-09-30'
    },
    {
      id: 'pragati',
      name: 'Pragati Scholarship for Girls',
      organization: 'AICTE',
      amount: '₹50,000/year',
      eligibility: 'Girl students in technical education',
      deadline: '2026-11-30'
    },
    {
      id: 'obc-fellowship',
      name: 'OBC Pre-Matric Scholarship',
      organization: 'Ministry of Social Justice',
      amount: 'Varies by state',
      eligibility: 'OBC students with family income below ₹2.5 lakh',
      deadline: '2026-08-31'
    },
    {
      id: 'saksham',
      name: 'Saksham Scholarship',
      organization: 'AICTE',
      amount: '₹50,000/year',
      eligibility: 'Differently-abled students in technical education',
      deadline: '2026-11-30'
    }
  ];
}
