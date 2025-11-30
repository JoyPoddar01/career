import { QUESTIONS, CAREER_RULES } from '../constants';
import { Answer, CareerResult, Dimension } from '../types';

export const calculateScores = (answers: Record<number, number>): Record<string, number> => {
  const dimensionSums: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};

  // Initialize
  Object.values(Dimension).forEach(d => {
    dimensionSums[d] = 0;
    dimensionCounts[d] = 0;
  });

  QUESTIONS.forEach(q => {
    const val = answers[q.id] || 3; // Default neutral if missing (shouldn't happen)
    // Scale 1-5 to 0-4 then normalize to 0-100 later
    // Actually, simple average is easier first.
    dimensionSums[q.dimension] += val;
    dimensionCounts[q.dimension] += 1;
  });

  const normalizedScores: Record<string, number> = {};
  
  Object.keys(dimensionSums).forEach(dim => {
    const sum = dimensionSums[dim];
    const count = dimensionCounts[dim];
    if (count > 0) {
      const avg = sum / count;
      // Map 1..5 to 0..100
      // 1 -> 0, 5 -> 100
      // (avg - 1) / 4 * 100
      normalizedScores[dim] = Math.round(((avg - 1) / 4) * 100);
    } else {
      normalizedScores[dim] = 0;
    }
  });

  return normalizedScores;
};

export const getCareerSuggestions = (scores: Record<string, number>, lang: 'bn'|'en'): CareerResult[] => {
  const results: CareerResult[] = CAREER_RULES.map(rule => {
    // Calculate match percentage based on required dimensions
    let totalScore = 0;
    let maxPossible = 0;

    // Weighted heavy on required dimensions
    rule.requiredDimensions.forEach(dim => {
      totalScore += (scores[dim] || 0) * 1.5;
      maxPossible += 100 * 1.5;
    });

    // Add secondary dimensions if they exist (standard weight)
    if (rule.secondaryDimensions) {
      rule.secondaryDimensions.forEach(dim => {
        totalScore += (scores[dim] || 0);
        maxPossible += 100;
      });
    }

    const matchPercentage = Math.round((totalScore / maxPossible) * 100);

    return {
      ruleId: rule.id,
      title: lang === 'bn' ? rule.title_bn : rule.title_en,
      matchPercentage,
      rationale: lang === 'bn' ? rule.description_bn : rule.description_en,
      nextSteps: lang === 'bn' ? rule.nextSteps_bn : rule.nextSteps_en,
      dimensionScores: scores
    };
  });

  // Sort by match percentage descending
  results.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Fallback for low scores (Hybrid)
  if (results[0].matchPercentage < 50) {
    // If top match is weak, add a generic hybrid suggestion at the top
    const hybrid: CareerResult = {
      ruleId: 'hybrid',
      title: lang === 'bn' ? 'হাইব্রিড / এক্সপ্লোরেশন' : 'Hybrid / Exploratory',
      matchPercentage: results[0].matchPercentage + 5, // Slightly bump to show it's viable
      rationale: lang === 'bn' 
        ? 'আপনার দক্ষতাগুলো সুষম। আপনি কোনো নির্দিষ্ট ছকে বাঁধা না পড়ে মাল্টি-ডিসিপ্লিনারি রোলে ভালো করবেন।' 
        : 'Your skills are balanced. You may thrive in multidisciplinary roles rather than a single niche.',
      nextSteps: lang === 'bn' 
        ? ['বিভিন্ন ছোট স্কিল শেখার চেষ্টা করুন', 'প্রজেক্ট ম্যানেজমেন্ট শিখুন', 'জেনারেলিস্ট রোল খুঁজুন']
        : ['Try learning various micro-skills', 'Learn Project Management', 'Look for Generalist roles'],
      dimensionScores: scores
    };
    return [hybrid, ...results.slice(0, 2)];
  }

  return results.slice(0, 3);
};
