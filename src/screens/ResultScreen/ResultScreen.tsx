import React, {useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {resetQuiz} from '../../store/QuestionSlice/QuestionSlice';
import {RootState} from '../../store/store';
import {getRiskCategory} from '../../utils/helperFunctions';
import {StackNavigationProp} from '@react-navigation/stack';
import {Background} from '../../assects';
import Colors from '../../typogrphy/colors';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<any>;
};

const ResultScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.questions.score);
  const riskCategory = getRiskCategory(score);
  const onPress = () => {
    dispatch(resetQuiz());
    navigation.navigate('Home');
  };

  const handleBackPress = () => {
    // Go back to the Home Screen
    onPress();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackPress();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [dispatch]),
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.centerView}>
          <Text style={styles.title}>Your Risk Profile</Text>
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.category}>Category: {riskCategory}</Text>
          <TouchableOpacity style={styles.startButton} onPress={onPress}>
            <Text style={styles.buttonText}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
    color: Colors.primary,
  },
  category: {
    fontSize: 20,
    marginBottom: 30,
    color: Colors.primary,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerView: {
    width: '70%',
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButton: {
    marginTop: 50,
    borderTopStartRadius: 15,
    borderBottomEndRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 8,
    elevation: 50,
    shadowColor: Colors.primary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default ResultScreen;
