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
   Right,
   Body,
   Button,
   Icon,
 } from "native-base";

import styles from './styles.js';

class Bookmark extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',}}>
            <Button small iconLeft transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='angle-left' type="FontAwesome" style={{color:'#030303'}} />
              <Text style={{color:'#030303'}}>북마크</Text>
            </Button>
          </View>
          <View style={{backgroundColor:'#fff',marginTop:0,paddingBottom:20}}>
            <TextList />
            <TextList />
            <TextList />
          </View>
        </Content>
      </Container>
    );
  }
}
export default Bookmark;

class TextList extends Component{
  render(){
    return (
      <View style={[styles.Box,{marginTop:0,marginBottom:10,height:200}]}>
        <View style={{flex:2,flexDirection:'row'}}>
          <View style={{flexDirection:'row',marginLeft:0,justifyContent:'space-between',alignItems:'center'}}>
            <Image source={require('../../assets/images/profile_no.png')} style={{width:50,height:50,resizeMode:'contain',borderRadius:100}} />
            <View style={{marginLeft:10,justifyContent:'space-around',paddingVertical:1,height:'100%',paddingVertical:10}}>
              <Text style={{fontSize:14,fontWeight:'bold'}}>안민웅</Text>
              <Text style={{fontSize:11,color:'#aaa'}}>2018년 09월 27일</Text>
            </View>
          </View>
          <View style={{marginLeft:'auto',marginRight:0,justifyContent:'center'}}>
            <Icon name="ellipsis-v" type="FontAwesome" style={{fontSize:21,color:'#aaa'}} />
          </View>
        </View>
        <View style={{flex:3,flexDirection:'row'}}>
          <View style={{marginLeft:0,flexDirection: 'row',justifyContent:'flex-start',alignItems: 'center',}}>
            <Image source={require('../../assets/images/noImage.png')} style={{flexBasis:'23%',resizeMode:'contain',marginHorizontal:3}} />
            <Image source={require('../../assets/images/noImage.png')} style={{flexBasis:'23%',resizeMode:'contain',marginHorizontal:3}} />
            <Image source={require('../../assets/images/noImage.png')} style={{flexBasis:'23%',resizeMode:'contain',marginHorizontal:3}} />
            <Image source={require('../../assets/images/noImage.png')} style={{flexBasis:'23%',resizeMode:'contain',marginHorizontal:3}} />
          </View>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={[styles.contentFooterBox]}>
            <Text style={{fontSize:13,color:'#db3928'}}>댓글달기  </Text>
            <Icon name="commenting-o" type="FontAwesome" style={{fontSize:13,color:'#db3928'}} />
          </View>
          <View style={{borderRightWidth:1,borderColor:'#e9e9e9',height:'70%'}}></View>
          <View style={styles.contentFooterBox}>
            <Text style={{fontSize:13,color:'#db3928'}}>북마크  </Text>
            <Icon name="bookmark" type="FontAwesome" style={{fontSize:13,color:'#db3928'}} />
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({

})
