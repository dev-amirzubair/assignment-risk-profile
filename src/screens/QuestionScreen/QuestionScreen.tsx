import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestions, selectCurrentQuestionIndex, setAnswer } from '../../store/QuestionSlice/QuestionSlice';
import { RootState } from '../../store/store';
import { StackNavigationProp } from '@react-navigation/stack';
import Question from '../../components/Question';

type Props = {
  navigation: StackNavigationProp<any>;
};

const QuestionScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => selectQuestions(state));
  const currentQuestionIndex = useSelector((state: RootState) => selectCurrentQuestionIndex(state));

  // Check if questions array is not empty and the current question index is valid
  if (!questions || questions.length === 0 || currentQuestionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        <Text>No questions available.</Text>
      </View>
    );
  }

  const handleAnswer = (selectedOption: { text: string; points: number }) => {
    dispatch(setAnswer({ questionIndex: currentQuestionIndex, selectedOption }));
    if (currentQuestionIndex + 1 === questions.length) {
      navigation.navigate('Result');
    }
  };

  return (
    <View style={styles.container}>
      <Question
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        onSelect={handleAnswer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionScreen;
