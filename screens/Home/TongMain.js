import React, { Component } from 'react';
import {
  ToastAndroid,
  TouchableWithoutFeedback,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
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
  Form,
  Item,
  Label,
  Input,
  Textarea,
  FooterTab,
  Footer,
  Icon
} from "native-base";

import styles from "./styles";
import pickableImage from "../common.js"

import { StoreGlobal } from '../../App';

class TongMain extends pickableImage{
  constructor(props) {
    super(props);

    const {navigation} = this.props;
  	const itemID = navigation.getParam('itemID');
    const tongType = navigation.getParam('tongType');
    const tongname = navigation.getParam('tongname');
  	StoreGlobal({type:'set',key:'tongnum',value:itemID});
    StoreGlobal({type:'set',key:'tongtype',value:tongType});
    StoreGlobal({type:'set',key:'tongname',value:tongname});
    this.state = {
        isLoading: true,
        isLoading2: true,
        isLoading3: true,
        isLoading4: true,
        isLoading5: true,
        notiSource: null,
        dataSource: null,
        workSource: null,
        bbsData: null,
        memId: StoreGlobal({type:'get',key:'loginId'}),
        tongTitle: null,
        tongImage: null,
    		tongnum: itemID,
        workCount: 0,
        memCount: 0,
        friendSource: null,
        notiCount: 0,
        attendModal: true,
        clicked: 0,
        lat: null,
        lon: null,
        weather: null,
        w1: null,
        w2: null,
        w3: null,
        city: null,
        imgModal: false,
        imgData: null
		}
  }
  getTong = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=tong&seq=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson[0],
        });
        this.getWeather();
        this.getCity();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCity() {
    var lat = this.state.dataSource.latitude;
    var lon = this.state.dataSource.longitude;
    var url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + lon + "&y=" + lat + "&input_coord=WGS84";
    var obj = {
      method: 'GET',
      headers: {
        'Authorization': 'KakaoAK 01dbf66f990d42bb4e8b96acb7c94b8c'
      }
    }

    return fetch(url, obj)
          .then((response) => response.json())
          .then((responseJson) => {
            //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              city : responseJson.documents[0].address.region_2depth_name,
            });
          })
          .catch((error) => {
            console.error(error);
          });

  }

  getWeather() {

    var lat = Math.floor(this.state.dataSource.latitude);
    var lon = Math.floor(this.state.dataSource.longitude);
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=";
    var key = "44a2b8c6cc2d00bfb91bdb246d4ee842";

    return fetch(url + key)
          .then((response) => response.json())
          .then((responseJson) => {
            //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              w1: Math.floor(responseJson.main.temp - 273.15),
              w2: responseJson.weather[0].main,
              w3: "http://openweathermap.org/img/w/" + responseJson.weather[0].icon + ".png",
              w4: Number(responseJson.weather[0].icon.replace(/[^0-9]/g,"")),
            });
          })
          .catch((error) => {
            console.error(error);
          });
  }

  getNoti = async() => {
    var d = new Date(Date.now());
    var y = d.getFullYear();
    var m = d.getMonth()+1;
    var dd = d.getDate()-7;
    var recent = y+"-"+m+"-"+dd
    return fetch("http://13.124.127.253/api/results.php?page=mainNoti&tongnum=" + this.state.tongnum+"&recent="+recent)
          .then((response) => response.json())
          .then((responseJson) => {
            //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading2: false,
              notiSource: responseJson,
              notiCount: responseJson ? responseJson[0].notiCount : 0
            });
          })
          .catch((error) => {
            console.error(error);
          });
  }
  getWork = async() => {
      var d = new Date(Date.now());
      var y = d.getFullYear();
      var m = d.getMonth()+1;
      var dd = d.getDate();
      var today = y+"-"+m+"-"+dd
      return fetch("http://13.124.127.253/api/results.php?page=getWorkListMain&tongnum=" + this.state.tongnum+"&today="+today)
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson) {
                this.setState({
                  isLoading3: false,
                  workSource: responseJson,
                  workCount: Object.keys(responseJson).length,
                });
              } else {
                this.setState({
                  isLoading3: false,
                  workSource: responseJson,
                })
              }
            })
            .catch((error) => {
              console.error(error);
            });
  }
  getFriend = async() => {
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=selectMembers&tongnum=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        for(i=0;i<Object.keys(responseJson).length;i++) {
          if(responseJson[i]['tongMemId'] === this.state.memId) {
            StoreGlobal({type:'set',key:'userGrade',value:responseJson[i]['userGrade']})
          }
        }
        if(responseJson) {
          this.setState({
            isLoading4: false,
            memCount: Object.keys(responseJson).length,
            friendSource: responseJson,
          });
        } else {
          this.setState({
            isLoading4: false,
            memCount: 0,
            friendSource: responseJson,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAttend = async() => {
    const { tongnum, memId } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=tongAttend&tongnum=" + tongnum + "&id=" + memId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading5: false,
          attendModal: responseJson ? (responseJson.attend < 2 ? true : false) : true
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { imageSource, imgresult } = this.state;
    if(imageSource !== prevState.imageSource) {
      if(imageSource) {
        this.imgupload(imageSource);
      }
    }
  }

  imgupload(imageSource) {
    let apiUrl = 'http://13.124.127.253/api/worklist.php?';
    let uri = null;
    let fileType = null;

    const formData = new FormData();

    formData.append('tongnum', StoreGlobal({type:'get',key:'tongnum'}));
    formData.append('userId', StoreGlobal({type:'get',key:'loginId'}));

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
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.getWork();
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
  }

  componentDidMount() {
    this.getTong()
    this.getNoti()
    this.getWork()
    this.getFriend()
    this.getAttend()
  }

  imageView = (data) => {
    this.setState({imgModal:!this.state.imgModal,imgData:data})
  }

  createWorkList() {
    const { workSource } = this.state;
    var workDOM;
    if(workSource) {
      workDOM = workSource.map((val,key) => {
        return <View key={key}>
          <TouchableWithoutFeedback onPress={() => this.imageView(val.photolist)}>
            <Image
              source={{uri: 'http://13.124.127.253/images/workList/' + val.photolist}}
              style={styles.mainWorkImg}
              key={key}
            />
          </TouchableWithoutFeedback>
        </View>
      })
    } else {
      workDOM = <Text style={{fontSize:12,color:'#db3928'}}>오늘 작업 내역이 없습니다.</Text>
    }

    return workDOM;
  }

  createNotiList() {
    const { notiSource } = this.state;
    var notiDOM;
    if(notiSource) {
      notiDOM = notiSource.map((val,key) => {
        return <View key={key} style={[styles.Row,{flex:1}]}>
          <View style={{flex:1}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.innerContent}
            >
              [{val.notiTitle}] {val.notiContent}
            </Text>
          </View>
        </View>
      })
    } else {
      notiDOM = <View><Text>공지사항이 없습니다.</Text></View>
    }
    return notiDOM;
  }

  _goBack = () => {
    const { navigation } = this.props;
//    navigation.navigate('TongInvite',{refresh: new Date(Date.now()).toString()});
    navigation.navigate("Home", {refresh: Date(Date.now()).toString()});
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }
  refresh = refresh => {
    this.setState({refresh})
  }

  attendCheck() {
    const { clicked, memId, tongnum } = this.state;
    this.setState({attendModal:false});

    let apiUrl = 'http://13.124.127.253/api/tongMemAttend.php?action=insert';

    const formData = new FormData();

    formData.append('tongnum', tongnum);
    formData.append('userId', memId);
    formData.append('attend', clicked);

    options = {
      method: 'POST',
      body: formData,
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          ToastAndroid.show("저장 되었습니다.", ToastAndroid.BOTTOM)
        } else {
          //alert(responseJson);
            console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  render(){

    if (this.state.isLoading) {
      return (
        <View Style={[styles.center,{flex:1}]}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.isLoading2) {
      return (
        <View Style={[styles.center,{flex:1}]}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.isLoading4) {
      return (
        <View Style={[styles.center,{flex:1}]}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.isLoading5) {
      return (
        <View Style={[styles.center,{flex:1}]}>
          <ActivityIndicator />
        </View>
      )
    } else {
      console.log('TEMP',this.state.w3)
      const areaStatus = this.state.w4;
      if (areaStatus == 1) {
        cityStatus = "맑음";
      } else if (areaStatus <= 4) {
        cityStatus = "흐림";
      } else if (areaStatus <= 11) {
        cityStatus = "비";
      } else if (areaStatus == 13) {
        cityStatus = "눈";
      } else {
        cityStatus = "기타";
      }
      let notiList = this.createNotiList();
      let workList = this.createWorkList();
      let d = new Date(Date.now());
      let today = d.getFullYear()+"년 "+(d.getMonth()+1)+"월 "+d.getDate()
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.imgModal}
            onRequestClose={() => {
              this.setState({imgModal:false,imgData:null})
            }}>
            <View style={[styles.center,{flex:1,backgroundColor:'#0008'}]}>
              { this.state.imgData && (
                <TouchableWithoutFeedback onPress={() => this.setState({imgModal:false,imgData:null})}>
                <Image source={{uri: `http://13.124.127.253/images/workList/`+this.state.imgData}}
                  style={styles.imageScale}
                />
                </TouchableWithoutFeedback>
              )}
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.attendModal}
            onRequestClose={() => {
            }}>
            <View style={[styles.center,{flex:1,backgroundColor:'#0008'}]}>
              <View style={{flex:1}} />
              <View style={[{flex:1.5,backgroundColor:'#fff',width:'50%'}]}>
                <View style={[styles.center,{flex:0.7,backgroundColor:'#db3928',padding:10}]}>
                  <Text style={{fontSize:15,color:'#fff',fontWeight:'bold'}}>출근 확인</Text>
                </View>
                <View style={{flex:3,padding:10}}>
                  <TouchableOpacity style={[styles.center,styles.row2,{flex:1,borderBottomWidth:1,borderBottomColor:'#999'}]}
                    onPress={() => {this.setState({clicked:2})}}
                  >
                    <Icon type="MaterialCommunityIcons" name="check-circle-outline" style={{fontSize:20,marginRight:10,color:this.state.clicked === 2 ? '#db3928' : '#aaa'}} />
                    <Text style={{fontSize:15,color:this.state.clicked === 2 ? '#db3928' : '#aaa'}}>출근 완료</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.center,styles.row2,{flex:1,borderBottomWidth:1,borderBottomColor:'#999'}]}
                    onPress={() => {this.setState({clicked:0})}}
                  >
                    <Icon type="MaterialCommunityIcons" name="check-circle-outline" style={{fontSize:20,marginRight:10,color:this.state.clicked === 0 ? '#db3928' : '#aaa'}} />
                    <Text style={{fontSize:15,color:this.state.clicked === 0 ? '#db3928' : '#aaa'}}>아직 안함</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.center,styles.row2,{flex:1}]}
                    onPress={() => {this.setState({clicked:1})}}
                  >
                    <Icon type="MaterialCommunityIcons" name="check-circle-outline" style={{fontSize:20,marginRight:10,color:this.state.clicked === 1 ? '#db3928' : '#aaa'}} />
                    <Text style={{fontSize:15,color:this.state.clicked === 1 ? '#db3928' : '#aaa'}}>오늘 안함</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,padding:10}}>
                  <Button
                    rounded
                    block
                    style={{backgroundColor:'#db3928'}}
                    onPress={() => {
                      if(this.state.clicked >= 0) {
                        this.attendCheck()
                      } else {
                        Alert.alert('현장통','출근 여부를 반드시 선택해 주세요.');
                      }
                    }}
                  >
                    <Text>완료</Text>
                  </Button>
                </View>
              </View>
              <View style={{flex:1}} />
            </View>
          </Modal>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f4f4f4" }}
            contentContainerStyle={{flex:1}}
          >
            {/* Header Start */}
            <View style={[styles.ImageHeader,{padding:0,margin:0}]}>
              <Image
                source={{uri: `http://13.124.127.253/images/tongHead/`+this.state.dataSource.tongimg}}
                style={{flex:1,resizeMode:'cover',position:'absolute',top:0,left:0,bottom:0,right:0}}
              />
              <View style={{flex:2}}>
                <TouchableOpacity style={{marginTop:30,marginLeft:10}}
                  onPress={this._goBack}
                >
                  <Icon name="chevron-circle-left" type="FontAwesome" style={styles.tongBackBtn} />
                </TouchableOpacity>
              </View>
              <View style={[styles.opacityBox,{flex:1}]}>
                <View style={[{flex:1,justifyContent:'center',marginLeft:5}]}>
                  <Text style={{fontSize:23}}>{this.state.dataSource.tongtitle}</Text>
                </View>
                <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                  <TouchableOpacity style={[styles.Row,styles.center,{marginRight:10}]}
                    onPress={() => this.props.navigation.navigate("TongInvite")}
                  >
                    <Icon name="ios-add-circle-outline" type="Ionicons" style={{color: '#db3928',fontSize:18}} />
                    <Text style={[{color:'#db3928',fontSize:13}]}>동료초대</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.Row,styles.center]}
                    onPress={() => this.props.navigation.navigate("TongInfo")}
                  >
                    <Icon name="map-marker-circle" type="MaterialCommunityIcons" style={{color: '#db3928',fontSize:18}} />
                    <Text style={[{color:'#db3928',fontSize:13}]}>현장정보</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Header End */}
            {/* Tong Info Start */}
            <View style={[styles.tongBox,{flex:2,marginTop:3}]}>
              <View style={[styles.tongInnerBox,{flex:1,marginRight:3}]}>
                <View style={[styles.innerBoxTitle,{justifyContent:'space-around'}]}>
                  <Text style={styles.boxTitle}>현장동료</Text>
                  <Text style={styles.boxSub}>전체 {this.state.memCount}</Text>
                </View>
                <TouchableWithoutFeedback style={{flex:1}}
                  onPress={() => this.props.navigation.navigate("TongPeople")}
                >
                  <View style={{flex:1}}>
                    <TongPeopleInfo title="시공사">{this.state.friendSource[0].oCount}</TongPeopleInfo>
                    <TongPeopleInfo title="감리">{this.state.friendSource[0].sCount}</TongPeopleInfo>
                    <TongPeopleInfo title="협력사">{this.state.friendSource[0].eCount}</TongPeopleInfo>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.tongInnerBox,{flex:2}]}>
                <View style={styles.innerBoxTitle}>
                  <Text style={styles.boxTitle}>공지사항</Text>
                  { this.state.notiCount > 0 &&
                    <Text style={[styles.boxSub,{marginLeft:5}]}>NEW {this.state.notiCount}</Text>
                  }
                </View>
                <TouchableWithoutFeedback style={{flex:1}}
                  onPress={() => this.props.navigation.navigate("TongNotice")}
                >
                  <View style={{flex:1}}>
                    {notiList}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {/* Tong Info End */}
            {/* work history Start */}
            <View style={[styles.tongBox,{flex:3}]}>
              <View style={[styles.tongInnerBox,{flex:1}]}>
                <View style={styles.innerBoxTitle}>
                  <Text style={[styles.boxTitle,{marginRight:10}]}>작업실명제</Text>
                  <Text style={{fontSize:9,color:'#aaa',marginRight:10}}>{today}</Text>
                  <Text style={styles.boxSub}>전체 {this.state.workCount}</Text>
                </View>
                <ScrollView style={{height:60}} horizontal={true}>
                  {workList}
                </ScrollView>
                <View style={[styles.center,{flex:1}]}>
                  <TouchableOpacity style={styles.Row}
                    onPress={this._pickImage}
                  >
                    <Icon name="ios-add-circle-outline" type="Ionicons" style={{fontSize:20,color:'#db3928'}} />
                    <Text style={{fontSize:15,color:'#db3928'}}> 사진 올리기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* work history End */}
            {/* weather Start */}
            <View style={[styles.tongBox,{flex:1}]}>
              <View style={[styles.tongInnerBox,{flex:1,flexDirection:'row'}]}>
                <View style={[styles.center,{flex:1}]}>
                  <Image
                    source={{uri: this.state.w3}}
                    style={{width:40,height:40}} />
                </View>
                <View style={[styles.center,{flex:2}]}>
                  <Text style={{fontSize:30}}>{this.state.w1}℃</Text>
                </View>
                <View style={[styles.center,{flex:3}]}>
                  <Text style={{fontSize:18}}>{this.state.city}</Text>
                </View>
                <View style={[{flex:3,justifyContent:'space-around',paddingLeft:10}]}>
                  <Text style={{fontSize:11,color:'#999'}}>{cityStatus}</Text>
                </View>
              </View>
            </View>
            {/* weather End */}
            {/* footer Start */}
            <View style={[styles.tongBox,{flex:1.5}]}>
              <View style={{flex:1,padding:20}}>
                <Button
                  bordered
                  rounded
                  block
                  iconLeft
                  style={{borderColor:'#db3928',borderWidth:3}}
                  onPress={() => this.props.navigation.navigate('TongDanger',{refresh:this.refresh})}
                >
                  <Icon name="warning" type="FontAwesome" style={{color:'#db3928'}} />
                  <Text style={{color:'#db3928'}}>위험치워줘</Text>
                </Button>
              </View>
              <View style={{flex:1,padding:20}}>
                <Button
                  rounded
                  block
                  iconLeft
                  style={{backgroundColor:'#db3928'}}
                  onPress={() => this.props.navigation.navigate("TongEmergency")}
                >
                  <Icon name="phone" type="FontAwesome" />
                  <Text>긴급전화</Text>
                </Button>
              </View>
            </View>
            {/* footer End */}
          </Content>
        </Container>
      );
    }
  }
}
export default TongMain;

class TongPeopleInfo extends Component {
  render() {
    return (
      <View style={[styles.Row,{flex:1,justifyContent:'space-around',paddingHorizontal:10}]}>
        <View style={{flex:1}}>
          <Text style={styles.innerContent}>{this.props.title}</Text>
        </View>
        <View style={{flex:1,alignItems:'flex-end'}}>
          <Text style={styles.innerContent}>{this.props.children}</Text>
        </View>
      </View>
    )
  }
}
