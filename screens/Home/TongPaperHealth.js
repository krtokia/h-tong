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

import styles from "./styles";

import axios from 'axios';
var fontColor = '#555';

import pickableImage from "../common.js"
import { StoreGlobal } from '../../App';

class TongPaperHealth extends pickableImage{
  static navigationOptions = {
    header: null
  }

  constructor(){
    super();
    this.state ={
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      tongname: StoreGlobal({type:'get',key:'tongname'}),
      allcheck: false,
      isLoading:true,
      isLoading2:true,
      isLoading3:true,
      dataSource: null,
      check1:false,
      check2:false,
      check3:false,
      check4:false,
      check5:false,
      check6:false,
      check7:false,
      check8:false,
      check9:false,
      check10:false,
      checkY1:false,
      checkY2:false,
      checkY3:false,
      checkY4:false,
      checkY5:false,
      checkY6:false,
      imageSource:null,
      imageSource2:null
    }
  }

  allCheckBox() {
    this.setState({
      allcheck: !this.state.allcheck
    });
  }

  getPaperInfo = async() => {
    var nowDate = new Date(Date.now());
    var dateTime = nowDate.getFullYear()+" 년 "+(nowDate.getMonth()+1)+" 월 "+nowDate.getDate()+" 일";
    return fetch("http://13.124.127.253/api/results.php?page=getPaperInfo&div=health&id=" + this.state.memId + "&tongnum=" + this.state.tongnum)
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
          check9: responseJson ? (responseJson[0]['check9'] == "1" ? true : false) : false,
          check10: responseJson ? (responseJson[0]['check10'] == "1" ? true : false) : false,
          checkY1: responseJson ? (responseJson[0]['checkY1'] == "1" ? true : false) : false,
          checkY2: responseJson ? (responseJson[0]['checkY2'] == "1" ? true : false) : false,
          checkY3: responseJson ? (responseJson[0]['checkY3'] == "1" ? true : false) : false,
          checkY4: responseJson ? (responseJson[0]['checkY4'] == "1" ? true : false) : false,
          checkY5: responseJson ? (responseJson[0]['checkY5'] == "1" ? true : false) : false,
          checkY6: responseJson ? (responseJson[0]['checkY6'] == "1" ? true : false) : false,
          imageSource: responseJson ? responseJson[0]['image1'] : null,
          imageSource2: responseJson ? responseJson[0]['image2'] : null,
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
    const { tongnum, memId, check1,check2,check3,check4,check5,check6,check7,check8,check9,check10,checkY1,checkY2,checkY3,checkY4,checkY5,checkY6,imageSource,imageSource2 } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongPaper.php?';

    const formData = new FormData();

    formData.append('div', 'health');
    formData.append('tongnum', tongnum);
    formData.append('userId', memId);
    formData.append('check1',check1? 1 : 0);
    formData.append('check2',check2? 1 : 0);
    formData.append('check3',check3? 1 : 0);
    formData.append('check4',check4? 1 : 0);
    formData.append('check5',check5? 1 : 0);
    formData.append('check6',check6? 1 : 0);
    formData.append('check7',check7? 1 : 0);
    formData.append('check8',check8? 1 : 0);
    formData.append('check9',check9? 1 : 0);
    formData.append('check10',check10? 1 : 0);
    formData.append('checkY1',checkY1? 1 : 0);
    formData.append('checkY2',checkY2? 1 : 0);
    formData.append('checkY3',checkY3? 1 : 0);
    formData.append('checkY4',checkY4? 1 : 0);
    formData.append('checkY5',checkY5? 1 : 0);
    formData.append('checkY6',checkY6? 1 : 0);

    if (imageSource) {
      uri = imageSource;
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];

      formData.append('image1', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    if (imageSource2) {
      uri = imageSource2;
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];

      formData.append('image2', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    if (imageSource || imageSource2) {
      options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      options = {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      }
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
              <Text style={{textAlign:'center',color:'#fff',fontSize:16}}>건강문진표</Text>
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
              {/*<Text style={{color:fontColor,fontSize:11}}>- 이름 / 연령 / 혈액형 / 경력 / 소속 / 직종</Text>*/}
            </View>
            <View>
              <ViewMenu1
              dataSource={this.state.dataSource}
              check1={this.state.check1}
              check2={this.state.check2}
              check3={this.state.check3}
              check4={this.state.check4}
              check5={this.state.check5}
              check6={this.state.check6}
              check7={this.state.check7}
              check8={this.state.check8}
              check9={this.state.check9}
              check10={this.state.check10}
              method1={(check1) => {this.setState({check1})}}
              method2={(check2) => {this.setState({check2})}}
              method3={(check3) => {this.setState({check3})}}
              method4={(check4) => {this.setState({check4})}}
              method5={(check5) => {this.setState({check5})}}
              method6={(check6) => {this.setState({check6})}}
              method7={(check7) => {this.setState({check7})}}
              method8={(check8) => {this.setState({check8})}}
              method9={(check9) => {this.setState({check9})}}
              method10={(check10) => {this.setState({check10})}}
              />
              <ViewMenu2
              checkY1={this.state.checkY1}
              checkY2={this.state.checkY2}
              checkY3={this.state.checkY3}
              checkY4={this.state.checkY4}
              checkY5={this.state.checkY5}
              checkY6={this.state.checkY6}
              methodY1={(checkY1) => {this.setState({checkY1})}}
              methodY2={(checkY2) => {this.setState({checkY2})}}
              methodY3={(checkY3) => {this.setState({checkY3})}}
              methodY4={(checkY4) => {this.setState({checkY4})}}
              methodY5={(checkY5) => {this.setState({checkY5})}}
              methodY6={(checkY6) => {this.setState({checkY6})}}
              />
              <ViewMenu3
                method1={this._pickImage2}
                method2={this._pickImage3}
                imageSource={this.state.imageSource}
                imageSource2={this.state.imageSource2}
              />
            </View>
            <View style={{marginTop:15,alignItems:'flex-end'}}>
              <View style={[styles.Row,{marginBottom:20,alignSelf:'center'}]}>
                <Text style={{fontSize:11}}>위 기재된 내용이 모두 사실임을 서약합니다.</Text>
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
export default TongPaperHealth;

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
  render(){
    const { dataSource } = this.props;
    return (
      <View>
        <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
          <TouchableOpacity onPress={() => this.toggleStatus()}>
          <View style={[styles.Row]}>
            <Icon name={this.state.status ? "angle-up" : "angle-right"} type="FontAwesome" style={{fontSize:11}}/>
            <Text style={{fontSize:11}}> 근로자 생활습관 및 건강상태</Text>
          </View>
          </TouchableOpacity>
        </View>
        { this.state.status &&
          <View style={{marginBottom:5,padding:10}}>
            <View>
              <ViewMenuSub
                title="흡연 유무"
                content={dataSource.smoke == "비흡연" ? "무" : "유"}
              />
              <ViewMenuSub
                title="하루 흡연량"
                content={dataSource.smoke}
              />
              <ViewMenuSub
                title="음주 횟수"
                content={dataSource.drink}
              />
              <ViewMenuSub
                title="음주섭취량"
                content={dataSource.drink2}
              />
              <ViewMenuSub
                title="건강상태"
                content="(해당사항 체크)"
              />
            </View>
            <View style={{marginTop:5,borderBottomWidth:2,borderTopWidth:2,borderColor:'#e9e9e9'}}>
              <View style={{backgroundColor:'#eee',flexDirection:'row',flexWrap:'nowrap',paddingVertical:5}}>
                <View style={{flex:1.2}} />
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>고혈압</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>당뇨</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>심혈관질환</Text>
                  <Text style={{fontSize:8}}>(심근경색 등)</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>디스크</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:9}}>기타질환</Text>
                </View>
              </View>
              <View style={{backgroundColor:'#fff',flexDirection:'row',flexWrap:'nowrap',paddingVertical:10}}>
                <View style={{flex:1.2,alignItems:'flex-end'}}>
                  <Text style={{fontSize:9,color:'#999'}}>진단여부</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method1(!this.props.check1)}}>
                    <Icon name={this.props.check1 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method2(!this.props.check2)}}>
                    <Icon name={this.props.check2 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method3(!this.props.check3)}}>
                    <Icon name={this.props.check3 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method4(!this.props.check4)}}>
                    <Icon name={this.props.check4 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method5(!this.props.check5)}}>
                    <Icon name={this.props.check5 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{backgroundColor:'#fff',flexDirection:'row',flexWrap:'nowrap',paddingVertical:10}}>
                <View style={{flex:1.2,alignItems:'flex-end'}}>
                  <Text style={{fontSize:9,color:'#999'}}>약물치료 여부</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method6(!this.props.check6)}}>
                    <Icon name={this.props.check6 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method7(!this.props.check7)}}>
                    <Icon name={this.props.check7 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method8(!this.props.check8)}}>
                    <Icon name={this.props.check8 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method9(!this.props.check9)}}>
                    <Icon name={this.props.check9 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.props.method10(!this.props.check10)}}>
                    <Icon name={this.props.check10 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
              </View>
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
      <View style={[styles.Row,{justifyContent:'flex-start',paddingVertical:5}]}>
        <View style={{flex:2,alignItems:'flex-end',marginRight:20}}>
          <Text style={{fontSize:9}}>{this.props.title}</Text>
        </View>
        <View style={{flex:8}}>
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
            <Text style={{fontSize:11}}> 건강상태 자가문진</Text>
          </View>
          </TouchableOpacity>
        </View>
        { this.state.status &&
          <View style={[{marginBottom:5,padding:10,justifyContent:'space-between'}]}>
            <View style={[styles.Row,{justifyContent:'space-between',paddingBottom:10}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize,color:fontColor}}>(해당사항 체크)</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:fontSize,color:fontColor}}>예</Text>
                <Text style={{fontSize:fontSize,color:fontColor}}>아니오</Text>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>1.현재 본인의 건강이 나쁘다고 생각한다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.props.methodY1(!this.props.checkY1)}}>
                  <Icon name={this.props.checkY1 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.methodY1(!this.props.checkY1)}}>
                  <Icon name={this.props.checkY1 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>2.최근 가래에 피가 섞여 나온적이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.props.methodY2(!this.props.checkY2)}}>
                  <Icon name={this.props.checkY2 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.methodY2(!this.props.checkY2)}}>
                  <Icon name={this.props.checkY2 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>3.최근 작업시 가슴이 답답한 적이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.props.methodY3(!this.props.checkY3)}}>
                  <Icon name={this.props.checkY3 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.methodY3(!this.props.checkY3)}}>
                  <Icon name={this.props.checkY3 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>4.최근 1년간 체중이 5kg이상 늘었다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.props.methodY4(!this.props.checkY4)}}>
                  <Icon name={this.props.checkY4 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.methodY4(!this.props.checkY4)}}>
                  <Icon name={this.props.checkY4 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>5.최근 허리에서 다리로 뻗치는 통증이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.props.methodY5(!this.props.checkY5)}}>
                  <Icon name={this.props.checkY5 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.methodY5(!this.props.checkY5)}}>
                  <Icon name={this.props.checkY5 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>6.최근 1년안에 병원에 1회 이상 입원한 적이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.props.methodY6(!this.props.checkY6)}}>
                  <Icon name={this.props.checkY6 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.methodY6(!this.props.checkY6)}}>
                  <Icon name={this.props.checkY6 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}

