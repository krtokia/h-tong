import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Some1sub extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>some1sub</Text>
      </View>
    );
  }
}
export default Some1sub;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
