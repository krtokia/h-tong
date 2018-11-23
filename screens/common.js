import React, { Component } from 'react';
import { ImagePicker } from 'expo';

class tong extends Component{
  constructor(props) {
    super(props);
    this.state = {
      imageSource: '../../assets/images/robot-prod.png',
      imgresult: null,
      data: null,
    }
    this._pickImage = this._pickImage.bind(this);
    this._pickImage2 = this._pickImage2.bind(this);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    });

    console.log(result);
    this.setState({imageSource:result.uri,imgresult:result});
    //console.log("Image Source: " + this.state.imageSource);

    if (!result.cancelled) {
      this.setState({ imageSource: result.uri,imgresult:result});
    }
  };

  _pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);
    this.setState({imageSource:result.uri,imgresult:result});
    //console.log("Image Source: " + this.state.imageSource);

    if (!result.cancelled) {
      this.setState({ imageSource: result.uri,imgresult:result});
    }
  };


  getData = async(seq) => {
        return fetch("http://13.124.127.253/api/results.php?page=bbs&seq=" + seq)
              .then((response) => response.json())
              .then((responseJson) => {
                //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                  data: responseJson,
                });
              })
              .catch((error) => {
                console.error(error);
              });
  }

  render(){
      return null
  }
}

export default tong;
