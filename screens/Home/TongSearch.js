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
      count: 0,
      isLoading: true,
      dataSource: null,
      searchTxt: "",
    }
  }

  searchTong = () => {
    this.setState({isLoading: true})
    return fetch("http://13.124.127.253/api/results.php?page=searchTong&searchText="+this.state.searchTxt)
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
            dataSource: responseJson,
            count: 0,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    let tongs;
    if (this.state.dataSource) {
      tongs = this.state.dataSource.map((val,key) => {
        return <View key={key}>
            <TongList
              name={val.tongtitle}
              tongImg={val.tongimg}
              Href={() => {this.props.navigation.navigate('CommunityMain',{search:"Y",itemID:val.tongnum})}}
            />
          </View>
      })
    } else {
      tongs = <View />
    }
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
            <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>전체 커뮤니티 검색</Text>
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
              <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}}
                onPress={this.searchTong}
              >
                <Icon name="search" />
              </Button>
            </Item>
          </View>
          <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>검색 된 통 ({this.state.count})</Text>
          <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
            {tongs}
          </View>
          {/*
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
          */}
        </Content>
      </Container>
    );
  }
}
class TongList extends Component{
  render() {
    let tongimg = this.props.tongimg ? "http://13.124.127.253/images/tongHead/"+this.props.tongimg : "http://13.124.127.253/images/tongHead/noImage.png"
    return(
      <TouchableOpacity onPress={this.props.Href}>
        <View style={[styles.friendList,{justifyContent:'flex-start'}]}>
          <Image source={{uri: tongimg}} style={styles.friendThumbnail} />
          <Text style={styles.friendName}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
export default TongSearch;
