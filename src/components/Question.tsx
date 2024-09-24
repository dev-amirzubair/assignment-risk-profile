import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Option} from '../store/QuestionSlice/QuestionSlice';
import Colors from '../typogrphy/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

type QuestionProps = {
  question: string;
  options: Option[];
  onSelect: (option: Option) => void;
};

const Question: React.FC<QuestionProps> = ({question, options, onSelect}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <View key={index} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            key={index}
            onPress={() => onSelect(option)}>
            <Text style={styles.buttonText}>{option.text}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 12,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  buttonContainer: {
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    borderTopStartRadius: 15,
    borderBottomEndRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    elevation: 50,
    shadowColor: Colors.primary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default Question;
