import React, { Component } from 'react';
import { ToastAndroid,TouchableWithoutFeedback,Animated,ImageBackground, TouchableOpacity, Image, Modal,ScrollView, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
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
  Form,
  Item,
  Label,
  Input,
  Textarea,
  FooterTab,
  Footer,
  Icon as NBIcon
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { StackActions, NavigationActions } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";
import tong from "../common.js";

import { StoreGlobal } from '../../App';

import pickableImage from "../common.js"

class CommunityMain extends pickableImage{

  constructor(props) {
    super(props);

    this.setModify = this.setModify.bind(this);
    this.setDelete = this.setDelete.bind(this);
    this.writeReply = this.writeReply.bind(this);
    this.setParentShow = this.setParentShow.bind(this);
    this.setDeleteReply = this.setDeleteReply.bind(this);
    this.setModifyReply = this.setModifyReply.bind(this);

	const { navigation } = this.props;
	const itemID = navigation.getParam('itemID');
  const tongType = navigation.getParam('tongType');
	StoreGlobal({type:'set',key:'tongnum',value:itemID});
  StoreGlobal({type:'set',key:'tongtype',value:tongType});
    this.state = {
        isLoading: true,
        isLoading2: true,
        isLoading3: true,
        dataSource: null,
        bbsData: null,
        writeModal: false,
        toggleModal: false,
        memId: StoreGlobal({type:'get',key:'loginId'}),
        content: null,
        tongTitle: null,
        tongImage: null,
        scrollY: new Animated.Value(0),
        isModify: false,
    		tongnum: itemID,
    		modifyVal: "",
        refresh: null,
        parentShow: false,
        deleteimg: false,
        count: 0,
        isMember:0,
		}


  }

  _useCon() {
    if(this.state.isModify) {
      this.setState({updateimg: true})
      console.log("updateIMG!")
    }
  }

  getFriend = async() => {
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=selectMembers&tongnum=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        for(i=0;i<Object.keys(responseJson).length;i++) {
          if(responseJson[i]['tongMemId'] === this.state.memId) {
            StoreGlobal({type:'set',key:'userGrade',value:responseJson[i]['userGrade']})
            StoreGlobal({type:'set',key:'isAdmin',value:responseJson[i]['isAdmin']})
          }
        }
        if(responseJson) {
          this.setState({
            isloading3: false,
            count: Object.keys(responseJson).length,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  getTong = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=community&seq=" + this.state.tongnum + "&id=" + this.state.memId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          isMember: responseJson ? responseJson[0]['isMember'] : 0
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getBbs = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=bbs&seq=" + this.state.tongnum)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading2: false,
                bbsData: responseJson,
                parentShow: !this.state.parentShow,
                isModify: false,
                updateimg: false,
                imageSource: false,
                content:"",
                imgresult: null,
                deleteimg: false,
              });
            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentDidMount() {
    //console.log("START componentDidMount");
    console.log(this.state.tongnum)
    this.getTong();
    this.getBbs();
    this.getFriend();
  }

  setParentShow() {
    this.setState({parentShow:!this.state.parentShow})
  }

  setwriteModal(visible) {
    this.setState({writeModal: visible,isModify:false});
  }

  setModify(modifyVal) {
    this.setState({
      writeModal:true,
      isModify:true,
      content:modifyVal.content,
      modifyVal:modifyVal,
      imageSource: `http://13.124.127.253/images/tongBoard/` + modifyVal.boardimg
    });
  }

  setDelete(deleteVal) {
    this.delete(deleteVal);
  }

  division(mode) {
    this.setState({isModify:false})
    if(mode) {
      this.modify();
    } else {
      this.write();
    }
  }

  modify() {
    this.setState({writeModal:false,isModify:false})
	  const {tongnum, memId, content, imageSource, imgresult, deleteimg} = this.state;

	  let apiUrl = 'http://13.124.127.253/api/updateBoard.php';
    let uri = null;
    let fileType = null;
    let updateimg;

    if (deleteimg) {
      updateimg=true;
      console.log("deleteimg true")
    }
    if (imgresult) {
      if (!imgresult.cancelled) {
        updateimg=true;
        console.log("updateimg true")
      }
    }

    const formData = new FormData();

    formData.append('tongnum', tongnum);
    formData.append('boardnum', this.state.modifyVal.boardnum);
    formData.append('content', content);

    if (updateimg) {
      if(deleteimg) {
        formData.append('deleteimg', deleteimg);
      } else {
        uri = imageSource;
        uriParts = uri.split('.');
        fileType = uriParts[uriParts.length - 1];

        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
      options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }

    } else {
      options = {
        method: 'POST',
        body: formData
      }
    }

      return fetch(apiUrl, options).then((response) => response.json())
        .then((responseJson)=> {
          if(responseJson === 'succed') {
            console.log(responseJson);
            Alert.alert(
              "현장통",
              "수정 되었습니다."
            )
            this.getBbs()
          } else {
            console.log(responseJson);
          }
        }).catch((error) => {
          console.log(error)
        });
  }

  delete(deleteVal) {
    const {tongnum, memId} = this.state;
    let apiUrl = 'http://13.124.127.253/api/deleteBoard.php';
    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tongnum : tongnum,
        boardnum: deleteVal.boardnum,
      })
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          console.log(responseJson);
          Alert.alert(
            "현장통",
            "삭제 되었습니다."
          )
          this.getBbs();
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  writeReply(boardnum, content) {
    if(content == null) {
      Alert.alert("현장통","댓글 내용을 입력해주세요.");
    } else {
      const {tongnum, memId} = this.state;

      let apiUrl = 'http://13.124.127.253/api/write_reply.php';

      options = {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tongnum : tongnum,
          id: memId,
          boardnum: boardnum,
          content: content,
        })
      }
      return fetch(apiUrl, options).then((response) => response.json())
        .then((responseJson)=> {
          if(responseJson === 'succed') {
            console.log(responseJson);
            this.setState({refresh:Date(Date.now()).toString()})
          } else {
            console.log(responseJson);
          }
        }).catch((error) => {
          console.log(error)
        });
    }
  }

  setModifyReply(content, modifyVal) {
    let replynum = modifyVal.replynum;
    let boardnum = modifyVal.boardnum;
    this.modifyReply(content, boardnum, replynum)
  }

  modifyReply(content, boardnum, replynum) {
    const {tongnum, memId} = this.state;
    let apiUrl = 'http://13.124.127.253/api/???.php';
    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tongnum : tongnum,
        boardnum: boardnum,
        replynum: replynum,
        reContent: content,
      })
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          console.log(responseJson);
          this.setState({refresh:Date(Date.now()).toString()})
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  setDeleteReply(deleteVal) {
    let boardNum = deleteVal.boardnum;
    let replyNum = deleteVal.replynum;
    this.deleteReply(boardNum, replyNum)
  }

  deleteReply(boardnum, replynum) {

      const {tongnum, memId} = this.state;

      let apiUrl = 'http://13.124.127.253/api/deleteReply.php';

      options = {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tongnum : tongnum,
          boardnum: boardnum,
		      replynum: replynum,
        })
      }
      return fetch(apiUrl, options).then((response) => response.json())
        .then((responseJson)=> {
          if(responseJson === 'succed') {
            console.log(responseJson);
            this.setState({refresh:Date(Date.now()).toString()})
          } else {
            console.log(responseJson);
          }
        }).catch((error) => {
          console.log(error)
        });
  }

  addMember = () => {
    const {tongnum, memId} = this.state;

    let apiUrl = 'http://13.124.127.253/api/tongMembers.php?action=insertCommunity';

    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tongnum : tongnum,
        tongMemId: memId,
        tongOwnId: this.state.dataSource[0].creator,
    })
    }
    console.log(options)
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        console.log(responseJson)
        if(responseJson === 'succed') {
          Alert.alert('커뮤니티에 가입되었습니다.')
          this.setState({refresh:Date(Date.now()).toString()})
          this.getTong();
          this.getBbs();
          this.getFriend();
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  write() {
    this.setState({writeModal:false,isModify:false,content:""})
    const {tongnum, memId, content, imageSource} = this.state;

    let apiUrl = 'http://13.124.127.253/api/write.php';
    let uri = null;
    let fileType = null;

    const formData = new FormData();

    formData.append('seq', tongnum);
    formData.append('id', memId);
    formData.append('content', content);

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
      }

    } else {
      options = {
        method: 'POST',
        body: formData
      }
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          console.log(responseJson);
          this.getBbs()
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

  _goBack = () => {
    const { navigation } = this.props;
//    navigation.navigate('TongInvite',{refresh: new Date(Date.now()).toString()});
    navigation.navigate("Home",{refresh:Date(Date.now()).toString()});
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
    <View style={[styles.Box,{marginTop:HEADER_MAX_HEIGHT+10,height:80,marginVertical:10}]}>
      <View style={[styles.Row,{flex:1,justifyContent:'space-between',padding:10}]}>
        <View style={{flex:1}}>
        <NBIcon name={status} type="MaterialCommunityIcons" style={{color:'#666',fontSize:40}}/>
        </View>
        <View style={{flex:1}}>
        <Text style={{fontWeight:'bold',fontSize:25,color:'#666'}}>{area}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontSize:14}}>기온 : {temperature}<NBIcon name="temperature-celsius" type="MaterialCommunityIcons" style={{fontSize:14,color:'#666'}}/></Text>
          <Text style={{fontSize:14}}>미세먼지 : {microDust}</Text>
        </View>
      </View>
    </View>
    )
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
    } else {


    const TongType = this.props.navigation.getParam('tongType');
    let weatherBox;
    if(TongType === "T") {
      weatherBox = this.createWeather();
    } else {
      weatherBox = (<View style={{marginTop:HEADER_MAX_HEIGHT}} />);
    }

    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.isLoading2) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let tongTopImage = this.state.dataSource.map((val, key) => {
        this.state.tongTitle = val.tongtitle;
        this.state.tongImage = val.tongimg;
      });

    let bbsList;
    if (this.state.bbsData) {
      bbsList = this.state.bbsData.map((val, key) => {
        return <TouchableWithoutFeedback onPress={() => {this.setState({parentShow:!this.state.parentShow})}} key={key}>
              <View style={styles.TongContentBox}>
                <View style={styles.TongContentHeader}>
                  <View style={{flexDirection: 'row'}}>
                    <Image style={styles.ContentHeaderImg} source={require('../../assets/images/profile_no.png')} />
                    <View style={{marginLeft:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold'}}>{val.author}</Text>
                      <Text style={{fontSize:10,color:'#aaa'}}>{val.date}</Text>
                    </View>
                  </View>
                  { "ID" === "ID" &&
                  <ToggleMenu
                    setModifyParent={this.setModify}
                    setDeleteParent={this.setDelete}
                    bbsValue={val}
                    parentShow={this.state.parentShow}
                    setShow={this.setParentShow}
                    mode="board"
                  />
                  }
                </View>
                { val.boardimg !== '' && (
                  <View style={{marginVertical:10}}>
                    <ScrollView horizontal={true}>
                      <View style={[styles.TongContentImgs]}>
                        <Image source={{uri: `http://13.124.127.253/images/tongBoard/` + val.boardimg}} style={styles.TongContentImgList} />
                      </View>
                    </ScrollView>
                  </View>
                  )
                }
                <View style={[styles.TongContents,"isReply" === "isReply" && styles.grayBottom]}>
                  <Text style={{fontSize:13}}>{val.content}</Text>
                </View>
                <ReplyView
                  boardnum={val.boardnum}
                  tongnum={val.tongnum}
                  refresh={this.state.refresh}
                  bbsValue={val}
                  parentShow={this.state.parentShow}
                  setShow={this.setParentShow}
                  setDeleteReplyParent={this.setDeleteReply}
                  setModifyReplyParent={this.setModifyReply}
                />
                <ReplyMake
                  writeReplyParent={this.writeReply}
                  boardnum={val.boardnum}
                  tongnum={val.tongnum}
                />
              </View>
            </TouchableWithoutFeedback>
      })
    } else {
      bbsList = <View style={{alignSelf:'center',marginTop:30}}>
                  <Text style={{fontWeight:'bold'}}>게시글이 없습니다.</Text>
                </View>
    }



      const headerHeight = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
      });
      const headerMargin = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 'auto'],
        extrapolate: 'clamp',
      });
      const imageOpacity = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
      });
      const imageOpacityR = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      });
      const buttonOpacity = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0.8, 0.8, 0],
        extrapolate: 'clamp',
      });
      const imageTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
      });
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.writeModal}
          onRequestClose={() => {
            this.setwriteModal(!this.state.writeModal),
            this.setState({modifyVal: ""})
          }}>
            <Header style={{height:50,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
              <Left style={{flex:1}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setwriteModal(!this.state.writeModal),
                    this.setState({modifyVal: ""})
                  }}>
                  <Icon name='times' color={'#fff'} size={25} />
                </TouchableHighlight>
              </Left>
              <Body style={{flex:1,alignItems:'center'}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>{this.state.isModify ? "수정하기" : "글쓰기"}</Text>
              </Body>
              <Right  style={{flex:1}}>
                <Text style={{fontSize:13,color:'#fff'}} onPress={() => {this.division(this.state.isModify)}}>완료</Text>
              </Right>
            </Header>
            <Content contentContainerStyle={{flex:1}} padder>
              <Form style={{flex:3}}>
                <ImageBackground source={require('../../assets/images/backgroundLogo.png')} style={{width:'100%'}}>
                <Textarea onChangeText={(content) => {this.setState({content:content})}} rowSpan={15}
                  value={this.state.content}
                />
                </ImageBackground>
                <View style={{flex:1}}>
                { this.state.imageSource &&
                  <TouchableOpacity onPress={() =>
                    Alert.alert(
                      '현장통',
                      '이미지를 삭제합니다.',
                      [
                        {text:"확인", onPress:() => this.setState({deleteimg:true,imageSource:false,imgresult:false})},
                        {text:"취소"}
                      ],
                      { cancelable: true }
                    )
                  } >
                    <Image source={{ uri: this.state.imageSource }} style={{height:"100%",resizeMode:'contain'}} />
                  </TouchableOpacity>
                }
                </View>
              </Form>

            </Content>
            <Footer>
              <FooterTab style={{backgroundColor:'#fff'}}>
                <Button onPress={this._pickImage.bind(this)}>
                  <NBIcon type='FontAwesome' name='camera' style={{color:'#999'}} />
                  <Text style={{color:'#ccc'}}>사진</Text>
                </Button>
                {/*
                <Button>
                  <NBIcon type='FontAwesome' name='video-camera' style={{color:'#999'}} />
                  <Text style={{color:'#ccc'}}>동영상</Text>
                </Button>
                */}
              </FooterTab>
            </Footer>
        </Modal>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
          contentContainerStyle={{flex:1}}
        >
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          <TouchableWithoutFeedback onPress={() => {this.setState({parentShow:!this.state.parentShow})}}>
          {weatherBox}
          </TouchableWithoutFeedback>
          {bbsList}
          </ScrollView>
          <TouchableWithoutFeedback onPress={() => {this.setState({parentShow:!this.state.parentShow})}}>
          <Animated.View style={[styles.header,{height:headerHeight}]}>
            <Animated.Image
              style={[
                {position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: null,
                height: HEADER_MAX_HEIGHT,
                resizeMode: 'cover',},
                {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
              ]}
              source={{uri: `http://13.124.127.253/images/tongHead/` + this.state.tongImage}}
            />
            <Animated.View style={{zIndex: 1,position:'absolute',bottom:0,height:HEADER_MIN_HEIGHT,width:'100%',opacity:imageOpacity,backgroundColor:'#fff8'}}>
              <View style={{height:HEADER_MIN_HEIGHT,flexDirection:'row',alignItems:'center',padding:10,justifyContent:'space-between'}}>
                <View style={{flex:3}}>
                  <Text style={{fontSize:20}}>{this.state.tongTitle}</Text>
                  <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                      <Text style={{fontSize:13}}>{TongType === 'T' ? '현장' : '커뮤니티'}동료({this.state.count})</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingRight:10}}>
                    { this.state.isMember > 0 ? (
                      <TouchableOpacity onPress={() => {this.props.navigation.navigate('CommunityInvite')}}>
                        <Text style={[styles.TongInvite,{fontSize:13}]}><Icon name="plus-circle" /> 동료초대</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={this.addMember}>
                        <Text style={[styles.TongInvite,{fontSize:13}]}><Icon name="plus-circle" /> 커뮤니티 가입</Text>
                      </TouchableOpacity>
                    )}
                    </View>
                  </View>
                </View>
                <View style={{flex:1,paddingHorizontal:5}}>
                  <Button
                    small
                    rounded
                    style={{backgroundColor:'#db3928'}}
                    onPress={() => {this.state.isMember > 0 ? this.setwriteModal(!this.state.writeModal) : ToastAndroid.show("가입한 회원만 작성 가능합니다.", ToastAndroid.SHORT)}}
                  >
                    <Text>글쓰기</Text>
                  </Button>
                </View>
              </View>
            </Animated.View>
            <Animated.View style={{position:'absolute',bottom:0,height:HEADER_MIN_HEIGHT,width:'100%',opacity:imageOpacityR,}}>
              <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',paddingBottom:10}}>
                <Text style={{fontSize:20,color:'#fff'}}>{this.state.tongTitle}</Text>
              </View>
            </Animated.View>
            <Animated.View style={{width:30,height:30,position:'absolute',top:32,left:10,borderRadius:15,opacity:imageOpacity}}>
              <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}
                onPress={this._goBack}
              >
              <NBIcon name="chevron-circle-left" type="FontAwesome" style={styles.tongBackBtn} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{width:30,height:30,position:'absolute',top:32,left:10,borderRadius:15,opacity:imageOpacityR}}>
              <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}
                onPress={this._goBack}
              >
              <NBIcon name="chevron-circle-left" type="FontAwesome" style={styles.tongBackBtn} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          </TouchableWithoutFeedback>
          { TongType === 'T' &&
            <View style={{width:100,position:'absolute',top:35,right:10,zIndex:1}}>
            { "isAttend" === "isAttend" &&
              <Button transparent small block rounded
                style={{backgroundColor:'#db3928'}}
                onPress={() => {this.setState({parentShow:!this.state.parentShow})}}
              >
                <Text style={{color:'#fff',fontSize:15}}>출근하기</Text>
              </Button>
            }
            </View>
          }
        </Content>
      </Container>
    );
  }}
  }
}

