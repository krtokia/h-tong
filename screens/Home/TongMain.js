import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Image,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions, Header, Left } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

class TongMain extends Component{
  static navigationOptions = ({
    headerTitle: null,
    headerRight: null,
    headerStyle: { height:200 },
    headerLeftContainerStyle: {paddingBottom:150},
  });

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <View style={styles.SmallList}>
              <View style={styles.HomeHeader}>
                <RkText>현장통 이름</RkText>
                <RkTextInput style={styles.subMore}>글쓰기</RkTextInput>
                <RkText>맴버 1</RkText>
                <RkText>초대</RkText>
              </View>
            </View>
            <View style={styles.TextList}>
                <Row style={styles.HomeItems}>
                  <Text style={styles.SmallText}>날씨</Text>
                </Row>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongMain;
