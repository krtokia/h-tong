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

import styles from "./styles";

var fontColor = '#555';


class TongPaperSafe extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(){
    super();
    this.state ={
    }
  }

  render(){
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
            <Text style={{color:fontColor,fontSize:11}}>- 현장명 : 현장통 1</Text>
          </View>
          <View>
            <View>
              <ViewMenu
                title="1. 현장내에서는 안전 보호구을 확실하게 착용하고, 사용 하겠습니다."
              />
              <ViewMenu
                title="2. 지정된 통로를 이용하고 통제구역은 임의로 출입하지 않겠습니다."
              />
              <ViewMenu
                title="3. 흡연은 지정장소 이외에서는 절대 흡연을 하지 않겠습니다."
              />
              <ViewMenu
                title="4. 작업장내에서의 음주행위는 절대 하지 않겠습니다."
              />
              <ViewMenu
                title="5. 작업중 위험사항이 발생하면 작업을 중지하고 안전조치를 실시 한 후, 작업을 실시 하겠습니다."
              />
              <ViewMenu
                title="6. 안전사고가 발생하면 작업을 중지하고 즉시 안전담당자에게 보고 하겠습니다."
              />
              <ViewMenu
                title="7. 공사 중 습득한 제반 안전 및 정보보안 사항에 대하여 비밀을 지킬 것이며, 외부에 누설하지 않겠습니다."
              />
              <ViewMenu
                title="8. 산업안전보건법 제25조의 근로자 준수사항에 의거하여 현장내 안전기준 및 규정을 준수 할 것이며, 이에 불응하여 적발시 현장관리자의 지시에 따르겠으며, 제재조치에 이의를 제기하지 않겠습니다."
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
              <Text style={{fontSize:13,color:fontColor}}>2018 년  10 월  25 일</Text>
            </View>
            <View style={[styles.Row]}>
              <Text style={{fontSize:13}}>서약인 :   </Text>
              <View style={{width:100,height:50,marginRight:10,backgroundColor:'#e9e9e9'}}>
              </View>
            </View>
          </View>
          <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',marginTop:20,width:'60%'}}>
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
export default TongPaperSafe;

class ViewMenu extends Component{
  constructor(){
    super();
    this.state ={
      checked:false,
    }
  }
  checkBox(){
    this.setState({
      checked:!this.state.checked
    });
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
              <Icon name={this.state.checked ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:13,color:'#999'}} />
              <Text style={{fontSize:11}}> 동의</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
