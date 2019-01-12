import React, { Component } from 'react';
import { Alert, TextInput,StyleSheet,Image,TouchableOpacity,ActivityIndicator, Modal, Picker, TouchableWithoutFeedback } from 'react-native';
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
  Textarea
} from 'native-base';

import styles from './styles.js';

import { StoreGlobal } from '../../App';

class TongInviteDetail extends Component{
  static navigationOptions = ({
    header: null
  });

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      userId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      friendId: this.props.navigation.getParam('friendId'),
      dataSource: null,
      isFriend: false,
      userImgs: null,
      careerSource: null,
      modal: false,
      userGrade: 8,
      isInvited: null,
    }
  }

  componentDidMount() {
    this.getInfo();
    this.getImages()
    this.getCareer()
    this.getIsInvited()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navigation.getParam('refresh') !== prevProps.navigation.getParam('refresh')) {
      this.getInfo();
    }
  }

  getImages = async() => {
    this.setState({isLoading2:true})
    return fetch("http://13.124.127.253/api/results.php?page=userImage&id=" + this.state.friendId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading2: false,
          userImgs: responseJson,
        });
      })

      .catch((error) => {
        console.error(error);
      });
  }

  getCareer = async() => {
    this.setState({isLoading3:true})
    return fetch("http://13.124.127.253/api/results.php?page=getCareer&id=" + this.state.friendId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading3: false,
          careerSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getInfo = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=getUser&id="+this.state.friendId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
  		    dataSource: responseJson[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getIsInvited = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=isInvited&id="+this.state.friendId+"&tongnum="+this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading4: false,
  		    isInvited: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setInvite = () => {
    if(!this.state.jobGrade) {
      Alert.alert('현장통','직급을 입력해주세요.');
      return null;
    }
    this.inviteFriend()
  }

  isInvited = () => {
    if(this.state.isInvited) {
      Alert.alert("현장통","이미 해당 현장에 초대받은 동료입니다.");
    } else {
      this.setState({modal:!this.state.modal})
    }
  }

  inviteFriend() {
    this.setState({modal:!this.state.modal})
    const { friendId, userId, tongnum, userGrade, jobGrade, message } = this.state;
    let apiUrl = 'http://13.124.127.253/api/inviteTong.php?action=invite';
    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: friendId,
        inviteId: userId,
        tongnum: tongnum,
        userGrade: userGrade,
        message: message,
        jobGrade: jobGrade
      })
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          Alert.alert(
            "현장통",
            "초대장을 발송했습니다."
          );
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  _goBack = () => {
    const { navigation } = this.props;
//    navigation.navigate('TongInvite',{refresh: new Date(Date.now()).toString()});
    navigation.goBack();
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }

  refresh = refresh => {
    this.setState({refresh})
  }

  render(){
    if(this.state.isLoading) {
      return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else if(this.state.isLoading2) {
      return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else if(this.state.isLoading3) {
      return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let imgURI = this.state.dataSource.photo ? this.state.dataSource.photo : "profile_no.png"
      let getImages;
      if(this.state.userImgs) {
        getImages = this.state.userImgs.map((val,key) => {
          return <View key={key}>
            <TouchableOpacity>
              <Image style={styles.detailImage} source={{uri: 'http://13.124.127.253/images/userImages/'+val.photo}} />
            </TouchableOpacity>
          </View>
        })
      } else {
        getImages = <View />
      }

      let getCareer;
      if(this.state.careerSource) {
        getCareer = this.state.careerSource.map((val,key) => {
          return <CareerList
                  key={key}
                  dateVal={val.careerDate}
                  infoVal={val.career}
                />
        })
      } else {
        getCareer = <CareerList
                dateVal=""
                infoVal="경력이 없습니다."
              />
      }
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal})
            }}>
            <View style={[{flex:1,backgroundColor:'#0008'}]}>
              <ModalOut closeModal={(close) => this.setState({modal:close})}/>
              <View style={[{flex:3,flexDirection:'row'}]}>
                <ModalOut closeModal={(close) => this.setState({modal:close})}/>
                <View style={{flex:3,backgroundColor:'#fff',padding:10}}>
                  <View style={{flex:1}}>
                    <Text style={{fontSize:13,marginBottom:5}}>초대 동료 이름 :</Text>
                    <TextInput
                      editable={false}
                      underlineColorAndroid="transparent"
                      style={{textAlign:'center',borderBottomWidth:1,borderColor:'#999'}}
                      value={this.state.dataSource.userNm}
                    />
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{fontSize:13,marginBottom:5}}>초대 동료 직급 :</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{textAlign:'center',borderBottomWidth:1,borderColor:'#999'}}
                      onChangeText={(jobGrade) => {this.setState({jobGrade})}}
                      placeholder="직급을 입력하세요"
                    />
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{fontSize:13}}>초대 동료 구분 :</Text>
                    <Picker
                      selectedValue={this.state.userGrade}
                      onValueChange={(itemValue, itemIndex) => this.setState({userGrade: itemValue})}
                    >
                      <Picker.Item label="안전관리자(운영자)" value="0" />
                      <Picker.Item label="시공사 직원" value="1" />
                      <Picker.Item label="시공사 일용직" value="2" />
                      <Picker.Item label="감리 직원" value="3" />
                      <Picker.Item label="감리 일용직" value="4" />
                      <Picker.Item label="협력사 직원" value="5" />
                      <Picker.Item label="협력사 일용직" value="6" />
                      <Picker.Item label="개인" value="8" />
                    </Picker>
                  </View>
                  <View style={{flex:2}}>
                    <Text style={{fontSize:13,marginBottom:5}}>초대 메세지 :</Text>
                    <Textarea
                      onChangeText={(message) => {this.setState({message})}}
                      rowSpan={3}
                      style={{borderWidth:1,borderColor:'#999',fontSize:11}}
                      placeholder="초대 메세지를 입력하세요"
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.Row,styles.center,{flex:0.5,backgroundColor:'#db3928'}]}
                    onPress={this.setInvite}
                  >
                    <Icon name="envelope-o" type="FontAwesome" style={{fontSize:18,color:'#fff'}} />
                    <Text style={{color:'#fff'}}> 보내기</Text>
                  </TouchableOpacity>
                </View>
                <ModalOut closeModal={(close) => this.setState({modal:close})}/>
              </View>
              <ModalOut closeModal={(close) => this.setState({modal:close})}/>
            </View>
          </Modal>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <View style={[styles.Box,{marginTop:0}]}>
              <View style={{borderBottomColor:'#f9f9f9',borderBottomWidth:1,paddingVertical:10}}>
                <View style={{alignSelf:'flex-end'}}>
                  <Button transparent onPress={this._goBack}>
                    <Icon name="remove" type="FontAwesome" style={{color:'#999'}} />
                  </Button>
                </View>
                <View style={{marginTop:-30,marginBottom:10,alignSelf:'center',alignItems:'center'}}>
                  <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+imgURI}} style={{width:150,height:150,resizeMode:'cover',borderRadius:500}} />
                </View>
                <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:20,marginBottom:5}}>{this.state.dataSource.userNm}</Text>
                  <Text style={{fontSize:11,color:'grey',marginBottom:5}}>{this.state.dataSource.company} / {this.state.dataSource.jobgroup}</Text>
                  <Text>{this.state.dataSource.cellPhone}</Text>
                </View>
              </View>

              <View style={{flexDirection:'row',paddingTop:10,paddingHorizontal:5,alignItems:'center'}}>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
                  onPress={this.isInvited}
                >
                  <Icon name="envelope-o" type="FontAwesome" style={this.state.isFriend ? styles.friendIconT : styles.friendIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>초대하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderLeftWidth:1,borderColor:'#f9f9f9'}}
                  onPress={() => this.props.navigation.navigate("ChatRoom",{friendId:this.state.friendId})}
                >
                  <Icon name="comments-o" type="FontAwesome" style={styles.friendIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>1:1 대화</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
                  onPress={() => this.props.navigation.navigate("FriendPapers",{friendId:this.state.friendId,refresh:this.refresh})}
                >
                  <Icon name="folder-open" type="FontAwesome" style={styles.friendIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>서류보기</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.Box}>
              <View style={{alignItems:'flex-start',paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#f4f4f4'}}>
                <Text style={{color:'#aaa',fontSize:13}}>대표사진</Text>
                <View style={{flexDirection:'row',marginTop:5,}}>
                  {getImages}
                </View>
              </View>
              <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                <Text style={{color:'#aaa',fontSize:13}}>경력</Text>
                <View style={{marginLeft:10}}>
                  {getCareer}
                </View>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default TongInviteDetail;

class ModalOut extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <TouchableWithoutFeedback onPress={() => {this.props.closeModal(false)}}>
          <View style={{flex:1}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

class CareerList extends Component{
  render() {
    return(
      <View style={{flexDirection:'row',marginBottom:12,}}>
        <View style={{width:"30%"}}>
          <Text style={{fontSize:13}}>{this.props.dateVal}</Text>
        </View>
        <View style={{width:"70%"}}>
          <Text style={{fontSize:13}}>{this.props.infoVal}</Text>
        </View>
      </View>
    )
  }
}
