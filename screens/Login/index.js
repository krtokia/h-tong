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
  Text
} from 'react-native';

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/logo.png");

import styles from './styles.js';

export default class App extends Component {
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
    const { userId, userPass } = this.state;

        fetch('http://13.124.127.253/api/login.php', {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: userId,
              pw: userPass
            })
        }).then((response) => response.json())
          .then((responseJson)=> {
            if(responseJson === 'data matched') {
              this.props.navigation.navigate("TabNavi");
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
          this.props.navigation.navigate("TabNavi");
          return this.props.navigation.dispatch(
            NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: "TabNavi"})]
            })
          );
        } else {
          Alert.alert("아이디나 패스워드를 입력해주세요");
        }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.inputBoxes}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
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
              Signup
            </Text>
          </View>
          <View style={{width:200}}>
            <Button
              title={'Login'}
              color='#cc0404'
              onPress={this.onLogin.bind(this)}
            />
          </View>
        </View>
      </View>
      </ImageBackground>
    );
  }
}
