import React, { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Header,
  Left,
  Right,
  Body,
  Button,
  H3,
  Icon,
  CheckBox,
  ListItem
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import {RkTextInput, RkText, RkTheme} from 'react-native-ui-kitten';

import styles from "./styles";

var fontColor = '#555';


class TongPaperAgree extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(){
    super();
    this.state ={
      checked1: false,
      checked2: false,
      checked3: false,
    }
  }

  render(){
    return (
      <Container>
        <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <Left style={{flex:1}}>
          </Left>
          <Body style={{flex:6,alignItems:'center'}}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:16}}>개인제출 서류</Text>
          </Body>
          <Right  style={{flex:1}}>
            <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="times" type="FontAwesome" />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={[styles.Box,{paddingBottom:0}]}>
            <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
              <View style={styles.Row}>
                <Icon name="file-text-o" type="FontAwesome" style={{color:fontColor,fontSize:11}} />
                <Text style={{fontSize:13}}> 신분증</Text>
              </View>
              <View style={styles.Row}>
                <Text style={{fontSize:10,color:fontColor}}>있음 </Text>
                <TouchableOpacity onPress={() => {this.setState({checked1:!this.state.checked1})}}>
                  <Icon name={this.state.checked1 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
              <View style={styles.Row}>
                <Icon name="file-text-o" type="FontAwesome" style={{color:fontColor,fontSize:11}} />
                <Text style={{fontSize:13}}> 보건안전교육증</Text>
              </View>
              <View style={styles.Row}>
                <Text style={{fontSize:10,color:fontColor}}>있음 </Text>
                <TouchableOpacity onPress={() => {this.setState({checked2:!this.state.checked2})}}>
                  <Icon name={this.state.checked2 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.Row,styles.grayBottom,{justifyContent:'space-between',padding:10}]}>
              <View style={styles.Row}>
                <Icon name="file-text-o" type="FontAwesome" style={{color:fontColor,fontSize:11}} />
                <Text style={{fontSize:13}}> 통장사본</Text>
              </View>
              <View style={styles.Row}>
                <Text style={{fontSize:10,color:'#db3928'}}>없음 </Text>
                <TouchableOpacity onPress={() => {this.setState({checked3:!this.state.checked3})}}>
                  <Icon name={this.state.checked3 ? "check-square-o" : "square-o"} type="FontAwesome" style={{fontSize:15,color:'#999'}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop:30,alignItems:'center'}}>
            <Text style={{color:'#db3928',fontSize:12}}>※서류 유무 사항을 확인해주시기 바랍니다.</Text>
          </View>
          <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',marginTop:50,width:'60%'}}>
            <Button
              rounded
              block
              style={{backgroundColor:'#db3928',paddingVertical:20}}
            >
              <Text style={{fontSize:18}}>완료</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
export default TongPaperAgree;
