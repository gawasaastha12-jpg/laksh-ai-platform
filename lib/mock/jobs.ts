export interface Job {
  id: string;
  title: string;
  board: string;
  stateReq: string | 'ALL';
  educationReq: string[];
  subjectsReq: string[];
  ageLimits: {
    UR: number;
    OBC: number;
    SC: number;
    ST: number;
    EWS: number;
  };
  officialUrl: string;
  description: string;
}

export const mockJobs: Job[] = [
  {
    id: "ssc-cgl-2024",
    title: "SSC CGL (Combined Graduate Level)",
    board: "Staff Selection Commission",
    stateReq: "ALL",
    educationReq: ["Bachelor's Degree", "B.Tech", "B.A", "B.Sc", "B.Com"],
    subjectsReq: [],
    ageLimits: {
      UR: 30,
      OBC: 33,
      SC: 35,
      ST: 35,
      EWS: 30
    },
    officialUrl: "https://ssc.gov.in",
    description: "Group B and C posts in various ministries."
  },
  {
    id: "mpsc-rajyaseva-2024",
    title: "MPSC State Services (Rajyaseva)",
    board: "MPSC",
    stateReq: "Maharashtra",
    educationReq: ["Bachelor's Degree", "B.Tech", "B.A", "B.Sc", "B.Com"],
    subjectsReq: [],
    ageLimits: {
      UR: 38,
      OBC: 43,
      SC: 43,
      ST: 43,
      EWS: 38
    },
    officialUrl: "https://mpsc.gov.in",
    description: "Top administrative posts in Maharashtra Government."
  },
  {
    id: "mpsc-clerk",
    title: "MPSC Clerk Typist",
    board: "MPSC",
    stateReq: "Maharashtra",
    educationReq: ["12th Pass", "Bachelor's Degree", "Diploma"],
    subjectsReq: ["Commerce", "Arts", "PCM"],
    ageLimits: {
      UR: 38,
      OBC: 43,
      SC: 43,
      ST: 43,
      EWS: 38
    },
    officialUrl: "https://mpsc.gov.in",
    description: "Clerical positions in Maharashtra state departments."
  },
  {
    id: "uppsc-2024",
    title: "UPPSC PCS",
    board: "UPPSC",
    stateReq: "Uttar Pradesh",
    educationReq: ["Bachelor's Degree", "B.Tech", "B.A", "B.Sc", "B.Com"],
    subjectsReq: [],
    ageLimits: {
      UR: 40,
      OBC: 45,
      SC: 45,
      ST: 45,
      EWS: 40
    },
    officialUrl: "https://uppsc.up.nic.in",
    description: "Provincial Civil Services in Uttar Pradesh."
  },
  {
    id: "upsc-cse-2024",
    title: "UPSC Civil Services",
    board: "UPSC",
    stateReq: "ALL",
    educationReq: ["Bachelor's Degree", "B.Tech", "B.A", "B.Sc", "B.Com"],
    subjectsReq: [],
    ageLimits: {
      UR: 32,
      OBC: 35,
      SC: 37,
      ST: 37,
      EWS: 32
    },
    officialUrl: "https://upsc.gov.in",
    description: "IAS, IPS, IFS and other central services."
  }
];
