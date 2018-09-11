import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Some1 extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>some1</Text>
      </View>
    );
  }
}
export default Some1;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