export default CommunityMain;

const HEADER_MAX_HEIGHT = 230;
const HEADER_MIN_HEIGHT = 68;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ReplyView extends Component {
  constructor(props) {
    super(props)
    this.modifyReply = this.modifyReply.bind(this)
    this.state = {
      isLoading: true,
      show: false,
      repData: null,
      refresh: 'nn',
      isModify: false,
      content: "",
    }
  }

  componentDidMount() {
    this.getRep()
  }

  componentDidUpdate(prevProps) {
    if (this.props.refresh !== prevProps.refresh) {
      this.getRep()
    }
  }

  getRep() {
     return fetch("http://13.124.127.253/api/results.php?page=reply&seq=" + this.props.tongnum + "&board=" + this.props.boardnum)
             .then((response) => response.json())
             .then((responseJson) => {
               console.log("rep",responseJson)
                this.setState({
                  isLoading: false,
                  repData: responseJson,
                });
             })
             .catch((error) => {
               console.error(error);
             });
 }

 modifyReply(content, modifyVal) {
   this.props.setModifyReplyParent(content, modifyVal)
 }
 setReplyDelete = (deleteVal) => {
   this.props.setDeleteReplyParent(deleteVal)
 }

  render() {
    const fontStyle = {fontSize:13,color:'#666'};
    if (this.state.isLoading) {
      return (
        <View style={styles.TongContentReply}>
          <ActivityIndicator />
        </View>
      )
    } else if (!this.state.repData) {
      return (
        <View style={[styles.TongContentReply,styles.center,{padding:10}]}>
          <Text style={styles.ContentReplyT}>댓글이 없습니다.</Text>
        </View>
      )
    } else {
      var replylist = this.state.repData.map((val, key) => {
        return (
          <View style={[styles.Row,{marginBottom:3}]} key={key}>
            <View style={{flex:1,alignItems:'flex-end'}}>
              <Text style={{fontSize:12,color:'#000',fontWeight:'bold'}}>{val.replyer} : </Text>
            </View>
            <View style={{flex:0.5}} />
            <View style={{flex:9}}>
              { "ID" === "ID" ? (
              <ReplyToggle
                replyVal={val}
                parentShow={this.props.parentShow}
                parentModify={this.modifyReply}
              />
              ) : (
                <Text style={{fontSize:12,color:'#666'}}>{val.reContent}</Text>
              )
              }
            </View>
            <View style={[styles.Row,{flex:1.5,justifyContent:'space-around'}]}>
            { "ID" === "ID" &&
              <TouchableOpacity onPress={() => this.setReplyDelete(val)}>
                <NBIcon name="trash-o" type="FontAwesome" style={[fontStyle,{color:'#db3928'}]} />
              </TouchableOpacity>
            }
            </View>
          </View>
        )
      })
      return (
        <View style={styles.TongContentReply}>
          {replylist}
        </View>
      )
    }
  }
}

