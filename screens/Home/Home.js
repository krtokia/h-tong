import React, { Component } from 'react';
import { AppRegistry, ListView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
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
  constructor(props) {
    super(props);
    this.state= {
      isLoading: true,

    }
  }

  componentDidMount() {
    return fetch("http://13.124.127.253/api/results.php?page=home")
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading:false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {

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

  fetchData = async () => {
    const response = await fetch("http://13.124.127.253/api/results.php?page=home");
    const json = await response.json();

    this.setState({data: json.results});
    console.log("this is data");
    console.log(data);
  };

  render(){
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    }
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
                  <TouchableHighlight onPress={() => this.props.navigation.navigate("createTong")}>
                    <Text>현장통 생성</Text>
                  </TouchableHighlight>
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
