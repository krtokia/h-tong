import React, { Component } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { Font,AppLoading } from 'expo';
import {
  Button,
  Content,
  Container,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles.js';

class Some1 extends Component{

  render(){
    return (
      <Container>
        <Content>
          <View style={{borderBottomWidth:1,borderBottomColor:'#eee',marginBottom:50}}>
            <Button
              block
              transparent
              style={{justifyContent:'space-between',marginTop:10}}
            >
              <Icon name='user-plus' size={25} style={{marginLeft:10}} />
              <RNText style={styles.InviteText}>동료 추가하기</RNText>
              <Icon name='angle-right' size={25} style={{marginRight:10}} />
            </Button>
          </View>
          <View style={{padding: 20,}}>
            <View style={styles.contentHeader}>
              <RNText>멤버</RNText>
              <RNText>이름 순 <Icon name="angle-down" /></RNText>
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
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Some1;
