import React, { Component } from 'react';
import { StatusBar, Image, AppRegistry, ListView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
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
      memId: StoreGlobal({type:'get',key:'loginId'})
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
    this.tongList()
    this.commList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
     this.tongList()
     this.commList()
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
        return <View key={key} style={styles.tongView}>
                  <TouchableOpacity
                          onPress = {() => {
                            this.props.navigation.navigate("TongMain", {
                            itemID: val.tongnum,
                            tongType: 'T',
                            }),
                            this.navigateTong("T", val.tongnum)
                            }
                          }
                  >
                  <Image resizeMode={'cover'} style={styles.tongImage} source={{uri: `http://13.124.127.253/images/tongHead/` + tongimg}} />
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
                            }),
                            this.navigateTong("C", val.tongnum)
                            }
                          }
                  >
                  <Image resizeMode={'cover'} style={styles.tongImage} source={{uri: `http://13.124.127.253/images/tongHead/` + tongimg}} />
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
              <Text>현장통 찾기</Text>
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
