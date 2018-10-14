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
          <Text style={{marginTop:10,marginLeft:10,fontSize:13}}>검색 채팅 (159)</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            <ChatList
              name="안민웅"
              recent="식사는 하셨나요?"
              time="오후 5:18"
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
          </View>
          <Text style={{marginTop:10,marginLeft:10,fontSize:13}}>채팅 목록 (159)</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            <ChatList
              name="안민웅"
              recent="식사는 하셨나요?"
              time="오후 5:18"
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
            <ChatList
              name="안민웅"
              recent="식사는 하셨나요?"
              time="오후 5:18"
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
            <ChatList
              name="안민웅"
              recent="식사는 하셨나요?"
              time="오후 5:18"
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
            <ChatList
              name="안민웅"
              recent="식사는 하셨나요?"
              time="오후 5:18"
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
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
      <TouchableOpacity onPress={this.props.chatHref}>
        <View style={styles.chatList}>
          <Image source={require('../../assets/images/profile_no.png')} style={styles.chatThumbnail} />
          <View style={{marginLeft: 15}}>
            <Text style={styles.chatName}>{this.props.name}</Text>
            <Text style={styles.chatInfo}>{this.props.recent}</Text>
          </View>
          <View style={styles.chatTime}>
            <Text style={styles.chatInfo}>{this.props.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
