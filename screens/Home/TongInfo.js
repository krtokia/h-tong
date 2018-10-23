import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Button,
   Icon,
   Accordion,
   Header,
   Left,
   Right,
   Body
 } from "native-base";

import styles from './styles.js';


class TongInfo extends Component{

  render(){
    return (
      <Container>
        <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <Left style={{flex:1}}>
            <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="angle-left" type="FontAwesome" />
            </Button>
          </Left>
          <Body style={{flex:1,alignItems:'center'}}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:15}}>현장정보</Text>
          </Body>
          <Right  style={{flex:1}}>
          </Right>
        </Header>
        <Content
         style={{backgroundColor:'#f9f9f9'}}
         contentContainerStyle={{ flex: 1 }}>
           <View style={styles.Box}>
            <Text>지도</Text>
           </View>
           <View style={styles.Box}>
            <Text>정보</Text>
           </View>
        </Content>
      </Container>
    );
  }
}
export default TongInfo;
