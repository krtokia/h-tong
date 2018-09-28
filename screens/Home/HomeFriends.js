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

class HomeFriends extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
              <View style={styles.TextList}>
                <View style={styles.HomeHeader}>
                  <TouchableOpacity
                    onPress = {() => navigation.navigate("Signup")}
                  >
                    <Text style={styles.subTitle}>현장 동료</Text>
                  </TouchableOpacity>
                    <Text style={{marginLeft:10,fontSize:13,textAlignVertical:'bottom'}}> 전체 500명 </Text>
                    <Text style={styles.subMore}>
                      <Text style={styles.SmallText}> 찾기</Text>
                      <Text style={styles.SmallText}> 초대하기</Text>
                    </Text>
                </View>
                <Grid>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>동료1</Text>
                  </Row>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>동료2</Text>
                  </Row>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>동료3</Text>
                  </Row>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default HomeFriends;
