import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Header,
   Left,
   Right,
   Body,
   Button,
   Icon,
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { StoreGlobal } from '../../App';
import styles from './styles.js';

class Settings extends Component{
  constructor(props) {
    super(props);
    this.state={
      isLoading: false,
    }
  }
  static navigationOptions = ({
      header: null
    });


  expireQuestion = () => {
    let expire = false;
    Alert.alert(
      '',
      "탈퇴 후 같은 아이디로 재가입 불가능합니다.\r\n계속 하시겠습니까?",
      [
        {text: '예', onPress: () => Alert.alert(
                                    '',
                                    "현장통 탈퇴를 진행합니다.",
                                    [
                                      {text: '확인', onPress: () => this.expireTong()},
                                      {text: '취소', onPress: () => expire = false, style: 'cancel'},
                                    ],
                                    { cancelable: true }
                                  )
        },
        {text: '아니오', onPress: () => expire = false, style: 'cancel'},
      ],
      { cancelable: true }
    )
  }
  expireTong() {
    this.setState({isLoading:true})
    const memId = StoreGlobal({type:'get',key:'loginId'})
    let apiUrl = 'http://13.124.127.253/api/deleteMember.php';
    options = {
      method: 'POST',
      body: JSON.stringify({
        id: memId,
      })
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.setState({isLoading:false})
          Alert.alert('탈퇴되었습니다.\r\n이용해 주셔서 감사합니다.')
          this.props.navigation.navigate('Login')
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log("error::",error)
      });
  }
  render(){
    if(this.state.isLoading) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
          <Text style={{fontWeight:'bold',fontSize:15}}>탈퇴 처리가 진행중입니다.</Text>
        </View>
      )
    } else {
    return (
        <Container>
          <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
            <Left style={{flex:1}} />
            <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
              <Text style={{fontSize:20,color:'#fff'}}>설정</Text>
            </Body>
            <Right style={{alignSelf:'flex-end',flex:1}}>
              <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
                <Icon name="close" style={{color:'#fff'}} />
              </Button>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9" }}
          >
          <View style={{paddingBottom:10}}>
            <View style={[styles.Box2,{paddingVertical:0}]}>
              <ListItem
                name="현장통 공지사항"
                href={() => {this.props.navigation.navigate('Notice')}}
              />
  {/*
                <ListItem
                name="공개범위 설정"
                href={() => {this.props.navigation.navigate('None')}}
              />
  */}
            </View>
  {/*
            <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
              <Text>알림 설정</Text>
            </View>
            <View style={[styles.Box2,{paddingVertical:0}]}>
              <ListItem name="알림" href={() => {this.props.navigation.navigate('None')}} />
              <ListItem name="현장통별 알림" href={() => {this.props.navigation.navigate('None')}} />
              <ListItem name="알림 문제 확인" href={() => {this.props.navigation.navigate('None')}} />
              <ListItem name="이메일 알림" href={() => {this.props.navigation.navigate('None')}} />
            </View>
  */}
            <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
              <Text>일반</Text>
            </View>
            <View style={[styles.Box2,{paddingVertical:0}]}>
  {/*
              <ListItem name="피드관리" href={() => {this.props.navigation.navigate('None')}} />
              <ListItem name="번역 설정" href={() => {this.props.navigation.navigate('None')}} />
              <ListItem name="글씨 크기" href={() => {this.props.navigation.navigate('None')}} />\
  */}
              <TouchableOpacity onPress={this.expireQuestion}>
                <View style={{flexDirection:'row',backgroundColor:'#fff',height:40,borderBottomWidth:1,borderBottomColor:'#e9e9e9',paddingVertical:5,paddingHorizontal:10}}>
                  <Left>
                    <Text style={{fontSize:14,color:'#db3928'}}>현장통 탈퇴</Text>
                  </Left>
                  <Right>
                    <Icon name="sign-out" type="FontAwesome" style={{color:'#db3928'}} />
                  </Right>
                </View>
              </TouchableOpacity>
            </View>
        </View>
          </Content>
        </Container>
      );
    }
  }
}
export default Settings;

class ListItem extends Component{
  render(){
    return (
      <TouchableOpacity onPress={this.props.href}>
      <View style={{flexDirection:'row',backgroundColor:'#fff',height:40,borderBottomWidth:1,borderBottomColor:'#e9e9e9',paddingVertical:5,paddingHorizontal:10}}>
        <Left>
          <Text style={{fontSize:14}}>{this.props.name}</Text>
        </Left>
        <Right>
          <Icon name="angle-right" type="FontAwesome" style={{color:'#aaa'}} />
        </Right>
      </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({

})
