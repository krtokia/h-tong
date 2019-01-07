import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
  Modal
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
   Textarea
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import { StoreGlobal } from '../../App';

import styles from './styles.js';

class TongSetting extends Component{

  constructor(props) {
    super(props);

    this.setToggleSwitch = this.setToggleSwitch.bind(this);
    this.setState = this.setState.bind(this);

    this.state = {
      modal: false,
      toggleSwitch: false,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'})
    }
  }

  deleteMember = () => {
    const { memId, tongnum } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongMembers.php?action=deleteMembers';
    const formData = new FormData();
    formData.append('tongnum', tongnum);
    formData.append('tongMemId', memId)

    options = {
      method: 'POST',
      body: formData,
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          Alert.alert("현장통","탈퇴 되었습니다.")
          this.props.navigation.navigate("Home")
        } else {
          //alert(responseJson);
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  tongExit(tType) {
    const TongType = tType === 'T' ? "현장" : "커뮤니티";
    Alert.alert(
      TongType+"통 탈퇴",
      "이 "+TongType+"통을 탈퇴하시겠습니까?",
      [
        {text: "예", onPress: this.deleteMember},
        {text: "아니오", style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  setToggleSwitch(bool) {
    this.setState({toggleSwitch:bool})
    console.log("toggleSwitch: "+this.state.toggleSwitch)
  }

  static navigationOptions = ({
      header: null,
    });
  render(){
    {/*
    const TongType = this.props.navigation.getParam('tongType');
    */}
    const TongType = StoreGlobal({type:'get',key:'tType'});
    return (
      <Container>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState(!this.state.modal);
          }}>
          <TongReport
            setStateParent={this.setState}
            TongType={TongType}
          />
        </Modal>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>설정</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>

          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
        <View style={{paddingBottom:10}}>
        {TongType === 'T' &&
          <View style={[styles.Box2,{paddingVertical:0,marginTop:10}]}>
            <ListItem name="신규채용자 서류" href={() => {this.props.navigation.navigate('TongPaper')}} />
            <ListItem name="개인제출 서류" href={() => {this.props.navigation.navigate('TongPaper2')}} />
          </View>
        }
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>알림 설정</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItemToggle
              name="알림"
              switch={this.state.toggleSwitch}
              parentMethod={this.setToggleSwitch}
              href={() => {this.props.navigation.navigate('Notice')}}
            />
          </View>
          <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
            <Text>일반</Text>
          </View>
          <View style={[styles.Box2,{paddingVertical:0}]}>
            <ListItem
              name="관리자 설정"
              href={() => {this.props.navigation.navigate('TongAdmin')}}
            />
            <ListItem
              name={TongType === "T" ? "현장통 탈퇴" : "커뮤니티통 탈퇴"}
              href={() => {this.tongExit(TongType)}}
            />
            <ListItem
              name={TongType === "T" ? "현장통 신고" : "커뮤니티통 신고"}
              href={() => {this.setState({modal:true})}}
            />
          </View>
      </View>
        </Content>
      </Container>
    );
  }
}
export default TongSetting;

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

class ListItemToggle extends Component{
  constructor(props) {
    super(props);
    this.state = {
      switch: this.props.switch,
    }
  }
  setToggle = () => {this.props.parentMethod(!this.state.switch),this.setState({switch:!this.state.switch})}
  render(){
    return (
      <TouchableOpacity onPress={this.setToggle}>
      <View style={{flexDirection:'row',backgroundColor:'#fff',height:40,borderBottomWidth:1,borderBottomColor:'#e9e9e9',paddingVertical:5,paddingHorizontal:10}}>
        <Left>
          <Text style={{fontSize:14}}>{this.props.name}</Text>
        </Left>
        <Right>
          <Switch
            onValueChange={this.setToggle}
            value={this.props.switch}
          />
        </Right>
      </View>
      </TouchableOpacity>
    )
  }
}

class TongReport extends Component {
  render(){
    const TongType = this.props.TongType === 'T' ? "현장" : "커뮤니티";
    return (
      <View style={[styles.center,{flex:1,backgroundColor:'#0008'}]}>
        <TouchableOpacity style={{flex:1,width:'100%'}} onPress={() => {this.props.setStateParent({modal:false})}} />
        <View style={[styles.Box,{flex:2,width:'80%',padding:0,borderRadius:20,}]}>
          <View style={[styles.center,{height:40,backgroundColor:'#db3928',borderTopStartRadius:20,borderTopEndRadius:20}]}>
            <Text style={{color:'#fff',fontSize:15,fontWeight:'bold'}}>{TongType}통 신고</Text>
          </View>
          <View style={{flex:1,padding:10}}>
            <Text style={{fontSize:13}}>신고 내용을 입력해주세요.</Text>
            <Textarea
              style={{height:'60%',marginVertical:10,borderWidth:1,borderColor:'#e9e9e9',padding:5,fontSize:13}}
              placeholder="신고내용 입력"
            />
            <View style={{alignSelf:'center',width:100}}>
              <Button transparent block rounded
                style={{backgroundColor:'#db3928'}}
                onPress={() => {this.props.setStateParent({modal:false})}}
              >
                <Text style={{color:'#fff',fontSize:15}}>신고하기</Text>
              </Button>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{flex:1,width:'100%'}} onPress={() => {this.props.setStateParent({modal:false})}} />
      </View>
    )
  }
}

const style = StyleSheet.create({

})
