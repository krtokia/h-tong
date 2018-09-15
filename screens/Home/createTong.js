import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  Icon,
  View,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import { ImagePicker } from 'expo';
import styles from "./styles";

class HomeDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tongName: '',
      imageSource: null,
    }

    //uploadImage.state = uploadImage.state.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

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
            <View>
              <View>
                <TextInput
                style={styles.tongName}
                placeholder="현장통 이름"
                onChangeText = {TextInputValue=>this.setState({tongName:TextInputValue}) }
                 />

                 <Image style={styles.tongImage}
                    source={{uri: imageSource}}

                 />
                 <TouchableOpacity onPress={this._pickImage}>
                 <Text>사진 선택</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={this.uploadImage}>
                 <Text>현장통 만들기</Text>
                 </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default HomeDetail;
