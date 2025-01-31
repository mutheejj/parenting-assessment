import { Question, ParentingStyleInfo } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "I explain the reasons behind rules and expectations to my child.",
    category: "authoritative"
  },
  {
    id: 2,
    text: "I believe children should follow rules without question.",
    category: "authoritarian"
  },
  {
    id: 3,
    text: "I encourage open discussion about feelings and challenges.",
    category: "authoritative"
  },
  {
    id: 4,
    text: "I set clear boundaries while being responsive to my child's needs.",
    category: "authoritative"
  },
  {
    id: 5,
    text: "I rarely say no to my child's requests.",
    category: "permissive"
  },
  {
    id: 6,
    text: "I often feel too busy to be involved in my child's activities.",
    category: "neglectful"
  },
  {
    id: 7,
    text: "I guide my child through problem-solving instead of giving direct solutions.",
    category: "authoritative"
  },
  {
    id: 8,
    text: "I believe strict discipline builds strong character.",
    category: "authoritarian"
  },
  {
    id: 9,
    text: "I prefer to be my child's friend rather than an authority figure.",
    category: "permissive"
  },
  {
    id: 10,
    text: "I find it difficult to keep track of my child's activities and needs.",
    category: "neglectful"
  },
  {
    id: 11,
    text: "I avoid confrontation with my child to maintain peace.",
    category: "permissive"
  },
  {
    id: 12,
    text: "I balance warmth with appropriate discipline.",
    category: "authoritative"
  },
  {
    id: 13,
    text: "I actively listen to my child's perspective before making decisions.",
    category: "authoritative"
  },
  {
    id: 14,
    text: "I believe children should be seen and not heard.",
    category: "authoritarian"
  },
  {
    id: 15,
    text: "I let my child make their own decisions most of the time.",
    category: "permissive"
  },
  {
    id: 16,
    text: "I struggle to maintain consistent rules and routines.",
    category: "neglectful"
  },
  {
    id: 17,
    text: "I provide both emotional support and clear expectations.",
    category: "authoritative"
  },
  {
    id: 18,
    text: "I prioritize obedience over understanding.",
    category: "authoritarian"
  }
];

export const parentingStyles: Record<string, ParentingStyleInfo> = {
  authoritative: {
    name: "authoritative",
    title: "Authoritative Parenting",
    description: "A balanced approach combining warmth with reasonable expectations",
    characteristics: [
      "High expectations with high responsiveness",
      "Open communication",
      "Clear boundaries with flexibility",
      "Supportive and nurturing"
    ],
    recommendations: [
      "Continue fostering open dialogue",
      "Maintain consistent boundaries while showing empathy",
      "Support independence while providing guidance",
      "Celebrate effort and progress"
    ]
  },
  authoritarian: {
    name: "authoritarian",
    title: "Authoritarian Parenting",
    description: "A strict approach emphasizing obedience and discipline",
    characteristics: [
      "High expectations with low responsiveness",
      "Strict rules and discipline",
      "Limited flexibility",
      "Focus on obedience"
    ],
    recommendations: [
      "Practice active listening",
      "Allow more room for discussion and explanation",
      "Consider your child's perspective",
      "Balance discipline with emotional support"
    ]
  },
  permissive: {
    name: "permissive",
    title: "Permissive Parenting",
    description: "A lenient approach with few rules or expectations",
    characteristics: [
      "Low expectations with high responsiveness",
      "Few rules or consequences",
      "Very flexible boundaries",
      "Friend-like relationship"
    ],
    recommendations: [
      "Establish clear, age-appropriate boundaries",
      "Implement consistent consequences",
      "Maintain warmth while setting limits",
      "Practice positive discipline techniques"
    ]
  },
  neglectful: {
    name: "neglectful",
    title: "Neglectful Parenting",
    description: "An uninvolved approach with minimal engagement",
    characteristics: [
      "Low expectations with low responsiveness",
      "Minimal involvement",
      "Lack of structure",
      "Limited emotional support"
    ],
    recommendations: [
      "Increase daily involvement in your child's life",
      "Establish regular routines and check-ins",
      "Seek support if feeling overwhelmed",
      "Build stronger emotional connections"
    ]
  }
};
