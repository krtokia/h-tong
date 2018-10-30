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
   Header,
   Left,
   Right,
   Body,
   Button,
   Icon,
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from './styles.js';

class Settings extends Component{
  static navigationOptions = ({
      header: null
    });
  render(){
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>설정</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>
            <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
              <Icon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
        <View style={{paddingBottom:10}}>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem
              name="현장통 공지사항"
              href={() => {this.props.navigation.navigate('Notice')}}
            />
            <ListItem
              name="공개범위 설정"
              href={() => {this.props.navigation.navigate('Notice')}}
            />
          </View>
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>알림 설정</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem name="알림" href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name="현장통별 알림" href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name="알림 문제 확인" href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name="이메일 알림" href={() => {this.props.navigation.navigate('Notice')}} />
          </View>
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>일반</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem name="피드관리" href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name="번역 설정" href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name="글씨 크기" href={() => {this.props.navigation.navigate('Notice')}} />
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login')}}>
              <View style={{flexDirection:'row',backgroundColor:'#fff',height:40,borderBottomWidth:1,borderBottomColor:'#e9e9e9',paddingVertical:5,paddingHorizontal:10}}>
                <Left>
                  <Text style={{fontSize:14,color:'#db3928'}}>로그아웃</Text>
                </Left>
                <Right>
                  <Icon name="sign-out" type="FontAwesome" style={{color:'#db3928'}} />
                </Right>
              </View>
            </TouchableOpacity>
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
      <TouchableOpacity onPress={this.props.href}>
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
