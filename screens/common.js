import React, { Component } from 'react';
import { ImagePicker, Permissions } from 'expo';

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
    this.pickFromCamera = this.pickFromCamera.bind(this);
  }

  hasPermissions = Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ])
      .then(r => r.filter(o => o.status === 'granted'))
      .then(permissions => {
        if (permissions.length !== 2) {
          return new Error('Camera & Camera Roll Permissions Required');
        }
        //console.log({ permissions });
        return true;
      });
    pickFromGallery = async () => {
      this.handleModalDismiss();

      this.hasPermissions
        .then(async () => await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images' }))
        .then(this.maybeEmailImage)
        .catch(error => {
          console.log(`[ pickFromGallery ] ${error}`);
          Sentry.captureException(new Error(`[ pickFromGallery ] ${error}`));
          this.permissionsAlert();
        });
    };

    pickFromCamera = async () => {
    //  this.handleModalDismiss();

      this.hasPermissions
        .then(result = await ImagePicker.launchCameraAsync())
        .then()
        .catch(error => {
          console.log(`[ pickFromCamera ] ${error}`);
          Sentry.captureException(new Error(`[ pickFromCamera ] ${error}`));
          this.permissionsAlert();
        });
        this.setState({imageSource:result.uri,imgresult:result});
    };

    permissionsAlert = () =>
      Alert.alert(
        'Permissions Required',
        'This app requires Camera & Camera Roll access to function properly. Please go to settings to enable manually (or restart the app).',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'Settings',
            onPress: () =>
              layout.isIOS
                ? Linking.openURL('app-settings:')
                : IntentLauncherAndroid.startActivityAsync(
                    IntentLauncherAndroid.ACTION_MANAGE_APPLICATIONS_SETTINGS
                  ),
          },
        ]
      );

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
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

  _pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);
    this.setState({imageSource2:result.uri,imgresult2:result});
    //console.log("Image Source: " + this.state.imageSource);

    if (!result.cancelled) {
      this.setState({ imageSource2: result.uri,imgresult2:result});
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
