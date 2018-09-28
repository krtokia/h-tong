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

import styles from "./styles";


class HomeReal extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <View style={styles.BigList}>
              <View style={styles.HomeHeader}>
                <Text style={styles.subTitle}>작업실명제</Text>
              </View>
              <View style={styles.HomeHeader}>
                <Text style={styles.subTitle}>선택현장</Text>
              </View>
              <Grid>
                <Row>
                  <Col style={styles.HomeItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                      </ImageBackground>
                  </Col>
                  <Col style={styles.HomeItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                      </ImageBackground>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.HomeItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                      </ImageBackground>
                  </Col>
                  <Col style={styles.HomeItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                      </ImageBackground>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.HomeItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                      </ImageBackground>
                  </Col>
                  <Col style={styles.HomeItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                      </ImageBackground>
                  </Col>
                </Row>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default HomeReal;
