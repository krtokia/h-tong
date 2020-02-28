import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput
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
   FooterTab,
   ActionSheet
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import { StoreGlobal } from '../../App';
import pickableImage from "../common.js"
var BUTTONS = ["카메라 촬영", "앨범에서 선택"];

import styles from './styles.js';

class TongWork extends Component{
  constructor(props) {
    super(props);
    this.imgupload = this.imgupload.bind(this);

    this.state = {
      isLoading: true,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum:StoreGlobal({type:'get',key:'tongnum'}),
      workData: null,
      dateKor: "",
      dateOrigin: "",
      modal:false,
      modalImg:null,
      memoModal: false
    }
  }

  numFormat(variable) {
    variable = Number(variable).toString();
    if(Number(variable) < 10 && variable.length == 1) {
      variable = "0" + variable;
    }
    return variable;
  }



  getWorklist = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=getWorkListMain&tongnum=" + this.state.tongnum + "&id=" + this.state.memId)
            .then((response) => response.json())
            .then((responseJson) => {
              if(!responseJson) {
                responseJson = new Array();
              }
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              nowDate = new Date(Date.now());
              dateKor = nowDate.getFullYear()+"년 "+this.numFormat(nowDate.getMonth()+1)+"월 "+this.numFormat(nowDate.getDate())+"일";
              dateOrigin = nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate();
//              responseJson.unshift({workdate:'9999년 99월 99일'})
              var resCount = 0;
              responseJson.map((val) => {
                if(val.userId === this.state.memId) {
                  resCount++
                }
              })
              this.setState({
                isLoading: false,
                workData: responseJson,
                dateKor:dateKor,
                dateOrigin:dateOrigin,
                resCount: resCount
              })
            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentDidMount() {
    this.getWorklist();
  }

  memoSet = (imageSource) => {
    this.setState({imageSource,memoModal:true})
  }

  imgupload() {
    const { imageSource, memo } = this.state;
    let apiUrl = 'http://13.124.127.253/api/worklist.php?';
    let uri = null;
    let fileType = null;

    const formData = new FormData();

    formData.append('tongnum', StoreGlobal({type:'get',key:'tongnum'}));
    formData.append('userId', StoreGlobal({type:'get',key:'loginId'}));
    formData.append('memo', memo);

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
          this.getWorklist();
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

  dataConvert(data) {
    var dateObj = {};
    for (var i = 0; i<data.length; i++) {
      var num = data[i].workdate;
      if(dateObj[num]) {
        dateObj[num] = [ ...dateObj[num], data[i].photolist];
      } else {
        dateObj[num] = [data[i].photolist];
      }
    }
    console.log(dateObj)
    return dateObj;
  }

  imgShow = (imgData) => {
    this.setState({modal:!this.state.modal,modalImg:imgData})
  }

  render(){
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let insertYn = true;
      let isToday = false;
      // let worklist;
      // let prevDate;
      // let flag = false;
      // let photoArray = [];
      // let photoLast;
      let worklist;
      if (this.state.workData) {
        convertData = this.dataConvert(this.state.workData)
        worklist = Object.keys(convertData).map((val,key) => {
          if(this.state.dateKor === val) {
            isToday = true;
            insertYn = false;
          } else {
            isToday = false;
          }
          return <View key={key}>
            <WorkList
              workdate={val}
              photolist={convertData[val]}
              method={this.memoSet}
              imgMethod={(data) => this.imgShow(data)}
              isToday={isToday}
              resCount={this.state.resCount}
            />
          </View>
        })
        // worklist = this.state.workData.map((val, key) => {
        //   photoLast = null;
        //   if(prevDate === val.workdate) {
        //     prevDate = val.workdate;
        //     flag = false;
        //   } else if(!prevDate){
        //     prevDate = val.workdate;
        //     flag = false;
        //   } else {
        //     flag = true;
        //     prevDate = val.workdate;
        //   }
        //   photoArray.push(val.photolist)
        //   if(flag) {
        //     if(this.state.dateKor === val.workdate) {
        //       insertYn = false;
        //       isToday = true;
        //     } else {
        //       isToday = false;
        //     }
        //     photoLast = photoArray;
        //     photoArray = new Array();
        //     return <View key={key}>
        //       <WorkList
        //         workdate={val.workdate}
        //         photolist={photoLast}
        //         method={this.imgupload}
        //         isToday={isToday}
        //       />
        //     </View>
        //   }
        // })
      } else {
        worklist = <View />
      }
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal: false, modalImg:null});
            }}>
            <View style={[styles.center,{flex:1,backgroundColor:'#0008'}]}>
              { this.state.modalImg && (
                <TouchableWithoutFeedback onPress={() => this.setState({modal:false,modalImg:null})}>
                <Image source={{uri: `http://13.124.127.253/images/workList/`+this.state.modalImg}}
                  style={styles.imageScale}
                />
                </TouchableWithoutFeedback>
              )}
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.memoModal}
            onRequestClose={() => {
              this.setState({memoModal:false,imageSource:null})
            }}>
            <View style={[styles.center,{flex:1,backgroundColor:'#0008'}]}>
              <View style={{width:'80%',height:'50%',backgroundColor:'#fff',padding:10}}>
                <View style={{flex:2,justifyContent:'center'}}>
                  <Image source={{uri: this.state.imageSource }} style={{flex:1,resizeMode:'contain'}}/>
                </View>
                <View style={{flex:1,justifyContent:'center',padding:5}}>
                  <Text style={{fontSize:12,color:'#666',marginBottom:3}}>한줄 메모:</Text>
                  <TextInput
                    ref="memo"
                    style={[{borderColor:'#eee',borderWidth:1,width:'100%',height:'auto',fontSize:12,paddingRight:5}]}
                    placeholder="30자 이하로 작성해주십시오."
                    underlineColorAndroid="transparent"
                    onChangeText={(content) => {
                      if(content.length > 30) {
                        Alert.alert('30자 이하로 작성해주십시오.')
                        content = content.substr( 0, content.length-1 )
                      }
                      this.setState({memo:content})
                    }}
                  />
                </View>
                <View style={[styles.row2,{flex:1,alignItems:'flex-end',paddingBottom:5}]}>
                  <View style={{flex:1,marginRight:3}}>
                    <Button
                      rounded
                      block
                      style={{backgroundColor:'#db3928'}}
                      onPress={() => {
                        this.setState({memoModal:false})
                        this.imgupload()
                      }}
                    >
                      <Text>완료</Text>
                    </Button>
                  </View>
                  <View style={{flex:1,marginLeft:3}}>
                    <Button
                      rounded
                      block
                      style={{backgroundColor:'#aaa'}}
                      onPress={() => {
                        this.setState({memoModal:false,imageSource:null})
                      }}
                    >
                      <Text>취소</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:1,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>작업실명제</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
           style={{backgroundColor:'#f9f9f9',paddingBottom:10}}
           contentContainerStyle={{flex:1}}
          >
            <ScrollView style={{flex:1}}>
              { insertYn &&
                <WorkList
                  workdate={this.state.dateKor}
                  photolist={new Array()}
                  method={this.memoSet}
                  isToday={true}
                />
              }
              {worklist}
            </ScrollView>
          </Content>
        </Container>
      );
    }
  }
}
export default TongWork;

