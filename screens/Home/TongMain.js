import React, { Component } from 'react';
import { Animated,ImageBackground, TouchableOpacity, Image, Modal,ScrollView, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
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
import { NavigationActions } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";
import tong from "../common.js";

import { StoreGlobal } from '../../App';

var variable = "123";

class TongMain extends Component{

  constructor(props) {
    super(props);

    this.setModify = this.setModify.bind(this);
    this.setDelete = this.setDelete.bind(this);
    this.writeReply = this.writeReply.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);


	const { navigation } = this.props;
	const itemID = navigation.getParam('itemID');
    this.state = {
        isLoading: true,
        isLoading2: true,
        isLoading3: true,
        dataSource: null,
        bbsData: null,
        addComment: false,
        tongSeq: 10,
        memId: 'SID',
        content: null,
        tongTitle: null,
        tongImage: null,
        scrollY: new Animated.Value(0),
        isModify: false,
		tongnum: itemID,
		reContent: null,
		modifyVal: "",
    repData: null,
    refresh: null,
		}


  }


  getTong = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=tong&seq=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson,
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
              });
            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentDidMount() {
    //console.log("START componentDidMount");
    this.getTong();
    this.getBbs();
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  setAddComment(visible) {
    this.setState({addComment: visible,isModify:false});
  }

  setModify(modifyVal) {
    console.log("setModify함수입니다::::::",modifyVal)
    this.setState({addComment: true,isModify: true,modifyVal: modifyVal});
  }
  setDelete(deleteVal) {
    console.log("setDelte");
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

  modify(modifyVal) {
    this.setState({addComment:false,isModify:false})
    console.log("modify complete",modifyVal);
	this.setState.modifyVal(modifyVla);
  }

  delete(args) {
    console.log("delete complete",args);
  }

  writeReply(boardnum, content) {
    if(content == null) {
      Alert.alert("현장통","댓글 내용을 입력해주세요.");
    } else {
      console.log
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

  write() {

    const {tongnum, memId, content} = this.state;

    let apiUrl = 'http://13.124.127.253/api/write.php';

    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seq : tongnum,
        id: memId,
        content: content,
      })
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          console.log(responseJson);
          this.props.navigation.navigate("Main");
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

      let bbsList = this.state.bbsData.map((val, key) => {
        return <View style={styles.TongContentBox} key={key}>
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
                  />
                  }
                </View>
                { true &&
                  <View style={{marginVertical:10}}>
                    <ScrollView horizontal={true}>
                      <View style={[styles.TongContentImgs]}>
                        <Image source={require('../../assets/images/noImage.png')} style={styles.TongContentImgList} />
                        <Image source={require('../../assets/images/noImage.png')} style={styles.TongContentImgList} />
                        <Image source={require('../../assets/images/noImage.png')} style={styles.TongContentImgList} />
                        <Image source={require('../../assets/images/noImage.png')} style={styles.TongContentImgList} />
                        <Image source={require('../../assets/images/noImage.png')} style={styles.TongContentImgList} />
                        <Image source={require('../../assets/images/noImage.png')} style={styles.TongContentImgList} />
                      </View>
                    </ScrollView>
                  </View>
                }
                <View style={[styles.TongContents,"isReply" === "isReply" && styles.grayBottom]}>
                  <Text style={{fontSize:13}}>{val.content}</Text>
                </View>
                <ReplyView
                  boardnum={val.boardnum}
                  tongnum={val.tongnum}
                  refresh={this.state.refresh}
                />
                <ReplyMake
                  writeReplyParent={this.writeReply}
                  boardnum={val.boardnum}
                  tongnum={val.tongnum}
                />
              </View>
      })



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
          visible={this.state.addComment}
          onRequestClose={() => {
            this.setAddComment(!this.state.addComment),
            this.setState({modifyVal: ""})
          }}>
            <Header style={{height:50,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
              <Left style={{flex:1}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setAddComment(!this.state.addComment),
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
            <Content style={{padding:10}}>
              <Form>
                <ImageBackground source={require('../../assets/images/backgroundLogo.png')} style={{width:'100%'}}>
                <Textarea onChangeText={(content) => this.setState({ content })} rowSpan={20}
                  value={this.state.modifyVal.content}
                />
                </ImageBackground>
              </Form>
            </Content>
            <Footer>
              <FooterTab style={{backgroundColor:'#fff'}}>
                <Button>
                  <NBIcon type='FontAwesome' name='camera' style={{color:'#999'}} />
                  <Text style={{color:'#ccc'}}>사진</Text>
                </Button>
                <Button>
                  <NBIcon type='FontAwesome' name='video-camera' style={{color:'#999'}} />
                  <Text style={{color:'#ccc'}}>동영상</Text>
                </Button>
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
          {weatherBox}
          {bbsList}
          </ScrollView>
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
                      <Text style={{fontSize:13}}>{TongType === 'T' ? '현장' : '커뮤니티'}동료(17)</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingRight:10}}>
                      <TouchableOpacity onPress={() => {this.props.navigation.navigate('Test')}}>
                        <Text style={[styles.TongInvite,{fontSize:13}]}><Icon name="plus-circle" /> 동료초대</Text>
                      </TouchableOpacity>
                      {TongType === 'T' &&
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('TongInfo')}>
                          <Text style={[styles.TongInvite,{fontSize:13}]}><Icon name="map-marker" /> 현장위치</Text>
                        </TouchableOpacity>
                      }
                    </View>
                  </View>
                </View>
                <View style={{flex:1,paddingHorizontal:5}}>
                  <Button
                    small
                    rounded
                    style={{backgroundColor:'#db3928'}}
                    onPress={() => {this.setAddComment(!this.state.addComment)}}
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
            <Animated.View style={{width:30,height:30,position:'absolute',top:32,left:10,backgroundColor:'#fff8',borderRadius:15,opacity:imageOpacity}}>
              <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}
                onPress={() => {this.props.navigation.navigate('Main')}}
              >
              <NBIcon name="angle-left" type="FontAwesome" />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{width:30,height:30,position:'absolute',top:32,left:10,borderRadius:15,opacity:imageOpacityR}}>
              <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}
                onPress={() => {this.props.navigation.navigate('Main')}}
              >
              <NBIcon name="angle-left" type="FontAwesome" style={{color:'#fff'}} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          { "isAttend" === "isAttend" &&
          <View style={{width:100,position:'absolute',top:35,right:10,zIndex:1}}>
            <Button transparent small block rounded
              style={{backgroundColor:'#db3928'}}
              onPress={() => {this.setState({refresh:Date(Date.now()).toString()}),console.log("click",this.state.refresh)}}
            >
              <Text style={{color:'#fff',fontSize:15}}>출근하기</Text>
            </Button>
          </View>
          }
        </Content>
      </Container>
    );
  }
  }
}
export default TongMain;

