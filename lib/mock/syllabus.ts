export interface Topic {
  title: {
    EN: string;
    HI: string;
  };
  details: string[];
}

export interface SubjectMap {
  subjectName: string;
  topics: Topic[];
}

export interface JobSyllabus {
  jobId: string;
  subjects: SubjectMap[];
}

export const mockSyllabus: JobSyllabus[] = [
  {
    jobId: "ssc-cgl-2024",
    subjects: [
      {
        subjectName: "Quantitative Aptitude",
        topics: [
          {
            title: { EN: "Percentages", HI: "प्रतिशत" },
            details: ["Basic percentages", "Successive percentage change"]
          },
          {
            title: { EN: "Profit & Loss", HI: "लाभ और हानि" },
            details: ["Discounts", "Dishonest dealer"]
          },
          {
            title: { EN: "Algebra", HI: "बीजगणित" },
            details: ["Linear equations", "Polynomials"]
          }
        ]
      },
      {
        subjectName: "General Intelligence & Reasoning",
        topics: [
          {
            title: { EN: "Analogies", HI: "समानता" },
            details: ["Semantic Analogy", "Symbolic/Number Analogy"]
          },
          {
            title: { EN: "Blood Relations", HI: "रक्त संबंध" },
            details: ["Family tree", "Coded relations"]
          }
        ]
      },
      {
        subjectName: "English Comprehension",
        topics: [
          {
            title: { EN: "Grammar", HI: "व्याकरण" },
            details: ["Error spotting", "Fill in the blanks"]
          },
          {
            title: { EN: "Vocabulary", HI: "शब्दावली" },
            details: ["Synonyms", "Antonyms", "Idioms"]
          }
        ]
      },
      {
        subjectName: "General Awareness",
        topics: [
          {
            title: { EN: "Current Affairs", HI: "करेंट अफेयर्स" },
            details: ["National news", "International events"]
          },
          {
            title: { EN: "History & Culture", HI: "इतिहास और संस्कृति" },
            details: ["Ancient India", "Modern Indian History"]
          }
        ]
      }
    ]
  },
  {
    jobId: "mpsc-rajyaseva-2024",
    subjects: [
      {
        subjectName: "General Studies Paper I",
        topics: [
          {
            title: { EN: "History of Maharashtra", HI: "महाराष्ट्र का इतिहास" },
            details: ["Social awakening", "Freedom struggle"]
          },
          {
            title: { EN: "Geography of Maharashtra", HI: "महाराष्ट्र का भूगोल" },
            details: ["Physical geography", "Agriculture"]
          }
        ]
      }
    ]
  }
];
