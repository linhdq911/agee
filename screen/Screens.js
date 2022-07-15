import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NavigationContainer} from '@react-navigation/native';
import Man2 from '../components/Man2';
import Man1 from '../components/Man1';

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          options={{headerShown: false}}
          name="App"
          component={Man1}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Man2"
          component={Man2}
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Screens;

const styles = StyleSheet.create({});
