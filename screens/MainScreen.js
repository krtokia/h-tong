import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from 'react-navigation';

import Login from './Login';
import Home from './Home';
import Some1 from './Something';
import Some2 from './Something2';
import Some3 from './Something3';
import Some4 from './Something4';

class MainScreen extends Component{
  static navigationOptions = {
    title: 'SibalTong',
  }
  render(){
    return (
      <TabNavigator />
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
    },
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="lock" size={25} color={tintColor}  />,
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
  }
)

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
