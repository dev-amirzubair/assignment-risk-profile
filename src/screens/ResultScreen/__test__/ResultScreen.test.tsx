import { getRiskCategory, calculateTotalScore, validateAnswer } from '../../../utils/helperFunctions';

describe('Helper Functions', () => {
  it('should return the correct risk category', () => {
    expect(getRiskCategory(10)).toBe('Low');
    expect(getRiskCategory(40)).toBe('Medium');
    expect(getRiskCategory(70)).toBe('High');
  });

  it('should calculate total score correctly', () => {
    const answers = [
      { text: 'Short Term', points: 10 },
      { text: 'Stay calm', points: 30 },
    ];
    expect(calculateTotalScore(answers)).toBe(40);
  });

  it('should validate answer correctly', () => {
    const validAnswer = { text: 'Long Term', points: 30 };
    expect(() => validateAnswer(validAnswer)).not.toThrow();

    const invalidAnswer = { text: 'Invalid Answer', points: 'invalid' };
    expect(() => validateAnswer(invalidAnswer as any)).toThrow('Invalid answer option selected');
  });
});
