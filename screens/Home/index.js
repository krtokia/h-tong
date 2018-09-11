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
            <View style={styles.innerContainer}>
              <View style={styles.spotHeader}>
                <Text style={styles.spotTitle}>내 현장</Text>
                <Text style={styles.spotMore}>편집</Text>
              </View>
              <View style={styles.spotList}>
                <Grid>
                  <Row>
                    <Col size={48}>
                      <Row size={7}>
                        <ImageBackground
                          source={require("../../assets/images/testImages/1.jpg")}
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
                    <Col size={4} />
                    <Col size={48}>
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
                    <Col size={48}>
                      <Row size={7}>
                        <ImageBackground
                          source={require("../../assets/images/testImages/3.jpg")}
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
                    <Col size={4} />
                    <Col size={48}>
                      <Row size={7}>
                        <ImageBackground
                          source={require("../../assets/images/testImages/4.jpg")}
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
                </Grid>
              </View>
            </View>
            <View style={styles.innerContainer, styles.spotSubBox}>
              <View style={styles.spotSub}>
                <Icon name="add" size={20} style={{color:'#000'}} />
                <Text style={{fontSize:20,marginLeft:20}}> 현장 만들기 </Text>
              </View>
              <View style={styles.spotSub}>
                <Icon name="search" size={20} style={{color:'#000'}} />
                <Text style={{fontSize:20,marginLeft:20}}> 현장 찾기 </Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Home;
