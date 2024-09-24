import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectQuestions,
  selectCurrentQuestionIndex,
  setAnswer,
  goBack,
  resetQuiz,
} from '../../store/QuestionSlice/QuestionSlice';
import {RootState} from '../../store/store';
import {StackNavigationProp} from '@react-navigation/stack';
import Question from '../../components/Question';
import Colors from '../../typogrphy/colors';
import {Back, Background} from '../../assects';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<any>;
};

const QuestionScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => selectQuestions(state));
  const currentQuestionIndex = useSelector((state: RootState) =>
    selectCurrentQuestionIndex(state),
  );

  const handleBackPress = () => {
    if (currentQuestionIndex > 0) {
      // Navigate to the previous question
      dispatch(goBack());
      return true; // Prevent default back behavior
    } else {
      dispatch(resetQuiz());
      navigation.goBack();
      return true; // Prevent default back behavior
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!navigation.isFocused()) {
        return;
      }
      const onBackPress = () => handleBackPress();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [currentQuestionIndex, dispatch]),
  );

  // Check if questions array is not empty and the current question index is valid
  if (
    !questions ||
    questions.length === 0 ||
    currentQuestionIndex >= questions.length
  ) {
    return (
      <View style={styles.container}>
        <Text>No questions available.</Text>
      </View>
    );
  }

  const handleAnswer = (selectedOption: {text: string; points: number}) => {
    if (!navigation.isFocused()) {
      return;
    }
    dispatch(setAnswer({questionIndex: currentQuestionIndex, selectedOption}));
    if (currentQuestionIndex + 1 === questions.length) {
      navigation.navigate('Result');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image style={styles.buttonImage} source={Back} />
          </TouchableOpacity>
          <Text style={styles.title}>Questions</Text>
        </View>

        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onSelect={handleAnswer}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerView: {
    width: '70%',
    height: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginStart: 15,
  },
  header: {
    position: 'absolute',
    top: 0,
    start: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: Colors.background,
    borderRadius: 50,
    padding: 10,
  },
  buttonImage: {
    width: 25,
    height: 25,
  },
});

export default QuestionScreen;
