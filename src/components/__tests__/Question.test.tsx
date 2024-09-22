import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Question from '../Question';

describe('Question Component', () => {
  const mockQuestion = "What's your investment time horizon?";
  const mockOptions = [
    { text: 'Short Term', points: 10 },
    { text: 'Long Term', points: 30 },
  ];
  const mockOnSelect = jest.fn();

  it('renders the question and options correctly', () => {
    const { getByText } = render(
      <Question question={mockQuestion} options={mockOptions} onSelect={mockOnSelect} />
    );

    // Assert that the question is rendered
    expect(getByText(mockQuestion)).toBeTruthy();

    // Assert that the options are rendered
    expect(getByText('Short Term')).toBeTruthy();
    expect(getByText('Long Term')).toBeTruthy();
  });

  it('calls onSelect callback when an option is selected', () => {
    const { getByText } = render(
      <Question question={mockQuestion} options={mockOptions} onSelect={mockOnSelect} />
    );

    // Simulate pressing the "Short Term" button
    fireEvent.press(getByText('Short Term'));

    // Assert that the onSelect function was called with the correct option
    expect(mockOnSelect).toHaveBeenCalledWith({ text: 'Short Term', points: 10 });

    // Simulate pressing the "Long Term" button
    fireEvent.press(getByText('Long Term'));

    // Assert that the onSelect function was called with the correct option
    expect(mockOnSelect).toHaveBeenCalledWith({ text: 'Long Term', points: 30 });
  });
});
