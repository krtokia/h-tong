import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Some4 extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>Some4</Text>
      </View>
    );
  }
}
export default Some4;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
