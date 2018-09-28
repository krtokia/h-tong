import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  Icon,
  View
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

class HomeDetail extends Component{
  static navigationOptions = ({
    headerStyle: {height:200},
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
                <Row style={styles.HomeItems} size={30}>
                  <Text style={styles.SmallText}>날씨</Text>
                </Row>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default HomeDetail;
