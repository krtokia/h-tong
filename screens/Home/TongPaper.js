import React, { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
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
  H3,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

class TongPaper extends Component{
  render(){
    return (
      <Container>
        <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <Left style={{flex:1}}>
          </Left>
          <Body style={{flex:1,alignItems:'center'}}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>서류</Text>
          </Body>
          <Right  style={{flex:1}}>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={[styles.container,{marginTop:70}]}>
            <Image source={require('../../assets/images/logo.png')} style={styles.CreateTongLogo} />
            <View style={{marginTop:20,alignItems:'center'}}>
              <H3>현장 서류를 확인하세요</H3>
            </View>
            <View style={{marginTop:20,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <View style={{width:100,height:120,marginHorizontal:10,alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/createTong1.png')} />
                <Text>채용자 서류</Text>
              </View>
              <View style={{width:100,height:120,marginHorizontal:10,alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/createTong2.png')} />
                <Text>개인제출서류</Text>
              </View>
            </View>
            <View style={{marginTop:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Button iconLeft rounded style={{backgroundColor:'#db3928',paddingHorizontal:50,paddingVertical:20,alignItems:'center'}}
                onPress={() => {this.props.navigation.navigate('createTong2')}}>
                <Image source={require('../../assets/images/addButton.png')} />
                <Text style={{color:'#fff',fontSize:20}}> 만들기</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongPaper;
