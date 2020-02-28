import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  ImageBackground,
  ActivityIndicator,
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
   Footer,
   Form,
 } from "native-base";
import MapView from 'react-native-maps';
import styles from './styles.js';

import { StoreGlobal } from '../../App';

var fontColor = '#888';

class TongMap extends Component{
  state = {
      isLoading: true,
      dataSource: null,
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      modal: false,
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      memId: StoreGlobal({type:'get',key:'memId'}),
  		projectnm: '',
  		authnum: '',
  		constructor: '',
  		supervisor: '',
  		owner: '',
  		contact: '',
  		term: '',
  		scale: '',
  		addr: '',
      refresh: "",
    };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  modalComplate() {
    this.updateTongInfo()
    this.setState({modal: false});
  }

  componentDidMount() {
    this.getTong();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.refresh !== prevState.refresh) {
      this.getTong();
    }
  }

  getTong = async() => {
    this.setState({isLoading:true})
    return fetch("http://13.124.127.253/api/results.php?page=tong&seq=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        })
        console.log("updateGetTong")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateTongInfo() {
    const { dataSource, tongnum, projectnm, authnum, constructor, supervisor, owner, contact, term, scale, addr } = this.state;
    let apiUrl = 'http://13.124.127.253/api/updateTong.php';
    let options = null;

    const formData = new FormData();

    formData.append('tongnum', tongnum);
    formData.append('projectnm', projectnm ? projectnm : dataSource[0].projectnm);
    formData.append('authnum', authnum ? authnum : dataSource[0].authnum);
    formData.append('constructor', constructor) ? constructor : dataSource[0].constructor;
    formData.append('supervisor', supervisor ? supervisor : dataSource[0].supervisor);
    formData.append('owner', owner ? owner : dataSource[0].owner);
    formData.append('contact', contact ? contact : dataSource[0].contact);
    formData.append('term', term ? term : dataSource[0].term);
    formData.append('scale', scale ? scale : dataSource[0].scale);
    formData.append('addr', addr ? addr : dataSource[0].addr);

    formData.append('type', 'none');
    options = {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
		console.log("responseJson:",responseJson);
        if(responseJson === 'success') {
          Alert.alert(
			"현장통",
			"수정되었습니다.",
			 [
				{text:"확인",onPress:() => {this.setState({refresh:Date(Date.now()).toString()})}}
			],
			{ cancelable: false }
			)
        } else {
          //alert(responseJson);
          Alert.alert(
            '현장통',
            "현장통 수정 실패"
          )
		//this.props.navigation.navigate("Main");
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  render() {
    if(this.state.isLoading) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      } else {
        var modalFontSize = 11;
        return (
          <Container>
            <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
              <Left style={{flex:1}}>
                <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
                  <Icon name="angle-left" type="FontAwesome" />
                </Button>
              </Left>
              <Body style={{flex:5,alignItems:'center'}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>현장정보</Text>
              </Body>
              <Right  style={{flex:1}}>
              </Right>
            </Header>
            <Content
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "#fff" }}
              contentContainerStyle={{flex:1}}
            >
                  <MapView
                    style={{flex:1}}
                    region={this.state.mapRegion}
                    onRegionChange={this._handleMapRegionChange}
                  />
            </Content>
          </Container>
        );
      }
  }
}
export default TongMap;
