import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screens from './screen/Screens'
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <Screens/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})