import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import CreateNote from './src/screens/notes/create-note';
import ListNotes from './src/screens/notes/list-notes';
import EditNote from './src/screens/notes/edit-note';
import Auth from './src/screens/auth/auth-screen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@token')
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
}

MaterialIcons.loadFont();
const App = () => {

 
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth" headerMode="none">
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="createnote" component={CreateNote} />
          <Stack.Screen name="editnote" component={EditNote} />
          <Stack.Screen name="listnote" component={ListNotes} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
