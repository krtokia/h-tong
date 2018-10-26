import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, Root } from 'native-base';
import { createMaterialTopTabNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { Font,AppLoading } from 'expo';

import Login from './Login';
//import HomeStack from './Home';
import Signup from './Signup';

import Works from './Works';

import Chat from './Chat';
import ChatRoom from './Chat/ChatRoom.js';

import Friends from './Friends';
import FriendDetail from './Friends/FriendDetail.js';

import Home from "./Home/Home.js";

import More from './More';
import Notice from './More/Notice.js';
import Mypage2 from './More/Mypage2.js';
import WorkHistory from './More/WorkHistory.js';
import Bookmark from './More/Bookmark.js';
import Settings from './More/Settings.js';
import Invite from './More/Invite.js';
import Papers from './More/Papers.js';
import Signature from './More/Signature.js';

import createTong from "./Home/createTong.js";
import createTong2 from "./Home/createTong2.js";

import TongMain from "./Home/TongMain.js";
import TongNotice from "./Home/TongNotice.js";
import TongInfo from "./Home/TongInfo.js";
import TongPaper from "./Home/TongPaper.js";
import TongETC2 from "./Home/TongETC2.js";
import TongPeople from "./Home/TongPeople.js";
import TongSetting from "./Home/TongSetting.js";
import TongPaperAgree from "./Home/TongPaperAgree.js";
import TongPaperSafe from "./Home/TongPaperSafe.js";
import TongPaperHealth from "./Home/TongPaperHealth.js";

import CommunityMain from "./Home/CommunityMain.js";
import CommunityNotice from "./Home/CommunityNotice.js";
import CommunityPeople from "./Home/CommunityPeople.js";
import CommunitySetting from "./Home/CommunitySetting.js";

import Mypage from './Mypage';
import MyInfo from './Mypage/MyInfo.js';

const platform = Platform.OS;
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
      <Root>
      <AppStackNavigator />
      </Root>
    );
  }
}
export default MainScreen;

const TongStackNavi = createStackNavigator({
  TongMain: { screen: TongMain },
  TongInfo: { screen: TongInfo },
},{
  navigationOptions: {
    header: null
  }
})

const CommunityStackNavi = createStackNavigator({
  CommunityMain: { screen: CommunityMain },
})


const CommunityTabNavi = createBottomTabNavigator({
  CommunityStackNavi: {
    screen: CommunityStackNavi,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} />,
    },
   },
   CommunityNotice: {
     screen: CommunityNotice,
     navigationOptions: {
       tabBarIcon: ({tintColor}) => <Icon name="bullhorn" size={20} color={tintColor} />,
     },
    },
  CommunityPeople: {
    screen: CommunityPeople,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="info-circle" size={20} color={tintColor} />,
    },
   },
   CommunitySetting: {
    screen: CommunitySetting,
    navigationOptions: {
       tabBarIcon: ({tintColor}) => <Icon name="cog" size={20} color={tintColor} />,
    },
  },
  CommunityMore: {
    screen: More,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="user-circle" size={30} color={tintColor} />,
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


const HomeTabNavi = createBottomTabNavigator({
  TongStackNavi: {
    screen: TongStackNavi,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} />,
    },
   },
   TongNotice: {
     screen: TongNotice,
     navigationOptions: {
       tabBarIcon: ({tintColor}) => <Icon name="bullhorn" size={20} color={tintColor} />,
     },
    },
  TongPeople: {
    screen: TongPeople,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="address-book-o" size={20} color={tintColor} />,
    },
   },
   TongSetting: {
    screen: TongSetting,
    navigationOptions: {
       tabBarIcon: ({tintColor}) => <Icon name="cog" size={20} color={tintColor} />,
    },
  },
  TongMore: {
    screen: More,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="user-circle" size={30} color={tintColor} />,
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
  Friends: {
    screen: Friends,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="address-book-o" size={20} color={tintColor}  />,
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="commenting-o" size={20} color={tintColor}  />,
    }
  },
  Works: {
    screen: Works,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="file-text-o" size={20} color={tintColor}  />,
    },
  },
  HomeMore: {
    screen: More,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="user-circle" size={30} color={tintColor}  />,
    },
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
    tabStyle: { padding: 0 },
    iconStyle: { width: 40, height: 40 },
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
      headerTitleContainerStyle: {
        marginLeft: platform === "ios" ? -60 : 0,
        marginTop: platform === "ios" ? 10 : 0,
      }
    }
  },
  createTong: { screen: createTong},
  createTong2: { screen: createTong2},
  FriendDetail: { screen: FriendDetail },
  Papers: { screen: Papers },
  Signature: { screen: Signature },
  ChatRoom: { screen: ChatRoom },
  Settings: { screen: Settings },
  Notice: { screen: Notice },
  More: { screen: More },
  TongPaper: { screen: TongPaper },
  Mypage: { screen: Mypage },
  MyInfo: { screen: MyInfo },
  TongPaperAgree: { screen: TongPaperAgree },
  TongPaperSafe: { screen: TongPaperSafe },
  TongPaperHealth: { screen: TongPaperHealth },
  HomeTab: {
    screen: HomeTabNavi,
    navigationOptions: {
      header: null,
    },
  },
  CommunityTab: {
    screen: CommunityTabNavi,
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
      shadowColor: 'transparent',
      shadowOffset: { height:0 },
      shadowRadius: 0,
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerTitle: (
      <Image
        source={Logo}
        style={{
          marginLeft: 10,
          marginRight: 'auto',
          width: 110,
          height: 40,
          resizeMode: 'contain',
        }}
      />
    ),
    headerTitleStyle: {
      marginLeft:-50,
      marginRight: 'auto'
    },
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
