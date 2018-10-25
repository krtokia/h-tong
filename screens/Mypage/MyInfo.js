import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
  List,
  ListItem,
  Header,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Item,
  Input,
  Icon,
  Form,
  ActionSheet,
  Picker
} from 'native-base';

import styles from './styles.js';

var BUTTONS = ["남자", "여자"];
var BUTTONS2 = ["A형", "B형", "AB형", "O형"];
var BUTTONS3 = ["비흡연", "반갑", "한갑", "2갑"];
var BUTTONS4 = ["마시지 않음", "1~2회", "3~5회", "매일"];
var BUTTONS5 = ["마시지 않음", "1~2잔", "1병", "2병이상"];

class MyInfo extends Component{
  static navigationOptions = ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      selected1: "key0"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render(){
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{flex:5,justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>개인인적사항/문진내용 수정</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>
            <Button transparent rounded onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={[styles.Box,{marginTop:0,paddingVertical:0}]}>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>주소</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="주소를 입력해주세요."
                  underline="false"
                >
                </Input>
                </Item>
              </Form>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>집전화</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="집전화를 입력해주세요 예) 000-000-0000"
                  underline="false"
                >
                </Input>
                </Item>
              </Form>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>생년월일</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="-없이 생년월일을 입력해주세요"
                  underline="false"
                >
                </Input>
                </Item>
              </Form>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>성별</Text>
              <Text
                onPress={() => ActionSheet.show(
                  {
                    options: BUTTONS,
                    title: "성별을 선택하세요"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                  }
                )}
                style={styles.itemContent}
              >
                남자
              </Text>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>주업종</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="주업종을 입력해주세요"
                  underline="false"
                >
                </Input>
                </Item>
              </Form>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>경력</Text>
              <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                <Form style={{width:'70%',alignItems:'flex-end'}}>
                  <Item style={{borderColor:'transparent'}}>
                  <Input
                    textAlign={'right'}
                    style={[styles.itemInput]}
                    placeholder="경력을 숫자로 입력해주세요"
                    underline="false"
                  >
                  </Input>
                  </Item>
                </Form>
                <Text style={[styles.itemContent,{color:'#111'}]}>년</Text>
              </View>
            </View>
          </View>

          <View style={styles.BoxTitle}>
            <Text style={styles.itemTitle}>문진내용</Text>
          </View>
          <View style={[styles.Box,{marginTop:0,paddingVertical:0}]}>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>혈액형</Text>
              <Text
                onPress={() => ActionSheet.show(
                  {
                    options: BUTTONS2,
                    title: "혈액형을 선택하세요"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS2[buttonIndex] });
                  }
                )}
                style={styles.itemContent}
              >
                A형
              </Text>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>하루 흡연량</Text>
              <Text
                onPress={() => ActionSheet.show(
                  {
                    options: BUTTONS3,
                    title: "하루 흡연량을 선택하세요"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS3[buttonIndex] });
                  }
                )}
                style={styles.itemContent}
              >
                비흡연
              </Text>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>1주일 음주횟수</Text>
              <Text
                onPress={() => ActionSheet.show(
                  {
                    options: BUTTONS4,
                    title: "음주횟수를 선택하세요"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS4[buttonIndex] });
                  }
                )}
                style={styles.itemContent}
              >
                마시지 않음
              </Text>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>음주 1회 섭취량</Text>
              <Text
                onPress={() => ActionSheet.show(
                  {
                    options: BUTTONS5,
                    title: "음주량을 선택하세요"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS5[buttonIndex] });
                  }
                )}
                style={styles.itemContent}
              >
                마시지 않음
              </Text>
            </View>
          </View>

          <View style={styles.BoxTitle}>
            <Text style={styles.itemTitle}>비상연락처</Text>
          </View>
          <View style={[styles.Box,{marginTop:0,paddingVertical:0}]}>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>이름</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="이름을 입력해주세요."
                  underline="false"
                >
                </Input>
                </Item>
              </Form>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>관계</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="관계를 입력해주세요."
                  underline="false"
                >
                </Input>
                </Item>
              </Form>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>연락처</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="-없이 입력해주세요."
                  underline="false"
                >
                </Input>
                </Item>
              </Form>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default MyInfo;
