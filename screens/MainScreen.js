import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, Image, StatusBar, Platform, TouchableOpacity, Linking, Alert } from 'react-native';
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
import FriendPapers from './Friends/FriendPapers.js';

import Home from "./Home/Home.js";
import TongSearch from "./Home/TongSearch.js";
import SearchInvite from "./Home/SearchInvite.js";

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
import TongPaper2 from "./Home/TongPaper2.js";
import TongETC2 from "./Home/TongETC2.js";
import TongPeople from "./Home/TongPeople.js";
import TongSetting from "./Home/TongSetting.js";
import TongAdmin from "./Home/TongAdmin.js";
import TongAdmin2 from "./Home/TongAdmin2.js";
import TongPaperAgree from "./Home/TongPaperAgree.js";
import TongPaperSafe from "./Home/TongPaperSafe.js";
import TongPaperHealth from "./Home/TongPaperHealth.js";
import TongPaperArmor from "./Home/TongPaperArmor.js";
import TongWork from "./Home/TongWork.js";
import TongMap from "./Home/TongMap.js"
import TongInvite from "./Home/TongInvite.js"
import TongInviteDetail from "./Home/TongInviteDetail.js"
import TongDanger from "./Home/TongDanger.js";
import TongDangerDetail from "./Home/TongDangerDetail.js";
import TongEmergency from "./Home/TongEmergency.js";

import CommunityMain from "./Home/CommunityMain.js";
import CommunityNotice from "./Home/CommunityNotice.js";
import CommunityPeople from "./Home/CommunityPeople.js";
import CommunitySetting from "./Home/CommunitySetting.js";
import CommnunityInvite from "./Home/CommnunityInvite.js"

import Mypage from './Mypage';
import MyInfo from './Mypage/MyInfo.js';

import Test from './Home/Test.js';

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
  TongInvite: { screen: TongInvite },
  TongInviteDetail: { screen: TongInviteDetail },
  TongDanger: { screen: TongDanger },
  TongDangerDetail: { screen: TongDangerDetail }
},{
  navigationOptions: {
    header: null
  }
})

const CommunityStackNavi = createStackNavigator({
  CommunityMain: { screen: CommunityMain },
  CommunityInvite: { screen: CommnunityInvite },
},{
  navigationOptions: {
    header: null
  }
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
      tabBarIcon: ({tintColor}) => <Icon name="address-book-o" size={20} color={tintColor} />,
    },
   },
   CommunitySetting: {
    screen: CommunitySetting,
    navigationOptions: {
       tabBarIcon: ({tintColor}) => <Icon name="cog" size={30} color={tintColor} />,
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
   TongWork: {
    screen: TongWork,
    navigationOptions: {
       tabBarIcon: ({tintColor}) => <Icon name="list-alt" size={20} color={tintColor} />,
    },
  },
  TongSetting: {
    screen: TongSetting,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="cog" size={30} color={tintColor} />,
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
  FriendPapers: { screen: FriendPapers },
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
  TongPaperArmor: { screen: TongPaperArmor },
  TongPaper2: { screen: TongPaper2 },
  TongSearch: { screen: TongSearch },
  TongMap: { screen: TongMap },
  TongAdmin: { screen: TongAdmin },
  TongAdmin2: { screen: TongAdmin2 },
  TongEmergency: { screen: TongEmergency },
  Test: { screen: Test },
  SearchInvite: { screen: SearchInvite },
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
      <TouchableWithoutFeedback onPress={() => console.log(this.navigate)}>
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
      </TouchableWithoutFeedback>
    ),
    headerTitleStyle: {
      marginLeft:-50,
      marginRight: 'auto'
    },
    headerRight: (
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={() => {
            Alert.alert(
              '',
              '쇼핑몰로 이동하시겠습니까?',
              [
                {text:"예",onPress:() => Linking.openURL('https://smartstore.naver.com/f-tong')},
                {text:"아니오"}
              ],
              { cancelable: false }
            )
          }}>
          <Icon name="shopping-cart" size={28} style={{color:'#999',marginRight:10}} />
        </TouchableOpacity>
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
