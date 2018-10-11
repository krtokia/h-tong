import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, Header } from 'react-navigation';
import getTheme from './native-base-theme/components';
import { StyleProvider } from 'native-base';
import { Font } from 'expo';

import MainScreen from './screens/MainScreen.js';

export default class App extends React.Component {

  render() {
    global.self = global;
    return (
      <StyleProvider style={getTheme()}>
      <MainScreen />
      </StyleProvider>
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
