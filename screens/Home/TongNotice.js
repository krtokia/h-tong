import React, { Component } from 'react';
import {
  ActionSheet,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  TextInput,
  Picker,
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Button,
   Icon,
   Accordion,
   Header,
   Left,
   Right,
   Body,
   Form,
   Textarea,
   Footer,
   FooterTab
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import { StoreGlobal } from '../../App';

import styles from './styles.js';

class TongNotice extends Component{
  constructor(props) {
    super(props);
    this.setModify = this.setModify.bind(this);
    this.setDelete = this.setDelete.bind(this);
    this.state = {
      isLoading: true,
      modal: false,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      content: null,
      isModify: false,
      parentShow: false,
      bbsData: null,
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      modifyVal: null,
      title: "",
      readGrade: 10,
    }
  }

  getNoti = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=selectNotice&tongnum=" + this.state.tongnum)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading: false,
                bbsData: responseJson,
                parentShow: !this.state.parentShow,
                content: null,
                title: "",
                readGrade: 10,
              });
            })
            .catch((error) => {
              console.error(error);
            });
  }
  componentDidMount() {
    this.getNoti()
  }
  _noticeList() {
    const data = Array.from({length: 10});
    return (
      <TouchableWithoutFeedback onPress={() => {this.setState({parentShow:!this.state.parentShow})}}>
      <View style={{paddingBottom:20}}>
      {data.map((_, i) =>
        <View key={i}>
          <NoticeList
            name={val.notiWriter}
            division="관리자"
            content={`공지사항 ${i}`}
            setModifyParent={this.setModify}
            setDeleteParent={this.setDelete}
            argue="Hello"
            parentShow={this.state.parentShow}
          />
        </View>
      )}
      </View>
      </TouchableWithoutFeedback>
    );
  }

  setModify(modifyVal) {
    this.setState({
      modal: true,
      isModify: true,
      content:modifyVal.notiContent,
      modifyVal:modifyVal,
      title:modifyVal.notiTitle,
      readGrade: modifyVal.readGrade,
    });
    console.log("readgrade::"+this.state.readGrade)
  }

  setDelete(deleteVal) {
    this.delete(deleteVal);
  }

  delete(deleteVal) {
    const {tongnum, memId} = this.state;
    let apiUrl = 'http://13.124.127.253/api/writeNoti.php?action=deleteNoti';
    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tongnum : tongnum,
        seq: deleteVal.seq,
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
          this.getNoti();
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log(error)
      });
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
    this.setState({modal:false,isModify:false})
    const {tongnum, memId, content, title, readGrade} = this.state;

    let apiUrl = 'http://13.124.127.253/api/writeNoti.php?action=updateNoti';
	   options = {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tongnum : tongnum,
          seq: this.state.modifyVal.seq,
          notiContent: content,
          notiTitle: title,
          readGrade: readGrade,
        })
      }
      console.log(options)
      return fetch(apiUrl, options).then((response) => response.json())
        .then((responseJson)=> {
          if(responseJson === 'succed') {
            console.log(responseJson);
            Alert.alert(
              "현장통",
              "수정 되었습니다."
            )
            this.getNoti()
          } else {
            console.log(responseJson);
          }
        }).catch((error) => {
          console.log(error)
        });
  }

  write() {
    this.setState({modal:!this.state.modal,isModify:false})
    const {tongnum, memId, content, title, readGrade} = this.state;

    let apiUrl = 'http://13.124.127.253/api/writeNoti.php?action=insertNoti';

    options = {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tongnum : tongnum,
        notiWriter: memId,
        notiContent: content,
        notiTitle: title,
        readGrade: readGrade,
      })}
      return fetch(apiUrl, options).then((response) => response.json())
        .then((responseJson)=> {
          if(responseJson === 'succed') {
            console.log("succed",responseJson);
            this.getNoti()
          } else {
            console.log("Fail",responseJson);
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
    } else {
      let notiList;
      if (this.state.bbsData) {
        notiList = this.state.bbsData.map((val, key) => {
          return <View key={key}>
                  <NoticeList
                    name={val.notiWriter}
                    photo={val.photo}
                    division="관리자"
                    title={val.notiTitle}
                    content={val.notiContent}
                    setModifyParent={this.setModify}
                    setDeleteParent={this.setDelete}
                    argue={val}
                    parentShow={this.state.parentShow}
                  />
                 </View>
        })
      } else {
        notiList =
          <View style={[styles.center,{width:'100%',height:100}]}>
            <Text>공지사항이 없습니다.</Text>
          </View>
      }
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal,isModify:false,content:null});
            }}>
              <Header style={{height:50,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
                <Left style={{flex:1}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({modal:!this.state.modal,isModify:false,content:null})
                    }}>
                    <Icon name='times' type="FontAwesome" style={{color:'#fff'}} />
                  </TouchableOpacity>
                </Left>
                <Body style={{flex:2,alignItems:'center'}}>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>공지사항 {this.state.isModify ? "수정" : "작성"}</Text>
                </Body>
                <Right  style={{flex:1}}>
                  <Text style={{fontSize:13,color:'#fff'}} onPress={() => this.division(this.state.isModify)}>완료</Text>
                </Right>
              </Header>
              <Content style={{padding:10}}>
                <Form>
                  <Text style={{fontSize:13}}>공지 제목:</Text>
                  <TextInput
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title ? this.state.title : ""}
                    underlineColorAndroid="transparent"
                    style={{borderWidth:1,borderColor:'#999',borderRadius:10,marginTop:5}}
                  />
                  <View style={{height:20}} />
                  <Text style={{fontSize:13}}>읽기 권한:</Text>
                  <Picker
                    selectedValue={this.state.readGrade}
                    style={{width:'90%',height:30}}
                    onValueChange={(itemValue, itemIndex) => this.setState({readGrade: itemValue})}
                  >
                    <Picker.Item label="시공사만" value="3" />
                    <Picker.Item label="감리 이상" value="5" />
                    <Picker.Item label="협력사 이상" value="7" />
                    <Picker.Item label="전체" value="10" />
                  </Picker>
                  <View style={{height:20}} />
                  <Text style={{fontSize:13}}>공지 내용</Text>
                  <ImageBackground source={require('../../assets/images/backgroundLogo.png')} style={{width:'100%'}}>
                  <Textarea onChangeText={(content) => this.setState({ content })} rowSpan={15}
                    style={{borderWidth:1,borderRadius:10,marginTop:10,borderColor:'#999'}}
                    value={this.state.content ? this.state.content : ""}
                  />
                  </ImageBackground>
                </Form>
              </Content>
          </Modal>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:1,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>공지사항</Text>
            </Body>
            <Right  style={{flex:1}}>
              { true &&
                <TouchableOpacity style={{marginRight:10,marginTop:10}}
                  onPress={() => {this.setState({modal:!this.state.modal,isModify:false})}}
                >
                  <Text style={{fontSize:15,color:'#fff'}}>작성</Text>
                </TouchableOpacity>
              }
            </Right>
          </Header>
          <Content
           style={{backgroundColor:'#f9f9f9',paddingBottom:10,}}
          >
          <TouchableWithoutFeedback onPress={() => {this.setState({parentShow:!this.state.parentShow})}}>
            <View>
            {notiList}
            <View style={{height:30,marginTop:30,width:'100%'}} />
            </View>
          </TouchableWithoutFeedback>

          </Content>
        </Container>
      );
    }
  }
}
export default TongNotice;

