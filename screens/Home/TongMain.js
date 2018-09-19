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
  Button
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

class TongMain extends Component{
  static navigationOptions = ({
    header: null,
  });

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
        <Body style={[styles.HeaderBody]}>
          <View style={styles.HeaderLogo}>
            <Text style={styles.HeaderText}>현장통 이름</Text>
          </View>
        </Body>
        </ImageBackground>
      </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <View style={styles.SmallList}>
              <View style={styles.HomeHeader}>
                <RkText>현장통 이름</RkText>
                <RkTextInput style={styles.subMore}>글쓰기</RkTextInput>
                <RkText>맴버 1</RkText>
                <RkText>초대</RkText>
              </View>
            </View>
            <View style={styles.TextList}>
                <Row style={styles.HomeItems}>
                  <Text style={styles.SmallText}>날씨</Text>
                </Row>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongMain;
