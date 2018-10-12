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
   Card,
   CardItem,
   Right,
   Body,
   Button,
   Icon,
   Accordion,
   Item,
   Input
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from './styles.js';

class Invite extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',}}>
            <Button small iconLeft transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='angle-left' type="FontAwesome" style={{color:'#030303'}} />
              <Text style={{color:'#030303'}}>초대받은 초대장</Text>
            </Button>
          </View>
          <View style={[styles.Box,{marginTop:0}]}>
            <View style={{width:'100%',paddingBottom:20,borderBottomWidth:1,borderColor:'#f9f9f9'}}>
              <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'#0000'}}>
                <Input placeholder='초대장 검색' style={{paddingLeft:30,fontSize:13}} placeholderTextColor="#c9c9c9" />
                <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#fff'}}>
                  <Icon name="search" style={{color:'#db3928'}} />
                </Button>
              </Item>
            </View>
            <View style={{flexDirection:'row',flexWrap:'wrap',width:'100%',}}>
              <View style={styles.inviteItem}>
                <Image source={require('../../assets/images/testImages/1.jpg')} style={styles.inviteImg} />
                <View style={styles.inviteTextBox}>
                  <Text style={{fontSize:13}}>현장통1</Text>
                  <Icon name="plus-circle" type="FontAwesome" style={{fontSize:20,color:'#db3928'}} />
                </View>
              </View>
              <View style={styles.inviteItem}>
                <Image source={require('../../assets/images/testImages/1.jpg')} style={styles.inviteImg} />
                <View style={styles.inviteTextBox}>
                <Text style={{fontSize:13}}>현장통1</Text>
                <Icon name="plus-circle" type="FontAwesome" style={{fontSize:20,color:'#db3928'}} />
                </View>
              </View>
              <View style={styles.inviteItem}>
                <Image source={require('../../assets/images/testImages/1.jpg')} style={styles.inviteImg} />
                <View style={styles.inviteTextBox}>
                <Text style={{fontSize:13}}>현장통1</Text>
                <Icon name="plus-circle" type="FontAwesome" style={{fontSize:20,color:'#db3928'}} />
                </View>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Invite;

const style = StyleSheet.create({

})
