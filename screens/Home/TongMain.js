import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, Image, Modal, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
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
    }


  }

  getTong = async() => {
    const { navigation } = this.props;
    const itemID = navigation.getParam('itemID');

    return fetch("http://13.124.127.253/api/results.php?page=tong&seq=" + itemID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
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
              console.log(responseJson);
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
                          <Icon name='ellipsis-v' size={25} />
                          </View>
                          <View style={styles.TongContentImgs}>
                          <Text>{val.content}</Text>
                          </View>
                          <View style={styles.TongContentReply}>
                          <Text style={styles.ContentReply}>댓글달기 <Icon name='comment' /></Text>
                      </View>
                    </View>
      })




    return (
      <Container>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.addComment}
        onRequestClose={() => {
          this.setAddComment(!this.state.addComment);
        }}>
          <Header style={{backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left>
              <TouchableHighlight
                onPress={() => {
                  this.setAddComment(!this.state.addComment);
                }}>
                <Icon name='times' size={25} />
              </TouchableHighlight>
            </Left>
            <Body>
              <Text style={{fontWeight:'bold',fontSize:20}}>글 쓰기</Text>
            </Body>
            <Right>
              <Text style={{fontSize:13}} onPress={() => {this.write()}}>완료</Text>
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

      <Header style={styles.HeaderStyle}>
      <ImageBackground source={{uri: `http://13.124.127.253/images/tongHead/` + this.state.tongImage}} style={styles.ImageHeader} >
      <Left style={[styles.LeftStyle]}>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate('Main')}
          styles={{width:20}}
        >
          <Icon active name="angle-left" size={25} />
        </Button>
      </Left>
      <Body />
      </ImageBackground>
      </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <View style={[styles.Box,styles.TongHeader]}>
            <Left>
              <H3>{this.state.tongTitle}</H3>
              <View style={styles.TongSubs}>
                <Text style={{fontSize:14}}>멤버 1</Text>
                <Text style={[styles.TongInvite,{fontSize:14}]}><Icon name="plus-circle" /> 멤버 초대</Text>
              </View>
            </Left>
            <Right>
              <Button small rounded style={{backgroundColor:'#cc0404'}} onPress={() => {this.setAddComment(true)}}><Text>글쓰기</Text></Button>
            </Right>
          </View>


          {bbsList}
        </Content>
      </Container>
    );
  }
  }
}
export default TongMain;
