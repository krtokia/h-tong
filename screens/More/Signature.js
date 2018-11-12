import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity, Modal, View as RNView } from 'react-native';
import {
  Text,
  Container,
  Content,
  View,
  H1,
  H3,
  Button,
  Icon as NBIcon,
  Header,
  Left,
  Body,
  Right,
  Input
} from "native-base";

import Icon  from 'react-native-vector-icons/FontAwesome';

import { ImagePicker } from 'expo';
import styles from "./styles";


import RNDraw from 'rn-draw'
import pickableImage from "../common.js"


class Signature extends Component{

  constructor(props) {
      super(props);
      this.state = {
        id:'sid',
        type:'signature',
        imageSource:null
      }
      this.uploadSignature = this.uploadSignature.bind(this);
  //.    this.uploadImage = this.uploadImage.bind(this);
  }

  static navigationOptions = ({
    header: null
  });

  onDraw() {
    console.log("draw");
  }
  uploadSignature() {
    const {id, type, imageSource} = this.state;
    let apiUrl = 'http://13.124.127.253/api/uploadImage.php';
    let options = null;

    if (imageSource) {
      console.log("upload:" + imageSource);

      const formData = new FormData();
      formData.append('id', id);
      formData.append('type', type);
      formData.append('photo', {
        uri: imageSource,
        name: `testone`,
        type: `image/png;base64`,
      });
      options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'data matched') {
          console.log(responseJson);
          //this.props.navigation.navigate("Main");
        } else {
          //alert(responseJson);
          Alert.alert(
            '현장통',
            responseJson
          )
        }
      }).catch((error) => {
        console.log("EE: " + error)
      });

  }

    render(){

      return (
        <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
        <Left style={{flex:1}} />
        <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
        <Text style={{fontSize:20,color:'#fff'}}>전자 서명</Text>
        </Body>
        <Right style={{alignSelf:'flex-end',flex:1}}>
        <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
        <NBIcon name="close" style={{color:'#fff'}} />
        </Button>
        </Right>
        </Header>
        <Content
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={{ flex: 1 }}
        >
        <View style={[styles.container,{marginTop:10,padding:20}]}>
        <View style={{flex:5,width:'100%',borderWidth:5,borderColor:'#ccc',borderRadius:10}}>
        <RNDraw
          containerStyle={{backgroundColor: 'rgba(0,0,0,0.01)'}}
            onChangeStrokes={this.onDraw}
        />
        </View>

        <View style={{alignItems:'flex-end',width:'100%',flex:1,justifyContent:'flex-end'}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#db3928',flexDirection:'row',alignItems:'flex-end'}}>
        <NBIcon name="edit" type="FontAwesome" style={{color:'#db3928',fontSize:15}} />
        <TouchableOpacity  onPress={this.onClear} ><Text style={{color:'#db3928',fontSize:15}}> 다시서명</Text></TouchableOpacity>
        </View>
        </View>
        <View style={{width:'100%',flex:3,justifyContent:'center'}}>
        <Text style={{fontSize:14}}>{`※ 등록하신 전자서명은 노무비 선지급을 위한 위임장과 노무비 청구 시 사용됩니다.`}</Text>
        </View>
        <View style={{width:'60%',flex:1}}>
        <Button full rounded style={{backgroundColor:'#db3928'}} onPress={this.uploadSignature}>
        <Text style={{fontSize:18}}>저장</Text>
        </Button>
        </View>
        <View style={{flex:2}} />
        </View>
        </Content>
        </Container>
      );
    }
  }

  export default Signature;
