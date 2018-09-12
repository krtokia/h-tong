import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/logo.png");

import styles from './styles';

export default class Signup extends Component {
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
              this.props.navigation.navigate("Login");
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
      <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.inputBoxes}>
          <TextInput
            value={this.state.userName}
            onChangeText={(userName) => this.setState({ userName })}
            placeholder={'Username'}
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
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>
        <View style={styles.btnBoxes}>
          <View style={{width:200}}>
            <Button
              title={'Sign-In'}
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
