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

class createTong2 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tongName: '',
      imageSource: null,
    }
    //uploadImage.state = uploadImage.state.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    }

  static navigationOptions = ({
    headerTitle: null,
    headerRight: (<Text onPress={() => alert('완료')}>완료  </Text>),
    headerStyle: {
      backgroundColor: '#fff',
      shadowOpacity: 0,
      shadowOffset: { width:0, height:0 },
      shadowRadius: 0,
      elevation: 0,
    }
  });



    uploadImage() {

    const {tongName, imageSource} = this.state;

    let apiUrl = 'http://13.124.127.253/api/createTong.php';
    let uri = imageSource;
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    //constant varaibles that equal propertes in state


    const formData = new FormData();
    //Add your input data
    formData.append('name', tongName);

    //Add your photo
    //this, retrive the file extension of your photo
    /*
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    */

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

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

    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ imageSource: result.uri });
      }
    };

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
                    source={{uri: imageSource}}

                 />
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
                 <TouchableOpacity onPress={this._pickImage}>
                 <View style={{borderRadius:10,width:150,height:150,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>
                  <Icon name="camera" style={{fontSize:50,color:'#999'}} />
                  <Text style={{color:'#999',fontSize:15}}>현장통 사진 추가</Text>
                 </View>
                 </TouchableOpacity>
            </View>
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
                 <TouchableOpacity onPress={this.uploadImage}>
                 <Text style={{fontSize:15,color:'#cc0404'}}>현장통 공개 타입을 설정하세요. <Icon name='cog' style={{color:'#cc0404',fontSize:20,alignSelf:'center'}} /></Text>
                 </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default createTong2;
