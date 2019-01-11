import React, { Component } from 'react';
import { ToastAndroid, StatusBar, Image, AppRegistry, ListView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator, ScrollView, Alert } from 'react-native';
import {
  Container,
  Content,
  Text,
  Icon,
  View,
  Card,
  CardItem,
  Right,
  Body,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import {RkCard, RkTheme} from 'react-native-ui-kitten';

import { StoreGlobal } from '../../App';

import styles from "./styles";

class Home extends Component{
  constructor(props) {
    super(props);
    this.state= {
      isLoading: true,
      isLoading2: true,
      dataSource: null,
      dataSource2: null,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      refresh: null,
    }
  }

  tongList = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=home&tongtype=T&id="+this.state.memId)
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
  commList = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=home&tongtype=C&id="+this.state.memId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading2: false,
          dataSource2: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    StoreGlobal({type:'set',key:'userGrade',value:0})
    this.tongList()
    this.commList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.refresh !== this.props.navigation.getParam('refresh')) {
     this.setState({refresh:this.props.navigation.getParam('refresh')})
     this.tongList()
     this.commList()
     StoreGlobal({type:'set',key:'userGrade',value:0})
    }
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style= {{
          height: .5,
          width: "100%",
        }}
      />
    );
  }

  refresh = refresh => {
    this.setState({refresh})
  }

  navigateTong(tType, itemID) {
    StoreGlobal({type:'set',key:'tType',value:tType});
  }

  render(){
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.isLoading2) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let tongs;
      if (this.state.dataSource) {
      tongs = this.state.dataSource.map((val, key) => {
        let tongimg = val.tongimg ? val.tongimg : 'noImage.png';
        let tongStatus = val.status === "service" ? true : false;
        return <View key={key} style={[styles.tongView]}>
                  <TouchableOpacity
                          onPress = {() => {
                            tongStatus ? (
                            this.props.navigation.navigate("TongMain", {
                            itemID: val.tongnum,
                            tongType: 'T',
                            tongname: val.tongtitle,
                            refresh: this.refresh
                            }),
                            this.navigateTong("T", val.tongnum)
                            )
                            :
                            Alert.alert('현장통','승인 대기중인 현장입니다.');
                            //ToastAndroid.show("승인 대기중인 현장입니다.", ToastAndroid.BOTTOM);
                            }
                          }
                  >
                  <Image resizeMode={'cover'} style={[styles.tongImage]} source={{uri: `http://13.124.127.253/images/tongHead/` + tongimg}} />
                  { !tongStatus &&
                  <View style={[styles.tongImage,{position:'absolute',top:0,left:0,justifyContent:'center',alignItems:'center',backgroundColor:'#000c'}]}>
                    <Text style={{fontSize:17,color:'#fff'}}>승인 대기중</Text>
                  </View>
                  }
                  <View style={styles.tongContent}>
                    <Text style={styles.tongName}>{val.tongtitle}</Text>
                  </View>
                  </TouchableOpacity>
                </View>
        });
      } else {
        tongs = <View style={styles.tongView}><Text>가입한 현장통이 없습니다.</Text></View>
      }
      let communities;
      if (this.state.dataSource2) {
        communities = this.state.dataSource2.map((val, key) => {
        let tongimg = val.tongimg ? val.tongimg : 'noImage.png';
        return <View key={key} style={styles.tongView}>
                  <TouchableOpacity
                          onPress = {() => {
                            this.props.navigation.navigate("CommunityMain", {
                            itemID: val.tongnum,
                            tongType: 'C',
                            refresh: this.refresh
                            }),
                            this.navigateTong("C", val.tongnum)
                            }
                          }
                  >
                  <Image resizeMode={'cover'} style={[styles.tongImage]} source={{uri: `http://13.124.127.253/images/tongHead/` + tongimg}} />
                  <View style={styles.tongContent}>
                    <Text style={styles.tongName}>{val.tongtitle}</Text>
                  </View>
                  </TouchableOpacity>
                </View>
        });
      } else {
        communities = <View style={styles.tongView}><Text>가입한 커뮤니티통이 없습니다.</Text></View>
      }

    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={[styles.Box,{marginTop:10}]}>
            <View style={styles.BoxTitle}>
              <View style={{flexDirection: 'row'}}>
                <Icon name='primitive-dot' type='Octicons' style={{color:'red',fontSize:13,alignSelf:'flex-start'}} />
                <Text style={{fontWeight:'bold'}}>내 현장통</Text>
              </View>
              <Text style={{fontSize:13}}></Text>
            </View>
            <ScrollView horizontal={true}>
            <View style={styles.HomeList}>
              {tongs}
            </View>
            </ScrollView>
          </View>
          <View style={[styles.Box,{marginTop:10}]}>
            <View style={styles.BoxTitle}>
              <View style={{flexDirection:'row'}}>
                <Icon name='primitive-dot' type='Octicons' style={{color:'green',fontSize:13,alignSelf:'flex-start'}} />
                <Text style={{fontWeight:'bold'}}>내 커뮤니티통</Text>
              </View>
              <Text style={{fontSize:13}}></Text>
            </View>
            <ScrollView horizontal={true}>
            <View style={styles.HomeList}>
              {communities}
            </View>
            </ScrollView>
          </View>
          <Card>
            <CardItem button onPress={() => {this.props.navigation.navigate('createTong')}}>
              <Icon name="add-circle" />
              <Text>현장통 생성</Text>
            </CardItem>
            <CardItem button onPress={() => {this.props.navigation.navigate('TongSearch')}}>
              <Icon name="search" />
              <Text>커뮤니티 찾기</Text>
            </CardItem>
            <CardItem button onPress={() => {this.props.navigation.navigate('SearchInvite',{refresh:this.refresh})}}>
              <Icon name="ios-paper-plane" />
              <Text>받은 초대장</Text>
            </CardItem>
            <CardItem button onPress={() => alert("현장통 가이드")}>
              <Icon name="help" />
              <Text>현장통 가이드</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
}
export default Home;
