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
  List,
  ListItem,
  Thumbnail,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

class TongPeople extends Component{
  render(){
    return (
      <Container>
      <Header style={styles.HeaderStyle}>
        <ImageBackground source={require('../../assets/images/testImages/4.jpg')} style={styles.ImageHeader} >
        <Left style={[styles.LeftStyle]}>
          <Button
            transparent
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon active name="angle-left" size={25} />
          </Button>
        </Left>
        <Body />
        </ImageBackground>
      </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
        >

        <View style={styles.Box}>
          <Button
            block
            transparent
            style={{justifyContent:'space-between'}}
            onPress={() => alert('동료 추가하기')}
          >
            <Icon name='user-plus' size={25} style={{marginLeft:10}} />
            <Text style={styles.InviteText}>동료 추가하기</Text>
            <Icon name='angle-right' size={25} style={{marginRight:10}} />
          </Button>
        </View>
        <View style={styles.Box}>
          <View style={styles.contentHeader}>
            <Text>멤버</Text>
            <Text>이름 순 <Icon name="angle-down" /></Text>
          </View>
          <List>
            <ListItem thumbnail style={{marginLeft:0}}>
              <Left>
                <Thumbnail circle source={require('../../assets/images/profile_no.png')} />
              </Left>
              <Body>
                <Text>이름</Text>
                <Text note numberOfLines={1}>설명</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='cog' size={25} style={{color:'#aaa'}}/>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail style={{marginLeft:0}}>
              <Left>
                <Thumbnail circle source={require('../../assets/images/profile_no.png')} />
              </Left>
              <Body>
                <Text>이름</Text>
                <Text note numberOfLines={1}>설명</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='cog' size={25} style={{color:'#aaa'}}/>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail style={{marginLeft:0}}>
              <Left>
                <Thumbnail circle source={require('../../assets/images/profile_no.png')} />
              </Left>
              <Body>
                <Text>이름</Text>
                <Text note numberOfLines={1}>설명</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='cog' size={25} style={{color:'#aaa'}}/>
                </Button>
              </Right>
            </ListItem>
          </List>
        </View>
        </Content>
      </Container>
    );
  }
}
export default TongPeople;
