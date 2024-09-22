import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Option } from '../store/QuestionSlice/QuestionSlice';

type QuestionProps = {
  question: string;
  options: Option[];
  onSelect: (option: Option) => void;
};

const Question: React.FC<QuestionProps> = ({ question, options, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <View  key={index} style={styles.buttonContainer}>
          <Button
            key={index}
            title={option.text}
            onPress={() => onSelect(option)}
          />
          </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 8, 
  }
});

export default Question;
