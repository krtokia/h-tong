import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/logo.png");
const deviceHeight = Dimensions.get("window").height;

export default class Signup extends Component {
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
    return (
      <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Login'}
          style={styles.loginBtn}
          onPress={this.onLogin.bind(this)}
        />
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    top: -40,
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    color: "#fff",
    borderColor: 'black',
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: "#A4A4A470",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 0,
  },
  loginBtn: {
    top: -100,
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  background: {
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: "rgba(0,0,0,0.1)"
  },
  logo: {
  flex: 1,
  resizeMode: "contain",
  height:deviceHeight/4,
  alignSelf: "center"
  },
});
