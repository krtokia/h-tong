import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Login extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>Login</Text>
      </View>
    );
  }
}
export default Login;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
