import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Some2 extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>Some2</Text>
      </View>
    );
  }
}
export default Some2;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
