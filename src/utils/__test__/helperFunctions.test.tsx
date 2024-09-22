import { getRiskCategory, resetQuizData, validateAnswer, calculateTotalScore } from '../helperFunctions';

describe('Quiz Helpers', () => {
  // Test for getRiskCategory
  describe('getRiskCategory', () => {
    it('returns "Low" for score less than 30', () => {
      expect(getRiskCategory(20)).toBe('Low');
    });

    it('returns "Medium" for score between 30 and 59', () => {
      expect(getRiskCategory(50)).toBe('Medium');
    });

    it('returns "High" for score 60 or above', () => {
      expect(getRiskCategory(70)).toBe('High');
    });
  });

  // Test for resetQuizData
  describe('resetQuizData', () => {
    it('resets quiz data correctly', () => {
      expect(resetQuizData()).toEqual({
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
      });
    });
  });

  // Test for validateAnswer
  describe('validateAnswer', () => {
    it('does not throw an error for valid answer', () => {
      const validAnswer = { text: 'Option 1', points: 10 };
      expect(() => validateAnswer(validAnswer)).not.toThrow();
    });

    it('throws an error for invalid answer', () => {
      const invalidAnswer = { text: 'Option 1', points: 'invalid' }; // points is not a number
      expect(() => validateAnswer(invalidAnswer)).toThrow('Invalid answer option selected');
    });
  });

  // Test for calculateTotalScore
  describe('calculateTotalScore', () => {
    it('calculates total score correctly', () => {
      const answers = [
        { text: 'Option 1', points: 10 },
        { text: 'Option 2', points: 20 },
        { text: 'Option 3', points: 30 },
      ];
      expect(calculateTotalScore(answers)).toBe(60);
    });

    it('returns 0 if no answers are provided', () => {
      expect(calculateTotalScore([])).toBe(0);
    });
  });
});