class ReplyToggle extends Component {
  state={
    show:false,
    content: null,
    isModify: false,
    parentShow:this.props.parentShow,
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.parentShow !== prevProps.parentShow) {
      this.setState({isModify:false,content:this.props.reContent})
    }
  }

  setShow = () => {
    this.props.setShow
    this.setState({show:!this.state.show,isModify:!this.state.isModify,content:this.props.replyVal.reContent})
  }

  modifyReply = () => {
    this.props.parentModify(this.state.content, this.props.replyVal)
  }

  render() {
    return (
      <View>
      { this.state.isModify ? (
        <Form>
          <Textarea rowspan={5} style={{fontSize:12,color:'#666',backgroundColor:'#f9f9f9'}}
            value={this.state.content}
            onChangeText={(content) => this.setState({ content })}
          />
          <TouchableOpacity
            onPress={this.modifyReply}
            style={[styles.center,{width:"70%",height:20,backgroundColor:'green',marginTop:10,alignSelf:'center'}]}>
            <Text style={{fontSize:13,color:'#fff'}}>저장</Text>
          </TouchableOpacity>
        </Form>
        ) : (
        <TouchableOpacity onPress={this.setShow}>
          <Text style={{fontSize:12,color:'#666'}}>{this.props.replyVal.reContent}</Text>
        </TouchableOpacity>
        )
      }
      </View>
    )
  }
}


