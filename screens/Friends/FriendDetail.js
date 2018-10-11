import React, { Component } from 'react';
import { StyleSheet,Image } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Item,
  Input,
  Icon,
} from 'native-base';

import styles from './styles.js';



class FriendDetail extends Component{

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <View style={[styles.Box,{marginTop:10,padding:0}]}>
            <View style={{flexDirection:'row',padding:10,borderBottomColor:'#f9f9f9',borderBottomWidth:1}}>
              <View style={{width:'40%'}}>
                <Image source={require('../../assets/images/profile_no.png')} style={{width:120,height:120,resizeMode:'cover',borderRadius:500}} />
              </View>
              <View style={{width:'40%',justifyContent:'flex-end',marginLeft:20}}>
                <Text style={{fontWeight:'bold',fontSize:20,marginBottom:10}}>안민웅</Text>
                <Text style={{fontSize:11,color:'grey',marginBottom:10}}>협력2건설 / 미장</Text>
                <Text>010-1234-5678</Text>
              </View>
              <View style={{width:'20%'}}>
                <Button transparent onPress={() => {this.props.navigation.goBack()}}>
                  <Icon name="remove" type="FontAwesome" style={{color:'#999'}} />
                </Button>
              </View>
            </View>

            <View style={{flexDirection:'row',paddingVertical:20,paddingHorizontal:5}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Icon name="heart" type="FontAwesome" style={styles.friendIcon} />
                <Text style={{color:"#555"}}>관심동료</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderLeftWidth:1,borderColor:'#f9f9f9'}}>
                <Icon name="comments-o" type="FontAwesome" style={styles.friendIcon} />
                <Text style={{color:"#555"}}>1:1 대화</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Icon name="folder-open" type="FontAwesome" style={styles.friendIcon} />
                <Text style={{color:"#555"}}>서류보기</Text>
              </View>
            </View>
          </View>

          <View style={styles.Box}>
            <View style={{alignItems:'flex-start',paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#f4f4f4'}}>
              <Text style={{color:'#ccc',fontSize:13}}>대표사진</Text>
              <View style={{flexDirection:'row',marginTop:5,}}>
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
              </View>
            </View>
            <View style={{alignItems:'flex-start',marginTop:20}}>
              <Text style={{color:'#ccc',fontSize:13}}>경력</Text>
              <View style={{marginTop:10,}}>
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
                <CareerList dateVal="2018.11.11" infoVal="마곡동 삼성빌딩 신축현장" />
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default FriendDetail;

class CareerList extends Component{
  render() {
    return(
      <View style={{flexDirection:'row',marginBottom:5,}}>
        <View style={{width:"30%"}}>
          <Text style={{fontSize:13}}>{this.props.dateVal}</Text>
        </View>
        <View style={{width:"70%"}}>
          <Text style={{fontSize:13}}>{this.props.infoVal}</Text>
        </View>
      </View>
    )
  }
}
