import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
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
   Body
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from './styles.js';

const dataArray = [
  { title: "공지사항1", content: "공지사항1 내용" },
  { title: "공지사항2", content: "공지사항2 내용" },
  { title: "공지사항3", content: "공지사항3 내용" },
  { title: "공지사항4", content: "공지사항4 내용" },
  { title: "공지사항5", content: "공지사항5 내용" },
  { title: "공지사항6", content: "공지사항6 내용" },
  { title: "공지사항7", content: "공지사항7 내용" },
  { title: "공지사항8", content: "공지사항8 내용" },
  { title: "공지사항9", content: "공지사항9 내용" },
  { title: "공지사항10", content: "공지사항10 내용" },
  { title: "공지사항11", content: "공지사항11 내용" },
  { title: "공지사항12", content: "공지사항12 내용" },
];

class TongNotice extends Component{
  render(){
    return (
      <Container>
        <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <Left style={{flex:1}}>
          </Left>
          <Body style={{flex:1,alignItems:'center'}}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>공지사항</Text>
          </Body>
          <Right  style={{flex:1}}>
          </Right>
        </Header>
        <Content
         style={{backgroundColor:'#f9f9f9',paddingBottom:10,}}
        >
          <View style={{paddingBottom:20}}>
            <NoticeList />
            <NoticeList />
            <NoticeList />
            <NoticeList />
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongNotice;

class NoticeList extends Component{
  render() {
    return(
      <View style={[styles.TongContentBox]}>
       <View style={styles.TongContentHeader}>
         <View style={{flexDirection: 'row'}}>
           <Image style={styles.ContentHeaderImg} source={require('../../assets/images/profile_no.png')} />
           <View style={{marginLeft:10}}>
             <Text style={{fontSize:14,fontWeight:'bold'}}>관리자</Text>
             <Text style={{fontSize:10,color:'#aaa'}}>관리자</Text>
           </View>
         </View>
       </View>
       <View style={styles.TongContents}>
         <Text style={{fontSize:13}}>공지사항</Text>
       </View>
     </View>
    )
  }
}
