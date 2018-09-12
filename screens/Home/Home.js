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


class Home extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <View style={styles.HomeList}>
              <Grid>
                <Row>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.itemTitle} onPress={() => this.props.navigation.navigate("HomeDetail")}> title </Text>
                      <Text style={styles.itemSub} onPress={() => this.props.navigation.navigate("HomeDetail")}>content</Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/2.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.itemTitle}> title </Text>
                      <Text style={styles.itemSub}>content</Text>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.hItemTitle}> title </Text>
                      <Text style={styles.hItemSub}>content</Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/2.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.hItemTitle}> title </Text>
                      <Text style={styles.hItemSub}>content</Text>
                    </Row>
                  </Col>
                </Row>
              </Grid>
            </View>
            <View style={styles.SmallList}>
              <Grid>
                <Row>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/1.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/4.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/4.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/4.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                  <Col style={styles.HomeItems}>
                    <Row size={7}>
                      <ImageBackground
                        source={require("../../assets/images/testImages/4.jpg")}
                        style={styles.itemImage}
                        >
                        <Icon name="more" style={styles.itemIcon}/>
                      </ImageBackground>
                    </Row>
                    <Row size={3} style={{flexDirection:"column"}}>
                      <Text style={styles.rItemTitle}> title </Text>
                    </Row>
                  </Col>
                </Row>
              </Grid>
            </View>
            <View style={styles.TextList}>
              <Grid>
                <Row style={styles.HomeItems}>
                  <Text>일지1</Text>
                </Row>
                <Row style={styles.HomeItems}>
                  <Text>일지2</Text>
                </Row>
                <Row style={styles.HomeItems}>
                  <Text>일지3</Text>
                </Row>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Home;
