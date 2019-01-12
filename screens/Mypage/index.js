import React, { Component } from 'react';
import { Alert,StyleSheet,Image,TouchableOpacity,ActivityIndicator,TextInput,Modal } from 'react-native';
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
  ActionSheet
} from 'native-base';

import styles from './styles.js';
import { StoreGlobal } from '../../App';
import pickableImage from "../common.js"

var BUTTONS = ["내국인", "외국인"];

class Mypage extends pickableImage{
  static navigationOptions = ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      id: StoreGlobal({type:'get',key:'loginId'}),
      dataSource: null,
      isLoading: true,
      phoneEnd: true,
      tempPhone: '',
      passUpdate: false,
      passWd: '',
      isMatch: false,
    };
  }

  getUser = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=setting&id=" + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson[0],
          imageSource: null,
          imgresult: null,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    //console.log("START componentDidMount");
    this.getUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.dataSource.nationality) {
      this.setState(prevStates => ({
        dataSource: {
          ...prevStates.dataSource,
          nationality: prevState.dataSource ? prevState.dataSource.nationality : "내국인"
        }
      }))
    }
  }

  userUpdate() {
    const { id, dataSource, imageSource, imgresult } = this.state;

    let apiUrl = 'http://13.124.127.253/api/userUpdate.php?action=userInfo';
    const formData = new FormData();

    formData.append('userId', id);
    formData.append('userNm', dataSource.userNm);
    formData.append('passWd', dataSource.passWd);
    formData.append('nationality', dataSource.nationality);
    formData.append('email', dataSource.email);
    formData.append('cellPhone', dataSource.cellPhone);
    formData.append('company', dataSource.company);
    formData.append('jobgroup', dataSource.jobgroup);

    if (imageSource) {
      uri = imageSource;
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];

      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

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
      }
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

  _goBack = () => {
    // if(this.props.navigation.getParam('prevPage') === "home") {
    //   this.props.navigation.navigate('HomeMore', {refresh:Date(Date.now()).toString()})
    // } else {
    //   this.props.navigation.navigate('TongPeople', {refresh:Date(Date.now()).toString()})
    // }
    this.props.navigation.navigate('HomeMore', {refresh:Date(Date.now()).toString()})
  }

  updatePw() {
    this.setState({passUpdate:false,passWdValid:'',newpassWd:''})
    const { id, dataSource, imageSource, imgresult } = this.state;

    let apiUrl = 'http://13.124.127.253/api/userUpdate.php?action=updatePw';
    const formData = new FormData();

    formData.append('userId', id);
    formData.append('passWd', this.state.newpassWd);

    options = {
      method: 'POST',
      body: formData,
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          Alert.alert("현장통","패스워드가 변경 되었습니다.")
          this.getUser()
        } else {
          //alert(responseJson);
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log("error::",error)
      });
  }

  render(){
    var isMatch = false;
    if(this.state.newpassWd && this.state.passWdValid && this.state.newpassWd === this.state.passWdValid) {
      isMatch = true;
    } else {
      isMatch = false
    }
    if(this.state.isLoading) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator />
      </View>
    )
    } else {
      let photoName;
      if(this.state.imageSource) {
        photoName = this.state.imageSource
      } else {
        photoName = this.state.dataSource.photo ? 'http://13.124.127.253/images/userProfile/'+this.state.dataSource.photo : 'http://13.124.127.253/images/userProfile/profile_no.png';
      }
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.passUpdate}
          onRequestClose={() => {
            this.setState({passUpdate: false});
          }}>
          <View style={[{flex:1,backgroundColor:'#0008',justifyContent:'center',alignItems:'center'}]}>
            <View style={[{width:'70%',paddingHorizontal:10,backgroundColor:'#fff'}]}>
              <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3,flexDirection:'column'}]}>
                <Text style={[styles.itemTitle,{fontSize:10,textAlignVertical:'center'}]}>새로운 패스워드</Text>
                <View style={{width:'100%',alignItems:'flex-end'}}>
                  <TextInput
                    ref="nPass"
                    style={[styles.itemInput,{borderColor:'#eee',borderWidth:1}]}
                    placeholder="새로운 패스워드를 입력해주세요"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(content) => {
                      if(content.length > 20) {
                        Alert.alert('현장통','패스워드 길이가 너무 깁니다.')
                        content = content.substr( 0, content.length-1 )
                      }
                      this.setState({
                        newpassWd: content
                      })}}
                    onBlur={() => {
                      if(this.state.newpassWd.length < 4) {
                        Alert.alert('현장통','패스워드 길이가 너무 짧습니다.')
                        this.refs['nPass'].focus();
                      }
                    }}
                    value={this.state.newpassWd}
                  >
                  </TextInput>
                </View>
              </View>
              <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3,flexDirection:'column'}]}>
                <Text style={[styles.itemTitle,{fontSize:10,textAlignVertical:'center'}]}>패스워드 확인</Text>
                <View style={{width:'100%',alignItems:'flex-end'}}>
                  <TextInput
                    ref="nPassValid"
                    style={[styles.itemInput,{borderColor:'#eee',borderWidth:1}]}
                    placeholder="새로운 패스워드를 한번 더 입력해주세요"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(content) => {
                      this.setState({
                        passWdValid: content,
                      })}}
                    onBlur={() => {
                      if(!this.state.passWdValid && this.state.newpassWd !== this.state.passWdValid) {
                        Alert.alert('현장통','패스워드가 맞지 않습니다.')
                        this.refs['nPassValid'].focus();
                      } else {
                        this.setState({isMatch:true})
                      }
                    }}
                    value={this.state.passWdValid}
                  >
                  </TextInput>
                </View>
              </View>
              <View style={{height:30,width:'100%',marginBottom:10}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:isMatch ? '#db3029' : '#ccc'}}
                  onPress={() => {isMatch ? this.updatePw() : this.setState({passUpdate:false,passWdValid:'',newpassWd:''})}}>
                  <Text style={{color:isMatch ? "#fff" : "#666"}}>{isMatch ? "저장" : "취소"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>기본정보수정</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>
            <Button transparent rounded onPress={this._goBack}>
              <Icon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
          contentContainerStyle={{paddingBottom:30}}
        >
          <View style={[styles.Box,{backgroundColor:'#f9f9f9',marginTop:0,borderColor:'#e9e9e9',borderBottomWidth:2}]}>
            <View style={{marginBottom:10,alignSelf:'center',alignItems:'center'}}>
              <Image source={{uri: photoName }} style={{width:150,height:150,resizeMode:'cover',borderRadius:500}} />
              <View style={{position:"absolute",bottom:5,right:5,width:30,height:30,backgroundColor:'#fff',borderRadius:15,borderColor:'#999',borderWidth:1}}>
                <TouchableOpacity
                  onPress={this._pickImage.bind(this)}
                >
                  <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Icon name="camera" type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.Box,{marginTop:0,paddingVertical:0}]}>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>아이디</Text>
              <Text style={styles.itemContent}>{this.state.dataSource.userId}</Text>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>패스워드</Text>
              <TouchableOpacity onPress={() => this.setState({passUpdate:!this.state.passUpdate})}>
                <Text style={[styles.itemContent,{color:'#db3928'}]}>수정</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>이름</Text>
              <View style={{width:'70%',alignItems:'flex-end'}}>
                <TextInput
                  ref="nameInput"
                  style={[styles.itemInput]}
                  placeholder="이름을 입력해주세요"
                  underlineColorAndroid="transparent"
                  onChangeText={(content) => {
                    if(content.length > 10) {
                      Alert.alert('현장통','이름의 길이가 너무 깁니다.')
                      content = content.substr( 0, content.length-1 )
                    }
                    this.setState(prevState => ({
                      dataSource: {
                        ...prevState.dataSource,
                        userNm: content
                      }
                    }))}}
                  onBlur={() => {
                    if(this.state.dataSource.userNm && this.state.dataSource.userNm.length < 2) {
                      Alert.alert('현장통','이름의 길이가 너무 짧습니다.')
                      this.refs['nameInput'].focus();
                    }
                  }}
                  value={this.state.dataSource.userNm}
                >
                </TextInput>
              </View>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>연락처</Text>
              <View style={{width:'70%',alignItems:'flex-end'}}>
                <TextInput
                  ref='phoneInput'
                  style={[styles.itemInput]}
                  placeholder="연락처를 입력해주세요"
                  underlineColorAndroid="transparent"
                  onChangeText={(content) => {
                    this.setState({tempPhone:content.replace(/[^0-9]/g,'')})
                  }}
                  onFocus={() => {this.setState(prevState => ({dataSource: {...prevState.dataSource,cellPhone:""},tempPhone:"",phoneEnd:false}))}}
                  onBlur={() => {
                    if(this.state.tempPhone && this.state.tempPhone.length != 11) {
                      Alert.alert('현장통','연락처를 알맞게 기입하세요.')
                      this.refs['phoneInput'].focus();
                    } else {
                    this.setState(prevState => ({
                      dataSource: {
                        ...prevState.dataSource,
                        cellPhone:this.state.tempPhone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/,"$1-$2-$3")
                      },
                      phoneEnd:true})
                      )
                    }
                  }}
                  value={this.state.phoneEnd ? this.state.dataSource.cellPhone : this.state.tempPhone}
                >
                </TextInput>
              </View>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>국적</Text>
              <Text
                onPress={() => ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: 3,
                    title: "국적을 선택하세요"
                  },
                  (buttonIndex) => {
                    this.setState(prevState => ({
                      dataSource: {
                        ...prevState.dataSource,
                        nationality: BUTTONS[buttonIndex]
                      }
                    }));
                  }
                )}
                style={styles.itemContent}
              >
                {this.state.dataSource.nationality}
              </Text>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>이메일</Text>
              <View style={{width:'70%',alignItems:'flex-end'}}>
                <TextInput
                  ref="emailInput"
                  style={[styles.itemInput]}
                  placeholder="이메일를 입력해주세요"
                  underlineColorAndroid="transparent"
                  onChangeText={(content) => {
                    this.setState(prevState => ({
                      dataSource: {
                        ...prevState.dataSource,
                        email: content
                      }
                    }));}}
                  onBlur={() => {
                    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                    console.log('reg',this.state.dataSource.email.match(regExp))
                    if(this.state.dataSource.email && !this.state.dataSource.email.match(regExp)) {
                      Alert.alert('현장통','이메일 알맞게 기입하세요.')
                      this.refs['emailInput'].focus();
                    }
                  }}
                  value={this.state.dataSource.email}
                >
                </TextInput>
              </View>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>회사</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="회사를 입력해주세요"
                  underline="false"
                  onChangeText={(content) => {
                    if(content.length > 15) {
                      Alert.alert('현장통','길이가 너무 깁니다.')
                      content = content.substr( 0, content.length-1 )
                    }
                    this.setState(prevState => ({
                      dataSource: {
                        ...prevState.dataSource,
                        company: content
                      }
                    }));}}
                >
                  {this.state.dataSource.company}
                </Input>
                </Item>
              </Form>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>직종</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="직종을 입력해주세요"
                  underline="false"
                  onChangeText={(content) => {
                    if(content.length > 10) {
                      Alert.alert('현장통','길이가 너무 깁니다.')
                      content = content.substr( 0, content.length-1 )
                    }
                    this.setState(prevState => ({
                      dataSource: {
                        ...prevState.dataSource,
                        jobgroup: content
                      }
                    }));}}
                >
                  {this.state.dataSource.jobgroup}
                </Input>
                </Item>
              </Form>
            </View>
          </View>
          <View style={[styles.Box]}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('MyInfo')}}>
            <View style={[styles.itemBox,{borderBottomWidth:0}]}>
              <View style={{flexDirection:'row'}}>
                <Icon name="edit" type="FontAwesome" style={styles.itemTitle} />
                <Text style={styles.itemTitle}>개인인적사항/문진내용</Text>
              </View>
              <Text style={[styles.itemContent,{color:'#db3928'}]}>수정</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:10,color:'#db3928',marginVertical:20}}>
              ※필수 입력란을 확인해주시기 바랍니다.
            </Text>
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
export default Mypage;
