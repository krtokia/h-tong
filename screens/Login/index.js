import React, { Component } from 'react';
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableHighlight,
  Text,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import { Header, StackActions, NavigationActions } from 'react-navigation';

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/loginLogo.png");
import { StoreGlobal } from '../../App';
import styles from './styles.js'

import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'http://h-tong.kr/api/push-token.php';


  async function registerForPushNotificationsAsync(id) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: id,
        },
      }),
    });
  }


export default class App extends Component {
  static navigationOptions = ({
    header: null
  });

  constructor(props){
    super(props);

    this.state={
      userId: '',
      userPass: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    for (const key in event) {
      console.log(key + " : " + event[key])
    }
  }

  onLogin() {
    const { username, password } = this.state;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
        fetch('http://13.124.127.253/api/login.php', {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: username,
              pw: password
            })
        }).then((response) => response.json())
          .then((responseJson)=> {
            if(responseJson === 'data matched') {
              registerForPushNotificationsAsync(username);
              StoreGlobal({type:'set',key:'loginId',value:username})
              this.props.navigation.dispatch(resetAction);
            } else {
              //alert(responseJson);
              Alert.alert(
                '현장통',
                responseJson
              )
            }
          }).catch((error) => {
            console.log(error)
          });
  }

  skip() {
    this.props.navigation.navigate("Main");
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior = 'position'  enabled keyboardVerticalOffset={5}>
      <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.inputBoxes}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'아이디'}
            style={styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'패스워드'}
            secureTextEntry={true}
            style={styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>
        <View style={styles.btnBoxes}>
          <View style={{marginBottom:20,alignSelf:'center'}}>
            <Text
              onPress={() => navigation.navigate("Signup")}
              style={{textDecorationLine:'underline'}}
              >
              회원 가입
            </Text>
          </View>
          <View style={{width:200}}>
            <Button
              title={'로그인'}
              color='#cc0404'
              onPress={this.onLogin.bind(this)}
            />
          </View>
        </View>
      </View>
      </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