class NoticeList extends Component{
  state={
    show: false,
    dimensions: undefined,
    boxHeight: 'auto',
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.parentShow !== prevProps.parentShow) {
      this.setState({show:false})
      this.setState({boxHeight:'auto'})
    }
  }
  setShow() {
    this.setState({show:!this.state.show});
    if(this.state.dimensions.height < 50) {
      this.setState({boxHeight:80})
    }
    if (this.state.show) {
      this.setState({boxHeight:'auto'})
    }
  }
  setDeleteChild = () => {
    this.props.setDeleteParent(this.props.argue)
  }
  setModifyChild = () => {
    this.props.setModifyParent(this.props.argue)
  }

  render() {
    const boxHeight = 80;
    const boxWidth = 90;
    const fontStyle = {fontSize:13,color:'#666'};
    return(
      <View style={[styles.TongContentBox]}>
        <View style={styles.TongContentHeader}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width:40,height:40,borderRadius:50}}>
              <Image style={[styles.ContentHeaderImg]} source={{uri: 'http://13.124.127.253/images/userProfile/'+this.props.photo}} />
            </View>
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>{this.props.name}</Text>
              <Text style={{fontSize:10,color:'#aaa'}}>{this.props.division}</Text>
            </View>
          </View>
          { "isAdmin" === "isAdmin" &&
          <View>
            <TouchableOpacity style={{paddingRight:20}}
              onPress={() => {this.setShow()}}
            >
              <Icon name="ellipsis-v" type="FontAwesome" style={{fontSize:15,color:'#999'}} />
            </TouchableOpacity>
            { this.state.show &&
            <View style={[styles.Box,{borderWidth:1,borderColor:'#e9e9e9',position:'absolute',width:boxWidth,bottom:-boxHeight,left:-boxWidth-20,zIndex:1}]}>
              <TouchableOpacity
                onPress={this.setModifyChild}
              >
              <View style={[styles.Row,styles.grayBottom,{paddingVertical:3,marginBottom:10}]}>
                <Text style={fontStyle}>수정하기</Text>
                <Icon name="edit" type="FontAwesome" style={{color:'#999',fontSize:11}} />
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.setDeleteChild}
              >
              <View style={[styles.Row,styles.grayBottom,{paddingVertical:3,marginBottom:10}]}>
                <Text style={[fontStyle,{color:'#db3928'}]}>삭제</Text>
                <Icon name="trash-o" type="FontAwesome" style={[fontStyle,{color:'#db3928'}]} />
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.setShow()}}>
              <View style={[styles.Row,styles.grayBottom,{paddingVertical:3}]}>
                <Text style={[fontStyle,{color:'#aaa'}]}>닫기</Text>
                <Icon name="times" type="FontAwesome" style={[fontStyle,{color:'#aaa'}]} />
              </View>
              </TouchableOpacity>
            </View>
            }
          </View>
          }
        </View>
        <View style={[styles.TongContents,styles.grayBottom,{height:this.state.boxHeight}]} onLayout={this.onLayout}>
          <Text style={{fontSize:13,fontWeight:'bold'}}>{this.props.title}</Text>
        </View>
        <View style={[styles.TongContents,{height:this.state.boxHeight}]} onLayout={this.onLayout}>
          <Text style={{fontSize:13}}>{this.props.content}</Text>
        </View>
      </View>
    )
  }
  onLayout = event => {
    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }
}
