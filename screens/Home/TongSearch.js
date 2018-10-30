import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';
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
} from 'native-base';

import styles from "./styles";

class TongSearch extends Component{
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render(){
    return (
      <Container>
        <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <Left style={{flex:1}}>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
              onPress={() => {this.props.navigation.goBack()}}
            >
              <Icon name="angle-left" type="FontAwesome" style={{color:'#fff'}} />
            </TouchableOpacity>
          </Left>
          <Body style={{flex:4,alignItems:'center'}}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>전체 통 검색</Text>
          </Body>
          <Right  style={{flex:1}}>
          </Right>
        </Header>
        <Content
          contentContainerStyle={{ flex: 1 }}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',padding:10,}}>
            <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'rgba(0,0,0,0.1)'}}>
              <Input placeholder='동료 검색' style={{paddingLeft:30}}  onChangeText={(searchTxt) => this.setState({ searchTxt })}/>
              <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}}>
                <Icon name="search" />
              </Button>
            </Item>
          </View>
          <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>검색 된 동료 (159)</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            <TongFriendList
              name="안민웅"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
          </View>
          <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>내 동료 (159)</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            <TongFriendList
              name="안민웅"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
            <TongFriendList
              name="안민웅"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
class TongFriendList extends Component{
  render() {
    return(
      <TouchableOpacity onPress={this.props.detailHref}>
        <View style={styles.friendList}>
          <Image source={require('../../assets/images/profile_no.png')} style={styles.friendThumbnail} />
          <Text style={styles.friendName}>{this.props.name}</Text>
          <Text style={styles.friendInfo}>{this.props.type}</Text>
          <Button transparent style={styles.friendChatBtn} onPress={this.props.chatHref}>
            <Icon name="commenting-o" type="FontAwesome" style={styles.friendChat} />
          </Button>
        </View>
      </TouchableOpacity>
    )
  }
}
export default TongSearch;
