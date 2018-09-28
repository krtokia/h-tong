import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { Font,AppLoading } from 'expo';

import Login from './Login';
//import HomeStack from './Home';
import Signup from './Signup';
import Some1 from './Something';
import Some2 from './Something2';
import Some3 from './Something3';


import Some1sub from './Something/sub1';

import Home from "./Home/Home.js";

import More from './More';

import Mypage from './Mypage';
import Prepare from './Mypage/Prepare.js';
import Personal from './Mypage/Personal.js';

import createTong from "./Home/createTong.js";

import TongMain from "./Home/TongMain.js";
import TongNotice from "./Home/TongNotice.js";
import TongPeople from "./Home/TongPeople.js";
import TongETC1 from "./Home/TongETC1.js";
import TongETC2 from "./Home/TongETC2.js";

const Logo  = require('../assets/images/headIcon.png');

class MainScreen extends Component{
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render(){
    if (this.state.loading) {
      return (
        <AppLoading />
      )
    }
    return (
      <AppStackNavigator />
    );
  }
}
export default MainScreen;

const MypageStackNavi = createStackNavigator({
  MypageMain: { screen: Mypage },
  Prepare: { screen: Prepare },
  Personal: { screen: Personal },
},{
  headerMode: 'null',
});

const HomeTabNavi = createBottomTabNavigator({
  TongMain: {
    screen: TongMain,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="home" size={25} color={tintColor} />,
    },
   },
   TongNotice: {
     screen: TongNotice,
     navigationOptions: {
       tabBarIcon: ({tintColor}) => <Icon name="clipboard" size={25} color={tintColor} />,
     },
    },
    TongPeople: {
      screen: TongPeople,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="bell" size={25} color={tintColor} />,
      },
     },
     TongETC1: {
       screen: TongETC1,
       navigationOptions: {
         tabBarIcon: ({tintColor}) => <Icon name="check-square" size={25} color={tintColor} />,
       },
      },
      TongETC2: {
        screen: TongETC2,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <Icon name="bars" size={25} color={tintColor} />,
        },
       },
}, {
  tabBarOptions: {
    activeTintColor: '#cc0404',
    inactiveTintColor: '#999',
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#f4f4f4',
    },
  },
})

const TabNavigator = createMaterialTopTabNavigator({
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
  More: {
    screen: More,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="ellipsis-v" size={25} color={tintColor}  />,
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#cc0404',
    inactiveTintColor: '#999',
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#f4f4f4',
    },
  },
})

const AppStackNavigator = createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      headerLeft: null,
    }
  },
  createTong: { screen: createTong},
  Mypage: { screen: MypageStackNavi },
  HomeTab: {
    screen: HomeTabNavi,
    navigationOptions: {
      header: null,
    },
  },
  }, {
  initialRouteName: "Login",
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4f4f4',
      shadowOpacity: 0,
      shadowOffset: { width:0, height:0 },
      shadowRadius: 0,
      elevation: 0,
    },
    headerTitle: (
      <View style={{flexDirection:'row'}}>
      <Image
        source={Logo}
        style={{
          width:40,
          height:40,
          resizeMode:'contain',
          marginLeft:20,
        }}
      />
      <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center'}}>현장통</Text>
      </View>
    ),
    headerRight: (
      <View style={{flexDirection:"row"}}>
        <Icon name="search" size={25} style={{color:'#999',marginRight:20}} onPress={() => navigate('Some4')} />
        <Icon name="plus" size={28} style={{color:'#999',marginRight:10}} />
      </View>
    ),
  }
})



const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
