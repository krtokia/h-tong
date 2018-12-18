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
import { GiftedChat } from 'react-native-gifted-chat';
import ActionCable from 'react-native-actioncable';
import axios from 'axios';

class ChatRoom extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      _id: 'tongid',
      text: "test",
      createdAt: new Date(),
      refreshing:true,
    }
  }

  componentWillMount() {
    //this.createSocket();
    this.fetchMessage();
  }

  static navigationOptions = ({
    header: null
  });

  onSend(messages=[]) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.saveChat(messages);
    console.log(messages);
  }

  saveChat(messages) {

    axios.post('http://h-tong.kr/api/saveChat.php', {
      user: messages[0]._id,
      message: messages[0].text,
    })
    .then( response => { } )
    .catch( response => { } )
  }

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
            _id: this.state._id,
          }}
          loadEarlier={this.state.refreshing}
        />
      </Container>
    );
  }

  fetchMessage() {
    console.log("START FETCH");
    axios.get('http://h-tong.kr/api/fetchChat.php')
    .then(res => {
      data_messages = res.data;

      this.setState(prevState => ({
        messages: GiftedChat.prepend(prevState.messages, data_messages),
        refreshing: false,
      }));

    })
    .catch(err => {
      alert(err);
    });1
  }

  createSocket() {
  let cable = ActionCable.createConsumer('ws://10.0.2.2:3001/cable');

  this.chats = cable.subscriptions.create(
    {
      channel: 'ChatChannel'
    },
    {
      connected: () => {
        console.log('Connected!');
      },
      received: (messages) => {
        this.setState(prevState => ({
          messages: GiftedChat.append(prevState.messages, messages)
        }));
      },
      create: function(messages){
        this.perform('create', {content: messages});
      }
    }
  )
  }

}
export default ChatRoom;
