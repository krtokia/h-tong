import React, { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  H3,
  Icon
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import { StoreGlobal } from '../../App';
import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

class TongPaper extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(){
    super();
    this.state ={
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      tongname: StoreGlobal({type:'get',key:'tongname'}),
      isLoading: true,
      safe: false,
      agree: false,
      armor: false,
      health: false
    }
  }

  getCount = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=paperCount&id=" + this.state.memId + "&tongnum=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          safe: responseJson ? (responseJson[0].tongSafe > 0 ? true : false) : false,
          agree: responseJson ? (responseJson[0].tongAgree > 0 ? true : false) : false,
          armor: responseJson ? (responseJson[0].tongArmor > 0 ? true : false) : false,
          health: responseJson ? (responseJson[0].tongHealth > 0 ? true : false) : false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getCount();
  }

  render(){
    if(this.state.isLoading) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else {
      return (
        <Container>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
              <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
                <Icon name="angle-left" type="FontAwesome" />
              </Button>
            </Left>
            <Body style={{flex:5,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>신규채용자서류</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
            contentContainerStyle={{flex:1}}
          >
            <View style={[styles.Box,{marginTop:3,paddingBottom:0}]}>
              <PaperList
                paperName="안전관리 서약서"
                paperStatus={this.state.safe}
                Href={() => {this.props.navigation.navigate('TongPaperSafe')}}
              />
              <PaperList
                paperName="개인정보 수립 이용동의서"
                paperStatus={this.state.agree}
                Href={() => {this.props.navigation.navigate('TongPaperAgree')}}
              />
              <PaperList
                paperName="교육이수 및 보호구 수령확인서"
                paperStatus={this.state.armor}
                Href={() => {this.props.navigation.navigate('TongPaperArmor')}}
              />
              <PaperList
                paperName="건강문진표"
                paperStatus={this.state.health}
                Href={() => {this.props.navigation.navigate('TongPaperHealth')}}
              />
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default TongPaper;

class PaperList extends Component{
  render(){
    var fontColor;
    var content;
    if(this.props.paperStatus) {
      fontColor = '#777';
      content = "완료";
    } else {
      fontColor = '#db3928';
      content = "미완료"
    };
    return(
      <TouchableOpacity onPress={this.props.Href}>
      <View style={styles.paperListBox}>
        <View style={{flexDirection:'row'}}>
          <Icon name="file-text-o" type="FontAwesome" style={{fontSize:13}} />
          <Text style={{fontSize:12,marginLeft:5}}>{this.props.paperName}</Text>
        </View>
        <View>
          <Text style={[{fontSize:11,color:fontColor}]}>{content}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}
