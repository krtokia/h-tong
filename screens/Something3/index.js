import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Some3 extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>Some2</Text>
      </View>
    );
  }
}
export default Some3;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
