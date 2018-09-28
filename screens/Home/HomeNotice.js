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

class HomeNotice extends Component{
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
                    <Text style={styles.subTitle}>공지사항</Text>
                  </TouchableOpacity>
                    <Text style={{marginLeft:10,fontSize:13,textAlignVertical:'bottom'}}> News </Text>
                    <Text style={styles.subMore}>
                      <Text style={styles.SmallText}> 글쓰기</Text>
                    </Text>
                </View>
                <Grid>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>공지1</Text>
                  </Row>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>공지2</Text>
                  </Row>
                  <Row style={styles.HomeItems}>
                    <Text style={styles.SmallText}>공지3</Text>
                  </Row>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default HomeNotice;
