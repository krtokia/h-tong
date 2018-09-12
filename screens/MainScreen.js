import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator, createStackNavigator, Header } from 'react-navigation';

import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import Some1 from './Something';
import Some2 from './Something2';
import Some3 from './Something3';
import Some4 from './Something4';


const Logo  = require('../assets/images/headIcon.png');

class MainScreen extends Component{
  render(){
    return (
      <AppStackNavigator />
    );
  }
}
export default MainScreen;

const TabNavigator = createMaterialTopTabNavigator(
  {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="home" size={25} color={tintColor} />,
      },
    },
  Some1: {
    screen: Some1,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="bell" size={25} color={tintColor}  />,
      },
    },
  Some2: {
    screen: Some2,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="comments" size={25} color={tintColor}  />,
      },
    },
  Some3: {
    screen: Some3,
    navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="user" size={25} color={tintColor}  />,
      }
    },
  Some4: {
    screen: Some4,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="ellipsis-v" size={25} color={tintColor}  />,
      }
    }
  },
  {
  tabBarOptions: {
    activeTintColor: '#ff0',
    inactiveTintColor: '#fff',
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#cc0404',
      },
    },
  })

const AppStackNavigator = createStackNavigator(
  {
  Login: {
    screen: Login,
    navigationOptions: {
      headerStyle: { backgroundColor:'rgba(0,0,0,0)',marginBottom:(StatusBar.currentHeight+Header.HEIGHT)*-1}
    },
   },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerStyle: { backgroundColor:'rgba(0,0,0,0)',marginBottom:(StatusBar.currentHeight+Header.HEIGHT)*-1}
    },
  },
  Main: { screen: TabNavigator }
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
  })

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
