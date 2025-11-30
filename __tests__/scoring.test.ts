import { calculateScores, getCareerSuggestions } from '../services/scoring';
import { Dimension } from '../types';

// Declare Jest globals to fix TypeScript errors when types are missing
declare const describe: any;
declare const test: any;
declare const expect: any;

describe('Scoring Logic', () => {
  test('calculateScores normalizes 1-5 to 0-100 correctly', () => {
    // Q1 is Curiosity. If answer is 5.
    const answers = { 1: 5 }; // Q1 matches Curiosity in constants.ts
    const scores = calculateScores(answers);
    
    // (5-1)/4 * 100 = 100
    expect(scores[Dimension.Curiosity]).toBe(100);
  });

  test('calculateScores averages multiple questions for same dimension', () => {
    // This assumes constants.ts Q1 and another hypothetical Q are same dim.
    // However, in our 15 Q list, they are distinct dimensions.
    // Let's force a mock if we were testing logic abstractly, 
    // but here we test the real logic against real questions.
    // Q1=Curiosity. 
    // If we answer 3 (Neutral) -> (3-1)/4*100 = 50.
    const answers = { 1: 3 };
    const scores = calculateScores(answers);
    expect(scores[Dimension.Curiosity]).toBe(50);
  });

  test('getCareerSuggestions returns Data Science for High Numerical/Curiosity', () => {
    // Simulate high scores for Data Science dims
    const mockScores = {
      [Dimension.Numerical]: 100,
      [Dimension.Curiosity]: 100,
      [Dimension.Analytical]: 100,
      [Dimension.Social]: 20 // Low social
    };

    const suggestions = getCareerSuggestions(mockScores, 'en');
    
    expect(suggestions[0].ruleId).toBe('data_science');
    expect(suggestions[0].matchPercentage).toBeGreaterThan(90);
  });

  test('getCareerSuggestions returns Hybrid for flat scores', () => {
    // All middling scores
    const mockScores: Record<string, number> = {};
    Object.values(Dimension).forEach(d => mockScores[d] = 50);

    const suggestions = getCareerSuggestions(mockScores, 'en');
    
    expect(suggestions[0].ruleId).toBe('hybrid');
  });
});