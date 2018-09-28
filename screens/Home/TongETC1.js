import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Image,
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

class TongETC1 extends Component{
  render(){
    return (
      <Container>
      <Header style={styles.HeaderStyle}>
        <ImageBackground source={require('../../assets/images/testImages/4.jpg')} style={styles.ImageHeader} >
        <Left style={[styles.LeftStyle]}>
          <Button
            transparent
            onPress={() => this.props.navigation.goBack()}
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
              <Text style={{fontSize:15,textDecorationLine:'underline'}}>맴버 1 초대</Text>
            </Left>
            <Right>
              <Button small rounded success><Text>글쓰기</Text></Button>
            </Right>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongETC1;
