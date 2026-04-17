export interface Question {
  id: string;
  text: {
    EN: string;
    HI: string;
  };
  options: {
    EN: string[];
    HI: string[];
  };
  correctAnswerIndex: number;
  explanation: {
    EN: string;
    HI: string;
  };
}

export interface MockTest {
  jobId: string;
  testId: string;
  durationMinutes: number;
  positiveMarks: number;
  negativeMarks: number;
  questions: Question[];
}

export const mockTests: MockTest[] = [
  {
    jobId: "ssc-cgl-2024",
    testId: "ssc-cgl-mock-1",
    durationMinutes: 60,
    positiveMarks: 2,
    negativeMarks: 0.5,
    questions: [
      {
        id: "q1",
        text: {
          EN: "If the price of a book is first decreased by 25% and then increased by 20%, then the net change in the price will be:",
          HI: "यदि किसी पुस्तक की कीमत में पहले 25% की कमी की जाती है और फिर 20% की वृद्धि की जाती है, तो कीमत में शुद्ध परिवर्तन क्या होगा:"
        },
        options: {
          EN: ["10% decrease", "5% decrease", "No change", "10% increase"],
          HI: ["10% कमी", "5% कमी", "कोई परिवर्तन नहीं", "10% वृद्धि"]
        },
        correctAnswerIndex: 0,
        explanation: {
          EN: "Let initial price be 100. After 25% decrease: 75. After 20% increase on 75: 75 * 1.2 = 90. Net change = 100 - 90 = 10% decrease.",
          HI: "माना प्रारंभिक कीमत 100 है। 25% कमी के बाद: 75। 75 पर 20% वृद्धि के बाद: 75 * 1.20 = 90। शुद्ध परिवर्तन = 100 - 90 = 10% कमी।"
        }
      },
      {
        id: "q2",
        text: {
          EN: "Who is known as the 'Father of the Indian Constitution'?",
          HI: "भारतीय संविधान के 'पिता' के रूप में किसे जाना जाता है?"
        },
        options: {
          EN: ["Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Sardar Patel"],
          HI: ["महात्मा गांधी", "जवाहरलाल नेहरू", "बी.आर. अंबेडकर", "सरदार पटेल"]
        },
        correctAnswerIndex: 2,
        explanation: {
          EN: "Dr. B.R. Ambedkar is recognized as the Father of the Constitution of India.",
          HI: "डॉ. बी.आर. अंबेडकर को भारत के संविधान के पिता के रूप में मान्यता प्राप्त है।"
        }
      }
    ]
  }
];