const HEADER_MAX_HEIGHT = 230;
const HEADER_MIN_HEIGHT = 68;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ReplyView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      show: false,
      repData: null,
      refresh: 'nn',
    }
  }

  componentDidMount() {
    this.getRep()
  }

  componentDidUpdate(prevProps) {
    if (this.props.refresh !== prevProps.refresh) {
      console.log("class update")
      this.getRep()
    }
  }

  getRep() {
     return fetch("http://13.124.127.253/api/results.php?page=reply&seq=" + this.props.tongnum + "&board=" + this.props.boardnum)
             .then((response) => response.json())
             .then((responseJson) => {
                this.setState({
                  isLoading: false,
                  repData: responseJson,
                });
             })
             .catch((error) => {
               console.error(error);
             });
 }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.TongContentReply}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.repData == null) {
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
              <Text style={{fontSize:12,color:'#666'}}>{val.reContent}</Text>
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

class ReplyList extends Component {
  render() {
    return (
      <View style={{marginTop:3,paddingVertical:3,flexDirection:'row',borderBottomColor:'#f9f9f9',borderBottomWidth:1}}>
        <View style={{flex:1,justifyContent:'center'}}>
          <Text style={{fontSize:11,fontWeight:'bold'}}>{this.props.rName} :</Text>
        </View>
        <View style={{flex:4,justifyContent:'center'}}>
          <Text style={{fontSize:10}}>{this.props.rContent}</Text>
        </View>
      </View>
    )
  }
}

class ToggleMenu extends Component {
  state={
    show: false,
  }

  setDeleteChild = () => {
    this.props.setDeleteParent(this.props.argue)
  }
  setModifyChild = () => {
    this.props.setModifyParent(this.props.bbsValue)
  }


  render() {
    const boxHeight = 80;
    const boxWidth = 90;
    const fontStyle = {fontSize:13,color:'#666'};
    return (
      <View>
        <TouchableOpacity style={{paddingRight:20}}
          onPress={() => {this.setState({show: !this.state.show})}}
        >
          <NBIcon name="ellipsis-v" type="FontAwesome" style={{fontSize:15,color:'#999'}} />
        </TouchableOpacity>
        { this.state.show &&
          <View style={[styles.Box,{borderWidth:1,borderColor:'#e9e9e9',width:boxWidth,position:'absolute',bottom:-boxHeight,left:-boxWidth-20,zIndex:1}]}>
            <TouchableOpacity
              onPress={this.setModifyChild}
            >
            <View style={[styles.Row,styles.grayBottom,{paddingVertical:3,marginBottom:10}]}>
              <Text style={fontStyle}>수정하기</Text>
              <NBIcon name="edit" type="FontAwesome" style={{color:'#999',fontSize:11}} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.setDeleteChild}
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
