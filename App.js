import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MainScreen from './screens/MainScreen.js';
import Login from './screens/Login';
import Signup from './screens/Signup';

export default class App extends React.Component {
  render() {
    global.self = global;
    return (
      <AppStackNavigator />
    );

  }
}

const AppStackNavigator = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  }
},
  {
    initialRouteName: "Login",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#cc0404',
        shadowOpacity: 0,
        shadowOffset: { width:0, height:0 },
        shadowRadius: 0,
        elevation: 0,
      },
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