class ReplyMake extends Component {
  state={
    show: false,
    content: null,
  }

  writeReplyChild = () => {
    this.props.writeReplyParent(this.props.boardnum, this.state.content)
    this.setState({show:!this.state.show,content:null})
  }

  render() {
    return (
      <View style={styles.TongContentReply}>
      <TouchableOpacity style={{width:'100%',alignItems:'center'}}
        onPress={() => {this.setState({show:!this.state.show})}}>
        <Text style={this.state.show ? styles.ContentReplyT : styles.ContentReplyF}>{this.state.show ? "접기" : "댓글달기"} <Icon name={this.state.show ? "angle-up" : "comment"} /></Text>
      </TouchableOpacity>
      { this.state.show && (
        <View style={{padding:5,marginTop:10,width:'100%',backgroundColor:'#f9f9f9',flexDirection:'row'}}>
          <View style={{flex:3}}><Form>
            <Textarea onChangeText={(content) => this.setState({ content })}
              placeholder="댓글을 입력하세요." rowspan={10} style={{fontSize:10}} />
          </Form></View>
          <View style={{flex:1,justifyContent:'center'}}>
            <Button info small bordered onPress={this.writeReplyChild}>
              <NBIcon name="check" type="FontAwesome" style={{fontSize:11}} />
            </Button>
          </View>
        </View>
      )}
      </View>
    )
  }
}

