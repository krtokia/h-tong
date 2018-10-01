import React, { Component } from 'react';
import { Image, AppRegistry, ListView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
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

import styles from "./styles";

class Home extends Component{
  constructor(props) {
    super(props);
    this.state= {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
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
                          onPress = {() => this.props.navigation.navigate("HomeTab")}
                  >
                  <Image resizeMode={'cover'} style={styles.tongImage} source={{uri: `http://13.124.127.253/images/tongHead/` + val.tongImage}} />
                  <View style={styles.tongContent}>
                    <Text style={styles.tongName}>{val.tongTitle}</Text>
                    <Text style={styles.tongNew}>NEW 1</Text>
                  </View>
                  </TouchableOpacity>
                </View>
      });

    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <View style={styles.Box}>
            <View style={styles.BoxTitle}>
              <Text>내 현장통</Text>
              <Text>편집</Text>
            </View>
            <View style={styles.HomeList}>
              {tongs}
            </View>
          </View>
          <Card>
            <CardItem bordered button onPress={() => {this.props.navigation.navigate('createTong')}}>
              <Icon name="add-circle" />
              <Text>현장통 생성</Text>
            </CardItem>
            <CardItem bordered button onPress={() => alert("현장통 찾기")}>
              <Icon name="search" />
              <Text>현장통 찾기</Text>
            </CardItem>
            <CardItem bordered button onPress={() => alert("현장통 가이드")}>
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
