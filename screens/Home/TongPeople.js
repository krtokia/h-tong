import React, { Component } from 'react';
import { ToastAndroid,StyleSheet,Image,TouchableOpacity, Alert, ActivityIndicator, ScrollView,RefreshControl, } from 'react-native';
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
} from 'native-base';

import styles from "./styles";

import { StoreGlobal } from '../../App';

class TongPeople extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoading2: true,
      isLoading3: true,
      dataSource2: null,
      searchTxt: null,
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      dataSource: null,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      count: 0,
      count2: 0,
      refreshing: false
    }
  }

  searchFriend = async() => {
    this.setState({isLoading2: true})
    return fetch("http://13.124.127.253/api/results.php?page=searchTongFriend&name="+this.state.searchTxt+"&tongnum="+this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isLoading2: false,
            dataSource2: responseJson,
            count2: Object.keys(responseJson).length,
          });
        } else {
          this.setState({
            isLoading2: false,
            dataSource2: responseJson,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCompany = () => {
    this.setState({isLoading3:true})
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=getCompanyList&tongnum=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        this.getCount()
        this.setState({
          isLoading3: false,
          companyList: responseJson ? responseJson : [],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCount = async() => {
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=getTongMemCount&tongnum=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading4: false,
          fCount: responseJson[0].fCount
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getCompany()
  }

  componentDidUpdate(prevProps) {
    if(this.props.navigation.getParam('refresh') !== prevProps.navigation.getParam('refresh')) {
      this.getCompany()
    }
  }

  refresh = refresh => {
    this.setState({refresh})
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getCompany();
    this.setState({refreshing: false});
  }


  attendCheck(data,action) {
    console.log('action',action)
    const { memId, tongnum } = this.state;

    let apiUrl = 'http://13.124.127.253/api/tongMemAttend.php?action=update';

    const formData = new FormData();

    formData.append('tongnum', tongnum);
    formData.append('userId', data.tongMemId);
    formData.append('attendId', memId);
    formData.append('attend', action === 'check' ? 3 : 0);

    options = {
      method: 'POST',
      body: formData,
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          ToastAndroid.show("출석 체크 완료 되었습니다.", ToastAndroid.BOTTOM)
          this.setState({refresh:Date(Date.now()).toString()})
          console.log(responseJson)
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
    } else if(this.state.isLoading3) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else {
      let fvalue2;
      if(this.state.isLoading2) {
        fvalue2 = <View />
      } else {
        if(this.state.dataSource2) {
          fvalue2 = this.state.dataSource2.map((key, val) => {
            return (
              <TongFriendList2
                key={val}
                photo={key.photo}
                name={key.tongMemNm}
                type={key.jobgroup}
                detailHref={() => {this.props.navigation.navigate('FriendDetail',{friendId:key.tongMemId,refresh:Date(Date.now()).toString()})}}
                chatHref={() => {this.props.navigation.navigate('ChatRoom',{friendId:key.tongMemId,refresh:Date(Date.now()).toString()})}}
                attend = {key.attendYn}
                parentMethod = {this.attendCheck}
              />
            )
          });
        } else {
          fvalue2 = <Text style={{fontSize:13,color:'#999',marginVertical:10}}>검색 결과가 없습니다.</Text>
        }
      }

      let cList;
      if(this.state.companyList.length > 0) {
        cList = this.state.companyList.map((val,key) => {
          return <CompanyList
            key={key}
            title={val.tongCompany}
            count={val.cCount}
            exeFn={(title) => this.getFriend(title)}
            navigation={this.props.navigation}
            attendCheck={(data,action) => this.attendCheck(data,action)}
            refresh={this.state.refresh}
              />
            })
      } else {
        cList = <View><Text>등록된 회사가 없습니다.</Text></View>
      }
      return (
        <Container>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:1,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>전체동료</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            style={{ backgroundColor: "#f9f9f9" }}
            contentContainerStyle={{flex:1}}
          >
            <View style={{width:'100%',padding:10,}}>
              <Item rounded style={{alignSelf:'center',width:'90%',height:40,backgroundColor:'rgba(0,0,0,0.1)'}}>
                <Input placeholder='동료 검색' style={{paddingLeft:30}}  onChangeText={(searchTxt) => this.setState({ searchTxt })}
                  value={this.state.searchTxt}
                />
                <Button style={{width:'25%',height:'100%',borderTopRightRadius:50,borderBottomRightRadius:50,justifyContent:'center',backgroundColor:'#db3928'}}
                  onPress={() => {
                      if(this.state.searchTxt) {
                        this.searchFriend()
                      } else {
                        this.setState({dataSource2: null})
                      }
                    }}
                >
                  <Icon name="search" />
                </Button>
              </Item>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              <View>
                <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>검색 된 동료 ({this.state.count2})</Text>
                <View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
                  {fvalue2}
                </View>
                <Text style={{marginVertical:10,marginLeft:10,fontSize:13}}>현장 전체 동료 ({this.state.fCount})</Text>
                {cList}
                {/*<View style={[styles.Box,{marginBottom:10,paddingVertical:0}]}>
                  {fvalue}
                </View>*/}
              </View>
            </ScrollView>
          </Content>
        </Container>
      );
    }
  }
}
class TongFriendList extends Component{
  render() {
    var uri = 'profile_no.png';
    if(this.props.photo) {
      uri = this.props.photo
    }
    return(
      <TouchableOpacity onPress={this.props.detailHref}>
        <View style={styles.friendList}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={styles.friendThumbnail} />
            <Text style={styles.friendName}>{this.props.name}</Text>
            <Text style={styles.friendInfo}>{this.props.type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
class TongFriendList2 extends Component{
  attendCheckParent = () => {
    this.props.parentMethod(this.props.data,this.props.attend === "3" ? 'cancel' : 'check');
  }

  createIcon() {
    if (this.props.attend === "3") {
      return <Icon name="check-circle" type="FontAwesome" style={{color: '#00f'}} />
    } else if(this.props.attend === "2") {
      return <Icon name="exclamation-circle" type="FontAwesome" style={{color: '#db3928'}} />
    } else {
      return <Icon name="minus-circle" type="FontAwesome" style={{color: '#aaa'}} />
    }
  }
  render() {
    const attendIcon = this.createIcon();
    var uri = 'profile_no.png';
    if(this.props.photo) {
      uri = this.props.photo
    }
    return(
      <TouchableOpacity onPress={this.props.detailHref}>
        <View style={[styles.friendList,{justifyContent:'space-between'}]}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={styles.friendThumbnail} />
            <Text style={styles.friendName}>{this.props.name}</Text>
            <Text style={styles.friendInfo}>{this.props.type}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:10}}>
            <Button transparent style={styles.friendChatBtn} onPress={this.props.chatHref}>
              <Icon name="commenting-o" type="FontAwesome" style={styles.friendChat} />
            </Button>
            { StoreGlobal({type:'get',key:'userGrade'}) < 2 &&
              <Button transparent style={[styles.friendChatBtn]} onPress={this.attendCheckParent}>
                {attendIcon}
              </Button>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class CompanyList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      dataSource: null,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      isLoading20: false,
      refresh: null
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if(this.state.refresh !== this.props.refresh) {
      this.setState({refresh:this.props.refresh})
      this.getFriend()
    }
  }

  getFriend = () => {
    this.setState({isLoading20:true})
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=selectMembers&tongnum=" + tongnum + "&tongCompany="+this.props.title)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading20: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading20) {
      return <ActivityIndicator />
    } else {
      let fvalue
      if(this.state.dataSource) {
        fvalue = this.state.dataSource.map((key, val) => {
          if(key.tongMemId === this.state.memId) {
            return (
              <TongFriendList
                key={val}
                photo={key.photo}
                name={key.tongMemNm}
                type={key.jobgroup}
                detailHref={() => {this.props.navigation.navigate('Mypage')}}
              />
            )
          } else {
            return (
              <TongFriendList2
                key={val}
                photo={key.photo}
                name={key.tongMemNm}
                type={key.jobgroup}
                data={key}
                detailHref={() => {this.props.navigation.navigate('FriendDetail',{friendId:key.tongMemId,refresh:Date(Date.now()).toString()})}}
                chatHref={() => {this.props.navigation.navigate('ChatRoom',{friendId:key.tongMemId,refresh:Date(Date.now()).toString()})}}
                attend = {key.attend}
                parentMethod = {(data) => {
                  if(key.attend !== "3") {
                    Alert.alert(
                      '출근 체크',
                      data.tongMemNm+' 출근 체크 하시겠습니까?',
                      [
                        {text: '확인', onPress: () => {this.props.attendCheck(data,'check')}},
                        {text: '취소' },
                      ],
                      { cancelable: false }
                    )
                  } else if(key.attend === "3") {
                    Alert.alert(
                      '출근 체크',
                      data.tongMemNm+' 출근 체크 취소겠습니까?',
                      [
                        {text: '확인', onPress: () => {this.props.attendCheck(data,'cancel')}},
                        {text: '취소' },
                      ],
                      { cancelable: false }
                    )
                  }
                }}
              />
            )
          }
        });
      } else {
        fvalue = <View />
      }
      return(
        <TouchableOpacity onPress={() => {this.getFriend(),this.setState({show:!this.state.show})}}>
          <View style={{marginBottom:10}}>
            <Text style={{fontSize:11,marginLeft:10}}>
              {this.props.title} ({this.props.count})
            </Text>
            { this.state.show && (
              <View style={[styles.Box,{marginTop:10,paddingVertical:0}]}>
                {fvalue}
              </View>
            )}
          </View>
        </TouchableOpacity>
      )
    }
  }
}
export default TongPeople;
