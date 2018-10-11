import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'native-base';
import { createMaterialTopTabNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { Font,AppLoading } from 'expo';

import Login from './Login';
//import HomeStack from './Home';
import Signup from './Signup';

import Some3 from './Something3';

import Chat from './Chat';
import ChatRoom from './Chat/ChatRoom.js';

import Friends from './Friends';
import FriendDetail from './Friends/FriendDetail.js';

import Home from "./Home/Home.js";

import More from './More';
import Notice from './More/Notice.js';
import Mypage from './More/Mypage.js';
import WorkHistory from './More/WorkHistory.js';
import Bookmark from './More/Bookmark.js';
import Settings from './More/Settings.js';

import createTong from "./Home/createTong.js";
import createTong2 from "./Home/createTong2.js";

import TongMain from "./Home/TongMain.js";
import TongNotice from "./Home/TongNotice.js";
import TongPeople from "./Home/TongPeople.js";
import TongETC1 from "./Home/TongETC1.js";
import TongETC2 from "./Home/TongETC2.js";

const Logo  = require('../assets/images/headerLogo.png');

class MainScreen extends Component{
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      nanum_gothic: require('../assets/fonts/NanumGothic.ttf')
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

const ChatStackNavi = createStackNavigator({
  Chat: { screen: Chat },
  ChatRoom: { screen: ChatRoom },
},{
  headerMode: 'null',
});

const MoreStackNavi = createStackNavigator({
  More: { screen: More },
  Notice: { screen: Notice },
  Mypage: { screen: Mypage },
  WorkHistory: { screen: WorkHistory },
  Bookmark: { screen: Bookmark },
  Settings: { screen: Settings },
},{
  headerMode: 'null',
});

const FriendsStackNavi = createStackNavigator({
  Friends: { screen: Friends },
  FriendDetail: { screen: FriendDetail },
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
    activeTintColor: '#db3928',
    inactiveTintColor: '#999',
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#fff',
    },
  },
})

const TabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} />,
    },
  },
  FriendsStackNavi: {
    screen: FriendsStackNavi,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="address-book-o" size={20} color={tintColor}  />,
    },
  },
  ChatStackNavi: {
    screen: ChatStackNavi,
    navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="file-text-o" size={20} color={tintColor}  />,
    }
  },
  Some3: {
    screen: Some3,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="commenting-o" size={20} color={tintColor}  />,
    },
  },
  MoreStackNavi: {
    screen: MoreStackNavi,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="user-circle" size={25} color={tintColor}  />,
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#db3928',
    inactiveTintColor: '#999',
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#fff',
    },
    indicatorStyle: {
      borderBottomWidth: 2,
      borderBottomColor: '#db3928'
    }
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
  createTong2: { screen: createTong2},
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
      backgroundColor: '#fff',
      shadowOpacity: 0,
      shadowOffset: { width:0, height:0 },
      shadowRadius: 0,
      elevation: 0,
    },
    headerTitle: (
      <Image
        source={Logo}
        style={{
          marginLeft: 10,
          width: 110,
          height: 40,
          resizeMode: 'contain',
        }}
      />
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
