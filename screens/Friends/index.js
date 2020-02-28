import React, { Component } from 'react';
import { Alert,StyleSheet, Image, AppRegistry, ListView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
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
import { StoreGlobal } from '../../App';

class Friends extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: null,
      isLoading: true,
      isLoading2: false,
      dataSource: null,
      dataSource2: [],
      count: 0,
      count2: 0,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      refreshing: false,
    }
  }
  componentDidMount() {
    this.getFriend();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getFriend()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navigation.getParam('refresh') !== prevProps.navigation.getParam('refresh')) {
      this.getFriend()
    }
  }

  getFriend = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=getMyFriend&id="+this.state.memId)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isLoading: false,
    		    dataSource: responseJson,
    		    count: Object.keys(responseJson).length,
            searchTxt: '',
            refreshing: false
          });
        } else {
          this.setState({
            isLoading: false,
            searchTxt: '',
            dataSource: null,
            count:0,
            refreshing: false,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchFriend = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=searchFriend&name="+this.state.searchTxt)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isLoading2: false,
  		      dataSource2: responseJson,
  		      count2: Object.keys(responseJson).length,
            searchTxt: '',
          });
        } else {
          this.setState({
            isLoading2: false,
            searchTxt: '',
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    let fvalue;
    if (this.state.dataSource) {
  	  fvalue = this.state.dataSource.map((data, key) => {
  		  return <View key={key}>
            <FriendList
              photo={data.photo}
              name={data.friendNm}
              type={data.friendJob}
              detailHref={() => {this.props.navigation.navigate('FriendDetail', {friendId:data.friendId,refresh:Date(Date.now()).toString(),prevPage:'index'})}}
              chatHref={() => {this.props.navigation.navigate('ChatRoom', {friendId:data.friendId,refresh:Date(Date.now()).toString()})}}
            />
          </View>
  	  });
    } else {
      fvalue = <View />
    }
    let fvalue2 = this.state.dataSource2.map((data, key) => {
		  return <View key={key}>
          <FriendList
            photo={data.photo}
            name={data.userNm}
            type={data.jobgroup}
            detailHref={() => {this.props.navigation.navigate('FriendDetail', {friendId:data.userId,refresh:Date(Date.now()).toString(),prevPage:'index'})}}
            chatHref={() => {this.props.navigation.navigate('ChatRoom', {friendId:data.userId,refresh:Date(Date.now()).toString()})}}
          />
        </View>
	  });
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9",}}
          contentContainerStyle={{flex:1}}
        >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
          <View style={{width:'100%',padding:10,}}>
            <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'#aaa1'}}>
              <Input placeholder='동료 검색' style={{paddingLeft:30}}  onChangeText={(searchTxt) => this.setState({ searchTxt })} value={this.state.searchTxt}/>
              <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}}
              onPress={this.state.searchTxt ? this.state.searchTxt.length > 1 ? this.searchFriend : () => Alert.alert('검색어를 입력해주세요.') : () => Alert.alert('검색어를 입력해주세요.')}>
                <Icon name="search"/>
              </Button>
            </Item>
          </View>
			    <Text style={{marginTop:10,marginLeft:10,fontSize:13}}>검색 된 동료 ({this.state.count2})</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            {fvalue2}
          </View>
          <Text style={{marginTop:10,marginLeft:10,fontSize:13}}>관심 동료 ({this.state.count})</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            {fvalue}
          </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

class FriendList extends Component{
  render() {
    var uri = 'profile_no.png';
    if(this.props.photo) {
      uri = this.props.photo
    }
    return(
      <TouchableOpacity onPress={this.props.detailHref}>
        <View style={styles.friendList}>
          <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={styles.friendThumbnail} />
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
export default Friends;
