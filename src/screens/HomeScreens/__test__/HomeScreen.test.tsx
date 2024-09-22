import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('HomeScreen', () => {
  it('renders the title and button', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: mockNavigate }} />);

    expect(getByText('Risk Profile Questionnaire')).toBeTruthy();
    expect(getByText('Start')).toBeTruthy();
  });

  it('navigates to Questions screen on button press', () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Start'));

    expect(mockNavigate).toHaveBeenCalledWith('Questions');
  });
});
