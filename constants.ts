import { Dimension, Question, CareerRule } from './types';

export const QUESTIONS: Question[] = [
  { id: 1, dimension: Dimension.Curiosity, text_bn: "আমি নতুন প্রযুক্তি বা ধারণা শিখতে আগ্রহী।", text_en: "I am eager to learn new technologies or concepts." },
  { id: 2, dimension: Dimension.Analytical, text_bn: "আমি জটিল সমস্যাকে বিশ্লেষণ করে সমাধান করতে পছন্দ করি।", text_en: "I enjoy analyzing and solving complex problems." },
  { id: 3, dimension: Dimension.Creativity, text_bn: "আমি সমস্যার অপ্রচলিত সমাধান খুঁজে পেতে পারি।", text_en: "I can find unconventional solutions to problems." },
  { id: 4, dimension: Dimension.Social, text_bn: "আমি মানুষের সঙ্গে কাজ করে খুশি হয়ে থাকি।", text_en: "I feel happy working with people." },
  { id: 5, dimension: Dimension.Practical, text_bn: "আমি হাতেকলমে কাজ করা বা বাস্তব কাজে জড়িত হতে পছন্দ করি।", text_en: "I like hands-on work or being involved in practical tasks." },
  { id: 6, dimension: Dimension.Leadership, text_bn: "আমি দলকে অনুপ্রাণিত করে কাজ করাতে পারি।", text_en: "I can motivate a team to get work done." },
  { id: 7, dimension: Dimension.RiskTolerance, text_bn: "আমি অনিশ্চিত পরিস্থিতিতে সিদ্ধান্ত নিতে ভালো মনে করি।", text_en: "I feel comfortable making decisions in uncertain situations." },
  { id: 8, dimension: Dimension.DetailOriented, text_bn: "আমি ছোট ছোট জিনিসে খুঁত দেখতে পারি।", text_en: "I can spot flaws in small details." },
  { id: 9, dimension: Dimension.Empathy, text_bn: "আমি অন্যদের অনুভূতি বুঝতে সহজে পারি।", text_en: "I can easily understand others' feelings." },
  { id: 10, dimension: Dimension.Persistence, text_bn: "আমি কঠিন কাজেও হাল ছাড়ি না।", text_en: "I do not give up even on difficult tasks." },
  { id: 11, dimension: Dimension.Communication, text_bn: "আমি জটিল ধারণা সহজভাবে ব্যাখ্যা করতে পারি।", text_en: "I can explain complex concepts simply." },
  { id: 12, dimension: Dimension.Numerical, text_bn: "সংখ্যা ও ডাটা বিশ্লেষণে আমার স্বাচ্ছন্দ্য আছে।", text_en: "I am comfortable with numbers and data analysis." },
  { id: 13, dimension: Dimension.Visual, text_bn: "দৃশ্য ও ডিজাইনে আমার চোখ ভালো।", text_en: "I have a good eye for visuals and design." },
  { id: 14, dimension: Dimension.Teaching, text_bn: "আমি অন্যকে শেখাতে পছন্দ করি।", text_en: "I enjoy teaching others." },
  { id: 15, dimension: Dimension.Autonomy, text_bn: "স্বতন্ত্রভাবে কাজ করলে আমি বেশি ভালো পারফর্মেন্স প্রদর্শন করি।", text_en: "I perform better when working independently." },
];

