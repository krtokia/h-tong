import React, { Component } from 'react';
import {
  ActionSheet,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  TextInput,
  Picker,
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Button,
   Icon,
   Accordion,
   Header,
   Left,
   Right,
   Body,
   Form,
   Textarea,
   Footer,
   FooterTab
 } from "native-base";

import { StoreGlobal } from '../../App';

import styles from './styles.js';

class TongDanger extends Component{
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
    }
  }

  getNoti = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=selectNotice&tongnum=" + this.state.tongnum)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading: false,
                bbsData: responseJson,
                parentShow: !this.state.parentShow,
                content: null,
                title: "",
                readGrade: 10,
              });
            })
            .catch((error) => {
              console.error(error);
            });
  }
  componentDidMount() {
    this.getNoti()
  }

  render(){
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal});
            }}>

          </Modal>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:1,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>위험치워줘</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
           style={{backgroundColor:'#f9f9f9',paddingBottom:10,}}
          >

          </Content>
        </Container>
      );
    }
  }
}
export default TongDanger;