class ToggleMenu extends Component {
  constructor(props) {
  super(props)
  this.state = {
    show: false,
    tongnum: StoreGlobal({type:'get',key:'tongnum'}),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.parentShow !== prevProps.parentShow) {
      this.setState({show:false})
    }
  }

  setShow = () => {
    this.props.setShow
    this.setState({show:!this.state.show})
  }

  setDeleteChild = () => {
    this.props.setDeleteParent(this.props.bbsValue)
  }
  setModifyChild = () => {
    this.props.setModifyParent(this.props.bbsValue)
	  StoreGlobal({type:'set',key:'boardnum',value:this.props.bbsValue.boardnum});
  }

  setReplyModify = () => {
    this.props.setModifyReplyParent(this.props.bbsValue)
  }


  render() {
    const boxHeight = 80;
    const boxWidth = 90;
    const fontStyle = {fontSize:13,color:'#666'};
    return (
        <View>
        <TouchableOpacity style={{paddingRight:20}}
          onPress={this.setShow}
        >
          <NBIcon name="ellipsis-v" type="FontAwesome" style={{fontSize:15,color:'#999'}} />
        </TouchableOpacity>
        { this.state.show &&
          <View style={[styles.Box,{borderWidth:1,borderColor:'#e9e9e9',width:boxWidth,position:'absolute',bottom:this.props.mode === "board" ? -boxHeight : 0,left:-boxWidth-20,zIndex:1}]}>
            <TouchableOpacity
              onPress={this.props.mode === "board" ? this.setModifyChild : this.setReplyModify}
            >
            <View style={[styles.Row,styles.grayBottom,{paddingVertical:3,marginBottom:10}]}>
              <Text style={fontStyle}>수정하기</Text>
              <NBIcon name="edit" type="FontAwesome" style={{color:'#999',fontSize:11}} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.mode === "board" ? this.setDeleteChild : this.setReplyDelete}
            >
            <View style={[styles.Row,styles.grayBottom,{paddingVertical:3,marginBottom:10}]}>
              <Text style={[fontStyle,{color:'#db3928'}]}>삭제</Text>
              <NBIcon name="trash-o" type="FontAwesome" style={[fontStyle,{color:'#db3928'}]} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({show:!this.state.show})}}>
            <View style={[styles.Row,styles.grayBottom,{paddingVertical:3}]}>
              <Text style={[fontStyle,{color:'#aaa'}]}>닫기</Text>
              <NBIcon name="times" type="FontAwesome" style={[fontStyle,{color:'#aaa'}]} />
            </View>
            </TouchableOpacity>
          </View>
        }
        </View>
    )
  }
}
