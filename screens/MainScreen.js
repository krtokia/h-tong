import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';
import { createMaterialTopTabNavigator } from 'react-navigation';

import Login from './Login';
import Home from './Home';
import Some1 from './Something';
import Some2 from './Something2';
import Some3 from './Something3';
import Some4 from './Something4';

class MainScreen extends Component{
  static navigationOptions = {
    headerLeft: <Icon name='ios-camera-outline' size={26} style={{paddingLeft:10}}/>,
    title: 'SibalTong',
    headerRight: <Icon name='ios-send-outline' size={26} style={{paddingRight:10}}/>,
  }
  render(){
    return (
      <TabNavigator />
    );
  }
}
export default MainScreen;

const TabNavigator = createMaterialTopTabNavigator({
  Home: { screen: Home },
  Some1: { screen: Some1 },
  Some2: { screen: Some2 },
  Some3: { screen: Some3 },
  Some4: { screen: Some4 },
  Login: { screen: Login }
})

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
