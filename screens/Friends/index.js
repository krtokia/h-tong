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



class Friends extends Component{

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',padding:10,}}>
            <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'rgba(0,0,0,0.1)'}}>
              <Input placeholder='동료 검색' style={{paddingLeft:30}} />
              <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}}>
                <Icon name="search" />
              </Button>
            </Item>
            <Text style={{marginTop:10,fontSize:13}}>내 동료 (159)</Text>
          </View>
          <View style={[styles.Box,{marginTop:0,paddingTop:0}]}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('FriendDetail')}}>
              <View style={styles.friendList}>
                <Image source={require('../../assets/images/profile_no.png')} style={styles.friendThumbnail} />
                <Text style={styles.friendName}>안민웅</Text>
                <Text style={styles.friendInfo}>직종</Text>
                <Button transparent style={styles.friendChatBtn}>
                  <Icon name="commenting-o" type="FontAwesome" style={styles.friendChat} />
                </Button>
              </View>
            </TouchableOpacity>

          </View>
        </Content>
      </Container>
    );
  }
}
export default Friends;
