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
         style={{backgroundColor:'#f9f9f9'}}
         contentContainerStyle={{ flex: 1 }}>
           <Accordion dataArray={dataArray}
             headerStyle={{backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#eee'}}
             contentStyle={{backgroundColor:'#eee',borderBottomWidth:1,borderBottomColor:'#eee',fontSize:11}}
           />
        </Content>
      </Container>
    );
  }
}
export default TongNotice;
