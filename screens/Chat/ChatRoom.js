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
import { StoreGlobal } from '../../App';

class ChatRoom extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      toId: this.props.navigation.getParam('friendId'),
      memId: StoreGlobal({type:'get',key:'loginId'}),
      refreshing: true,
    }
  }

  componentWillMount() {
    //this.createSocket();
    this.setState({
      messages: [],
    });
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
  }

  saveChat(messages) {
    axios.post('http://h-tong.kr/api/saveChat.php', {
      user: this.state.memId,
      _id: messages[0]._id,
      message: messages[0].text,
      toId: this.state.toId,
    })
    .then( response => { } )
    .catch( response => { } )
  }

  fetchMessage() {
    axios.get('http://h-tong.kr/api/fetchChat.php?user=' + this.state.memId + '&toId=' + this.state.toId)
    .then(res => {
      data_messages = res.data;
      this.setState(prevState => ({
        messages: GiftedChat.prepend(prevState.messages, data_messages),
        refreshing: false,
      }));
    })
    .catch(err => {
      alert(err);
    });
  }

  render(){
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>{this.state.toId}</Text>
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
          loadEarlier={this.state.refreshing}
        />
      </Container>
    );
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
