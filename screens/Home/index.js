import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Home extends Component{
  render(){
    return (
      <View style={style.container}>
        <Text>Home</Text>
      </View>
    );
  }
}
export default Home;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
