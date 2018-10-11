import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Item,
  Input,
  Icon,

} from 'native-base';

import styles from './styles.js';

class Chat extends Component{

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',padding:10,}}>
            <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'rgba(0,0,0,0.1)'}}>
              <Input placeholder='채팅 검색' style={{paddingLeft:30}} />
              <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}}>
                <Icon name="search" />
              </Button>
            </Item>
          </View>
          <View style={[styles.Box,{marginTop:0,paddingTop:0}]}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChatRoom')}}>
              <ChatList />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChatRoom')}}>
              <ChatList />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChatRoom')}}>
              <ChatList />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChatRoom')}}>
              <ChatList />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChatRoom')}}>
              <ChatList />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Chat;

class ChatList extends Component{
  render() {
    return(
        <View style={styles.chatList}>
          <Image source={require('../../assets/images/profile_no.png')} style={styles.chatThumbnail} />
          <View style={{marginLeft: 15}}>
            <Text style={styles.chatName}>안민웅</Text>
            <Text style={styles.chatInfo}>식사는 하셨나요?</Text>
          </View>
          <View style={styles.chatTime}>
            <Text style={styles.chatInfo}>오후 5:18</Text>
          </View>
        </View>
    )
  }
}
