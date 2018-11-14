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
import { Grid, Col, Row } from "react-native-easy-grid";

import { StoreGlobal } from '../../App';
import pickableImage from "../common.js"

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
    }
  }

  getWorklist = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=getWorkList&tongnum=" + this.state.tongnum)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              nowDate = new Date(Date.now());
              dateKor = nowDate.getFullYear()+"년 "+(nowDate.getMonth()+1)+"월 "+nowDate.getDate()+"일";
              dateOrigin = nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate();
              this.setState({
                isLoading: false,
                workData: responseJson,
                dateKor:dateKor,
                dateOrigin:dateOrigin
              })
            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentDidMount() {
    this.getWorklist();
  }

  imgupload(action, workdate, previmg, imageSource, memId) {
    let apiUrl = 'http://13.124.127.253/api/worklist.php?action='+action;
    let uri = null;
    let fileType = null;

    const formData = new FormData();

    formData.append('tongnum', StoreGlobal({type:'get',key:'tongnum'}));
    formData.append('photolist', previmg);
    formData.append('memId', memId);
    formData.append('workdate', workdate)

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

    console.log(options)

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          console.log(responseJson);
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
      let worklist;
      if (this.state.workData) {
        worklist = this.state.workData.map((val, key) => {
          if(this.state.dateKor === val.workdate) {
            insertYn = false;
            isToday = true;
          } else {
            isToday = false;
          }
          return <View key={key}>
            <WorkList
              workdate={val.workdate}
              photos={val.photolist}
              action="update"
              method={this.imgupload}
              isToday={isToday}
            />
          </View>
        })
      } else {
        worklist = <View />
      }
      return (
        <Container>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:1,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>작업일지</Text>
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
                  photos=""
                  action="insert"
                  method={this.imgupload}
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
      photos: this.props.photos
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.imageSource !== prevState.imageSource) {
      this.props.method(this.props.action, this.props.workdate, this.state.photos, this.state.imageSource)
    }
    if (this.props.photos !== prevProps.photos) {
      this.setState({photos: this.props.photos})
    }
  }

  render() {
    const textStyle={fontSize:12,color:'#999'}
    const headerStyle={fontSize:14,color:'#666'}
    const lineStyle={fontSize:10,color:'#666'}

    const photolist = this.state.photos.split(',').map((data, key) => {
      if(data) {
      return <View style={styles.workListBox} key={key}>
          <Image source={{uri: `http://13.124.127.253/images/workList/`+data}}
            style={{width:"100%", height:"100%", resizeMode:'contain'}}
          />
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
          { this.props.isToday &&
          <TouchableOpacity style={styles.workListBox}
            onPress={this._pickImage}
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
