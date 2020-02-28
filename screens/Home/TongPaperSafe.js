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

import styles from "./styles";

var fontColor = '#555';

import axios from 'axios';
import { StoreGlobal } from '../../App';

class TongPaperSafe extends Component{
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
      isLoading2: true,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false,
      check6: false,
      check7: false,
      check8: false,
      dateTime: null,
      signUrl : null,
    }
  }

  getPaperInfo = async() => {
    var nowDate = new Date(Date.now());
    var dateTime = nowDate.getFullYear()+" 년 "+(nowDate.getMonth()+1)+" 월 "+nowDate.getDate()+" 일";
    return fetch("http://13.124.127.253/api/results.php?page=getPaperInfo&div=safe&id=" + this.state.memId + "&tongnum=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          check1: responseJson ? (responseJson[0]['check1'] == "1" ? true : false) : false,
          check2: responseJson ? (responseJson[0]['check2'] == "1" ? true : false) : false,
          check3: responseJson ? (responseJson[0]['check3'] == "1" ? true : false) : false,
          check4: responseJson ? (responseJson[0]['check4'] == "1" ? true : false) : false,
          check5: responseJson ? (responseJson[0]['check5'] == "1" ? true : false) : false,
          check6: responseJson ? (responseJson[0]['check6'] == "1" ? true : false) : false,
          check7: responseJson ? (responseJson[0]['check7'] == "1" ? true : false) : false,
          check8: responseJson ? (responseJson[0]['check8'] == "1" ? true : false) : false,
          dateTime: responseJson ? responseJson[0]['dateTime'] : dateTime,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchSign() {

     axios.get('http://h-tong.kr/api/getSign.php?id=' + this.state.memId)
     .then( response => {
       console.log(response)
       this.setState({
        isLoading2: false,
        signUrl: 'http://h-tong.kr/images/sign/' + (response.data[0] ? response.data[0].file : 'noImage') + '.png',
       });
     })
     .catch( response => { } )

  }

  componentDidMount() {
    this.getPaperInfo();
    this.fetchSign();
  }

  tongPaperUpdate = () => {
    const { tongnum, memId, check1, check2, check3 } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongPaper.php?';

    const formData = new FormData();

    formData.append('div', 'agree');
    formData.append('tongnum', tongnum);
    formData.append('userId', memId);
    formData.append('check1', check1 ? 1 : 0);
    formData.append('check2', check2 ? 1 : 0);
    formData.append('check3', check3 ? 1 : 0);

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
    if(this.state.isLoading) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else if(this.state.isLoading2) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else {
      return (
        <Container>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:6,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:16}}>안전관리 서약서</Text>
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
            padder
          >
            <View style={{paddingVertical:10,paddingLeft:20}}>
              <Text style={{color:fontColor,fontSize:11}}>- 현장명 : {this.state.tongname}</Text>
            </View>
            <View>
              <View>
                <ViewMenu
                  title="1. 현장내에서는 안전 보호구을 확실하게 착용하고, 사용 하겠습니다."
                  checked={this.state.check1}
                  method={(check1) => {this.setState({check1})}}
                />
                <ViewMenu
                  title="2. 지정된 통로를 이용하고 통제구역은 임의로 출입하지 않겠습니다."
                  checked={this.state.check2}
                  method={(check2) => {this.setState({check2})}}
                />
                <ViewMenu
                  title="3. 흡연은 지정장소 이외에서는 절대 흡연을 하지 않겠습니다."
                  checked={this.state.check3}
                  method={(check3) => {this.setState({check3})}}
                />
                <ViewMenu
                  title="4. 작업장내에서의 음주행위는 절대 하지 않겠습니다."
                  checked={this.state.check4}
                  method={(check4) => {this.setState({check4})}}
                />
                <ViewMenu
                  title="5. 작업중 위험사항이 발생하면 작업을 중지하고 안전조치를 실시 한 후, 작업을 실시 하겠습니다."
                  checked={this.state.check5}
                  method={(check5) => {this.setState({check5})}}
                />
                <ViewMenu
                  title="6. 안전사고가 발생하면 작업을 중지하고 즉시 안전담당자에게 보고 하겠습니다."
                  checked={this.state.check6}
                  method={(check6) => {this.setState({check6})}}
                />
                <ViewMenu
                  title="7. 공사 중 습득한 제반 안전 및 정보보안 사항에 대하여 비밀을 지킬 것이며, 외부에 누설하지 않겠습니다."
                  checked={this.state.check7}
                  method={(check7) => {this.setState({check7})}}
                />
                <ViewMenu
                  title="8. 산업안전보건법 제25조의 근로자 준수사항에 의거하여 현장내 안전기준 및 규정을 준수 할 것이며, 이에 불응하여 적발시 현장관리자의 지시에 따르겠으며, 제재조치에 이의를 제기하지 않겠습니다."
                  checked={this.state.check8}
                  method={(check8) => {this.setState({check8})}}
                />
              </View>
              <View style={{alignSelf:'center',marginTop:20}}>
                <Text style={{color:fontColor,fontSize:11}}>
  {`위에 기재된 안전관리 사항에 대하여 준수 할 것을 서약합니다.`}
                </Text>
              </View>
            </View>
            <View style={{marginTop:30,alignItems:'flex-end'}}>
              <View style={[styles.Row,{marginBottom:10}]}>
                <Text style={{fontSize:13,color:fontColor}}>{this.state.dateTime}</Text>
              </View>
              <View style={[styles.Row]}>
                <Text style={{fontSize:13}}>서약인 :   </Text>
                <Image
                  style={{width:100,height:50,marginRight:10}}
                  source={{uri: this.state.signUrl}}
                />
              </View>
            </View>
            <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',marginTop:20,width:'60%'}}>
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
export default TongPaperSafe;

class ViewMenu extends Component{
  constructor(){
    super();
    this.state ={
      checked:false,
    }
  }
  checkBox(){
    this.props.method(!this.props.checked)
  }
  render(){
    return (
      <View>
        <TouchableOpacity onPress={() => {this.checkBox()}}>
          <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',paddingVertical:10}]}>
            <View style={[styles.Row,{flex:8,justifyContent:'flex-start',marginRight:10}]}>
              <Text style={{fontSize:9}}> {this.props.title}</Text>
            </View>
            <View style={[styles.Row,{flex:2,justifyContent:'flex-end'}]}>
              <Icon name={this.props.checked ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
              <Text style={{fontSize:11}}> 동의</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
