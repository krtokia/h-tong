import React, { Component } from 'react';
import {
  Alert,
  Button,
  TextInput,
  View,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-navigation';

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/loginLogo.png");

import styles from './styles';
import { StoreGlobal } from '../../App';

import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'http://h-tong.kr/api/push-token.php';

async function registerForPushNotificationsAsync() {
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
        username: 'Brent',
      },
    }),
  });
}

registerForPushNotificationsAsync();

export default class Signup extends Component {
  static navigationOptions = ({
    headerStyle: {
      backgroundColor:'rgba(0,0,0,0)',
      marginBottom:(StatusBar.currentHeight+Header.HEIGHT)*-1
    },
    headerTitle: null,
    headerRight: null,
  });

  constructor(props){
    super(props);

    this.state={
      userId: '',
      userPass: '',
      userName: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    for (const key in event) {
      console.log(key + " : " + event[key])
    }
  }

  onLogin() {
    const { userId, userPass, userName } = this.state;

        fetch('http://13.124.127.253/api/signup.php', {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: userId,
              pw: userPass,
              name: userName
            })
        }).then((response) => response.json())
          .then((responseJson)=> {
            if(responseJson === 'success') {
              Alert.alert(
                '현장통',
                "가입이 완료 되었습니다"
              )
              StoreGlobal({type:'set',key:'loginId',value:userId})
              this.props.navigation.navigate("HomeMore");
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

        if (this.props.valid) {
          this.props.navigation.goBack();
        } else {
          Alert.alert("All the fields are compulsory!")
        }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior = 'padding'  enabled>
      <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.inputBoxes}>
          <TextInput
            value={this.state.userName}
            onChangeText={(userName) => this.setState({ userName })}
            placeholder={'이름'}
            style={styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
          <TextInput
            value={this.state.userId}
            onChangeText={(userId) => this.setState({ userId })}
            placeholder={'아이디'}
            style={styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
          <TextInput
            value={this.state.userPass}
            onChangeText={(userPass) => this.setState({ userPass })}
            placeholder={'패스워드'}
            secureTextEntry={true}
            style={styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>
        <View style={styles.btnBoxes}>
          <View style={{width:200}}>
            <Button
              title={'가입하기'}
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
