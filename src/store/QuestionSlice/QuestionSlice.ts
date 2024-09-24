import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the types for Option and Question
export type Option = {
  text: string;
  points: number;
} | null;

export type Question = {
  id: number;
  question: string;
  options: Option[];
};

export type QuestionsState = {
  currentQuestionIndex: number;
  answers: Option[];
  score: number;
  questions: Question[];
};

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
        { text: 'Long Term', points: 30 }
      ],
    },
    {
      id: 2,
      question: "How do you react to market volatility?",
      options: [
        { text: 'Worry', points: 10 },
        { text: 'Stay calm', points: 30 }
      ],
    },
    {
      id: 3,
      question: "What's your preferred investment type?",
      options: [
        { text: 'Bonds', points: 10 },
        { text: 'Stocks', points: 30 }
      ],
    },
  ],
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{ questionIndex: number; selectedOption: Option }>
    ) => {
      const { questionIndex, selectedOption } = action.payload;
      state.answers[questionIndex] = selectedOption;
      state.score += selectedOption?.points || 0;
      state.currentQuestionIndex += 1;
    },
    goBack: (state) => {
      // Only go back if we aren't at the first question
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
        // Optionally adjust score when going back
        const previousAnswer = state.answers[state.currentQuestionIndex];
        if (previousAnswer) {
          state.score -= previousAnswer?.points || 0;
          state.answers[state.currentQuestionIndex] = null; // Clear the previous answer
        }
      }
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.score = 0;
    },
  },
});

// Export actions and selectors
export const { setAnswer, goBack, resetQuiz } = questionsSlice.actions;

export const selectQuestions = (state: RootState) => state.questions.questions;
export const selectCurrentQuestionIndex = (state: RootState) =>
  state.questions.currentQuestionIndex;
export const selectScore = (state: RootState) => state.questions.score;

export default questionsSlice.reducer;
