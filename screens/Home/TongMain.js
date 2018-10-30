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


class TongMain extends Component{

  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isLoading2: true,
        dataSource: null,
        bbsData: null,
        addComment: false,
        tongSeq: 10,
        memId: 'SID',
        content: null,
        tongTitle: null,
        tongImage: null,
        scrollY: new Animated.Value(0),
    }


  }

  getTong = async() => {
    const { navigation } = this.props;
    const itemID = navigation.getParam('itemID');

    return fetch("http://13.124.127.253/api/results.php?page=tong&seq=" + itemID)
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
      return fetch("http://13.124.127.253/api/results.php?page=bbs&seq=10")
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

  setAddComment(visible) {
    this.setState({addComment: visible});
  }

  write() {

    const {tongSeq, memId, content} = this.state;

    let apiUrl = 'http://13.124.127.253/api/write.php';

    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seq : tongSeq,
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

  render(){
    const TongType = this.props.navigation.getParam('tongType');

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
        this.state.tongTitle = val.tongTitle;
        this.state.tongImage = val.tongImage;
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
                </View>
                { true &&
                  <View style={{marginVertical:10}}>
                  <ScrollView horizontal={true}>
                  <View style={[styles.TongContentImgs]}>
                    <Image source={require('../../assets/images/profile_no.png')} style={styles.TongContentImgList} />
                    <Image source={require('../../assets/images/profile_no.png')} style={styles.TongContentImgList} />
                    <Image source={require('../../assets/images/profile_no.png')} style={styles.TongContentImgList} />
                    <Image source={require('../../assets/images/profile_no.png')} style={styles.TongContentImgList} />
                    <Image source={require('../../assets/images/profile_no.png')} style={styles.TongContentImgList} />
                    <Image source={require('../../assets/images/profile_no.png')} style={styles.TongContentImgList} />
                  </View>
                  </ScrollView>
                  </View>
                }
                <View style={styles.TongContents}>
                  <Text style={{fontSize:13}}>{val.content}</Text>
                </View>
                <ReplyView />
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
            this.setAddComment(!this.state.addComment);
          }}>
            <Header style={{height:50,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
              <Left style={{flex:1}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setAddComment(!this.state.addComment);
                  }}>
                  <Icon name='times' color={'#fff'} size={25} />
                </TouchableHighlight>
              </Left>
              <Body style={{flex:1,alignItems:'center'}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>글쓰기</Text>
              </Body>
              <Right  style={{flex:1}}>
                <Text style={{fontSize:13,color:'#fff'}} onPress={() => {this.write()}}>완료</Text>
              </Right>
            </Header>
            <Content style={{padding:10}}>
              <Form>
                <ImageBackground source={require('../../assets/images/backgroundLogo.png')} style={{width:'100%'}}>
                <Textarea onChangeText={(content) => this.setState({ content })} rowSpan={20} />
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
          <View style={[styles.Box,{marginTop:HEADER_MAX_HEIGHT+10,height:60,marginVertical:10}]}>
            <Text>날씨</Text>
          </View>
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
              <NBIcon name="angle-left" type="FontAwesome" />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
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
  state={
    show: false,
  }
  render() {
    return (
      <View style={styles.TongContentReply}>
      <TouchableOpacity onPress={() => {this.setState({show:!this.state.show})}}>
        <Text style={this.state.show ? styles.ContentReplyT : styles.ContentReplyF}>{this.state.show ? "접기" : "댓글달기"} <Icon name={this.state.show ? "angle-up" : "comment"} /></Text>
      </TouchableOpacity>
      { this.state.show && (
        <View style={{padding:5,marginTop:10,width:'100%',backgroundColor:'#f9f9f9',flexDirection:'row'}}>
          <View style={{flex:3}}><Form>
            <Textarea placeholder="댓글을 입력하세요." rowspan={10} style={{fontSize:10}} />
          </Form></View>
          <View style={{flex:1,justifyContent:'center'}}>
            <Button info small bordered>
              <NBIcon name="check" type="FontAwesome" style={{fontSize:11}} />
            </Button>
          </View>
        </View>
      )}
      </View>
    )
  }
}
