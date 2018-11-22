import React, { Component } from 'react';
import { ScrollView,IndicatorViewPager,Alert, TextInput, StyleSheet,Image,TouchableOpacity,ActivityIndicator, Modal, Picker, TouchableWithoutFeedback } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
  Header,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
} from 'native-base';

import styles from './styles.js';

import { StoreGlobal } from '../../App';

class SearchInvite extends Component{
  static navigationOptions = ({
    header: null
  });

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      userId: StoreGlobal({type:'get',key:'loginId'}),
      inviteSource: null,
      modal: false,
      invData: {
        tongtitle: "",
        constructor: "",
        supervisor: "",
        owner: "",
        contact: "",
        term: "",
        addr: "",
        inviteNm: "",
        inviteId: "",
        userGrade: "",
        jobGrade: "",
        inviteDt: "",
        message: "",
        inviteSeq: "",
      }
    }
  }

  componentDidMount() {
    this.getInvite()
  }

  componentDidUpdate(prevProps, prevState) {

  }

  getInvite = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=getInvite&id=" + this.state.userId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          inviteSource: responseJson ? responseJson : [],
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
          isLoading2: false,
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

  gradeGetter(userGrade) {
    switch(userGrade) {
      case "0" : return "안전관리자(운영자)"; break;
      case "1" : return "시공사 직원"; break;
      case "2" : return "시공사 일용직"; break;
      case "3" : return "감리 직원"; break;
      case "4" : return "감리 일용직"; break;
      case "5" : return "협력사 직원"; break;
      case "6" : return "협력사 일용직"; break;
      case "7" : return "개인"; break;
    }
  }

  acceptInvite = () => {
    const { invData } = this.state;
    console.log(invData)
    let apiUrl = 'http://13.124.127.253/api/inviteTong.php?action=accept';
    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inviteSeq: invData.inviteseq,
        tongnum: invData.tongnum,
        tongOwnId: invData.creator,
        tongMemId: invData.userId,
        userGrade: invData.userGrade,
      })
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          Alert.alert(
            "현장통",
            invData.tongtitle+" 현장에 가입되었습니다.");
          this.setState({modal:false})
          this.getInvite()
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  denieInvite = () => {
    const { invData } = this.state;
    let apiUrl = 'http://13.124.127.253/api/inviteTong.php?action=denie';
    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inviteSeq: invData.inviteseq,
      })
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          Alert.alert(
            "현장통",
            invData.tongtitle+" 현장초대 거부하였습니다.");
          this.setState({modal:false})
          this.getInvite()
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

  modalOpen = (modal, invData) => {
    this.setState({modal, invData})
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
      let invites = this.state.inviteSource.map((val,key) => {
        return <InviteList key={key}
          invSource={val}
          modal={this.modalOpen}
          />
      })
      const { invData } = this.state;
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal})
            }}>
            <View style={{flex:1,backgroundColor:'#0008'}}>
              <ModalOut closeModal={(close) => this.setState({modal:close})}/>
              <View style={{alignItems:'center',backgroundColor:'#fff',flex:6,padding:10,marginHorizontal:20}}>
                <View style={[styles.inviteDetailItem]}>
                  <Text style={styles.inviteDetailTitle}>현장 이름:</Text>
                  <Text style={styles.inviteDetailText}>{invData.tongtitle}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>현장 시공자:</Text>
                  <Text style={styles.inviteDetailText}>{invData.constructor}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>현장 감리자:</Text>
                  <Text style={styles.inviteDetailText}>{invData.supervisor}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>현장 발주자:</Text>
                  <Text style={styles.inviteDetailText}>{invData.owner}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>현장 연락처:</Text>
                  <Text style={styles.inviteDetailText}>{invData.contact}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>공사 기간:</Text>
                  <Text style={styles.inviteDetailText}>{invData.term}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>현장 주소:</Text>
                  <Text style={styles.inviteDetailText}>{invData.addr}</Text>
                </View>
                <View style={{height:20}} />
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>초대자:</Text>
                  <Text style={styles.inviteDetailText}>{invData.inviteNm}({invData.inviteId})</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>구분:</Text>
                  <Text style={styles.inviteDetailText}>{this.gradeGetter(invData.userGrade)}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>직급:</Text>
                  <Text style={styles.inviteDetailText}>{invData.jobGrade}</Text>
                </View>
                <View style={[styles.inviteDetailItem,]}>
                  <Text style={styles.inviteDetailTitle}>초대 일자:</Text>
                  <Text style={[styles.inviteDetailText,{flex:2}]}>{invData.inviteDt}</Text>
                </View>
                <View style={[styles.inviteDetailItem,{height:70,flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}]}>
                  <Text style={styles.inviteDetailTitle}>초대 메시지:</Text>
                  <View style={{height:50,width:'100%'}}>
                    <ScrollView style={{borderWidth:1,padding:5,borderColor:'#999',width:'100%'}}>
                      <Text style={styles.inviteDetailText}>
                        {invData.message}
                      </Text>
                    </ScrollView>
                  </View>
                </View>
                <View style={[styles.Row,{width:'100%',height:40}]}>
                  <View style={[{flex:1,padding:20}]}>
                    <Button
                      rounded
                      block
                      success
                      iconLeft
                      onPress={this.acceptInvite}
                    >
                      <Icon name="check" type="FontAwesome" />
                      <Text>수락</Text>
                    </Button>
                  </View>
                  <View style={[{flex:1,padding:20}]}>
                    <Button
                      rounded
                      block
                      danger
                      iconLeft
                      onPress={this.denieInvite}
                    >
                      <Icon name="close" type="FontAwesome" />
                      <Text>거절</Text>
                    </Button>
                  </View>
                </View>
              </View>
              <ModalOut closeModal={(close) => {this.setState({modal:close})}}/>
            </View>
          </Modal>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
              <Button rounded transparent onPress={() => {this._goBack()}}>
                <Icon name="angle-left" type="FontAwesome" />
              </Button>
            </Left>
            <Body style={{flex:5,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>받은 초대장</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            padder
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f4f4f4" }}
          >
            {invites}
          </Content>
        </Container>
      );
    }
  }
}
export default SearchInvite;

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

class InviteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onPageLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({width,height})
  }
  render() {
    const data = this.props.invSource;
    return(
      <TouchableOpacity style={styles.inviteBox} onPress={() => this.props.modal(true,data)}>
        <View style={styles.inviteInnerBox}>
          <View style={[styles.inviteContent,styles.center,{flex:2}]} onLayout={this.onPageLayout}>
            <Image
              source={{uri: 'http://13.124.127.253/images/tongHead/'+data.tongimg}}
              style={{width:this.state.width-5,height:this.state.height-5}}/>
          </View>
          <View style={[styles.inviteContent,{flex:3,justifyContent:'space-around',alignItems:'center'}]}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>{data.tongtitle}</Text>
            <Text style={{fontSize:11,color:'#999'}}>{data.constructor}</Text>
            <Text style={{fontSize:11,color:'#999'}}>{data.term}</Text>
            <Text style={{fontSize:11,color:'#999'}}>{data.addr}</Text>
          </View>
          <TouchableOpacity style={[styles.inviteContent,styles.center,{flex:1}]}
            onPress={() => console.log("front")}
          >
            <Icon name="check" type="FontAwesome" style={{color:'#0c88c2'}} />
            <Text style={{color:'#0c88c2',fontSize:13}}>수락하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}
