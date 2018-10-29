import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity, Text } from 'react-native';
import {
  Container,
  Content,
  View,
  H1,
  H3,
  Button,
  Icon as NBIcon,
  Header,
  Left,
  Body,
  Right
} from "native-base";

import Icon from 'react-native-vector-icons/FontAwesome';

import { ImagePicker } from 'expo';
import styles from "./styles";

class createTong extends Component{
  static navigationOptions = ({
    header: null
  });
  render(){
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928'}}>
          <Left />
          <Body />
          <Right style={{alignSelf:'flex-end'}}>
            <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
              <NBIcon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={[styles.container,{marginTop:70}]}>
            <Image source={require('../../assets/images/logo.png')} style={styles.CreateTongLogo} />
            <View style={{marginTop:20,alignItems:'center'}}>
              <H3>만들고 싶은 모임을 선택하세요.</H3>
              <Text>현장직 동료들과 함께하는 공간</Text>
            </View>
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#db3928'}}>현장통 활용법 보기 <Icon name='angle-right' size={15} style={{color:'#cc0404'}} /></Text>
            </View>
            <View style={{marginTop:20,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('createTong2', {tongType: 'T'})}}
              >
              <View style={{width:100,height:120,marginHorizontal:10,alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/createTong1.png')} />
                <Text>현장통 생성</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('createTong2', {tongType: 'C'})}}
              >
              <View style={{width:100,height:120,marginHorizontal:10,alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/createTong2.png')} />
                <Text>커뮤니티 생성</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default createTong;
