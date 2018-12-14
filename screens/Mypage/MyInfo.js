import React, { Component } from 'react';
import { Alert, StyleSheet,Image,TouchableOpacity, ActivityIndicator } from 'react-native';
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
import { StoreGlobal } from '../../App';

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
      isLoading: true,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      dataSource: null,
    };
  }

  getUser = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=setting&id=" + this.state.memId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getUser()
  }

  userUpdate() {
    const { memId, dataSource } = this.state;

    let apiUrl = 'http://13.124.127.253/api/userUpdate.php?action=userInfo2';
    const formData = new FormData();

    formData.append('userId', memId);
    formData.append('address', dataSource.address);
    formData.append('phone', dataSource.phone);
    formData.append('birthDay', dataSource.birthDay);
    formData.append('gender', dataSource.gender);
    formData.append('job', dataSource.job);
    formData.append('career', dataSource.career);
    formData.append('blood', dataSource.blood);
    formData.append('smoke', dataSource.smoke);
    formData.append('drink', dataSource.drink);
    formData.append('drink2', dataSource.drink2);
    formData.append('oName', dataSource.oName);
    formData.append('oRelation', dataSource.oRelation);
    formData.append('oPhone', dataSource.oPhone);

    options = {
        method: 'POST',
        body: formData,
      }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          Alert.alert("현장통","수정 되었습니다.")
          this.props.navigation.navigate('HomeMore', {refresh:Date(Date.now()).toString()})
        } else {
          //alert(responseJson);
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log("error::",error)
      });
  }

  render(){
    if(this.state.isLoading) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else {
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
                    onChangeText={(content) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          address: content
                        }
                      }))}}
                  >
                  {this.state.dataSource.address}
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
                    placeholder="-없이 입력해주세요."
                    underline="false"
                    onChangeText={(content) => {
                      var content2 = content.replace(/(^02.{0})([0-9]{3})([0-9]{4})/,"$1-$2-$3");
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          phone: content2
                        }
                      }))}}
                    onFocus={() => {this.setState(prevState => ({dataSource: {...prevState.dataSource,phone:""}}))}}
                  >
                  {this.state.dataSource.phone}
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
                    placeholder="-없이 생년월일을 8자리를 입력해주세요"
                    underline="false"
                    onChangeText={(content) => {
                      var content2 = content.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/,"$1-$2-$3");
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          birthDay: content2
                        }
                      }))}}
                    onFocus={() => {this.setState(prevState => ({dataSource: {...prevState.dataSource,birthDay:""}}))}}
                  >
                  {this.state.dataSource.birthDay}
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
                    (buttonIndex) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          gender: BUTTONS[buttonIndex]
                        }
                      }));
                    }
                  )}
                  style={styles.itemContent}
                >
                  {this.state.dataSource.gender ? this.state.dataSource.gender : "남자"}
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
                    onChangeText={(content) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          job: content
                        }
                      }))}}
                  >
                  {this.state.dataSource.job}
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
                      onChangeText={(content) => {
                        this.setState(prevState => ({
                          dataSource: {
                            ...prevState.dataSource,
                            career: content
                          }
                        }))}}
                    >
                    {this.state.dataSource.career}
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
                    (buttonIndex) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          blood: BUTTONS2[buttonIndex]
                        }
                      }));
                    }
                  )}
                  style={styles.itemContent}
                >
                  {this.state.dataSource.blood ? this.state.dataSource.blood : "A형"}
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
                    (buttonIndex) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          smoke: BUTTONS3[buttonIndex]
                        }
                      }));
                    }
                  )}
                  style={styles.itemContent}
                >
                  {this.state.dataSource.smoke ? this.state.dataSource.smoke : "비흡연"}
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
                    (buttonIndex) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          drink: BUTTONS4[buttonIndex]
                        }
                      }));
                    }
                  )}
                  style={styles.itemContent}
                >
                  {this.state.dataSource.drink ? this.state.dataSource.drink : "마시지 않음"}
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
                    (buttonIndex) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          drink2: BUTTONS5[buttonIndex]
                        }
                      }));
                    }
                  )}
                  style={styles.itemContent}
                >
                  {this.state.dataSource.drink2 ? this.state.dataSource.drink2 : "마시지 않음"}
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
                    onChangeText={(content) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          oName: content
                        }
                      }))}}
                  >
                  {this.state.dataSource.oName}
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
                    onChangeText={(content) => {
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          oRelation: content
                        }
                      }))}}
                  >
                  {this.state.dataSource.oRelation}
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
                    onChangeText={(content) => {
                      var content2 = content.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/,"$1-$2-$3");
                      this.setState(prevState => ({
                        dataSource: {
                          ...prevState.dataSource,
                          oPhone: content2
                        }
                      }))}}
                    onFocus={() => {this.setState(prevState => ({dataSource: {...prevState.dataSource,oPhone:""}}))}}
                  >
                  {this.state.dataSource.oPhone}
                  </Input>
                  </Item>
                </Form>
              </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
              <Button rounded style={{backgroundColor:'#db3928',paddingHorizontal:50,alignSelf:'center'}}
                onPress={() => {this.userUpdate()}}
              >
                <Text style={{fontSize:15}}>완료</Text>
              </Button>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default MyInfo;
