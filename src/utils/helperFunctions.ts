// Helper function to determine the user's risk profile category based on their score
export const getRiskCategory = (score: number): string => {
    if (score < 30) return 'Low';
    if (score < 60) return 'Medium';
    return 'High';
  };
  
  // Helper function to reset all answers and score
  export const resetQuizData = () => ({
    currentQuestionIndex: 0,
    answers: [],
    score: 0,
  });
  
  // Optionally, you can add validation or sanitization for the quiz inputs
  export const validateAnswer = (selectedOption: { text: string; points: number }) => {
    if (!selectedOption || typeof selectedOption.points !== 'number') {
      throw new Error('Invalid answer option selected');
    }
  };
  
  // Helper to calculate the total score from an array of selected options
  export const calculateTotalScore = (answers: { text: string; points: number }[]): number => {
    return answers.reduce((total, answer) => total + answer.points, 0);
  };
  