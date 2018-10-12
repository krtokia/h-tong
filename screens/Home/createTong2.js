import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  Icon,
  View,
  H3,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import { ImagePicker } from 'expo';
import styles from "./styles";
import pickableImage from "../common.js"

const _this = null;

class createTong2 extends pickableImage{

  constructor(props) {
    super(props);
    this.state = {
      tongName: '',
    }
    //uploadImage.state = uploadImage.state.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    }

    componentDidMount() {
      _this = this;
    }
    _useCon() {
    console.log(this.state.imageSource);
    }

  static navigationOptions = ({
    headerTitle: null,
    headerRight: (<Text onPress={() => _this.uploadImage()}>완료  </Text>),
    headerStyle: {
      backgroundColor: '#fff',
      shadowOpacity: 0,
      shadowColor: 'transparent',
      shadowOffset: { height:0 },
      shadowRadius: 0,
      elevation: 0,
      borderBottomWidth: 0,
    }
  });



    uploadImage() {

    const {tongName, imageSource} = this.state;

    let apiUrl = 'http://13.124.127.253/api/createTong.php';
    let uri = null;
    let fileType = null;
    let options = null;

    if (imageSource) {
      uri = imageSource;
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];


      const formData = new FormData();

      formData.append('name', tongName);
      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
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

      options = {
        method: 'POST',
        body: JSON.stringify({
          name: tongName,
          type: "none",
        })
      }

    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'data matched') {
          console.log(responseJson);
          this.props.navigation.navigate("Main");
        } else {
          //alert(responseJson);
          Alert.alert(
            '현장통',
            responseJson
          )
        }
      }).catch((error) => {
        console.log(error)
      });
    }

  render(){
    let { imageSource } = this.state;

    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.CreateTongLogo} />
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
                <TextInput
                style={{fontSize:20,width:250,textAlign:'center'}}
                placeholder="현장통 이름 입력"
                underlineColorAndroid='rgba(0,0,0,0)'
                onChangeText = {TextInputValue=>this.setState({tongName:TextInputValue}) }
                 />
            </View>
                 <Image style={styles.tongImage}
                    source={{ uri: this.state.imageSource }}
                 />
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
                 <TouchableOpacity onPress={this._pickImage.bind(this)}>
                 <View style={{borderRadius:10,width:150,height:150,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>
                  <Icon name="camera" style={{fontSize:50,color:'#999'}} />
                  <Text style={{color:'#999',fontSize:15}}>현장통 사진 추가</Text>
                 </View>
                 </TouchableOpacity>
            </View>
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
                 <TouchableOpacity onPress={this.uploadImage}>
                 <Text style={{fontSize:15,color:'#db3928'}}>현장통 공개 타입을 설정하세요. <Icon name='cogs' type="FontAwesome" style={{color:'#db3928',fontSize:20,alignSelf:'center'}} /></Text>
                 </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default createTong2;
