import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Mypage extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>Mypage</Text>
      </View>
    );
  }
}
export default Mypage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
