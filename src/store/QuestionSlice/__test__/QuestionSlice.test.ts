import questionsReducer, { setAnswer, resetQuiz, QuestionsState } from '../QuestionSlice';


const initialState: QuestionsState = {
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  questions: [
    {
      id: 1,
      question: "What's your investment time horizon?",
      options: [
        { text: 'Short Term', points: 10 },
        { text: 'Long Term', points: 30 },
      ],
    },
    {
      id: 2,
      question: "How do you react to market volatility?",
      options: [
        { text: 'Worry', points: 10 },
        { text: 'Stay calm', points: 30 },
      ],
    },
    {
      id: 3,
      question: "What's your preferred investment type?",
      options: [
        { text: 'Bonds', points: 10 },
        { text: 'Stocks', points: 30 },
      ],
    },
  ],
};

describe('questionsSlice', () => {
  // Test 1: Ensure it returns the initial state
  it('should return the initial state', () => {
    expect(questionsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  // Test 2: Set answer and increment question index
  it('should handle setAnswer correctly', () => {
    const selectedOption = { text: 'Short Term', points: 10 };
    const nextState = questionsReducer(initialState, setAnswer({ questionIndex: 0, selectedOption }));

    expect(nextState.currentQuestionIndex).toBe(1); // Index incremented
    expect(nextState.answers[0]).toEqual(selectedOption); // Answer stored
    expect(nextState.score).toBe(10); // Score updated
  });

  // Test 3: Reset quiz to initial state
  it('should handle resetQuiz', () => {
    const stateWithAnswers = {
      ...initialState,
      currentQuestionIndex: 1,
      answers: [{ text: 'Short Term', points: 10 }],
      score: 10,
    };

    const nextState = questionsReducer(stateWithAnswers, resetQuiz());
    expect(nextState).toEqual(initialState); // Reset should return to the initial state
  });
});