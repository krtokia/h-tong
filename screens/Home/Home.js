import React, { Component } from 'react';
import { Image, AppRegistry, ListView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  Text,
  Icon,
  View
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import {RkCard, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

RkTheme.setType('RkCard', 'tongView', {

  img:{
      height: 150,
    },
  content: {
    alignSelf: 'center',
    top: -10,
  },
});

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
        return <RkCard rkType='tongView' key={key} style={styles.tongView}>
                  <TouchableOpacity
                          onPress = {() => this.props.navigation.navigate("HomeDetail")}
                  >
                  <Image rkCardImg source={{uri: `http://13.124.127.253/images/tongHead/` + val.tongImage}} />
                  </TouchableOpacity>
                  <View rkCardContent>
                    <Text rkType='small'>{val.tongTitle}</Text>
                  </View>
                </RkCard>
      });

    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <View style={styles.HomeList}>
                {tongs}
            </View>

            <View style={styles.TextList}>
              <Grid>
                <Row style={styles.HomeItems}>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate("createTong")}>
                    <Text>현장통 생성</Text>
                  </TouchableHighlight>
                </Row>
                <Row style={styles.HomeItems}>
                  <Text>현장통 찾기</Text>
                </Row>
                <Row style={styles.HomeItems}>
                  <Text>현장통 가이드</Text>
                </Row>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
}
export default Home;
