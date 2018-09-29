import React, { Component } from 'react';
import { ImagePicker } from 'expo';

class pickableImage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      imageSource: '../../assets/images/robot-prod.png',
    }
    this._pickImage = this._pickImage.bind(this);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    this.setState({imageSource:result.uri});
    //console.log("Image Source: " + this.state.imageSource);

    if (!result.cancelled) {
      this.setState({ imageSource: result.uri });

    }
  };

  render(){
      return null
  }
}

export default pickableImage;
