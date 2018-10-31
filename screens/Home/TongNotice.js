import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground
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

import styles from './styles.js';



class TongNotice extends Component{
  constructor(props) {
    super(props);
    this.setModify = this.setModify.bind(this);
    this.setDelete = this.setDelete.bind(this);
    this.state = {
      modal: false,
      content: null,
      isModify: false,
    }
  }

  _noticeList() {
    const data = Array.from({length: 10});
    return (
      <View style={{paddingBottom:20}}>
      {data.map((_, i) =>
        <View key={i}>
          <NoticeList
            name="관리자"
            division="관리자"
            content={`공지사항 ${i}`}
            setModifyParent={this.setModify}
            setDeleteParent={this.setDelete}
            argue="Hello"
          />
        </View>
      )}
      </View>
    );
  }

  setModify(modifyVal) {
    console.log("modifyVal",modifyVal)
    this.setState({modal: true,isModify: true});
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
    this.setState({modal:false,isModify:false})
    console.log("modify complete",modifyVal);
  }

  delete(args) {
    console.log("delete complete",args);
  }

  write() {

    //const {tongSeq, memId, content} = this.state;

    //let apiUrl = 'http://13.124.127.253/api/write.php';

    //options = {
    //  method: 'POST',
    //  headers: {
    //    'Accept' : 'application/json',
    //    'Content-Type': 'application/json',
    //  },
    //  body: JSON.stringify({
    //    seq : tongSeq,
    //    id: memId,
    //    content: content,
    //  })'}
      this.setState({modal:!this.state.modal,isModify:false})
      console.log('write');
    }

  render(){
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState({modal:!this.state.modal,isModify:false});
          }}>
            <Header style={{height:50,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
              <Left style={{flex:1}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({modal:!this.state.modal})
                  }}>
                  <Icon name='times' type="FontAwesome" style={{color:'#fff'}} />
                </TouchableOpacity>
              </Left>
              <Body style={{flex:2,alignItems:'center'}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>공지사항 {this.state.isModify ? "수정" : "작성"}</Text>
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
                  <Icon type='FontAwesome' name='camera' style={{color:'#999'}} />
                  <Text style={{color:'#ccc'}}>사진</Text>
                </Button>
                <Button>
                  <Icon type='FontAwesome' name='video-camera' style={{color:'#999'}} />
                  <Text style={{color:'#ccc'}}>동영상</Text>
                </Button>
              </FooterTab>
            </Footer>
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
          {this._noticeList()}
        </Content>
      </Container>
    );
  }
}
export default TongNotice;

class NoticeList extends Component{
  state={
    show: false,
    dimensions: undefined,
    boxHeight: 'auto',
  }

  setShow() {
    this.setState({show:!this.state.show});
    console.log(this.state.show);
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
            <Image style={styles.ContentHeaderImg} source={require('../../assets/images/profile_no.png')} />
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>{this.props.name}</Text>
              <Text style={{fontSize:10,color:'#aaa'}}>{this.props.division}</Text>
            </View>
          </View>
          { "ID" === "ID" &&
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
