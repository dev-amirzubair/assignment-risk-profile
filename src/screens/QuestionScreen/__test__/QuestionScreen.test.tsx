import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import QuestionScreen from '../QuestionScreen';
import { setAnswer } from '../../../store/QuestionSlice/QuestionSlice';
import { mockNavigation } from '../../../utils/testutil';

// Mock useSelector and useDispatch from Redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('QuestionScreen', () => {
  const mockDispatch = jest.fn();
  const mockQuestions = [
    {
      question: 'What is your risk tolerance?',
      options: [
        { text: 'Low', points: 10 },
        { text: 'Medium', points: 20 },
        { text: 'High', points: 30 },
      ],
    },
  ];

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders "No questions available" when no questions are present', () => {
    (useSelector as jest.Mock).mockReturnValueOnce([]).mockReturnValueOnce(0);
    const { getByText } = render(<QuestionScreen navigation={mockNavigation} />);
    expect(getByText('No questions available.')).toBeTruthy();
  });

  it('renders the question and options correctly', () => {
    (useSelector as jest.Mock)
      .mockReturnValueOnce(mockQuestions) // Mock questions from state
      .mockReturnValueOnce(0); // Mock currentQuestionIndex from state

    const { getByText } = render(<QuestionScreen navigation={mockNavigation} />);
    expect(getByText('What is your risk tolerance?')).toBeTruthy();
    expect(getByText('Low')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
  });

  it('dispatches setAnswer and navigates to "Result" when last question is answered', () => {
    (useSelector as jest.Mock)
      .mockReturnValueOnce(mockQuestions) // Mock questions from state
      .mockReturnValueOnce(0); // Mock currentQuestionIndex from state

    const { getByText } = render(<QuestionScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('Low')); // Simulate selecting an option

    expect(mockDispatch).toHaveBeenCalledWith(
      setAnswer({ questionIndex: 0, selectedOption: { text: 'Low', points: 10 } })
    );
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Result');
  });
});