class ViewMenu3 extends Component{
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
    return (
      <View>
        <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
          <TouchableOpacity onPress={() => this.toggleStatus()}>
          <View style={[styles.Row]}>
            <Icon name={this.state.status ? "angle-up" : "angle-right"} type="FontAwesome" style={{fontSize:11}}/>
            <Text style={{fontSize:11}}> 혈압측정</Text>
          </View>
          </TouchableOpacity>
        </View>
        { this.state.status &&
          <View style={{marginBottom:5,padding:10}}>
            <View style={[styles.Row,{marginBottom:10}]}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:11,color:fontColor,fontWeight:'bold'}}>1차 측정</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:11,color:fontColor,fontWeight:'bold'}}>2차 측정</Text>
                <Text style={{fontSize:10,color:fontColor}}>(재측정 요구시 / 140mmHg이상자)</Text>
              </View>
            </View>
            <View style={styles.Row}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',height:140}}>
                <TouchableOpacity onPress={this.props.method1}>
                  { this.props.imageSource ? (
                    <View style={{width:135,height:135,backgroundColor:'#e9e9e9',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                      <Image source={{ uri: "http://13.124.127.253/images/blood/"+this.props.imageSource }} style={{width:135,height:135}} />
                    </View>
                  ) : (
                    <View style={{width:135,height:135,backgroundColor:'#e9e9e9',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                      <Icon name="camera" type="FontAwesome" style={{color:'#999',fontSize:35}} />
                      <View style={{height:10}} />
                      <Text style={{color:'#999',fontSize:14}}>혈압용지 추가</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',height:140}}>
                <TouchableOpacity onPress={this.props.method2}>
                  { this.props.imageSource2 ? (
                    <View style={{width:135,height:135,backgroundColor:'#e9e9e9',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                      <Image source={{ uri: "http://13.124.127.253/images/blood/"+this.props.imageSource2 }} style={{width:135,height:135}} />
                    </View>
                  ) : (
                    <View style={{width:135,height:135,backgroundColor:'#e9e9e9',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                      <Icon name="camera" type="FontAwesome" style={{color:'#999',fontSize:35}} />
                      <View style={{height:10}} />
                      <Text style={{color:'#999',fontSize:14}}>혈압용지 추가</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}
