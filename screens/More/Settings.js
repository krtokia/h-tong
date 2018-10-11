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
   Left,
   Right,
   Body,
   Button,
   Icon,
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from './styles.js';

class Settings extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
        <View style={{paddingBottom:10}}>
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>설정</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem name="내 프로필" />
            <ListItem name="계정 관리" />
          </View>
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>알림 설정</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem name="알림" />
            <ListItem name="현장통별 알림" />
            <ListItem name="알림 문제 확인" />
            <ListItem name="이메일 알림" />
          </View>
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>일반</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem name="피드관리" />
            <ListItem name="번역 설정" />
            <ListItem name="글씨 크기" />
          </View>
      </View>
        </Content>
      </Container>
    );
  }
}
export default Settings;

class ListItem extends Component{
  render(){
    return (
      <TouchableOpacity>
      <View style={{flexDirection:'row',backgroundColor:'#fff',height:40,borderBottomWidth:1,borderBottomColor:'#e9e9e9',paddingVertical:5,paddingHorizontal:10}}>
        <Left>
          <Text style={{fontSize:14}}>{this.props.name}</Text>
        </Left>
        <Right>
          <Icon name="angle-right" type="FontAwesome" style={{color:'#aaa'}} />
        </Right>
      </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({

})
