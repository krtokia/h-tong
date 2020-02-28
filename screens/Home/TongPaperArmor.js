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
  Icon,
  CheckBox,
  ListItem
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import axios from 'axios';
import styles from "./styles";

var fontColor = '#555';
import { StoreGlobal } from '../../App';

class TongPaperArmor extends Component{
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
      isLoading3: true,
      checked1: false,
      checked2: false,
      armor1: false,
      armor2: false,
      armor3: false,
      armor4: false,
      armor5: false,
      armor6: false,
    }
  }

  allCheckBox() {
    this.setState({
      allChecked: !this.state.allChecked
    });
  }

  getPaperInfo = async() => {
    var nowDate = new Date(Date.now());
    var dateTime = nowDate.getFullYear()+" 년 "+(nowDate.getMonth()+1)+" 월 "+nowDate.getDate()+" 일";
    return fetch("http://13.124.127.253/api/results.php?page=getPaperInfo&div=armor&id=" + this.state.memId + "&tongnum=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          checked1: responseJson ? (responseJson[0]['checked1'] == "1" ? true : false) : false,
          checked2: responseJson ? (responseJson[0]['checked2'] == "1" ? true : false) : false,
          armor1: responseJson ? (responseJson[0]['armor1'] == "1" ? true : false) : false,
          armor2: responseJson ? (responseJson[0]['armor2'] == "1" ? true : false) : false,
          armor3: responseJson ? (responseJson[0]['armor3'] == "1" ? true : false) : false,
          armor4: responseJson ? (responseJson[0]['armor4'] == "1" ? true : false) : false,
          armor5: responseJson ? (responseJson[0]['armor5'] == "1" ? true : false) : false,
          armor6: responseJson ? (responseJson[0]['armor6'] == "1" ? true : false) : false,
          dateTime: responseJson ? responseJson[0]['dateTime'] : dateTime,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserInfo = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=setting&id=" + this.state.memId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading2: false,
          dataSource: responseJson[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchSign() {
     axios.get('http://h-tong.kr/api/getSign.php?id=' + this.state.memId)
     .then( response => {
       this.setState({
        isLoading3: false,
        signUrl: 'http://h-tong.kr/images/sign/' + (response.data[0] ? response.data[0].file : 'noImage') + '.png',
       });
     })
     .catch( response => { } )
  }

  componentDidMount() {
    this.getPaperInfo();
    this.getUserInfo();
    this.fetchSign();
  }

  tongPaperUpdate = () => {
    const { tongnum, memId, checked1, checked2, armor1, armor2, armor3, armor4, armor5, armor6 } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongPaper.php?';

    const formData = new FormData();

    formData.append('div', 'armor');
    formData.append('tongnum', tongnum);
    formData.append('userId', memId);
    formData.append('checked1', checked1 ? 1 : 0);
    formData.append('checked2', checked2 ? 1 : 0);
    formData.append('armor1', armor1 ? 1 : 0);
    formData.append('armor2', armor2 ? 1 : 0);
    formData.append('armor3', armor3 ? 1 : 0);
    formData.append('armor4', armor4 ? 1 : 0);
    formData.append('armor5', armor5 ? 1 : 0);
    formData.append('armor6', armor6 ? 1 : 0);

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
    } else if(this.state.isLoading3) {
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
              <Text style={{textAlign:'center',color:'#fff',fontSize:16}}>교육이수 및 보호구 수령확인서</Text>
            </Body>
            <Right  style={{flex:1}}>
              <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
                <Icon name="times" type="FontAwesome" />
              </Button>
            </Right>
          </Header>
          <Content
            style={{ backgroundColor: "#fff" }}
            padder
          >
            <View style={{paddingVertical:10,paddingLeft:20}}>
              <Text style={{color:fontColor,fontSize:11,marginBottom:5}}>- 현장명 : {this.state.tongname}</Text>
{/*              <Text style={{color:fontColor,fontSize:11}}>- 채용일자 : 2018 년  10 월  21 일</Text> */}
            </View>
            <View>
              <ViewMenu1
                dataSource={this.state.dataSource}
              />
              <ViewMenu2
                checked1={this.state.checked1}
                checked2={this.state.checked2}
                armor1={this.state.armor1}
                armor2={this.state.armor2}
                armor3={this.state.armor3}
                armor4={this.state.armor4}
                armor5={this.state.armor5}
                armor6={this.state.armor6}
                cMethod1={(checked1) => {this.setState({checked1})}}
                cMethod2={(checked2) => {this.setState({checked2})}}
                aMethod1={(armor1) => {this.setState({armor1})}}
                aMethod2={(armor2) => {this.setState({armor2})}}
                aMethod3={(armor3) => {this.setState({armor3})}}
                aMethod4={(armor4) => {this.setState({armor4})}}
                aMethod5={(armor5) => {this.setState({armor5})}}
                aMethod6={(armor6) => {this.setState({armor6})}}
              />
            </View>
            <View style={{marginTop:15,alignItems:'flex-end'}}>
              <View style={[styles.Row,{marginBottom:20,alignSelf:'center'}]}>
                <Text style={{fontSize:11}}>위 신규채용자 교육이수 및 보호구를 수령하였음을 서약합니다.</Text>
              </View>
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
            <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',marginTop:50,width:'60%'}}>
              <Button
                rounded
                block
                style={{backgroundColor:'#db3928',paddingVertical:20}}
                onPress = {this.tongPaperUpdate}
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
export default TongPaperArmor;

class ViewMenu1 extends Component{
  constructor(){
    super();
    this.state ={
      status:false,
    }
  }
  toggleStatus(){
      this.setState({
        status:!this.state.status
      });
  }
  getAge(birth) {
    var birthDay = birth.substring(0,4);
    var current = new Date().getFullYear();

    return current - birthDay + 1 + "세";
  }
  render(){
    const { dataSource } = this.props;
    return (
      <View>
        <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
          <TouchableOpacity onPress={() => this.toggleStatus()}>
          <View style={[styles.Row]}>
            <Icon name={this.state.status ? "angle-up" : "angle-right"} type="FontAwesome" style={{fontSize:11}}/>
            <Text style={{fontSize:11}}> 근로자 인적사항</Text>
          </View>
          </TouchableOpacity>
        </View>
        { this.state.status &&
          <View style={{marginBottom:5,padding:10}}>
            <View>
              <ViewMenuSub
                title="성명"
                content={dataSource.userNm}
              />
              <ViewMenuSub
                title="성별"
                content={dataSource.gender}
              />
              <ViewMenuSub
                title="생년월일"
                content={dataSource.birthDay}
              />
              <ViewMenuSub
                title="나이"
                content={this.getAge(dataSource.birthDay)}
              />
              <ViewMenuSub
                title="국적"
                content={dataSource.nationality}
              />
              <ViewMenuSub
                title="경력"
                content={dataSource.career+"년"}
              />
              <ViewMenuSub
                title="직종"
                content={dataSource.jobgroup}
              />
              <ViewMenuSub
                title="소속 회사명"
                content={dataSource.company}
              />
              <ViewMenuSub
                title="주소"
                content={dataSource.address}
              />
              <ViewMenuSub
                title="전화번호"
                content={dataSource.phone}
              />
              <ViewMenuSub
                title="휴대폰번호"
                content={dataSource.cellPhone}
              />
              <ViewMenuSub
                title="비상연락처"
                content={"관계:"+dataSource.oRelation+"/ 연락처:"+dataSource.oPhone}
              />
            </View>
          </View>
        }
      </View>
    )
  }
}
class ViewMenuSub extends Component{
  render() {
    return(
      <View style={[styles.Row,{justifyContent:'flex-start',paddingVertical:5,backgroundColor:'#e9e9e9',borderWidth:1}]}>
        <View style={{width:'20%',alignItems:'flex-end',marginRight:20}}>
          <Text style={{fontSize:9}}>{this.props.title}</Text>
        </View>
        <View style={{width:'80%'}}>
          <Text style={{fontSize:9,color:fontColor}}>{this.props.content}</Text>
        </View>
      </View>
    )
  }
}

class ViewMenu2 extends Component{
  constructor(){
    super();
    this.state ={
      status:false,
    }
  }
  toggleStatus(){
      this.setState({
        status:!this.state.status
      });
    }
  render(){
    var fontSize = 9;
    var checkBoxSize = 11;
    return (
      <View>
        <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
          <TouchableOpacity onPress={() => this.toggleStatus()}>
          <View style={[styles.Row]}>
            <Icon name={this.state.status ? "angle-up" : "angle-right"} type="FontAwesome" style={{fontSize:11}}/>
            <Text style={{fontSize:11}}> 신규채용자 교육이수 확인 및 개인 보호구 수령 확인</Text>
          </View>
          </TouchableOpacity>
        </View>
        { this.state.status &&
          <View style={[{marginBottom:5,padding:10,justifyContent:'space-between'}]}>
            <Text style={{fontSize:10}}>※ 신규채용자 교육이수 확인</Text>
            <View style={[styles.Row,{justifyContent:'space-between',paddingTop:5}]}>
              <Text style={{fontSize:9,color:fontColor}}>-외부 교유긱관에서 실시하는 건설업 기초안전보건교육을 이수하였습니다.</Text>
              <TouchableOpacity onPress={() => {this.props.cMethod1(!this.props.checked1)}}>
                <Icon name={this.props.checked1 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
              </TouchableOpacity>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingTop:3,marginBottom:10}]}>
              <Text style={{fontSize:9,color:fontColor}}>-당 현장에서 실시하는 신규채용자 안전교육을 받았습니다.</Text>
              <TouchableOpacity onPress={() => {this.props.cMethod2(!this.props.checked2)}}>
                <Icon name={this.props.checked2 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:10}}>※ 신규채용자 교육이수 확인</Text>
            <View style={{borderTopWidth:2,borderBottomWidth:2,borderColor:'#999',marginVertical:5}}>
              <View style={[styles.Row,{backgroundColor:'#e9e9e9',justifyContent:'space-between',padding:5}]}>
                <Text style={{fontSize:10,textAlign:'center',flex:1}}>안전모</Text>
                <Text style={{fontSize:10,textAlign:'center',flex:1}}>안전대</Text>
                <Text style={{fontSize:10,textAlign:'center',flex:1}}>각반</Text>
                <Text style={{fontSize:10,textAlign:'center',flex:1}}>안전화</Text>
                <Text style={{fontSize:10,textAlign:'center',flex:1}}>보안경</Text>
                <Text style={{fontSize:10,textAlign:'center',flex:1}}>기타</Text>
              </View>
              <View style={[styles.Row,{backgroundColor:'#fff',justifyContent:'space-between',padding:5}]}>
                <TouchableOpacity
                  onPress={() => {this.props.aMethod1(!this.props.armor1)}}
                  style={{flex:1,alignItems:'center'}}
                >
                  <Icon name={this.props.armor1 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {this.props.aMethod2(!this.props.armor2)}}
                  style={{flex:1,alignItems:'center'}}
                >
                  <Icon name={this.props.armor2 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {this.props.aMethod3(!this.props.armor3)}}
                  style={{flex:1,alignItems:'center'}}
                >
                  <Icon name={this.props.armor3 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {this.props.aMethod4(!this.props.armor4)}}
                  style={{flex:1,alignItems:'center'}}
                >
                  <Icon name={this.props.armor4 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {this.props.aMethod5(!this.props.armor5)}}
                  style={{flex:1,alignItems:'center'}}
                >
                  <Icon name={this.props.armor5 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {this.props.aMethod6(!this.props.armor6)}}
                  style={{flex:1,alignItems:'center'}}
                >
                  <Icon name={this.props.armor6 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}
