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
      dataSource: null,
    }
  }

  componentWillMount() {
    //console.log("START componentDidMount");

    return fetch("http://13.124.127.253/api/results.php?page=home")
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

  navigateTong(tType) {
    StoreGlobal({type:'set',key:'tType',value:tType});
    console.log("tType: ",StoreGlobal({type:'get',key:'tType'}));
  }

  render(){
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let tongs = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.tongView}>
                  <TouchableOpacity
                          onPress = {() => {
                            this.props.navigation.navigate("TongMain", {
                            itemID: val.tongSeq,
                            tongType: 'T',
                            }),
                            this.navigateTong("T")
                            }
                          }
                  >
                  <Image resizeMode={'cover'} style={styles.tongImage} source={{uri: `http://13.124.127.253/images/tongHead/` + val.tongImage}} />
                  <View style={styles.tongContent}>
                    <Text style={styles.tongName}>{val.tongTitle}</Text>

                  </View>
                  </TouchableOpacity>
                </View>
      });
      let communities = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.tongView}>
                  <TouchableOpacity
                          onPress = {() => {
                            this.props.navigation.navigate("TongMain", {
                            itemID: val.tongSeq,
                            tongType: 'C',
                            }),
                            this.navigateTong("C")
                            }
                          }
                  >
                  <Image resizeMode={'cover'} style={styles.tongImage} source={{uri: `http://13.124.127.253/images/tongHead/` + val.tongImage}} />
                  <View style={styles.tongContent}>
                    <Text style={styles.tongName}>{val.tongTitle}</Text>

                  </View>
                  </TouchableOpacity>
                </View>
      });


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
              <Text style={{fontSize:13}}>편집</Text>
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
              <Text style={{fontSize:13}}>편집</Text>
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
