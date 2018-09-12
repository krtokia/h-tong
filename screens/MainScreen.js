import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator, createStackNavigator, Header, NavigationActions } from 'react-navigation';

import Login from './Login';
//import HomeStack from './Home';
import Signup from './Signup';
import Some1 from './Something';
import Some2 from './Something2';
import Some3 from './Something3';
import Some4 from './Something4';

import Some1sub from './Something/sub1';

import Home from "./Home/Home.js";
import HomeDetail from "./Home/HomeDetail.js";
import HomeFriends from "./Home/HomeFriends.js";
import HomeNotice from "./Home/HomeNotice.js";

const Logo  = require('../assets/images/headIcon.png');

class MainScreen extends Component{
  render(){
    return (
      <AppStackNavigator />
    );
  }
}
export default MainScreen;

const HomeStackNavi = createStackNavigator({
  HomeMain: { screen: Home },
  HomeSub1: { screen: HomeSub1 },
  HomeSub2: { screen: HomeSub2 },
}, {
  initialRouteName: "HomeMain",
  headerMode: 'none',
})

const TabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: HomeStackNavi,
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
}, {
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

const AppStackNavigator = createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      headerTitle: (
        <Image
          source={Logo}
          style={{
            width:40,
            height:40,
            resizeMode:'contain',
            marginLeft:20,
          }}
        />
      ),
      headerRight: (
        <View style={{flexDirection:"row"}}>
          <Icon name="search" size={25} style={{color:'#999',marginRight:20}} onPress={() => navigate('Some4')} />
          <Icon name="plus" size={28} style={{color:'#999',marginRight:10}} />
        </View>
      ),
      headerLeft: null,
    }
  }
  }, {
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
