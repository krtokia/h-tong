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
   Card,
   CardItem,
   Header,
   Left,
   Right,
   Body,
   Button,
   Icon,
   Accordion
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

class Notice extends Component{
  static navigationOptions = ({
      header: null
    });
    
  render(){
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>설정</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>
            <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
              <Icon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',}}>
            <Button small iconLeft transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='angle-left' type="FontAwesome" style={{color:'#030303'}} />
              <Text style={{color:'#030303'}}>공지사항</Text>
            </Button>
          </View>
          <Accordion dataArray={dataArray}
            headerStyle={{backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#eee'}}
            contentStyle={{backgroundColor:'#eee',borderBottomWidth:1,borderBottomColor:'#eee',fontSize:11}}
          />
        </Content>
      </Container>
    );
  }
}
export default Notice;

const style = StyleSheet.create({

})
