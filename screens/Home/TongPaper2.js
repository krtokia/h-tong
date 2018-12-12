import React, { Component } from 'react';
import { ToastAndroid, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  Icon,
  CheckBox,
  ListItem
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

var fontColor = '#555';

import { StoreGlobal } from '../../App';

class TongPaperAgree extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(){
    super();
    this.state ={
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongNum: StoreGlobal({type:'get',key:'tongnum'}),
      isLoading: true,
      isLoading2: true,
      dataSource: null,
      dataSource2: null,
      _safe: false,
      _idcard: false,
      _bankbook: false,
      _cert: false,
      _machine: false,
      _insp: false,
      _insurance: false,
      _business: false,
      _car: false,
    }
  }

  getPaperInfo = async() => {
    var nullJson = [{
      safe: null,
      idcard: null,
      bankbook: null,
      cert: null,
      machine: null,
      insp: null,
      insurance: null,
      business: null,
      car: null,
    }]
    return fetch("http://13.124.127.253/api/results.php?page=userPaperGet&div=paper&id=" + this.state.memId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
          isLoading: false,
          dataSource: responseJson ? responseJson : nullJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getCheckInfo = async() => {
    var nullJson = [{
      _safe: false,
      _idcard: false,
      _bankbook: false,
      _cert: false,
      _machine: false,
      _insp: false,
      _insurance: false,
      _business: false,
      _car: false,
    }]
    return fetch("http://13.124.127.253/api/results.php?page=userPaperGet&div=check&id=" + this.state.memId + "&tongNum=" + this.state.tongNum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading2: false,
          _safe: responseJson ? (responseJson[0]['_safe'] == "1" ? true : false) : false,
          _idcard: responseJson ? (responseJson[0]['_idcard'] == "1" ? true : false) : false,
          _bankbook: responseJson ? (responseJson[0]['_bankbook'] == "1" ? true : false) : false,
          _cert: responseJson ? (responseJson[0]['_cert'] == "1" ? true : false) : false,
          _machine: responseJson ? (responseJson[0]['_machine'] == "1" ? true : false) : false,
          _insp: responseJson ? (responseJson[0]['_insp'] == "1" ? true : false) : false,
          _insurance: responseJson ? (responseJson[0]['_insurance'] == "1" ? true : false) : false,
          _business: responseJson ? (responseJson[0]['_business'] == "1" ? true : false) : false,
          _car: responseJson ? (responseJson[0]['_car'] == "1" ? true : false) : false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getPaperInfo();
    this.getCheckInfo();
  }

  defineKey(str) {
    switch (str) {
      case "safe" : return "안전교육증";
      case "idcard" : return "신분증";
      case "bankbook" : return "통장사본";
      case "cert" : return "자격증";
      case "machine" : return "장비등록증";
      case "insp" : return "장비검사증";
      case "insurance" : return "장비보험증";
      case "business" : return "사업자등록증";
      case "car" : return "자동차등록증";
    }
  }

  tongPaperUpdate = () => {
    const { tongNum, memId, _safe, _idcard, _bankbook, _cert, _machine, _insp, _insurance, _business, _car } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongPaper2.php?';

    const formData = new FormData();

    formData.append('tongNum', tongNum);
    formData.append('userId', memId);
    formData.append('_safe', _safe ? 1 : 0);
    formData.append('_idcard', _idcard ? 1 : 0);
    formData.append('_bankbook', _bankbook ? 1 : 0);
    formData.append('_cert', _cert ? 1 : 0);
    formData.append('_machine', _machine ? 1 : 0);
    formData.append('_insp', _insp ? 1 : 0);
    formData.append('_insurance', _insurance ? 1 : 0);
    formData.append('_business', _business ? 1 : 0);
    formData.append('_car', _car ? 1 : 0);

    options = {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    }


    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          ToastAndroid.show("저장 되었습니다.", ToastAndroid.BOTTOM)
          this.props.navigation.goBack();
        } else {
          //alert(responseJson);
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  render(){
    if (this.state.isLoading) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } if (this.state.isLoading2) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      var dataArr = Object.keys(this.state.dataSource[0]);
      let papers = dataArr.map((data, key) => {
        var keyName = this.defineKey(data);
        if(keyName) {
          return <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]} key={key}>
            <View style={styles.Row}>
              <Icon name="file-text-o" type="FontAwesome" style={{color:fontColor,fontSize:11}} />
              <Text style={{fontSize:13}}> {keyName}</Text>
            </View>
            <View style={styles.Row}>
              <Text style={{fontSize:10,color:this.state.dataSource[0][data] ? fontColor : '#db3928'}}>{this.state.dataSource[0][data] ? "있음" : "없음"} </Text>
              <TouchableOpacity onPress={() => {this.setState({["_"+data]:!this.state["_"+data]})}}>
                <Icon name={this.state["_"+data] ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
              </TouchableOpacity>
            </View>
          </View>
        }
      })
      return (
        <Container>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:6,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:16}}>개인제출 서류</Text>
            </Body>
            <Right  style={{flex:1}}>
              <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
                <Icon name="times" type="FontAwesome" />
              </Button>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
          >
            <View style={[styles.Box,{paddingBottom:0}]}>
              {papers}
            </View>
            <View style={{marginTop:30,alignItems:'center'}}>
              <Text style={{color:'#db3928',fontSize:12}}>※서류 유무 사항을 확인해주시기 바랍니다.</Text>
            </View>
            <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',marginTop:50,width:'60%'}}>
              <Button
                rounded
                block
                style={{backgroundColor:'#db3928',paddingVertical:20}}
                onPress={this.tongPaperUpdate}
              >
                <Text style={{fontSize:18}}>완료</Text>
              </Button>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default TongPaperAgree;
