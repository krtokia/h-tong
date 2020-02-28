import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
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
import axios from 'axios';
import { StoreGlobal } from '../../App';


class Chat extends Component{
  constructor(props) {
    super(props);
    this.state = {
      toId: this.props.navigation.getParam('friendId'),
      memId: StoreGlobal({type:'get',key:'loginId'}),
      isLoading : true,
      searchTxt: null,
      isLoading2: true,
      dataSource: null,
      dataSource2: [],
      count2: 0,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.getMyChat();
  }

  componentDidUpdate(prevProps) {
    if(this.props.navigation.getParam('refresh') !== prevProps.navigation.getParam('refresh')) {
      this.getMyChat()
    }
  }

  getMyChat = async() => {
    return fetch('http://h-tong.kr/api/myChat.php?user=' + this.state.memId)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isLoading: false,
            dataSource: responseJson,
            count: Object.keys(responseJson).length,
            refreshing: false
          });
        } else {
          this.setState({
            isLoading: false,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchChat = async() => {
    return fetch('http://h-tong.kr/api/searchChat.php?user=' + this.state.memId + '&keyword=' + this.state.searchTxt)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isLoading2: false,
  		      dataSource2: responseJson,
  		      count2: Object.keys(responseJson).length,
          });
        } else {
          this.setState({
            isLoading2: false,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getMyChat()
  }

  render(){
    let fvalue
    if (this.state.dataSource) {
      fvalue = this.state.dataSource.map((data, key) => {
        return <View key={key}>
            { data.toId !== this.state.memId &&
              <ChatList
                name={data.toId}
                recent={data.message}
                time={data.date}
                chatHref={() => {this.props.navigation.navigate('ChatRoom', {friendId:data.toId,refresh:Date(Date.now()).toString()})}}
              />
            }
          </View>
      });
    } else {
      fvalue = <View />
    }
    let fvalue2 = this.state.dataSource2.map((data, key) => {
      return <View key={key}>
        { data.toId !== this.state.memId &&
          <ChatList
            name={data.toId}
            recent={data.message}
            time={data.date}
            chatHref={() => {this.props.navigation.navigate('ChatRoom', {friendId:data.toId,refresh:Date(Date.now()).toString()})}}
          />
        }
        </View>
    });
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={{backgroundColor:'#f9f9f9'}}
      >
          <View style={{width:'100%',padding:10,}}>
            <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'#aaa1'}}>
              <Input placeholder='채팅 검색' style={{paddingLeft:30}}  onChangeText={(searchTxt) => this.setState({ searchTxt })}/>
              <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}} onPress={this.searchChat}>
                <Icon name="search" />
              </Button>
            </Item>
          </View>
          <Text style={{marginTop:10,marginLeft:10,fontSize:13}}>검색 된 채팅 ({this.state.count2})</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            {fvalue2}
          </View>
          <Text style={{marginTop:10,marginLeft:10,fontSize:13}}>채팅 목록 ({this.state.count})</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            {fvalue}
          </View>
      </ScrollView>
    );
  }
}
export default Chat;

class ChatList extends Component{
  render() {
    var uri = 'profile_no.png';
    if(this.props.photo) {
      uri = this.props.photo
    }
    return(
      <TouchableOpacity onPress={this.props.chatHref}>
        <View style={styles.chatList}>
          <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={styles.chatThumbnail} />
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
