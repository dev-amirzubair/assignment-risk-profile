import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import HomeScreen from './src/screens/HomeScreens/HomeScreen';
import QuestionScreen from './src/screens/QuestionScreen/QuestionScreen';
import ResultScreen from './src/screens/ResultScreen/ResultScreen';
import {StatusBar} from 'react-native';
import Colors from './src/typogrphy/colors';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Questions" component={QuestionScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