export const CAREER_RULES: CareerRule[] = [
  {
    id: "data_science",
    title_en: "Data Analyst / Scientist",
    title_bn: "ডাটা অ্যানালিস্ট / সায়েন্টিস্ট",
    requiredDimensions: [Dimension.Numerical, Dimension.Curiosity, Dimension.Analytical],
    description_bn: "আপনি সংখ্যার সাথে স্বাচ্ছন্দ্যবোধ করেন এবং নতুন ধারণা শিখতে উৎসাহী — এই গুণগুলো ডেটা সায়েন্সের জন্য উপযুক্ত।",
    description_en: "You are comfortable with numbers and eager to learn new concepts — traits ideal for Data Science.",
    nextSteps_bn: [
      "Python ভিত্তিক Data Analysis কোর্স করুন (pandas, numpy) — ৩০ দিন",
      "একটি ছোট প্রজেক্ট:kaggle থেকে ডাটা নিয়ে বিশ্লেষণ করে রিপোর্ট তৈরি করুন",
      "বেসিক SQL এবং Statistics শিখুন — ২ সপ্তাহ"
    ],
    nextSteps_en: [
      "Take a Python Data Analysis course (pandas, numpy) — 30 days",
      "Mini Project: Analyze a dataset from Kaggle and create a report",
      "Learn basic SQL and Statistics — 2 weeks"
    ]
  },
  {
    id: "software_eng",
    title_en: "Software Engineer",
    title_bn: "সফটওয়্যার ইঞ্জিনিয়ার",
    requiredDimensions: [Dimension.Analytical, Dimension.DetailOriented, Dimension.Persistence],
    description_bn: "জটিল সমস্যা সমাধান এবং খুঁটিনাটি বিষয়ে মনোযোগ দেওয়ার ক্ষমতা আপনাকে একজন ভালো প্রোগ্রামার করতে পারে।",
    description_en: "Your ability to solve complex problems and pay attention to detail makes you a strong candidate for programming.",
    nextSteps_bn: [
      "জাভাস্ক্রিপ্ট (JavaScript) বা পাইথন (Python) এর বেসিক শিখুন",
      "লজিক বিল্ডিং-এর জন্য ছোট ছোট অ্যালগরিদম সমাধান করুন",
      "গিট (Git) এবং ভার্সন কন্ট্রোল সম্পর্কে জানুন"
    ],
    nextSteps_en: [
      "Learn basics of JavaScript or Python",
      "Solve small algorithms to build logic skills",
      "Learn Git and Version Control"
    ]
  },
  {
    id: "design",
    title_en: "UX/UI Designer",
    title_bn: "UX/UI বা গ্রাফিক ডিজাইনার",
    requiredDimensions: [Dimension.Creativity, Dimension.Visual, Dimension.Empathy],
    description_bn: "আপনার সৃজনশীলতা এবং ভিজ্যুয়াল সেন্স ডিজিটাল পণ্য ডিজাইনে দারুণ কাজে আসবে।",
    description_en: "Your creativity and visual sense will be highly valuable in digital product design.",
    nextSteps_bn: [
      "Figma বা Canva টুল ব্যবহার করে একটি অ্যাপের ইন্টারফেস ডিজাইন করার চেষ্টা করুন",
      "কালার থিওরি এবং টাইপোগ্রাফির বেসিক নিয়মগুলো পড়ুন",
      "ব্যাবহারকারীর অভিজ্ঞতা (User Experience) নিয়ে ২-৩টি কেস স্টাডি পড়ুন"
    ],
    nextSteps_en: [
      "Try designing an app interface using Figma or Canva",
      "Read up on basic Color Theory and Typography",
      "Read 2-3 Case Studies on User Experience"
    ]
  },
  {
    id: "people_ops",
    title_en: "HR / Counseling / Sales",
    title_bn: "এইচআর / কাউন্সিলিং / সেলস",
    requiredDimensions: [Dimension.Social, Dimension.Empathy, Dimension.Communication],
    description_bn: "মানুষের সাথে মেশা এবং তাদের অনুভূতি বোঝার ক্ষমতা এই পেশার প্রধান শক্তি।",
    description_en: "Connecting with people and understanding their feelings are key strengths for these roles.",
    nextSteps_bn: [
      "যোগাযোগ দক্ষতা বাড়ানোর জন্য পাবলিক স্পিকিং প্র্যাকটিস করুন",
      "মনোবিজ্ঞান বা হিউম্যান রিসোর্স ম্যানেজমেন্টের বেসিক বই পড়ুন",
      "লিঙ্কডইনে (LinkedIn) পেশাজীবীদের সাথে নেটওয়ার্কিং শুরু করুন"
    ],
    nextSteps_en: [
      "Practice public speaking to improve communication",
      "Read basic books on Psychology or HRM",
      "Start networking with professionals on LinkedIn"
    ]
  },
  {
    id: "management",
    title_en: "Product Manager / Entrepreneur",
    title_bn: "প্রোডাক্ট ম্যানেজার / উদ্যোক্তা",
    requiredDimensions: [Dimension.Leadership, Dimension.Communication, Dimension.RiskTolerance],
    description_bn: "নেতৃত্ব দেওয়া এবং ঝুঁকি নেওয়ার সাহস আপনাকে ম্যানেজমেন্ট বা ব্যবসায়িক উদ্যোগে সফল করতে পারে।",
    description_en: "Leadership skills and the courage to take risks can make you successful in management or business.",
    nextSteps_bn: [
      "Agile বা Scrum মেথডলজি সম্পর্কে জানুন",
      "একটি কাল্পনিক প্রোডাক্টের রোডম্যাপ তৈরি করুন",
      "বিজনেস মডেল ক্যানভাস (BMC) কীভাবে বানাতে হয় শিখুন"
    ],
    nextSteps_en: [
      "Learn about Agile or Scrum methodologies",
      "Create a roadmap for a hypothetical product",
      "Learn how to create a Business Model Canvas (BMC)"
    ]
  },
  {
    id: "teaching",
    title_en: "Teacher / Trainer",
    title_bn: "শিক্ষক / ট্রেইনার",
    requiredDimensions: [Dimension.Teaching, Dimension.Empathy, Dimension.Communication],
    description_bn: "অন্যকে শেখানোর আগ্রহ এবং ধৈর্য আপনাকে শিক্ষা ও প্রশিক্ষণ খাতে উজ্জ্বল করতে পারে।",
    description_en: "Your patience and interest in teaching others can make you shine in education and training.",
    nextSteps_bn: [
      "আপনার জানা যেকোনো একটি বিষয় নিয়ে ৫ মিনিটের ভিডিও টিউটোরিয়াল বানান",
      "প্রেজেন্টেশন স্কিল উন্নত করার দিকে মনোযোগ দিন",
      "মেন্টরিং বা টিউশনিং শুরু করুন অভিজ্ঞতা অর্জনের জন্য"
    ],
    nextSteps_en: [
      "Create a 5-minute video tutorial on a topic you know",
      "Focus on improving presentation skills",
      "Start mentoring or tutoring to gain experience"
    ]
  },
  {
    id: "operations",
    title_en: "Operations / Field Engineer",
    title_bn: "অপারেশনস / ফিল্ড ইঞ্জিনিয়ার",
    requiredDimensions: [Dimension.Practical, Dimension.Autonomy, Dimension.Persistence],
    description_bn: "হাতেকলমে কাজ এবং স্বাধীনভাবে দায়িত্ব পালনের ক্ষমতা অপারেশনাল রোলের জন্য জরুরি।",
    description_en: "Hands-on work and the ability to function independently are crucial for operational roles.",
    nextSteps_bn: [
      "প্রজেক্ট ম্যানেজমেন্ট টুল (যেমন Trello বা Asana) ব্যবহার শিখুন",
      "লজিস্টিকস বা সাপ্লাই চেইন এর বেসিক ধারণা নিন",
      "টেকনিক্যাল বা ভোকেশনাল কোনো স্কিল ডেভেলপ করুন"
    ],
    nextSteps_en: [
      "Learn to use Project Management tools (e.g., Trello, Asana)",
      "Get basic concepts of Logistics or Supply Chain",
      "Develop a technical or vocational skill"
    ]
  }
];

