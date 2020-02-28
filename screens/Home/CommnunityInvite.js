import React, { Component } from 'react';
import { Alert, ToastAndroid, StyleSheet, Image, AppRegistry, ListView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
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

import styles from './styles.js';
import { StoreGlobal } from '../../App';

class CommnunityInvite extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: null,
      isLoading: true,
      isLoading2: false,
      isLoading3: true,
      dataSource: null,
      dataSource2: [],
      count: 0,
      count2: 0,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      refresh: null,

    }
  }
  componentDidMount() {
    this.getFriend();
    this.getIsInvited();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.refresh !== prevState.refresh) {
//      this.state.refresh = prevState.refresh
      this.getFriend()
      this.getIsInvited();
    }
  }

  refresh = refresh => {
    this.setState({refresh})
  }

  getFriend = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=getMyTongFriend&id="+this.state.memId+"&tongnum="+this.state.tongnum)
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

  getIsInvited = () => {
    return fetch("http://13.124.127.253/api/results.php?page=isInvited&id="+this.state.friendId+"&tongnum="+this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading3: false,
  		    isInvited: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchFriend = async() => {
    if(!this.state.searchTxt) {
      Alert.alert('검색어를 입력해주세요.')
      return false;
    }
    this.setState({isLoading2:true})
    return fetch("http://13.124.127.253/api/results.php?page=inviteFriend&txt="+this.state.searchTxt+"&tongnum="+this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          console.log(responseJson)
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

  inviteQuestion = (friendId,friendNm) => {
    Alert.alert('','아이디: '+friendId+'\r\n이름: '+friendNm+'\r\n\r\n위 사람을 초대하시겠습니까?',
      [
        {text:'예',onPress: () => this.inviteFriend(friendId)},
        {text:'아니오'}
      ],
      { cancelable:true }
    )
  }

  inviteFriend(friendId) {
    let apiUrl = 'http://13.124.127.253/api/inviteTong.php?action=inviteCommunity';
    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: friendId,
        inviteId: this.state.memId,
        tongnum: this.state.tongnum,
      })
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          Alert.alert(
            "커뮤니티통",
            "초대했습니다."
          );
          this.getFriend();
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log(error)
      });
  }


  render(){
    if(this.state.isLoading) {
      return <View Style={{flex:1, paddingTop:20}}>
        <ActivityIndicator />
      </View>
    } else if(this.state.isLoading2) {
      return <View Style={{flex:1, paddingTop:20}}>
        <ActivityIndicator />
      </View>
    } else {
      let fvalue
      if (this.state.dataSource) {
    	  fvalue = this.state.dataSource.map((data, key) => {
      		  return <View key={key}>
                <FriendList
                  data={data}
                  name={data.friendNm}
                  type={data.friendJob}
                  detailHref={(friendId,friendNm) => {this.inviteQuestion(friendId,friendNm)}}
                />
              </View>
    	  });
      } else {
        fvalue = <View />
      }
      let fvalue2 = this.state.dataSource2.map((data, key) => {
    		  return <View key={key}>
              <FriendList
                data={data}
                name={data.userNm}
                type={data.jobgroup}
                detailHref={(friendId,friendNm) => {this.inviteQuestion(friendId,friendNm)}}
              />
            </View>
  	  });
      return (
        <Container>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
              <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
                <Icon name="angle-left" type="FontAwesome" />
              </Button>
            </Left>
            <Body style={{flex:5,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>동료 초대</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9",}}
          >
            <View style={{width:'100%',padding:10,}}>
              <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'#aaa1'}}>
                <Input placeholder='동료 검색' style={{paddingLeft:30}}  onChangeText={(searchTxt) => this.setState({ searchTxt })}/>
                <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}} onPress={this.searchFriend}>
                  <Icon name="search"/>
                </Button>
              </Item>
            </View>
  			    <Text style={{marginTop:10,marginLeft:10,marginBottom:5,fontSize:13}}>검색 된 동료 ({this.state.count2})</Text>
            <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
              {fvalue2}
            </View>
            <Text style={{marginTop:10,marginLeft:10,marginBottom:5,fontSize:13}}>내 동료 ({this.state.count})</Text>
            <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
              {fvalue}
            </View>
          </Content>
        </Container>
      );
    }
  }
}

class FriendList extends Component{
  render() {
    var uri = 'profile_no.png';
    if(this.props.data.photo) {
      uri = this.props.data.photo;
    }
    return(
      <TouchableOpacity onPress={() => this.props.detailHref(this.props.data.friendId ? this.props.data.friendId : this.props.data.userId,this.props.name)}>
        <View style={styles.friendList}>
          <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={styles.friendThumbnail} />
          <Text style={styles.friendName}>{this.props.name}</Text>
          <Text style={styles.friendInfo}>{this.props.type}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
export default CommnunityInvite;
