import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, Header } from 'react-navigation';

import MainScreen from './screens/MainScreen.js';

export default class App extends React.Component {
  render() {
    global.self = global;
    return (
      <MainScreen />
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