class WorkList extends pickableImage {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      photolist: this.props.photolist
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.imageSource !== prevState.imageSource) {
      if (!this.state.imageSource.cancelled) {
        this.props.method(this.state.imageSource)
      }
    }
    if (this.props.photolist !== prevProps.photolist) {
      this.setState({photolist: this.props.photolist})
    }
  }

  render() {
    const textStyle={fontSize:12,color:'#999'}
    const headerStyle={fontSize:14,color:'#666'}
    const lineStyle={fontSize:10,color:'#666'}

    let photolist = this.state.photolist.map((data, key) => {
      if(data) {
      return <View style={styles.workListBox} key={key}>
          <TouchableWithoutFeedback onPress={() => this.props.imgMethod(data)}>
          <Image source={{uri: `http://13.124.127.253/images/workList/`+data}}
            style={{width:"100%", height:"100%", resizeMode:'contain'}}
          />
          </TouchableWithoutFeedback>
        </View>
      } else {
        return <View key={key}/>
      }
    })
    return (
      <View style={[styles.center,{marginBottom:5}]}>
        <TouchableOpacity style={[styles.Row,{width:'99%',justifyContent:'space-around',alignItems:'center',padding:5}]}
          onPress={() => {this.setState({show:!this.state.show})}}
        >
          <Text style={lineStyle}>----------------------</Text>
          <Text style={headerStyle}>{this.props.workdate}</Text>
          <Text style={lineStyle}>----------------------</Text>
        </TouchableOpacity>
        { this.state.show &&
        <View style={[styles.Box,styles.Row,{flexWrap:'wrap',justifyContent:'flex-start'}]}>
          {photolist}
          { (this.props.isToday && this.props.resCount < 3) &&
          <TouchableOpacity style={styles.workListBox}
            onPress={() => {
              if(this.props.resCount < 3) {
              ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: 3,
              },
              (buttonIndex) => {
                if(BUTTONS[buttonIndex] === "카메라 촬영") {
                  this.pickFromCamera()
                } else {
                  this._pickImage2()
                }
              }
            )} else {
              Alert.alert('더이상 올릴 수 없습니다.')
            }
            }}
          >
            <View style={[styles.center,{flex:1}]}>
              <Icon name="plus" type="FontAwesome" style={{fontSize:30,color:'#666'}} />
              <Text style={{color:'#666'}}>등록</Text>
            </View>
          </TouchableOpacity>
          }
        </View>
        }
      </View>
    )
  }
}
