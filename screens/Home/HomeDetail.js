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

class HomeDetail extends Component{
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
                <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate("HomeReal")}
                >
                  <Text style={styles.subTitle}>내 현장</Text>
                </TouchableOpacity>
                <Text style={styles.subMore}>편집</Text>
              </View>
                <Grid>
                  <Row>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                    <Col style={styles.SubItems}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                      />
                    </Col>
                  </Row>
                </Grid>
              </View>
              <View style={styles.TextList}>
                <View style={styles.HomeHeader}>
                  <TouchableOpacity
                    onPress = {() => navigation.navigate("Signup")}
                  >
                    <Text style={styles.subTitle}>공지사항</Text>
                  </TouchableOpacity>
                </View>
                <Grid>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText} onPress={() => this.props.navigation.navigate("HomeNotice")}>공지</Text>
                  </Row>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>공지</Text>
                  </Row>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>공지</Text>
                  </Row>
              </Grid>
            </View>
            <View style={styles.TextList}>
              <Grid>
                <Row style={styles.HomeItems}>
                  <Text style={styles.SmallText} onPress={() => this.props.navigation.navigate("HomeFriends")}>동료</Text>
                </Row>
                <Row style={styles.HomeItems}>
                  <Text style={styles.SmallText}>동료</Text>
                </Row>
                <Row style={styles.HomeItems}>
                  <Text style={styles.SmallText}>동료</Text>
                </Row>
              </Grid>
            </View>
            <View style={styles.TextList}>
              <Grid>
                <Row style={styles.HomeItems} size={30}>
                  <Text style={styles.SmallText}>날씨</Text>
                </Row>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default HomeDetail;
