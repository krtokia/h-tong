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


class TongPaperHealth extends Component{
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
          style={{ backgroundColor: "#fff" }}
          padder
        >
          <View style={{paddingVertical:10,paddingLeft:20}}>
            <Text style={{color:fontColor,fontSize:11,marginBottom:5}}>- 현장명 : 현장통 1</Text>
            <Text style={{color:fontColor,fontSize:11}}>- 이름 / 연령 / 혈액형 / 경력 / 소속 / 직종</Text>
          </View>
          <View>
            <ViewMenu1 />
            <ViewMenu2 />
            <ViewMenu3 />
          </View>
          <View style={{marginTop:15,alignItems:'flex-end'}}>
            <View style={[styles.Row,{marginBottom:20,alignSelf:'center'}]}>
              <Text style={{fontSize:11}}>위 기재된 내용이 모두 사실임을 서약합니다.</Text>
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
export default TongPaperHealth;

class ViewMenu1 extends Component{
  constructor(){
    super();
    this.state ={
      status:false,
      checked1:false,
      checked2:false,
      checked3:false,
      checked4:false,
      checked5:false,
      checked6:false,
      checked7:false,
      checked8:false,
      checked9:false,
      checked10:false,
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
            <Text style={{fontSize:11}}> 근로자 생활습관 및 건강상태</Text>
          </View>
          </TouchableOpacity>
        </View>
        { this.state.status &&
          <View style={{marginBottom:5,padding:10}}>
            <View>
              <ViewMenuSub
                title="흡연 유무"
                content="유"
              />
              <ViewMenuSub
                title="하루 흡연량"
                content="1갑"
              />
              <ViewMenuSub
                title="음주 횟수"
                content="주 3회"
              />
              <ViewMenuSub
                title="음주섭취량"
                content="2병"
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
                  <TouchableOpacity onPress={() => {this.setState({checked1:!this.state.checked1})}}>
                    <Icon name={this.state.checked1 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked2:!this.state.checked2})}}>
                    <Icon name={this.state.checked2 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked3:!this.state.checked3})}}>
                    <Icon name={this.state.checked3 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked4:!this.state.checked4})}}>
                    <Icon name={this.state.checked4 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked5:!this.state.checked5})}}>
                    <Icon name={this.state.checked5 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{backgroundColor:'#fff',flexDirection:'row',flexWrap:'nowrap',paddingVertical:10}}>
                <View style={{flex:1.2,alignItems:'flex-end'}}>
                  <Text style={{fontSize:9,color:'#999'}}>약물치료 여부</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked6:!this.state.checked6})}}>
                    <Icon name={this.state.checked6 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked7:!this.state.checked7})}}>
                    <Icon name={this.state.checked7 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked8:!this.state.checked8})}}>
                    <Icon name={this.state.checked8 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked9:!this.state.checked9})}}>
                    <Icon name={this.state.checked9 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({checked10:!this.state.checked10})}}>
                    <Icon name={this.state.checked10 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
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
      checkedY1:false,
      checkedY2:false,
      checkedY3:false,
      checkedY4:false,
      checkedY5:false,
      checkedY6:false,
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
                <TouchableOpacity onPress={() => {this.setState({checkedY1:!this.state.checkedY1})}}>
                  <Icon name={this.state.checkedY1 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({checkedY1:!this.state.checkedY1})}}>
                  <Icon name={this.state.checkedY1 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>2.최근 가래에 피가 섞여 나온적이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.setState({checkedY2:!this.state.checkedY2})}}>
                  <Icon name={this.state.checkedY2 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({checkedY2:!this.state.checkedY2})}}>
                  <Icon name={this.state.checkedY2 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>3.최근 작업시 가슴이 답답한 적이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.setState({checkedY3:!this.state.checkedY3})}}>
                  <Icon name={this.state.checkedY3 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({checkedY3:!this.state.checkedY3})}}>
                  <Icon name={this.state.checkedY3 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>4.최근 1년간 체중이 5kg이상 늘었다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.setState({checkedY4:!this.state.checkedY4})}}>
                  <Icon name={this.state.checkedY4 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({checkedY4:!this.state.checkedY4})}}>
                  <Icon name={this.state.checkedY4 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>5.최근 허리에서 다리로 뻗치는 통증이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.setState({checkedY5:!this.state.checkedY5})}}>
                  <Icon name={this.state.checkedY5 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({checkedY5:!this.state.checkedY5})}}>
                  <Icon name={this.state.checkedY5 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,{justifyContent:'space-between',paddingVertical:5}]}>
              <View style={{flex:5}}>
                <Text style={{fontSize:fontSize}}>6.최근 1년안에 병원에 1회 이상 입원한 적이 있다.</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <TouchableOpacity onPress={() => {this.setState({checkedY6:!this.state.checkedY6})}}>
                  <Icon name={this.state.checkedY6 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({checkedY6:!this.state.checkedY6})}}>
                  <Icon name={this.state.checkedY6 ? "square-o" : "check-square-o"} type="FontAwesome" style={{fontSize:checkBoxSize,color:'#999'}} />
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
                <TouchableOpacity>
                  <View style={{width:135,height:135,backgroundColor:'#e9e9e9',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                    <Icon name="camera" type="FontAwesome" style={{color:'#999',fontSize:35}} />
                    <View style={{height:10}} />
                    <Text style={{color:'#999',fontSize:14}}>혈압용지 추가</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',height:140}}>
                <TouchableOpacity>
                  <View style={{width:135,height:135,backgroundColor:'#e9e9e9',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                    <Icon name="camera" type="FontAwesome" style={{color:'#999',fontSize:35}} />
                    <View style={{height:10}} />
                    <Text style={{color:'#999',fontSize:14}}>혈압용지 추가</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}
