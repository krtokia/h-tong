import React, { Component } from 'react';
import { TouchableWithoutFeedback,Animated, ImageBackground, TouchableOpacity, Image, Modal,ScrollView, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
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
  	StoreGlobal({type:'set',key:'tongnum',value:itemID});
    StoreGlobal({type:'set',key:'tongtype',value:tongType});
    this.state = {
        isLoading: true,
        isLoading2: true,
        isLoading3: true,
        isLoading4: true,
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
  }

  createWorkList() {
    const { workSource } = this.state;
    var workDOM;
    if(workSource) {
      workDOM = workSource.map((val,key) => {
        return <Image
          source={{uri: 'http://13.124.127.253/images/workList/' + val.photolist}}
          style={styles.mainWorkImg}
          key={key} />
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

  createWeather() {
    const area = "서울";
    const temperature = 28;
    const areaStatus = "rainy";
    const microDust = "좋음";
    let status;
    if (areaStatus === "sunny") {
      status = "weather-sunny";
    } else if (areaStatus === "cloudy") {
      status = "weather-cloudy";
    } else if (areaStatus === "rainy") {
      status = "weather-rainy";
    } else if (areaStatus === "snowy") {
      status = "weather-snowy";
    } else {
      status = "image-filter-center-focus";
    }
    return (
    <View style={[styles.Box,{marginTop:10,height:80,marginVertical:10}]}>
      <View style={[styles.Row,{flex:1,justifyContent:'space-between',padding:10}]}>
        <View style={{flex:1}}>
        <Icon name={status} type="MaterialCommunityIcons" style={{color:'#666',fontSize:40}}/>
        </View>
        <View style={{flex:1}}>
        <Text style={{fontWeight:'bold',fontSize:25,color:'#666'}}>{area}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontSize:14}}>기온 : {temperature}<Icon name="temperature-celsius" type="MaterialCommunityIcons" style={{fontSize:14,color:'#666'}}/></Text>
          <Text style={{fontSize:14}}>미세먼지 : {microDust}</Text>
        </View>
      </View>
    </View>
    )
  }

  _goBack = () => {
    const { navigation } = this.props;
//    navigation.navigate('TongInvite',{refresh: new Date(Date.now()).toString()});
    navigation.navigate("Home");
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }

  render(){
    let weatherBox = this.createWeather();
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
    } else {
      let notiList = this.createNotiList();
      let workList = this.createWorkList();
      let d = new Date(Date.now());
      let today = d.getFullYear()+"년 "+(d.getMonth()+1)+"월 "+d.getDate()
      return (
        <Container>
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
                  <TouchableOpacity style={[styles.Row,styles.center]}>
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
                    source={require('../../assets/images/weather/sunny.png')}
                    resizeMode="center"
                    style={{width:30,height:30}} />
                </View>
                <View style={[styles.center,{flex:2}]}>
                  <Text style={{fontSize:30}}>23℃</Text>
                </View>
                <View style={[styles.center,{flex:3}]}>
                  <Text style={{fontSize:18}}>부천시 중1동</Text>
                </View>
                <View style={[{flex:3,justifyContent:'space-around',paddingLeft:10}]}>
                  <Text style={{fontSize:11,color:'#999'}}>맑음</Text>
                  <Text style={{fontSize:11,color:'#999'}}>초미세먼지 나쁨</Text>
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
