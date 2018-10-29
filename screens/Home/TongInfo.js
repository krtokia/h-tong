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
   Body,
   Footer
 } from "native-base";
import MapView from 'react-native-maps';
import styles from './styles.js';

var fontColor = '#888';

class TongInfo extends Component{
  state = {
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      <Container>
        <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <Left style={{flex:1}}>
            <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="angle-left" type="FontAwesome" />
            </Button>
          </Left>
          <Body style={{flex:5,alignItems:'center'}}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>현장정보</Text>
          </Body>
          <Right  style={{flex:1}}>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
          contentContainerStyle={{flex:1}}
        >
          <View style={{flex:1}}>
            <View style={[styles.Box,{marginTop:3,padding:0}]}>
              <MapView
                style={{height: '100%' }}
                region={this.state.mapRegion}
                onRegionChange={this._handleMapRegionChange}
              />
              <View style={{position:'absolute',bottom:0,width:'100%',height:45,backgroundColor:'#fffa',justifyContent:'center'}}>
                <View style={[styles.Row,{justifyContent:'space-between',padding:5,alignItems:'center'}]}>
                  <View style={{paddingLeft:10}}>
                    <Text style={{fontSize:13}}>서울시 강서구 공항대로 219</Text>
                  </View>
                  <View>
                    <Button
                      rounded
                      small
                      bordered
                      style={{borderColor:'#db3928',borderWidth:2}}
                    >
                      <Text style={{color:'#db3928',fontWeight:'bold'}}>
                        정보수정
                        <Icon name="edit" type="FontAwesome" style={{color:'#db3928',fontSize:15}}/>
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex:1.5}}>
            <View style={styles.Box}>
              <ViewList
                title="공사명"
                content="마곡동 삼성빌딩 신축현장"
              />
              <ViewList
                title="건축허가번호"
                content="2017-3122536-1003-58"
              />
              <ViewList
                title="공사 시공자"
                content="(주)시공건설"
              />
              <ViewList
                title="공사 감리자"
                content="(주)감리ee"
              />
              <ViewList
                title="발주자"
                content="강서구청"
              />
              <ViewList
                title="현장 연락처"
                content="02-123-4567"
              />
              <ViewList
                title="공사기간"
                content="2017.12.03-2019.11.20"
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongInfo;

class ViewList extends Component{
  render() {
    return(
      <View style={[styles.grayBottom,styles.Row,{padding:10,justifyContent:'space-between'}]}>
        <Text style={{fontSize:14}}>{this.props.title}</Text>
        <Text style={{color:fontColor,fontSize:13}}>{this.props.content}</Text>
      </View>
    )
  }
}
