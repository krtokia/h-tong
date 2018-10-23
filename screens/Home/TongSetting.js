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

class TongSetting extends Component{
  static navigationOptions = ({
      header: null
    });
  render(){
    {/*
    const TongType = this.props.navigation.getParam('tongType');
    */}
    const TongType = 'T';
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>설정</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>

          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
        <View style={{paddingBottom:10}}>
        {TongType === 'T' &&
          <View style={[styles.Box2,{paddingVertical:0,marginTop:10}]}>
            <ListItem name="서류등록" href={() => {this.props.navigation.navigate('TongPaper')}} />
          </View>
        }
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>알림 설정</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem name="알림" href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name="알림 문제 확인" href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name="이메일 알림" href={() => {this.props.navigation.navigate('Notice')}} />
          </View>
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>일반</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem name={TongType === "T" ? "현장통 탈퇴" : "커뮤니티통 탈퇴"} href={() => {this.props.navigation.navigate('Notice')}} />
            <ListItem name={TongType === "T" ? "현장통 신고" : "커뮤니티통 신고"} href={() => {this.props.navigation.navigate('Notice')}} />
          </View>
      </View>
        </Content>
      </Container>
    );
  }
}
export default TongSetting;

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
