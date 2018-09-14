import React, { Component } from 'react';
import {Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
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
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  InsertUser = ()=>{
    //constant varaibles that equal propertes in state
    const {tongName} = this.state;
    const {imageSource} = this.state;

    const formData = new FormData();
    //Add your input data
    formData.append('name', tongName);

    //Add your photo
    //this, retrive the file extension of your photo
    const uriPart = imageSource.split('.');
    const fileExtension = uriPart[uriPart.length - 1];

    formData.append('photo', {
        uri: imageSource,
        name: `photo.${fileExtension}`,
        type: `image/${fileExtension}`
    });

    //API that use fetch to input data to database via backend php script
    fetch('http://192.168.1.7/tr_reactnative/insert.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
       // return responseJson
         alert(responseJson);
         this.props.navigation.navigate('seconde');
        })
        .catch((error) => {
            console.error(error);
          });

   //alert('Pressed!!');
    }

  render(){
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
                    source={this.state.imageSource != '' ? this.state.imageSource : require('../../assets/images/robot-dev.png')}

                 />
                 <TouchableOpacity onPress={this._pickImage}>
                 <Text>사진 선택</Text>
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
