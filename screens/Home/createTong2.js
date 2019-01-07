import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity, Text as RNText, Modal, TouchableHighlight } from 'react-native';
import {
  Container,
  Content,
  Text,
  Icon as NBIcon,
  View,
  H3,
  Header,
  Left,
  Body,
  Right,
  Button,
  Footer,
  FooterTab,
  Form,
  Textarea,
  Item,
  Label,
  Input
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import { ImagePicker } from 'expo';
import styles from "./styles";
import pickableImage from "../common.js"
import { StoreGlobal } from "../../App"

import MapView, { Marker } from 'react-native-maps';

const _this = null;

let id = 0;

class createTong2 extends pickableImage{
  constructor(props) {
    super(props);
    this.state = {
		tongName: '',
		modal: false,
    modalMap: false,
		tongnum: '',
		tongtitle: '',
		tongtype: '',
		projectnm: '',
		authnum: '',
		constructor: '',
		supervisor: '',
		owner: '',
		contact: '',
		term: '',
		scale: '',
		addr: '',
		creator: StoreGlobal({type:'get',key:'loginId'}),
    fLatitude: '',
    fLongitude: '',
    markerPosition: {
        latitude: 37.715133,
        longitude: 126.734086,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    markers: [],

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

    onRegionChange = (data) => {
      this.markerPosition = data;
    }
    onMapPress(e) {
      this.setState({
        fLatitude: e.nativeEvent.coordinate.latitude,
        fLongitude: e.nativeEvent.coordinate.longitude,
        markers:[
          {
            coordinate: e.nativeEvent.coordinate,
            key: id++,
          }
        ],
      });

      var url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + e.nativeEvent.coordinate.longitude + "&y=" + e.nativeEvent.coordinate.latitude + "&input_coord=WGS84";
      var obj = {
        method: 'GET',
        headers: {
          'Authorization': 'KakaoAK 01dbf66f990d42bb4e8b96acb7c94b8c'
        }
      }

      return fetch(url, obj)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              console.log(responseJson.documents[0].address.region_2depth_name,)
              this.setState({
                addr : responseJson.documents[0].address.region_2depth_name,
              });
            })
            .catch((error) => {
              console.error(error);
            });

    }

  static navigationOptions = ({
    header:null,
    headerTitle: null,
//    headerRight: (<Text onPress={() => _this.division()}>완료  </Text>),
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

    division(tongType) {
  		if(this.state.tongName === ''){
  			Alert.alert('현장동 이름을 입력하세요');
  			return;
  		}

      if(tongType === 'T') {
        this.setState({modal: true});
      } else {
        this.createTong(tongType)
      }
    }

    modalComplate() {
      Alert.alert('현장통 생성 기능')
      this.setState({modal: false});
    }

    getCity() {
      var lat = this.state.markerPosition.latitude;
      var lon = this.state.markerPosition.longitude;
      var url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + lon + "&y=" + lat + "&input_coord=WGS84";
      var obj = {
        method: 'GET',
        headers: {
          'Authorization': 'KakaoAK 01dbf66f990d42bb4e8b96acb7c94b8c'
        }
      }

      return fetch(url, obj)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              console.log(responseJson.documents[0].address.region_2depth_name,)
              this.setState({
                addr : responseJson.documents[0].address.region_2depth_name,
              });
            })
            .catch((error) => {
              console.error(error);
            });

    }


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

	createTong(tongType) {
    const { imageSource, tongName, projectnm, authnum, constructor, supervisor, owner, contact, term, scale, addr, creator, fLatitude, fLongitude} = this.state;
    if(!projectnm || !authnum || !constructor || !supervisor || !owner || !contact || !term || !scale || !addr || !fLatitude || !fLongitude ) {
      Alert.alert('현장통','현장 정보를 빠짐없이 입력 해 주세요.');
      return false
    }

    let apiUrl = 'http://13.124.127.253/api/createTong.php';
    let options = null;

    const formData = new FormData();

    formData.append('name', tongName);
    formData.append('tongtype', tongType);
    formData.append('tongtitle', tongName);
    formData.append('projectnm', projectnm);
    formData.append('authnum', authnum);
    formData.append('constructor', constructor);
    formData.append('supervisor', supervisor);
    formData.append('owner', owner);
    formData.append('contact', contact);
    formData.append('term', term);
    formData.append('scale', scale);
    formData.append('creator', creator);
    formData.append('addr', addr);
    formData.append('latitude',fLatitude);
    formData.append('longitude', fLongitude);

    if (imageSource) {
      uri = imageSource;
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];

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
      formData.append('type', 'none');

      options = {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      }

    }

    console.log(options)

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
		console.log("responseJson:",responseJson);
        if(responseJson === 'success') {
          Alert.alert(
			"현장통",
			"생성되었습니다.",
			 [
				{text:"확인",onPress:() => {this.props.navigation.navigate("Home", { refresh:Date(Date.now()).toString()})}}
			],
			{ cancelable: false }
			)
        } else {
          //alert(responseJson);
          Alert.alert(
            '현장통',
            "현장통 생성 실패"
          )
		//this.props.navigation.navigate("Main");
        }
      }).catch((error) => {
        console.log(error)
      });
    }

  render(){
    var modalFontSize = 11;

    let { imageSource } = this.state;
    const tongType = this.props.navigation.getParam('tongType');
    const tongDiv = tongType === 'T' ? "현장" : "커뮤니티";
    let isMarked = this.state.markers[0] ? this.state.markers[0]['key'] >= 0 ? true : false : false;

    return (
      <Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalMap}
        onRequestClose={() => {
          this.setState({modalMap: false});
        }}>
        <View style={{flex:1}}>
          <View style={{flex:7}}>
            <MapView
              initialRegion={this.state.markerPosition}
              onPress={(e) => this.onMapPress(e)}
              style={{flex:1}}
              onRegionChange={this.onRegionChange}
            >
            {this.state.markers.map(marker => (
              <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              />
            ))}
            </MapView>
          </View>
          <View style={[{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:isMarked ? '#db3928' : '#fff'}]}>
            <Text style={{color:isMarked ? '#fff' : '#666'}} onPress={() => {isMarked ? this.setState({modalMap:false}) : Alert.alert('현장통','현장을 지도에서 선택 해 주세요.')}}>저장</Text>
          </View>
        </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState({modal: false});
          }}>
            <Header style={{height:50,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
              <Left style={{flex:1}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({modal: false});
                  }}>
                  <NBIcon name='close' type="FontAwesome" style={{color:'#fff'}} />
                </TouchableHighlight>
              </Left>
              <Body style={{flex:4,alignItems:'center'}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:18}}>현장통 세부 설정</Text>
              </Body>
              <Right  style={{flex:1}} />
                {/*<Text style={{fontSize:13,color:'#fff'}} onPress={() => {this.createTong()}}>완료</Text>
              </Right>*/}
            </Header>
            <Content style={{padding:10}}>
              <Form>
                <ImageBackground source={require('../../assets/images/backgroundLogo.png')} style={{width:'100%'}}>
                  <View style={[styles.Row]}>
                    <View style={styles.createModalStyleLeft}>
                      <Text style={{fontSize:modalFontSize}}>공사명</Text>
                      <Text style={{fontSize:modalFontSize}}>건축허가번호</Text>
                      <Text style={{fontSize:modalFontSize}}>공사 시공자</Text>
                      <Text style={{fontSize:modalFontSize}}>공사 감리자</Text>
                      <Text style={{fontSize:modalFontSize}}>발주자</Text>
                      <Text style={{fontSize:modalFontSize}}>현장 연락처</Text>
                      <Text style={{fontSize:modalFontSize}}>공사기간</Text>
                      <Text style={{fontSize:modalFontSize}}>공사규모</Text>
                      <Text style={{fontSize:modalFontSize}}>현장주소</Text>
                    </View>
                    <View style={[styles.createModalStyleRight]}>
                      <TextInput placeholder="공사명을 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(projectnm) => this.setState({ projectnm })}/>
                      <TextInput placeholder="건축허가번호를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(authnum) => this.setState({ authnum })}/>
                      <TextInput placeholder="공사 시공자를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(constructor) => this.setState({ constructor })}/>
                      <TextInput placeholder="공사 감리자를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(supervisor) => this.setState({ supervisor })}/>
                      <TextInput placeholder="발주자를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(owner) => this.setState({ owner })}/>
                      <TextInput placeholder="현장 연락처를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(contact) => this.setState({ contact })}/>
                      <TextInput placeholder="공사기간을 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(term) => this.setState({ term })}/>
                      <TextInput placeholder="공사규모를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onChangeText={(scale) => this.setState({ scale })}/>
                      <TextInput placeholder="현장주소를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput} onFocus={() => {this.setState({modalMap:true})}} value={this.state.addr} />
                    </View>
                  </View>
                </ImageBackground>
              </Form>
              <View style={{width:150,alignSelf:'center',padding:10,marginTop:30}}>
                <Button transparent rounded block style={{backgroundColor:'#db3928'}}
                  onPress={() => {this.createTong(tongType)}}
                >
                  <Text style={{color:'#fff'}}>완료</Text>
                </Button>
              </View>
            </Content>
        </Modal>
        <Header style={{backgroundColor:'#db3928'}}>
          <Left style={{alignSelf:'flex-end'}}>
            <Button transparent rounded onPress={() => {this.props.navigation.goBack()}}>
              <NBIcon name="ios-arrow-back" style={{color:'#fff'}} />
            </Button>
          </Left>
          <Body />
          <Right style={{alignSelf:'flex-end'}}>
            <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
              <NBIcon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={[styles.container,{marginTop:70}]}>
            <Image source={require('../../assets/images/logo.png')} style={styles.CreateTongLogo} />
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
                <TextInput
                style={{fontSize:20,width:250,textAlign:'center'}}
                placeholder= '이름 입력'
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
                  <NBIcon name="camera" style={{fontSize:50,color:'#999'}} />
                  <Text style={{color:'#999',fontSize:15}}>{tongDiv}통 사진 추가</Text>
                 </View>
                 </TouchableOpacity>
            </View>
{/*
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
                 <TouchableOpacity onPress={this.uploadImage}>
                 <Text style={{fontSize:15,color:'#db3928'}}>{tongDiv}통 공개 타입을 설정하세요. <NBIcon name='cogs' type="FontAwesome" style={{color:'#db3928',fontSize:20,alignSelf:'center'}} /></Text>
                 </TouchableOpacity>
            </View>
*/}
            <View style={{marginTop:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Button iconLeft rounded style={{backgroundColor:'#db3928',paddingHorizontal:50,paddingVertical:20}} onPress={() => _this.division(tongType)}>
                <Image source={require('../../assets/images/addButton.png')} />
                <RNText style={{color:'#fff',fontSize:20}}> 완료</RNText>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default createTong2;
