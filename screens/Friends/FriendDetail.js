import React, { Component } from 'react';
import { StyleSheet,Image } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
  List,
  ListItem,
  Header,
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
  static navigationOptions = ({
    header: null
  });

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <View style={[styles.Box,{marginTop:0}]}>
            <View style={{borderBottomColor:'#f9f9f9',borderBottomWidth:1,paddingVertical:10}}>
              <View style={{alignSelf:'flex-end'}}>
                <Button transparent onPress={() => {this.props.navigation.goBack()}}>
                  <Icon name="remove" type="FontAwesome" style={{color:'#999'}} />
                </Button>
              </View>
              <View style={{marginTop:-30,marginBottom:10,alignSelf:'center',alignItems:'center'}}>
                <Image source={require('../../assets/images/profile_no.png')} style={{width:150,height:150,resizeMode:'cover',borderRadius:500}} />
              </View>
              <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:20,marginBottom:5}}>안민웅</Text>
                <Text style={{fontSize:11,color:'grey',marginBottom:5}}>협력2건설 / 미장</Text>
                <Text>010-1234-5678</Text>
              </View>
            </View>

            <View style={{flexDirection:'row',paddingTop:10,paddingHorizontal:5,alignItems:'center'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Icon name="heart" type="FontAwesome" style={styles.friendIcon} />
                <Text style={{fontSize:13,color:"#555"}}>관심동료</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderLeftWidth:1,borderColor:'#f9f9f9'}}>
                <Icon name="comments-o" type="FontAwesome" style={styles.friendIcon} />
                <Text style={{fontSize:13,color:"#555"}}>1:1 대화</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Icon name="folder-open" type="FontAwesome" style={styles.friendIcon} />
                <Text style={{fontSize:13,color:"#555"}}>서류보기</Text>
              </View>
            </View>
          </View>

          <View style={styles.Box}>
            <View style={{alignItems:'flex-start',paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#f4f4f4'}}>
              <Text style={{color:'#aaa',fontSize:13}}>대표사진</Text>
              <View style={{flexDirection:'row',marginTop:5,}}>
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
                <Image style={styles.detailImage} source={require('../../assets/images/noImage.png')} />
              </View>
            </View>
            <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
              <Text style={{color:'#aaa',fontSize:13}}>경력</Text>
              <View style={{marginLeft:10}}>
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
      <View style={{flexDirection:'row',marginBottom:12,}}>
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
