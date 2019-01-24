import React, { Component } from 'react';
import {
  Alert,
  Button,
  TextInput,
  View,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'native-base';
import { Header, StackActions, NavigationActions } from 'react-navigation';

const bg = require("../../assets/images/bg.png");
const logo = require("../../assets/images/loginLogo.png");

import styles from './styles';
import { StoreGlobal } from '../../App';


export default class Signup extends Component {
  static navigationOptions = ({
    headerStyle: {
      backgroundColor:'rgba(0,0,0,0)',
      marginBottom:(StatusBar.currentHeight+Header.HEIGHT)*-1
    },
    headerTitle: null,
    headerRight: null,
  });

  constructor(props){
    super(props);

    this.state={
      userId: '',
      userPass: '',
      userPass2: '',
      userName: '',
      phoneEnd: true,
      phoneNm: '',
      tempPhone: '',
      phoneId:'',
      certStart: false,
      certFin: false,
      idCertFin: false,
      agreeAll: false,
      agree2: false,
      agree3: false,
      isLoading1: false,
      isLoading2: false,
      isLoading3: false,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    for (const key in event) {
      console.log(key + " : " + event[key])
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.agree1 && this.state.agree2) {
      if(!this.state.agreeAll) {
        this.setState({agreeAll:true})
      }
    }
  }

  sendSMS() {
    this.setState({isLoading1:true})
	  const { tempPhone } = this.state;

	  let apiUrl = 'http://13.124.127.253/api/sms/send.php';

    const formData = new FormData();
    formData.append('action', 'go');
    formData.append('ht_phone', tempPhone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/,"$1-$2-$3"));
    options = {
      method: 'POST',
      body: formData
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === "01" || responseJson === "02") {
          Alert.alert('인증번호가 발송되었습니다.')
        } else if (responseJson === "03") {
          Alert.alert('잘못된 전화번호 형식입니다.')
        } else if (responseJson === "04") {
          Alert.alert('스팸으로 등록된 번호입니다.')
        } else if (responseJson === "05") {
          Alert.alert('오류가 발생했습니다.')
        }
        this.setState({
          certStart: responseJson === "01" || responseJson === "02" ? true : false,
          phoneNm: responseJson === "01" || responseJson === "02" ? this.state.tempPhone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/,"$1-$2-$3") : '',
          phoneEnd: responseJson === "01" || responseJson === "02" ? true : false,
          isLoading1: false
        })
      }).catch((error) => {
        console.log(error)
      });
  }

  validSMS() {
    this.setState({isLoading2:true})
	  const { phoneId, tempPhone } = this.state;

	  let apiUrl = 'http://13.124.127.253/api/sms/check.php';

    const formData = new FormData();
    formData.append('ht_phone', tempPhone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/,"$1-$2-$3"));
    formData.append('token', phoneId);
    options = {
      method: 'POST',
      body: formData
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        console.log("check",responseJson)
        if(responseJson === "no") {
          Alert.alert('인증번호가 맞지 않습니다.')
        } else if(responseJson === "aleady") {
          Alert.alert('이미 가입되어있는 번호입니다.')
          this.setState({
            phoneNm: '',
            tempPhone: '',
            phoneId: '',
            certStart: false,
          })
        }
        this.setState({
          isLoading2:false,
          certFin: responseJson === "ok" ? true : false
        })
      }).catch((error) => {
        console.log(error)
      });
  }

  idCheck() {
    this.setState({isLoading3:true})
	  const { userId } = this.state;

	  let apiUrl = 'http://13.124.127.253/api/idValid.php';

    const formData = new FormData();
    formData.append('userId', userId);
    options = {
      method: 'POST',
      body: formData
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === "no") {
          Alert.alert('해당 ID는 사용할 수 없습니다.')
        }
        this.setState({
          isLoading3:false,
          idCertFin: responseJson === "ok" ? true : false,
        })
      }).catch((error) => {
        console.log(error)
      });
  }

  onLogin() {
    const { userId, userPass, userPass2, userName, phoneNm } = this.state;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
        fetch('http://13.124.127.253/api/signup.php', {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: userId,
              pw: userPass,
              pw2: userPass2,
              name: userName,
              phone: phoneNm
            })
        }).then((response) => response.json())
          .then((responseJson)=> {
            if(responseJson === 'success') {
              Alert.alert(
                '현장통',
                "가입이 완료 되었습니다"
              )
              StoreGlobal({type:'set',key:'loginId',value:userId})
              StoreGlobal({type:'set',key:'signup',value:"Y"})
              this.props.navigation.dispatch(resetAction);
            } else {
              //alert(responseJson);
              Alert.alert(
                '현장통',
                responseJson
              )
            }
          }).catch((error) => {
            console.log(error)
          });

        if (this.props.valid) {
          this.props.navigation.goBack();
        } else {
        //  Alert.alert("All the fields are compulsory!")
        }
  }

  agreeAll() {
    const { agreeAll, agree1, agree2 } = this.state;
    if(agreeAll) {
      this.setState({
        agreeAll: false,
        agree1: false,
        agree2: false
      })
    } else {
      this.setState({
        agreeAll: true,
        agree1: true,
        agree2: true
      })
    }
  }

  render() {
    const { certStart, certFin, idCertFin, agree1, agree2, agreeAll } = this.state;
    let signupGo = false;
    if(certStart && certFin && idCertFin && agree1 && agree2) {
      signupGo = true
    }
    return (
      <KeyboardAvoidingView behavior = 'position'  enabled keyboardVerticalOffset={5}>
      <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        <View style={{width:'80%',height:'80%',justifyContent:'center',alignItems:'center'}}>
          {/* 전화번호 입력부 */}
          <View style={styles.inputBox}>
            <View style={{flex:3,justifyContent:'center'}}>
            <TextInput
              ref='phoneInput'
              style={[styles.input]}
              editable={this.state.certStart ? false : true}
              placeholder="연락처를 입력 해 주세요"
              underlineColorAndroid="transparent"
              onChangeText={(content) => {
                this.setState({tempPhone:content.replace(/[^0-9]/g,'')})
              }}
              onFocus={() => {this.setState({phoneNm:this.state.tempPhone,phoneEnd:false})}}
              onBlur={() => {
                if(this.state.tempPhone && this.state.tempPhone.length != 11) {
                  Alert.alert('현장통','연락처를 알맞게 기입하세요.')
                  this.refs['phoneInput'].focus();
                } else {
                  this.setState({
                      phoneNm:this.state.tempPhone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/,"$1-$2-$3"),
                      phoneEnd: true
                  })
                }
              }}
              value={this.state.phoneEnd ? this.state.phoneNm : this.state.tempPhone}
            >
            </TextInput>
            </View>
            <View style={{flex:1}}>
            { this.state.certStart ? (
              <TouchableOpacity style={{flex:1,backgroundColor:'#eee',alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                  this.setState({
                    certStart: false,
                    phoneEnd: false,
                    certFin: false,
                    phoneId: ''
                  })
                }}
              >
                <Text style={{fontSize:11,color:'#000'}}>인증 취소</Text>
              </TouchableOpacity>
            ) : this.state.tempPhone.length == 11 ? (
              <TouchableOpacity style={{flex:1,backgroundColor:'#db3928',alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                  if(this.state.tempPhone && this.state.tempPhone.length != 11) {
                    Alert.alert('현장통','연락처를 알맞게 기입하세요.')
                    this.refs['phoneInput'].focus();
                  } else if(!this.state.tempPhone) {
                    Alert.alert('현장통','연락처를 알맞게 기입하세요.')
                    this.refs['phoneInput'].focus();
                  } else {
                    this.sendSMS()
                  }
                }}
              >
                <Text style={{fontSize:11,color:'#fff'}}>인증받기</Text>
              </TouchableOpacity>
            ) : (
              <View style={{flex:1,backgroundColor:'#aaa',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:11,color:'#fff'}}>인증받기</Text>
              </View>
            )}
            </View>
          </View>
          {/* 전화번호 인증부 */}
          <View style={[styles.inputBox]}>
            <View style={{flex:3}}>
              <TextInput
                ref='phoneId'
                style={[styles.input]}
                editable = {this.state.certStart ? true : false }
                placeholder="인증번호를 입력 해 주세요"
                underlineColorAndroid="transparent"
                onChangeText={(content) => {
                  this.setState({phoneId:content.replace(/[^0-9]/g,'')})
                }}
                value={this.state.phoneId}
              >
              </TextInput>
            </View>
            <View style={{flex:1}}>
            { this.state.isLoading2 ? (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator />
              </View>
            ) : this.state.certFin ? (
              <View style={{flex:1,backgroundColor:this.state.certStart ? '#eee' : '#aaa',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:11,color:'#000'}}>인증 완료</Text>
              </View>
            ) : this.state.certStart ? (
              <TouchableOpacity style={{flex:1,backgroundColor:this.state.certStart ? '#db3928' : '#aaa',alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                  this.validSMS();
                }}
              >
                <Text style={{fontSize:11,color:'#fff'}}>인증</Text>
              </TouchableOpacity>
            ) : (
              <View style={{flex:1,backgroundColor:this.state.certStart ? '#db3928' : '#aaa',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:11,color:'#fff'}}>인증</Text>
              </View>
            )}
            </View>
          </View>
          {/* 아이디 입력부 */}
          <View style={styles.inputBox}>
            <View style={{flex:3}}>
              <TextInput
                ref="userId"
                value={this.state.userId}
                editable={this.state.idCertFin ? false : true}
                onChangeText={(userId) => {
                  this.setState({ userId:userId.replace(/[^0-9a-zA-Z]/g,'') })
                }}
                placeholder={'아이디를 입력 해 주세요.'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                onBlur={() => {
                  if(this.state.userId && this.state.userId.length < 4) {
                    Alert.alert('현장통','아이디를 4자 이상 입력해주세요.')
                    this.refs['userId'].focus();
                  }
                }}
              />
            </View>
            <View style={{flex:1}}>
            { this.state.isLoading3 ? (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator />
              </View>
            ) : this.state.idCertFin ? (
              <TouchableOpacity style={{flex:1,backgroundColor:'#eee',alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                    this.setState({
                      idCertFin:false,
                      userId: '',
                    })
                    this.refs['userId'].focus();
                }}
              >
                <Text style={{fontSize:11,color:'#000'}}>변경</Text>
              </TouchableOpacity>
            ) : this.state.userId && this.state.userId.length > 3 ? (
              <TouchableOpacity style={{flex:1,backgroundColor:'#db3928',alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                    this.idCheck()
                }}
              >
                <Text style={{fontSize:11,color:'#fff'}}>ID확인</Text>
              </TouchableOpacity>
            ) : (
              <View style={{flex:1,backgroundColor:'#aaa',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:11,color:'#fff'}}>ID확인</Text>
              </View>
            )}

            </View>
          </View>
          {/* 이름 입력부 */}
          <View style={styles.inputBox}>
            <TextInput
              ref="userName"
              value={this.state.userName}
              onChangeText={(userName) => {
                this.setState({ userName:userName.replace(/[^a-zA-Zㄱ-힣]/g,'') })
              }}
              placeholder={'이름을 입력 해 주세요.'}
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              onBlur={() => {
                if(this.state.userName && this.state.userName.length < 2) {
                  Alert.alert('현장통','이름을 2자 이상 입력해주세요.')
                  this.refs['userName'].focus();
                } else if(this.state.userName && this.state.userName.length > 8) {
                  Alert.alert('현장통','이름을 8자 이내로 입력해주세요.')
                  this.refs['userName'].focus();
                }
              }}
            />
          </View>
          {/* 패스워드 입력부 */}
          <View style={styles.inputBox}>
            <TextInput
              ref="userPass"
              value={this.state.userPass}
              onBlur={() => {
                  if(this.state.userPass.length && this.state.userPass.length < 4) {
                    Alert.alert('현장통','패스워드길이가 너무 짧습니다.')
                    this.refs['userPass'].focus();
                  }
                }
              }
              onChangeText={(userPass) => this.setState({ userPass })}
              placeholder={'패스워드를 입력 해 주세요.'}
              secureTextEntry={true}
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
          {/* 패스워드 확인 입력부 */}
          <View style={styles.inputBox}>
            <TextInput
              ref="userPass2"
              value={this.state.userPass2}
              onChangeText={(userPass2) => this.setState({ userPass2 })}
              onBlur={() => {
                  if(this.state.userPass2.length && this.state.userPass2.length < 4) {
                    Alert.alert('현장통','패스워드길이가 너무 짧습니다.')
                    this.refs['userPass2'].focus();
                  }
                }
              }
              placeholder={'패스워드를 한번 더 입력 해 주세요.'}
              secureTextEntry={true}
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
          {/* 동의 박스 */}
          <View style={[styles.inputBox,{flexDirection:'column',width:'100%',flex:2.5,alignItems:'flex-start'}]}>
            <View style={styles.agree}>
              <TouchableOpacity style={{flexDirection:'row'}}
                onPress={() => this.agreeAll()}
              >
                <Icon name={this.state.agreeAll ? "check-square-o" : "square-o"} type="FontAwesome" style={styles.agreeIcon} />
                <Text style={styles.agreeText}> 모든 운영원칙 전체동의(필수)</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.agree,{flex:2,justifyContent:'space-around'}]}>
              <TouchableOpacity style={{flexDirection:'row'}}
                onPress={() => this.setState({agree1:!this.state.agree1})}
              >
                <Icon name={this.state.agree1 ? "check-square-o" : "square-o"} type="FontAwesome" style={styles.agreeIcon} />
                <Text style={styles.agreeText}> 이용약관 동의(필수)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row'}}
                onPress={() => this.setState({agree2:!this.state.agree2})}
              >
                <Icon name={this.state.agree2 ? "check-square-o" : "square-o"} type="FontAwesome" style={styles.agreeIcon} />
                <Text style={styles.agreeText}> 개인정보 취급방침 동의(필수)</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 가입 버튼 */}
          <View style={[styles.inputBox,{flex:1}]}>
            <View style={{width:200}}>
            { signupGo ? (
              <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:signupGo ? '#db3029' : '#aaa'}}
                onPress={() => {
                    if(!this.state.certFin) {
                      Alert.alert('전화번호 인증이 필요합니다.')
                      this.refs['phoneInput'].focus()
                      return false;
                    } else if(!this.state.idCertFin) {
                      Alert.alert('ID 중복 확인이 필요합니다.')
                      this.refs['userId'].focus()
                      return false;
                    } else if(this.state.userName.length < 2 || this.state.userName.length > 7) {
                      Alert.alert('이름을 알맞게 입력해주세요.')
                      this.refs['userName'].focus()
                      return false;
                    } else if(this.state.userPass.length < 2) {
                      Alert.alert('비밀번호가 너무 짧습니다.')
                      this.refs['userPass'].focus()
                      return false;
                    } else if(this.state.userPass != this.state.userPass2) {
                      Alert.alert('비밀번호가 맞지 않습니다.')
                      this.refs['userPass2'].focus()
                      return false;
                    }
                    this.onLogin()
                }}
              >
                <Text style={{color:signupGo ? '#fff' : '#666',fontSize:15}}>가입하기</Text>
              </TouchableOpacity>
            ) : (
              <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:signupGo ? '#db3029' : '#aaa'}}>
                <Text style={{color:signupGo ? '#fff' : '#666',fontSize:15}}>가입하기</Text>
              </View>
            )}

            </View>
          </View>
        </View>
      </View>
      </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
