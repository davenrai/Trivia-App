import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import ListScreen from './src/ListScreen';
import QuestionScreen from './src/QuestionScreen'

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Paper Trivia"
          component={ListScreen}
          options={{ title: "Paper Trivia", headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          options={{ title: 'Question', headerTitleAlign: 'center' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f3f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
