import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
 } from 'react-native';
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
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from './styles.js';

class More extends Component{

  constructor(props) {
    super(props);

    this.state={
      isLoading: true,
      dataSource: null,
      id: 'sid',
    }
  }

  componentDidMount() {
    //console.log("START componentDidMount");

    return fetch("http://13.124.127.253/api/results.php?page=setting&id=" + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })

      .catch((error) => {
        console.error(error);
      });
    }

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <View style={[styles.Box,{marginTop:0,paddingTop:30}]}>
            <View style={{flexDirection:'row',borderColor:'#e9e9e9',borderBottomWidth:1}}>
              <View style={{marginBottom:10,alignSelf:'center',alignItems:'center'}}>
                <Image source={require('../../assets/images/profile_no.png')} style={{width:130,height:130,resizeMode:'cover',borderRadius:500}} />
              </View>
              <View style={{justifyContent:'flex-end',padding:20}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:23,marginBottom:8}}>{this.state.id} </Text>
                  <TouchableOpacity>
                  <Icon name="edit" type="FontAwesome" style={{fontSize:18,color:'#db3928'}} />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize:13,color:'grey',marginBottom:8}}>협력2건설 / 미장</Text>
                <Text style={{fontSize:15}}>010-1234-5678</Text>
              </View>
            </View>

            <View style={{flexDirection:'row',paddingTop:10,paddingHorizontal:5,alignItems:'center'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Papers')}}>
                  <Icon name="upload" type="FontAwesome" style={styles.myIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>서류 등록</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderLeftWidth:1,borderColor:'#e9e9e9'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Signature')}}>
                  <Icon name="pencil-square-o" type="FontAwesome" style={styles.myIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>전자 서명</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Settings')}}>
                  <Icon name="folder-open" type="FontAwesome" style={styles.myIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>설정</Text>
                </TouchableOpacity>
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
export default More;

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

const style = StyleSheet.create({

})
