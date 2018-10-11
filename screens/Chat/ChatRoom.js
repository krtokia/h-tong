import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity,ScrollView } from 'react-native';
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
  Footer,
} from 'native-base';

import styles from './styles.js';

class ChatRoom extends Component{

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff",flexDirection:'column-reverse',flex:1}}
        >
            <GetDisplay name="홍길동" info="" time="오후 5:18"
              content={`식사는 하셨나요?`} />
            <SendDisplay info="" time="오후 5:18"
              content={`식사는 하셨나요?`} />
        </Content>
        <Footer>
          <View style={{flex:1,backgroundColor:'#f9f9f9',flexDirection:'row'}}>
            <View style={{flex:1.2,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity>
                <Icon name="plus-circle" type="FontAwesome" style={{fontSize:40,color:'#555',marginLeft:5}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:9,justifyContent:'center',alignItems:'center'}}>
              <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'rgba(0,0,0,0.1)',justifyContent:'center'}}>
                <Input placeholder='채팅 입력' style={{paddingLeft:30,fontSize:13}} />
                <Icon name="ios-arrow-dropup-circle" style={{color:'#db3928',fontSize:30}} />
              </Item>
            </View>
          </View>
        </Footer>
      </Container>
    );
  }
}
export default ChatRoom;

class GetDisplay extends Component{
  render() {
    return(
        <View style={[styles.chatBase,{alignItems:'flex-start'}]}>
          <Image source={require('../../assets/images/profile_no.png')} style={[styles.chatThumbnail,{marginLeft:10}]} />
          <View style={{marginLeft:10,height:'100%',maxWidth:'65%'}}>
            <Text style={[styles.chatName,{fontSize:13}]}>{this.props.name}</Text>
            <View style={styles.chatBox}>
              <Text style={styles.chatContent}>{this.props.content}</Text>
            </View>
          </View>
          <View style={{marginLeft:10,width:'15%',justifyContent:'flex-end',height:'100%'}}>
            <Text style={{fontSize:12,color:'yellow'}}>{this.props.info}</Text>
            <Text style={{fontSize:12,color:'#aaa',marginTop:10}}>{this.props.time}</Text>
          </View>
        </View>
    )
  }
}

class SendDisplay extends Component{
  render() {
    return(
        <View style={[styles.chatBase,{flexDirection:'row-reverse'}]}>
          <View style={[styles.chatBox,{marginRight:10}]}>
            <Text style={styles.chatContent}>{this.props.content}</Text>
          </View>
          <View style={{marginRight:10,width:'15%',justifyContent:'flex-end',height:'100%'}}>
            <Text style={{fontSize:12,color:'#aaa',marginTop:10}}>{this.props.time}</Text>
          </View>
        </View>
    )
  }
}
