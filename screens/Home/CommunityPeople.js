import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
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

export default class CommunityPeople extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isLoading2: true,
      dataSource2: null,
      searchTxt: null,
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      dataSource: null,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      count: 0,
      count2: 0,
    }
  }

  searchFriend = async() => {
    this.setState({isLoading2: true})
    return fetch("http://13.124.127.253/api/results.php?page=searchTongFriend&name="+this.state.searchTxt+"&tongnum="+this.state.tongnum)
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
            dataSource2: responseJson,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getFriend = async() => {
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=selectMembers&tongnum=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isLoading: false,
            dataSource: responseJson,
            count: Object.keys(responseJson).length,
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
    if(this.state.isLoading) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else {
      var checky;
      let fvalue
      if(this.state.dataSource) {
        fvalue = this.state.dataSource.map((key, val) => {
          if(key.attendYn === "Y") {
            checky = true
          } else {
            checky = false
          }
          return (
            <TongFriendList2
              key={val}
              photo={key.photo}
              name={key.tongMemNm}
              type={key.jobgroup}
              detailHref={() => {this.props.navigation.navigate('FriendDetail',{friendId:key.tongMemId,prevPage:'comm',refresh:Date(Date.now()).toString()})}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom',{friendId:key.tongMemId,refresh:Date(Date.now()).toString()})}}
              attend = {checky}
              parentMethod = {this.attendCheck}
              attendRequest = {true}
            />
          )
        });
      } else {
        fvalue = <View />
      }

      let fvalue2;
      if(this.state.isLoading2) {
        fvalue2 = <View />
      } else {
        if(this.state.dataSource2) {
          fvalue2 = this.state.dataSource2.map((key, val) => {
            if(key.attendYn === "Y") {
              checky = true
            } else {
              checky = false
            }
            return (
              <TongFriendList2
                key={val}
                photo={key.photo}
                name={key.tongMemNm}
                type={key.jobgroup}
                detailHref={() => {this.props.navigation.navigate('FriendDetail',{friendId:key.tongMemId,prevPage:'comm',refresh:Date(Date.now()).toString()})}}
                chatHref={() => {this.props.navigation.navigate('ChatRoom',{friendId:key.tongMemId,refresh:Date(Date.now()).toString()})}}
                attend = {checky}
                parentMethod = {this.attendCheck}
                attendRequest = {true}
              />
            )
          });
        } else {
          fvalue2 = <Text style={{fontSize:13,color:'#999',marginVertical:10}}>검색 결과가 없습니다.</Text>
        }
      }

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
                  <Icon name="search" onPress={this.searchFriend} />
                </Button>
              </Item>
            </View>
            <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>검색 된 동료 ({this.state.count2})</Text>
            <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
              {fvalue2}
            </View>
            <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>커뮤니티 전체 동료 ({this.state.count})</Text>
            <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
              {fvalue}
            </View>
          </Content>
        </Container>
      );
    }
  }
}
class TongFriendList extends Component{
  render() {
    var uri = 'profile_no.png';
    if(this.props.photo) {
      uri = this.props.photo
    }
    return(
      <TouchableOpacity onPress={this.props.detailHref}>
        <View style={styles.friendList}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={styles.friendThumbnail} />
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
    var uri = 'profile_no.png';
    if(this.props.photo) {
      uri = this.props.photo
    }
    return(
      <TouchableOpacity onPress={this.props.detailHref}>
        <View style={[styles.friendList,{justifyContent:'space-between'}]}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={styles.friendThumbnail} />
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
