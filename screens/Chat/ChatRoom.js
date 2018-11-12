import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity,ScrollView } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
  List,
  ListItem,
  Header,
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
import { GiftedChat } from 'react-native-gifted-chat'

class ChatRoom extends Component{
  state = {
    messages: [],
  }
  componmentWillMount() {
    this.setState({
      messages: [
        {
          _id:1,
          text: "test",
          createdAt: new Date(),
          user: {
            _id:2,
            name: 'test2',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
  onSend(messages=[]) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  static navigationOptions = ({
    header: null
  });
  render(){
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>홍길동</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>
            <Button transparent rounded onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <GiftedChat
          placeholder='이곳에 입력해 주세요'
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </Container>
    );
  }
}
export default ChatRoom;
