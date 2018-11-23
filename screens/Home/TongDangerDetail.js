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
  ScrollView
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

import { StoreGlobal } from '../../App';

import styles from './styles.js';
import pickableImage from "../common.js"

class TongDangerDetail extends pickableImage{
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalData: null,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
    }
  }

  getNoti = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=selectNotice&tongnum=" + this.state.tongnum)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading: false,
                DataSource: responseJson,
              });
            })
            .catch((error) => {
              console.error(error);
            });
  }
  componentDidMount() {
    console.log(this.props.navigation.getParam('dangerData'))
  }

  _goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }
  render(){
    const { modalData } = this.state;
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal});
            }}>
          </Modal>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
              <TouchableOpacity style={{padding:10}}
                onPress={this._goBack}
              >
                <Icon name="angle-left" type="FontAwesome" style={{color:'#fff'}}/>
              </TouchableOpacity>
            </Left>
            <Body style={{flex:1,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>위험치워줘</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f4f4f4" }}
            contentContainerStyle={{flex:1}}
          >
            <View style={[styles.Box,styles.row2,{height:70,marginBottom:10}]}>
              <View style={{width:50,height:50,borderWidth:1,borderRadius:40,borderColor:'#999',padding:2}}>
                <Image source={{uri: 'http://13.124.127.253/images/tongHead/photo_3.jpg'}}
                  style={{flex:1,borderRadius:40}}
                />
              </View>
              <View style={{flex:3,justifyContent:'space-between',paddingLeft:30}}>
                <Text style={{fontWeight:'bold',fontSize:12}}>작성자</Text>
                <Text style={{fontSize:11,color:'#999'}}>어디회사 / 직급</Text>
                <Text style={{fontSize:11,color:'#999'}}>010-1111-1111</Text>
              </View>
            </View>
            {/* 처리 전 */}
            <View style={[styles.Box,{flex:1}]}>
              <Text style={{fontSize:15,color:'#db3928',position:'absolute',top:5,left:5}}>처리 전</Text>
              <View style={{flex:1}}>
                <View style={{flex:1}}>
                  <Image source={{uri: 'http://13.124.127.253/images/tongHead/photo_3.jpg'}}
                    style={{flex:1}}
                    resizeMode="contain" />
                </View>
                <View style={[styles.row2,{marginTop:3,width:'80%',alignSelf:'center'}]}>
                  <View style={styles.center}>
                    <Text style={{fontSize:13,color:'#666'}}>내용 :</Text>
                  </View>
                  <View style={[styles.grayBottom,{flex:1}]}>
                    <TextInput style={{fontSize:13}}
                      underlineColorAndroid="transparent"
                      editable={"id" === "id" ? true : false }
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* 처리 후 */}
            <View style={[styles.Box,{flex:1}]}>
              <Text style={{fontSize:15,color:'#2e6d02',position:'absolute',top:5,left:5}}>처리 후</Text>
              <View style={{flex:1}}>
                <View style={{flex:1}}>
                  <TouchableOpacity style={{width:'100%',height:'100%'}}
                    onPress={this._pickImage2}
                  >
                    { this.state.imageSource ? (
                      <Image source={{uri: this.state.imageSource}}
                        style={{flex:1}}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={[styles.center,{flex:1}]}>
                        <View style={[styles.center,{width:'50%',height:'100%',borderWidth:1,borderColor:'#666',borderRadius:10}]}>
                          <Icon name="camera" type="FontAwesome" style={{color:'#666',marginBottom:10}} />
                          <Text style={{color:'#666'}}>사진 올리기</Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[styles.row2,{marginTop:3,width:'80%',alignSelf:'center'}]}>
                  <View style={styles.center}>
                    <Text style={{fontSize:13,color:'#666'}}>내용 :</Text>
                  </View>
                  <View style={[styles.grayBottom,{flex:1}]}>
                    <TextInput style={{fontSize:13}}
                      underlineColorAndroid="transparent"
                      editable={"id" === "id" ? true : false }
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* 버튼 */}
            <View style={[styles.row2,{height:40,padding:5}]}>
              <View style={{flex:1,paddingHorizontal:30}}>
              <Button
                rounded
                block
                iconLeft
                success
                small
              >
                <Icon name="check" type="FontAwesome" />
                <Text>완료</Text>
              </Button>
              </View>
              <View style={{flex:1,paddingHorizontal:30}}>
              <Button
                rounded
                block
                iconLeft
                danger
                small
              >
                <Icon name="close" type="FontAwesome"/>
                <Text>삭제</Text>
              </Button>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default TongDangerDetail;
