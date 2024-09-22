import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../../store/QuestionSlice/QuestionSlice';
import { RootState } from '../../store/store';
import { getRiskCategory } from '../../utils/helperFunctions';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const ResultScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.questions.score);
  const riskCategory = getRiskCategory(score); 
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Risk Profile</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.category}>Category: {riskCategory}</Text>
      <Button
        title="Retake Quiz"
        onPress={() => {
          dispatch(resetQuiz());
          navigation.navigate('Home');
        }}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
  },
  category: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default ResultScreen;
