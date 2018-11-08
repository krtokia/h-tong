import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity, Alert } from 'react-native';
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

import { StoreGlobal } from '../../App';

class TongPeople extends Component{
  constructor(props) {
    super(props);

    this.state = {
      searchTxt: null,
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      dataSource: null,
    }
  }

  getFriend = async() => {
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=selectMembers&seq=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        console.log(this.state.dataSource)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getFriend()
  }

  attendCheck(name) {
    Alert.alert(
      '출근 체크',
      name+' 출근 체크 하시겠습니까?',
      [
        {text: '확인', onPress: () => console.log(name,'확인')},
        {text: '취소', onPress: () => console.log(name,'취소')},
      ],
      { cancelable: false }
    )
  }
  render(){
    return (
      <Container>
        <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <Left style={{flex:1}}>
          </Left>
          <Body style={{flex:1,alignItems:'center'}}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>전체동료</Text>
          </Body>
          <Right  style={{flex:1}}>
          </Right>
        </Header>
        <Content
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',padding:10,}}>
            <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'rgba(0,0,0,0.1)'}}>
              <Input placeholder='동료 검색' style={{paddingLeft:30}}  onChangeText={(searchTxt) => this.setState({ searchTxt })}/>
              <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}}>
                <Icon name="search" onPress={this.getFriend} />
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
          <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>현장 전체 동료 (159)</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            <TongFriendList2
              name="안민웅1"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
              attend = {true}
              parentMethod = {this.attendCheck}
              attendRequest = {true}
            />
            <TongFriendList2
              name="안민웅2"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
              attend = {false}
              parentMethod = {this.attendCheck}
              attendRequest = {false}
            />
            <TongFriendList2
              name="안민웅3"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
              attend = {false}
              parentMethod = {this.attendCheck}
              attendRequest = {false}
            />
            <TongFriendList2
              name="안민웅4"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
              attend = {false}
              parentMethod = {this.attendCheck}
              attendRequest = {true}
            />
            <TongFriendList2
              name="안민웅5"
              type="직종"
              detailHref={() => {this.props.navigation.navigate('FriendDetail')}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom')}}
              attend = {false}
              parentMethod = {this.attendCheck}
              attendRequest = {true}
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
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../../assets/images/profile_no.png')} style={styles.friendThumbnail} />
            <Text style={styles.friendName}>{this.props.name}</Text>
            <Text style={styles.friendInfo}>{this.props.type}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:10}}>
            <Button transparent style={styles.friendChatBtn} onPress={this.props.chatHref}>
              <Icon name="commenting-o" type="FontAwesome" style={styles.friendChat} />
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
class TongFriendList2 extends Component{
  attendCheckParent = () => {
    this.props.parentMethod(this.props.name);
  }

  createIcon() {
    if (this.props.attendRequest) {
      if (this.props.attend) {
        return <Icon name="check-circle" type="FontAwesome" style={{color: '#00f'}} />
      } else {
        return <Icon name="exclamation-circle" type="FontAwesome" style={{color: '#db3928'}} />
      }
    } else {
      return <Icon name="minus-circle" type="FontAwesome" style={{color: '#aaa'}} />
    }
  }
  render() {
    const attendIcon = this.createIcon();
    return(
      <TouchableOpacity onPress={this.props.detailHref}>
        <View style={styles.friendList}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../../assets/images/profile_no.png')} style={styles.friendThumbnail} />
            <Text style={styles.friendName}>{this.props.name}</Text>
            <Text style={styles.friendInfo}>{this.props.type}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:10}}>
            <Button transparent style={styles.friendChatBtn} onPress={this.props.chatHref}>
              <Icon name="commenting-o" type="FontAwesome" style={styles.friendChat} />
            </Button>
            <Button transparent style={[styles.friendChatBtn]} onPress={this.attendCheckParent}>
              {attendIcon}
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
export default TongPeople;
