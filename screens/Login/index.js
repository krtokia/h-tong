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
  StatusBar
} from 'react-native';
import { Header } from 'react-navigation';

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/loginLogo.png");
import { StoreGlobal } from '../../App';
import styles from './styles.js'

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
              console.log(responseJson);
              StoreGlobal({type:'set',key:'loginId',value:username})
              this.props.navigation.navigate("Main");
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
    );
  }
}
