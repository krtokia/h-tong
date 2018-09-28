import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, Image } from 'react-native';
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

class TongMain extends Component{
  render(){
    return (
      <Container>
      <Header style={styles.HeaderStyle}>
        <ImageBackground source={require('../../assets/images/testImages/4.jpg')} style={styles.ImageHeader} >
        <Left style={[styles.LeftStyle]}>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Main')}
            styles={{width:20}}
          >
            <Icon active name="angle-left" size={25} />
          </Button>
        </Left>
        <Body />
        </ImageBackground>
      </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#ccc" }}
        >
          <View style={styles.TongHeader}>
            <Left>
              <H3>현장통 이름</H3>
              <View style={styles.TongSubs}>
                <Text style={{fontSize:14}}>멤버 1</Text>
                <Text style={[styles.TongInvite,{fontSize:14}]}><Icon name="plus-circle" /> 멤버 초대</Text>
              </View>
            </Left>
            <Right>
              <Button small rounded style={{backgroundColor:'#cc0404'}}><Text>글쓰기</Text></Button>
            </Right>
          </View>
          <View style={styles.TongContentBox}>
            <View style={styles.TongContentHeader}>
              <View style={{flexDirection: 'row'}}>
                <Image style={styles.ContentHeaderImg} source={require('../../assets/images/profile_no.png')} />
                <View style={{marginLeft:10}}>
                  <Text style={{fontSize:14,fontWeight:'bold'}}>이름</Text>
                  <Text style={{fontSize:10,color:'#aaa'}}>2018년09월27일</Text>
                </View>
              </View>
              <Icon name='ellipsis-v' size={25} />
            </View>
            <View style={styles.TongContentImgs}>
              <Image style={styles.ContentImg} source={require('../../assets/images/testImages/1.jpg')} />
              <Image style={styles.ContentImg} source={require('../../assets/images/testImages/2.jpg')} />
              <Image style={styles.ContentImg} source={require('../../assets/images/testImages/3.jpg')} />
              <Image style={styles.ContentImg} source={require('../../assets/images/testImages/4.jpg')} />
            </View>
            <View style={styles.TongContentReply}>
              <Text style={styles.ContentReply}>댓글달기 <Icon name='comment' /></Text>
            </View>
          </View>

          <View style={styles.TongContentBox}>
            <View style={styles.TongContentHeader}>
              <View style={{flexDirection: 'row'}}>
                <Image style={styles.ContentHeaderImg} source={require('../../assets/images/profile_no.png')} />
                <View style={{marginLeft:10}}>
                  <Text style={{fontSize:14,fontWeight:'bold'}}>이름</Text>
                  <Text style={{fontSize:10,color:'#aaa'}}>2018년09월27일</Text>
                </View>
              </View>
              <Icon name='ellipsis-v' size={25} />
            </View>
            <View style={styles.TongContentImgs}>
              <Image style={styles.ContentImg} source={require('../../assets/images/testImages/1.jpg')} />
            </View>
            <View style={styles.TongContentReply}>
              <Text style={styles.ContentReply}>댓글달기 <Icon name='comment' /></Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongMain;
