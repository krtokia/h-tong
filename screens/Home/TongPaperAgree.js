import React, { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
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


class TongPaperAgree extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(){
    super();
    this.state ={
      allChecked: false,
    }
  }

  allCheckBox() {
    this.setState({
      allChecked: !this.state.allChecked
    });
  }


  render(){
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
            <Text style={{color:fontColor,fontSize:11}}>- 현장명 : 현장통 1</Text>
          </View>
          <View>
            <ViewMenu
              title="개인정보 수집 및 이용동의"
              contents={`(1) 개인정보 수집 항목 - 필수: 성명 / 주민등록번호(생년월일, 성별까지만 작성) / 소속회사 / 직종 / 경력 / 주소 / 전화번호(유선,무선) 비상연락처 내 성명, 관계, 전화번호(유선,무선)
(2) 개인정보 수집 및 이용 목적 - 안전사고 시 대응
(3) 개인정보 보유 및 이용기간 - 개인정보는 유/무형 자산의 운영 관리 및 유지보수 목적으로 현장 종료 후 최대 3년 까지 보유
(4) 개인정보 수집 및 이용과 관련하여 동의를 거부할 권리가 있으며, 동의거부시 현장 내 근로가 불가합니다.`}
            />
            <ViewMenu
              title="고유식별정보의 수집 및 이용동의"
              contents={`(1) 고유식별 정보 수집 항목 - 신분증  또는 운전면허증, 보건안전교육증, 건설기계조종사면허증, 자격증, 외국인은 외국인등록증 또는 여권, 장비등록증, 장비검사증, 장비보험증, 사업자등록증, 통장사본, 자동차등록증 중 제출한 서류
 단, 사업장이 퇴직공제 가입대상일 경우 주민등록번호
(2) 고유식별 정보 수집 및 이용 목적 - 본인 여부 확인, 건설기계 운전자격 확인, 불법 체류자, 신용 불량자, 채무 불이행자 확인 , 장비대지급, 퇴직공제 가입 사업장은 퇴직공제 신고용
(3) 고유식별 정보 보유 및 이용기간 - 현장 종료 후 최대 3년까지 보유
(4) 고유식별정보의 수집 및 이용과 관련하여 동의를 거부할 권리가 있으며, 동의거부 시 현장 내 근로가 불가합니다. (신분증 / 운전면허증 복사 시 주민번호 뒷자리 , 면허 번호 등 개인식별 정보는 가리고 복사)`}
            />
            <ViewMenu
              title="개인정보의 제3자 제공"
              contents={`(1) 제공 받는자 - 4대보험 관리기관
(2) 제공 받는자의 이용 목적 - 4대보험 및 임금대장 작성
(3) 제공사항 - 성명, 주민등록번호, 연락처등`}
            />
          </View>
          <View style={{marginTop:30,alignItems:'flex-end'}}>
            <View style={[styles.Row,{marginBottom:20}]}>
              <TouchableOpacity onPress={() => {this.allCheckBox()}}>
                <Icon name={this.state.allChecked ? "check-square-o" : "square-o"} type="FontAwesome" style={{color:'#999',fontSize:15}} />
              </TouchableOpacity>
              <Text style={{fontSize:13,color:'#db3928'}}> 전체동의</Text>
            </View>
            <View style={[styles.Row,{marginBottom:10}]}>
              <Text style={{fontSize:13,color:fontColor}}>2018 년  10 월  25 일</Text>
            </View>
            <View style={[styles.Row]}>
              <Text style={{fontSize:13}}>서약인 :   </Text>
              <View style={{width:100,height:50,marginRight:10,backgroundColor:'#e9e9e9'}}>
              </View>
            </View>
          </View>
          <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',marginTop:50,width:'60%'}}>
            <Button
              rounded
              block
              style={{backgroundColor:'#db3928',paddingVertical:20}}
            >
              <Text style={{fontSize:18}}>완료</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongPaperAgree;

class ViewMenu extends Component{
  constructor(){
    super();
    this.state ={
      status:false,
      checked:false,
    }
  }
  toggleStatus(){
      this.setState({
        status:!this.state.status
      });
    }
  checkBox(){
    this.setState({
      checked:!this.state.checked
    });
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
            <Icon name={this.state.checked ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
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
