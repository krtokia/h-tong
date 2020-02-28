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

import axios from 'axios';
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
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      tongname: StoreGlobal({type:'get',key:'tongname'}),
      allChecked: false,
      check1: false,
      check2: false,
      check3: false,
      dateTime: null,
      isLoading: true,
      isLoading2: true,
    }
  }

  getPaperInfo = async() => {
    var nowDate = new Date(Date.now());
    var dateTime = nowDate.getFullYear()+" 년 "+(nowDate.getMonth()+1)+" 월 "+nowDate.getDate()+" 일";
    return fetch("http://13.124.127.253/api/results.php?page=getPaperInfo&div=agree&id=" + this.state.memId + "&tongnum=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          check1: responseJson ? (responseJson[0]['check1'] == "1" ? true : false) : false,
          check2: responseJson ? (responseJson[0]['check2'] == "1" ? true : false) : false,
          check3: responseJson ? (responseJson[0]['check3'] == "1" ? true : false) : false,
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
              <Text style={{textAlign:'center',color:'#fff',fontSize:16}}>개인정보 수집/이용 및 제공 동의서</Text>
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
              <ViewMenu
                title="개인정보 수집 및 이용동의"
                contents={`(1) 개인정보 수집 항목 - 필수: 성명 / 주민등록번호(생년월일, 성별까지만 작성) / 소속회사 / 직종 / 경력 / 주소 / 전화번호(유선,무선) 비상연락처 내 성명, 관계, 전화번호(유선,무선)
  (2) 개인정보 수집 및 이용 목적 - 안전사고 시 대응
  (3) 개인정보 보유 및 이용기간 - 개인정보는 유/무형 자산의 운영 관리 및 유지보수 목적으로 현장 종료 후 최대 3년 까지 보유
  (4) 개인정보 수집 및 이용과 관련하여 동의를 거부할 권리가 있으며, 동의거부시 현장 내 근로가 불가합니다.`}
                check={this.state.check1}
                method={(check1) => this.setState({check1})}
              />
              <ViewMenu
                title="고유식별정보의 수집 및 이용동의"
                contents={`(1) 고유식별 정보 수집 항목 - 신분증  또는 운전면허증, 보건안전교육증, 건설기계조종사면허증, 자격증, 외국인은 외국인등록증 또는 여권, 장비등록증, 장비검사증, 장비보험증, 사업자등록증, 통장사본, 자동차등록증 중 제출한 서류
   단, 사업장이 퇴직공제 가입대상일 경우 주민등록번호
  (2) 고유식별 정보 수집 및 이용 목적 - 본인 여부 확인, 건설기계 운전자격 확인, 불법 체류자, 신용 불량자, 채무 불이행자 확인 , 장비대지급, 퇴직공제 가입 사업장은 퇴직공제 신고용
  (3) 고유식별 정보 보유 및 이용기간 - 현장 종료 후 최대 3년까지 보유
  (4) 고유식별정보의 수집 및 이용과 관련하여 동의를 거부할 권리가 있으며, 동의거부 시 현장 내 근로가 불가합니다. (신분증 / 운전면허증 복사 시 주민번호 뒷자리 , 면허 번호 등 개인식별 정보는 가리고 복사)`}
                check={this.state.check2}
                method={(check2) => this.setState({check2})}
              />
              <ViewMenu
                title="개인정보의 제3자 제공"
                contents={`(1) 제공 받는자 - 4대보험 관리기관
  (2) 제공 받는자의 이용 목적 - 4대보험 및 임금대장 작성
  (3) 제공사항 - 성명, 주민등록번호, 연락처등`}
                check={this.state.check3}
                method={(check3) => this.setState({check3})}
              />
            </View>
            <View style={{marginTop:30,alignItems:'flex-end'}}>
              {/*<View style={[styles.Row,{marginBottom:20}]}>
                <TouchableOpacity onPress={() => {this.allCheckBox(!this.state.allChecked)}}>
                  <Icon name={this.state.allChecked ? "check-square-o" : "square-o"} type="FontAwesome" style={{color:'#999',fontSize:15}} />
                </TouchableOpacity>
                <Text style={{fontSize:13,color:'#db3928'}}> 전체동의</Text>
              </View>*/}
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

class ViewMenu extends Component{
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
  checkBox(){
    this.props.method(!this.props.check);
  }
  render(){
    return (
      <View>
        <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
          <TouchableOpacity onPress={() => this.toggleStatus()}>
          <View style={[styles.Row]}>
            <Icon name={this.state.status ? "angle-up" : "angle-right"} type="FontAwesome" style={{fontSize:11}}/>
            <Text style={{fontSize:11}}> {this.props.title}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.checkBox()}}>
          <View style={[styles.Row]}>
            <Icon name={this.props.check ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
            <Text style={{fontSize:11}}> 동의</Text>
          </View>
          </TouchableOpacity>
        </View>
        { this.state.status &&
          <View style={{marginBottom:5,padding:10}}>
            <Text style={{color:"#999",fontSize:9}}>{this.props.contents}</Text>
          </View>
        }
      </View>
    )
  }
}