export const UI_TEXT = {
  bn: {
    welcome: "ক্যারিয়ার কম্পাস",
    subtitle: "আপনার ব্যক্তিত্বের ভিত্তিতে সঠিক পেশা খুঁজে নিন মাত্র ৫ মিনিটে।",
    start: "শুরু করুন",
    next: "পরবর্তী",
    back: "ফিরে যান",
    finish: "ফলাফল দেখুন",
    question: "প্রশ্ন",
    of: "এর",
    resultsTitle: "আপনার জন্য সেরা পরামর্শ",
    match: "ম্যাচ",
    learnMore: "শিখুন & পরিকল্পনা",
    retake: "আবার পরীক্ষা দিন",
    share: "শেয়ার করুন",
    copied: "লিঙ্ক কপি হয়েছে!",
    chartTitle: "আপনার দক্ষতা মানচিত্র",
    modalTitle: "৩০-৬০ দিনের পরিকল্পনা",
    close: "বন্ধ করুন",
    hybridTitle: "হাইব্রিড / এক্সপ্লোরেশন",
    hybridDesc: "আপনার দক্ষতাগুলো বহুমুখী। আপনি একাধিক ক্ষেত্রের সমন্বয়ে কাজ করতে পারেন।",
    stronglyDisagree: "একদম একমত নই",
    stronglyAgree: "পুরোপুরি একমত"
  },
  en: {
    welcome: "Career Compass",
    subtitle: "Find your ideal career path in 5 minutes based on your personality.",
    start: "Start Quiz",
    next: "Next",
    back: "Back",
    finish: "See Results",
    question: "Question",
    of: "of",
    resultsTitle: "Top Career Suggestions",
    match: "Match",
    learnMore: "Plan & Learn",
    retake: "Retake Quiz",
    share: "Share Result",
    copied: "Link copied!",
    chartTitle: "Your Skills Radar",
    modalTitle: "30-60 Day Plan",
    close: "Close",
    hybridTitle: "Hybrid / Exploratory",
    hybridDesc: "Your skills are versatile. You might thrive in cross-functional roles.",
    stronglyDisagree: "Strongly Disagree",
    stronglyAgree: "Strongly Agree"
  }
};
